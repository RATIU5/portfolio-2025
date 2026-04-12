import { Effect, Config, Redacted } from 'effect';
import { D as DefaultQueryCompiler, s as sql, a as DEFAULT_MIGRATION_TABLE, b as DEFAULT_MIGRATION_LOCK_TABLE, c as DialectAdapterBase, C as CompiledQuery, p as parseSavepointCommand, e as extendStackTrace } from './stack-trace-utils_CaS5OugP.mjs';
import { f as freeze, i as isFunction, d as createQueryId } from './index_DmoCs122.mjs';
import { Pool } from 'pg';

/// <reference types="./postgres-query-compiler.d.ts" />
const ID_WRAP_REGEX = /"/g;
class PostgresQueryCompiler extends DefaultQueryCompiler {
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '""');
    }
}

/// <reference types="./postgres-introspector.d.ts" />
class PostgresIntrospector {
    #db;
    constructor(db) {
        this.#db = db;
    }
    async getSchemas() {
        let rawSchemas = await this.#db
            .selectFrom('pg_catalog.pg_namespace')
            .select('nspname')
            .$castTo()
            .execute();
        return rawSchemas.map((it) => ({ name: it.nspname }));
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db
            // column
            .selectFrom('pg_catalog.pg_attribute as a')
            // table
            .innerJoin('pg_catalog.pg_class as c', 'a.attrelid', 'c.oid')
            // table schema
            .innerJoin('pg_catalog.pg_namespace as ns', 'c.relnamespace', 'ns.oid')
            // column data type
            .innerJoin('pg_catalog.pg_type as typ', 'a.atttypid', 'typ.oid')
            // column data type schema
            .innerJoin('pg_catalog.pg_namespace as dtns', 'typ.typnamespace', 'dtns.oid')
            .select([
            'a.attname as column',
            'a.attnotnull as not_null',
            'a.atthasdef as has_default',
            'c.relname as table',
            'c.relkind as table_type',
            'ns.nspname as schema',
            'typ.typname as type',
            'dtns.nspname as type_schema',
            sql `col_description(a.attrelid, a.attnum)`.as('column_description'),
            sql `pg_get_serial_sequence(quote_ident(ns.nspname) || '.' || quote_ident(c.relname), a.attname)`.as('auto_incrementing'),
        ])
            .where('c.relkind', 'in', [
            'r' /*regular table*/,
            'v' /*view*/,
            'p' /*partitioned table*/,
        ])
            .where('ns.nspname', '!~', '^pg_')
            .where('ns.nspname', '!=', 'information_schema')
            // Filter out internal cockroachdb schema
            .where('ns.nspname', '!=', 'crdb_internal')
            // Only schemas where we are allowed access
            .where(sql `has_schema_privilege(ns.nspname, 'USAGE')`)
            // No system columns
            .where('a.attnum', '>=', 0)
            .where('a.attisdropped', '!=', true)
            .orderBy('ns.nspname')
            .orderBy('c.relname')
            .orderBy('a.attnum')
            .$castTo();
        if (!options.withInternalKyselyTables) {
            query = query
                .where('c.relname', '!=', DEFAULT_MIGRATION_TABLE)
                .where('c.relname', '!=', DEFAULT_MIGRATION_LOCK_TABLE);
        }
        const rawColumns = await query.execute();
        return this.#parseTableMetadata(rawColumns);
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options),
        };
    }
    #parseTableMetadata(columns) {
        return columns.reduce((tables, it) => {
            let table = tables.find((tbl) => tbl.name === it.table && tbl.schema === it.schema);
            if (!table) {
                table = freeze({
                    name: it.table,
                    isView: it.table_type === 'v',
                    schema: it.schema,
                    columns: [],
                });
                tables.push(table);
            }
            table.columns.push(freeze({
                name: it.column,
                dataType: it.type,
                dataTypeSchema: it.type_schema,
                isNullable: !it.not_null,
                isAutoIncrementing: it.auto_incrementing !== null,
                hasDefaultValue: it.has_default,
                comment: it.column_description ?? undefined,
            }));
            return tables;
        }, []);
    }
}

/// <reference types="./postgres-adapter.d.ts" />
// Random id for our transaction lock.
const LOCK_ID = BigInt('3853314791062309107');
class PostgresAdapter extends DialectAdapterBase {
    get supportsTransactionalDdl() {
        return true;
    }
    get supportsReturning() {
        return true;
    }
    async acquireMigrationLock(db, _opt) {
        // Acquire a transaction level advisory lock.
        await sql `select pg_advisory_xact_lock(${sql.lit(LOCK_ID)})`.execute(db);
    }
    async releaseMigrationLock(_db, _opt) {
        // Nothing to do here. `pg_advisory_xact_lock` is automatically released at the
        // end of the transaction and since `supportsTransactionalDdl` true, we know
        // the `db` instance passed to acquireMigrationLock is actually a transaction.
    }
}

/// <reference types="./postgres-driver.d.ts" />
const PRIVATE_RELEASE_METHOD = Symbol();
class PostgresDriver {
    #config;
    #connections = new WeakMap();
    #pool;
    constructor(config) {
        this.#config = freeze({ ...config });
    }
    async init() {
        this.#pool = isFunction(this.#config.pool)
            ? await this.#config.pool()
            : this.#config.pool;
    }
    async acquireConnection() {
        const client = await this.#pool.connect();
        let connection = this.#connections.get(client);
        if (!connection) {
            connection = new PostgresConnection(client, {
                cursor: this.#config.cursor ?? null,
            });
            this.#connections.set(client, connection);
            // The driver must take care of calling `onCreateConnection` when a new
            // connection is created. The `pg` module doesn't provide an async hook
            // for the connection creation. We need to call the method explicitly.
            if (this.#config.onCreateConnection) {
                await this.#config.onCreateConnection(connection);
            }
        }
        if (this.#config.onReserveConnection) {
            await this.#config.onReserveConnection(connection);
        }
        return connection;
    }
    async beginTransaction(connection, settings) {
        if (settings.isolationLevel || settings.accessMode) {
            let sql = 'start transaction';
            if (settings.isolationLevel) {
                sql += ` isolation level ${settings.isolationLevel}`;
            }
            if (settings.accessMode) {
                sql += ` ${settings.accessMode}`;
            }
            await connection.executeQuery(CompiledQuery.raw(sql));
        }
        else {
            await connection.executeQuery(CompiledQuery.raw('begin'));
        }
    }
    async commitTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('commit'));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw('rollback'));
    }
    async savepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery(parseSavepointCommand('savepoint', savepointName), createQueryId()));
    }
    async rollbackToSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery(parseSavepointCommand('rollback to', savepointName), createQueryId()));
    }
    async releaseSavepoint(connection, savepointName, compileQuery) {
        await connection.executeQuery(compileQuery(parseSavepointCommand('release', savepointName), createQueryId()));
    }
    async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD]();
    }
    async destroy() {
        if (this.#pool) {
            const pool = this.#pool;
            this.#pool = undefined;
            await pool.end();
        }
    }
}
class PostgresConnection {
    #client;
    #options;
    constructor(client, options) {
        this.#client = client;
        this.#options = options;
    }
    async executeQuery(compiledQuery) {
        try {
            const { command, rowCount, rows } = await this.#client.query(compiledQuery.sql, [...compiledQuery.parameters]);
            return {
                numAffectedRows: command === 'INSERT' ||
                    command === 'UPDATE' ||
                    command === 'DELETE' ||
                    command === 'MERGE'
                    ? BigInt(rowCount)
                    : undefined,
                rows: rows ?? [],
            };
        }
        catch (err) {
            throw extendStackTrace(err, new Error());
        }
    }
    async *streamQuery(compiledQuery, chunkSize) {
        if (!this.#options.cursor) {
            throw new Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
        }
        if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
            throw new Error('chunkSize must be a positive integer');
        }
        const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
        try {
            while (true) {
                const rows = await cursor.read(chunkSize);
                if (rows.length === 0) {
                    break;
                }
                yield {
                    rows,
                };
            }
        }
        finally {
            await cursor.close();
        }
    }
    [PRIVATE_RELEASE_METHOD]() {
        this.#client.release();
    }
}

/// <reference types="./postgres-dialect.d.ts" />
/**
 * PostgreSQL dialect that uses the [pg](https://node-postgres.com/) library.
 *
 * The constructor takes an instance of {@link PostgresDialectConfig}.
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `pool`
 * can be a function:
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: async () => new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
class PostgresDialect {
    #config;
    constructor(config) {
        this.#config = config;
    }
    createDriver() {
        return new PostgresDriver(this.#config);
    }
    createQueryCompiler() {
        return new PostgresQueryCompiler();
    }
    createAdapter() {
        return new PostgresAdapter();
    }
    createIntrospector(db) {
        return new PostgresIntrospector(db);
    }
}

class PostgresEnvConfig {
  database;
  host;
  port;
  user;
  password;
  connectionLimit = 10;
  constructor(opts) {
    this.database = opts.database;
    this.host = opts.host;
    this.port = opts.port;
    this.user = opts.user;
    this.password = opts.password;
    if (opts.connectionLimit !== void 0) {
      this.connectionLimit = opts.connectionLimit;
    }
  }
  get poolConfig() {
    return {
      database: Redacted.value(this.database),
      host: Redacted.value(this.host),
      port: Redacted.value(this.port),
      user: Redacted.value(this.user),
      password: Redacted.value(this.password),
      max: this.connectionLimit
    };
  }
}
const envConfig = Config.all({
  database: Config.redacted("PG_DATABASE").pipe(
    Config.orElse(() => Config.redacted("CMS_PG_DATABASE"))
  ),
  host: Config.redacted("PG_HOST").pipe(Config.orElse(() => Config.redacted("CMS_PG_HOST"))),
  port: Config.redacted(Config.number("PG_PORT")).pipe(
    Config.orElse(() => Config.redacted(Config.number("CMS_PG_PORT")))
  ),
  user: Config.redacted("PG_USER").pipe(Config.orElse(() => Config.redacted("CMS_PG_USER"))),
  password: Config.redacted("PG_PASSWORD").pipe(
    Config.orElse(() => Config.redacted("CMS_PG_PASSWORD"))
  ),
  connectionLimit: Config.withDefault(
    Config.number("PG_CONNECTION_LIMIT").pipe(
      Config.orElse(() => Config.number("CMS_PG_CONNECTION_LIMIT"))
    ),
    void 0
  )
}).pipe(Config.map((opts) => new PostgresEnvConfig(opts).poolConfig));
const postgresDriver = Effect.gen(function* () {
  const config = yield* envConfig;
  return new PostgresDialect({
    pool: new Pool(config)
  });
});

export { postgresDriver };
