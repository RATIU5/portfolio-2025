import { Effect, Config, Redacted } from 'effect';
import { C as CompiledQuery, p as parseSavepointCommand, e as extendStackTrace, D as DefaultQueryCompiler, s as sql, a as DEFAULT_MIGRATION_TABLE, b as DEFAULT_MIGRATION_LOCK_TABLE, c as DialectAdapterBase } from './stack-trace-utils_CaS5OugP.mjs';
import { f as freeze, i as isFunction, d as createQueryId, e as isObject } from './index_DmoCs122.mjs';
import { createPool } from 'mysql2';

/// <reference types="./mysql-driver.d.ts" />
const PRIVATE_RELEASE_METHOD = Symbol();
class MysqlDriver {
    #config;
    #connections = new WeakMap();
    #pool;
    constructor(configOrPool) {
        this.#config = freeze({ ...configOrPool });
    }
    async init() {
        this.#pool = isFunction(this.#config.pool)
            ? await this.#config.pool()
            : this.#config.pool;
    }
    async acquireConnection() {
        const rawConnection = await this.#acquireConnection();
        let connection = this.#connections.get(rawConnection);
        if (!connection) {
            connection = new MysqlConnection(rawConnection);
            this.#connections.set(rawConnection, connection);
            // The driver must take care of calling `onCreateConnection` when a new
            // connection is created. The `mysql2` module doesn't provide an async hook
            // for the connection creation. We need to call the method explicitly.
            if (this.#config?.onCreateConnection) {
                await this.#config.onCreateConnection(connection);
            }
        }
        if (this.#config?.onReserveConnection) {
            await this.#config.onReserveConnection(connection);
        }
        return connection;
    }
    async #acquireConnection() {
        return new Promise((resolve, reject) => {
            this.#pool.getConnection(async (err, rawConnection) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rawConnection);
                }
            });
        });
    }
    async beginTransaction(connection, settings) {
        if (settings.isolationLevel || settings.accessMode) {
            const parts = [];
            if (settings.isolationLevel) {
                parts.push(`isolation level ${settings.isolationLevel}`);
            }
            if (settings.accessMode) {
                parts.push(settings.accessMode);
            }
            const sql = `set transaction ${parts.join(', ')}`;
            // On MySQL this sets the isolation level of the next transaction.
            await connection.executeQuery(CompiledQuery.raw(sql));
        }
        await connection.executeQuery(CompiledQuery.raw('begin'));
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
        await connection.executeQuery(compileQuery(parseSavepointCommand('release savepoint', savepointName), createQueryId()));
    }
    async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD]();
    }
    async destroy() {
        return new Promise((resolve, reject) => {
            this.#pool.end((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
function isOkPacket(obj) {
    return isObject(obj) && 'insertId' in obj && 'affectedRows' in obj;
}
class MysqlConnection {
    #rawConnection;
    constructor(rawConnection) {
        this.#rawConnection = rawConnection;
    }
    async executeQuery(compiledQuery) {
        try {
            const result = await this.#executeQuery(compiledQuery);
            if (isOkPacket(result)) {
                const { insertId, affectedRows, changedRows } = result;
                return {
                    insertId: insertId !== undefined &&
                        insertId !== null &&
                        insertId.toString() !== '0'
                        ? BigInt(insertId)
                        : undefined,
                    numAffectedRows: affectedRows !== undefined && affectedRows !== null
                        ? BigInt(affectedRows)
                        : undefined,
                    numChangedRows: changedRows !== undefined && changedRows !== null
                        ? BigInt(changedRows)
                        : undefined,
                    rows: [],
                };
            }
            else if (Array.isArray(result)) {
                return {
                    rows: result,
                };
            }
            return {
                rows: [],
            };
        }
        catch (err) {
            throw extendStackTrace(err, new Error());
        }
    }
    #executeQuery(compiledQuery) {
        return new Promise((resolve, reject) => {
            this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async *streamQuery(compiledQuery, _chunkSize) {
        const stream = this.#rawConnection
            .query(compiledQuery.sql, compiledQuery.parameters)
            .stream({
            objectMode: true,
        });
        try {
            for await (const row of stream) {
                yield {
                    rows: [row],
                };
            }
        }
        catch (ex) {
            if (ex &&
                typeof ex === 'object' &&
                'code' in ex &&
                // @ts-ignore
                ex.code === 'ERR_STREAM_PREMATURE_CLOSE') {
                // Most likely because of https://github.com/mysqljs/mysql/blob/master/lib/protocol/sequences/Query.js#L220
                return;
            }
            throw ex;
        }
    }
    [PRIVATE_RELEASE_METHOD]() {
        this.#rawConnection.release();
    }
}

/// <reference types="./mysql-query-compiler.d.ts" />
const ID_WRAP_REGEX = /`/g;
class MysqlQueryCompiler extends DefaultQueryCompiler {
    getCurrentParameterPlaceholder() {
        return '?';
    }
    getLeftExplainOptionsWrapper() {
        return '';
    }
    getExplainOptionAssignment() {
        return '=';
    }
    getExplainOptionsDelimiter() {
        return ' ';
    }
    getRightExplainOptionsWrapper() {
        return '';
    }
    getLeftIdentifierWrapper() {
        return '`';
    }
    getRightIdentifierWrapper() {
        return '`';
    }
    sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '``');
    }
    visitCreateIndex(node) {
        this.append('create ');
        if (node.unique) {
            this.append('unique ');
        }
        this.append('index ');
        if (node.ifNotExists) {
            this.append('if not exists ');
        }
        this.visitNode(node.name);
        if (node.using) {
            this.append(' using ');
            this.visitNode(node.using);
        }
        if (node.table) {
            this.append(' on ');
            this.visitNode(node.table);
        }
        if (node.columns) {
            this.append(' (');
            this.compileList(node.columns);
            this.append(')');
        }
        if (node.where) {
            this.append(' ');
            this.visitNode(node.where);
        }
    }
}

/// <reference types="./mysql-introspector.d.ts" />
class MysqlIntrospector {
    #db;
    constructor(db) {
        this.#db = db;
    }
    async getSchemas() {
        let rawSchemas = await this.#db
            .selectFrom('information_schema.schemata')
            .select('schema_name')
            .$castTo()
            .execute();
        return rawSchemas.map((it) => ({ name: it.SCHEMA_NAME }));
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db
            .selectFrom('information_schema.columns as columns')
            .innerJoin('information_schema.tables as tables', (b) => b
            .onRef('columns.TABLE_CATALOG', '=', 'tables.TABLE_CATALOG')
            .onRef('columns.TABLE_SCHEMA', '=', 'tables.TABLE_SCHEMA')
            .onRef('columns.TABLE_NAME', '=', 'tables.TABLE_NAME'))
            .select([
            'columns.COLUMN_NAME',
            'columns.COLUMN_DEFAULT',
            'columns.TABLE_NAME',
            'columns.TABLE_SCHEMA',
            'tables.TABLE_TYPE',
            'columns.IS_NULLABLE',
            'columns.DATA_TYPE',
            'columns.EXTRA',
            'columns.COLUMN_COMMENT',
        ])
            .where('columns.TABLE_SCHEMA', '=', sql `database()`)
            .orderBy('columns.TABLE_NAME')
            .orderBy('columns.ORDINAL_POSITION')
            .$castTo();
        if (!options.withInternalKyselyTables) {
            query = query
                .where('columns.TABLE_NAME', '!=', DEFAULT_MIGRATION_TABLE)
                .where('columns.TABLE_NAME', '!=', DEFAULT_MIGRATION_LOCK_TABLE);
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
            let table = tables.find((tbl) => tbl.name === it.TABLE_NAME);
            if (!table) {
                table = freeze({
                    name: it.TABLE_NAME,
                    isView: it.TABLE_TYPE === 'VIEW',
                    schema: it.TABLE_SCHEMA,
                    columns: [],
                });
                tables.push(table);
            }
            table.columns.push(freeze({
                name: it.COLUMN_NAME,
                dataType: it.DATA_TYPE,
                isNullable: it.IS_NULLABLE === 'YES',
                isAutoIncrementing: it.EXTRA.toLowerCase().includes('auto_increment'),
                hasDefaultValue: it.COLUMN_DEFAULT !== null,
                comment: it.COLUMN_COMMENT === '' ? undefined : it.COLUMN_COMMENT,
            }));
            return tables;
        }, []);
    }
}

/// <reference types="./mysql-adapter.d.ts" />
const LOCK_ID = 'ea586330-2c93-47c8-908d-981d9d270f9d';
const LOCK_TIMEOUT_SECONDS = 60 * 60;
class MysqlAdapter extends DialectAdapterBase {
    get supportsTransactionalDdl() {
        return false;
    }
    get supportsReturning() {
        return false;
    }
    async acquireMigrationLock(db, _opt) {
        // Kysely uses a single connection to run the migrations. Because of that, we
        // can take a lock using `get_lock`. Locks acquired using `get_lock` get
        // released when the connection is destroyed (session ends) or when the lock
        // is released using `release_lock`. This way we know that the lock is either
        // released by us after successfull or failed migrations OR it's released by
        // MySQL if the process gets killed for some reason.
        await sql `select get_lock(${sql.lit(LOCK_ID)}, ${sql.lit(LOCK_TIMEOUT_SECONDS)})`.execute(db);
    }
    async releaseMigrationLock(db, _opt) {
        await sql `select release_lock(${sql.lit(LOCK_ID)})`.execute(db);
    }
}

/// <reference types="./mysql-dialect.d.ts" />
/**
 * MySQL dialect that uses the [mysql2](https://github.com/sidorares/node-mysql2#readme) library.
 *
 * The constructor takes an instance of {@link MysqlDialectConfig}.
 *
 * ```ts
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: createPool({
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
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: async () => createPool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
class MysqlDialect {
    #config;
    constructor(config) {
        this.#config = config;
    }
    createDriver() {
        return new MysqlDriver(this.#config);
    }
    createQueryCompiler() {
        return new MysqlQueryCompiler();
    }
    createAdapter() {
        return new MysqlAdapter();
    }
    createIntrospector(db) {
        return new MysqlIntrospector(db);
    }
}

class MysqlEnvConfig {
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
      connectionLimit: this.connectionLimit
    };
  }
}
const envConfig = Config.all({
  database: Config.redacted("MYSQL_DATABASE").pipe(
    Config.orElse(() => Config.redacted("CMS_MYSQL_DATABASE"))
  ),
  host: Config.redacted("MYSQL_HOST").pipe(Config.orElse(() => Config.redacted("CMS_MYSQL_HOST"))),
  port: Config.redacted(Config.number("MYSQL_PORT")).pipe(
    Config.orElse(() => Config.redacted(Config.number("CMS_MYSQL_PORT")))
  ),
  user: Config.redacted("MYSQL_USER").pipe(Config.orElse(() => Config.redacted("CMS_MYSQL_USER"))),
  password: Config.redacted("MYSQL_PASSWORD").pipe(
    Config.orElse(() => Config.redacted("CMS_MYSQL_PASSWORD"))
  ),
  connectionLimit: Config.withDefault(
    Config.number("MYSQL_CONNECTION_LIMIT").pipe(
      Config.orElse(() => Config.number("CMS_MYSQL_CONNECTION_LIMIT"))
    ),
    void 0
  )
}).pipe(Config.map((opts) => new MysqlEnvConfig(opts).poolConfig));
const mysqlDriver = Effect.gen(function* () {
  const config = yield* envConfig;
  return new MysqlDialect({
    pool: createPool(config)
  });
});

export { mysqlDriver };
