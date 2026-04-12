import { createClient } from '@libsql/client/node';
import { Effect, Config, Redacted } from 'effect';
import { LibSQLDialect } from 'kysely-turso/libsql';

class LibSQLEnvConfig {
  url;
  authToken;
  encryptionKey;
  syncUrl;
  syncInterval;
  readYourWrites;
  offline;
  tls;
  concurrency;
  constructor(opts) {
    this.url = opts.url;
    this.authToken = opts.authToken;
    this.encryptionKey = opts.encryptionKey;
    this.syncUrl = opts.syncUrl;
    this.syncInterval = opts.syncInterval;
    this.readYourWrites = opts.readYourWrites;
    this.offline = opts.offline;
    this.tls = opts.tls;
    this.concurrency = opts.concurrency;
  }
  get clientConfig() {
    return {
      url: Redacted.value(this.url),
      authToken: this.authToken ? Redacted.value(this.authToken) : void 0,
      encryptionKey: this.encryptionKey ? Redacted.value(this.encryptionKey) : void 0,
      syncUrl: this.syncUrl ? Redacted.value(this.syncUrl) : void 0,
      syncInterval: this.syncInterval,
      readYourWrites: this.readYourWrites,
      offline: this.offline,
      tls: this.tls,
      concurrency: this.concurrency
    };
  }
}
const envConfig = Config.all({
  url: Config.redacted("LIBSQL_URL").pipe(Config.orElse(() => Config.redacted("CMS_LIBSQL_URL"))),
  authToken: Config.withDefault(
    Config.redacted("LIBSQL_AUTH_TOKEN").pipe(
      Config.orElse(() => Config.redacted("CMS_LIBSQL_AUTH_TOKEN"))
    ),
    void 0
  ),
  encryptionKey: Config.withDefault(
    Config.redacted("LIBSQL_ENCRYPTION_KEY").pipe(
      Config.orElse(() => Config.redacted("CMS_LIBSQL_ENCRYPTION_KEY"))
    ),
    void 0
  ),
  syncUrl: Config.withDefault(
    Config.redacted("LIBSQL_SYNC_URL").pipe(
      Config.orElse(() => Config.redacted("CMS_LIBSQL_SYNC_URL"))
    ),
    void 0
  ),
  syncInterval: Config.withDefault(
    Config.number("LIBSQL_SYNC_INTERVAL").pipe(
      Config.orElse(() => Config.number("CMS_LIBSQL_SYNC_INTERVAL"))
    ),
    void 0
  ),
  readYourWrites: Config.withDefault(
    Config.boolean("LIBSQL_READ_YOUR_WRITES").pipe(
      Config.orElse(() => Config.boolean("CMS_LIBSQL_READ_YOUR_WRITES"))
    ),
    false
  ),
  offline: Config.withDefault(
    Config.boolean("LIBSQL_OFFLINE").pipe(
      Config.orElse(() => Config.boolean("CMS_LIBSQL_OFFLINE"))
    ),
    false
  ),
  tls: Config.withDefault(
    Config.boolean("LIBSQL_TLS").pipe(Config.orElse(() => Config.boolean("CMS_LIBSQL_TLS"))),
    true
  ),
  concurrency: Config.withDefault(
    Config.number("LIBSQL_CONCURRENCY").pipe(
      Config.orElse(() => Config.number("CMS_LIBSQL_CONCURRENCY"))
    ),
    void 0
  )
}).pipe(Config.map((cfg) => new LibSQLEnvConfig(cfg).clientConfig));
const libsqlDriver = Effect.gen(function* () {
  const config = yield* envConfig;
  return new LibSQLDialect({
    client: createClient(config)
  });
});

export { libsqlDriver };
