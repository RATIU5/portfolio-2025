import { N as NotificationSettingsDefaults, G as GhostUserDefaults, c as config } from './consts_CvAQFK6n.mjs';
import { Effect, Data, Context, Layer, Clock, Duration, Logger, List, LogLevel, Config, Schema as Schema$1, pipe, Redacted } from 'effect';
import { styleText } from 'node:util';
import { hasProperty } from 'effect/Predicate';
import * as Record from 'effect/Record';
import * as Schema from 'effect/Schema';
import * as crypto$1 from 'node:crypto';
import { H as HTTPClient, r as runEffect } from './effect_DkdxkRrn.mjs';

({
"server": new URL("file:///Users/john.memmott/Developer/ratiu5/portfolio-2025/dist/server/"),
"client": new URL("file:///Users/john.memmott/Developer/ratiu5/portfolio-2025/dist/client/")});
new URL("file:///Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.astro/");
new URL("file:///Users/john.memmott/Developer/ratiu5/portfolio-2025/dist/");
new URL("file:///Users/john.memmott/Developer/ratiu5/portfolio-2025/public/");
new URL("file:///Users/john.memmott/Developer/ratiu5/portfolio-2025/src/");
const root = new URL("file:///Users/john.memmott/Developer/ratiu5/portfolio-2025/");
const site = "https://portfolio-2025-five-pearl.vercel.app";

/**
 * Special values that tell deepmerge to perform a certain action.
 */
const actions = {
    defaultMerge: Symbol("deepmerge-ts: default merge"),
    skip: Symbol("deepmerge-ts: skip"),
};
/**
 * Special values that tell deepmergeInto to perform a certain action.
 */
({
    defaultMerge: actions.defaultMerge,
});

/**
 * The default function to update meta data.
 *
 * It doesn't update the meta data.
 */
function defaultMetaDataUpdater(previousMeta, metaMeta) {
    return metaMeta;
}
/**
 * The default function to filter values.
 *
 * It filters out undefined values.
 */
function defaultFilterValues(values, meta) {
    return values.filter((value) => value !== undefined);
}

/**
 * The different types of objects deepmerge-ts support.
 */
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["NOT"] = 0] = "NOT";
    ObjectType[ObjectType["RECORD"] = 1] = "RECORD";
    ObjectType[ObjectType["ARRAY"] = 2] = "ARRAY";
    ObjectType[ObjectType["SET"] = 3] = "SET";
    ObjectType[ObjectType["MAP"] = 4] = "MAP";
    ObjectType[ObjectType["OTHER"] = 5] = "OTHER";
})(ObjectType || (ObjectType = {}));
/**
 * Get the type of the given object.
 *
 * @param object - The object to get the type of.
 * @returns The type of the given object.
 */
function getObjectType(object) {
    if (typeof object !== "object" || object === null) {
        return 0 /* ObjectType.NOT */;
    }
    if (Array.isArray(object)) {
        return 2 /* ObjectType.ARRAY */;
    }
    if (isRecord(object)) {
        return 1 /* ObjectType.RECORD */;
    }
    if (object instanceof Set) {
        return 3 /* ObjectType.SET */;
    }
    if (object instanceof Map) {
        return 4 /* ObjectType.MAP */;
    }
    return 5 /* ObjectType.OTHER */;
}
/**
 * Get the keys of the given objects including symbol keys.
 *
 * Note: Only keys to enumerable properties are returned.
 *
 * @param objects - An array of objects to get the keys of.
 * @returns A set containing all the keys of all the given objects.
 */
function getKeys(objects) {
    const keys = new Set();
    for (const object of objects) {
        for (const key of [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]) {
            keys.add(key);
        }
    }
    return keys;
}
/**
 * Does the given object have the given property.
 *
 * @param object - The object to test.
 * @param property - The property to test.
 * @returns Whether the object has the property.
 */
function objectHasProperty(object, property) {
    return typeof object === "object" && Object.prototype.propertyIsEnumerable.call(object, property);
}
/**
 * Get an iterable object that iterates over the given iterables.
 */
function getIterableOfIterables(iterables) {
    let mut_iterablesIndex = 0;
    let mut_iterator = iterables[0]?.[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    do {
                        if (mut_iterator === undefined) {
                            return { done: true, value: undefined };
                        }
                        const result = mut_iterator.next();
                        if (result.done === true) {
                            mut_iterablesIndex += 1;
                            mut_iterator = iterables[mut_iterablesIndex]?.[Symbol.iterator]();
                            continue;
                        }
                        return {
                            done: false,
                            value: result.value,
                        };
                    } while (true);
                },
            };
        },
    };
}
// eslint-disable-next-line unicorn/prefer-set-has -- Array is more performant for a low number of elements.
const validRecordToStringValues = ["[object Object]", "[object Module]"];
/**
 * Does the given object appear to be a record.
 */
function isRecord(value) {
    // All records are objects.
    if (!validRecordToStringValues.includes(Object.prototype.toString.call(value))) {
        return false;
    }
    const { constructor } = value;
    // If has modified constructor.
    // eslint-disable-next-line ts/no-unnecessary-condition
    if (constructor === undefined) {
        return true;
    }
    const prototype = constructor.prototype;
    // If has modified prototype.
    if (prototype === null ||
        typeof prototype !== "object" ||
        !validRecordToStringValues.includes(Object.prototype.toString.call(prototype))) {
        return false;
    }
    // If constructor does not have an Object-specific method.
    // eslint-disable-next-line sonar/prefer-single-boolean-return, no-prototype-builtins
    if (!prototype.hasOwnProperty("isPrototypeOf")) {
        return false;
    }
    // Most likely a record.
    return true;
}

/**
 * The default strategy to merge records.
 *
 * @param values - The records.
 */
function mergeRecords$1(values, utils, meta) {
    const result = {};
    for (const key of getKeys(values)) {
        const propValues = [];
        for (const value of values) {
            if (objectHasProperty(value, key)) {
                propValues.push(value[key]);
            }
        }
        if (propValues.length === 0) {
            continue;
        }
        const updatedMeta = utils.metaDataUpdater(meta, {
            key,
            parents: values,
        });
        const propertyResult = mergeUnknowns(propValues, utils, updatedMeta);
        if (propertyResult === actions.skip) {
            continue;
        }
        if (key === "__proto__") {
            Object.defineProperty(result, key, {
                value: propertyResult,
                configurable: true,
                enumerable: true,
                writable: true,
            });
        }
        else {
            result[key] = propertyResult;
        }
    }
    return result;
}
/**
 * The default strategy to merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays$1(values) {
    return values.flat();
}
/**
 * The default strategy to merge sets.
 *
 * @param values - The sets.
 */
function mergeSets$1(values) {
    return new Set(getIterableOfIterables(values));
}
/**
 * The default strategy to merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps$1(values) {
    return new Map(getIterableOfIterables(values));
}
/**
 * Get the last value in the given array.
 */
function mergeOthers$1(values) {
    return values.at(-1);
}
/**
 * The merge functions.
 */
const mergeFunctions = {
    mergeRecords: mergeRecords$1,
    mergeArrays: mergeArrays$1,
    mergeSets: mergeSets$1,
    mergeMaps: mergeMaps$1,
    mergeOthers: mergeOthers$1,
};
function deepmergeCustom$1(options, rootMetaData) {
    const utils = getUtils(options, customizedDeepmerge);
    /**
     * The customized deepmerge function.
     */
    function customizedDeepmerge(...objects) {
        return mergeUnknowns(objects, utils, rootMetaData);
    }
    return customizedDeepmerge;
}
/**
 * The the utils that are available to the merge functions.
 *
 * @param options - The options the user specified
 */
function getUtils(options, customizedDeepmerge) {
    return {
        defaultMergeFunctions: mergeFunctions,
        mergeFunctions: {
            ...mergeFunctions,
            ...Object.fromEntries(Object.entries(options)
                .filter(([key, option]) => Object.hasOwn(mergeFunctions, key))
                .map(([key, option]) => (option === false ? [key, mergeFunctions.mergeOthers] : [key, option]))),
        },
        metaDataUpdater: (options.metaDataUpdater ?? defaultMetaDataUpdater),
        deepmerge: customizedDeepmerge,
        useImplicitDefaultMerging: options.enableImplicitDefaultMerging ?? false,
        filterValues: options.filterValues === false ? undefined : (options.filterValues ?? defaultFilterValues),
        actions,
    };
}
/**
 * Merge unknown things.
 *
 * @param values - The values.
 */
function mergeUnknowns(values, utils, meta) {
    const filteredValues = utils.filterValues?.(values, meta) ?? values;
    if (filteredValues.length === 0) {
        return undefined;
    }
    if (filteredValues.length === 1) {
        return mergeOthers(filteredValues, utils, meta);
    }
    const type = getObjectType(filteredValues[0]);
    if (type !== 0 /* ObjectType.NOT */ && type !== 5 /* ObjectType.OTHER */) {
        for (let mut_index = 1; mut_index < filteredValues.length; mut_index++) {
            if (getObjectType(filteredValues[mut_index]) === type) {
                continue;
            }
            return mergeOthers(filteredValues, utils, meta);
        }
    }
    switch (type) {
        case 1 /* ObjectType.RECORD */: {
            return mergeRecords(filteredValues, utils, meta);
        }
        case 2 /* ObjectType.ARRAY */: {
            return mergeArrays(filteredValues, utils, meta);
        }
        case 3 /* ObjectType.SET */: {
            return mergeSets(filteredValues, utils, meta);
        }
        case 4 /* ObjectType.MAP */: {
            return mergeMaps(filteredValues, utils, meta);
        }
        default: {
            return mergeOthers(filteredValues, utils, meta);
        }
    }
}
/**
 * Merge records.
 *
 * @param values - The records.
 */
function mergeRecords(values, utils, meta) {
    const result = utils.mergeFunctions.mergeRecords(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords)) {
        return utils.defaultMergeFunctions.mergeRecords(values, utils, meta);
    }
    return result;
}
/**
 * Merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays(values, utils, meta) {
    const result = utils.mergeFunctions.mergeArrays(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays)) {
        return utils.defaultMergeFunctions.mergeArrays(values);
    }
    return result;
}
/**
 * Merge sets.
 *
 * @param values - The sets.
 */
function mergeSets(values, utils, meta) {
    const result = utils.mergeFunctions.mergeSets(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets)) {
        return utils.defaultMergeFunctions.mergeSets(values);
    }
    return result;
}
/**
 * Merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps(values, utils, meta) {
    const result = utils.mergeFunctions.mergeMaps(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps)) {
        return utils.defaultMergeFunctions.mergeMaps(values);
    }
    return result;
}
/**
 * Merge other things.
 *
 * @param values - The other things.
 */
function mergeOthers(values, utils, meta) {
    const result = utils.mergeFunctions.mergeOthers(values, utils, meta);
    if (result === actions.defaultMerge ||
        (utils.useImplicitDefaultMerging &&
            result === undefined &&
            utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers)) {
        return utils.defaultMergeFunctions.mergeOthers(values);
    }
    return result;
}

class DeepmergeError extends Data.TaggedError("DeepmergeError") {
}
const deepmergeCustom = Effect.fn(
  (fn) => Effect.try({
    try: () => fn(deepmergeCustom$1),
    /* v8 ignore next 4 */
    catch: (cause) => new DeepmergeError({
      message: `Failed to run deepmerge callback: ${cause instanceof Error ? cause.message : String(cause)}`,
      cause
    })
  })
);
const deepmerge = Effect.fn(function* (fn, opts = {}) {
  const _deepmerge = yield* deepmergeCustom((merge) => merge(opts));
  return yield* Effect.try({
    try: () => fn(_deepmerge),
    catch: (cause) => new DeepmergeError({
      message: `Failed to run deepmerge: ${cause instanceof Error ? cause.message : String(cause)}`,
      cause
    })
  });
});
class Deepmerge extends Effect.Service()("Deepmerge", {
  effect: Effect.succeed({
    custom: deepmergeCustom,
    merge: deepmerge
  })
}) {
}

class DBClientLive extends Context.Tag("@withstudiocms/sdk/context/DBClientLive")() {
  /**
   * Provides a live layer for the DBClient context tag using the given database client.
   *
   * @param db - The database client instance to be provided.
   * @returns A layer that provides the DBClient context tag.
   */
  static Live = (db) => Layer.succeed(this, db);
}
class SDKDefaults extends Context.Tag("@withstudiocms/sdk/context/SDKDefaults")() {
  /**
   * Provides a live layer for the SDKDefaults context tag using the given options.
   *
   * @param opts - The options to be provided.
   * @returns A layer that provides the SDKDefaults context tag.
   */
  static live = (opts) => Layer.succeed(this, opts);
}
class CacheStores extends Context.Tag("@withstudiocms/sdk/context/CacheStores")() {
  static live = (cache) => Layer.succeed(this, cache);
}
class StorageManagerResolver extends Context.Tag(
  "@withstudiocms/sdk/context/StorageManagerResolver"
)() {
  static live = (resolver) => Layer.succeed(this, resolver);
}
const makeSDKContext = (context) => Layer.mergeAll(
  DBClientLive.Live(context.db),
  SDKDefaults.live(context.defaults),
  CacheStores.live(context.cache),
  StorageManagerResolver.live(context.storageManagerResolver)
);

class CacheMissError {
  _tag = "CacheMissError";
}
const returnNonNull = (value) => value !== null ? Effect.succeed(value) : Effect.fail(new CacheMissError());
class CacheService extends Effect.Service()(
  "@withstudiocms/sdk/cache/CacheService",
  {
    effect: Effect.gen(function* () {
      const { store, tagIndex } = yield* CacheStores;
      const get = (key) => Effect.gen(function* () {
        const now = yield* Clock.currentTimeMillis;
        const entry = store.get(key);
        if (!entry) return null;
        if (entry.expiresAt < now) {
          store.delete(key);
          return null;
        }
        return entry.value;
      });
      const set = (key, value, options) => Effect.gen(function* () {
        const now = yield* Clock.currentTimeMillis;
        const ttl = options?.ttl ?? Duration.minutes(5);
        const tags = new Set(options?.tags ?? []);
        const expiresAt = now + Duration.toMillis(ttl);
        store.set(key, { value, expiresAt, tags, lastUpdatedAt: now });
        for (const tag of tags) {
          if (!tagIndex.has(tag)) {
            tagIndex.set(tag, /* @__PURE__ */ new Set());
          }
          tagIndex.get(tag)?.add(key);
        }
      });
      const deleteKey = (key) => Effect.sync(() => {
        const entry = store.get(key);
        if (entry) {
          for (const tag of entry.tags) {
            tagIndex.get(tag)?.delete(key);
          }
        }
        store.delete(key);
      });
      const invalidateTags = (tags) => Effect.sync(() => {
        for (const tag of tags) {
          const keys = tagIndex.get(tag);
          if (keys) {
            for (const key of keys) {
              store.delete(key);
            }
            tagIndex.delete(tag);
          }
        }
      });
      const clear = () => Effect.sync(() => {
        store.clear();
        tagIndex.clear();
      });
      const memoize = (key, effect, options) => get(key).pipe(
        Effect.flatMap(returnNonNull),
        Effect.catchTag(
          "CacheMissError",
          () => effect.pipe(Effect.tap((result) => set(key, result, options)))
        )
      );
      const getCacheStatus = Effect.fn(
        (id) => Effect.gen(function* () {
          const now = yield* Clock.currentTimeMillis;
          const entry = store.get(id);
          if (!entry || entry.expiresAt < now) {
            if (entry && entry.expiresAt < now) {
              store.delete(id);
            }
            return null;
          }
          return {
            expiresAt: new Date(entry.expiresAt),
            lastUpdatedAt: new Date(entry.lastUpdatedAt),
            tags: entry.tags
          };
        })
      );
      return { get, set, delete: deleteKey, invalidateTags, clear, memoize, getCacheStatus };
    })
  }
) {
}
var cache_default = CacheService;

function stripNameFromLabel(label) {
  const prefix = "studiocms/";
  return label.startsWith(prefix) ? label.slice(prefix.length) : label;
}
const loggerCache = /* @__PURE__ */ new Map();
const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
function getLevelPrefix(level) {
  const levelLabel = level.toUpperCase();
  switch (level) {
    case "error":
      return `[${levelLabel}]`;
    case "warn":
      return `[${levelLabel}]`;
    case "debug":
      return `[${levelLabel}]`;
    default:
      return "";
  }
}
const getEventPrefix = (level, label) => {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn" || level === "debug") {
    prefix.push(styleText("bold", timestamp));
    prefix.push(getLevelPrefix(level));
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return styleText("red", prefix.join(" "));
  }
  if (level === "warn") {
    return styleText("yellow", prefix.join(" "));
  }
  if (level === "debug") {
    return styleText("blue", prefix.join(" "));
  }
  if (prefix.length === 1) {
    return styleText("dim", prefix[0]);
  }
  return `${styleText("dim", prefix[0])} ${styleText("blue", prefix.splice(1).join(" "))}`;
};
class SDKLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new SDKLogger(this.options, label);
  }
  info(message) {
    console.log(`${getEventPrefix("info", this.label)} ${message}`);
  }
  warn(message) {
    console.warn(`${getEventPrefix("warn", this.label)} \u26A0\uFE0F ${message}`);
  }
  error(message) {
    console.error(`${getEventPrefix("error", this.label)} \u274C ${message}`);
  }
  debug(message) {
    console.debug(`${getEventPrefix("debug", this.label)} \u{1F41B} ${message}`);
  }
}
const _logger = new SDKLogger({ level: "info" }, "studiocms:runtime");
const makeLogger = Logger.make(({ logLevel, message: _message, spans }) => {
  const label = "sdk";
  const logger = loggerCache.get(label) ?? _logger.fork(`studiocms:runtime/${stripNameFromLabel(label)}`);
  loggerCache.set(label, logger);
  const list = List.toArray(spans);
  const spanPart = list.length ? ` :: ${list.join(" \u203A ")}` : "";
  const message = `${String(_message)}${spanPart}`;
  switch (logLevel) {
    case LogLevel.Trace:
    case LogLevel.Debug: {
      logger.debug(`${message}`);
      break;
    }
    case LogLevel.Error:
    case LogLevel.Fatal: {
      logger.error(`${message}`);
      break;
    }
    case LogLevel.Warning: {
      logger.warn(`${message}`);
      break;
    }
    case LogLevel.All:
    case LogLevel.Info: {
      logger.info(message);
      break;
    }
    default: {
      logger.info(message);
    }
  }
});
const setLoggerLevel = Config.withDefault(
  Config.logLevel("STUDIOCMS_LOGLEVEL"),
  LogLevel.Info
).pipe(Effect.andThen(Logger.minimumLogLevel), Layer.unwrapEffect);

const ColumnTypesId = Symbol.for("@withstudiocms/kysely/ColumnTypesId");
const OptionalColumnTypesId = Symbol.for("@withstudiocms/kysely/OptionalColumnTypesId");
const ColumnType = (Select, Insert, Update) => {
  return Object.assign(
    Schema.make(Schema.Never.ast).annotations({
      /* v8 ignore start */
      message: () => "ColumnType Schema is not intended to be used directly. Utilize ColumnType.[select|insert|update]"
      /* v8 ignore stop */
    }),
    {
      [ColumnTypesId]: ColumnTypesId,
      Select,
      Insert,
      Update
    }
  );
};
const OptionalColumnType = (Select, Insert, Update) => {
  return Object.assign(
    Schema.make(Schema.Never.ast).annotations({
      /* v8 ignore start */
      message: () => "OptionalColumnType Schema is not intended to be used directly. Utilize ColumnType.[select|insert|update]"
      /* v8 ignore stop */
    }),
    {
      [OptionalColumnTypesId]: OptionalColumnTypesId,
      Select,
      Insert: Schema.optional(Insert),
      Update: Schema.optional(Update)
    }
  );
};
const isColumnTypes = (value) => hasProperty(value, ColumnTypesId) || hasProperty(value, OptionalColumnTypesId);
const Table = (columns) => {
  const Select = Schema.Struct(Record.map(columns, (v) => isColumnTypes(v) ? v.Select : v));
  const Insert = Schema.Struct(Record.map(columns, (v) => isColumnTypes(v) ? v.Insert : v));
  const Update = Schema.Struct(Record.map(columns, (v) => isColumnTypes(v) ? v.Update : v));
  return Object.assign(Schema.Struct(columns), {
    [ColumnTypesId]: ColumnTypesId,
    Select,
    Insert,
    Update
  });
};
const Database = (tables) => Schema.Struct(tables);
const encodeDatabase = (schema) => schema.Encoded;
const BooleanFromNumber = Schema.transform(Schema.Number, Schema.Boolean, {
  decode: (n) => n === 1,
  encode: (b) => b ? 1 : 0
});
const NumberFromBoolean = Schema.transform(Schema.Boolean, Schema.Number, {
  encode: (n) => n === 1,
  decode: (b) => b ? 1 : 0
});
const StringArrayFromString = Schema.transform(Schema.String, Schema.Array(Schema.String), {
  decode: (str) => {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  },
  encode: (arr) => JSON.stringify(arr)
});
const JSONObjectFromString = Schema.transform(
  Schema.String,
  Schema.Record({ key: Schema.String, value: Schema.Unknown }),
  {
    decode: (str) => {
      try {
        const parsed = JSON.parse(str);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          return parsed;
        }
        return {};
      } catch {
        return {};
      }
    },
    encode: (obj) => JSON.stringify(obj)
  }
);
const DateFromString = ColumnType(Schema.DateFromString, Schema.String, Schema.String);
const CreatedAtDate = OptionalColumnType(Schema.DateFromString, Schema.String, Schema.Never);

const StudioCMSUsersTable = Table({
  id: Schema$1.String,
  url: Schema$1.optional(Schema$1.NullishOr(Schema$1.String)),
  name: Schema$1.String,
  email: Schema$1.optional(Schema$1.NullishOr(Schema$1.String)),
  avatar: Schema$1.optional(Schema$1.NullishOr(Schema$1.String)),
  username: Schema$1.String,
  password: Schema$1.optional(Schema$1.NullishOr(Schema$1.String)),
  updatedAt: DateFromString,
  createdAt: CreatedAtDate,
  emailVerified: BooleanFromNumber,
  notifications: Schema$1.optional(Schema$1.NullishOr(Schema$1.String))
});
const StudioCMSOAuthAccounts = Table({
  providerUserId: Schema$1.String,
  provider: Schema$1.String,
  userId: Schema$1.String
});
const StudioCMSSessionTable = Table({
  id: Schema$1.String,
  userId: Schema$1.String,
  expiresAt: DateFromString
});
const StudioCMSPermissions = Table({
  user: Schema$1.String,
  rank: Schema$1.Literal("owner", "admin", "editor", "visitor", "unknown")
});
const StudioCMSAPIKeys = Table({
  id: Schema$1.String,
  userId: Schema$1.String,
  key: Schema$1.String,
  creationDate: CreatedAtDate,
  description: Schema$1.optional(Schema$1.NullishOr(Schema$1.String))
});
const StudioCMSUserResetTokens = Table({
  id: Schema$1.String,
  userId: Schema$1.String,
  token: Schema$1.String
});
const StudioCMSPageFolderStructure = Table({
  id: Schema$1.String,
  name: Schema$1.String,
  parent: Schema$1.optional(Schema$1.NullishOr(Schema$1.String))
});
const StudioCMSPageData = Table({
  id: Schema$1.String,
  package: Schema$1.String,
  title: Schema$1.String,
  description: Schema$1.String,
  showOnNav: BooleanFromNumber,
  publishedAt: DateFromString,
  updatedAt: DateFromString,
  slug: Schema$1.String,
  contentLang: Schema$1.String,
  heroImage: Schema$1.optional(Schema$1.NullishOr(Schema$1.String)),
  categories: ColumnType(StringArrayFromString, Schema$1.String, Schema$1.String),
  tags: ColumnType(StringArrayFromString, Schema$1.String, Schema$1.String),
  authorId: Schema$1.String,
  contributorIds: ColumnType(StringArrayFromString, Schema$1.String, Schema$1.String),
  showAuthor: BooleanFromNumber,
  showContributors: BooleanFromNumber,
  parentFolder: Schema$1.optional(Schema$1.NullishOr(Schema$1.String)),
  draft: BooleanFromNumber,
  augments: ColumnType(StringArrayFromString, Schema$1.String, Schema$1.String)
});
const StudioCMSDiffTracking = Table({
  id: Schema$1.String,
  userId: Schema$1.String,
  pageId: Schema$1.String,
  timestamp: CreatedAtDate,
  pageMetaData: ColumnType(JSONObjectFromString, Schema$1.String, Schema$1.String),
  pageContentStart: Schema$1.String,
  diff: Schema$1.optional(Schema$1.NullishOr(Schema$1.String))
});
const StudioCMSPageDataTags = Table({
  id: Schema$1.Number,
  description: Schema$1.String,
  name: Schema$1.String,
  slug: Schema$1.String,
  meta: ColumnType(JSONObjectFromString, Schema$1.String, Schema$1.String)
});
const StudioCMSPageDataCategories = Table({
  id: Schema$1.Number,
  parent: Schema$1.optional(Schema$1.NullishOr(Schema$1.Number)),
  description: Schema$1.String,
  name: Schema$1.String,
  slug: Schema$1.String,
  meta: ColumnType(JSONObjectFromString, Schema$1.String, Schema$1.String)
});
const StudioCMSPageContent = Table({
  id: Schema$1.String,
  contentId: Schema$1.String,
  contentLang: Schema$1.String,
  content: Schema$1.String
});
const StudioCMSEmailVerificationTokens = Table({
  id: Schema$1.String,
  userId: Schema$1.String,
  token: Schema$1.String,
  expiresAt: DateFromString
});
const StudioCMSPluginData = Table({
  id: Schema$1.String,
  data: ColumnType(JSONObjectFromString, Schema$1.String, Schema$1.String)
});
const StudioCMSDynamicConfigSettings = Table({
  id: Schema$1.String,
  data: ColumnType(JSONObjectFromString, Schema$1.String, Schema$1.String)
});
const StudioCMSStorageManagerUrlMappings = Table({
  identifier: Schema$1.String,
  url: Schema$1.String,
  isPermanent: ColumnType(BooleanFromNumber, NumberFromBoolean, NumberFromBoolean),
  expiresAt: Schema$1.optional(Schema$1.NullishOr(Schema$1.Number)),
  createdAt: OptionalColumnType(Schema$1.Number, Schema$1.Number, Schema$1.Never),
  updatedAt: Schema$1.Number
});
const StudioCMSDatabaseSchema = Database({
  StudioCMSUsersTable,
  StudioCMSOAuthAccounts,
  StudioCMSSessionTable,
  StudioCMSAPIKeys,
  StudioCMSUserResetTokens,
  StudioCMSPermissions,
  StudioCMSPageFolderStructure,
  StudioCMSPageData,
  StudioCMSDiffTracking,
  StudioCMSPageDataTags,
  StudioCMSPageDataCategories,
  StudioCMSPageContent,
  StudioCMSEmailVerificationTokens,
  StudioCMSPluginData,
  StudioCMSDynamicConfigSettings,
  StudioCMSStorageManagerUrlMappings
});
encodeDatabase(StudioCMSDatabaseSchema);

class StudioCMSSDKError extends Data.TaggedError("StudioCMSSDKError") {
}

var SelectPluginDataRespondOrFail = /* @__PURE__ */ ((SelectPluginDataRespondOrFail2) => {
  SelectPluginDataRespondOrFail2["ExistsNoFail"] = "existsNoFail";
  SelectPluginDataRespondOrFail2["ExistsShouldFail"] = "existsShouldFail";
  SelectPluginDataRespondOrFail2["NotExistsShouldFail"] = "notExistsShouldFail";
  return SelectPluginDataRespondOrFail2;
})(SelectPluginDataRespondOrFail || {});
const parsedDataResponse = (id, data) => Effect.succeed({
  id,
  data
});
const isJsonValid = (data) => (isValid) => {
  if (isValid) return data;
  throw new Error("Validation failed for plugin data");
};
const getValidatorFn = Effect.fn("studiocms/sdk/effect/pluginUtils/getValidatorFn")(
  function* (validator) {
    if ("jsonFn" in validator) {
      return (data) => Effect.try({
        try: () => pipe(validator.jsonFn(data), isJsonValid(data)),
        catch: (cause) => new StudioCMSSDKError({
          message: `JSON validation failed: ${cause.message}`,
          cause
        })
      });
    }
    if ("effectSchema" in validator) {
      return (data) => Schema$1.decodeUnknown(validator.effectSchema)(data).pipe(
        Effect.mapError(
          (cause) => new StudioCMSSDKError({
            message: `Schema validation failed: ${cause.message}`,
            cause
          })
        )
      );
    }
    if ("zodSchema" in validator) {
      return (data) => Effect.try({
        try: () => {
          const result = validator.zodSchema.safeParse(data);
          if (result.success) {
            return result.data;
          }
          throw new Error(`Zod validation failed: ${result.error.message}`, {
            cause: result.error.cause
          });
        },
        catch: (cause) => new StudioCMSSDKError({ message: cause.message, cause })
      });
    }
    return yield* new StudioCMSSDKError({
      message: "Invalid validator options provided, expected one of: jsonFn, effectSchema, or zodSchema"
    });
  }
);
const parseData = Effect.fn("studiocms/sdk/effect/pluginUtils/parseData")(function* (rawData, validator) {
  let parsedInput;
  if (typeof rawData === "string") {
    parsedInput = yield* Effect.try({
      try: () => JSON.parse(rawData),
      catch: (cause) => new StudioCMSSDKError({ message: `JSON parsing failed: ${cause}`, cause })
    });
  } else if (rawData !== null && typeof rawData === "object") {
    parsedInput = rawData;
  } else {
    return yield* new StudioCMSSDKError({
      message: `Invalid plugin data format: ${typeof rawData}`
    });
  }
  if (!validator || validator === void 0) {
    return parsedInput;
  }
  const validatorFn = yield* getValidatorFn(validator);
  return yield* validatorFn(parsedInput);
});

const AuthErrorTagsEntries = [
  "DBCallbackFailure",
  "NotFoundError",
  "QueryError",
  "QueryParseError"
];

class GeneratorError extends Data.TaggedError("GeneratorError") {
}
const useGeneratorError = (_try) => Effect.try({
  try: _try,
  catch: (error) => new GeneratorError({ cause: error })
});
const SDKGenerators = Effect.gen(function* () {
  const redactedCMSEncryptionKey = yield* Config.redacted("CMS_ENCRYPTION_KEY");
  const cmsEncryptionKey = Redacted.value(redactedCMSEncryptionKey);
  const base64UrlEncode = (input) => Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const base64UrlDecode = (input) => {
    let newInput = input.replace(/-/g, "+").replace(/_/g, "/");
    while (newInput.length % 4 !== 0) {
      newInput += "=";
    }
    return Buffer.from(newInput, "base64").toString();
  };
  const generateJwt = Effect.fn(
    (secret, payload, noExpire) => useGeneratorError(() => {
      const header = { alg: "HS256", typ: "JWT" };
      const currentDate = /* @__PURE__ */ new Date();
      const thirtyYearsFromToday = Math.floor(
        currentDate.setFullYear(currentDate.getFullYear() + 30) / 1e3
      );
      const exp = noExpire ? thirtyYearsFromToday : Math.floor(Date.now() / 1e3) + 86400;
      const payloadObj = {
        ...payload,
        iat: Math.floor(Date.now() / 1e3),
        // Corrected iat
        exp
      };
      const encodedHeader = base64UrlEncode(JSON.stringify(header));
      const encodedPayload = base64UrlEncode(JSON.stringify(payloadObj));
      const signatureInput = `${encodedHeader}.${encodedPayload}`;
      const signature = Buffer.from(
        crypto$1.createHmac("sha256", secret + secret).update(signatureInput).digest()
      ).toString("base64url");
      return `${encodedHeader}.${encodedPayload}.${signature}`;
    })
  );
  const verifyJwt = (token, secret) => Effect.gen(function* () {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
    if (!encodedHeader || !encodedPayload || !encodedSignature) {
      yield* Effect.logDebug("Invalid token format");
      return { isValid: false };
    }
    const [header, payload] = yield* Effect.all([
      useGeneratorError(() => JSON.parse(base64UrlDecode(encodedHeader))),
      useGeneratorError(() => JSON.parse(base64UrlDecode(encodedPayload)))
    ]);
    if (header.alg !== "HS256") {
      yield* Effect.logDebug("Invalid algorithm");
      return { isValid: false };
    }
    const currentTime = Math.floor(Date.now() / 1e3);
    if (payload.exp && currentTime > payload.exp) {
      yield* Effect.logDebug("Token has expired");
      return { isValid: false };
    }
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const generatedSignature = yield* useGeneratorError(() => {
      return Buffer.from(
        crypto$1.createHmac("sha256", secret + secret).update(signatureInput).digest()
      ).toString("base64url");
    });
    if (generatedSignature !== encodedSignature) {
      yield* Effect.logDebug("Invalid signature");
      return { isValid: false };
    }
    return { isValid: true, userId: payload.userId };
  });
  const generateRandomIDNumber = Effect.fn(
    (length) => useGeneratorError(() => Math.floor(Math.random() * 10 ** length))
  );
  const generateRandomPassword = Effect.fn(
    (length) => useGeneratorError(() => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let password = "";
      const maxValidValue = Math.floor((2 ** 32 - 1) / characters.length) * characters.length;
      while (password.length < length) {
        const n = crypto$1.getRandomValues(new Uint32Array(1))[0];
        if (n < maxValidValue) {
          password += characters[n % characters.length];
        }
      }
      return password;
    })
  );
  const generateToken = Effect.fn(
    (userId, noExpire) => generateJwt(cmsEncryptionKey, { userId }, noExpire)
  );
  const testToken = Effect.fn((token) => verifyJwt(token, cmsEncryptionKey));
  return {
    generateRandomIDNumber,
    generateRandomPassword,
    generateToken,
    testToken
  };
});

const SDKAuthModule = Effect.gen(function* () {
  const [{ withCodec, withEncoder }, { generateToken }, { GhostUserDefaults }] = yield* Effect.all([
    DBClientLive,
    SDKGenerators,
    SDKDefaults
  ]);
  const _getVerificationToken = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSEmailVerificationTokens.Select),
    callbackFn: (db, id) => db(
      (client) => client.selectFrom("StudioCMSEmailVerificationTokens").selectAll().where("id", "=", id).executeTakeFirst()
    )
  });
  const _deleteVerificationToken = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, id) => db(
      (client) => client.deleteFrom("StudioCMSEmailVerificationTokens").where("userId", "=", id).executeTakeFirst()
    )
  });
  const _insertVerificationToken = withCodec({
    encoder: StudioCMSEmailVerificationTokens.Insert,
    decoder: StudioCMSEmailVerificationTokens.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSEmailVerificationTokens").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSEmailVerificationTokens").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _createNewOAuthAccount = withCodec({
    encoder: StudioCMSOAuthAccounts.Insert,
    decoder: StudioCMSOAuthAccounts.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSOAuthAccounts").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSOAuthAccounts").selectAll().where(
          (eb) => eb.and([eb("userId", "=", data.userId), eb("provider", "=", data.provider)])
        ).executeTakeFirstOrThrow();
      })
    )
  });
  const _deleteOAuthUserAccount = withEncoder({
    encoder: Schema$1.Struct({
      userId: Schema$1.String,
      provider: Schema$1.String
    }),
    callbackFn: (db, { userId, provider }) => db(
      (client) => client.deleteFrom("StudioCMSOAuthAccounts").where((eb) => eb.and([eb("userId", "=", userId), eb("provider", "=", provider)])).executeTakeFirst()
    )
  });
  const _searchOAuthAccountByProviderId = withCodec({
    encoder: Schema$1.Struct({
      providerUserId: Schema$1.String,
      userId: Schema$1.String
    }),
    decoder: Schema$1.UndefinedOr(StudioCMSOAuthAccounts.Select),
    callbackFn: (db, { providerUserId, userId }) => db(
      (client) => client.selectFrom("StudioCMSOAuthAccounts").selectAll().where(
        (eb) => eb.and([eb("providerUserId", "=", providerUserId), eb("userId", "=", userId)])
      ).executeTakeFirst()
    )
  });
  const _searchOauthProvidersForId = withCodec({
    encoder: Schema$1.Struct({
      providerId: Schema$1.String,
      userId: Schema$1.String
    }),
    decoder: Schema$1.UndefinedOr(StudioCMSOAuthAccounts.Select),
    callbackFn: (db, { providerId, userId }) => db(
      (client) => client.selectFrom("StudioCMSOAuthAccounts").selectAll().where((eb) => eb.and([eb("provider", "=", providerId), eb("userId", "=", userId)])).executeTakeFirst()
    )
  });
  const _getCurrentPermission = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPermissions.Select),
    callbackFn: (db, id) => db(
      (client) => client.selectFrom("StudioCMSPermissions").selectAll().where("user", "=", id).executeTakeFirst()
    )
  });
  const _createNewSession = withCodec({
    encoder: StudioCMSSessionTable.Insert,
    decoder: StudioCMSSessionTable.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSSessionTable").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSSessionTable").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _getUserById = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSUsersTable.Select),
    callbackFn: (db, id) => db(
      (client) => client.selectFrom("StudioCMSUsersTable").selectAll().where("id", "=", id).executeTakeFirst()
    )
  });
  const _getSessionById = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSSessionTable.Select),
    callbackFn: (db, id) => db(
      (client) => client.selectFrom("StudioCMSSessionTable").selectAll().where("id", "=", id).executeTakeFirst()
    )
  });
  const _deleteSession = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, id) => db(
      (client) => client.deleteFrom("StudioCMSSessionTable").where("id", "=", id).executeTakeFirst()
    )
  });
  const _updateSession = withCodec({
    encoder: Schema$1.Struct({
      id: Schema$1.String,
      newDate: Schema$1.Date
    }),
    decoder: StudioCMSSessionTable.Select,
    callbackFn: (db, { id, newDate }) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSSessionTable").set({ expiresAt: newDate }).where("id", "=", id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSSessionTable").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
      })
    )
  });
  const _createNewUser = withCodec({
    encoder: StudioCMSUsersTable.Insert,
    decoder: StudioCMSUsersTable.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSUsersTable").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSUsersTable").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _createUserPermission = withCodec({
    encoder: StudioCMSPermissions.Insert,
    decoder: StudioCMSPermissions.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPermissions").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPermissions").selectAll().where("user", "=", data.user).executeTakeFirstOrThrow();
      })
    )
  });
  const _updateUserData = withCodec({
    encoder: Schema$1.Struct({
      userId: Schema$1.String,
      userData: StudioCMSUsersTable.Update
    }),
    decoder: StudioCMSUsersTable.Select,
    callbackFn: (db, { userId, userData }) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSUsersTable").set(userData).where("id", "=", userId).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSUsersTable").selectAll().where("id", "=", userId).executeTakeFirstOrThrow();
      })
    )
  });
  const _searchForUsername = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSUsersTable.Select),
    callbackFn: (db, username) => db(
      (client) => client.selectFrom("StudioCMSUsersTable").selectAll().where("username", "=", username).execute()
    )
  });
  const _searchForEmail = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSUsersTable.Select),
    callbackFn: (db, email) => db(
      (client) => client.selectFrom("StudioCMSUsersTable").selectAll().where("email", "=", email).execute()
    )
  });
  const _pippedInsertToken = (userId) => Effect.fn(
    (token) => _insertVerificationToken({
      id: crypto.randomUUID(),
      userId,
      token,
      expiresAt: new Date(Date.now() + 1e3 * 60 * 60 * 24).toISOString()
    })
  );
  const _createVerificationToken = Effect.fn(
    (userId) => generateToken(userId).pipe(
      Effect.tap(() => _deleteVerificationToken(userId)),
      Effect.flatMap(_pippedInsertToken(userId))
    )
  );
  const _getSessionWithUserById = Effect.fn(function* (sessionId) {
    const session2 = yield* _getSessionById(sessionId);
    if (!session2) return void 0;
    const user2 = yield* _getUserById(session2.userId);
    if (!user2) return void 0;
    return {
      session: session2,
      user: user2
    };
  });
  const _createNewUserWithPermission = Effect.fn(
    (userData, rank) => _createNewUser(userData).pipe(
      Effect.tap(
        ({ id: user2 }) => _createUserPermission({
          user: user2,
          rank
        })
      )
    )
  );
  const _searchForUsernameOrEmail = Effect.fn(function* (username, email) {
    const usernameSearch = [];
    const emailSearch = [];
    if (username) {
      const results = yield* _searchForUsername(username);
      usernameSearch.push(...results);
    }
    if (email) {
      const results = yield* _searchForEmail(email);
      emailSearch.push(...results);
    }
    return { usernameSearch, emailSearch };
  });
  const _verifyGhostUserExists = Effect.fn(
    () => _getUserById(GhostUserDefaults.id).pipe(Effect.map((user2) => !!user2))
  );
  const _createGhostUser = Effect.fn(
    () => _getUserById(GhostUserDefaults.id).pipe(
      Effect.flatMap(
        (user2) => user2 ? Effect.succeed(user2) : _createNewUser({
          ...GhostUserDefaults,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          emailVerified: false
        })
      )
    )
  );
  const _getGhostUser = Effect.fn(
    () => _getUserById(GhostUserDefaults.id).pipe(
      Effect.flatMap((user2) => user2 ? Effect.succeed(user2) : _createGhostUser())
    )
  );
  const _CatchErrs = (capt) => Effect.catchTags(
    AuthErrorTagsEntries.reduce(
      (acc, tag) => {
        acc[tag] = () => Effect.succeed({
          status: "error",
          message: `An error occurred while deleting ${capt}`
        });
        return acc;
      },
      {}
    )
  );
  const verifyEmail = {
    /**
     * Retrieves an email verification token by its ID.
     *
     * @param id - The ID of the email verification token to retrieve.
     * @returns A promise that resolves to the email verification token if found, otherwise undefined.
     */
    get: _getVerificationToken,
    /**
     * Creates a new email verification token in the database.
     *
     * @param userId - The ID of the user to create the token for.
     * @returns A promise that resolves to the created email verification token.
     */
    create: _createVerificationToken,
    /**
     * Deletes an email verification token from the database.
     *
     * @param userId - The ID of the user associated with the token.
     * @returns A promise that resolves to the deletion response.
     */
    delete: _deleteVerificationToken
  };
  const oAuth = {
    /**
     * Creates a new OAuth account in the database.
     *
     * @param input - The OAuth account data to create.
     * @returns A promise that resolves to the created OAuth account.
     */
    create: _createNewOAuthAccount,
    /**
     * Deletes an OAuth user account from the database.
     *
     * @param input - An object containing the userId and provider of the OAuth account to delete.
     * @returns A promise that resolves to a status and message indicating the result of the deletion.
     */
    delete: (input) => _deleteOAuthUserAccount(input).pipe(
      Effect.flatMap(
        () => Effect.succeed({
          status: "success",
          message: "OAuth account deleted successfully"
        })
      ),
      _CatchErrs("OAuth account")
    ),
    /**
     * Searches for an OAuth account by provider user ID and user ID.
     *
     * @param input - An object containing the providerUserId and userId to search for.
     * @returns A promise that resolves to the found OAuth account if it exists, otherwise undefined.
     */
    searchByProviderId: _searchOAuthAccountByProviderId,
    /**
     * Searches for OAuth providers for a given user ID.
     *
     * @param input - An object containing the providerId and userId to search for.
     * @returns A promise that resolves to the found OAuth account if it exists, otherwise undefined.
     */
    searchProvidersForId: _searchOauthProvidersForId
  };
  const permission = {
    /**
     * Retrieves the current permission for a user by their ID.
     *
     * @param id - The ID of the user whose permission is to be retrieved.
     * @returns A promise that resolves to the user's permission if found, otherwise undefined.
     */
    currentStatus: _getCurrentPermission
  };
  const session = {
    /**
     * Creates a new session for a user.
     *
     * @param data - The session data to create.
     * @returns A promise that resolves to the created session.
     */
    create: _createNewSession,
    /**
     * Retrieves a user's Session by its ID.
     *
     * @param id - The ID of the session to retrieve.
     * @returns A promise that resolves to the session if found, otherwise undefined.
     */
    getById: _getSessionById,
    /**
     * Retrieves a session along with its associated user by session ID.
     *
     * @param sessionId - The ID of the session to retrieve.
     * @returns A promise that resolves to an object containing the session and user if found, otherwise undefined.
     */
    sessionWithUser: _getSessionWithUserById,
    /**
     * Deletes a session by its ID.
     *
     * @param input - The ID of the session to delete.
     * @returns A promise that resolves to a status and message indicating the result of the deletion.
     */
    delete: (input) => _deleteSession(input).pipe(
      Effect.flatMap(
        () => Effect.succeed({ status: "success", message: "Session deleted successfully" })
      ),
      _CatchErrs("Session")
    ),
    /**
     * Updates a session's expiration date.
     *
     * @param input - An object containing the session ID and the new expiration date.
     * @returns A promise that resolves to the updated session.
     */
    update: _updateSession
  };
  const user = {
    /**
     * Creates a new user with the specified permissions.
     *
     * @param userData - The data for the new user.
     * @param rank - The permission rank for the new user.
     * @returns A promise that resolves to the created user.
     */
    create: _createNewUserWithPermission,
    /**
     * Updates user data for a specified user.
     *
     * @param input - An object containing the userId and the userData to update.
     * @returns A promise that resolves to the updated user.
     */
    update: _updateUserData,
    /**
     * Searches for users by username.
     *
     * @param username - The username to search for.
     * @param email - The email to search for.
     * @returns A promise that resolves to an array of users matching the username.
     */
    searchUsersForUsernameOrEmail: _searchForUsernameOrEmail,
    /**
     * Verifies the existence of the ghost user.
     *
     * @returns A promise that resolves to true if the ghost user exists, otherwise false.
     */
    ghost: {
      /**
       * Verifies the existence of the ghost user.
       *
       * @returns A promise that resolves to true if the ghost user exists, otherwise false.
       */
      verifyExists: _verifyGhostUserExists,
      /**
       * Creates the ghost user if it does not already exist.
       *
       * @returns A promise that resolves to the ghost user.
       */
      create: _createGhostUser,
      /**
       * Retrieves the ghost user.
       *
       * @returns A promise that resolves to the ghost user.
       */
      get: _getGhostUser
    }
  };
  return {
    verifyEmail,
    oAuth,
    permission,
    session,
    user
  };
});
var auth_default = SDKAuthModule;

const cacheTags = {
  dynamicConfig: ["dynamic-config"],
  npmPackage: ["npm-package"],
  plugins: ["plugins"],
  folder: ["folder"],
  folderTree: ["folder-tree"],
  folderList: ["folder-list"],
  pages: ["pages"],
  pageFolderTree: ["page-folder-tree"],
  middleware: ["middleware"],
  taxonomy: ["taxonomy"],
  tags: ["tags"],
  categories: ["categories"]
};
const cacheKeyGetters = {
  dynamicConfig: (id) => `dynamic-config:${id}`,
  npmPackage: (name, version) => `npm-package:${name.replace("/", "-")}:${version}`,
  plugins: (name) => `plugins:${name}`,
  folder: (folderId) => `folder:${folderId}`,
  folderTree: () => "folder-tree",
  folderList: () => "folder-list",
  page: (pageId) => `page:${pageId}`,
  pageFolderTree: () => "page-folder-tree",
  middleware: () => "middleware",
  tags: () => "tags",
  categories: () => "categories",
  categoryById: (categoryId) => `category:${categoryId}`,
  categoryBySlug: (slug) => `category-slug:${slug}`,
  tagById: (tagId) => `tag:${tagId}`,
  tagBySlug: (slug) => `tag-slug:${slug}`
};

const SDKClearModule = Effect.gen(function* () {
  const { invalidateTags, delete: deleteEntry } = yield* cache_default;
  const CLEAR = {
    /**
     * Clears a cached page by its ID.
     * @param id - The ID of the page to clear from the cache.
     * @returns An Effect that resolves when the operation is complete.
     */
    page: {
      /**
       * Clears a cached page by its ID.
       * @param id - The ID of the page to clear from the cache.
       * @returns An Effect that resolves when the operation is complete.
       */
      byId: Effect.fn((id) => deleteEntry(cacheKeyGetters.page(id)))
    },
    /**
     * Clears cached data related to various entities.
     * @returns An Effect that resolves when the operation is complete.
     */
    pages: invalidateTags([
      ...cacheTags.pages,
      ...cacheTags.pageFolderTree,
      ...cacheTags.folderTree,
      ...cacheTags.folderList
    ]),
    /**
     * Clears cached data related to the latest NPM package versions.
     * @returns An Effect that resolves when the operation is complete.
     */
    latestVersion: invalidateTags(cacheTags.npmPackage),
    /**
     * Clears cached folder trees and page folder trees.
     * @returns An Effect that resolves when the operation is complete.
     */
    folderTree: invalidateTags([...cacheTags.folderTree, ...cacheTags.pageFolderTree]),
    /**
     * Clears the cached folder list.
     * @returns An Effect that resolves when the operation is complete.
     */
    folderList: invalidateTags(cacheTags.folderList)
  };
  return CLEAR;
});
var clear_default = SDKClearModule;

const resolveStorageManagerUrls = (smResolver) => (obj, attributes) => Effect.gen(function* () {
  if (!obj) return;
  const initialObject = obj;
  const attrs = Array.isArray(attributes) ? attributes : [attributes];
  for (const attr of attrs) {
    const entryData = initialObject[attr];
    if (typeof entryData !== "string") continue;
    if (!entryData.startsWith("storage-file://")) continue;
    const newData = yield* Effect.tryPromise(() => smResolver(entryData));
    initialObject[attr] = newData;
  }
  return initialObject;
});

const SiteConfigId = "SCMS_SITE_CONFIG_1";
const SiteConfigVersion = "1.0.0";
const MailerConfigId = "SCMS_MAILER_CONFIG_1";
const MailerConfigVersion = "1.0.0";
const NotificationSettingsId = "SCMS_NOTIFICATION_SETTINGS_1";
const NotificationSettingsVersion = "1.0.0";
const TemplateConfigId = "SCMS_EMAIL_TEMPLATES_1";
const TemplateConfigVersion = "1.0.0";

const defaultTemplates$1 = {
  /**
   * A simple HTML template for general notifications.
   *
   * Variables:
   * - `data.title`: The title of the notification.
   * - `data.message`: The message content of the notification.
   */
  notifications: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                {{data.title}}
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                {{data.message}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
  /**
   * A simple HTML template for password reset emails.
   *
   * Variables:
   * - `data.link`: The password reset link.
   */
  passwordReset: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                Reset Your Password
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                Click the button below, or copy-paste the link to reset your password!
                <br />
                <br />
                If you didn't request a password reset, you can ignore this email and
                your password will not be changed.
              </div>
              <div style="text-align:left;padding:12px 24px 32px 24px">
                <a
                  href="{{data.link}}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#0068FF;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span>Reset Password</span></a
                >
              </div>
              <div
                style="font-size:12px;font-weight:normal;padding:16px 24px 16px 24px"
              >
                Link: {{data.link}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
  /**
   * A simple HTML template for user invite emails.
   *
   * Variables:
   * - `site.title`: The title of the inviting organization or application.
   * - `data.link`: The link for the user to set their password and get started.
   */
  userInvite: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                New User Invite from {{site.title}}
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                You have been invited to join {{site.title}}! Click the button below to set your password and get started.
              </div>
              <div style="text-align:left;padding:12px 24px 32px 24px">
                <a
                  href="{{data.link}}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#0068FF;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span>Set Password</span
                  ></a
                >
              </div>
              <div
                style="font-size:12px;font-weight:normal;padding:16px 24px 16px 24px"
              >
                Link: {{data.link}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
  /**
   * A simple HTML template for email verification.
   *
   * Variables:
   * - `data.link`: The email verification link.
   */
  verifyEmail: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                Verify your Email
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                Click the button below, or copy-paste the link to verify your
                email!
              </div>
              <div style="text-align:left;padding:12px 24px 32px 24px">
                <a
                  href="{{data.link}}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#0068FF;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span>Verify Email</span></a
                >
              </div>
              <div
                style="font-size:12px;font-weight:normal;padding:16px 24px 16px 24px"
              >
                Link: {{data.link}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`
};
var mailer_default = defaultTemplates$1;

const castData = ({
  id,
  data
}) => Effect.succeed({
  id,
  data
});

const cacheKey$2 = cacheKeyGetters.dynamicConfig;
const cacheOpts$2 = { tags: cacheTags.dynamicConfig };
const SDKConfigModule = Effect.gen(function* () {
  const [{ withCodec }, { merge }, cache, smResolver] = yield* Effect.all([
    DBClientLive,
    Deepmerge,
    CacheService,
    StorageManagerResolver
  ]);
  const resolveUrls = resolveStorageManagerUrls(smResolver);
  const resolveStorageManagerUrl = (attributes) => (obj) => resolveUrls(obj?.data, attributes).pipe(
    Effect.map((data) => {
      if (!data) return obj;
      return { ...obj, data };
    })
  );
  const _insert = withCodec({
    decoder: StudioCMSDynamicConfigSettings.Select,
    encoder: StudioCMSDynamicConfigSettings.Insert,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSDynamicConfigSettings").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSDynamicConfigSettings").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _select = withCodec({
    decoder: Schema$1.UndefinedOr(StudioCMSDynamicConfigSettings.Select),
    encoder: Schema$1.String,
    callbackFn: (db, id) => db(
      (client) => client.selectFrom("StudioCMSDynamicConfigSettings").selectAll().where("id", "=", id).executeTakeFirst()
    )
  });
  const _update = withCodec({
    decoder: StudioCMSDynamicConfigSettings.Select,
    encoder: StudioCMSDynamicConfigSettings.Update,
    callbackFn: (db, { id, data }) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSDynamicConfigSettings").set({ data }).where("id", "=", id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSDynamicConfigSettings").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
      })
    )
  });
  const _tappedCacheUpdate = (fn) => Effect.fn(
    (id, data) => fn({ id, data: JSON.stringify(data) }).pipe(
      Effect.tap(() => cache.set(cacheKey$2(id), data, cacheOpts$2))
    )
  );
  const setAndReturn = (id, data) => Effect.gen(function* () {
    yield* cache.set(cacheKey$2(id), data, cacheOpts$2);
    return yield* castData({ id, data });
  });
  const freshGet = Effect.fn(function* (id) {
    const uncached = yield* _select(id);
    if (!uncached) return void 0;
    return yield* setAndReturn(id, uncached.data);
  });
  const create = _tappedCacheUpdate(_insert);
  const update = _tappedCacheUpdate(_update);
  const get = Effect.fn(
    (id) => cache.get(cacheKey$2(id)).pipe(
      Effect.flatMap(
        (cached) => cached ? castData({ id, data: cached }) : Effect.fail(new CacheMissError())
      ),
      Effect.catchTag("CacheMissError", () => freshGet(id))
    )
  );
  const siteConfig = {
    /**
     * Retrieves the site configuration.
     *
     * @returns An effect that yields the site configuration entry or undefined if not found, or a database error.
     */
    get: () => get(SiteConfigId).pipe(
      Effect.flatMap(
        resolveStorageManagerUrl(["siteIcon", "defaultOgImage", "loginPageCustomImage"])
      )
    ),
    /**
     * Updates the site configuration.
     *
     * @param data - The new site configuration data to store.
     * @returns An effect that yields the updated site configuration entry or a database error.
     */
    update: (data) => update(SiteConfigId, {
      ...data,
      _config_version: SiteConfigVersion
    }),
    /**
     * Initializes the site configuration.
     *
     * @param data - The site configuration data to store.
     * @returns An effect that yields the created site configuration entry or a database error.
     */
    init: (data) => create(SiteConfigId, {
      ...data,
      _config_version: SiteConfigVersion
    })
  };
  const mailerConfig = {
    /**
     * Retrieves the mailer configuration.
     *
     * @returns An effect that yields the mailer configuration entry or undefined if not found, or a database error.
     */
    get: () => get(MailerConfigId),
    /**
     * Updates the mailer configuration.
     *
     * @param data - The new mailer configuration data to store.
     * @returns An effect that yields the updated mailer configuration entry or a database error.
     */
    update: (data) => update(MailerConfigId, {
      ...data,
      _config_version: MailerConfigVersion
    }),
    /**
     * Initializes the mailer configuration.
     *
     * @param data - The mailer configuration data to store.
     * @returns An effect that yields the created mailer configuration entry or a database error.
     */
    init: (data) => create(MailerConfigId, {
      ...data,
      _config_version: MailerConfigVersion
    })
  };
  const notificationConfig = {
    /**
     * Retrieves the notification settings configuration.
     *
     * @returns An effect that yields the notification settings configuration entry or undefined if not found, or a database error.
     */
    get: () => get(NotificationSettingsId),
    /**
     * Updates the notification settings configuration.
     *
     * @param data - The new notification settings configuration data to store.
     * @returns An effect that yields the updated notification settings configuration entry or a database error.
     */
    update: (data) => update(NotificationSettingsId, {
      ...data,
      _config_version: NotificationSettingsVersion
    }),
    /**
     * Initializes the notification settings configuration.
     *
     * @param data - The notification settings configuration data to store.
     * @returns An effect that yields the created notification settings configuration entry or a database error.
     */
    init: (data) => create(NotificationSettingsId, {
      ...data,
      _config_version: NotificationSettingsVersion
    })
  };
  const templateConfig = {
    /**
     * Retrieves the template configuration.
     *
     * @returns An effect that yields the template configuration entry or undefined if not found, or a database error.
     */
    get: () => get(TemplateConfigId),
    /**
     * Updates the template configuration by merging with existing data.
     *
     * @param data - The new template configuration data to merge and store.
     * @returns An effect that yields the updated template configuration entry or a database error.
     */
    update: (data) => Effect.gen(function* () {
      const currentData = yield* get(TemplateConfigId);
      if (!currentData) {
        const updatedData2 = yield* merge((m) => m(mailer_default, data));
        return yield* create(TemplateConfigId, {
          ...updatedData2,
          _config_version: TemplateConfigVersion
        });
      }
      const updatedData = yield* merge((m) => m(currentData.data, data));
      return yield* update(TemplateConfigId, {
        ...updatedData,
        _config_version: TemplateConfigVersion
      });
    }),
    /**
     * Initializes the template configuration.
     *
     * @param data - The template configuration data to store.
     * @returns An effect that yields the created template configuration entry or a database error.
     */
    init: (data) => create(TemplateConfigId, {
      ...data,
      _config_version: TemplateConfigVersion
    })
  };
  return {
    siteConfig,
    mailerConfig,
    notificationConfig,
    templateConfig
  };
});
var config_default = SDKConfigModule;

class FolderTreeError extends Data.TaggedError("FolderTreeError") {
}
const useFolderTreeError = (_try) => Effect.try({
  try: _try,
  catch: (error) => new FolderTreeError({ cause: error })
});
const SDKFolderTree = Effect.gen(function* () {
  const { withDecoder } = yield* DBClientLive;
  const _getCurrentFolders = withDecoder({
    decoder: Schema$1.Array(StudioCMSPageFolderStructure.Select),
    callbackFn: (query) => query((db) => db.selectFrom("StudioCMSPageFolderStructure").selectAll().execute())
  });
  const generateFolderTree = Effect.fn(
    (folders) => useFolderTreeError(() => {
      const folderMap = {};
      for (const folder of folders) {
        folderMap[folder.id] = {
          id: folder.id,
          name: folder.name,
          pageData: null,
          page: false,
          children: []
        };
      }
      const rootFolders = [];
      for (const folder of folders) {
        const childFolder = folderMap[folder.id];
        if (!childFolder) continue;
        if (folder.parent === null || folder.parent === void 0) {
          rootFolders.push(childFolder);
        } else {
          const parentFolder = folderMap[folder.parent];
          if (parentFolder) {
            parentFolder.children.push(childFolder);
          }
        }
      }
      return rootFolders;
    })
  );
  const getFullPath = Effect.fn(
    (tree, path) => useFolderTreeError(() => {
      const result = [];
      function helper(nodes, pathParts) {
        if (pathParts.length === 0) return false;
        const [current, ...rest] = pathParts;
        for (const node of nodes) {
          if (node.name === current) {
            result.push(node.name);
            if (rest.length === 0 || helper(node.children, rest)) {
              return true;
            }
            result.pop();
          }
        }
        return false;
      }
      helper(tree, path);
      return result;
    })
  );
  const findNodeByPath = Effect.fn(
    (tree, path) => useFolderTreeError(() => {
      function _findNodeByPath(tree2, path2) {
        if (path2.length === 0) return null;
        const [current, ...rest] = path2;
        for (const node of tree2) {
          if (node.name === current) {
            if (rest.length === 0) return node;
            return _findNodeByPath(node.children, rest);
          }
        }
        return null;
      }
      return _findNodeByPath(tree, path);
    })
  );
  const findNodesAlongPath = Effect.fn(
    (tree, path) => useFolderTreeError(() => {
      const result = [];
      function helper(nodes, pathParts) {
        if (pathParts.length === 0) return false;
        const [current, ...rest] = pathParts;
        for (const node of nodes) {
          if (node.name === current) {
            result.push(node);
            if (rest.length === 0 || helper(node.children, rest)) {
              return true;
            }
            result.pop();
          }
        }
        return false;
      }
      helper(tree, path);
      return result;
    })
  );
  const findNodesAlongPathToId = Effect.fn(
    (tree, id) => useFolderTreeError(() => {
      const path = [];
      function helper(nodes, targetId) {
        for (const node of nodes) {
          path.push(node);
          if (node.id === targetId) {
            return true;
          }
          if (helper(node.children, targetId)) {
            return true;
          }
          path.pop();
        }
        return false;
      }
      helper(tree, id);
      return path;
    })
  );
  const findNodeById = Effect.fn(
    (tree, id) => useFolderTreeError(() => {
      function _findNodeById(tree2, id2) {
        for (const node of tree2) {
          if (node.id === id2) {
            return node;
          }
          const found = _findNodeById(node.children, id2);
          if (found) {
            return found;
          }
        }
        return null;
      }
      return _findNodeById(tree, id);
    })
  );
  const addPageToFolderTree = Effect.fn(function* (tree, folderId, newPage) {
    const parentFolder = yield* findNodeById(tree, folderId);
    if (!parentFolder) {
      tree.push(newPage);
      return tree;
    }
    parentFolder.children.push(newPage);
    return tree;
  });
  const buildFolderTree = _getCurrentFolders().pipe(Effect.flatMap(generateFolderTree));
  const getAvailableFolders = _getCurrentFolders().pipe(
    Effect.map(
      (folders) => folders.map(
        (folder) => ({
          id: folder.id,
          name: folder.name,
          parent: folder.parent
        })
      )
    )
  );
  return {
    generateFolderTree,
    getFullPath,
    findNodeByPath,
    findNodesAlongPath,
    findNodesAlongPathToId,
    findNodeById,
    addPageToFolderTree,
    buildFolderTree,
    getAvailableFolders
  };
});

class ParsersError extends Data.TaggedError("ParsersError") {
}
const useParsersError = (_try) => Effect.try({
  try: _try,
  catch: (cause) => new ParsersError({ cause })
});
const SDKParsers = Effect.gen(function* () {
  const parseIdNumberArray = Effect.fn(
    (ids) => Schema$1.decodeUnknown(Schema$1.Array(Schema$1.Number))(ids)
  );
  const parseIdStringArray = Effect.fn(
    (ids) => Schema$1.decodeUnknown(Schema$1.Array(Schema$1.String))(ids)
  );
  const fixDiff = Effect.fn(
    (items) => useParsersError(() => {
      if (Array.isArray(items)) {
        const toReturn = [];
        for (const { pageMetaData, ...rest } of items) {
          toReturn.push({
            ...rest,
            pageMetaData
          });
        }
        return toReturn;
      }
      return {
        ...items,
        pageMetaData: items.pageMetaData
      };
    })
  );
  return {
    parseIdNumberArray,
    parseIdStringArray,
    fixDiff
  };
});

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function emptyStringToUndefined(value) {
  return value.trim() === "" ? void 0 : value;
}
function slugify(text, options = {}) {
  const { separator: rawSeparator = "-", lowercase = true } = options;
  const separator = emptyStringToUndefined(rawSeparator) || "-";
  const escapedSeparator = escapeRegExp(separator);
  let slug = text.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(new RegExp(`[^a-zA-Z0-9\\s${escapedSeparator}]`, "g"), "").trim().replace(/\s+/g, separator).replace(new RegExp(`(?:${escapedSeparator})+`, "g"), separator);
  if (lowercase) {
    slug = slug.toLowerCase();
  }
  return slug;
}

class CollectorError extends Data.TaggedError("CollectorError") {
}
const useCollectorError = (_try) => Effect.try({
  try: _try,
  catch: (error) => new CollectorError({ cause: error })
});
const SDKCollectors = Effect.gen(function* () {
  const [
    { withCodec },
    { findNodesAlongPathToId },
    { parseIdNumberArray, parseIdStringArray },
    smResolver
  ] = yield* Effect.all([DBClientLive, SDKFolderTree, SDKParsers, StorageManagerResolver]);
  const resolveUrls = resolveStorageManagerUrls(smResolver);
  const _getUserData = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSUsersTable.Select),
    callbackFn: (query, id) => query(
      (db) => db.selectFrom("StudioCMSUsersTable").selectAll().where("id", "=", id).executeTakeFirst()
    )
  });
  const _getPageContent = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSPageContent.Select),
    callbackFn: (query, id) => query(
      (db) => db.selectFrom("StudioCMSPageContent").selectAll().where("contentId", "=", id).execute()
    )
  });
  const _getOAuthAccountData = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSOAuthAccounts.Select),
    callbackFn: (query, id) => query(
      (db) => db.selectFrom("StudioCMSOAuthAccounts").selectAll().where("userId", "=", id).execute()
    )
  });
  const _getUserPermissionsData = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPermissions.Select),
    callbackFn: (query, id) => query(
      (db) => db.selectFrom("StudioCMSPermissions").selectAll().where("user", "=", id).executeTakeFirst()
    )
  });
  const _transformPageDataToMetaOnly = (data) => useCollectorError(() => {
    if (Array.isArray(data)) {
      return data.map(
        ({ defaultContent, multiLangContent, ...rest2 }) => rest2
      );
    }
    const {
      defaultContent: _dump1,
      multiLangContent: _dump2,
      ...rest
    } = data;
    return rest;
  });
  const _collectContributorData = Effect.fn(
    (ids) => Effect.all(ids.map((id) => _getUserData(id))).pipe(
      Effect.map((results) => results.filter((user) => !!user))
    )
  );
  const collectCategories = withCodec({
    encoder: Schema$1.Array(Schema$1.Number),
    decoder: Schema$1.Array(StudioCMSPageDataCategories.Select),
    callbackFn: (db, ids) => db(
      (c) => c.selectFrom("StudioCMSPageDataCategories").selectAll().where("id", "in", ids).execute()
    )
  });
  const collectTags = withCodec({
    encoder: Schema$1.Array(Schema$1.Number),
    decoder: Schema$1.Array(StudioCMSPageDataTags.Select),
    callbackFn: (db, ids) => db((c) => c.selectFrom("StudioCMSPageDataTags").selectAll().where("id", "in", ids).execute())
  });
  function collectPageData(page, tree, metaOnly = false) {
    return Effect.gen(function* () {
      const [categories, tags, contributorsData, authorData] = yield* Effect.all([
        parseIdNumberArray(page.categories || []).pipe(Effect.flatMap(collectCategories)),
        parseIdNumberArray(page.tags || []).pipe(Effect.flatMap(collectTags)),
        parseIdStringArray(page.contributorIds || []).pipe(Effect.flatMap(_collectContributorData)),
        _getUserData(page.authorId)
      ]);
      let multiLangContent = [];
      if (!metaOnly) {
        multiLangContent = yield* _getPageContent(page.id);
      }
      const defaultContent = multiLangContent?.find(
        (content) => content.contentLang === page.contentLang
      );
      const safeSlug = page.slug === "index" ? "/" : slugify(page.slug);
      let urlRoute = safeSlug.startsWith("/") ? safeSlug : `/${safeSlug}`;
      if (page.parentFolder) {
        const urlParts = yield* findNodesAlongPathToId(tree, page.parentFolder);
        const folderPath = urlParts.map(({ name }) => slugify(name)).join("/");
        urlRoute = folderPath.length > 0 ? `/${folderPath}${safeSlug === "/" ? "" : `/${safeSlug}`}` : safeSlug;
      }
      let authorDataTyped;
      if (authorData) {
        const { email, password, ...rest } = authorData;
        authorDataTyped = {
          ...rest
        };
      }
      let contributorsDataTyped;
      if (contributorsData) {
        contributorsDataTyped = contributorsData.map(({ email, password, ...rest }) => ({
          ...rest
        }));
      }
      const returnData = yield* resolveUrls(
        {
          ...page,
          urlRoute,
          categories,
          tags,
          authorData: authorDataTyped,
          contributorsData: contributorsDataTyped,
          multiLangContent,
          defaultContent
        },
        ["heroImage"]
      ).pipe(Effect.catchTag("UnknownException", (e) => new CollectorError({ cause: e })));
      if (!returnData) {
        return yield* new CollectorError({
          cause: "Unknown error occurred while resolving storage manager URL"
        });
      }
      if (metaOnly) {
        return yield* _transformPageDataToMetaOnly(returnData);
      }
      return returnData;
    });
  }
  const collectUserData = Effect.fn(
    (user) => Effect.all([_getOAuthAccountData(user.id), _getUserPermissionsData(user.id)]).pipe(
      Effect.map(
        ([oAuthData, permissionsData]) => ({
          ...user,
          oAuthData,
          permissionsData
        })
      )
    )
  );
  return {
    collectCategories,
    collectTags,
    collectPageData,
    collectUserData
  };
});

class NpmRegistryResponseSchema extends Schema$1.Class(
  "NpmRegistryResponseSchema"
)({
  _id: Schema$1.String,
  _integrity: Schema$1.String,
  _npmUser: Schema$1.Struct({
    name: Schema$1.String,
    email: Schema$1.String,
    trustedPublisher: Schema$1.Struct({
      id: Schema$1.String,
      oidcConfigId: Schema$1.String
    })
  }),
  maintainers: Schema$1.Array(
    Schema$1.Struct({
      name: Schema$1.String,
      email: Schema$1.String
    })
  ),
  name: Schema$1.String,
  version: Schema$1.String,
  description: Schema$1.String,
  license: Schema$1.String,
  author: Schema$1.optional(
    Schema$1.Struct({
      name: Schema$1.String,
      url: Schema$1.String
    })
  ),
  repository: Schema$1.optional(
    Schema$1.Struct({
      type: Schema$1.String,
      url: Schema$1.String,
      directory: Schema$1.optional(Schema$1.String)
    })
  ),
  contributors: Schema$1.optional(
    Schema$1.Array(
      Schema$1.Struct({
        name: Schema$1.String,
        url: Schema$1.optional(Schema$1.String)
      })
    )
  ),
  keywords: Schema$1.Array(Schema$1.String),
  homepage: Schema$1.optional(Schema$1.String),
  publishConfig: Schema$1.optional(
    Schema$1.Struct({
      access: Schema$1.String,
      provenance: Schema$1.Boolean
    })
  ),
  sideEffects: Schema$1.optional(Schema$1.Boolean)
}) {
}
const parseNpmRegistryResponse = Effect.fn(function* (response) {
  const data = yield* Effect.tryPromise(() => response.json());
  return yield* Schema$1.decodeUnknown(NpmRegistryResponseSchema)(data);
});
class GetFromNPMError extends Data.TaggedError("GetFromNPMError") {
}
const cacheKey$1 = cacheKeyGetters.npmPackage;
const cacheOpts$1 = { tags: cacheTags.npmPackage };
const GetFromNPM = Effect.gen(function* () {
  const [{ memoize, getCacheStatus }] = yield* Effect.all([CacheService]);
  const effectFetch = Effect.fn(
    (url) => Effect.tryPromise({
      try: () => fetch(url),
      catch: (error) => new GetFromNPMError({
        message: `Failed to fetch NPM package data: ${String(error)}`,
        cause: error
      })
    })
  );
  const _remapCacheStatusData = (status) => status ? status.lastUpdatedAt : /* @__PURE__ */ new Date();
  const _remapData = (pkg, srcVer) => ({ version }) => Effect.all({
    version: Effect.succeed(version),
    lastCacheUpdate: getCacheStatus(cacheKey$1(pkg, srcVer || "latest")).pipe(
      Effect.map(_remapCacheStatusData)
    )
  });
  const getDataFromNPM = Effect.fn(
    (pkg, ver) => memoize(
      cacheKey$1(pkg, ver || "latest"),
      effectFetch(`https://registry.npmjs.org/${pkg}/${ver || "latest"}`).pipe(
        Effect.flatMap(parseNpmRegistryResponse)
      ),
      cacheOpts$1
    )
  );
  const getVersion = Effect.fn(
    (pkg, ver) => getDataFromNPM(pkg, ver).pipe(Effect.flatMap(_remapData(pkg, ver)))
  );
  return { getVersion, getDataFromNPM };
}).pipe(Effect.provide(HTTPClient.Default));

class UsersError extends Data.TaggedError("UsersError") {
}
const useUsersError = (_try) => Effect.try({
  try: _try,
  catch: (error) => new UsersError({ cause: error })
});
const SDKUsers = Effect.gen(function* () {
  const [{ GhostUserDefaults }, { effectDb }] = yield* Effect.all([SDKDefaults, DBClientLive]);
  const verifyRank = Effect.fn(
    (users, permissions, rank) => useUsersError(() => {
      const filteredUsers = permissions.filter((user) => user.rank === rank);
      const permitted = [];
      for (const user of filteredUsers) {
        const foundUser = users.find((u) => u.id === user.user);
        if (foundUser) {
          permitted.push({ id: foundUser.id, name: foundUser.name });
        }
      }
      return permitted;
    })
  );
  const combineRanks = Effect.fn(
    (rank, users) => useUsersError(() => users.map((user) => ({ ...user, rank })))
  );
  const clearUserReferences = Effect.fn(function* (userId) {
    yield* Effect.all([
      ...[
        {
          table: "StudioCMSUserResetTokens",
          lhs: "userId"
        },
        {
          table: "StudioCMSOAuthAccounts",
          lhs: "userId"
        },
        {
          table: "StudioCMSPermissions",
          lhs: "user"
        },
        {
          table: "StudioCMSSessionTable",
          lhs: "userId"
        }
      ].map(
        ({ table, lhs }) => effectDb((db) => db.deleteFrom(table).where(lhs, "=", userId).executeTakeFirstOrThrow())
      ),
      ...[
        {
          table: "StudioCMSDiffTracking",
          lhs: "userId",
          update: { userId: GhostUserDefaults.id }
        },
        {
          table: "StudioCMSPageData",
          lhs: "authorId",
          update: { authorId: GhostUserDefaults.id }
        }
      ].map(
        ({ table, lhs, update }) => effectDb(
          (db) => db.updateTable(table).set(update).where(lhs, "=", userId).executeTakeFirstOrThrow()
        )
      )
    ]);
    return true;
  });
  return {
    verifyRank,
    combineRanks,
    clearUserReferences
  };
});

const ranks = ["owner", "admin", "editor", "visitor"];
class PaginateError extends Error {
  _tag = "PaginateError";
}
class KillSwitch {
  _tag = "KillSwitch";
}
const SDKGetModule = Effect.gen(function* () {
  const [
    { withCodec, withDecoder },
    { verifyRank, combineRanks },
    { collectUserData, collectPageData },
    { siteConfig: sdkSiteConfig },
    { GhostUserDefaults },
    { memoize },
    { buildFolderTree, getAvailableFolders, addPageToFolderTree },
    { getVersion }
  ] = yield* Effect.all([
    DBClientLive,
    SDKUsers,
    SDKCollectors,
    config_default,
    SDKDefaults,
    cache_default,
    SDKFolderTree,
    GetFromNPM
  ]);
  const _getUsers = withDecoder({
    decoder: Schema$1.Array(StudioCMSUsersTable.Select),
    callbackFn: (db) => db((client) => client.selectFrom("StudioCMSUsersTable").selectAll().execute())
  });
  const _getUserById = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSUsersTable.Select),
    callbackFn: (db, userId) => db(
      (client) => client.selectFrom("StudioCMSUsersTable").selectAll().where("id", "=", userId).executeTakeFirst()
    )
  });
  const _getUserByUsername = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSUsersTable.Select),
    callbackFn: (db, username) => db(
      (client) => client.selectFrom("StudioCMSUsersTable").selectAll().where("username", "=", username).executeTakeFirst()
    )
  });
  const _getUserByEmail = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSUsersTable.Select),
    callbackFn: (db, email) => db(
      (client) => client.selectFrom("StudioCMSUsersTable").selectAll().where("email", "=", email).executeTakeFirst()
    )
  });
  const _getCurrentPermissions = withDecoder({
    decoder: Schema$1.Array(StudioCMSPermissions.Select),
    callbackFn: (db) => db((client) => client.selectFrom("StudioCMSPermissions").selectAll().execute())
  });
  const _getFolder = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPageFolderStructure.Select),
    callbackFn: (db, folderId) => db(
      (client) => client.selectFrom("StudioCMSPageFolderStructure").selectAll().where("id", "=", folderId).executeTakeFirst()
    )
  });
  const _getAllPagesPaginated = withCodec({
    encoder: Schema$1.Struct({
      limit: Schema$1.Number,
      offset: Schema$1.Number
    }),
    decoder: Schema$1.Array(StudioCMSPageData.Select),
    callbackFn: (db, { limit, offset }) => db(
      (client) => client.selectFrom("StudioCMSPageData").selectAll().orderBy("title", "asc").limit(limit).offset(offset).execute()
    )
  });
  const _getAllPagesBase = withDecoder({
    decoder: Schema$1.Array(StudioCMSPageData.Select),
    callbackFn: (db) => db(
      (client) => client.selectFrom("StudioCMSPageData").selectAll().orderBy("title", "asc").execute()
    )
  });
  const _getPageByIdFromDB = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPageData.Select),
    callbackFn: (db, pageId) => db(
      (client) => client.selectFrom("StudioCMSPageData").selectAll().where("id", "=", pageId).executeTakeFirst()
    )
  });
  const _getPageBySlugFromDB = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPageData.Select),
    callbackFn: (db, slug) => db(
      (client) => client.selectFrom("StudioCMSPageData").selectAll().where("slug", "=", slug).executeTakeFirst()
    )
  });
  const _getPageByPackageFromDB = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPageData.Select),
    callbackFn: (db, packageId) => db(
      (client) => client.selectFrom("StudioCMSPageData").selectAll().where("package", "=", packageId).executeTakeFirst()
    )
  });
  const _getFolderByNameOrId = withCodec({
    encoder: Schema$1.String,
    decoder: StudioCMSPageFolderStructure.Select,
    callbackFn: (db, folderId) => db(
      (client) => client.selectFrom("StudioCMSPageFolderStructure").selectAll().where((eb) => eb.or([eb("id", "=", folderId), eb("name", "=", folderId)])).executeTakeFirstOrThrow()
    )
  });
  const _verifyRank = (rank) => Effect.fn(
    ({
      users,
      permissions
    }) => verifyRank(users, permissions, rank)
  );
  const _getPermissionsByRank = (rank) => Effect.all({
    permissions: _getCurrentPermissions(),
    users: _getUsers()
  }).pipe(Effect.flatMap(_verifyRank(rank)));
  const _combineRanks = ([rank, users]) => combineRanks(rank, users);
  const _processAndVerifyRanks = (ranks2) => Effect.fn(
    ({
      users,
      permissions
    }) => Effect.forEach(
      ranks2,
      (rank) => verifyRank(users, permissions, rank).pipe(Effect.map((res) => [rank, res]))
    )
  );
  const _getCombinedRanks = Effect.fn(
    () => Effect.all({
      permissions: _getCurrentPermissions(),
      users: _getUsers()
    }).pipe(
      Effect.flatMap(_processAndVerifyRanks(ranks)),
      Effect.flatMap(Effect.forEach(_combineRanks)),
      Effect.map((data) => data.flat())
    )
  );
  const _filterOutGhostUser = Effect.fn(
    (users) => Effect.succeed(users.filter((user) => user.id !== GhostUserDefaults.id))
  );
  const _getAllUsers = Effect.fn(
    () => _getUsers().pipe(
      Effect.flatMap(_filterOutGhostUser),
      Effect.flatMap(Effect.forEach(collectUserData))
    )
  );
  const _getUserByIdExposed = Effect.fn(
    (userId) => _getUserById(userId).pipe(
      Effect.flatMap((user) => user ? collectUserData(user) : Effect.succeed(void 0))
    )
  );
  const _getUserByUsernameExposed = Effect.fn(
    (username) => _getUserByUsername(username).pipe(
      Effect.flatMap((user) => user ? collectUserData(user) : Effect.succeed(void 0))
    )
  );
  const _getUserByEmailExposed = Effect.fn(
    (email) => _getUserByEmail(email).pipe(
      Effect.flatMap((user) => user ? collectUserData(user) : Effect.succeed(void 0))
    )
  );
  const validatePagination = Effect.fn(function* (paginate) {
    if (paginate.limit < 0 || paginate.offset < 0) {
      return yield* Effect.fail(new PaginateError("Pagination values must be non-negative"));
    }
    if (paginate.limit === 0) {
      paginate.limit = 10;
    }
    return paginate;
  });
  const __filterPagesByDraft = Effect.fn(
    (pages, includeDrafts) => Effect.succeed(pages.filter(({ draft }) => includeDrafts || draft !== true))
  );
  function convertCombinedPageDataToMetaOnly(data) {
    if (Array.isArray(data)) {
      return data.map(
        ({ defaultContent, multiLangContent, ...data2 }) => data2
      );
    }
    const { defaultContent: _dump1, multiLangContent: _dump2, ...metaOnlyData } = data;
    return metaOnlyData;
  }
  const __getPagesPossiblyPaginated = (paginate) => paginate ? validatePagination(paginate).pipe(Effect.flatMap(_getAllPagesPaginated)) : _getAllPagesBase();
  function _getAllPages(includeDrafts = false, metaOnly = false, paginate) {
    return __getPagesPossiblyPaginated(paginate).pipe(
      Effect.flatMap(
        (pagesRaw) => Effect.all({
          pages: __filterPagesByDraft(pagesRaw, includeDrafts),
          tree: GET.folderTree()
        })
      ),
      Effect.flatMap(
        ({ pages, tree }) => Effect.forEach(
          pages,
          (page) => memoize(cacheKeyGetters.page(page.id), collectPageData(page, tree), {
            tags: cacheTags.pages
          })
        )
      ),
      Effect.map((data) => metaOnly ? convertCombinedPageDataToMetaOnly(data) : data)
    );
  }
  function _getPageById(id, metaOnly = false) {
    return _getPageByIdFromDB(id).pipe(
      Effect.flatMap((page) => page ? Effect.succeed(page) : Effect.fail(new KillSwitch())),
      Effect.flatMap(
        (page) => GET.folderTree().pipe(
          Effect.flatMap(
            (tree) => memoize(cacheKeyGetters.page(page.id), collectPageData(page, tree), {
              tags: cacheTags.pages
            })
          )
        )
      ),
      Effect.map((data) => metaOnly === true ? convertCombinedPageDataToMetaOnly(data) : data),
      Effect.catchTag("KillSwitch", () => Effect.succeed(void 0))
    );
  }
  function _getPageBySlug(slug, metaOnly = false) {
    return _getPageBySlugFromDB(slug).pipe(
      Effect.flatMap((page) => page ? Effect.succeed(page) : Effect.fail(new KillSwitch())),
      Effect.flatMap(
        (page) => GET.folderTree().pipe(
          Effect.flatMap(
            (tree) => memoize(cacheKeyGetters.page(page.id), collectPageData(page, tree), {
              tags: cacheTags.pages
            })
          )
        )
      ),
      Effect.map((data) => metaOnly === true ? convertCombinedPageDataToMetaOnly(data) : data),
      Effect.catchTag("KillSwitch", () => Effect.succeed(void 0))
    );
  }
  function _getPackagesPages(packageName, metaOnly = false) {
    return _getPageByPackageFromDB(packageName).pipe(
      Effect.flatMap((page) => page ? Effect.succeed(page) : Effect.fail(new KillSwitch())),
      Effect.flatMap(
        (page) => GET.folderTree().pipe(
          Effect.flatMap(
            (tree) => memoize(cacheKeyGetters.page(page.id), collectPageData(page, tree), {
              tags: cacheTags.pages
            })
          )
        )
      ),
      Effect.map((data) => metaOnly === true ? convertCombinedPageDataToMetaOnly(data) : data),
      Effect.catchTag("KillSwitch", () => Effect.succeed([]))
    );
  }
  function _folderPages(idOrName, includeDrafts = false, metaOnly = false, paginate) {
    return _getFolderByNameOrId(idOrName).pipe(
      Effect.flatMap(
        ({ id: folderId }) => __getPagesPossiblyPaginated(paginate).pipe(
          Effect.flatMap(
            (pagesRaw) => __filterPagesByDraft(
              pagesRaw.filter((page) => page.parentFolder === folderId),
              includeDrafts
            )
          ),
          Effect.flatMap(
            (pages) => Effect.all({
              pages: Effect.succeed(pages),
              tree: GET.folderTree()
            })
          ),
          Effect.flatMap(
            ({ pages, tree }) => Effect.forEach(
              pages,
              (page) => memoize(cacheKeyGetters.page(page.id), collectPageData(page, tree), {
                tags: cacheTags.pages
              })
            )
          ),
          Effect.map((data) => metaOnly ? convertCombinedPageDataToMetaOnly(data) : data)
        )
      )
    );
  }
  const _pageFolderTree = (excludeDrafts = false) => Effect.gen(function* () {
    const includeDrafts = !excludeDrafts;
    const [tree, pages] = yield* Effect.all([GET.folderTree(), _getAllPages(includeDrafts)]);
    for (const page of pages) {
      if (page.parentFolder) {
        yield* addPageToFolderTree(tree, page.parentFolder, {
          id: page.id,
          name: page.title,
          page: true,
          pageData: page,
          children: []
        });
      } else {
        tree.push({
          id: page.id,
          name: page.title,
          page: true,
          pageData: page,
          children: []
        });
      }
    }
    return tree;
  });
  const getAllCategories = () => memoize(
    cacheKeyGetters.categories(),
    withDecoder({
      decoder: Schema$1.Array(StudioCMSPageDataCategories.Select),
      callbackFn: (db) => db((client) => client.selectFrom("StudioCMSPageDataCategories").selectAll().execute())
    })(),
    { tags: [...cacheTags.categories, ...cacheTags.taxonomy] }
  );
  const getCategoryById = Effect.fn(
    (categoryId) => memoize(
      cacheKeyGetters.categoryById(categoryId),
      withCodec({
        encoder: Schema$1.Number,
        decoder: Schema$1.UndefinedOr(StudioCMSPageDataCategories.Select),
        callbackFn: (db, categoryId2) => db(
          (client) => client.selectFrom("StudioCMSPageDataCategories").selectAll().where("id", "=", categoryId2).executeTakeFirst()
        )
      })(categoryId),
      { tags: [...cacheTags.categories, ...cacheTags.taxonomy] }
    )
  );
  const getCategoryBySlug = Effect.fn(
    (slug) => memoize(
      cacheKeyGetters.categoryBySlug(slug),
      withCodec({
        encoder: Schema$1.String,
        decoder: Schema$1.UndefinedOr(StudioCMSPageDataCategories.Select),
        callbackFn: (db, slug2) => db(
          (client) => client.selectFrom("StudioCMSPageDataCategories").selectAll().where("slug", "=", slug2).executeTakeFirst()
        )
      })(slug),
      { tags: [...cacheTags.categories, ...cacheTags.taxonomy] }
    )
  );
  const getAllTags = () => memoize(
    cacheKeyGetters.tags(),
    withDecoder({
      decoder: Schema$1.Array(StudioCMSPageDataTags.Select),
      callbackFn: (db) => db((client) => client.selectFrom("StudioCMSPageDataTags").selectAll().execute())
    })(),
    { tags: [...cacheTags.tags, ...cacheTags.taxonomy] }
  );
  const getTagById = Effect.fn(
    (tagId) => memoize(
      cacheKeyGetters.tagById(tagId),
      withCodec({
        encoder: Schema$1.Number,
        decoder: Schema$1.UndefinedOr(StudioCMSPageDataTags.Select),
        callbackFn: (db, tagId2) => db(
          (client) => client.selectFrom("StudioCMSPageDataTags").selectAll().where("id", "=", tagId2).executeTakeFirst()
        )
      })(tagId),
      { tags: [...cacheTags.tags, ...cacheTags.taxonomy] }
    )
  );
  const getTagBySlug = Effect.fn(
    (slug) => memoize(
      cacheKeyGetters.tagBySlug(slug),
      withCodec({
        encoder: Schema$1.String,
        decoder: Schema$1.UndefinedOr(StudioCMSPageDataTags.Select),
        callbackFn: (db, slug2) => db(
          (client) => client.selectFrom("StudioCMSPageDataTags").selectAll().where("slug", "=", slug2).executeTakeFirst()
        )
      })(slug),
      { tags: [...cacheTags.tags, ...cacheTags.taxonomy] }
    )
  );
  const GET = {
    /**
     * Lists of permissions categorized by user ranks.
     */
    permissionsLists: {
      /**
       * Retrieves all combined ranks with their corresponding users.
       *
       * @returns An array of combined rank records.
       */
      all: _getCombinedRanks,
      // Dynamically generate functions for each rank (e.g., owners, admins, editors, visitors)
      ...ranks.reduce((acc, rank) => {
        acc[`${rank}s`] = () => _getPermissionsByRank(rank);
        return acc;
      }, {})
    },
    /**
     * User-related GET operations.
     */
    users: {
      /**
       * Retrieves all users excluding the ghost user.
       *
       * @returns An array of user data records.
       */
      all: _getAllUsers,
      /**
       * Retrieves a user by their ID.
       *
       * @param userId - The ID of the user to fetch.
       * @returns The user data record if found, otherwise undefined.
       */
      byId: _getUserByIdExposed,
      /**
       * Retrieves a user by their username.
       *
       * @param username - The username of the user to fetch.
       * @returns The user data record if found, otherwise undefined.
       */
      byUsername: _getUserByUsernameExposed,
      /**
       * Retrieves a user by their email.
       *
       * @param email - The email of the user to fetch.
       * @returns The user data record if found, otherwise undefined.
       */
      byEmail: _getUserByEmailExposed
    },
    /**
     * Retrieves a folder by its ID.
     *
     * @param folderId - The ID of the folder to fetch.
     * @returns The folder record if found, otherwise undefined.
     */
    folder: Effect.fn(
      (folderId) => memoize(cacheKeyGetters.folder(folderId), _getFolder(folderId), {
        tags: cacheTags.folder
      })
    ),
    /**
     * Retrieves the folder tree structure.
     *
     * @returns The folder tree structure.
     */
    folderTree: () => buildFolderTree,
    /**
     * Retrieves a list of folders.
     *
     * @returns An array of folder records.
     */
    folderList: () => memoize(cacheKeyGetters.folderList(), getAvailableFolders, {
      tags: cacheTags.folderList
    }),
    /**
     * Retrieves the site configuration.
     *
     * @returns The site configuration object.
     */
    siteConfig: sdkSiteConfig.get,
    /**
     * Retrieves the latest version of StudioCMS from NPM.
     *
     * @returns The latest version string.
     */
    latestVersion: () => getVersion("studiocms"),
    /**
     * Retrieves all pages.
     *
     * @returns An array of page data records.
     */
    pages: _getAllPages,
    /**
     * Utilities to get pages by specific criteria.
     */
    page: {
      /**
       * Retrieves a page by its ID.
       *
       * @param id - The ID of the page to fetch.
       * @returns The page data record if found, otherwise undefined.
       */
      byId: _getPageById,
      /**
       * Retrieves a page by its slug.
       *
       * @param slug - The slug of the page to fetch.
       * @returns The page data record if found, otherwise undefined.
       */
      bySlug: _getPageBySlug
    },
    /**
     * Retrieves pages associated with a specific package.
     *
     * @param packageName - The name of the package to fetch pages for.
     * @returns An array of page data records associated with the specified package.
     */
    packagePages: _getPackagesPages,
    /**
     * Retrieves pages within a specific folder.
     *
     * @param idOrName - The ID or name of the folder.
     * @returns An array of page data records within the specified folder.
     */
    folderPages: _folderPages,
    /**
     * Retrieves the page folder tree structure.
     *
     * @returns The page folder tree structure.
     */
    pageFolderTree: _pageFolderTree,
    /**
     * Category-related GET operations.
     */
    categories: {
      /**
       * Retrieves all categories.
       *
       * @returns An array of category records.
       */
      getAll: getAllCategories,
      /**
       * Retrieves a category by its ID.
       *
       * @param categoryId - The ID of the category to fetch.
       * @returns The category record if found, otherwise undefined.
       */
      byId: getCategoryById,
      /**
       * Retrieves a category by its slug.
       *
       * @param slug - The slug of the category to fetch.
       * @returns The category record if found, otherwise undefined.
       */
      bySlug: getCategoryBySlug
    },
    /**
     * Tag-related GET operations.
     */
    tags: {
      /**
       * Retrieves all tags.
       *
       * @returns An array of tag records.
       */
      getAll: getAllTags,
      /**
       * Retrieves a tag by its ID.
       *
       * @param tagId - The ID of the tag to fetch.
       * @returns The tag record if found, otherwise undefined.
       */
      byId: getTagById,
      /**
       * Retrieves a tag by its slug.
       *
       * @param slug - The slug of the tag to fetch.
       * @returns The tag record if found, otherwise undefined.
       */
      bySlug: getTagBySlug
    }
  };
  return GET;
});
var get_default = SDKGetModule;

const SDKUpdateModule = Effect.gen(function* () {
  const [{ withCodec }, CACHE, CLEAR, GET, CONFIG] = yield* Effect.all([
    DBClientLive,
    cache_default,
    clear_default,
    get_default,
    config_default
  ]);
  const _updatePageContent = withCodec({
    encoder: StudioCMSPageContent.Update,
    decoder: StudioCMSPageContent.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSPageContent").set(data).where("id", "=", data.id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageContent").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _updateTag = withCodec({
    encoder: StudioCMSPageDataTags.Update,
    decoder: StudioCMSPageDataTags.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSPageDataTags").set(data).where("id", "=", data.id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageDataTags").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _updateCategory = withCodec({
    encoder: StudioCMSPageDataCategories.Update,
    decoder: StudioCMSPageDataCategories.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSPageDataCategories").set(data).where("id", "=", data.id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageDataCategories").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _updatePermission = withCodec({
    encoder: StudioCMSPermissions.Update,
    decoder: StudioCMSPermissions.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSPermissions").set(data).where("user", "=", data.user).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPermissions").selectAll().where("user", "=", data.user).executeTakeFirstOrThrow();
      })
    )
  });
  const _updateFolderEntry = withCodec({
    encoder: StudioCMSPageFolderStructure.Update,
    decoder: StudioCMSPageFolderStructure.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSPageFolderStructure").set(data).where("id", "=", data.id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageFolderStructure").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _updatePageDataEntry = withCodec({
    encoder: StudioCMSPageData.Update,
    decoder: StudioCMSPageData.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSPageData").set(data).where("id", "=", data.id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageData").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _findPageDataBySlug = withCodec({
    encoder: Schema$1.String,
    decoder: StudioCMSPageData.Select,
    callbackFn: (db, slug) => db(
      (client) => client.selectFrom("StudioCMSPageData").where("slug", "=", slug).selectAll().executeTakeFirstOrThrow()
    )
  });
  const _updateFolderTree = CLEAR.folderTree.pipe(Effect.flatMap(GET.folderTree));
  const _updateFolderList = CLEAR.folderList.pipe(Effect.flatMap(GET.folderList));
  const _updateFolderEntryAndInvalidate = Effect.fn(
    (data) => _updateFolderEntry(data).pipe(
      Effect.flatMap((src) => _updateFolderTree.pipe(Effect.as(src))),
      Effect.flatMap((src) => _updateFolderList.pipe(Effect.as(src)))
    )
  );
  const _updateLatestVersion = Effect.fn(
    () => CACHE.invalidateTags(cacheTags.npmPackage).pipe(Effect.flatMap(GET.latestVersion))
  );
  const _updateFolderTreeAndList = Effect.all([_updateFolderTree, _updateFolderList]);
  const _updatePageById = Effect.fn(
    (pageId, data) => Effect.all([
      _updatePageDataEntry(data.pageData),
      _updatePageContent(data.pageContent),
      CACHE.delete(cacheKeyGetters.page(pageId))
    ]).pipe(
      Effect.tap(() => _updateFolderTreeAndList),
      Effect.flatMap(() => GET.page.byId(pageId))
    )
  );
  const _findPageIdBySlug = Effect.fn(
    (slug) => _findPageDataBySlug(slug).pipe(Effect.map(({ id }) => id))
  );
  const _updatePageByIdPiped = (data) => Effect.fn((id) => _updatePageById(id, data));
  const _updatePageBySlug = Effect.fn(
    (slug, data) => _findPageIdBySlug(slug).pipe(Effect.flatMap(_updatePageByIdPiped(data)))
  );
  const UPDATE = {
    /**
     * Update Page Content
     *
     * @param data - The page content data to update.
     * @returns The updated page content.
     */
    pageContent: _updatePageContent,
    /**
     * Update Tag
     *
     * @param data - The tag data to update.
     * @returns The updated tag.
     */
    tags: _updateTag,
    /**
     * Update Category
     *
     * @param data - The category data to update.
     * @returns The updated category.
     */
    categories: _updateCategory,
    /**
     * Update Permissions
     *
     * @param data - The permissions data to update.
     * @returns The updated permissions.
     */
    permissions: _updatePermission,
    /**
     * Update Folder Tree Cache
     */
    folderTree: _updateFolderTree,
    /**
     * Update Folder List Cache
     */
    folderList: _updateFolderList,
    /**
     * Update Folder Entry and Invalidate Related Caches
     *
     * @param data - The folder entry data to update.
     * @returns The updated folder entry.
     */
    folder: _updateFolderEntryAndInvalidate,
    /**
     * Update Latest NPM Package Version
     */
    latestVersion: _updateLatestVersion,
    /**
     * Update Site Configuration
     */
    siteConfig: CONFIG.siteConfig.update,
    /**
     * Page Operations
     */
    page: {
      /**
       * Update Page by ID
       */
      byId: _updatePageById,
      /**
       * Update Page by Slug
       */
      bySlug: _updatePageBySlug
    }
  };
  return UPDATE;
});
var update_default = SDKUpdateModule;

class GhostUserError {
  _tag = "GhostUserError";
}
const _handleErrors = Effect.catchTags({
  DBCallbackFailure: (cause) => Effect.succeed({
    status: "error",
    message: cause.message
  }),
  NotFoundError: () => Effect.succeed({
    status: "error",
    message: "database entry not found"
  }),
  QueryError: (cause) => Effect.succeed({
    status: "error",
    message: cause.message
  }),
  QueryParseError: (cause) => Effect.succeed({
    status: "error",
    message: cause.message
  })
});
const SDKDeleteModule = Effect.gen(function* () {
  const [{ withEncoder }, clear, users, update, { GhostUserDefaults }, { invalidateTags }] = yield* Effect.all([
    DBClientLive,
    clear_default,
    SDKUsers,
    update_default,
    SDKDefaults,
    cache_default
  ]);
  const _deleteDiffTrackingByPageId = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, pageId) => db(
      (client) => client.deleteFrom("StudioCMSDiffTracking").where("pageId", "=", pageId).executeTakeFirstOrThrow()
    )
  });
  const _deleteDiffTrackingByDiffId = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, diffId) => db(
      (client) => client.deleteFrom("StudioCMSDiffTracking").where("id", "=", diffId).executeTakeFirstOrThrow()
    )
  });
  const _deletePageContentByPageId = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, pageId) => db(
      (client) => client.deleteFrom("StudioCMSPageContent").where("contentId", "=", pageId).executeTakeFirstOrThrow()
    )
  });
  const _deletePageDataById = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, pageId) => db(
      (client) => client.deleteFrom("StudioCMSPageData").where("id", "=", pageId).executeTakeFirstOrThrow()
    )
  });
  const _deletePageContentLangByIdAndLang = withEncoder({
    encoder: Schema$1.Struct({
      id: Schema$1.String,
      lang: Schema$1.String
    }),
    callbackFn: (db, { id, lang }) => db(
      (client) => client.deleteFrom("StudioCMSPageContent").where((eb) => eb.and([eb("contentId", "=", id), eb("contentLang", "=", lang)])).executeTakeFirstOrThrow()
    )
  });
  const _deleteTagsById = withEncoder({
    encoder: Schema$1.Number,
    callbackFn: (db, id) => db(
      (client) => client.deleteFrom("StudioCMSPageDataTags").where("id", "=", id).executeTakeFirstOrThrow()
    )
  });
  const _deleteCategoriesById = withEncoder({
    encoder: Schema$1.Number,
    callbackFn: (db, id) => db(
      (client) => client.deleteFrom("StudioCMSPageDataCategories").where("id", "=", id).executeTakeFirstOrThrow()
    )
  });
  const _deletePermissionDataByUserId = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, userId) => db(
      (client) => client.deleteFrom("StudioCMSPermissions").where("user", "=", userId).executeTakeFirstOrThrow()
    )
  });
  const _deleteFolderById = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, folderId) => db(
      (client) => client.deleteFrom("StudioCMSPageFolderStructure").where("id", "=", folderId).executeTakeFirstOrThrow()
    )
  });
  const _deleteUserById = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, userId) => db(
      (client) => client.deleteFrom("StudioCMSUsersTable").where("id", "=", userId).executeTakeFirstOrThrow()
    )
  });
  const _deletePageById = Effect.fn(
    (id) => _deleteDiffTrackingByPageId(id).pipe(
      Effect.flatMap(() => _deletePageContentByPageId(id)),
      Effect.flatMap(() => _deletePageDataById(id)),
      Effect.flatMap(() => clear.page.byId(id)),
      Effect.map(() => ({
        status: "success",
        message: `Page with ID ${id} has been deleted successfully`
      })),
      _handleErrors
    )
  );
  const _deletePageContent = Effect.fn(
    (id) => _deletePageContentByPageId(id).pipe(
      Effect.flatMap(() => clear.page.byId(id)),
      Effect.map(() => ({
        status: "success",
        message: `Page content with ID ${id} has been deleted successfully`
      })),
      _handleErrors
    )
  );
  const _deletePageContentLang = Effect.fn(
    (id, lang) => _deletePageContentLangByIdAndLang({ id, lang }).pipe(
      Effect.flatMap(() => clear.page.byId(id)),
      Effect.map(() => ({
        status: "success",
        message: `Page content with ID ${id} and language ${lang} has been deleted successfully`
      })),
      _handleErrors
    )
  );
  const _deletePageTag = Effect.fn(
    (id) => _deleteTagsById(id).pipe(
      Effect.tap(() => invalidateTags(cacheTags.tags)),
      Effect.map(() => ({
        status: "success",
        message: `Tag with ID ${id} has been deleted successfully`
      })),
      _handleErrors
    )
  );
  const _deletePageCategory = Effect.fn(
    (id) => _deleteCategoriesById(id).pipe(
      Effect.tap(() => invalidateTags(cacheTags.categories)),
      Effect.map(() => ({
        status: "success",
        message: `Category with ID ${id} has been deleted successfully`
      })),
      _handleErrors
    )
  );
  const _deletePermission = Effect.fn(
    (userId) => _deletePermissionDataByUserId(userId).pipe(
      Effect.map(() => ({
        status: "success",
        message: `Permissions for user with ID ${userId} have been deleted successfully`
      })),
      _handleErrors
    )
  );
  const _deleteDiffTracking = Effect.fn(
    (id) => _deleteDiffTrackingByDiffId(id).pipe(
      Effect.map(() => ({
        status: "success",
        message: `Diff tracking entry with ID ${id} has been deleted successfully`
      })),
      _handleErrors
    )
  );
  const _deleteFolder = Effect.fn(
    (folderId) => _deleteFolderById(folderId).pipe(
      Effect.tap(() => Effect.all([update.folderList, update.folderTree])),
      Effect.map(() => ({
        status: "success",
        message: `Folder with ID ${folderId} has been deleted successfully`
      })),
      Effect.catchTag(
        "FolderTreeError",
        (cause) => Effect.succeed({
          status: "error",
          message: `Failed to update folder tree after deleting folder with ID ${folderId}: ${cause.message}`
        })
      ),
      _handleErrors
    )
  );
  const _isNotGhostUser = (userId) => userId !== GhostUserDefaults.id ? Effect.fail(new GhostUserError()) : Effect.succeed(false);
  const _deleteUser = Effect.fn(
    (userId) => _isNotGhostUser(userId).pipe(
      Effect.flatMap(() => users.clearUserReferences(userId)),
      Effect.flatMap(() => _deleteUserById(userId)),
      Effect.map(() => ({
        status: "success",
        message: `User with ID ${userId} has been deleted successfully`
      })),
      Effect.catchTag(
        "GhostUserError",
        () => Effect.succeed({
          status: "error",
          message: `User with ID ${userId} is an internal user and cannot be deleted.`
        })
      ),
      _handleErrors
    )
  );
  const DELETE = {
    /**
     * Deletes a page by its ID.
     *
     * @param id - The ID of the page to delete.
     * @returns An effect that resolves to a success or error message.
     */
    page: _deletePageById,
    /**
     * Deletes page content by its ID.
     *
     * @param id - The ID of the page content to delete.
     * @returns An effect that resolves to a success or error message.
     */
    pageContent: _deletePageContent,
    /**
     * Deletes page content for a specific language by its ID and language.
     *
     * @param id - The ID of the page content to delete.
     * @param lang - The language of the page content to delete.
     * @returns An effect that resolves to a success or error message.
     */
    pageContentLang: _deletePageContentLang,
    /**
     * Deletes a tag by its ID.
     *
     * @param id - The ID of the tag to delete.
     * @returns An effect that resolves to a success or error message.
     */
    tags: _deletePageTag,
    /**
     * Deletes a category by its ID.
     *
     * @param id - The ID of the category to delete.
     * @returns An effect that resolves to a success or error message.
     */
    categories: _deletePageCategory,
    /**
     * Deletes permissions for a specific user by their ID.
     *
     * @param userId - The ID of the user whose permissions to delete.
     * @returns An effect that resolves to a success or error message.
     */
    permissions: _deletePermission,
    /**
     * Deletes diff tracking entry by diff ID.
     *
     * @param id - The ID of the diff tracking entry to be deleted.
     * @returns An effect that represents the deletion operation.
     */
    diffTracking: _deleteDiffTracking,
    /**
     * Deletes a folder by its ID.
     *
     * @param folderId - The ID of the folder to delete.
     * @returns An effect that resolves to a success or error message.
     */
    folder: _deleteFolder,
    /**
     * Deletes a user by their ID.
     *
     * @param userId - The ID of the user to delete.
     * @returns An effect that resolves to a success or error message.
     */
    user: _deleteUser
  };
  return DELETE;
});
var delete_default = SDKDeleteModule;

class Diff {
    diff(oldStr, newStr, 
    // Type below is not accurate/complete - see above for full possibilities - but it compiles
    options = {}) {
        let callback;
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        else if ('callback' in options) {
            callback = options.callback;
        }
        // Allow subclasses to massage the input prior to running
        const oldString = this.castInput(oldStr, options);
        const newString = this.castInput(newStr, options);
        const oldTokens = this.removeEmpty(this.tokenize(oldString, options));
        const newTokens = this.removeEmpty(this.tokenize(newString, options));
        return this.diffWithOptionsObj(oldTokens, newTokens, options, callback);
    }
    diffWithOptionsObj(oldTokens, newTokens, options, callback) {
        var _a;
        const done = (value) => {
            value = this.postProcess(value, options);
            if (callback) {
                setTimeout(function () { callback(value); }, 0);
                return undefined;
            }
            else {
                return value;
            }
        };
        const newLen = newTokens.length, oldLen = oldTokens.length;
        let editLength = 1;
        let maxEditLength = newLen + oldLen;
        if (options.maxEditLength != null) {
            maxEditLength = Math.min(maxEditLength, options.maxEditLength);
        }
        const maxExecutionTime = (_a = options.timeout) !== null && _a !== void 0 ? _a : Infinity;
        const abortAfterTimestamp = Date.now() + maxExecutionTime;
        const bestPath = [{ oldPos: -1, lastComponent: undefined }];
        // Seed editLength = 0, i.e. the content starts with the same values
        let newPos = this.extractCommon(bestPath[0], newTokens, oldTokens, 0, options);
        if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
            // Identity per the equality and tokenizer
            return done(this.buildValues(bestPath[0].lastComponent, newTokens, oldTokens));
        }
        // Once we hit the right edge of the edit graph on some diagonal k, we can
        // definitely reach the end of the edit graph in no more than k edits, so
        // there's no point in considering any moves to diagonal k+1 any more (from
        // which we're guaranteed to need at least k+1 more edits).
        // Similarly, once we've reached the bottom of the edit graph, there's no
        // point considering moves to lower diagonals.
        // We record this fact by setting minDiagonalToConsider and
        // maxDiagonalToConsider to some finite value once we've hit the edge of
        // the edit graph.
        // This optimization is not faithful to the original algorithm presented in
        // Myers's paper, which instead pointlessly extends D-paths off the end of
        // the edit graph - see page 7 of Myers's paper which notes this point
        // explicitly and illustrates it with a diagram. This has major performance
        // implications for some common scenarios. For instance, to compute a diff
        // where the new text simply appends d characters on the end of the
        // original text of length n, the true Myers algorithm will take O(n+d^2)
        // time while this optimization needs only O(n+d) time.
        let minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
        // Main worker method. checks all permutations of a given edit length for acceptance.
        const execEditLength = () => {
            for (let diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
                let basePath;
                const removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
                if (removePath) {
                    // No one else is going to attempt to use this value, clear it
                    // @ts-expect-error - perf optimisation. This type-violating value will never be read.
                    bestPath[diagonalPath - 1] = undefined;
                }
                let canAdd = false;
                if (addPath) {
                    // what newPos will be after we do an insertion:
                    const addPathNewPos = addPath.oldPos - diagonalPath;
                    canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
                }
                const canRemove = removePath && removePath.oldPos + 1 < oldLen;
                if (!canAdd && !canRemove) {
                    // If this path is a terminal then prune
                    // @ts-expect-error - perf optimisation. This type-violating value will never be read.
                    bestPath[diagonalPath] = undefined;
                    continue;
                }
                // Select the diagonal that we want to branch from. We select the prior
                // path whose position in the old string is the farthest from the origin
                // and does not pass the bounds of the diff graph
                if (!canRemove || (canAdd && removePath.oldPos < addPath.oldPos)) {
                    basePath = this.addToPath(addPath, true, false, 0, options);
                }
                else {
                    basePath = this.addToPath(removePath, false, true, 1, options);
                }
                newPos = this.extractCommon(basePath, newTokens, oldTokens, diagonalPath, options);
                if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
                    // If we have hit the end of both strings, then we are done
                    return done(this.buildValues(basePath.lastComponent, newTokens, oldTokens)) || true;
                }
                else {
                    bestPath[diagonalPath] = basePath;
                    if (basePath.oldPos + 1 >= oldLen) {
                        maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
                    }
                    if (newPos + 1 >= newLen) {
                        minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
                    }
                }
            }
            editLength++;
        };
        // Performs the length of edit iteration. Is a bit fugly as this has to support the
        // sync and async mode which is never fun. Loops over execEditLength until a value
        // is produced, or until the edit length exceeds options.maxEditLength (if given),
        // in which case it will return undefined.
        if (callback) {
            (function exec() {
                setTimeout(function () {
                    if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) {
                        return callback(undefined);
                    }
                    if (!execEditLength()) {
                        exec();
                    }
                }, 0);
            }());
        }
        else {
            while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
                const ret = execEditLength();
                if (ret) {
                    return ret;
                }
            }
        }
    }
    addToPath(path, added, removed, oldPosInc, options) {
        const last = path.lastComponent;
        if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) {
            return {
                oldPos: path.oldPos + oldPosInc,
                lastComponent: { count: last.count + 1, added: added, removed: removed, previousComponent: last.previousComponent }
            };
        }
        else {
            return {
                oldPos: path.oldPos + oldPosInc,
                lastComponent: { count: 1, added: added, removed: removed, previousComponent: last }
            };
        }
    }
    extractCommon(basePath, newTokens, oldTokens, diagonalPath, options) {
        const newLen = newTokens.length, oldLen = oldTokens.length;
        let oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
        while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(oldTokens[oldPos + 1], newTokens[newPos + 1], options)) {
            newPos++;
            oldPos++;
            commonCount++;
            if (options.oneChangePerToken) {
                basePath.lastComponent = { count: 1, previousComponent: basePath.lastComponent, added: false, removed: false };
            }
        }
        if (commonCount && !options.oneChangePerToken) {
            basePath.lastComponent = { count: commonCount, previousComponent: basePath.lastComponent, added: false, removed: false };
        }
        basePath.oldPos = oldPos;
        return newPos;
    }
    equals(left, right, options) {
        if (options.comparator) {
            return options.comparator(left, right);
        }
        else {
            return left === right
                || (!!options.ignoreCase && left.toLowerCase() === right.toLowerCase());
        }
    }
    removeEmpty(array) {
        const ret = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i]) {
                ret.push(array[i]);
            }
        }
        return ret;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    castInput(value, options) {
        return value;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tokenize(value, options) {
        return Array.from(value);
    }
    join(chars) {
        // Assumes ValueT is string, which is the case for most subclasses.
        // When it's false, e.g. in diffArrays, this method needs to be overridden (e.g. with a no-op)
        // Yes, the casts are verbose and ugly, because this pattern - of having the base class SORT OF
        // assume tokens and values are strings, but not completely - is weird and janky.
        return chars.join('');
    }
    postProcess(changeObjects, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options) {
        return changeObjects;
    }
    get useLongestToken() {
        return false;
    }
    buildValues(lastComponent, newTokens, oldTokens) {
        // First we convert our linked list of components in reverse order to an
        // array in the right order:
        const components = [];
        let nextComponent;
        while (lastComponent) {
            components.push(lastComponent);
            nextComponent = lastComponent.previousComponent;
            delete lastComponent.previousComponent;
            lastComponent = nextComponent;
        }
        components.reverse();
        const componentLen = components.length;
        let componentPos = 0, newPos = 0, oldPos = 0;
        for (; componentPos < componentLen; componentPos++) {
            const component = components[componentPos];
            if (!component.removed) {
                if (!component.added && this.useLongestToken) {
                    let value = newTokens.slice(newPos, newPos + component.count);
                    value = value.map(function (value, i) {
                        const oldValue = oldTokens[oldPos + i];
                        return oldValue.length > value.length ? oldValue : value;
                    });
                    component.value = this.join(value);
                }
                else {
                    component.value = this.join(newTokens.slice(newPos, newPos + component.count));
                }
                newPos += component.count;
                // Common case
                if (!component.added) {
                    oldPos += component.count;
                }
            }
            else {
                component.value = this.join(oldTokens.slice(oldPos, oldPos + component.count));
                oldPos += component.count;
            }
        }
        return components;
    }
}

class CharacterDiff extends Diff {
}
const characterDiff = new CharacterDiff();
function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
}

// Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
//
// Chars/ranges counted as "word" characters by this regex are as follows:
//
// + U+00AD  Soft hyphen
// + 00C0–00FF (letters with diacritics from the Latin-1 Supplement), except:
//   - U+00D7  × Multiplication sign
//   - U+00F7  ÷ Division sign
// + Latin Extended-A, 0100–017F
// + Latin Extended-B, 0180–024F
// + IPA Extensions, 0250–02AF
// + Spacing Modifier Letters, 02B0–02FF, except:
//   - U+02C7  ˇ &#711;  Caron
//   - U+02D8  ˘ &#728;  Breve
//   - U+02D9  ˙ &#729;  Dot Above
//   - U+02DA  ˚ &#730;  Ring Above
//   - U+02DB  ˛ &#731;  Ogonek
//   - U+02DC  ˜ &#732;  Small Tilde
//   - U+02DD  ˝ &#733;  Double Acute Accent
// + Latin Extended Additional, 1E00–1EFF
const extendedWordChars = 'a-zA-Z0-9_\\u{AD}\\u{C0}-\\u{D6}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}';
class WordsWithSpaceDiff extends Diff {
    tokenize(value) {
        // Slightly different to the tokenizeIncludingWhitespace regex used above in
        // that this one treats each individual newline as a distinct token, rather
        // than merging them into other surrounding whitespace. This was requested
        // in https://github.com/kpdecker/jsdiff/issues/180 &
        //    https://github.com/kpdecker/jsdiff/issues/211
        const regex = new RegExp(`(\\r?\\n)|[${extendedWordChars}]+|[^\\S\\n\\r]+|[^${extendedWordChars}]`, 'ug');
        return value.match(regex) || [];
    }
}
const wordsWithSpaceDiff = new WordsWithSpaceDiff();
function diffWordsWithSpace(oldStr, newStr, options) {
    return wordsWithSpaceDiff.diff(oldStr, newStr, options);
}

class LineDiff extends Diff {
    constructor() {
        super(...arguments);
        this.tokenize = tokenize;
    }
    equals(left, right, options) {
        // If we're ignoring whitespace, we need to normalise lines by stripping
        // whitespace before checking equality. (This has an annoying interaction
        // with newlineIsToken that requires special handling: if newlines get their
        // own token, then we DON'T want to trim the *newline* tokens down to empty
        // strings, since this would cause us to treat whitespace-only line content
        // as equal to a separator between lines, which would be weird and
        // inconsistent with the documented behavior of the options.)
        if (options.ignoreWhitespace) {
            if (!options.newlineIsToken || !left.includes('\n')) {
                left = left.trim();
            }
            if (!options.newlineIsToken || !right.includes('\n')) {
                right = right.trim();
            }
        }
        else if (options.ignoreNewlineAtEof && !options.newlineIsToken) {
            if (left.endsWith('\n')) {
                left = left.slice(0, -1);
            }
            if (right.endsWith('\n')) {
                right = right.slice(0, -1);
            }
        }
        return super.equals(left, right, options);
    }
}
const lineDiff = new LineDiff();
function diffLines(oldStr, newStr, options) {
    return lineDiff.diff(oldStr, newStr, options);
}
// Exported standalone so it can be used from jsonDiff too.
function tokenize(value, options) {
    if (options.stripTrailingCr) {
        // remove one \r before \n to match GNU diff's --strip-trailing-cr behavior
        value = value.replace(/\r\n/g, '\n');
    }
    const retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
    // Ignore the final empty token that occurs if the string ends with a new line
    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
        linesAndNewlines.pop();
    }
    // Merge the content and line separators into single tokens
    for (let i = 0; i < linesAndNewlines.length; i++) {
        const line = linesAndNewlines[i];
        if (i % 2 && !options.newlineIsToken) {
            retLines[retLines.length - 1] += line;
        }
        else {
            retLines.push(line);
        }
    }
    return retLines;
}

const INCLUDE_HEADERS = {
    includeIndex: true,
    includeUnderline: true,
    includeFileHeaders: true
};
function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    let optionsObj;
    if (!options) {
        optionsObj = {};
    }
    else if (typeof options === 'function') {
        optionsObj = { callback: options };
    }
    else {
        optionsObj = options;
    }
    if (typeof optionsObj.context === 'undefined') {
        optionsObj.context = 4;
    }
    // We copy this into its own variable to placate TypeScript, which thinks
    // optionsObj.context might be undefined in the callbacks below.
    const context = optionsObj.context;
    // @ts-expect-error (runtime check for something that is correctly a static type error)
    if (optionsObj.newlineIsToken) {
        throw new Error('newlineIsToken may not be used with patch-generation functions, only with diffing functions');
    }
    if (!optionsObj.callback) {
        return diffLinesResultToPatch(diffLines(oldStr, newStr, optionsObj));
    }
    else {
        const { callback } = optionsObj;
        diffLines(oldStr, newStr, Object.assign(Object.assign({}, optionsObj), { callback: (diff) => {
                const patch = diffLinesResultToPatch(diff);
                // TypeScript is unhappy without the cast because it does not understand that `patch` may
                // be undefined here only if `callback` is StructuredPatchCallbackAbortable:
                callback(patch);
            } }));
    }
    function diffLinesResultToPatch(diff) {
        // STEP 1: Build up the patch with no "\ No newline at end of file" lines and with the arrays
        //         of lines containing trailing newline characters. We'll tidy up later...
        if (!diff) {
            return;
        }
        diff.push({ value: '', lines: [] }); // Append an empty value to make cleanup easier
        function contextLines(lines) {
            return lines.map(function (entry) { return ' ' + entry; });
        }
        const hunks = [];
        let oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
        for (let i = 0; i < diff.length; i++) {
            const current = diff[i], lines = current.lines || splitLines(current.value);
            current.lines = lines;
            if (current.added || current.removed) {
                // If we have previous context, start with that
                if (!oldRangeStart) {
                    const prev = diff[i - 1];
                    oldRangeStart = oldLine;
                    newRangeStart = newLine;
                    if (prev) {
                        curRange = context > 0 ? contextLines(prev.lines.slice(-context)) : [];
                        oldRangeStart -= curRange.length;
                        newRangeStart -= curRange.length;
                    }
                }
                // Output our changes
                for (const line of lines) {
                    curRange.push((current.added ? '+' : '-') + line);
                }
                // Track the updated file position
                if (current.added) {
                    newLine += lines.length;
                }
                else {
                    oldLine += lines.length;
                }
            }
            else {
                // Identical context lines. Track line changes
                if (oldRangeStart) {
                    // Close out any changes that have been output (or join overlapping)
                    if (lines.length <= context * 2 && i < diff.length - 2) {
                        // Overlapping
                        for (const line of contextLines(lines)) {
                            curRange.push(line);
                        }
                    }
                    else {
                        // end the range and output
                        const contextSize = Math.min(lines.length, context);
                        for (const line of contextLines(lines.slice(0, contextSize))) {
                            curRange.push(line);
                        }
                        const hunk = {
                            oldStart: oldRangeStart,
                            oldLines: (oldLine - oldRangeStart + contextSize),
                            newStart: newRangeStart,
                            newLines: (newLine - newRangeStart + contextSize),
                            lines: curRange
                        };
                        hunks.push(hunk);
                        oldRangeStart = 0;
                        newRangeStart = 0;
                        curRange = [];
                    }
                }
                oldLine += lines.length;
                newLine += lines.length;
            }
        }
        // Step 2: eliminate the trailing `\n` from each line of each hunk, and, where needed, add
        //         "\ No newline at end of file".
        for (const hunk of hunks) {
            for (let i = 0; i < hunk.lines.length; i++) {
                if (hunk.lines[i].endsWith('\n')) {
                    hunk.lines[i] = hunk.lines[i].slice(0, -1);
                }
                else {
                    hunk.lines.splice(i + 1, 0, '\\ No newline at end of file');
                    i++; // Skip the line we just added, then continue iterating
                }
            }
        }
        return {
            oldFileName: oldFileName, newFileName: newFileName,
            oldHeader: oldHeader, newHeader: newHeader,
            hunks: hunks
        };
    }
}
/**
 * creates a unified diff patch.
 * @param patch either a single structured patch object (as returned by `structuredPatch`) or an array of them (as returned by `parsePatch`)
 */
function formatPatch(patch, headerOptions) {
    if (!headerOptions) {
        headerOptions = INCLUDE_HEADERS;
    }
    if (Array.isArray(patch)) {
        if (patch.length > 1 && !headerOptions.includeFileHeaders) {
            throw new Error('Cannot omit file headers on a multi-file patch. '
                + '(The result would be unparseable; how would a tool trying to apply '
                + 'the patch know which changes are to which file?)');
        }
        return patch.map(p => formatPatch(p, headerOptions)).join('\n');
    }
    const ret = [];
    if (headerOptions.includeIndex && patch.oldFileName == patch.newFileName) {
        ret.push('Index: ' + patch.oldFileName);
    }
    if (headerOptions.includeUnderline) {
        ret.push('===================================================================');
    }
    if (headerOptions.includeFileHeaders) {
        ret.push('--- ' + patch.oldFileName + (typeof patch.oldHeader === 'undefined' ? '' : '\t' + patch.oldHeader));
        ret.push('+++ ' + patch.newFileName + (typeof patch.newHeader === 'undefined' ? '' : '\t' + patch.newHeader));
    }
    for (let i = 0; i < patch.hunks.length; i++) {
        const hunk = patch.hunks[i];
        // Unified Diff Format quirk: If the chunk size is 0,
        // the first number is one lower than one would expect.
        // https://www.artima.com/weblogs/viewpost.jsp?thread=164293
        if (hunk.oldLines === 0) {
            hunk.oldStart -= 1;
        }
        if (hunk.newLines === 0) {
            hunk.newStart -= 1;
        }
        ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines
            + ' +' + hunk.newStart + ',' + hunk.newLines
            + ' @@');
        for (const line of hunk.lines) {
            ret.push(line);
        }
    }
    return ret.join('\n') + '\n';
}
function createTwoFilesPatch$1(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    if (typeof options === 'function') {
        options = { callback: options };
    }
    if (!(options === null || options === void 0 ? void 0 : options.callback)) {
        const patchObj = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
        if (!patchObj) {
            return;
        }
        return formatPatch(patchObj, options === null || options === void 0 ? void 0 : options.headerOptions);
    }
    else {
        const { callback } = options;
        structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, Object.assign(Object.assign({}, options), { callback: patchObj => {
                if (!patchObj) {
                    callback(undefined);
                }
                else {
                    callback(formatPatch(patchObj, options.headerOptions));
                }
            } }));
    }
}
/**
 * Split `text` into an array of lines, including the trailing newline character (where present)
 */
function splitLines(text) {
    const hasTrailingNl = text.endsWith('\n');
    const result = text.split('\n').map(line => line + '\n');
    if (hasTrailingNl) {
        result.pop();
    }
    else {
        result.push(result.pop().slice(0, -1));
    }
    return result;
}

var LineType;
(function (LineType) {
    LineType["INSERT"] = "insert";
    LineType["DELETE"] = "delete";
    LineType["CONTEXT"] = "context";
})(LineType || (LineType = {}));
const OutputFormatType = {
    LINE_BY_LINE: 'line-by-line'};
const LineMatchingType = {
    NONE: 'none',
};
const DiffStyleType = {
    WORD: 'word'};
var ColorSchemeType;
(function (ColorSchemeType) {
    ColorSchemeType["AUTO"] = "auto";
    ColorSchemeType["DARK"] = "dark";
    ColorSchemeType["LIGHT"] = "light";
})(ColorSchemeType || (ColorSchemeType = {}));

const specials = [
    '-',
    '[',
    ']',
    '/',
    '{',
    '}',
    '(',
    ')',
    '*',
    '+',
    '?',
    '.',
    '\\',
    '^',
    '$',
    '|',
];
const regex = RegExp('[' + specials.join('\\') + ']', 'g');
function escapeForRegExp(str) {
    return str.replace(regex, '\\$&');
}
function unifyPath(path) {
    return path ? path.replace(/\\/g, '/') : path;
}
function hashCode(text) {
    let i, chr, len;
    let hash = 0;
    for (i = 0, len = text.length; i < len; i++) {
        chr = text.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}
function max(arr) {
    const length = arr.length;
    let max = -Infinity;
    for (let i = 0; i < length; i++) {
        max = Math.max(max, arr[i]);
    }
    return max;
}

function getExtension(filename, language) {
    const filenameParts = filename.split('.');
    return filenameParts.length > 1 ? filenameParts[filenameParts.length - 1] : language;
}
function startsWithAny(str, prefixes) {
    return prefixes.reduce((startsWith, prefix) => startsWith || str.startsWith(prefix), false);
}
const baseDiffFilenamePrefixes = ['a/', 'b/', 'i/', 'w/', 'c/', 'o/'];
function getFilename(line, linePrefix, extraPrefix) {
    const prefixes = extraPrefix !== undefined ? [...baseDiffFilenamePrefixes, extraPrefix] : baseDiffFilenamePrefixes;
    const FilenameRegExp = linePrefix
        ? new RegExp(`^${escapeForRegExp(linePrefix)} "?(.+?)"?$`)
        : new RegExp('^"?(.+?)"?$');
    const [, filename = ''] = FilenameRegExp.exec(line) || [];
    const matchingPrefix = prefixes.find(p => filename.indexOf(p) === 0);
    const fnameWithoutPrefix = matchingPrefix ? filename.slice(matchingPrefix.length) : filename;
    return fnameWithoutPrefix.replace(/\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)? [+-]\d{4}.*$/, '');
}
function getSrcFilename(line, srcPrefix) {
    return getFilename(line, '---', srcPrefix);
}
function getDstFilename(line, dstPrefix) {
    return getFilename(line, '+++', dstPrefix);
}
function parse(diffInput, config = {}) {
    const files = [];
    let currentFile = null;
    let currentBlock = null;
    let oldLine = null;
    let oldLine2 = null;
    let newLine = null;
    let possibleOldName = null;
    let possibleNewName = null;
    const oldFileNameHeader = '--- ';
    const newFileNameHeader = '+++ ';
    const hunkHeaderPrefix = '@@';
    const oldMode = /^old mode (\d{6})/;
    const newMode = /^new mode (\d{6})/;
    const deletedFileMode = /^deleted file mode (\d{6})/;
    const newFileMode = /^new file mode (\d{6})/;
    const copyFrom = /^copy from "?(.+)"?/;
    const copyTo = /^copy to "?(.+)"?/;
    const renameFrom = /^rename from "?(.+)"?/;
    const renameTo = /^rename to "?(.+)"?/;
    const similarityIndex = /^similarity index (\d+)%/;
    const dissimilarityIndex = /^dissimilarity index (\d+)%/;
    const index = /^index ([\da-z]+)\.\.([\da-z]+)\s*(\d{6})?/;
    const binaryFiles = /^Binary files (.*) and (.*) differ/;
    const binaryDiff = /^GIT binary patch/;
    const combinedIndex = /^index ([\da-z]+),([\da-z]+)\.\.([\da-z]+)/;
    const combinedMode = /^mode (\d{6}),(\d{6})\.\.(\d{6})/;
    const combinedNewFile = /^new file mode (\d{6})/;
    const combinedDeletedFile = /^deleted file mode (\d{6}),(\d{6})/;
    const diffLines = diffInput
        .replace(/\\ No newline at end of file/g, '')
        .replace(/\r\n?/g, '\n')
        .split('\n');
    function saveBlock() {
        if (currentBlock !== null && currentFile !== null) {
            currentFile.blocks.push(currentBlock);
            currentBlock = null;
        }
    }
    function saveFile() {
        if (currentFile !== null) {
            if (!currentFile.oldName && possibleOldName !== null) {
                currentFile.oldName = possibleOldName;
            }
            if (!currentFile.newName && possibleNewName !== null) {
                currentFile.newName = possibleNewName;
            }
            if (currentFile.newName) {
                files.push(currentFile);
                currentFile = null;
            }
        }
        possibleOldName = null;
        possibleNewName = null;
    }
    function startFile() {
        saveBlock();
        saveFile();
        currentFile = {
            blocks: [],
            deletedLines: 0,
            addedLines: 0,
        };
    }
    function startBlock(line) {
        saveBlock();
        let values;
        if (currentFile !== null) {
            if ((values = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@.*/.exec(line))) {
                currentFile.isCombined = false;
                oldLine = parseInt(values[1], 10);
                newLine = parseInt(values[2], 10);
            }
            else if ((values = /^@@@ -(\d+)(?:,\d+)? -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@@.*/.exec(line))) {
                currentFile.isCombined = true;
                oldLine = parseInt(values[1], 10);
                oldLine2 = parseInt(values[2], 10);
                newLine = parseInt(values[3], 10);
            }
            else {
                if (line.startsWith(hunkHeaderPrefix)) {
                    console.error('Failed to parse lines, starting in 0!');
                }
                oldLine = 0;
                newLine = 0;
                currentFile.isCombined = false;
            }
        }
        currentBlock = {
            lines: [],
            oldStartLine: oldLine,
            oldStartLine2: oldLine2,
            newStartLine: newLine,
            header: line,
        };
    }
    function createLine(line) {
        if (currentFile === null || currentBlock === null || oldLine === null || newLine === null)
            return;
        const currentLine = {
            content: line,
        };
        const addedPrefixes = currentFile.isCombined ? ['+ ', ' +', '++'] : ['+'];
        const deletedPrefixes = currentFile.isCombined ? ['- ', ' -', '--'] : ['-'];
        if (startsWithAny(line, addedPrefixes)) {
            currentFile.addedLines++;
            currentLine.type = LineType.INSERT;
            currentLine.oldNumber = undefined;
            currentLine.newNumber = newLine++;
        }
        else if (startsWithAny(line, deletedPrefixes)) {
            currentFile.deletedLines++;
            currentLine.type = LineType.DELETE;
            currentLine.oldNumber = oldLine++;
            currentLine.newNumber = undefined;
        }
        else {
            currentLine.type = LineType.CONTEXT;
            currentLine.oldNumber = oldLine++;
            currentLine.newNumber = newLine++;
        }
        currentBlock.lines.push(currentLine);
    }
    function existHunkHeader(line, lineIdx) {
        let idx = lineIdx;
        while (idx < diffLines.length - 3) {
            if (line.startsWith('diff')) {
                return false;
            }
            if (diffLines[idx].startsWith(oldFileNameHeader) &&
                diffLines[idx + 1].startsWith(newFileNameHeader) &&
                diffLines[idx + 2].startsWith(hunkHeaderPrefix)) {
                return true;
            }
            idx++;
        }
        return false;
    }
    diffLines.forEach((line, lineIndex) => {
        if (!line || line.startsWith('*')) {
            return;
        }
        let values;
        const prevLine = diffLines[lineIndex - 1];
        const nxtLine = diffLines[lineIndex + 1];
        const afterNxtLine = diffLines[lineIndex + 2];
        if (line.startsWith('diff --git') || line.startsWith('diff --combined')) {
            startFile();
            const gitDiffStart = /^diff --git "?([a-ciow]\/.+)"? "?([a-ciow]\/.+)"?/;
            if ((values = gitDiffStart.exec(line))) {
                possibleOldName = getFilename(values[1], undefined, config.dstPrefix);
                possibleNewName = getFilename(values[2], undefined, config.srcPrefix);
            }
            if (currentFile === null) {
                throw new Error('Where is my file !!!');
            }
            currentFile.isGitDiff = true;
            return;
        }
        if (line.startsWith('Binary files') && !(currentFile === null || currentFile === void 0 ? void 0 : currentFile.isGitDiff)) {
            startFile();
            const unixDiffBinaryStart = /^Binary files "?([a-ciow]\/.+)"? and "?([a-ciow]\/.+)"? differ/;
            if ((values = unixDiffBinaryStart.exec(line))) {
                possibleOldName = getFilename(values[1], undefined, config.dstPrefix);
                possibleNewName = getFilename(values[2], undefined, config.srcPrefix);
            }
            if (currentFile === null) {
                throw new Error('Where is my file !!!');
            }
            currentFile.isBinary = true;
            return;
        }
        if (!currentFile ||
            (!currentFile.isGitDiff &&
                currentFile &&
                line.startsWith(oldFileNameHeader) &&
                nxtLine.startsWith(newFileNameHeader) &&
                afterNxtLine.startsWith(hunkHeaderPrefix))) {
            startFile();
        }
        if (currentFile === null || currentFile === void 0 ? void 0 : currentFile.isTooBig) {
            return;
        }
        if (currentFile &&
            ((typeof config.diffMaxChanges === 'number' &&
                currentFile.addedLines + currentFile.deletedLines > config.diffMaxChanges) ||
                (typeof config.diffMaxLineLength === 'number' && line.length > config.diffMaxLineLength))) {
            currentFile.isTooBig = true;
            currentFile.addedLines = 0;
            currentFile.deletedLines = 0;
            currentFile.blocks = [];
            currentBlock = null;
            const message = typeof config.diffTooBigMessage === 'function'
                ? config.diffTooBigMessage(files.length)
                : 'Diff too big to be displayed';
            startBlock(message);
            return;
        }
        if ((line.startsWith(oldFileNameHeader) && nxtLine.startsWith(newFileNameHeader)) ||
            (line.startsWith(newFileNameHeader) && prevLine.startsWith(oldFileNameHeader))) {
            if (currentFile &&
                !currentFile.oldName &&
                line.startsWith('--- ') &&
                (values = getSrcFilename(line, config.srcPrefix))) {
                currentFile.oldName = values;
                currentFile.language = getExtension(currentFile.oldName, currentFile.language);
                return;
            }
            if (currentFile &&
                !currentFile.newName &&
                line.startsWith('+++ ') &&
                (values = getDstFilename(line, config.dstPrefix))) {
                currentFile.newName = values;
                currentFile.language = getExtension(currentFile.newName, currentFile.language);
                return;
            }
        }
        if (currentFile &&
            (line.startsWith(hunkHeaderPrefix) ||
                (currentFile.isGitDiff && currentFile.oldName && currentFile.newName && !currentBlock))) {
            startBlock(line);
            return;
        }
        if (currentBlock && (line.startsWith('+') || line.startsWith('-') || line.startsWith(' '))) {
            createLine(line);
            return;
        }
        const doesNotExistHunkHeader = !existHunkHeader(line, lineIndex);
        if (currentFile === null) {
            throw new Error('Where is my file !!!');
        }
        if ((values = oldMode.exec(line))) {
            currentFile.oldMode = values[1];
        }
        else if ((values = newMode.exec(line))) {
            currentFile.newMode = values[1];
        }
        else if ((values = deletedFileMode.exec(line))) {
            currentFile.deletedFileMode = values[1];
            currentFile.isDeleted = true;
        }
        else if ((values = newFileMode.exec(line))) {
            currentFile.newFileMode = values[1];
            currentFile.isNew = true;
        }
        else if ((values = copyFrom.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.oldName = values[1];
            }
            currentFile.isCopy = true;
        }
        else if ((values = copyTo.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.newName = values[1];
            }
            currentFile.isCopy = true;
        }
        else if ((values = renameFrom.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.oldName = values[1];
            }
            currentFile.isRename = true;
        }
        else if ((values = renameTo.exec(line))) {
            if (doesNotExistHunkHeader) {
                currentFile.newName = values[1];
            }
            currentFile.isRename = true;
        }
        else if ((values = binaryFiles.exec(line))) {
            currentFile.isBinary = true;
            currentFile.oldName = getFilename(values[1], undefined, config.srcPrefix);
            currentFile.newName = getFilename(values[2], undefined, config.dstPrefix);
            startBlock('Binary file');
        }
        else if (binaryDiff.test(line)) {
            currentFile.isBinary = true;
            startBlock(line);
        }
        else if ((values = similarityIndex.exec(line))) {
            currentFile.unchangedPercentage = parseInt(values[1], 10);
        }
        else if ((values = dissimilarityIndex.exec(line))) {
            currentFile.changedPercentage = parseInt(values[1], 10);
        }
        else if ((values = index.exec(line))) {
            currentFile.checksumBefore = values[1];
            currentFile.checksumAfter = values[2];
            if (values[3])
                currentFile.mode = values[3];
        }
        else if ((values = combinedIndex.exec(line))) {
            currentFile.checksumBefore = [values[2], values[3]];
            currentFile.checksumAfter = values[1];
        }
        else if ((values = combinedMode.exec(line))) {
            currentFile.oldMode = [values[2], values[3]];
            currentFile.newMode = values[1];
        }
        else if ((values = combinedNewFile.exec(line))) {
            currentFile.newFileMode = values[1];
            currentFile.isNew = true;
        }
        else if ((values = combinedDeletedFile.exec(line))) {
            currentFile.deletedFileMode = values[1];
            currentFile.isDeleted = true;
        }
    });
    saveBlock();
    saveFile();
    return files;
}

function levenshtein(a, b) {
    if (a.length === 0) {
        return b.length;
    }
    if (b.length === 0) {
        return a.length;
    }
    const matrix = [];
    let i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    let j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}
function newDistanceFn(str) {
    return (x, y) => {
        const xValue = str(x).trim();
        const yValue = str(y).trim();
        const lev = levenshtein(xValue, yValue);
        return lev / (xValue.length + yValue.length);
    };
}
function newMatcherFn(distance) {
    function findBestMatch(a, b, cache = new Map()) {
        let bestMatchDist = Infinity;
        let bestMatch;
        for (let i = 0; i < a.length; ++i) {
            for (let j = 0; j < b.length; ++j) {
                const cacheKey = JSON.stringify([a[i], b[j]]);
                let md;
                if (!(cache.has(cacheKey) && (md = cache.get(cacheKey)))) {
                    md = distance(a[i], b[j]);
                    cache.set(cacheKey, md);
                }
                if (md < bestMatchDist) {
                    bestMatchDist = md;
                    bestMatch = { indexA: i, indexB: j, score: bestMatchDist };
                }
            }
        }
        return bestMatch;
    }
    function group(a, b, level = 0, cache = new Map()) {
        const bm = findBestMatch(a, b, cache);
        if (!bm || a.length + b.length < 3) {
            return [[a, b]];
        }
        const a1 = a.slice(0, bm.indexA);
        const b1 = b.slice(0, bm.indexB);
        const aMatch = [a[bm.indexA]];
        const bMatch = [b[bm.indexB]];
        const tailA = bm.indexA + 1;
        const tailB = bm.indexB + 1;
        const a2 = a.slice(tailA);
        const b2 = b.slice(tailB);
        const group1 = group(a1, b1, level + 1, cache);
        const groupMatch = group(aMatch, bMatch, level + 1, cache);
        const group2 = group(a2, b2, level + 1, cache);
        let result = groupMatch;
        if (bm.indexA > 0 || bm.indexB > 0) {
            result = group1.concat(result);
        }
        if (a.length > tailA || b.length > tailB) {
            result = result.concat(group2);
        }
        return result;
    }
    return group;
}

const CSSLineClass = {
    INSERTS: 'd2h-ins',
    DELETES: 'd2h-del',
    CONTEXT: 'd2h-cntx',
    INFO: 'd2h-info',
    INSERT_CHANGES: 'd2h-ins d2h-change',
    DELETE_CHANGES: 'd2h-del d2h-change',
};
const defaultRenderConfig = {
    matching: LineMatchingType.NONE,
    matchWordsThreshold: 0.25,
    maxLineLengthHighlight: 10000,
    diffStyle: DiffStyleType.WORD,
    colorScheme: ColorSchemeType.LIGHT,
};
const separator = '/';
const distance = newDistanceFn((change) => change.value);
const matcher = newMatcherFn(distance);
function isDevNullName(name) {
    return name.indexOf('dev/null') !== -1;
}
function removeInsElements(line) {
    return line.replace(/(<ins[^>]*>((.|\n)*?)<\/ins>)/g, '');
}
function removeDelElements(line) {
    return line.replace(/(<del[^>]*>((.|\n)*?)<\/del>)/g, '');
}
function toCSSClass(lineType) {
    switch (lineType) {
        case LineType.CONTEXT:
            return CSSLineClass.CONTEXT;
        case LineType.INSERT:
            return CSSLineClass.INSERTS;
        case LineType.DELETE:
            return CSSLineClass.DELETES;
    }
}
function colorSchemeToCss(colorScheme) {
    switch (colorScheme) {
        case ColorSchemeType.DARK:
            return 'd2h-dark-color-scheme';
        case ColorSchemeType.AUTO:
            return 'd2h-auto-color-scheme';
        case ColorSchemeType.LIGHT:
        default:
            return 'd2h-light-color-scheme';
    }
}
function prefixLength(isCombined) {
    return isCombined ? 2 : 1;
}
function escapeForHtml(str) {
    return str
        .slice(0)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
function deconstructLine(line, isCombined, escape = true) {
    const indexToSplit = prefixLength(isCombined);
    return {
        prefix: line.substring(0, indexToSplit),
        content: escape ? escapeForHtml(line.substring(indexToSplit)) : line.substring(indexToSplit),
    };
}
function filenameDiff(file) {
    const oldFilename = unifyPath(file.oldName);
    const newFilename = unifyPath(file.newName);
    if (oldFilename !== newFilename && !isDevNullName(oldFilename) && !isDevNullName(newFilename)) {
        const prefixPaths = [];
        const suffixPaths = [];
        const oldFilenameParts = oldFilename.split(separator);
        const newFilenameParts = newFilename.split(separator);
        const oldFilenamePartsSize = oldFilenameParts.length;
        const newFilenamePartsSize = newFilenameParts.length;
        let i = 0;
        let j = oldFilenamePartsSize - 1;
        let k = newFilenamePartsSize - 1;
        while (i < j && i < k) {
            if (oldFilenameParts[i] === newFilenameParts[i]) {
                prefixPaths.push(newFilenameParts[i]);
                i += 1;
            }
            else {
                break;
            }
        }
        while (j > i && k > i) {
            if (oldFilenameParts[j] === newFilenameParts[k]) {
                suffixPaths.unshift(newFilenameParts[k]);
                j -= 1;
                k -= 1;
            }
            else {
                break;
            }
        }
        const finalPrefix = prefixPaths.join(separator);
        const finalSuffix = suffixPaths.join(separator);
        const oldRemainingPath = oldFilenameParts.slice(i, j + 1).join(separator);
        const newRemainingPath = newFilenameParts.slice(i, k + 1).join(separator);
        if (finalPrefix.length && finalSuffix.length) {
            return (finalPrefix + separator + '{' + oldRemainingPath + ' → ' + newRemainingPath + '}' + separator + finalSuffix);
        }
        else if (finalPrefix.length) {
            return finalPrefix + separator + '{' + oldRemainingPath + ' → ' + newRemainingPath + '}';
        }
        else if (finalSuffix.length) {
            return '{' + oldRemainingPath + ' → ' + newRemainingPath + '}' + separator + finalSuffix;
        }
        return oldFilename + ' → ' + newFilename;
    }
    else if (!isDevNullName(newFilename)) {
        return newFilename;
    }
    else {
        return oldFilename;
    }
}
function getHtmlId(file) {
    return `d2h-${hashCode(filenameDiff(file)).toString().slice(-6)}`;
}
function getFileIcon(file) {
    let templateName = 'file-changed';
    if (file.isRename) {
        templateName = 'file-renamed';
    }
    else if (file.isCopy) {
        templateName = 'file-renamed';
    }
    else if (file.isNew) {
        templateName = 'file-added';
    }
    else if (file.isDeleted) {
        templateName = 'file-deleted';
    }
    else if (file.newName !== file.oldName) {
        templateName = 'file-renamed';
    }
    return templateName;
}
function diffHighlight(diffLine1, diffLine2, isCombined, config = {}) {
    const { matching, maxLineLengthHighlight, matchWordsThreshold, diffStyle } = Object.assign(Object.assign({}, defaultRenderConfig), config);
    const line1 = deconstructLine(diffLine1, isCombined, false);
    const line2 = deconstructLine(diffLine2, isCombined, false);
    if (line1.content.length > maxLineLengthHighlight || line2.content.length > maxLineLengthHighlight) {
        return {
            oldLine: {
                prefix: line1.prefix,
                content: escapeForHtml(line1.content),
            },
            newLine: {
                prefix: line2.prefix,
                content: escapeForHtml(line2.content),
            },
        };
    }
    const diff = diffStyle === 'char'
        ? diffChars(line1.content, line2.content)
        : diffWordsWithSpace(line1.content, line2.content);
    const changedWords = [];
    if (diffStyle === 'word' && matching === 'words') {
        const removed = diff.filter(element => element.removed);
        const added = diff.filter(element => element.added);
        const chunks = matcher(added, removed);
        chunks.forEach(chunk => {
            if (chunk[0].length === 1 && chunk[1].length === 1) {
                const dist = distance(chunk[0][0], chunk[1][0]);
                if (dist < matchWordsThreshold) {
                    changedWords.push(chunk[0][0]);
                    changedWords.push(chunk[1][0]);
                }
            }
        });
    }
    const highlightedLine = diff.reduce((highlightedLine, part) => {
        const elemType = part.added ? 'ins' : part.removed ? 'del' : null;
        const addClass = changedWords.indexOf(part) > -1 ? ' class="d2h-change"' : '';
        const escapedValue = escapeForHtml(part.value);
        return elemType !== null
            ? `${highlightedLine}<${elemType}${addClass}>${escapedValue}</${elemType}>`
            : `${highlightedLine}${escapedValue}`;
    }, '');
    return {
        oldLine: {
            prefix: line1.prefix,
            content: removeInsElements(highlightedLine),
        },
        newLine: {
            prefix: line2.prefix,
            content: removeDelElements(highlightedLine),
        },
    };
}

const baseTemplatesPath$2 = 'file-summary';
const iconsBaseTemplatesPath$2 = 'icon';
const defaultFileListRendererConfig = {
    colorScheme: defaultRenderConfig.colorScheme,
};
class FileListRenderer {
    constructor(hoganUtils, config = {}) {
        this.hoganUtils = hoganUtils;
        this.config = Object.assign(Object.assign({}, defaultFileListRendererConfig), config);
    }
    render(diffFiles) {
        const files = diffFiles
            .map(file => this.hoganUtils.render(baseTemplatesPath$2, 'line', {
            fileHtmlId: getHtmlId(file),
            oldName: file.oldName,
            newName: file.newName,
            fileName: filenameDiff(file),
            deletedLines: '-' + file.deletedLines,
            addedLines: '+' + file.addedLines,
        }, {
            fileIcon: this.hoganUtils.template(iconsBaseTemplatesPath$2, getFileIcon(file)),
        }))
            .join('\n');
        return this.hoganUtils.render(baseTemplatesPath$2, 'wrapper', {
            colorScheme: colorSchemeToCss(this.config.colorScheme),
            filesNumber: diffFiles.length,
            files: files,
        });
    }
}

const defaultLineByLineRendererConfig = Object.assign(Object.assign({}, defaultRenderConfig), { renderNothingWhenEmpty: false, matchingMaxComparisons: 2500, maxLineSizeInBlockForComparison: 200 });
const genericTemplatesPath$1 = 'generic';
const baseTemplatesPath$1 = 'line-by-line';
const iconsBaseTemplatesPath$1 = 'icon';
const tagsBaseTemplatesPath$1 = 'tag';
class LineByLineRenderer {
    constructor(hoganUtils, config = {}) {
        this.hoganUtils = hoganUtils;
        this.config = Object.assign(Object.assign({}, defaultLineByLineRendererConfig), config);
    }
    render(diffFiles) {
        const diffsHtml = diffFiles
            .map(file => {
            let diffs;
            if (file.blocks.length) {
                diffs = this.generateFileHtml(file);
            }
            else {
                diffs = this.generateEmptyDiff();
            }
            return this.makeFileDiffHtml(file, diffs);
        })
            .join('\n');
        return this.hoganUtils.render(genericTemplatesPath$1, 'wrapper', {
            colorScheme: colorSchemeToCss(this.config.colorScheme),
            content: diffsHtml,
        });
    }
    makeFileDiffHtml(file, diffs) {
        if (this.config.renderNothingWhenEmpty && Array.isArray(file.blocks) && file.blocks.length === 0)
            return '';
        const fileDiffTemplate = this.hoganUtils.template(baseTemplatesPath$1, 'file-diff');
        const filePathTemplate = this.hoganUtils.template(genericTemplatesPath$1, 'file-path');
        const fileIconTemplate = this.hoganUtils.template(iconsBaseTemplatesPath$1, 'file');
        const fileTagTemplate = this.hoganUtils.template(tagsBaseTemplatesPath$1, getFileIcon(file));
        return fileDiffTemplate.render({
            file: file,
            fileHtmlId: getHtmlId(file),
            diffs: diffs,
            filePath: filePathTemplate.render({
                fileDiffName: filenameDiff(file),
            }, {
                fileIcon: fileIconTemplate,
                fileTag: fileTagTemplate,
            }),
        });
    }
    generateEmptyDiff() {
        return this.hoganUtils.render(genericTemplatesPath$1, 'empty-diff', {
            contentClass: 'd2h-code-line',
            CSSLineClass: CSSLineClass,
        });
    }
    generateFileHtml(file) {
        const matcher = newMatcherFn(newDistanceFn((e) => deconstructLine(e.content, file.isCombined).content));
        return file.blocks
            .map(block => {
            let lines = this.hoganUtils.render(genericTemplatesPath$1, 'block-header', {
                CSSLineClass: CSSLineClass,
                blockHeader: file.isTooBig ? block.header : escapeForHtml(block.header),
                lineClass: 'd2h-code-linenumber',
                contentClass: 'd2h-code-line',
            });
            this.applyLineGroupping(block).forEach(([contextLines, oldLines, newLines]) => {
                if (oldLines.length && newLines.length && !contextLines.length) {
                    this.applyRematchMatching(oldLines, newLines, matcher).map(([oldLines, newLines]) => {
                        const { left, right } = this.processChangedLines(file, file.isCombined, oldLines, newLines);
                        lines += left;
                        lines += right;
                    });
                }
                else if (contextLines.length) {
                    contextLines.forEach(line => {
                        const { prefix, content } = deconstructLine(line.content, file.isCombined);
                        lines += this.generateSingleLineHtml(file, {
                            type: CSSLineClass.CONTEXT,
                            prefix: prefix,
                            content: content,
                            oldNumber: line.oldNumber,
                            newNumber: line.newNumber,
                        });
                    });
                }
                else if (oldLines.length || newLines.length) {
                    const { left, right } = this.processChangedLines(file, file.isCombined, oldLines, newLines);
                    lines += left;
                    lines += right;
                }
                else {
                    console.error('Unknown state reached while processing groups of lines', contextLines, oldLines, newLines);
                }
            });
            return lines;
        })
            .join('\n');
    }
    applyLineGroupping(block) {
        const blockLinesGroups = [];
        let oldLines = [];
        let newLines = [];
        for (let i = 0; i < block.lines.length; i++) {
            const diffLine = block.lines[i];
            if ((diffLine.type !== LineType.INSERT && newLines.length) ||
                (diffLine.type === LineType.CONTEXT && oldLines.length > 0)) {
                blockLinesGroups.push([[], oldLines, newLines]);
                oldLines = [];
                newLines = [];
            }
            if (diffLine.type === LineType.CONTEXT) {
                blockLinesGroups.push([[diffLine], [], []]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length === 0) {
                blockLinesGroups.push([[], [], [diffLine]]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length > 0) {
                newLines.push(diffLine);
            }
            else if (diffLine.type === LineType.DELETE) {
                oldLines.push(diffLine);
            }
        }
        if (oldLines.length || newLines.length) {
            blockLinesGroups.push([[], oldLines, newLines]);
            oldLines = [];
            newLines = [];
        }
        return blockLinesGroups;
    }
    applyRematchMatching(oldLines, newLines, matcher) {
        const comparisons = oldLines.length * newLines.length;
        const maxLineSizeInBlock = max(oldLines.concat(newLines).map(elem => elem.content.length));
        const doMatching = comparisons < this.config.matchingMaxComparisons &&
            maxLineSizeInBlock < this.config.maxLineSizeInBlockForComparison &&
            (this.config.matching === 'lines' || this.config.matching === 'words');
        return doMatching ? matcher(oldLines, newLines) : [[oldLines, newLines]];
    }
    processChangedLines(file, isCombined, oldLines, newLines) {
        const fileHtml = {
            right: '',
            left: '',
        };
        const maxLinesNumber = Math.max(oldLines.length, newLines.length);
        for (let i = 0; i < maxLinesNumber; i++) {
            const oldLine = oldLines[i];
            const newLine = newLines[i];
            const diff = oldLine !== undefined && newLine !== undefined
                ? diffHighlight(oldLine.content, newLine.content, isCombined, this.config)
                : undefined;
            const preparedOldLine = oldLine !== undefined && oldLine.oldNumber !== undefined
                ? Object.assign(Object.assign({}, (diff !== undefined
                    ? {
                        prefix: diff.oldLine.prefix,
                        content: diff.oldLine.content,
                        type: CSSLineClass.DELETE_CHANGES,
                    }
                    : Object.assign(Object.assign({}, deconstructLine(oldLine.content, isCombined)), { type: toCSSClass(oldLine.type) }))), { oldNumber: oldLine.oldNumber, newNumber: oldLine.newNumber }) : undefined;
            const preparedNewLine = newLine !== undefined && newLine.newNumber !== undefined
                ? Object.assign(Object.assign({}, (diff !== undefined
                    ? {
                        prefix: diff.newLine.prefix,
                        content: diff.newLine.content,
                        type: CSSLineClass.INSERT_CHANGES,
                    }
                    : Object.assign(Object.assign({}, deconstructLine(newLine.content, isCombined)), { type: toCSSClass(newLine.type) }))), { oldNumber: newLine.oldNumber, newNumber: newLine.newNumber }) : undefined;
            const { left, right } = this.generateLineHtml(file, preparedOldLine, preparedNewLine);
            fileHtml.left += left;
            fileHtml.right += right;
        }
        return fileHtml;
    }
    generateLineHtml(file, oldLine, newLine) {
        return {
            left: this.generateSingleLineHtml(file, oldLine),
            right: this.generateSingleLineHtml(file, newLine),
        };
    }
    generateSingleLineHtml(file, line) {
        if (line === undefined)
            return '';
        const lineNumberHtml = this.hoganUtils.render(baseTemplatesPath$1, 'numbers', {
            oldNumber: line.oldNumber || '',
            newNumber: line.newNumber || '',
        });
        return this.hoganUtils.render(genericTemplatesPath$1, 'line', {
            type: line.type,
            lineClass: 'd2h-code-linenumber',
            contentClass: 'd2h-code-line',
            prefix: line.prefix === ' ' ? '&nbsp;' : line.prefix,
            content: line.content,
            lineNumber: lineNumberHtml,
            line,
            file,
        });
    }
}

const defaultSideBySideRendererConfig = Object.assign(Object.assign({}, defaultRenderConfig), { renderNothingWhenEmpty: false, matchingMaxComparisons: 2500, maxLineSizeInBlockForComparison: 200 });
const genericTemplatesPath = 'generic';
const baseTemplatesPath = 'side-by-side';
const iconsBaseTemplatesPath = 'icon';
const tagsBaseTemplatesPath = 'tag';
class SideBySideRenderer {
    constructor(hoganUtils, config = {}) {
        this.hoganUtils = hoganUtils;
        this.config = Object.assign(Object.assign({}, defaultSideBySideRendererConfig), config);
    }
    render(diffFiles) {
        const diffsHtml = diffFiles
            .map(file => {
            let diffs;
            if (file.blocks.length) {
                diffs = this.generateFileHtml(file);
            }
            else {
                diffs = this.generateEmptyDiff();
            }
            return this.makeFileDiffHtml(file, diffs);
        })
            .join('\n');
        return this.hoganUtils.render(genericTemplatesPath, 'wrapper', {
            colorScheme: colorSchemeToCss(this.config.colorScheme),
            content: diffsHtml,
        });
    }
    makeFileDiffHtml(file, diffs) {
        if (this.config.renderNothingWhenEmpty && Array.isArray(file.blocks) && file.blocks.length === 0)
            return '';
        const fileDiffTemplate = this.hoganUtils.template(baseTemplatesPath, 'file-diff');
        const filePathTemplate = this.hoganUtils.template(genericTemplatesPath, 'file-path');
        const fileIconTemplate = this.hoganUtils.template(iconsBaseTemplatesPath, 'file');
        const fileTagTemplate = this.hoganUtils.template(tagsBaseTemplatesPath, getFileIcon(file));
        return fileDiffTemplate.render({
            file: file,
            fileHtmlId: getHtmlId(file),
            diffs: diffs,
            filePath: filePathTemplate.render({
                fileDiffName: filenameDiff(file),
            }, {
                fileIcon: fileIconTemplate,
                fileTag: fileTagTemplate,
            }),
        });
    }
    generateEmptyDiff() {
        return {
            right: '',
            left: this.hoganUtils.render(genericTemplatesPath, 'empty-diff', {
                contentClass: 'd2h-code-side-line',
                CSSLineClass: CSSLineClass,
            }),
        };
    }
    generateFileHtml(file) {
        const matcher = newMatcherFn(newDistanceFn((e) => deconstructLine(e.content, file.isCombined).content));
        return file.blocks
            .map(block => {
            const fileHtml = {
                left: this.makeHeaderHtml(block.header, file),
                right: this.makeHeaderHtml(''),
            };
            this.applyLineGroupping(block).forEach(([contextLines, oldLines, newLines]) => {
                if (oldLines.length && newLines.length && !contextLines.length) {
                    this.applyRematchMatching(oldLines, newLines, matcher).map(([oldLines, newLines]) => {
                        const { left, right } = this.processChangedLines(file.isCombined, oldLines, newLines);
                        fileHtml.left += left;
                        fileHtml.right += right;
                    });
                }
                else if (contextLines.length) {
                    contextLines.forEach(line => {
                        const { prefix, content } = deconstructLine(line.content, file.isCombined);
                        const { left, right } = this.generateLineHtml({
                            type: CSSLineClass.CONTEXT,
                            prefix: prefix,
                            content: content,
                            number: line.oldNumber,
                        }, {
                            type: CSSLineClass.CONTEXT,
                            prefix: prefix,
                            content: content,
                            number: line.newNumber,
                        });
                        fileHtml.left += left;
                        fileHtml.right += right;
                    });
                }
                else if (oldLines.length || newLines.length) {
                    const { left, right } = this.processChangedLines(file.isCombined, oldLines, newLines);
                    fileHtml.left += left;
                    fileHtml.right += right;
                }
                else {
                    console.error('Unknown state reached while processing groups of lines', contextLines, oldLines, newLines);
                }
            });
            return fileHtml;
        })
            .reduce((accomulated, html) => {
            return { left: accomulated.left + html.left, right: accomulated.right + html.right };
        }, { left: '', right: '' });
    }
    applyLineGroupping(block) {
        const blockLinesGroups = [];
        let oldLines = [];
        let newLines = [];
        for (let i = 0; i < block.lines.length; i++) {
            const diffLine = block.lines[i];
            if ((diffLine.type !== LineType.INSERT && newLines.length) ||
                (diffLine.type === LineType.CONTEXT && oldLines.length > 0)) {
                blockLinesGroups.push([[], oldLines, newLines]);
                oldLines = [];
                newLines = [];
            }
            if (diffLine.type === LineType.CONTEXT) {
                blockLinesGroups.push([[diffLine], [], []]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length === 0) {
                blockLinesGroups.push([[], [], [diffLine]]);
            }
            else if (diffLine.type === LineType.INSERT && oldLines.length > 0) {
                newLines.push(diffLine);
            }
            else if (diffLine.type === LineType.DELETE) {
                oldLines.push(diffLine);
            }
        }
        if (oldLines.length || newLines.length) {
            blockLinesGroups.push([[], oldLines, newLines]);
            oldLines = [];
            newLines = [];
        }
        return blockLinesGroups;
    }
    applyRematchMatching(oldLines, newLines, matcher) {
        const comparisons = oldLines.length * newLines.length;
        const maxLineSizeInBlock = max(oldLines.concat(newLines).map(elem => elem.content.length));
        const doMatching = comparisons < this.config.matchingMaxComparisons &&
            maxLineSizeInBlock < this.config.maxLineSizeInBlockForComparison &&
            (this.config.matching === 'lines' || this.config.matching === 'words');
        return doMatching ? matcher(oldLines, newLines) : [[oldLines, newLines]];
    }
    makeHeaderHtml(blockHeader, file) {
        return this.hoganUtils.render(genericTemplatesPath, 'block-header', {
            CSSLineClass: CSSLineClass,
            blockHeader: (file === null || file === void 0 ? void 0 : file.isTooBig) ? blockHeader : escapeForHtml(blockHeader),
            lineClass: 'd2h-code-side-linenumber',
            contentClass: 'd2h-code-side-line',
        });
    }
    processChangedLines(isCombined, oldLines, newLines) {
        const fileHtml = {
            right: '',
            left: '',
        };
        const maxLinesNumber = Math.max(oldLines.length, newLines.length);
        for (let i = 0; i < maxLinesNumber; i++) {
            const oldLine = oldLines[i];
            const newLine = newLines[i];
            const diff = oldLine !== undefined && newLine !== undefined
                ? diffHighlight(oldLine.content, newLine.content, isCombined, this.config)
                : undefined;
            const preparedOldLine = oldLine !== undefined && oldLine.oldNumber !== undefined
                ? Object.assign(Object.assign({}, (diff !== undefined
                    ? {
                        prefix: diff.oldLine.prefix,
                        content: diff.oldLine.content,
                        type: CSSLineClass.DELETE_CHANGES,
                    }
                    : Object.assign(Object.assign({}, deconstructLine(oldLine.content, isCombined)), { type: toCSSClass(oldLine.type) }))), { number: oldLine.oldNumber }) : undefined;
            const preparedNewLine = newLine !== undefined && newLine.newNumber !== undefined
                ? Object.assign(Object.assign({}, (diff !== undefined
                    ? {
                        prefix: diff.newLine.prefix,
                        content: diff.newLine.content,
                        type: CSSLineClass.INSERT_CHANGES,
                    }
                    : Object.assign(Object.assign({}, deconstructLine(newLine.content, isCombined)), { type: toCSSClass(newLine.type) }))), { number: newLine.newNumber }) : undefined;
            const { left, right } = this.generateLineHtml(preparedOldLine, preparedNewLine);
            fileHtml.left += left;
            fileHtml.right += right;
        }
        return fileHtml;
    }
    generateLineHtml(oldLine, newLine) {
        return {
            left: this.generateSingleHtml(oldLine),
            right: this.generateSingleHtml(newLine),
        };
    }
    generateSingleHtml(line) {
        const lineClass = 'd2h-code-side-linenumber';
        const contentClass = 'd2h-code-side-line';
        return this.hoganUtils.render(genericTemplatesPath, 'line', {
            type: (line === null || line === void 0 ? void 0 : line.type) || `${CSSLineClass.CONTEXT} d2h-emptyplaceholder`,
            lineClass: line !== undefined ? lineClass : `${lineClass} d2h-code-side-emptyplaceholder`,
            contentClass: line !== undefined ? contentClass : `${contentClass} d2h-code-side-emptyplaceholder`,
            prefix: (line === null || line === void 0 ? void 0 : line.prefix) === ' ' ? '&nbsp;' : line === null || line === void 0 ? void 0 : line.prefix,
            content: line === null || line === void 0 ? void 0 : line.content,
            lineNumber: line === null || line === void 0 ? void 0 : line.number,
        });
    }
}

var compiler = {};

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var hasRequiredCompiler;

function requireCompiler () {
	if (hasRequiredCompiler) return compiler;
	hasRequiredCompiler = 1;
	(function (exports$1) {
		(function (Hogan) {
		  // Setup regex  assignments
		  // remove whitespace according to Mustache spec
		  var rIsWhitespace = /\S/,
		      rQuot = /\"/g,
		      rNewline =  /\n/g,
		      rCr = /\r/g,
		      rSlash = /\\/g,
		      rLineSep = /\u2028/,
		      rParagraphSep = /\u2029/;

		  Hogan.tags = {
		    '#': 1, '^': 2, '<': 3, '$': 4,
		    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
		    '{': 10, '&': 11, '_t': 12
		  };

		  Hogan.scan = function scan(text, delimiters) {
		    var len = text.length,
		        IN_TEXT = 0,
		        IN_TAG_TYPE = 1,
		        IN_TAG = 2,
		        state = IN_TEXT,
		        tagType = null,
		        tag = null,
		        buf = '',
		        tokens = [],
		        seenTag = false,
		        i = 0,
		        lineStart = 0,
		        otag = '{{',
		        ctag = '}}';

		    function addBuf() {
		      if (buf.length > 0) {
		        tokens.push({tag: '_t', text: new String(buf)});
		        buf = '';
		      }
		    }

		    function lineIsWhitespace() {
		      var isAllWhitespace = true;
		      for (var j = lineStart; j < tokens.length; j++) {
		        isAllWhitespace =
		          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
		          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
		        if (!isAllWhitespace) {
		          return false;
		        }
		      }

		      return isAllWhitespace;
		    }

		    function filterLine(haveSeenTag, noNewLine) {
		      addBuf();

		      if (haveSeenTag && lineIsWhitespace()) {
		        for (var j = lineStart, next; j < tokens.length; j++) {
		          if (tokens[j].text) {
		            if ((next = tokens[j+1]) && next.tag == '>') {
		              // set indent to token value
		              next.indent = tokens[j].text.toString();
		            }
		            tokens.splice(j, 1);
		          }
		        }
		      } else if (!noNewLine) {
		        tokens.push({tag:'\n'});
		      }

		      seenTag = false;
		      lineStart = tokens.length;
		    }

		    function changeDelimiters(text, index) {
		      var close = '=' + ctag,
		          closeIndex = text.indexOf(close, index),
		          delimiters = trim(
		            text.substring(text.indexOf('=', index) + 1, closeIndex)
		          ).split(' ');

		      otag = delimiters[0];
		      ctag = delimiters[delimiters.length - 1];

		      return closeIndex + close.length - 1;
		    }

		    if (delimiters) {
		      delimiters = delimiters.split(' ');
		      otag = delimiters[0];
		      ctag = delimiters[1];
		    }

		    for (i = 0; i < len; i++) {
		      if (state == IN_TEXT) {
		        if (tagChange(otag, text, i)) {
		          --i;
		          addBuf();
		          state = IN_TAG_TYPE;
		        } else {
		          if (text.charAt(i) == '\n') {
		            filterLine(seenTag);
		          } else {
		            buf += text.charAt(i);
		          }
		        }
		      } else if (state == IN_TAG_TYPE) {
		        i += otag.length - 1;
		        tag = Hogan.tags[text.charAt(i + 1)];
		        tagType = tag ? text.charAt(i + 1) : '_v';
		        if (tagType == '=') {
		          i = changeDelimiters(text, i);
		          state = IN_TEXT;
		        } else {
		          if (tag) {
		            i++;
		          }
		          state = IN_TAG;
		        }
		        seenTag = i;
		      } else {
		        if (tagChange(ctag, text, i)) {
		          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
		                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
		          buf = '';
		          i += ctag.length - 1;
		          state = IN_TEXT;
		          if (tagType == '{') {
		            if (ctag == '}}') {
		              i++;
		            } else {
		              cleanTripleStache(tokens[tokens.length - 1]);
		            }
		          }
		        } else {
		          buf += text.charAt(i);
		        }
		      }
		    }

		    filterLine(seenTag, true);

		    return tokens;
		  };

		  function cleanTripleStache(token) {
		    if (token.n.substr(token.n.length - 1) === '}') {
		      token.n = token.n.substring(0, token.n.length - 1);
		    }
		  }

		  function trim(s) {
		    if (s.trim) {
		      return s.trim();
		    }

		    return s.replace(/^\s*|\s*$/g, '');
		  }

		  function tagChange(tag, text, index) {
		    if (text.charAt(index) != tag.charAt(0)) {
		      return false;
		    }

		    for (var i = 1, l = tag.length; i < l; i++) {
		      if (text.charAt(index + i) != tag.charAt(i)) {
		        return false;
		      }
		    }

		    return true;
		  }

		  // the tags allowed inside super templates
		  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

		  function buildTree(tokens, kind, stack, customTags) {
		    var instructions = [],
		        opener = null,
		        tail = null,
		        token = null;

		    tail = stack[stack.length - 1];

		    while (tokens.length > 0) {
		      token = tokens.shift();

		      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
		        throw new Error('Illegal content in < super tag.');
		      }

		      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
		        stack.push(token);
		        token.nodes = buildTree(tokens, token.tag, stack, customTags);
		      } else if (token.tag == '/') {
		        if (stack.length === 0) {
		          throw new Error('Closing tag without opener: /' + token.n);
		        }
		        opener = stack.pop();
		        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
		          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
		        }
		        opener.end = token.i;
		        return instructions;
		      } else if (token.tag == '\n') {
		        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
		      }

		      instructions.push(token);
		    }

		    if (stack.length > 0) {
		      throw new Error('missing closing tag: ' + stack.pop().n);
		    }

		    return instructions;
		  }

		  function isOpener(token, tags) {
		    for (var i = 0, l = tags.length; i < l; i++) {
		      if (tags[i].o == token.n) {
		        token.tag = '#';
		        return true;
		      }
		    }
		  }

		  function isCloser(close, open, tags) {
		    for (var i = 0, l = tags.length; i < l; i++) {
		      if (tags[i].c == close && tags[i].o == open) {
		        return true;
		      }
		    }
		  }

		  function stringifySubstitutions(obj) {
		    var items = [];
		    for (var key in obj) {
		      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
		    }
		    return "{ " + items.join(",") + " }";
		  }

		  function stringifyPartials(codeObj) {
		    var partials = [];
		    for (var key in codeObj.partials) {
		      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
		    }
		    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
		  }

		  Hogan.stringify = function(codeObj, text, options) {
		    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
		  };

		  var serialNo = 0;
		  Hogan.generate = function(tree, text, options) {
		    serialNo = 0;
		    var context = { code: '', subs: {}, partials: {} };
		    Hogan.walk(tree, context);

		    if (options.asString) {
		      return this.stringify(context, text, options);
		    }

		    return this.makeTemplate(context, text, options);
		  };

		  Hogan.wrapMain = function(code) {
		    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
		  };

		  Hogan.template = Hogan.Template;

		  Hogan.makeTemplate = function(codeObj, text, options) {
		    var template = this.makePartials(codeObj);
		    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
		    return new this.template(template, text, this, options);
		  };

		  Hogan.makePartials = function(codeObj) {
		    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
		    for (key in template.partials) {
		      template.partials[key] = this.makePartials(template.partials[key]);
		    }
		    for (key in codeObj.subs) {
		      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
		    }
		    return template;
		  };

		  function esc(s) {
		    return s.replace(rSlash, '\\\\')
		            .replace(rQuot, '\\\"')
		            .replace(rNewline, '\\n')
		            .replace(rCr, '\\r')
		            .replace(rLineSep, '\\u2028')
		            .replace(rParagraphSep, '\\u2029');
		  }

		  function chooseMethod(s) {
		    return (~s.indexOf('.')) ? 'd' : 'f';
		  }

		  function createPartial(node, context) {
		    var prefix = "<" + (context.prefix || "");
		    var sym = prefix + node.n + serialNo++;
		    context.partials[sym] = {name: node.n, partials: {}};
		    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
		    return sym;
		  }

		  Hogan.codegen = {
		    '#': function(node, context) {
		      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
		                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
		                      't.rs(c,p,' + 'function(c,p,t){';
		      Hogan.walk(node.nodes, context);
		      context.code += '});c.pop();}';
		    },

		    '^': function(node, context) {
		      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
		      Hogan.walk(node.nodes, context);
		      context.code += '};';
		    },

		    '>': createPartial,
		    '<': function(node, context) {
		      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
		      Hogan.walk(node.nodes, ctx);
		      var template = context.partials[createPartial(node, context)];
		      template.subs = ctx.subs;
		      template.partials = ctx.partials;
		    },

		    '$': function(node, context) {
		      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
		      Hogan.walk(node.nodes, ctx);
		      context.subs[node.n] = ctx.code;
		      if (!context.inPartial) {
		        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
		      }
		    },

		    '\n': function(node, context) {
		      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
		    },

		    '_v': function(node, context) {
		      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
		    },

		    '_t': function(node, context) {
		      context.code += write('"' + esc(node.text) + '"');
		    },

		    '{': tripleStache,

		    '&': tripleStache
		  };

		  function tripleStache(node, context) {
		    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
		  }

		  function write(s) {
		    return 't.b(' + s + ');';
		  }

		  Hogan.walk = function(nodelist, context) {
		    var func;
		    for (var i = 0, l = nodelist.length; i < l; i++) {
		      func = Hogan.codegen[nodelist[i].tag];
		      func && func(nodelist[i], context);
		    }
		    return context;
		  };

		  Hogan.parse = function(tokens, text, options) {
		    options = options || {};
		    return buildTree(tokens, '', [], options.sectionTags || []);
		  };

		  Hogan.cache = {};

		  Hogan.cacheKey = function(text, options) {
		    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
		  };

		  Hogan.compile = function(text, options) {
		    options = options || {};
		    var key = Hogan.cacheKey(text, options);
		    var template = this.cache[key];

		    if (template) {
		      var partials = template.partials;
		      for (var name in partials) {
		        delete partials[name].instance;
		      }
		      return template;
		    }

		    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
		    return this.cache[key] = template;
		  };
		})(exports$1 ); 
	} (compiler));
	return compiler;
}

var template = {};

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var hasRequiredTemplate;

function requireTemplate () {
	if (hasRequiredTemplate) return template;
	hasRequiredTemplate = 1;
	(function (exports$1) {

		(function (Hogan) {
		  Hogan.Template = function (codeObj, text, compiler, options) {
		    codeObj = codeObj || {};
		    this.r = codeObj.code || this.r;
		    this.c = compiler;
		    this.options = options || {};
		    this.text = text || '';
		    this.partials = codeObj.partials || {};
		    this.subs = codeObj.subs || {};
		    this.buf = '';
		  };

		  Hogan.Template.prototype = {
		    // render: replaced by generated code.
		    r: function (context, partials, indent) { return ''; },

		    // variable escaping
		    v: hoganEscape,

		    // triple stache
		    t: coerceToString,

		    render: function render(context, partials, indent) {
		      return this.ri([context], partials || {}, indent);
		    },

		    // render internal -- a hook for overrides that catches partials too
		    ri: function (context, partials, indent) {
		      return this.r(context, partials, indent);
		    },

		    // ensurePartial
		    ep: function(symbol, partials) {
		      var partial = this.partials[symbol];

		      // check to see that if we've instantiated this partial before
		      var template = partials[partial.name];
		      if (partial.instance && partial.base == template) {
		        return partial.instance;
		      }

		      if (typeof template == 'string') {
		        if (!this.c) {
		          throw new Error("No compiler available.");
		        }
		        template = this.c.compile(template, this.options);
		      }

		      if (!template) {
		        return null;
		      }

		      // We use this to check whether the partials dictionary has changed
		      this.partials[symbol].base = template;

		      if (partial.subs) {
		        // Make sure we consider parent template now
		        if (!partials.stackText) partials.stackText = {};
		        for (key in partial.subs) {
		          if (!partials.stackText[key]) {
		            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
		          }
		        }
		        template = createSpecializedPartial(template, partial.subs, partial.partials,
		          this.stackSubs, this.stackPartials, partials.stackText);
		      }
		      this.partials[symbol].instance = template;

		      return template;
		    },

		    // tries to find a partial in the current scope and render it
		    rp: function(symbol, context, partials, indent) {
		      var partial = this.ep(symbol, partials);
		      if (!partial) {
		        return '';
		      }

		      return partial.ri(context, partials, indent);
		    },

		    // render a section
		    rs: function(context, partials, section) {
		      var tail = context[context.length - 1];

		      if (!isArray(tail)) {
		        section(context, partials, this);
		        return;
		      }

		      for (var i = 0; i < tail.length; i++) {
		        context.push(tail[i]);
		        section(context, partials, this);
		        context.pop();
		      }
		    },

		    // maybe start a section
		    s: function(val, ctx, partials, inverted, start, end, tags) {
		      var pass;

		      if (isArray(val) && val.length === 0) {
		        return false;
		      }

		      if (typeof val == 'function') {
		        val = this.ms(val, ctx, partials, inverted, start, end, tags);
		      }

		      pass = !!val;

		      if (!inverted && pass && ctx) {
		        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
		      }

		      return pass;
		    },

		    // find values with dotted names
		    d: function(key, ctx, partials, returnFound) {
		      var found,
		          names = key.split('.'),
		          val = this.f(names[0], ctx, partials, returnFound),
		          doModelGet = this.options.modelGet,
		          cx = null;

		      if (key === '.' && isArray(ctx[ctx.length - 2])) {
		        val = ctx[ctx.length - 1];
		      } else {
		        for (var i = 1; i < names.length; i++) {
		          found = findInScope(names[i], val, doModelGet);
		          if (found !== undefined) {
		            cx = val;
		            val = found;
		          } else {
		            val = '';
		          }
		        }
		      }

		      if (returnFound && !val) {
		        return false;
		      }

		      if (!returnFound && typeof val == 'function') {
		        ctx.push(cx);
		        val = this.mv(val, ctx, partials);
		        ctx.pop();
		      }

		      return val;
		    },

		    // find values with normal names
		    f: function(key, ctx, partials, returnFound) {
		      var val = false,
		          v = null,
		          found = false,
		          doModelGet = this.options.modelGet;

		      for (var i = ctx.length - 1; i >= 0; i--) {
		        v = ctx[i];
		        val = findInScope(key, v, doModelGet);
		        if (val !== undefined) {
		          found = true;
		          break;
		        }
		      }

		      if (!found) {
		        return (returnFound) ? false : "";
		      }

		      if (!returnFound && typeof val == 'function') {
		        val = this.mv(val, ctx, partials);
		      }

		      return val;
		    },

		    // higher order templates
		    ls: function(func, cx, ctx, partials, text, tags) {
		      var oldTags = this.options.delimiters;

		      this.options.delimiters = tags;
		      this.b(this.ct(coerceToString(func.call(cx, text, ctx)), cx, partials));
		      this.options.delimiters = oldTags;

		      return false;
		    },

		    // compile text
		    ct: function(text, cx, partials) {
		      if (this.options.disableLambda) {
		        throw new Error('Lambda features disabled.');
		      }
		      return this.c.compile(text, this.options).render(cx, partials);
		    },

		    // template result buffering
		    b: function(s) { this.buf += s; },

		    fl: function() { var r = this.buf; this.buf = ''; return r; },

		    // method replace section
		    ms: function(func, ctx, partials, inverted, start, end, tags) {
		      var textSource,
		          cx = ctx[ctx.length - 1],
		          result = func.call(cx);

		      if (typeof result == 'function') {
		        if (inverted) {
		          return true;
		        } else {
		          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
		          return this.ls(result, cx, ctx, partials, textSource.substring(start, end), tags);
		        }
		      }

		      return result;
		    },

		    // method replace variable
		    mv: function(func, ctx, partials) {
		      var cx = ctx[ctx.length - 1];
		      var result = func.call(cx);

		      if (typeof result == 'function') {
		        return this.ct(coerceToString(result.call(cx)), cx, partials);
		      }

		      return result;
		    },

		    sub: function(name, context, partials, indent) {
		      var f = this.subs[name];
		      if (f) {
		        this.activeSub = name;
		        f(context, partials, this, indent);
		        this.activeSub = false;
		      }
		    }

		  };

		  //Find a key in an object
		  function findInScope(key, scope, doModelGet) {
		    var val;

		    if (scope && typeof scope == 'object') {

		      if (scope[key] !== undefined) {
		        val = scope[key];

		      // try lookup with get for backbone or similar model data
		      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
		        val = scope.get(key);
		      }
		    }

		    return val;
		  }

		  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
		    function PartialTemplate() {}		    PartialTemplate.prototype = instance;
		    function Substitutions() {}		    Substitutions.prototype = instance.subs;
		    var key;
		    var partial = new PartialTemplate();
		    partial.subs = new Substitutions();
		    partial.subsText = {};  //hehe. substext.
		    partial.buf = '';

		    stackSubs = stackSubs || {};
		    partial.stackSubs = stackSubs;
		    partial.subsText = stackText;
		    for (key in subs) {
		      if (!stackSubs[key]) stackSubs[key] = subs[key];
		    }
		    for (key in stackSubs) {
		      partial.subs[key] = stackSubs[key];
		    }

		    stackPartials = stackPartials || {};
		    partial.stackPartials = stackPartials;
		    for (key in partials) {
		      if (!stackPartials[key]) stackPartials[key] = partials[key];
		    }
		    for (key in stackPartials) {
		      partial.partials[key] = stackPartials[key];
		    }

		    return partial;
		  }

		  var rAmp = /&/g,
		      rLt = /</g,
		      rGt = />/g,
		      rApos = /\'/g,
		      rQuot = /\"/g,
		      hChars = /[&<>\"\']/;

		  function coerceToString(val) {
		    return String((val === null || val === undefined) ? '' : val);
		  }

		  function hoganEscape(str) {
		    str = coerceToString(str);
		    return hChars.test(str) ?
		      str
		        .replace(rAmp, '&amp;')
		        .replace(rLt, '&lt;')
		        .replace(rGt, '&gt;')
		        .replace(rApos, '&#39;')
		        .replace(rQuot, '&quot;') :
		      str;
		  }

		  var isArray = Array.isArray || function(a) {
		    return Object.prototype.toString.call(a) === '[object Array]';
		  };

		})(exports$1 ); 
	} (template));
	return template;
}

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var hogan;
var hasRequiredHogan;

function requireHogan () {
	if (hasRequiredHogan) return hogan;
	hasRequiredHogan = 1;
	// This file is for use with Node.js. See dist/ for browser files.

	var Hogan = requireCompiler();
	Hogan.Template = requireTemplate().Template;
	Hogan.template = Hogan.Template;
	hogan = Hogan;
	return hogan;
}

var hoganExports = requireHogan();

const defaultTemplates = {};
defaultTemplates["file-summary-line"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<li class=\"d2h-file-list-line\">"); t.b("\n" + i); t.b("    <span class=\"d2h-file-name-wrapper\">"); t.b("\n" + i); t.b(t.rp("<fileIcon0", c, p, "      ")); t.b("      <a href=\"#"); t.b(t.v(t.f("fileHtmlId", c, p, 0))); t.b("\" class=\"d2h-file-name\">"); t.b(t.v(t.f("fileName", c, p, 0))); t.b("</a>"); t.b("\n" + i); t.b("      <span class=\"d2h-file-stats\">"); t.b("\n" + i); t.b("          <span class=\"d2h-lines-added\">"); t.b(t.v(t.f("addedLines", c, p, 0))); t.b("</span>"); t.b("\n" + i); t.b("          <span class=\"d2h-lines-deleted\">"); t.b(t.v(t.f("deletedLines", c, p, 0))); t.b("</span>"); t.b("\n" + i); t.b("      </span>"); t.b("\n" + i); t.b("    </span>"); t.b("\n" + i); t.b("</li>"); return t.fl(); }, partials: { "<fileIcon0": { name: "fileIcon", partials: {}, subs: {} } }, subs: {} });
defaultTemplates["file-summary-wrapper"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div class=\"d2h-file-list-wrapper "); t.b(t.v(t.f("colorScheme", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("    <div class=\"d2h-file-list-header\">"); t.b("\n" + i); t.b("        <span class=\"d2h-file-list-title\">Files changed ("); t.b(t.v(t.f("filesNumber", c, p, 0))); t.b(")</span>"); t.b("\n" + i); t.b("        <a class=\"d2h-file-switch d2h-hide\">hide</a>"); t.b("\n" + i); t.b("        <a class=\"d2h-file-switch d2h-show\">show</a>"); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("    <ol class=\"d2h-file-list\">"); t.b("\n" + i); t.b("    "); t.b(t.t(t.f("files", c, p, 0))); t.b("\n" + i); t.b("    </ol>"); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-block-header"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<tr>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.f("lineClass", c, p, 0))); t.b(" "); t.b(t.v(t.d("CSSLineClass.INFO", c, p, 0))); t.b("\"></td>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.d("CSSLineClass.INFO", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("        <div class=\""); t.b(t.v(t.f("contentClass", c, p, 0))); t.b("\">"); if (t.s(t.f("blockHeader", c, p, 1), c, p, 0, 156, 173, "{{ }}")) {
        t.rs(c, p, function (c, p, t) { t.b(t.t(t.f("blockHeader", c, p, 0))); });
        c.pop();
    } if (!t.s(t.f("blockHeader", c, p, 1), c, p, 1, 0, 0, "")) {
        t.b("&nbsp;");
    } t.b("</div>"); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("</tr>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-empty-diff"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<tr>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.d("CSSLineClass.INFO", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("        <div class=\""); t.b(t.v(t.f("contentClass", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("            File without changes"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("</tr>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-file-path"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-file-name-wrapper\">"); t.b("\n" + i); t.b(t.rp("<fileIcon0", c, p, "    ")); t.b("    <span class=\"d2h-file-name\">"); t.b(t.v(t.f("fileDiffName", c, p, 0))); t.b("</span>"); t.b("\n" + i); t.b(t.rp("<fileTag1", c, p, "    ")); t.b("</span>"); t.b("\n" + i); t.b("<label class=\"d2h-file-collapse\">"); t.b("\n" + i); t.b("    <input class=\"d2h-file-collapse-input\" type=\"checkbox\" name=\"viewed\" value=\"viewed\">"); t.b("\n" + i); t.b("    Viewed"); t.b("\n" + i); t.b("</label>"); return t.fl(); }, partials: { "<fileIcon0": { name: "fileIcon", partials: {}, subs: {} }, "<fileTag1": { name: "fileTag", partials: {}, subs: {} } }, subs: {} });
defaultTemplates["generic-line"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<tr>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.f("lineClass", c, p, 0))); t.b(" "); t.b(t.v(t.f("type", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("      "); t.b(t.t(t.f("lineNumber", c, p, 0))); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("    <td class=\""); t.b(t.v(t.f("type", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("        <div class=\""); t.b(t.v(t.f("contentClass", c, p, 0))); t.b("\">"); t.b("\n" + i); if (t.s(t.f("prefix", c, p, 1), c, p, 0, 162, 238, "{{ }}")) {
        t.rs(c, p, function (c, p, t) { t.b("            <span class=\"d2h-code-line-prefix\">"); t.b(t.t(t.f("prefix", c, p, 0))); t.b("</span>"); t.b("\n" + i); });
        c.pop();
    } if (!t.s(t.f("prefix", c, p, 1), c, p, 1, 0, 0, "")) {
        t.b("            <span class=\"d2h-code-line-prefix\">&nbsp;</span>");
        t.b("\n" + i);
    } if (t.s(t.f("content", c, p, 1), c, p, 0, 371, 445, "{{ }}")) {
        t.rs(c, p, function (c, p, t) { t.b("            <span class=\"d2h-code-line-ctn\">"); t.b(t.t(t.f("content", c, p, 0))); t.b("</span>"); t.b("\n" + i); });
        c.pop();
    } if (!t.s(t.f("content", c, p, 1), c, p, 1, 0, 0, "")) {
        t.b("            <span class=\"d2h-code-line-ctn\"><br></span>");
        t.b("\n" + i);
    } t.b("        </div>"); t.b("\n" + i); t.b("    </td>"); t.b("\n" + i); t.b("</tr>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["generic-wrapper"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div class=\"d2h-wrapper "); t.b(t.v(t.f("colorScheme", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("    "); t.b(t.t(t.f("content", c, p, 0))); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-added"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-added\" height=\"16\" title=\"added\" version=\"1.1\" viewBox=\"0 0 14 16\""); t.b("\n" + i); t.b("     width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-changed"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-changed\" height=\"16\" title=\"modified\" version=\"1.1\""); t.b("\n" + i); t.b("     viewBox=\"0 0 14 16\" width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-deleted"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-deleted\" height=\"16\" title=\"removed\" version=\"1.1\""); t.b("\n" + i); t.b("     viewBox=\"0 0 14 16\" width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM11 9H3V7h8v2z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file-renamed"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-moved\" height=\"16\" title=\"renamed\" version=\"1.1\""); t.b("\n" + i); t.b("     viewBox=\"0 0 14 16\" width=\"14\">"); t.b("\n" + i); t.b("    <path d=\"M6 9H3V7h3V4l5 4-5 4V9z m8-7v12c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h12c0.55 0 1 0.45 1 1z m-1 0H1v12h12V2z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["icon-file"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<svg aria-hidden=\"true\" class=\"d2h-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 12 16\" width=\"12\">"); t.b("\n" + i); t.b("    <path d=\"M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z\"></path>"); t.b("\n" + i); t.b("</svg>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["line-by-line-file-diff"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div id=\""); t.b(t.v(t.f("fileHtmlId", c, p, 0))); t.b("\" class=\"d2h-file-wrapper\" data-lang=\""); t.b(t.v(t.d("file.language", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("    <div class=\"d2h-file-header\">"); t.b("\n" + i); t.b("    "); t.b(t.t(t.f("filePath", c, p, 0))); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("    <div class=\"d2h-file-diff\">"); t.b("\n" + i); t.b("        <div class=\"d2h-code-wrapper\">"); t.b("\n" + i); t.b("            <table class=\"d2h-diff-table\">"); t.b("\n" + i); t.b("                <tbody class=\"d2h-diff-tbody\">"); t.b("\n" + i); t.b("                "); t.b(t.t(t.f("diffs", c, p, 0))); t.b("\n" + i); t.b("                </tbody>"); t.b("\n" + i); t.b("            </table>"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["line-by-line-numbers"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div class=\"line-num1\">"); t.b(t.v(t.f("oldNumber", c, p, 0))); t.b("</div>"); t.b("\n" + i); t.b("<div class=\"line-num2\">"); t.b(t.v(t.f("newNumber", c, p, 0))); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["side-by-side-file-diff"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<div id=\""); t.b(t.v(t.f("fileHtmlId", c, p, 0))); t.b("\" class=\"d2h-file-wrapper\" data-lang=\""); t.b(t.v(t.d("file.language", c, p, 0))); t.b("\">"); t.b("\n" + i); t.b("    <div class=\"d2h-file-header\">"); t.b("\n" + i); t.b("      "); t.b(t.t(t.f("filePath", c, p, 0))); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("    <div class=\"d2h-files-diff\">"); t.b("\n" + i); t.b("        <div class=\"d2h-file-side-diff\">"); t.b("\n" + i); t.b("            <div class=\"d2h-code-wrapper\">"); t.b("\n" + i); t.b("                <table class=\"d2h-diff-table\">"); t.b("\n" + i); t.b("                    <tbody class=\"d2h-diff-tbody\">"); t.b("\n" + i); t.b("                    "); t.b(t.t(t.d("diffs.left", c, p, 0))); t.b("\n" + i); t.b("                    </tbody>"); t.b("\n" + i); t.b("                </table>"); t.b("\n" + i); t.b("            </div>"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("        <div class=\"d2h-file-side-diff\">"); t.b("\n" + i); t.b("            <div class=\"d2h-code-wrapper\">"); t.b("\n" + i); t.b("                <table class=\"d2h-diff-table\">"); t.b("\n" + i); t.b("                    <tbody class=\"d2h-diff-tbody\">"); t.b("\n" + i); t.b("                    "); t.b(t.t(t.d("diffs.right", c, p, 0))); t.b("\n" + i); t.b("                    </tbody>"); t.b("\n" + i); t.b("                </table>"); t.b("\n" + i); t.b("            </div>"); t.b("\n" + i); t.b("        </div>"); t.b("\n" + i); t.b("    </div>"); t.b("\n" + i); t.b("</div>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-added"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-added d2h-added-tag\">ADDED</span>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-changed"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-changed d2h-changed-tag\">CHANGED</span>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-deleted"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-deleted d2h-deleted-tag\">DELETED</span>"); return t.fl(); }, partials: {}, subs: {} });
defaultTemplates["tag-file-renamed"] = new hoganExports.Template({ code: function (c, p, i) { var t = this; t.b(i = i || ""); t.b("<span class=\"d2h-tag d2h-moved d2h-moved-tag\">RENAMED</span>"); return t.fl(); }, partials: {}, subs: {} });

class HoganJsUtils {
    constructor({ compiledTemplates = {}, rawTemplates = {} }) {
        const compiledRawTemplates = Object.entries(rawTemplates).reduce((previousTemplates, [name, templateString]) => {
            const compiledTemplate = hoganExports.compile(templateString, { asString: false });
            return Object.assign(Object.assign({}, previousTemplates), { [name]: compiledTemplate });
        }, {});
        this.preCompiledTemplates = Object.assign(Object.assign(Object.assign({}, defaultTemplates), compiledTemplates), compiledRawTemplates);
    }
    static compile(templateString) {
        return hoganExports.compile(templateString, { asString: false });
    }
    render(namespace, view, params, partials, indent) {
        const templateKey = this.templateKey(namespace, view);
        try {
            const template = this.preCompiledTemplates[templateKey];
            return template.render(params, partials, indent);
        }
        catch (_e) {
            throw new Error(`Could not find template to render '${templateKey}'`);
        }
    }
    template(namespace, view) {
        return this.preCompiledTemplates[this.templateKey(namespace, view)];
    }
    templateKey(namespace, view) {
        return `${namespace}-${view}`;
    }
}

const defaultDiff2HtmlConfig = Object.assign(Object.assign(Object.assign({}, defaultLineByLineRendererConfig), defaultSideBySideRendererConfig), { outputFormat: OutputFormatType.LINE_BY_LINE, drawFileList: true });
function html(diffInput, configuration = {}) {
    const config = Object.assign(Object.assign({}, defaultDiff2HtmlConfig), configuration);
    const diffJson = typeof diffInput === 'string' ? parse(diffInput, config) : diffInput;
    const hoganUtils = new HoganJsUtils(config);
    const { colorScheme } = config;
    const fileListRendererConfig = { colorScheme };
    const fileList = config.drawFileList ? new FileListRenderer(hoganUtils, fileListRendererConfig).render(diffJson) : '';
    const diffOutput = config.outputFormat === 'side-by-side'
        ? new SideBySideRenderer(hoganUtils, config).render(diffJson)
        : new LineByLineRenderer(hoganUtils, config).render(diffJson);
    return fileList + diffOutput;
}

class DiffError extends Data.TaggedError("DiffError") {
}
const useDiffError = (_try) => Effect.try({
  try: _try,
  catch: (error) => new DiffError({ cause: error })
});
const createTwoFilesPatch = Effect.fn(
  (fn) => useDiffError(() => fn(createTwoFilesPatch$1))
);
const diffHTML = Effect.fn(
  (diff, options) => useDiffError(
    () => html(diff, {
      diffStyle: "word",
      matching: "lines",
      drawFileList: false,
      outputFormat: "side-by-side",
      ...options
    })
  )
);

class DiffTrackingError extends Data.TaggedError("DiffTrackingError") {
}
const SDKDiffTrackingModule = Effect.gen(function* () {
  const [{ withCodec, withEncoder }, { fixDiff }] = yield* Effect.all([DBClientLive, SDKParsers]);
  const _selectDiffByPageId = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSDiffTracking.Select),
    callbackFn: (db, pageId) => db(
      (client) => client.selectFrom("StudioCMSDiffTracking").selectAll().where("pageId", "=", pageId).orderBy("timestamp", "desc").execute()
    )
  });
  const _selectDiffByUserId = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSDiffTracking.Select),
    callbackFn: (db, userId) => db(
      (client) => client.selectFrom("StudioCMSDiffTracking").selectAll().where("userId", "=", userId).orderBy("timestamp", "asc").execute()
    )
  });
  const _selectDiffById = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSDiffTracking.Select),
    callbackFn: (db, diffId) => db(
      (client) => client.selectFrom("StudioCMSDiffTracking").selectAll().where("id", "=", diffId).executeTakeFirst()
    )
  });
  const _deleteDiffById = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, diffId) => db((client) => client.deleteFrom("StudioCMSDiffTracking").where("id", "=", diffId).execute())
  });
  const _insertNewDiff = withCodec({
    encoder: StudioCMSDiffTracking.Insert,
    decoder: StudioCMSDiffTracking.Select,
    callbackFn: (db, diff) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSDiffTracking").values(diff).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSDiffTracking").selectAll().where("id", "=", diff.id).executeTakeFirstOrThrow();
      })
    )
  });
  const clearPageDiffs = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, pageId) => db(
      (client) => client.deleteFrom("StudioCMSDiffTracking").where("pageId", "=", pageId).execute()
    )
  });
  const _setPageData = withEncoder({
    encoder: StudioCMSPageData.Update,
    callbackFn: (db, data) => db(
      (client) => client.updateTable("StudioCMSPageData").set(data).where("id", "=", data.id).execute()
    )
  });
  const _setPageContent = withEncoder({
    encoder: Schema$1.Struct({
      contentId: Schema$1.String,
      content: Schema$1.String
    }),
    callbackFn: (db, data) => db(
      (client) => client.updateTable("StudioCMSPageContent").set({ content: data.content }).where("contentId", "=", data.contentId).execute()
    )
  });
  const _checkDiffsLengthAndRemoveOldestIfTooLong = Effect.fn(function* (pageId, maxDiffs) {
    const diffs = yield* _selectDiffByPageId(pageId);
    if (diffs.length > maxDiffs) {
      const diffsToDelete = diffs.length - maxDiffs;
      for (let i = 0; i < diffsToDelete; i++) {
        const oldestDiff = diffs[i];
        yield* _deleteDiffById(oldestDiff.id);
      }
    }
  });
  const _insert = Effect.fn(
    (userId, pageId, data, diffLength) => createTwoFilesPatch(
      (patch) => patch("Content", "Content", data.content.start, data.content.end)
    ).pipe(
      Effect.tap(() => _checkDiffsLengthAndRemoveOldestIfTooLong(pageId, diffLength)),
      Effect.flatMap(
        (diff) => _insertNewDiff({
          id: crypto.randomUUID(),
          pageId,
          userId,
          diff,
          pageContentStart: data.content.start,
          pageMetaData: JSON.stringify(data.metaData),
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      ),
      Effect.flatMap((insertedDiff) => fixDiff(insertedDiff))
    )
  );
  const _getByPageIdAll = Effect.fn(
    (pageId) => _selectDiffByPageId(pageId).pipe(Effect.flatMap((diffs) => fixDiff(diffs)))
  );
  const _getByPageIdLatest = Effect.fn(
    (pageId, count) => _getByPageIdAll(pageId).pipe(Effect.map((diffs) => diffs.slice(0, count)))
  );
  const _getByUserIdAll = Effect.fn(
    (userId) => _selectDiffByUserId(userId).pipe(Effect.flatMap((diffs) => fixDiff(diffs)))
  );
  const _getByUserIdLatest = Effect.fn(
    (userId, count) => _getByUserIdAll(userId).pipe(Effect.map((diffs) => diffs.slice(0, count)))
  );
  const _getSingleDiffById = Effect.fn(
    (diffId) => _selectDiffById(diffId).pipe(
      Effect.flatMap(
        (diffOrNull) => diffOrNull ? fixDiff(diffOrNull) : Effect.succeed(void 0)
      )
    )
  );
  const _revertToDiff = Effect.fn(function* (id, type) {
    const diffEntry = yield* _selectDiffById(id);
    if (!diffEntry) {
      return yield* new DiffTrackingError({ message: "Diff entry not found" });
    }
    const shouldRevertData = type === "data" || type === "both";
    const shouldRevertContent = type === "content" || type === "both";
    if (shouldRevertData) {
      const pageData = diffEntry.pageMetaData;
      if (!pageData.end.id || !pageData.start.id) {
        return yield* new DiffTrackingError({ message: "Invalid page metadata for revert" });
      }
      yield* Schema$1.encode(StudioCMSPageData.Select)(pageData.start).pipe(
        Effect.flatMap(Schema$1.decode(StudioCMSPageData.Update)),
        Effect.flatMap(_setPageData)
      );
    }
    if (shouldRevertContent) {
      yield* _setPageContent({
        content: diffEntry.pageContentStart,
        contentId: diffEntry.pageId
      });
    }
    const allDiffs = yield* _selectDiffByPageId(diffEntry.pageId);
    const diffIndex = allDiffs.findIndex((d) => d.id === id);
    for (let i = diffIndex + 1; i < allDiffs.length; i++) {
      const diffToDelete = allDiffs[i];
      yield* _deleteDiffById(diffToDelete.id);
    }
    return yield* fixDiff(diffEntry);
  });
  const _getMetaDataDifferences = Effect.fn(function* (obj1, obj2) {
    const differences = [];
    const Labels = {
      package: "Page Type",
      title: "Page Title",
      description: "Page Description",
      showOnNav: "Show in Navigation",
      slug: "Page Slug",
      contentLang: "Content Language",
      heroImage: "Hero/OG Image",
      categories: "Page Categories",
      tags: "Page Tags",
      showAuthor: "Show Author",
      showContributors: "Show Contributors",
      parentFolder: "Parent Folder",
      draft: "Draft"
    };
    const processLabel = (label) => Effect.sync(() => Labels[label] ? Labels[label] : label);
    for (const label in obj1) {
      const blackListedLabels = [
        "publishedAt",
        "updatedAt",
        "authorId",
        "contributorIds"
      ];
      if (blackListedLabels.includes(label)) continue;
      if (Object.hasOwn(obj1, label) && Object.hasOwn(obj2, label)) {
        if (obj1[label] !== obj2[label]) {
          if (Array.isArray(obj1[label]) && Array.isArray(obj2[label])) {
            const arr1 = obj1[label];
            const arr2 = obj2[label];
            if (arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]))
              continue;
          }
          differences.push({
            label: yield* processLabel(label),
            previous: obj1[label],
            current: obj2[label]
          });
        }
      }
    }
    return differences;
  });
  return {
    /**
     * Inserts a new diff tracking record into the database.
     *
     * @param userId - The ID of the user making the change.
     * @param pageId - The ID of the page being changed.
     * @param data - An object containing the start and end content and metadata.
     * @param diffLength - The maximum number of diffs to retain for the page.
     * @returns The inserted diff tracking record with parsed metadata.
     */
    insert: _insert,
    /**
     * Clears all diff tracking records for a given page ID.
     *
     * @param pageId - The ID of the page to clear diff tracking records for.
     * @returns The number of rows affected by the delete operation.
     */
    clear: clearPageDiffs,
    /**
     * Utility functions for retrieving diff tracking records.
     */
    get: {
      /**
       * Retrieves all diff tracking records for a given page ID.
       */
      byPageId: {
        /**
         * Retrieves all diff tracking records for a given page ID.
         */
        all: _getByPageIdAll,
        /**
         * Retrieves the latest `count` diff tracking records for a given page ID.
         */
        latest: _getByPageIdLatest
      },
      /**
       * Retrieves all diff tracking records for a given user ID.
       */
      byUserId: {
        /**
         * Retrieves all diff tracking records for a given user ID.
         */
        all: _getByUserIdAll,
        /**
         * Retrieves the latest `count` diff tracking records for a given user ID.
         */
        latest: _getByUserIdLatest
      },
      /**
       * Retrieves a single diff tracking record by its ID.
       */
      single: _getSingleDiffById
    },
    /**
     * Reverts the page data and/or content to the state represented by the specified diff ID.
     *
     * @param id - The ID of the diff tracking record to revert to.
     * @param type - The type of revert operation: 'content', 'data', or 'both'.
     * @returns The reverted diff tracking record with parsed metadata.
     */
    revertToDiff: _revertToDiff,
    /**
     * Utility functions for diff tracking.
     */
    utils: {
      /**
       * Compares two metadata objects and returns the differences.
       *
       * @param obj1 - The first metadata object to compare.
       * @param obj2 - The second metadata object to compare.
       * @returns An array of differences, each containing the label, previous value, and current value.
       */
      getMetaDataDifferences: _getMetaDataDifferences,
      /**
       * Generates the HTML representation of a unified diff string.
       *
       * @param diff - The unified diff string to convert to HTML.
       * @returns The HTML representation of the diff.
       */
      getDiffHTML: diffHTML
    }
  };
});
var diffTracking_default = SDKDiffTrackingModule;

const SDKInitModule = Effect.gen(function* () {
  const [
    {
      siteConfig: { init: initSiteConfig }
    },
    {
      user: {
        ghost: { get: initGhostUser }
      }
    }
  ] = yield* Effect.all([config_default, auth_default]);
  const INIT = {
    /**
     * Initializes the StudioCMS SiteConfig table with the provided configuration.
     *
     * @param config - The configuration to insert into the SiteConfig table.
     * @returns A promise that resolves to the inserted site configuration.
     */
    siteConfig: initSiteConfig,
    /**
     * Initializes the StudioCMS Ghost User.
     *
     * The ghost user is a default user that is used to perform actions on behalf of the system as well as to replace deleted users.
     *
     * @returns A promise that resolves to the ghost user record.
     */
    ghostUser: initGhostUser
  };
  return INIT;
});
var init_default = SDKInitModule;

const cacheKey = cacheKeyGetters.plugins;
const cacheOpts = { tags: cacheTags.plugins };
const SDKPluginsModule = Effect.gen(function* () {
  const [{ withCodec }, { memoize, invalidateTags, set }] = yield* Effect.all([
    DBClientLive,
    cache_default
  ]);
  const _dbBatchRequest = withCodec({
    encoder: Schema$1.Struct({
      batchSize: Schema$1.Number,
      offset: Schema$1.Number
    }),
    decoder: Schema$1.Array(StudioCMSPluginData.Select),
    callbackFn: (db, { batchSize, offset }) => db(
      (client) => client.selectFrom("StudioCMSPluginData").selectAll().limit(batchSize).offset(offset).execute()
    )
  });
  const _dbGetEntriesPluginData = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSPluginData.Select),
    callbackFn: (db, pluginId) => db(
      (client) => client.selectFrom("StudioCMSPluginData").selectAll().where("id", "like", `${pluginId}-%`).execute()
    )
  });
  const _dbSelectPluginDataEntry = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPluginData.Select),
    callbackFn: (db, entryId) => db(
      (client) => client.selectFrom("StudioCMSPluginData").selectAll().where("id", "=", entryId).executeTakeFirst()
    )
  });
  const _dbInsertPluginDataEntry = withCodec({
    encoder: StudioCMSPluginData.Insert,
    decoder: StudioCMSPluginData.Select,
    callbackFn: (db, entry) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPluginData").values(entry).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPluginData").selectAll().where("id", "=", entry.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _dbUpdatePluginDataEntry = withCodec({
    encoder: StudioCMSPluginData.Update,
    decoder: StudioCMSPluginData.Select,
    callbackFn: (db, entry) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.updateTable("StudioCMSPluginData").set(entry).where("id", "=", entry.id).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPluginData").selectAll().where("id", "=", entry.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _initPluginDataCache = Effect.fn(
    (BATCH_SIZE) => Effect.gen(function* () {
      let batchSize = BATCH_SIZE || 100;
      if (batchSize <= 0) {
        batchSize = 100;
      }
      let offset = 0;
      const sharedTimestamp = /* @__PURE__ */ new Date();
      while (true) {
        const entries = yield* _dbBatchRequest({ batchSize, offset });
        if (entries.length === 0) break;
        const cacheEntries = entries.map(
          (entry) => [entry.id, { data: entry, lastCacheUpdate: sharedTimestamp }]
        );
        for (const [id, cacheData] of cacheEntries) {
          yield* set(cacheKey(id), cacheData, cacheOpts);
        }
        offset += batchSize;
      }
    })
  );
  const _clearPluginDataCache = Effect.fn(() => invalidateTags(cacheTags.plugins));
  const _selectPluginDataEntry = Effect.fn(
    (id) => memoize(cacheKey(id), _dbSelectPluginDataEntry(id), cacheOpts)
  );
  const _insertPluginDataEntry = Effect.fn(
    (data) => memoize(cacheKey(data.id), _dbInsertPluginDataEntry(data), cacheOpts)
  );
  const _updatePluginDataEntry = Effect.fn(
    (data) => memoize(cacheKey(data.id), _dbUpdatePluginDataEntry(data), cacheOpts)
  );
  const _processEntryFromDB = Effect.fn(
    (entry, validator) => parseData(entry.data, validator).pipe(
      Effect.flatMap((validated) => parsedDataResponse(entry.id, validated))
    )
  );
  const _processPluginDataDBEntries = (validator) => Effect.fn(
    (entries) => Effect.all(entries.map((entry) => _processEntryFromDB(entry, validator)))
  );
  const _filterProcessedEntries = (filter) => (entries) => filter ? filter(entries) : entries;
  const _getEntries = Effect.fn(
    (pluginId, validator, filter) => _dbGetEntriesPluginData(pluginId).pipe(
      Effect.flatMap(_processPluginDataDBEntries(validator)),
      Effect.map(_filterProcessedEntries(filter))
    )
  );
  const _selectPluginDataEntryRespondOrFail = Effect.fn(function* (id, mode) {
    const existing = yield* _selectPluginDataEntry(id);
    switch (mode) {
      case SelectPluginDataRespondOrFail.ExistsNoFail: {
        if (existing) return existing;
        return void 0;
      }
      case SelectPluginDataRespondOrFail.ExistsShouldFail: {
        if (existing)
          return yield* new StudioCMSSDKError({
            message: `Plugin data with ID ${id} already exists.`
          });
        return void 0;
      }
      case SelectPluginDataRespondOrFail.NotExistsShouldFail: {
        if (!existing)
          return yield* new StudioCMSSDKError({
            message: `Plugin data with ID ${id} does not exist.`
          });
        return void 0;
      }
      default:
        return yield* new StudioCMSSDKError({ message: `Invalid mode: ${mode}` });
    }
  });
  const _select = Effect.fn(function* (generatedEntryId, validator) {
    const existing = yield* _selectPluginDataEntryRespondOrFail(
      generatedEntryId,
      SelectPluginDataRespondOrFail.ExistsNoFail
    );
    if (!existing) return void 0;
    const data = yield* parseData(existing.data, validator);
    return yield* parsedDataResponse(generatedEntryId, data);
  });
  const _insert = Effect.fn(function* (generatedEntryId, data, validator) {
    yield* _selectPluginDataEntryRespondOrFail(
      generatedEntryId,
      SelectPluginDataRespondOrFail.ExistsShouldFail
    );
    const parsedData = yield* parseData(data, validator);
    const inserted = yield* _insertPluginDataEntry({
      id: generatedEntryId,
      data: JSON.stringify(parsedData)
    });
    return yield* parsedDataResponse(inserted.id, parsedData);
  });
  const _update = Effect.fn(function* (generatedEntryId, data, validator) {
    yield* _selectPluginDataEntryRespondOrFail(
      generatedEntryId,
      SelectPluginDataRespondOrFail.NotExistsShouldFail
    );
    const parsedData = yield* parseData(data, validator);
    const updated = yield* _updatePluginDataEntry({
      id: generatedEntryId,
      data: JSON.stringify(parsedData)
    });
    return yield* parsedDataResponse(updated.id, parsedData);
  });
  const buildReturn = (pluginId, entryId, validator) => {
    const generatedEntryId = `${pluginId}-${entryId}`;
    return {
      /**
       * Generates a unique ID for the plugin data entry.
       *
       * @returns An Effect that yields the generated ID. In the format `${pluginId}-${entryId}`
       */
      generatedId: () => Effect.succeed(generatedEntryId),
      /**
       * Selects a plugin data entry by its ID, validating the data if a validator is provided.
       *
       * @returns An Effect that yields the selected plugin data entry or `undefined` if not found.
       */
      select: () => _select(generatedEntryId, validator),
      /**
       * Inserts new plugin data into the database after validating the input.
       *
       * @param data - The plugin data to insert.
       * @yields Throws an error if validation fails or if the entry already exists.
       * @returns The parsed data response for the inserted entry.
       */
      insert: (data) => _insert(generatedEntryId, data, validator),
      /**
       * Updates existing plugin data in the database after validating the input.
       *
       * @param data - The updated plugin data.
       * @yields Throws an error if validation fails.
       * @returns The parsed data response for the updated entry.
       */
      update: (data) => _update(generatedEntryId, data, validator)
    };
  };
  function usePluginData(pluginId, { entryId, validator } = {}) {
    if (!entryId) {
      return {
        /**
         * Retrieves all plugin data entries for the specified plugin ID.
         *
         * @template T - The type of the plugin data object.
         * @param validator - Optional validator options for validating the plugin data.
         * @returns An Effect that yields an array of `PluginDataEntry<T>` objects.
         */
        getEntries: (filter) => _getEntries(pluginId, validator, filter),
        getEntry: (id) => buildReturn(pluginId, id, validator)
      };
    }
    return buildReturn(pluginId, entryId, validator);
  }
  class InferType {
    _Schema;
    $UsePluginData;
    $Insert;
    constructor(schema) {
      if (!schema || !Schema$1.isSchema(schema)) {
        throw new Error("InferType requires a valid Schema.Struct instance.");
      }
      this._Schema = schema;
    }
  }
  return {
    /**
     * Provides a set of effectful operations for managing plugin data entries by plugin ID and optional entry ID.
     *
     * When an `entryId` is provided, returns an object with methods to:
     * - Generate a unique plugin data entry ID.
     * - Insert new plugin data after validation and duplicate checks.
     * - Select and validate existing plugin data by ID.
     * - Update existing plugin data after validation.
     *
     * When no `entryId` is provided, returns an object with a method to retrieve all entries for the given plugin.
     *
     * @param pluginId - The unique identifier for the plugin.
     * @param entryId - (Optional) The unique identifier for the plugin data entry.
     * @returns An object with effectful methods for plugin data management, varying by presence of `entryId`.
     */
    usePluginData,
    /**
     * Initializes the plugin data cache by fetching all existing entries from the database
     * and populating the in-memory cache with these entries.
     */
    initPluginDataCache: _initPluginDataCache,
    /**
     * Clears the plugin data cache, removing all cached entries.
     *
     * @returns An Effect that resolves to `void` on success or an `Error` on failure.
     */
    clearPluginDataCache: _clearPluginDataCache,
    /**
     * Utility class to infer types from a given Schema.
     *
     * @typeParam S - The schema type extending `Schema.Struct<any>`.
     *
     * @property _Schema - The schema instance used for type inference.
     * @property usePluginData - The inferred type from the schema, used for plugin data.
     * @property Insert - A recursively simplified, mutable version of the schema's type.
     *
     */
    InferType
  };
});
var plugins_default = SDKPluginsModule;

const SDKMiddlewareModule = Effect.gen(function* () {
  const [
    {
      pages: updatePages,
      folderTree: updateFolderTree,
      pageFolderTree: updatePageFolderTree,
      folderList: updateFolderList,
      siteConfig: updateSiteConfig
    },
    { initPluginDataCache },
    { memoize }
  ] = yield* Effect.all([get_default, plugins_default, cache_default]);
  const _verifyCacheEffect = Effect.log("Verifying middleware caches...").pipe(
    Effect.map(() => Date.now()),
    Effect.flatMap(
      (startTime) => Effect.all({
        pages: updatePages(true),
        folderTree: updateFolderTree(),
        pageFolderTree: updatePageFolderTree(),
        folderList: updateFolderList(),
        siteConfig: updateSiteConfig(),
        pluginData: initPluginDataCache(),
        startTime: Effect.succeed(startTime)
      })
    ),
    Effect.flatMap(({ startTime }) => Effect.succeed({ startTime, endTime: Date.now() })),
    Effect.flatMap(
      ({ startTime, endTime }) => Effect.log(`Middleware caches verified in ${endTime - startTime}ms.`)
    )
  );
  const verifyCache = Effect.fn(
    () => memoize(cacheKeyGetters.middleware(), _verifyCacheEffect, {
      tags: cacheTags.middleware,
      ttl: Duration.minutes(30)
    }).pipe(Effect.tap(() => Effect.logDebug("Completed middleware cache verification.")))
  );
  return {
    verifyCache
  };
});
var middleware_default = SDKMiddlewareModule;

const SDKNotificationSettingsModule = Effect.gen(function* () {
  const [{ notificationConfig }, { NotificationSettingsDefaults }] = yield* Effect.all([
    SDKConfigModule,
    SDKDefaults
  ]);
  const _getNotificationConfig = Effect.fn(
    () => notificationConfig.get().pipe(
      Effect.flatMap(
        (data) => data ? Effect.succeed(data) : notificationConfig.init(NotificationSettingsDefaults)
      )
    )
  );
  const _updateNotificationConfig = Effect.fn(
    (settings) => notificationConfig.update(settings)
  );
  return {
    /**
     * Site-specific notification settings.
     */
    site: {
      /**
       * Retrieves the site-wide notification settings.
       */
      get: _getNotificationConfig,
      /**
       * Updates the site-wide notification settings.
       */
      update: _updateNotificationConfig
    }
  };
});
var notificationSettings_default = SDKNotificationSettingsModule;

/// <reference types="./object-utils.d.ts" />
function isUndefined(obj) {
    return typeof obj === 'undefined' || obj === undefined;
}
function isString(obj) {
    return typeof obj === 'string';
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
function isNull(obj) {
    return obj === null;
}
function isDate(obj) {
    return obj instanceof Date;
}
function isBigInt(obj) {
    return typeof obj === 'bigint';
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
function freeze(obj) {
    return Object.freeze(obj);
}
function asArray(arg) {
    if (isReadonlyArray(arg)) {
        return arg;
    }
    else {
        return [arg];
    }
}
function isReadonlyArray(arg) {
    return Array.isArray(arg);
}
function noop(obj) {
    return obj;
}

/// <reference types="./alter-table-node.d.ts" />
/**
 * @internal
 */
const AlterTableNode = freeze({
    is(node) {
        return node.kind === 'AlterTableNode';
    },
    create(table) {
        return freeze({
            kind: 'AlterTableNode',
            table,
        });
    },
    cloneWithTableProps(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithColumnAlteration(node, columnAlteration) {
        return freeze({
            ...node,
            columnAlterations: node.columnAlterations
                ? [...node.columnAlterations, columnAlteration]
                : [columnAlteration],
        });
    },
});

/// <reference types="./identifier-node.d.ts" />
/**
 * @internal
 */
const IdentifierNode = freeze({
    is(node) {
        return node.kind === 'IdentifierNode';
    },
    create(name) {
        return freeze({
            kind: 'IdentifierNode',
            name,
        });
    },
});

/// <reference types="./create-index-node.d.ts" />
/**
 * @internal
 */
const CreateIndexNode = freeze({
    is(node) {
        return node.kind === 'CreateIndexNode';
    },
    create(name) {
        return freeze({
            kind: 'CreateIndexNode',
            name: IdentifierNode.create(name),
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithColumns(node, columns) {
        return freeze({
            ...node,
            columns: [...(node.columns || []), ...columns],
        });
    },
});

/// <reference types="./create-schema-node.d.ts" />
/**
 * @internal
 */
const CreateSchemaNode = freeze({
    is(node) {
        return node.kind === 'CreateSchemaNode';
    },
    create(schema, params) {
        return freeze({
            kind: 'CreateSchemaNode',
            schema: IdentifierNode.create(schema),
            ...params,
        });
    },
    cloneWith(createSchema, params) {
        return freeze({
            ...createSchema,
            ...params,
        });
    },
});

/// <reference types="./create-table-node.d.ts" />
const ON_COMMIT_ACTIONS = ['preserve rows', 'delete rows', 'drop'];
/**
 * @internal
 */
const CreateTableNode = freeze({
    is(node) {
        return node.kind === 'CreateTableNode';
    },
    create(table) {
        return freeze({
            kind: 'CreateTableNode',
            table,
            columns: freeze([]),
        });
    },
    cloneWithColumn(createTable, column) {
        return freeze({
            ...createTable,
            columns: freeze([...createTable.columns, column]),
        });
    },
    cloneWithConstraint(createTable, constraint) {
        return freeze({
            ...createTable,
            constraints: createTable.constraints
                ? freeze([...createTable.constraints, constraint])
                : freeze([constraint]),
        });
    },
    cloneWithFrontModifier(createTable, modifier) {
        return freeze({
            ...createTable,
            frontModifiers: createTable.frontModifiers
                ? freeze([...createTable.frontModifiers, modifier])
                : freeze([modifier]),
        });
    },
    cloneWithEndModifier(createTable, modifier) {
        return freeze({
            ...createTable,
            endModifiers: createTable.endModifiers
                ? freeze([...createTable.endModifiers, modifier])
                : freeze([modifier]),
        });
    },
    cloneWith(createTable, params) {
        return freeze({
            ...createTable,
            ...params,
        });
    },
});

/// <reference types="./schemable-identifier-node.d.ts" />
/**
 * @internal
 */
const SchemableIdentifierNode = freeze({
    is(node) {
        return node.kind === 'SchemableIdentifierNode';
    },
    create(identifier) {
        return freeze({
            kind: 'SchemableIdentifierNode',
            identifier: IdentifierNode.create(identifier),
        });
    },
    createWithSchema(schema, identifier) {
        return freeze({
            kind: 'SchemableIdentifierNode',
            schema: IdentifierNode.create(schema),
            identifier: IdentifierNode.create(identifier),
        });
    },
});

/// <reference types="./drop-index-node.d.ts" />
/**
 * @internal
 */
const DropIndexNode = freeze({
    is(node) {
        return node.kind === 'DropIndexNode';
    },
    create(name, params) {
        return freeze({
            kind: 'DropIndexNode',
            name: SchemableIdentifierNode.create(name),
            ...params,
        });
    },
    cloneWith(dropIndex, props) {
        return freeze({
            ...dropIndex,
            ...props,
        });
    },
});

/// <reference types="./drop-schema-node.d.ts" />
/**
 * @internal
 */
const DropSchemaNode = freeze({
    is(node) {
        return node.kind === 'DropSchemaNode';
    },
    create(schema, params) {
        return freeze({
            kind: 'DropSchemaNode',
            schema: IdentifierNode.create(schema),
            ...params,
        });
    },
    cloneWith(dropSchema, params) {
        return freeze({
            ...dropSchema,
            ...params,
        });
    },
});

/// <reference types="./drop-table-node.d.ts" />
/**
 * @internal
 */
const DropTableNode = freeze({
    is(node) {
        return node.kind === 'DropTableNode';
    },
    create(table, params) {
        return freeze({
            kind: 'DropTableNode',
            table,
            ...params,
        });
    },
    cloneWith(dropIndex, params) {
        return freeze({
            ...dropIndex,
            ...params,
        });
    },
});

/// <reference types="./alias-node.d.ts" />
/**
 * @internal
 */
const AliasNode = freeze({
    is(node) {
        return node.kind === 'AliasNode';
    },
    create(node, alias) {
        return freeze({
            kind: 'AliasNode',
            node,
            alias,
        });
    },
});

/// <reference types="./table-node.d.ts" />
/**
 * @internal
 */
const TableNode = freeze({
    is(node) {
        return node.kind === 'TableNode';
    },
    create(table) {
        return freeze({
            kind: 'TableNode',
            table: SchemableIdentifierNode.create(table),
        });
    },
    createWithSchema(schema, table) {
        return freeze({
            kind: 'TableNode',
            table: SchemableIdentifierNode.createWithSchema(schema, table),
        });
    },
});

/// <reference types="./operation-node-source.d.ts" />
function isOperationNodeSource(obj) {
    return isObject(obj) && isFunction(obj.toOperationNode);
}

/// <reference types="./expression.d.ts" />
function isExpression(obj) {
    return isObject(obj) && 'expressionType' in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
    return (isObject(obj) &&
        'expression' in obj &&
        isString(obj.alias) &&
        isOperationNodeSource(obj));
}

/// <reference types="./select-modifier-node.d.ts" />
/**
 * @internal
 */
const SelectModifierNode = freeze({
    is(node) {
        return node.kind === 'SelectModifierNode';
    },
    create(modifier, of) {
        return freeze({
            kind: 'SelectModifierNode',
            modifier,
            of,
        });
    },
    createWithExpression(modifier) {
        return freeze({
            kind: 'SelectModifierNode',
            rawModifier: modifier,
        });
    },
});

/// <reference types="./and-node.d.ts" />
/**
 * @internal
 */
const AndNode = freeze({
    is(node) {
        return node.kind === 'AndNode';
    },
    create(left, right) {
        return freeze({
            kind: 'AndNode',
            left,
            right,
        });
    },
});

/// <reference types="./or-node.d.ts" />
/**
 * @internal
 */
const OrNode = freeze({
    is(node) {
        return node.kind === 'OrNode';
    },
    create(left, right) {
        return freeze({
            kind: 'OrNode',
            left,
            right,
        });
    },
});

/// <reference types="./on-node.d.ts" />
/**
 * @internal
 */
const OnNode = freeze({
    is(node) {
        return node.kind === 'OnNode';
    },
    create(filter) {
        return freeze({
            kind: 'OnNode',
            on: filter,
        });
    },
    cloneWithOperation(onNode, operator, operation) {
        return freeze({
            ...onNode,
            on: operator === 'And'
                ? AndNode.create(onNode.on, operation)
                : OrNode.create(onNode.on, operation),
        });
    },
});

/// <reference types="./join-node.d.ts" />
/**
 * @internal
 */
const JoinNode = freeze({
    is(node) {
        return node.kind === 'JoinNode';
    },
    create(joinType, table) {
        return freeze({
            kind: 'JoinNode',
            joinType,
            table,
            on: undefined,
        });
    },
    createWithOn(joinType, table, on) {
        return freeze({
            kind: 'JoinNode',
            joinType,
            table,
            on: OnNode.create(on),
        });
    },
    cloneWithOn(joinNode, operation) {
        return freeze({
            ...joinNode,
            on: joinNode.on
                ? OnNode.cloneWithOperation(joinNode.on, 'And', operation)
                : OnNode.create(operation),
        });
    },
});

/// <reference types="./binary-operation-node.d.ts" />
/**
 * @internal
 */
const BinaryOperationNode = freeze({
    is(node) {
        return node.kind === 'BinaryOperationNode';
    },
    create(leftOperand, operator, rightOperand) {
        return freeze({
            kind: 'BinaryOperationNode',
            leftOperand,
            operator,
            rightOperand,
        });
    },
});

/// <reference types="./operator-node.d.ts" />
const COMPARISON_OPERATORS = [
    '=',
    '==',
    '!=',
    '<>',
    '>',
    '>=',
    '<',
    '<=',
    'in',
    'not in',
    'is',
    'is not',
    'like',
    'not like',
    'match',
    'ilike',
    'not ilike',
    '@>',
    '<@',
    '^@',
    '&&',
    '?',
    '?&',
    '?|',
    '!<',
    '!>',
    '<=>',
    '!~',
    '~',
    '~*',
    '!~*',
    '@@',
    '@@@',
    '!!',
    '<->',
    'regexp',
    'is distinct from',
    'is not distinct from',
];
const ARITHMETIC_OPERATORS = [
    '+',
    '-',
    '*',
    '/',
    '%',
    '^',
    '&',
    '|',
    '#',
    '<<',
    '>>',
];
const JSON_OPERATORS = ['->', '->>'];
const BINARY_OPERATORS = [
    ...COMPARISON_OPERATORS,
    ...ARITHMETIC_OPERATORS,
    '&&',
    '||',
];
const UNARY_FILTER_OPERATORS = ['exists', 'not exists'];
const UNARY_OPERATORS = ['not', '-', ...UNARY_FILTER_OPERATORS];
const OPERATORS = [
    ...BINARY_OPERATORS,
    ...JSON_OPERATORS,
    ...UNARY_OPERATORS,
    'between',
    'between symmetric',
];
/**
 * @internal
 */
const OperatorNode = freeze({
    is(node) {
        return node.kind === 'OperatorNode';
    },
    create(operator) {
        return freeze({
            kind: 'OperatorNode',
            operator,
        });
    },
});
function isJSONOperator(op) {
    return isString(op) && JSON_OPERATORS.includes(op);
}

/// <reference types="./column-node.d.ts" />
/**
 * @internal
 */
const ColumnNode = freeze({
    is(node) {
        return node.kind === 'ColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'ColumnNode',
            column: IdentifierNode.create(column),
        });
    },
});

/// <reference types="./select-all-node.d.ts" />
/**
 * @internal
 */
const SelectAllNode = freeze({
    is(node) {
        return node.kind === 'SelectAllNode';
    },
    create() {
        return freeze({
            kind: 'SelectAllNode',
        });
    },
});

/// <reference types="./reference-node.d.ts" />
/**
 * @internal
 */
const ReferenceNode = freeze({
    is(node) {
        return node.kind === 'ReferenceNode';
    },
    create(column, table) {
        return freeze({
            kind: 'ReferenceNode',
            table,
            column,
        });
    },
    createSelectAll(table) {
        return freeze({
            kind: 'ReferenceNode',
            table,
            column: SelectAllNode.create(),
        });
    },
});

/// <reference types="./dynamic-reference-builder.d.ts" />
class DynamicReferenceBuilder {
    #dynamicReference;
    get dynamicReference() {
        return this.#dynamicReference;
    }
    /**
     * @private
     *
     * This needs to be here just so that the typings work. Without this
     * the generated .d.ts file contains no reference to the type param R
     * which causes this type to be equal to DynamicReferenceBuilder with
     * any R.
     */
    get refType() {
        return undefined;
    }
    constructor(reference) {
        this.#dynamicReference = reference;
    }
    toOperationNode() {
        return parseSimpleReferenceExpression(this.#dynamicReference);
    }
}
function isDynamicReferenceBuilder(obj) {
    return (isObject(obj) &&
        isOperationNodeSource(obj) &&
        isString(obj.dynamicReference));
}

/// <reference types="./order-by-item-node.d.ts" />
/**
 * @internal
 */
const OrderByItemNode = freeze({
    is(node) {
        return node.kind === 'OrderByItemNode';
    },
    create(orderBy, direction) {
        return freeze({
            kind: 'OrderByItemNode',
            orderBy,
            direction,
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./raw-node.d.ts" />
/**
 * @internal
 */
const RawNode = freeze({
    is(node) {
        return node.kind === 'RawNode';
    },
    create(sqlFragments, parameters) {
        return freeze({
            kind: 'RawNode',
            sqlFragments: freeze(sqlFragments),
            parameters: freeze(parameters),
        });
    },
    createWithSql(sql) {
        return RawNode.create([sql], []);
    },
    createWithChild(child) {
        return RawNode.create(['', ''], [child]);
    },
    createWithChildren(children) {
        return RawNode.create(new Array(children.length + 1).fill(''), children);
    },
});

/// <reference types="./collate-node.d.ts" />
/**
 * @internal
 */
const CollateNode = freeze({
    is(node) {
        return node.kind === 'CollateNode';
    },
    create(collation) {
        return freeze({
            kind: 'CollateNode',
            collation: IdentifierNode.create(collation),
        });
    },
});

/// <reference types="./order-by-item-builder.d.ts" />
class OrderByItemBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds `desc` to the `order by` item.
     *
     * See {@link asc} for the opposite.
     */
    desc() {
        return new OrderByItemBuilder({
            node: OrderByItemNode.cloneWith(this.#props.node, {
                direction: RawNode.createWithSql('desc'),
            }),
        });
    }
    /**
     * Adds `asc` to the `order by` item.
     *
     * See {@link desc} for the opposite.
     */
    asc() {
        return new OrderByItemBuilder({
            node: OrderByItemNode.cloneWith(this.#props.node, {
                direction: RawNode.createWithSql('asc'),
            }),
        });
    }
    /**
     * Adds `nulls last` to the `order by` item.
     *
     * This is only supported by some dialects like PostgreSQL and SQLite.
     *
     * See {@link nullsFirst} for the opposite.
     */
    nullsLast() {
        return new OrderByItemBuilder({
            node: OrderByItemNode.cloneWith(this.#props.node, { nulls: 'last' }),
        });
    }
    /**
     * Adds `nulls first` to the `order by` item.
     *
     * This is only supported by some dialects like PostgreSQL and SQLite.
     *
     * See {@link nullsLast} for the opposite.
     */
    nullsFirst() {
        return new OrderByItemBuilder({
            node: OrderByItemNode.cloneWith(this.#props.node, { nulls: 'first' }),
        });
    }
    /**
     * Adds `collate <collationName>` to the `order by` item.
     */
    collate(collation) {
        return new OrderByItemBuilder({
            node: OrderByItemNode.cloneWith(this.#props.node, {
                collation: CollateNode.create(collation),
            }),
        });
    }
    toOperationNode() {
        return this.#props.node;
    }
}

/// <reference types="./log-once.d.ts" />
const LOGGED_MESSAGES = new Set();
/**
 * Use for system-level logging, such as deprecation messages.
 * Logs a message and ensures it won't be logged again.
 */
function logOnce(message) {
    if (LOGGED_MESSAGES.has(message)) {
        return;
    }
    LOGGED_MESSAGES.add(message);
    console.log(message);
}

/// <reference types="./order-by-parser.d.ts" />
function isOrderByDirection(thing) {
    return thing === 'asc' || thing === 'desc';
}
function parseOrderBy(args) {
    if (args.length === 2) {
        return [parseOrderByItem(args[0], args[1])];
    }
    if (args.length === 1) {
        const [orderBy] = args;
        if (Array.isArray(orderBy)) {
            logOnce('orderBy(array) is deprecated, use multiple orderBy calls instead.');
            return orderBy.map((item) => parseOrderByItem(item));
        }
        return [parseOrderByItem(orderBy)];
    }
    throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(expr, modifiers) {
    const parsedRef = parseOrderByExpression(expr);
    if (OrderByItemNode.is(parsedRef)) {
        if (modifiers) {
            throw new Error('Cannot specify direction twice!');
        }
        return parsedRef;
    }
    return parseOrderByWithModifiers(parsedRef, modifiers);
}
function parseOrderByExpression(expr) {
    if (isExpressionOrFactory(expr)) {
        return parseExpression(expr);
    }
    if (isDynamicReferenceBuilder(expr)) {
        return expr.toOperationNode();
    }
    const [ref, direction] = expr.split(' ');
    if (direction) {
        logOnce("`orderBy('column asc')` is deprecated. Use `orderBy('column', 'asc')` instead.");
        return parseOrderByWithModifiers(parseStringReference(ref), direction);
    }
    return parseStringReference(expr);
}
function parseOrderByWithModifiers(expr, modifiers) {
    if (typeof modifiers === 'string') {
        if (!isOrderByDirection(modifiers)) {
            throw new Error(`Invalid order by direction: ${modifiers}`);
        }
        return OrderByItemNode.create(expr, RawNode.createWithSql(modifiers));
    }
    if (isExpression(modifiers)) {
        logOnce("`orderBy(..., expr)` is deprecated. Use `orderBy(..., 'asc')` or `orderBy(..., (ob) => ...)` instead.");
        return OrderByItemNode.create(expr, modifiers.toOperationNode());
    }
    const node = OrderByItemNode.create(expr);
    if (!modifiers) {
        return node;
    }
    return modifiers(new OrderByItemBuilder({ node })).toOperationNode();
}

/// <reference types="./json-reference-node.d.ts" />
/**
 * @internal
 */
const JSONReferenceNode = freeze({
    is(node) {
        return node.kind === 'JSONReferenceNode';
    },
    create(reference, traversal) {
        return freeze({
            kind: 'JSONReferenceNode',
            reference,
            traversal,
        });
    },
    cloneWithTraversal(node, traversal) {
        return freeze({
            ...node,
            traversal,
        });
    },
});

/// <reference types="./json-operator-chain-node.d.ts" />
/**
 * @internal
 */
const JSONOperatorChainNode = freeze({
    is(node) {
        return node.kind === 'JSONOperatorChainNode';
    },
    create(operator) {
        return freeze({
            kind: 'JSONOperatorChainNode',
            operator,
            values: freeze([]),
        });
    },
    cloneWithValue(node, value) {
        return freeze({
            ...node,
            values: freeze([...node.values, value]),
        });
    },
});

/// <reference types="./json-path-node.d.ts" />
/**
 * @internal
 */
const JSONPathNode = freeze({
    is(node) {
        return node.kind === 'JSONPathNode';
    },
    create(inOperator) {
        return freeze({
            kind: 'JSONPathNode',
            inOperator,
            pathLegs: freeze([]),
        });
    },
    cloneWithLeg(jsonPathNode, pathLeg) {
        return freeze({
            ...jsonPathNode,
            pathLegs: freeze([...jsonPathNode.pathLegs, pathLeg]),
        });
    },
});

/// <reference types="./reference-parser.d.ts" />
function parseSimpleReferenceExpression(exp) {
    if (isString(exp)) {
        return parseStringReference(exp);
    }
    return exp.toOperationNode();
}
function parseReferenceExpressionOrList(arg) {
    if (isReadonlyArray(arg)) {
        return arg.map((it) => parseReferenceExpression(it));
    }
    else {
        return [parseReferenceExpression(arg)];
    }
}
function parseReferenceExpression(exp) {
    if (isExpressionOrFactory(exp)) {
        return parseExpression(exp);
    }
    return parseSimpleReferenceExpression(exp);
}
function parseJSONReference(ref, op) {
    const referenceNode = parseStringReference(ref);
    if (isJSONOperator(op)) {
        return JSONReferenceNode.create(referenceNode, JSONOperatorChainNode.create(OperatorNode.create(op)));
    }
    const opWithoutLastChar = op.slice(0, -1);
    if (isJSONOperator(opWithoutLastChar)) {
        return JSONReferenceNode.create(referenceNode, JSONPathNode.create(OperatorNode.create(opWithoutLastChar)));
    }
    throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref) {
    const COLUMN_SEPARATOR = '.';
    if (!ref.includes(COLUMN_SEPARATOR)) {
        return ReferenceNode.create(ColumnNode.create(ref));
    }
    const parts = ref.split(COLUMN_SEPARATOR).map(trim$2);
    if (parts.length === 3) {
        return parseStringReferenceWithTableAndSchema(parts);
    }
    if (parts.length === 2) {
        return parseStringReferenceWithTable(parts);
    }
    throw new Error(`invalid column reference ${ref}`);
}
function parseAliasedStringReference(ref) {
    const ALIAS_SEPARATOR = ' as ';
    if (ref.includes(ALIAS_SEPARATOR)) {
        const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim$2);
        return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
    }
    else {
        return parseStringReference(ref);
    }
}
function parseColumnName(column) {
    return ColumnNode.create(column);
}
function parseOrderedColumnName(column) {
    const ORDER_SEPARATOR = ' ';
    if (column.includes(ORDER_SEPARATOR)) {
        const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim$2);
        if (!isOrderByDirection(order)) {
            throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
        }
        return parseOrderBy([columnName, order])[0];
    }
    else {
        return parseColumnName(column);
    }
}
function parseStringReferenceWithTableAndSchema(parts) {
    const [schema, table, column] = parts;
    return ReferenceNode.create(ColumnNode.create(column), TableNode.createWithSchema(schema, table));
}
function parseStringReferenceWithTable(parts) {
    const [table, column] = parts;
    return ReferenceNode.create(ColumnNode.create(column), TableNode.create(table));
}
function trim$2(str) {
    return str.trim();
}

/// <reference types="./primitive-value-list-node.d.ts" />
/**
 * @internal
 */
const PrimitiveValueListNode = freeze({
    is(node) {
        return node.kind === 'PrimitiveValueListNode';
    },
    create(values) {
        return freeze({
            kind: 'PrimitiveValueListNode',
            values: freeze([...values]),
        });
    },
});

/// <reference types="./value-list-node.d.ts" />
/**
 * @internal
 */
const ValueListNode = freeze({
    is(node) {
        return node.kind === 'ValueListNode';
    },
    create(values) {
        return freeze({
            kind: 'ValueListNode',
            values: freeze(values),
        });
    },
});

/// <reference types="./value-node.d.ts" />
/**
 * @internal
 */
const ValueNode = freeze({
    is(node) {
        return node.kind === 'ValueNode';
    },
    create(value) {
        return freeze({
            kind: 'ValueNode',
            value,
        });
    },
    createImmediate(value) {
        return freeze({
            kind: 'ValueNode',
            value,
            immediate: true,
        });
    },
});

/// <reference types="./value-parser.d.ts" />
function parseValueExpressionOrList(arg) {
    if (isReadonlyArray(arg)) {
        return parseValueExpressionList(arg);
    }
    return parseValueExpression(arg);
}
function parseValueExpression(exp) {
    if (isExpressionOrFactory(exp)) {
        return parseExpression(exp);
    }
    return ValueNode.create(exp);
}
function isSafeImmediateValue(value) {
    return isNumber(value) || isBoolean(value) || isNull(value);
}
function parseSafeImmediateValue(value) {
    if (!isSafeImmediateValue(value)) {
        throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
    }
    return ValueNode.createImmediate(value);
}
function parseValueExpressionList(arg) {
    if (arg.some(isExpressionOrFactory)) {
        return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
    }
    return PrimitiveValueListNode.create(arg);
}

/// <reference types="./parens-node.d.ts" />
/**
 * @internal
 */
const ParensNode = freeze({
    is(node) {
        return node.kind === 'ParensNode';
    },
    create(node) {
        return freeze({
            kind: 'ParensNode',
            node,
        });
    },
});

/// <reference types="./binary-operation-parser.d.ts" />
function parseValueBinaryOperationOrExpression(args) {
    if (args.length === 3) {
        return parseValueBinaryOperation(args[0], args[1], args[2]);
    }
    else if (args.length === 1) {
        return parseValueExpression(args[0]);
    }
    throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
}
function parseValueBinaryOperation(left, operator, right) {
    if (isIsOperator(operator) && needsIsOperator(right)) {
        return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), ValueNode.createImmediate(right));
    }
    return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseValueExpressionOrList(right));
}
function parseReferentialBinaryOperation(left, operator, right) {
    return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseReferenceExpression(right));
}
function parseFilterObject(obj, combinator) {
    return parseFilterList(Object.entries(obj)
        .filter(([, v]) => !isUndefined(v))
        .map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? 'is' : '=', v)), combinator);
}
function parseFilterList(list, combinator, withParens = true) {
    const combine = combinator === 'and' ? AndNode.create : OrNode.create;
    if (list.length === 0) {
        return BinaryOperationNode.create(ValueNode.createImmediate(1), OperatorNode.create('='), ValueNode.createImmediate(combinator === 'and' ? 1 : 0));
    }
    let node = toOperationNode(list[0]);
    for (let i = 1; i < list.length; ++i) {
        node = combine(node, toOperationNode(list[i]));
    }
    if (list.length > 1 && withParens) {
        return ParensNode.create(node);
    }
    return node;
}
function isIsOperator(operator) {
    return operator === 'is' || operator === 'is not';
}
function needsIsOperator(value) {
    return isNull(value) || isBoolean(value);
}
function parseOperator(operator) {
    if (isString(operator) && OPERATORS.includes(operator)) {
        return OperatorNode.create(operator);
    }
    if (isOperationNodeSource(operator)) {
        return operator.toOperationNode();
    }
    throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function toOperationNode(nodeOrSource) {
    return isOperationNodeSource(nodeOrSource)
        ? nodeOrSource.toOperationNode()
        : nodeOrSource;
}

/// <reference types="./order-by-node.d.ts" />
/**
 * @internal
 */
const OrderByNode = freeze({
    is(node) {
        return node.kind === 'OrderByNode';
    },
    create(items) {
        return freeze({
            kind: 'OrderByNode',
            items: freeze([...items]),
        });
    },
    cloneWithItems(orderBy, items) {
        return freeze({
            ...orderBy,
            items: freeze([...orderBy.items, ...items]),
        });
    },
});

/// <reference types="./partition-by-node.d.ts" />
/**
 * @internal
 */
const PartitionByNode = freeze({
    is(node) {
        return node.kind === 'PartitionByNode';
    },
    create(items) {
        return freeze({
            kind: 'PartitionByNode',
            items: freeze(items),
        });
    },
    cloneWithItems(partitionBy, items) {
        return freeze({
            ...partitionBy,
            items: freeze([...partitionBy.items, ...items]),
        });
    },
});

/// <reference types="./over-node.d.ts" />
/**
 * @internal
 */
const OverNode = freeze({
    is(node) {
        return node.kind === 'OverNode';
    },
    create() {
        return freeze({
            kind: 'OverNode',
        });
    },
    cloneWithOrderByItems(overNode, items) {
        return freeze({
            ...overNode,
            orderBy: overNode.orderBy
                ? OrderByNode.cloneWithItems(overNode.orderBy, items)
                : OrderByNode.create(items),
        });
    },
    cloneWithPartitionByItems(overNode, items) {
        return freeze({
            ...overNode,
            partitionBy: overNode.partitionBy
                ? PartitionByNode.cloneWithItems(overNode.partitionBy, items)
                : PartitionByNode.create(items),
        });
    },
});

/// <reference types="./from-node.d.ts" />
/**
 * @internal
 */
const FromNode = freeze({
    is(node) {
        return node.kind === 'FromNode';
    },
    create(froms) {
        return freeze({
            kind: 'FromNode',
            froms: freeze(froms),
        });
    },
    cloneWithFroms(from, froms) {
        return freeze({
            ...from,
            froms: freeze([...from.froms, ...froms]),
        });
    },
});

/// <reference types="./group-by-node.d.ts" />
/**
 * @internal
 */
const GroupByNode = freeze({
    is(node) {
        return node.kind === 'GroupByNode';
    },
    create(items) {
        return freeze({
            kind: 'GroupByNode',
            items: freeze(items),
        });
    },
    cloneWithItems(groupBy, items) {
        return freeze({
            ...groupBy,
            items: freeze([...groupBy.items, ...items]),
        });
    },
});

/// <reference types="./having-node.d.ts" />
/**
 * @internal
 */
const HavingNode = freeze({
    is(node) {
        return node.kind === 'HavingNode';
    },
    create(filter) {
        return freeze({
            kind: 'HavingNode',
            having: filter,
        });
    },
    cloneWithOperation(havingNode, operator, operation) {
        return freeze({
            ...havingNode,
            having: operator === 'And'
                ? AndNode.create(havingNode.having, operation)
                : OrNode.create(havingNode.having, operation),
        });
    },
});

/// <reference types="./insert-query-node.d.ts" />
/**
 * @internal
 */
const InsertQueryNode = freeze({
    is(node) {
        return node.kind === 'InsertQueryNode';
    },
    create(into, withNode, replace) {
        return freeze({
            kind: 'InsertQueryNode',
            into,
            ...(withNode && { with: withNode }),
            replace,
        });
    },
    createWithoutInto() {
        return freeze({
            kind: 'InsertQueryNode',
        });
    },
    cloneWith(insertQuery, props) {
        return freeze({
            ...insertQuery,
            ...props,
        });
    },
});

/// <reference types="./list-node.d.ts" />
/**
 * @internal
 */
const ListNode = freeze({
    is(node) {
        return node.kind === 'ListNode';
    },
    create(items) {
        return freeze({
            kind: 'ListNode',
            items: freeze(items),
        });
    },
});

/// <reference types="./update-query-node.d.ts" />
/**
 * @internal
 */
const UpdateQueryNode = freeze({
    is(node) {
        return node.kind === 'UpdateQueryNode';
    },
    create(tables, withNode) {
        return freeze({
            kind: 'UpdateQueryNode',
            // For backwards compatibility, use the raw table node when there's only one table
            // and don't rename the property to something like `tables`.
            table: tables.length === 1 ? tables[0] : ListNode.create(tables),
            ...(withNode && { with: withNode }),
        });
    },
    createWithoutTable() {
        return freeze({
            kind: 'UpdateQueryNode',
        });
    },
    cloneWithFromItems(updateQuery, fromItems) {
        return freeze({
            ...updateQuery,
            from: updateQuery.from
                ? FromNode.cloneWithFroms(updateQuery.from, fromItems)
                : FromNode.create(fromItems),
        });
    },
    cloneWithUpdates(updateQuery, updates) {
        return freeze({
            ...updateQuery,
            updates: updateQuery.updates
                ? freeze([...updateQuery.updates, ...updates])
                : updates,
        });
    },
    cloneWithLimit(updateQuery, limit) {
        return freeze({
            ...updateQuery,
            limit,
        });
    },
});

/// <reference types="./using-node.d.ts" />
/**
 * @internal
 */
const UsingNode = freeze({
    is(node) {
        return node.kind === 'UsingNode';
    },
    create(tables) {
        return freeze({
            kind: 'UsingNode',
            tables: freeze(tables),
        });
    },
    cloneWithTables(using, tables) {
        return freeze({
            ...using,
            tables: freeze([...using.tables, ...tables]),
        });
    },
});

/// <reference types="./delete-query-node.d.ts" />
/**
 * @internal
 */
const DeleteQueryNode = freeze({
    is(node) {
        return node.kind === 'DeleteQueryNode';
    },
    create(fromItems, withNode) {
        return freeze({
            kind: 'DeleteQueryNode',
            from: FromNode.create(fromItems),
            ...(withNode && { with: withNode }),
        });
    },
    // TODO: remove in v0.29
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
    // TODO: remove in v0.29
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
    cloneWithLimit(deleteNode, limit) {
        return freeze({
            ...deleteNode,
            limit,
        });
    },
    cloneWithoutLimit(deleteNode) {
        return freeze({
            ...deleteNode,
            limit: undefined,
        });
    },
    cloneWithUsing(deleteNode, tables) {
        return freeze({
            ...deleteNode,
            using: deleteNode.using !== undefined
                ? UsingNode.cloneWithTables(deleteNode.using, tables)
                : UsingNode.create(tables),
        });
    },
});

/// <reference types="./where-node.d.ts" />
/**
 * @internal
 */
const WhereNode = freeze({
    is(node) {
        return node.kind === 'WhereNode';
    },
    create(filter) {
        return freeze({
            kind: 'WhereNode',
            where: filter,
        });
    },
    cloneWithOperation(whereNode, operator, operation) {
        return freeze({
            ...whereNode,
            where: operator === 'And'
                ? AndNode.create(whereNode.where, operation)
                : OrNode.create(whereNode.where, operation),
        });
    },
});

/// <reference types="./returning-node.d.ts" />
/**
 * @internal
 */
const ReturningNode = freeze({
    is(node) {
        return node.kind === 'ReturningNode';
    },
    create(selections) {
        return freeze({
            kind: 'ReturningNode',
            selections: freeze(selections),
        });
    },
    cloneWithSelections(returning, selections) {
        return freeze({
            ...returning,
            selections: returning.selections
                ? freeze([...returning.selections, ...selections])
                : freeze(selections),
        });
    },
});

/// <reference types="./explain-node.d.ts" />
/**
 * @internal
 */
const ExplainNode = freeze({
    is(node) {
        return node.kind === 'ExplainNode';
    },
    create(format, options) {
        return freeze({
            kind: 'ExplainNode',
            format,
            options,
        });
    },
});

/// <reference types="./when-node.d.ts" />
/**
 * @internal
 */
const WhenNode = freeze({
    is(node) {
        return node.kind === 'WhenNode';
    },
    create(condition) {
        return freeze({
            kind: 'WhenNode',
            condition,
        });
    },
    cloneWithResult(whenNode, result) {
        return freeze({
            ...whenNode,
            result,
        });
    },
});

/// <reference types="./merge-query-node.d.ts" />
/**
 * @internal
 */
const MergeQueryNode = freeze({
    is(node) {
        return node.kind === 'MergeQueryNode';
    },
    create(into, withNode) {
        return freeze({
            kind: 'MergeQueryNode',
            into,
            ...(withNode && { with: withNode }),
        });
    },
    cloneWithUsing(mergeNode, using) {
        return freeze({
            ...mergeNode,
            using,
        });
    },
    cloneWithWhen(mergeNode, when) {
        return freeze({
            ...mergeNode,
            whens: mergeNode.whens
                ? freeze([...mergeNode.whens, when])
                : freeze([when]),
        });
    },
    cloneWithThen(mergeNode, then) {
        return freeze({
            ...mergeNode,
            whens: mergeNode.whens
                ? freeze([
                    ...mergeNode.whens.slice(0, -1),
                    WhenNode.cloneWithResult(mergeNode.whens[mergeNode.whens.length - 1], then),
                ])
                : undefined,
        });
    },
});

/// <reference types="./output-node.d.ts" />
/**
 * @internal
 */
const OutputNode = freeze({
    is(node) {
        return node.kind === 'OutputNode';
    },
    create(selections) {
        return freeze({
            kind: 'OutputNode',
            selections: freeze(selections),
        });
    },
    cloneWithSelections(output, selections) {
        return freeze({
            ...output,
            selections: output.selections
                ? freeze([...output.selections, ...selections])
                : freeze(selections),
        });
    },
});

/// <reference types="./query-node.d.ts" />
/**
 * @internal
 */
const QueryNode = freeze({
    is(node) {
        return (SelectQueryNode.is(node) ||
            InsertQueryNode.is(node) ||
            UpdateQueryNode.is(node) ||
            DeleteQueryNode.is(node) ||
            MergeQueryNode.is(node));
    },
    cloneWithEndModifier(node, modifier) {
        return freeze({
            ...node,
            endModifiers: node.endModifiers
                ? freeze([...node.endModifiers, modifier])
                : freeze([modifier]),
        });
    },
    cloneWithWhere(node, operation) {
        return freeze({
            ...node,
            where: node.where
                ? WhereNode.cloneWithOperation(node.where, 'And', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithJoin(node, join) {
        return freeze({
            ...node,
            joins: node.joins ? freeze([...node.joins, join]) : freeze([join]),
        });
    },
    cloneWithReturning(node, selections) {
        return freeze({
            ...node,
            returning: node.returning
                ? ReturningNode.cloneWithSelections(node.returning, selections)
                : ReturningNode.create(selections),
        });
    },
    cloneWithoutReturning(node) {
        return freeze({
            ...node,
            returning: undefined,
        });
    },
    cloneWithoutWhere(node) {
        return freeze({
            ...node,
            where: undefined,
        });
    },
    cloneWithExplain(node, format, options) {
        return freeze({
            ...node,
            explain: ExplainNode.create(format, options?.toOperationNode()),
        });
    },
    cloneWithTop(node, top) {
        return freeze({
            ...node,
            top,
        });
    },
    cloneWithOutput(node, selections) {
        return freeze({
            ...node,
            output: node.output
                ? OutputNode.cloneWithSelections(node.output, selections)
                : OutputNode.create(selections),
        });
    },
    cloneWithOrderByItems(node, items) {
        return freeze({
            ...node,
            orderBy: node.orderBy
                ? OrderByNode.cloneWithItems(node.orderBy, items)
                : OrderByNode.create(items),
        });
    },
    cloneWithoutOrderBy(node) {
        return freeze({
            ...node,
            orderBy: undefined,
        });
    },
});

/// <reference types="./select-query-node.d.ts" />
/**
 * @internal
 */
const SelectQueryNode = freeze({
    is(node) {
        return node.kind === 'SelectQueryNode';
    },
    create(withNode) {
        return freeze({
            kind: 'SelectQueryNode',
            ...(withNode && { with: withNode }),
        });
    },
    createFrom(fromItems, withNode) {
        return freeze({
            kind: 'SelectQueryNode',
            from: FromNode.create(fromItems),
            ...(withNode && { with: withNode }),
        });
    },
    cloneWithSelections(select, selections) {
        return freeze({
            ...select,
            selections: select.selections
                ? freeze([...select.selections, ...selections])
                : freeze(selections),
        });
    },
    cloneWithDistinctOn(select, expressions) {
        return freeze({
            ...select,
            distinctOn: select.distinctOn
                ? freeze([...select.distinctOn, ...expressions])
                : freeze(expressions),
        });
    },
    cloneWithFrontModifier(select, modifier) {
        return freeze({
            ...select,
            frontModifiers: select.frontModifiers
                ? freeze([...select.frontModifiers, modifier])
                : freeze([modifier]),
        });
    },
    // TODO: remove in v0.29
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
    cloneWithGroupByItems(selectNode, items) {
        return freeze({
            ...selectNode,
            groupBy: selectNode.groupBy
                ? GroupByNode.cloneWithItems(selectNode.groupBy, items)
                : GroupByNode.create(items),
        });
    },
    cloneWithLimit(selectNode, limit) {
        return freeze({
            ...selectNode,
            limit,
        });
    },
    cloneWithOffset(selectNode, offset) {
        return freeze({
            ...selectNode,
            offset,
        });
    },
    cloneWithFetch(selectNode, fetch) {
        return freeze({
            ...selectNode,
            fetch,
        });
    },
    cloneWithHaving(selectNode, operation) {
        return freeze({
            ...selectNode,
            having: selectNode.having
                ? HavingNode.cloneWithOperation(selectNode.having, 'And', operation)
                : HavingNode.create(operation),
        });
    },
    cloneWithSetOperations(selectNode, setOperations) {
        return freeze({
            ...selectNode,
            setOperations: selectNode.setOperations
                ? freeze([...selectNode.setOperations, ...setOperations])
                : freeze([...setOperations]),
        });
    },
    cloneWithoutSelections(select) {
        return freeze({
            ...select,
            selections: [],
        });
    },
    cloneWithoutLimit(select) {
        return freeze({
            ...select,
            limit: undefined,
        });
    },
    cloneWithoutOffset(select) {
        return freeze({
            ...select,
            offset: undefined,
        });
    },
    // TODO: remove in v0.29
    /**
     * @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
     */
    cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
    cloneWithoutGroupBy(select) {
        return freeze({
            ...select,
            groupBy: undefined,
        });
    },
});

/// <reference types="./join-builder.d.ts" />
class JoinBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    on(...args) {
        return new JoinBuilder({
            ...this.#props,
            joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    /**
     * Just like {@link WhereInterface.whereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereRef} for documentation and examples.
     */
    onRef(lhs, op, rhs) {
        return new JoinBuilder({
            ...this.#props,
            joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    /**
     * Adds `on true`.
     */
    onTrue() {
        return new JoinBuilder({
            ...this.#props,
            joinNode: JoinNode.cloneWithOn(this.#props.joinNode, RawNode.createWithSql('true')),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.joinNode;
    }
}

/// <reference types="./partition-by-item-node.d.ts" />
/**
 * @internal
 */
const PartitionByItemNode = freeze({
    is(node) {
        return node.kind === 'PartitionByItemNode';
    },
    create(partitionBy) {
        return freeze({
            kind: 'PartitionByItemNode',
            partitionBy,
        });
    },
});

/// <reference types="./partition-by-parser.d.ts" />
function parsePartitionBy(partitionBy) {
    return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}

/// <reference types="./over-builder.d.ts" />
class OverBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    orderBy(...args) {
        return new OverBuilder({
            overNode: OverNode.cloneWithOrderByItems(this.#props.overNode, parseOrderBy(args)),
        });
    }
    clearOrderBy() {
        return new OverBuilder({
            overNode: QueryNode.cloneWithoutOrderBy(this.#props.overNode),
        });
    }
    partitionBy(partitionBy) {
        return new OverBuilder({
            overNode: OverNode.cloneWithPartitionByItems(this.#props.overNode, parsePartitionBy(partitionBy)),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.overNode;
    }
}

/// <reference types="./selection-node.d.ts" />
/**
 * @internal
 */
const SelectionNode = freeze({
    is(node) {
        return node.kind === 'SelectionNode';
    },
    create(selection) {
        return freeze({
            kind: 'SelectionNode',
            selection: selection,
        });
    },
    createSelectAll() {
        return freeze({
            kind: 'SelectionNode',
            selection: SelectAllNode.create(),
        });
    },
    createSelectAllFromTable(table) {
        return freeze({
            kind: 'SelectionNode',
            selection: ReferenceNode.createSelectAll(table),
        });
    },
});

/// <reference types="./select-parser.d.ts" />
function parseSelectArg(selection) {
    if (isFunction(selection)) {
        return parseSelectArg(selection(expressionBuilder()));
    }
    else if (isReadonlyArray(selection)) {
        return selection.map((it) => parseSelectExpression(it));
    }
    else {
        return [parseSelectExpression(selection)];
    }
}
function parseSelectExpression(selection) {
    if (isString(selection)) {
        return SelectionNode.create(parseAliasedStringReference(selection));
    }
    else if (isDynamicReferenceBuilder(selection)) {
        return SelectionNode.create(selection.toOperationNode());
    }
    else {
        return SelectionNode.create(parseAliasedExpression(selection));
    }
}
function parseSelectAll(table) {
    if (!table) {
        return [SelectionNode.createSelectAll()];
    }
    else if (Array.isArray(table)) {
        return table.map(parseSelectAllArg);
    }
    else {
        return [parseSelectAllArg(table)];
    }
}
function parseSelectAllArg(table) {
    if (isString(table)) {
        return SelectionNode.createSelectAllFromTable(parseTable(table));
    }
    throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
}

/// <reference types="./values-node.d.ts" />
/**
 * @internal
 */
const ValuesNode = freeze({
    is(node) {
        return node.kind === 'ValuesNode';
    },
    create(values) {
        return freeze({
            kind: 'ValuesNode',
            values: freeze(values),
        });
    },
});

/// <reference types="./default-insert-value-node.d.ts" />
/**
 * @internal
 */
const DefaultInsertValueNode = freeze({
    is(node) {
        return node.kind === 'DefaultInsertValueNode';
    },
    create() {
        return freeze({
            kind: 'DefaultInsertValueNode',
        });
    },
});

/// <reference types="./insert-values-parser.d.ts" />
function parseInsertExpression(arg) {
    const objectOrList = isFunction(arg) ? arg(expressionBuilder()) : arg;
    const list = isReadonlyArray(objectOrList)
        ? objectOrList
        : freeze([objectOrList]);
    return parseInsertColumnsAndValues(list);
}
function parseInsertColumnsAndValues(rows) {
    const columns = parseColumnNamesAndIndexes(rows);
    return [
        freeze([...columns.keys()].map(ColumnNode.create)),
        ValuesNode.create(rows.map((row) => parseRowValues(row, columns))),
    ];
}
function parseColumnNamesAndIndexes(rows) {
    const columns = new Map();
    for (const row of rows) {
        const cols = Object.keys(row);
        for (const col of cols) {
            if (!columns.has(col) && row[col] !== undefined) {
                columns.set(col, columns.size);
            }
        }
    }
    return columns;
}
function parseRowValues(row, columns) {
    const rowColumns = Object.keys(row);
    const rowValues = Array.from({
        length: columns.size,
    });
    let hasUndefinedOrComplexColumns = false;
    let indexedRowColumns = rowColumns.length;
    for (const col of rowColumns) {
        const columnIdx = columns.get(col);
        if (isUndefined(columnIdx)) {
            indexedRowColumns--;
            continue;
        }
        const value = row[col];
        if (isUndefined(value) || isExpressionOrFactory(value)) {
            hasUndefinedOrComplexColumns = true;
        }
        rowValues[columnIdx] = value;
    }
    const hasMissingColumns = indexedRowColumns < columns.size;
    if (hasMissingColumns || hasUndefinedOrComplexColumns) {
        const defaultValue = DefaultInsertValueNode.create();
        return ValueListNode.create(rowValues.map((it) => isUndefined(it) ? defaultValue : parseValueExpression(it)));
    }
    return PrimitiveValueListNode.create(rowValues);
}

/// <reference types="./column-update-node.d.ts" />
/**
 * @internal
 */
const ColumnUpdateNode = freeze({
    is(node) {
        return node.kind === 'ColumnUpdateNode';
    },
    create(column, value) {
        return freeze({
            kind: 'ColumnUpdateNode',
            column,
            value,
        });
    },
});

/// <reference types="./update-set-parser.d.ts" />
function parseUpdate(...args) {
    if (args.length === 2) {
        return [
            ColumnUpdateNode.create(parseReferenceExpression(args[0]), parseValueExpression(args[1])),
        ];
    }
    return parseUpdateObjectExpression(args[0]);
}
function parseUpdateObjectExpression(update) {
    const updateObj = isFunction(update) ? update(expressionBuilder()) : update;
    return Object.entries(updateObj)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
        return ColumnUpdateNode.create(ColumnNode.create(key), parseValueExpression(value));
    });
}

/// <reference types="./on-duplicate-key-node.d.ts" />
/**
 * @internal
 */
const OnDuplicateKeyNode = freeze({
    is(node) {
        return node.kind === 'OnDuplicateKeyNode';
    },
    create(updates) {
        return freeze({
            kind: 'OnDuplicateKeyNode',
            updates,
        });
    },
});

/// <reference types="./insert-result.d.ts" />
/**
 * The result of an insert query.
 *
 * If the table has an auto incrementing primary key {@link insertId} will hold
 * the generated id on dialects that support it. For example PostgreSQL doesn't
 * return the id by default and {@link insertId} is undefined. On PostgreSQL you
 * need to use {@link ReturningInterface.returning} or {@link ReturningInterface.returningAll}
 * to get out the inserted id.
 *
 * {@link numInsertedOrUpdatedRows} holds the number of (actually) inserted rows.
 * On MySQL, updated rows are counted twice when using `on duplicate key update`.
 *
 * ### Examples
 *
 * ```ts
 * import type { NewPerson } from 'type-editor' // imaginary module
 *
 * async function insertPerson(person: NewPerson) {
 *   const result = await db
 *     .insertInto('person')
 *     .values(person)
 *     .executeTakeFirstOrThrow()
 *
 *   console.log(result.insertId) // relevant on MySQL
 *   console.log(result.numInsertedOrUpdatedRows) // always relevant
 * }
 * ```
 */
class InsertResult {
    /**
     * The auto incrementing primary key of the inserted row.
     *
     * This property can be undefined when the query contains an `on conflict`
     * clause that makes the query succeed even when nothing gets inserted.
     *
     * This property is always undefined on dialects like PostgreSQL that
     * don't return the inserted id by default. On those dialects you need
     * to use the {@link ReturningInterface.returning | returning} method.
     */
    insertId;
    /**
     * Affected rows count.
     */
    numInsertedOrUpdatedRows;
    constructor(insertId, numInsertedOrUpdatedRows) {
        this.insertId = insertId;
        this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
    }
}

/// <reference types="./no-result-error.d.ts" />
class NoResultError extends Error {
    /**
     * The operation node tree of the query that was executed.
     */
    node;
    constructor(node) {
        super('no result');
        this.node = node;
    }
}
function isNoResultErrorConstructor(fn) {
    return Object.prototype.hasOwnProperty.call(fn, 'prototype');
}

/// <reference types="./on-conflict-node.d.ts" />
/**
 * @internal
 */
const OnConflictNode = freeze({
    is(node) {
        return node.kind === 'OnConflictNode';
    },
    create() {
        return freeze({
            kind: 'OnConflictNode',
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithIndexWhere(node, operation) {
        return freeze({
            ...node,
            indexWhere: node.indexWhere
                ? WhereNode.cloneWithOperation(node.indexWhere, 'And', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithIndexOrWhere(node, operation) {
        return freeze({
            ...node,
            indexWhere: node.indexWhere
                ? WhereNode.cloneWithOperation(node.indexWhere, 'Or', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithUpdateWhere(node, operation) {
        return freeze({
            ...node,
            updateWhere: node.updateWhere
                ? WhereNode.cloneWithOperation(node.updateWhere, 'And', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithUpdateOrWhere(node, operation) {
        return freeze({
            ...node,
            updateWhere: node.updateWhere
                ? WhereNode.cloneWithOperation(node.updateWhere, 'Or', operation)
                : WhereNode.create(operation),
        });
    },
    cloneWithoutIndexWhere(node) {
        return freeze({
            ...node,
            indexWhere: undefined,
        });
    },
    cloneWithoutUpdateWhere(node) {
        return freeze({
            ...node,
            updateWhere: undefined,
        });
    },
});

/// <reference types="./on-conflict-builder.d.ts" />
class OnConflictBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Specify a single column as the conflict target.
     *
     * Also see the {@link columns}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    column(column) {
        const columnNode = ColumnNode.create(column);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns
                    ? freeze([...this.#props.onConflictNode.columns, columnNode])
                    : freeze([columnNode]),
            }),
        });
    }
    /**
     * Specify a list of columns as the conflict target.
     *
     * Also see the {@link column}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    columns(columns) {
        const columnNodes = columns.map(ColumnNode.create);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns
                    ? freeze([...this.#props.onConflictNode.columns, ...columnNodes])
                    : freeze(columnNodes),
            }),
        });
    }
    /**
     * Specify a specific constraint by name as the conflict target.
     *
     * Also see the {@link column}, {@link columns} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    constraint(constraintName) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                constraint: IdentifierNode.create(constraintName),
            }),
        });
    }
    /**
     * Specify an expression as the conflict target.
     *
     * This can be used if the unique index is an expression index.
     *
     * Also see the {@link column}, {@link columns} and {@link constraint}
     * methods for alternative ways to specify the conflict target.
     */
    expression(expression) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                indexExpression: expression.toOperationNode(),
            }),
        });
    }
    where(...args) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithoutIndexWhere(this.#props.onConflictNode),
        });
    }
    /**
     * Adds the "do nothing" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id") do nothing
     * ```
     */
    doNothing() {
        return new OnConflictDoNothingBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                doNothing: true,
            }),
        });
    }
    /**
     * Adds the "do update set" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * const id = 1
     * const first_name = 'John'
     *
     * await db
     *   .insertInto('person')
     *   .values({ first_name, id })
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doUpdateSet({ first_name })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "id")
     * values ($1, $2)
     * on conflict ("id")
     * do update set "first_name" = $3
     * ```
     *
     * In the next example we use the `ref` method to reference
     * columns of the virtual table `excluded` in a type-safe way
     * to create an upsert operation:
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function upsertPerson(person: NewPerson): Promise<void> {
     *   await db.insertInto('person')
     *     .values(person)
     *     .onConflict((oc) => oc
     *       .column('id')
     *       .doUpdateSet((eb) => ({
     *         first_name: eb.ref('excluded.first_name'),
     *         last_name: eb.ref('excluded.last_name')
     *       })
     *     )
     *   )
     *   .execute()
     * }
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name")
     * values ($1, $2)
     * on conflict ("id")
     * do update set
     *  "first_name" = excluded."first_name",
     *  "last_name" = excluded."last_name"
     * ```
     */
    doUpdateSet(update) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
                updates: parseUpdateObjectExpression(update),
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
}
class OnConflictDoNothingBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}
class OnConflictUpdateBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    where(...args) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef(lhs, op, rhs) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: OnConflictNode.cloneWithoutUpdateWhere(this.#props.onConflictNode),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}

/// <reference types="./top-node.d.ts" />
/**
 * @internal
 */
const TopNode = freeze({
    is(node) {
        return node.kind === 'TopNode';
    },
    create(expression, modifiers) {
        return freeze({
            kind: 'TopNode',
            expression,
            modifiers,
        });
    },
});

/// <reference types="./top-parser.d.ts" />
function parseTop(expression, modifiers) {
    if (!isNumber(expression) && !isBigInt(expression)) {
        throw new Error(`Invalid top expression: ${expression}`);
    }
    if (!isUndefined(modifiers) && !isTopModifiers(modifiers)) {
        throw new Error(`Invalid top modifiers: ${modifiers}`);
    }
    return TopNode.create(expression, modifiers);
}
function isTopModifiers(modifiers) {
    return (modifiers === 'percent' ||
        modifiers === 'with ties' ||
        modifiers === 'percent with ties');
}

/// <reference types="./or-action-node.d.ts" />
/**
 * @internal
 */
const OrActionNode = freeze({
    is(node) {
        return node.kind === 'OrActionNode';
    },
    create(action) {
        return freeze({
            kind: 'OrActionNode',
            action,
        });
    },
});

/// <reference types="./insert-query-builder.d.ts" />
class InsertQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Sets the values to insert for an {@link Kysely.insertInto | insert} query.
     *
     * This method takes an object whose keys are column names and values are
     * values to insert. In addition to the column's type, the values can be
     * raw {@link sql} snippets or select queries.
     *
     * You must provide all fields you haven't explicitly marked as nullable
     * or optional using {@link Generated} or {@link ColumnType}.
     *
     * The return value of an `insert` query is an instance of {@link InsertResult}. The
     * {@link InsertResult.insertId | insertId} field holds the auto incremented primary
     * key if the database returned one.
     *
     * On PostgreSQL and some other dialects, you need to call `returning` to get
     * something out of the query.
     *
     * Also see the {@link expression} method for inserting the result of a select
     * query or any other expression.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Single row", 10) -->
     *
     * Insert a single row:
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40
     *   })
     *   .executeTakeFirst()
     *
     * // `insertId` is only available on dialects that
     * // automatically return the id of the inserted row
     * // such as MySQL and SQLite. On PostgreSQL, for example,
     * // you need to add a `returning` clause to the query to
     * // get anything out. See the "returning data" example.
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`first_name`, `last_name`, `age`) values (?, ?, ?)
     * ```
     *
     * <!-- siteExample("insert", "Multiple rows", 20) -->
     *
     * On dialects that support it (for example PostgreSQL) you can insert multiple
     * rows by providing an array. Note that the return value is once again very
     * dialect-specific. Some databases may only return the id of the *last* inserted
     * row and some return nothing at all unless you call `returning`.
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values([{
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   }, {
     *     first_name: 'Arnold',
     *     last_name: 'Schwarzenegger',
     *     age: 70,
     *   }])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values (($1, $2, $3), ($4, $5, $6))
     * ```
     *
     * <!-- siteExample("insert", "Returning data", 30) -->
     *
     * On supported dialects like PostgreSQL you need to chain `returning` to the query to get
     * the inserted row's columns (or any other expression) as the return value. `returning`
     * works just like `select`. Refer to `select` method's examples and documentation for
     * more info.
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston',
     *     age: 40,
     *   })
     *   .returning(['id', 'first_name as name'])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age") values ($1, $2, $3) returning "id", "first_name" as "name"
     * ```
     *
     * <!-- siteExample("insert", "Complex values", 40) -->
     *
     * In addition to primitives, the values can also be arbitrary expressions.
     * You can build the expressions by using a callback and calling the methods
     * on the expression builder passed to it:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const ani = "Ani"
     * const ston = "ston"
     *
     * const result = await db
     *   .insertInto('person')
     *   .values(({ ref, selectFrom, fn }) => ({
     *     first_name: 'Jennifer',
     *     last_name: sql<string>`concat(${ani}, ${ston})`,
     *     middle_name: ref('first_name'),
     *     age: selectFrom('person')
     *       .select(fn.avg<number>('age').as('avg_age')),
     *   }))
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" (
     *   "first_name",
     *   "last_name",
     *   "middle_name",
     *   "age"
     * )
     * values (
     *   $1,
     *   concat($2, $3),
     *   "first_name",
     *   (select avg("age") as "avg_age" from "person")
     * )
     * ```
     *
     * You can also use the callback version of subqueries or raw expressions:
     *
     * ```ts
     * await db.with('jennifer', (db) => db
     *   .selectFrom('person')
     *   .where('first_name', '=', 'Jennifer')
     *   .select(['id', 'first_name', 'gender'])
     *   .limit(1)
     * ).insertInto('pet').values((eb) => ({
     *   owner_id: eb.selectFrom('jennifer').select('id'),
     *   name: eb.selectFrom('jennifer').select('first_name'),
     *   species: 'cat',
     * }))
     * .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * with "jennifer" as (
     *   select "id", "first_name", "gender"
     *   from "person"
     *   where "first_name" = $1
     *   limit $2
     * )
     * insert into "pet" ("owner_id", "name", "species")
     * values (
     *  (select "id" from "jennifer"),
     *  (select "first_name" from "jennifer"),
     *  $3
     * )
     * ```
     */
    values(insert) {
        const [columns, values] = parseInsertExpression(insert);
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                columns,
                values,
            }),
        });
    }
    /**
     * Sets the columns to insert.
     *
     * The {@link values} method sets both the columns and the values and this method
     * is not needed. But if you are using the {@link expression} method, you can use
     * this method to set the columns to insert.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */
    columns(columns) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                columns: freeze(columns.map(ColumnNode.create)),
            }),
        });
    }
    /**
     * Insert an arbitrary expression. For example the result of a select query.
     *
     * ### Examples
     *
     * <!-- siteExample("insert", "Insert subquery", 50) -->
     *
     * You can create an `INSERT INTO SELECT FROM` query using the `expression` method.
     * This API doesn't follow our WYSIWYG principles and might be a bit difficult to
     * remember. The reasons for this design stem from implementation difficulties.
     *
     * ```ts
     * const result = await db.insertInto('person')
     *   .columns(['first_name', 'last_name', 'age'])
     *   .expression((eb) => eb
     *     .selectFrom('pet')
     *     .select((eb) => [
     *       'pet.name',
     *       eb.val('Petson').as('last_name'),
     *       eb.lit(7).as('age'),
     *     ])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age")
     * select "pet"."name", $1 as "last_name", 7 as "age from "pet"
     * ```
     */
    expression(expression) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                values: parseExpression(expression),
            }),
        });
    }
    /**
     * Creates an `insert into "person" default values` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .defaultValues()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" default values
     * ```
     */
    defaultValues() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                defaultValues: true,
            }),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` ("first_name", "last_name", "gender")
     * values (?, ?, ?) -- This is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Changes an `insert into` query to an `insert ignore into` query.
     *
     * This is only supported by some dialects like MySQL.
     *
     * To avoid a footgun, when invoked with the SQLite dialect, this method will
     * be handled like {@link orIgnore}. See also, {@link orAbort}, {@link orFail},
     * {@link orReplace}, and {@link orRollback}.
     *
     * If you use the ignore modifier, ignorable errors that occur while executing the
     * insert statement are ignored. For example, without ignore, a row that duplicates
     * an existing unique index or primary key value in the table causes a duplicate-key
     * error and the statement is aborted. With ignore, the row is discarded and no error
     * occurs.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .ignore()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    ignore() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                orAction: OrActionNode.create('ignore'),
            }),
        });
    }
    /**
     * Changes an `insert into` query to an `insert or ignore into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * To avoid a footgun, when invoked with the MySQL dialect, this method will
     * be handled like {@link ignore}.
     *
     * See also, {@link orAbort}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orIgnore()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
     * ```
     */
    orIgnore() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                orAction: OrActionNode.create('ignore'),
            }),
        });
    }
    /**
     * Changes an `insert into` query to an `insert or abort into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orAbort()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or abort into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orAbort() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                orAction: OrActionNode.create('abort'),
            }),
        });
    }
    /**
     * Changes an `insert into` query to an `insert or fail into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orReplace}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orFail()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or fail into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orFail() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                orAction: OrActionNode.create('fail'),
            }),
        });
    }
    /**
     * Changes an `insert into` query to an `insert or replace into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * You can also use {@link Kysely.replaceInto} to achieve the same result.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orRollback}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orReplace()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or replace into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orReplace() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                orAction: OrActionNode.create('replace'),
            }),
        });
    }
    /**
     * Changes an `insert into` query to an `insert or rollback into` query.
     *
     * This is only supported by some dialects like SQLite.
     *
     * See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orReplace}.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .orRollback()
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'female',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * insert or rollback into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
     * ```
     */
    orRollback() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                orAction: OrActionNode.create('rollback'),
            }),
        });
    }
    /**
     * Changes an `insert into` query to an `insert top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Insert the first 5 rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(5)
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(5) into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     *
     * Insert the first 50 percent of rows:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.insertInto('person')
     *   .top(50, 'percent')
     *   .columns(['first_name', 'gender'])
     *   .expression(
     *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * insert top(50) percent into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
     * ```
     */
    top(expression, modifiers) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    /**
     * Adds an `on conflict` clause to the query.
     *
     * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
     * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * ```
     *
     * You can provide the name of the constraint instead of a column name:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .constraint('pet_name_key')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict on constraint "pet_name_key"
     * do update set "species" = $4
     * ```
     *
     * You can also specify an expression as the conflict target in case
     * the unique index is an expression index:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .expression(sql<string>`lower(name)`)
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict (lower(name))
     * do update set "species" = $4
     * ```
     *
     * You can add a filter for the update statement like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *     .where('excluded.name', '!=', 'Catto')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name")
     * do update set "species" = $4
     * where "excluded"."name" != $5
     * ```
     *
     * You can create an `on conflict do nothing` clauses like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *     owner_id: 3,
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species", "owner_id")
     * values ($1, $2, $3)
     * on conflict ("name") do nothing
     * ```
     *
     * You can refer to the columns of the virtual `excluded` table
     * in a type-safe way using a callback and the `ref` method of
     * `ExpressionBuilder`:
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onConflict(oc => oc
     *     .column('id')
     *     .doUpdateSet({
     *       first_name: (eb) => eb.ref('excluded.first_name'),
     *       last_name: (eb) => eb.ref('excluded.last_name')
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("id", "first_name", "last_name", "gender")
     * values ($1, $2, $3, $4)
     * on conflict ("id")
     * do update set
     *  "first_name" = "excluded"."first_name",
     *  "last_name" = "excluded"."last_name"
     * ```
     */
    onConflict(callback) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                onConflict: callback(new OnConflictBuilder({
                    onConflictNode: OnConflictNode.create(),
                })).toOperationNode(),
            }),
        });
    }
    /**
     * Adds `on duplicate key update` to the query.
     *
     * If you specify `on duplicate key update`, and a row is inserted that would cause
     * a duplicate value in a unique index or primary key, an update of the old row occurs.
     *
     * This is only implemented by some dialects like MySQL. On most dialects you should
     * use {@link onConflict} instead.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({
     *     id: 1,
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *   })
     *   .onDuplicateKeyUpdate({ updated_at: new Date().toISOString() })
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * insert into `person` (`id`, `first_name`, `last_name`, `gender`)
     * values (?, ?, ?, ?)
     * on duplicate key update `updated_at` = ?
     * ```
     */
    onDuplicateKeyUpdate(update) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
                onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateObjectExpression(update)),
            }),
        });
    }
    returning(selection) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    returningAll() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll()),
        });
    }
    output(args) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .values({ first_name: 'James', last_name: 'Smith', gender: 'male' })
     *   .returning(['first_name'])
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "gender") values ($1, $2, $3)
     * ```
     */
    clearReturning() {
        return new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.insertInto('person')
     *   .values({ first_name: 'John', last_name: 'Doe', gender: 'male' })
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson } from 'type-editor' // imaginary module
     *
     * async function insertPerson(values: NewPerson, returnLastName: boolean) {
     *   return await db
     *     .insertInto('person')
     *     .values(values)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `insertPerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new InsertQueryBuilder({
            ...this.#props,
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `InsertQueryBuilder` with a new output type.
     */
    $castTo() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link values} input
     * when using {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.insertInto('person')
     *   .values({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *     gender: 'male',
     *     nullable_column: 'hell yeah!'
     *   })
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { NewPerson, NewPet, Species } from 'type-editor' // imaginary module
     *
     * async function insertPersonAndPet(person: NewPerson, pet: Omit<NewPet, 'owner_id'>) {
     *   return await db
     *     .with('new_person', (qb) => qb
     *       .insertInto('person')
     *       .values(person)
     *       .returning('id')
     *       .$assertType<{ id: number }>()
     *     )
     *     .with('new_pet', (qb) => qb
     *       .insertInto('pet')
     *       .values((eb) => ({
     *         owner_id: eb.selectFrom('new_person').select('id'),
     *         ...pet
     *       }))
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['new_person', 'new_pet'])
     *     .selectAll()
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     */
    $assertType() {
        return new InsertQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new InsertQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if ((query.returning && adapter.supportsReturning) ||
            (query.output && adapter.supportsOutput)) {
            return result.rows;
        }
        return [
            new InsertResult(result.insertId, result.numAffectedRows ?? BigInt(0)),
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new InsertQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}

/// <reference types="./delete-result.d.ts" />
class DeleteResult {
    numDeletedRows;
    constructor(numDeletedRows) {
        this.numDeletedRows = numDeletedRows;
    }
}

/// <reference types="./limit-node.d.ts" />
/**
 * @internal
 */
const LimitNode = freeze({
    is(node) {
        return node.kind === 'LimitNode';
    },
    create(limit) {
        return freeze({
            kind: 'LimitNode',
            limit,
        });
    },
});

/// <reference types="./delete-query-builder.d.ts" />
class DeleteQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    where(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode),
        });
    }
    /**
     * Changes a `delete from` query into a `delete top from` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Delete the first 5 rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(5)
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(5) from "person" where "age" > @1
     * ```
     *
     * Delete the first 50% of rows:
     *
     * ```ts
     * await db
     *   .deleteFrom('person')
     *   .top(50, 'percent')
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * delete top(50) percent from "person" where "age" > @1
     * ```
     */
    top(expression, modifiers) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    using(tables) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithUsing(this.#props.queryNode, parseTableExpressionOrList(tables)),
        });
    }
    innerJoin(...args) {
        return this.#join('InnerJoin', args);
    }
    leftJoin(...args) {
        return this.#join('LeftJoin', args);
    }
    rightJoin(...args) {
        return this.#join('RightJoin', args);
    }
    fullJoin(...args) {
        return this.#join('FullJoin', args);
    }
    #join(joinType, args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin(joinType, args)),
        });
    }
    returning(selection) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    returningAll(table) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    output(args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .clearReturning()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max"
     * ```
     */
    clearReturning() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode),
        });
    }
    /**
     * Clears the `limit` clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * await db.deleteFrom('pet')
     *   .returningAll()
     *   .where('name', '=', 'Max')
     *   .limit(5)
     *   .clearLimit()
     *   .execute()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * delete from "pet" where "name" = "Max" returning *
     * ```
     */
    clearLimit() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithoutLimit(this.#props.queryNode),
        });
    }
    orderBy(...args) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args)),
        });
    }
    clearOrderBy() {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutOrderBy(this.#props.queryNode),
        });
    }
    /**
     * Adds a limit clause to the query.
     *
     * A limit clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet` order by `created_at` limit ?
     * ```
     */
    limit(limit) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: DeleteQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit))),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.deleteFrom('person')
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql`-- This is a comment`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `person`
     * where `first_name` = "John" -- This is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.deleteFrom('person')
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function deletePerson(id: number, returnLastName: boolean) {
     *   return await db
     *     .deleteFrom('person')
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `deletePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new DeleteQueryBuilder({
            ...this.#props,
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `DeleteQueryBuilder` with a new output type.
     */
    $castTo() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', 3)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { Species } from 'type-editor' // imaginary module
     *
     * async function deletePersonAndPets(personId: number) {
     *   return await db
     *     .with('deleted_person', (qb) => qb
     *        .deleteFrom('person')
     *        .where('id', '=', personId)
     *        .returning('first_name')
     *        .$assertType<{ first_name: string }>()
     *     )
     *     .with('deleted_pets', (qb) => qb
     *       .deleteFrom('pet')
     *       .where('owner_id', '=', personId)
     *       .returning(['name as pet_name', 'species'])
     *       .$assertType<{ pet_name: string, species: Species }>()
     *     )
     *     .selectFrom(['deleted_person', 'deleted_pets'])
     *     .selectAll()
     *     .execute()
     * }
     * ```
     */
    $assertType() {
        return new DeleteQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new DeleteQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if ((query.returning && adapter.supportsReturning) ||
            (query.output && adapter.supportsOutput)) {
            return result.rows;
        }
        return [new DeleteResult(result.numAffectedRows ?? BigInt(0))];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new DeleteQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}

/// <reference types="./update-result.d.ts" />
class UpdateResult {
    /**
     * The number of rows the update query updated (even if not changed).
     */
    numUpdatedRows;
    /**
     * The number of rows the update query changed.
     *
     * This is **optional** and only supported in dialects such as MySQL.
     * You would probably use {@link numUpdatedRows} in most cases.
     */
    numChangedRows;
    constructor(numUpdatedRows, numChangedRows) {
        this.numUpdatedRows = numUpdatedRows;
        this.numChangedRows = numChangedRows;
    }
}

/// <reference types="./update-query-builder.d.ts" />
class UpdateQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    where(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode),
        });
    }
    /**
     * Changes an `update` query into a `update top` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Update the first row:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(1)
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(1) "person" set "first_name" = @1 where "age" > @2
     * ```
     *
     * Update the 50% first rows:
     *
     * ```ts
     * await db.updateTable('person')
     *   .top(50, 'percent')
     *   .set({ first_name: 'Foo' })
     *   .where('age', '>', 18)
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * update top(50) percent "person" set "first_name" = @1 where "age" > @2
     * ```
     */
    top(expression, modifiers) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    from(from) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: UpdateQueryNode.cloneWithFromItems(this.#props.queryNode, parseTableExpressionOrList(from)),
        });
    }
    innerJoin(...args) {
        return this.#join('InnerJoin', args);
    }
    leftJoin(...args) {
        return this.#join('LeftJoin', args);
    }
    rightJoin(...args) {
        return this.#join('RightJoin', args);
    }
    fullJoin(...args) {
        return this.#join('FullJoin', args);
    }
    #join(joinType, args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin(joinType, args)),
        });
    }
    orderBy(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args)),
        });
    }
    clearOrderBy() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutOrderBy(this.#props.queryNode),
        });
    }
    /**
     * Adds a limit clause to the update query for supported databases, such as MySQL.
     *
     * ### Examples
     *
     * Update the first 2 rows in the 'person' table:
     *
     * ```ts
     * await db
     *   .updateTable('person')
     *   .set({ first_name: 'Foo' })
     *   .limit(2)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person` set `first_name` = ? limit ?
     * ```
     */
    limit(limit) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: UpdateQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit))),
        });
    }
    set(...args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: UpdateQueryNode.cloneWithUpdates(this.#props.queryNode, parseUpdate(...args)),
        });
    }
    returning(selection) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    returningAll(table) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    output(args) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.updateTable('person')
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .modifyEnd(sql.raw('-- This is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * update `person`
     * set `age` = 39
     * where `first_name` = "John" -- This is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Clears all `returning` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.updateTable('person')
     *   .returningAll()
     *   .set({ age: 39 })
     *   .where('first_name', '=', 'John')
     *   .clearReturning()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * update "person" set "age" = 39 where "first_name" = "John"
     * ```
     */
    clearReturning() {
        return new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutReturning(this.#props.queryNode),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * const values = {
     *   first_name: 'John',
     * } satisfies PersonUpdate
     *
     * db.updateTable('person')
     *   .set(values)
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new UpdateQueryBuilder({
            ...this.#props,
        });
    }
    /**
     * Change the output type of the query.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `UpdateQueryBuilder` with a new output type.
     */
    $castTo() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link set} input
     * when using {@link where} and/or {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * import type { Person } from 'type-editor' // imaginary module
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (isWithNoNullValue(person)) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     *
     * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
     *   return person.nullable_column != null
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * import type { NotNull } from 'kysely'
     *
     * const id = 1
     * const now = new Date().toISOString()
     *
     * const person = await db.updateTable('person')
     *   .set({ deleted_at: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ deleted_at: Date; nullable_column: NotNull }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make TypeScript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for TypeScript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help TypeScript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate, PetUpdate, Species } from 'type-editor' // imaginary module
     *
     * const person = {
     *   id: 1,
     *   gender: 'other',
     * } satisfies PersonUpdate
     *
     * const pet = {
     *   name: 'Fluffy',
     * } satisfies PetUpdate
     *
     * const result = await db
     *   .with('updated_person', (qb) => qb
     *     .updateTable('person')
     *     .set(person)
     *     .where('id', '=', person.id)
     *     .returning('first_name')
     *     .$assertType<{ first_name: string }>()
     *   )
     *   .with('updated_pet', (qb) => qb
     *     .updateTable('pet')
     *     .set(pet)
     *     .where('owner_id', '=', person.id)
     *     .returning(['name as pet_name', 'species'])
     *     .$assertType<{ pet_name: string, species: Species }>()
     *   )
     *   .selectFrom(['updated_person', 'updated_pet'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType() {
        return new UpdateQueryBuilder(this.#props);
    }
    /**
     * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new UpdateQueryBuilder({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if ((query.returning && adapter.supportsReturning) ||
            (query.output && adapter.supportsOutput)) {
            return result.rows;
        }
        return [
            new UpdateResult(result.numAffectedRows ?? BigInt(0), result.numChangedRows),
        ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new UpdateQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}

/// <reference types="./common-table-expression-name-node.d.ts" />
/**
 * @internal
 */
const CommonTableExpressionNameNode = freeze({
    is(node) {
        return node.kind === 'CommonTableExpressionNameNode';
    },
    create(tableName, columnNames) {
        return freeze({
            kind: 'CommonTableExpressionNameNode',
            table: TableNode.create(tableName),
            columns: columnNames
                ? freeze(columnNames.map(ColumnNode.create))
                : undefined,
        });
    },
});

/// <reference types="./common-table-expression-node.d.ts" />
/**
 * @internal
 */
const CommonTableExpressionNode = freeze({
    is(node) {
        return node.kind === 'CommonTableExpressionNode';
    },
    create(name, expression) {
        return freeze({
            kind: 'CommonTableExpressionNode',
            name,
            expression,
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./cte-builder.d.ts" />
class CTEBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Makes the common table expression materialized.
     */
    materialized() {
        return new CTEBuilder({
            ...this.#props,
            node: CommonTableExpressionNode.cloneWith(this.#props.node, {
                materialized: true,
            }),
        });
    }
    /**
     * Makes the common table expression not materialized.
     */
    notMaterialized() {
        return new CTEBuilder({
            ...this.#props,
            node: CommonTableExpressionNode.cloneWith(this.#props.node, {
                materialized: false,
            }),
        });
    }
    toOperationNode() {
        return this.#props.node;
    }
}

/// <reference types="./with-parser.d.ts" />
function parseCommonTableExpression(nameOrBuilderCallback, expression) {
    const expressionNode = expression(createQueryCreator()).toOperationNode();
    if (isFunction(nameOrBuilderCallback)) {
        return nameOrBuilderCallback(cteBuilderFactory(expressionNode)).toOperationNode();
    }
    return CommonTableExpressionNode.create(parseCommonTableExpressionName(nameOrBuilderCallback), expressionNode);
}
function cteBuilderFactory(expressionNode) {
    return (name) => {
        return new CTEBuilder({
            node: CommonTableExpressionNode.create(parseCommonTableExpressionName(name), expressionNode),
        });
    };
}
function parseCommonTableExpressionName(name) {
    if (name.includes('(')) {
        const parts = name.split(/[\(\)]/);
        const table = parts[0];
        const columns = parts[1].split(',').map((it) => it.trim());
        return CommonTableExpressionNameNode.create(table, columns);
    }
    else {
        return CommonTableExpressionNameNode.create(name);
    }
}

/// <reference types="./with-node.d.ts" />
/**
 * @internal
 */
const WithNode = freeze({
    is(node) {
        return node.kind === 'WithNode';
    },
    create(expression, params) {
        return freeze({
            kind: 'WithNode',
            expressions: freeze([expression]),
            ...params,
        });
    },
    cloneWithExpression(withNode, expression) {
        return freeze({
            ...withNode,
            expressions: freeze([...withNode.expressions, expression]),
        });
    },
});

/// <reference types="./random-string.d.ts" />
const CHARS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
];
function randomString(length) {
    let chars = '';
    for (let i = 0; i < length; ++i) {
        chars += randomChar();
    }
    return chars;
}
function randomChar() {
    return CHARS[~~(Math.random() * CHARS.length)];
}

/// <reference types="./query-id.d.ts" />
function createQueryId() {
    return new LazyQueryId();
}
class LazyQueryId {
    #queryId;
    get queryId() {
        if (this.#queryId === undefined) {
            this.#queryId = randomString(8);
        }
        return this.#queryId;
    }
}

/// <reference types="./require-all-props.d.ts" />
/**
 * Helper function to check listed properties according to given type. Check if all properties has been used when object is initialised.
 *
 * Example use:
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 *
 * // propB has to be mentioned even it is optional. It still should be initialized with undefined.
 * const a: SomeType = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
 *
 * // checked type is implicit for variable.
 * const b = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
 * ```
 *
 * Wrong use of this helper:
 *
 * 1. Omit checked type - all checked properties will be expect as of type never
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 * // const z: SomeType = requireAllProps({ propC: "no type will work" }); // Property 'propA' is missing in type '{ propC: string; }' but required in type 'SomeType'.
 * ```
 *
 * 2. Apply to spreaded object - there is no way how to check in compile time if spreaded object contains all properties
 *
 * ```ts
 * type SomeType = { propA: string; propB?: number; }
 * const y: SomeType = { propA: "" }; // valid object according to SomeType declaration
 * // const x = requireAllProps<SomeType>({ ...y }); // Argument of type '{ propA: string; propB?: number; }' is not assignable to parameter of type 'AllProps<SomeType>'.
 * ```
 *
 * @param obj object to check if all properties has been used
 * @returns untouched obj parameter is returned
 */
function requireAllProps(obj) {
    return obj;
}

/// <reference types="./operation-node-transformer.d.ts" />
/**
 * Transforms an operation node tree into another one.
 *
 * Kysely queries are expressed internally as a tree of objects (operation nodes).
 * `OperationNodeTransformer` takes such a tree as its input and returns a
 * transformed deep copy of it. By default the `OperationNodeTransformer`
 * does nothing. You need to override one or more methods to make it do
 * something.
 *
 * There's a method for each node type. For example if you'd like to convert
 * each identifier (table name, column name, alias etc.) from camelCase to
 * snake_case, you'd do something like this:
 *
 * ```ts
 * import { type IdentifierNode, OperationNodeTransformer } from 'kysely'
 * import snakeCase from 'lodash/snakeCase'
 *
 * class CamelCaseTransformer extends OperationNodeTransformer {
 *   override transformIdentifier(node: IdentifierNode): IdentifierNode {
 *     node = super.transformIdentifier(node)
 *
 *     return {
 *       ...node,
 *       name: snakeCase(node.name),
 *     }
 *   }
 * }
 *
 * const transformer = new CamelCaseTransformer()
 *
 * const query = db.selectFrom('person').select(['first_name', 'last_name'])
 *
 * const tree = transformer.transformNode(query.toOperationNode())
 * ```
 */
class OperationNodeTransformer {
    nodeStack = [];
    #transformers = freeze({
        AliasNode: this.transformAlias.bind(this),
        ColumnNode: this.transformColumn.bind(this),
        IdentifierNode: this.transformIdentifier.bind(this),
        SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
        RawNode: this.transformRaw.bind(this),
        ReferenceNode: this.transformReference.bind(this),
        SelectQueryNode: this.transformSelectQuery.bind(this),
        SelectionNode: this.transformSelection.bind(this),
        TableNode: this.transformTable.bind(this),
        FromNode: this.transformFrom.bind(this),
        SelectAllNode: this.transformSelectAll.bind(this),
        AndNode: this.transformAnd.bind(this),
        OrNode: this.transformOr.bind(this),
        ValueNode: this.transformValue.bind(this),
        ValueListNode: this.transformValueList.bind(this),
        PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
        ParensNode: this.transformParens.bind(this),
        JoinNode: this.transformJoin.bind(this),
        OperatorNode: this.transformOperator.bind(this),
        WhereNode: this.transformWhere.bind(this),
        InsertQueryNode: this.transformInsertQuery.bind(this),
        DeleteQueryNode: this.transformDeleteQuery.bind(this),
        ReturningNode: this.transformReturning.bind(this),
        CreateTableNode: this.transformCreateTable.bind(this),
        AddColumnNode: this.transformAddColumn.bind(this),
        ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
        DropTableNode: this.transformDropTable.bind(this),
        DataTypeNode: this.transformDataType.bind(this),
        OrderByNode: this.transformOrderBy.bind(this),
        OrderByItemNode: this.transformOrderByItem.bind(this),
        GroupByNode: this.transformGroupBy.bind(this),
        GroupByItemNode: this.transformGroupByItem.bind(this),
        UpdateQueryNode: this.transformUpdateQuery.bind(this),
        ColumnUpdateNode: this.transformColumnUpdate.bind(this),
        LimitNode: this.transformLimit.bind(this),
        OffsetNode: this.transformOffset.bind(this),
        OnConflictNode: this.transformOnConflict.bind(this),
        OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
        CreateIndexNode: this.transformCreateIndex.bind(this),
        DropIndexNode: this.transformDropIndex.bind(this),
        ListNode: this.transformList.bind(this),
        PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
        UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
        ReferencesNode: this.transformReferences.bind(this),
        CheckConstraintNode: this.transformCheckConstraint.bind(this),
        WithNode: this.transformWith.bind(this),
        CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
        CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
        HavingNode: this.transformHaving.bind(this),
        CreateSchemaNode: this.transformCreateSchema.bind(this),
        DropSchemaNode: this.transformDropSchema.bind(this),
        AlterTableNode: this.transformAlterTable.bind(this),
        DropColumnNode: this.transformDropColumn.bind(this),
        RenameColumnNode: this.transformRenameColumn.bind(this),
        AlterColumnNode: this.transformAlterColumn.bind(this),
        ModifyColumnNode: this.transformModifyColumn.bind(this),
        AddConstraintNode: this.transformAddConstraint.bind(this),
        DropConstraintNode: this.transformDropConstraint.bind(this),
        RenameConstraintNode: this.transformRenameConstraint.bind(this),
        ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
        CreateViewNode: this.transformCreateView.bind(this),
        RefreshMaterializedViewNode: this.transformRefreshMaterializedView.bind(this),
        DropViewNode: this.transformDropView.bind(this),
        GeneratedNode: this.transformGenerated.bind(this),
        DefaultValueNode: this.transformDefaultValue.bind(this),
        OnNode: this.transformOn.bind(this),
        ValuesNode: this.transformValues.bind(this),
        SelectModifierNode: this.transformSelectModifier.bind(this),
        CreateTypeNode: this.transformCreateType.bind(this),
        DropTypeNode: this.transformDropType.bind(this),
        ExplainNode: this.transformExplain.bind(this),
        DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
        AggregateFunctionNode: this.transformAggregateFunction.bind(this),
        OverNode: this.transformOver.bind(this),
        PartitionByNode: this.transformPartitionBy.bind(this),
        PartitionByItemNode: this.transformPartitionByItem.bind(this),
        SetOperationNode: this.transformSetOperation.bind(this),
        BinaryOperationNode: this.transformBinaryOperation.bind(this),
        UnaryOperationNode: this.transformUnaryOperation.bind(this),
        UsingNode: this.transformUsing.bind(this),
        FunctionNode: this.transformFunction.bind(this),
        CaseNode: this.transformCase.bind(this),
        WhenNode: this.transformWhen.bind(this),
        JSONReferenceNode: this.transformJSONReference.bind(this),
        JSONPathNode: this.transformJSONPath.bind(this),
        JSONPathLegNode: this.transformJSONPathLeg.bind(this),
        JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this),
        TupleNode: this.transformTuple.bind(this),
        MergeQueryNode: this.transformMergeQuery.bind(this),
        MatchedNode: this.transformMatched.bind(this),
        AddIndexNode: this.transformAddIndex.bind(this),
        CastNode: this.transformCast.bind(this),
        FetchNode: this.transformFetch.bind(this),
        TopNode: this.transformTop.bind(this),
        OutputNode: this.transformOutput.bind(this),
        OrActionNode: this.transformOrAction.bind(this),
        CollateNode: this.transformCollate.bind(this),
    });
    transformNode(node, queryId) {
        if (!node) {
            return node;
        }
        this.nodeStack.push(node);
        const out = this.transformNodeImpl(node, queryId);
        this.nodeStack.pop();
        return freeze(out);
    }
    transformNodeImpl(node, queryId) {
        return this.#transformers[node.kind](node, queryId);
    }
    transformNodeList(list, queryId) {
        if (!list) {
            return list;
        }
        return freeze(list.map((node) => this.transformNode(node, queryId)));
    }
    transformSelectQuery(node, queryId) {
        return requireAllProps({
            kind: 'SelectQueryNode',
            from: this.transformNode(node.from, queryId),
            selections: this.transformNodeList(node.selections, queryId),
            distinctOn: this.transformNodeList(node.distinctOn, queryId),
            joins: this.transformNodeList(node.joins, queryId),
            groupBy: this.transformNode(node.groupBy, queryId),
            orderBy: this.transformNode(node.orderBy, queryId),
            where: this.transformNode(node.where, queryId),
            frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
            endModifiers: this.transformNodeList(node.endModifiers, queryId),
            limit: this.transformNode(node.limit, queryId),
            offset: this.transformNode(node.offset, queryId),
            with: this.transformNode(node.with, queryId),
            having: this.transformNode(node.having, queryId),
            explain: this.transformNode(node.explain, queryId),
            setOperations: this.transformNodeList(node.setOperations, queryId),
            fetch: this.transformNode(node.fetch, queryId),
            top: this.transformNode(node.top, queryId),
        });
    }
    transformSelection(node, queryId) {
        return requireAllProps({
            kind: 'SelectionNode',
            selection: this.transformNode(node.selection, queryId),
        });
    }
    transformColumn(node, queryId) {
        return requireAllProps({
            kind: 'ColumnNode',
            column: this.transformNode(node.column, queryId),
        });
    }
    transformAlias(node, queryId) {
        return requireAllProps({
            kind: 'AliasNode',
            node: this.transformNode(node.node, queryId),
            alias: this.transformNode(node.alias, queryId),
        });
    }
    transformTable(node, queryId) {
        return requireAllProps({
            kind: 'TableNode',
            table: this.transformNode(node.table, queryId),
        });
    }
    transformFrom(node, queryId) {
        return requireAllProps({
            kind: 'FromNode',
            froms: this.transformNodeList(node.froms, queryId),
        });
    }
    transformReference(node, queryId) {
        return requireAllProps({
            kind: 'ReferenceNode',
            column: this.transformNode(node.column, queryId),
            table: this.transformNode(node.table, queryId),
        });
    }
    transformAnd(node, queryId) {
        return requireAllProps({
            kind: 'AndNode',
            left: this.transformNode(node.left, queryId),
            right: this.transformNode(node.right, queryId),
        });
    }
    transformOr(node, queryId) {
        return requireAllProps({
            kind: 'OrNode',
            left: this.transformNode(node.left, queryId),
            right: this.transformNode(node.right, queryId),
        });
    }
    transformValueList(node, queryId) {
        return requireAllProps({
            kind: 'ValueListNode',
            values: this.transformNodeList(node.values, queryId),
        });
    }
    transformParens(node, queryId) {
        return requireAllProps({
            kind: 'ParensNode',
            node: this.transformNode(node.node, queryId),
        });
    }
    transformJoin(node, queryId) {
        return requireAllProps({
            kind: 'JoinNode',
            joinType: node.joinType,
            table: this.transformNode(node.table, queryId),
            on: this.transformNode(node.on, queryId),
        });
    }
    transformRaw(node, queryId) {
        return requireAllProps({
            kind: 'RawNode',
            sqlFragments: freeze([...node.sqlFragments]),
            parameters: this.transformNodeList(node.parameters, queryId),
        });
    }
    transformWhere(node, queryId) {
        return requireAllProps({
            kind: 'WhereNode',
            where: this.transformNode(node.where, queryId),
        });
    }
    transformInsertQuery(node, queryId) {
        return requireAllProps({
            kind: 'InsertQueryNode',
            into: this.transformNode(node.into, queryId),
            columns: this.transformNodeList(node.columns, queryId),
            values: this.transformNode(node.values, queryId),
            returning: this.transformNode(node.returning, queryId),
            onConflict: this.transformNode(node.onConflict, queryId),
            onDuplicateKey: this.transformNode(node.onDuplicateKey, queryId),
            endModifiers: this.transformNodeList(node.endModifiers, queryId),
            with: this.transformNode(node.with, queryId),
            ignore: node.ignore,
            orAction: this.transformNode(node.orAction, queryId),
            replace: node.replace,
            explain: this.transformNode(node.explain, queryId),
            defaultValues: node.defaultValues,
            top: this.transformNode(node.top, queryId),
            output: this.transformNode(node.output, queryId),
        });
    }
    transformValues(node, queryId) {
        return requireAllProps({
            kind: 'ValuesNode',
            values: this.transformNodeList(node.values, queryId),
        });
    }
    transformDeleteQuery(node, queryId) {
        return requireAllProps({
            kind: 'DeleteQueryNode',
            from: this.transformNode(node.from, queryId),
            using: this.transformNode(node.using, queryId),
            joins: this.transformNodeList(node.joins, queryId),
            where: this.transformNode(node.where, queryId),
            returning: this.transformNode(node.returning, queryId),
            endModifiers: this.transformNodeList(node.endModifiers, queryId),
            with: this.transformNode(node.with, queryId),
            orderBy: this.transformNode(node.orderBy, queryId),
            limit: this.transformNode(node.limit, queryId),
            explain: this.transformNode(node.explain, queryId),
            top: this.transformNode(node.top, queryId),
            output: this.transformNode(node.output, queryId),
        });
    }
    transformReturning(node, queryId) {
        return requireAllProps({
            kind: 'ReturningNode',
            selections: this.transformNodeList(node.selections, queryId),
        });
    }
    transformCreateTable(node, queryId) {
        return requireAllProps({
            kind: 'CreateTableNode',
            table: this.transformNode(node.table, queryId),
            columns: this.transformNodeList(node.columns, queryId),
            constraints: this.transformNodeList(node.constraints, queryId),
            temporary: node.temporary,
            ifNotExists: node.ifNotExists,
            onCommit: node.onCommit,
            frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
            endModifiers: this.transformNodeList(node.endModifiers, queryId),
            selectQuery: this.transformNode(node.selectQuery, queryId),
        });
    }
    transformColumnDefinition(node, queryId) {
        return requireAllProps({
            kind: 'ColumnDefinitionNode',
            column: this.transformNode(node.column, queryId),
            dataType: this.transformNode(node.dataType, queryId),
            references: this.transformNode(node.references, queryId),
            primaryKey: node.primaryKey,
            autoIncrement: node.autoIncrement,
            unique: node.unique,
            notNull: node.notNull,
            unsigned: node.unsigned,
            defaultTo: this.transformNode(node.defaultTo, queryId),
            check: this.transformNode(node.check, queryId),
            generated: this.transformNode(node.generated, queryId),
            frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
            endModifiers: this.transformNodeList(node.endModifiers, queryId),
            nullsNotDistinct: node.nullsNotDistinct,
            identity: node.identity,
            ifNotExists: node.ifNotExists,
        });
    }
    transformAddColumn(node, queryId) {
        return requireAllProps({
            kind: 'AddColumnNode',
            column: this.transformNode(node.column, queryId),
        });
    }
    transformDropTable(node, queryId) {
        return requireAllProps({
            kind: 'DropTableNode',
            table: this.transformNode(node.table, queryId),
            ifExists: node.ifExists,
            cascade: node.cascade,
        });
    }
    transformOrderBy(node, queryId) {
        return requireAllProps({
            kind: 'OrderByNode',
            items: this.transformNodeList(node.items, queryId),
        });
    }
    transformOrderByItem(node, queryId) {
        return requireAllProps({
            kind: 'OrderByItemNode',
            orderBy: this.transformNode(node.orderBy, queryId),
            direction: this.transformNode(node.direction, queryId),
            collation: this.transformNode(node.collation, queryId),
            nulls: node.nulls,
        });
    }
    transformGroupBy(node, queryId) {
        return requireAllProps({
            kind: 'GroupByNode',
            items: this.transformNodeList(node.items, queryId),
        });
    }
    transformGroupByItem(node, queryId) {
        return requireAllProps({
            kind: 'GroupByItemNode',
            groupBy: this.transformNode(node.groupBy, queryId),
        });
    }
    transformUpdateQuery(node, queryId) {
        return requireAllProps({
            kind: 'UpdateQueryNode',
            table: this.transformNode(node.table, queryId),
            from: this.transformNode(node.from, queryId),
            joins: this.transformNodeList(node.joins, queryId),
            where: this.transformNode(node.where, queryId),
            updates: this.transformNodeList(node.updates, queryId),
            returning: this.transformNode(node.returning, queryId),
            endModifiers: this.transformNodeList(node.endModifiers, queryId),
            with: this.transformNode(node.with, queryId),
            explain: this.transformNode(node.explain, queryId),
            limit: this.transformNode(node.limit, queryId),
            top: this.transformNode(node.top, queryId),
            output: this.transformNode(node.output, queryId),
            orderBy: this.transformNode(node.orderBy, queryId),
        });
    }
    transformColumnUpdate(node, queryId) {
        return requireAllProps({
            kind: 'ColumnUpdateNode',
            column: this.transformNode(node.column, queryId),
            value: this.transformNode(node.value, queryId),
        });
    }
    transformLimit(node, queryId) {
        return requireAllProps({
            kind: 'LimitNode',
            limit: this.transformNode(node.limit, queryId),
        });
    }
    transformOffset(node, queryId) {
        return requireAllProps({
            kind: 'OffsetNode',
            offset: this.transformNode(node.offset, queryId),
        });
    }
    transformOnConflict(node, queryId) {
        return requireAllProps({
            kind: 'OnConflictNode',
            columns: this.transformNodeList(node.columns, queryId),
            constraint: this.transformNode(node.constraint, queryId),
            indexExpression: this.transformNode(node.indexExpression, queryId),
            indexWhere: this.transformNode(node.indexWhere, queryId),
            updates: this.transformNodeList(node.updates, queryId),
            updateWhere: this.transformNode(node.updateWhere, queryId),
            doNothing: node.doNothing,
        });
    }
    transformOnDuplicateKey(node, queryId) {
        return requireAllProps({
            kind: 'OnDuplicateKeyNode',
            updates: this.transformNodeList(node.updates, queryId),
        });
    }
    transformCreateIndex(node, queryId) {
        return requireAllProps({
            kind: 'CreateIndexNode',
            name: this.transformNode(node.name, queryId),
            table: this.transformNode(node.table, queryId),
            columns: this.transformNodeList(node.columns, queryId),
            unique: node.unique,
            using: this.transformNode(node.using, queryId),
            ifNotExists: node.ifNotExists,
            where: this.transformNode(node.where, queryId),
            nullsNotDistinct: node.nullsNotDistinct,
        });
    }
    transformList(node, queryId) {
        return requireAllProps({
            kind: 'ListNode',
            items: this.transformNodeList(node.items, queryId),
        });
    }
    transformDropIndex(node, queryId) {
        return requireAllProps({
            kind: 'DropIndexNode',
            name: this.transformNode(node.name, queryId),
            table: this.transformNode(node.table, queryId),
            ifExists: node.ifExists,
            cascade: node.cascade,
        });
    }
    transformPrimaryKeyConstraint(node, queryId) {
        return requireAllProps({
            kind: 'PrimaryKeyConstraintNode',
            columns: this.transformNodeList(node.columns, queryId),
            name: this.transformNode(node.name, queryId),
            deferrable: node.deferrable,
            initiallyDeferred: node.initiallyDeferred,
        });
    }
    transformUniqueConstraint(node, queryId) {
        return requireAllProps({
            kind: 'UniqueConstraintNode',
            columns: this.transformNodeList(node.columns, queryId),
            name: this.transformNode(node.name, queryId),
            nullsNotDistinct: node.nullsNotDistinct,
            deferrable: node.deferrable,
            initiallyDeferred: node.initiallyDeferred,
        });
    }
    transformForeignKeyConstraint(node, queryId) {
        return requireAllProps({
            kind: 'ForeignKeyConstraintNode',
            columns: this.transformNodeList(node.columns, queryId),
            references: this.transformNode(node.references, queryId),
            name: this.transformNode(node.name, queryId),
            onDelete: node.onDelete,
            onUpdate: node.onUpdate,
            deferrable: node.deferrable,
            initiallyDeferred: node.initiallyDeferred,
        });
    }
    transformSetOperation(node, queryId) {
        return requireAllProps({
            kind: 'SetOperationNode',
            operator: node.operator,
            expression: this.transformNode(node.expression, queryId),
            all: node.all,
        });
    }
    transformReferences(node, queryId) {
        return requireAllProps({
            kind: 'ReferencesNode',
            table: this.transformNode(node.table, queryId),
            columns: this.transformNodeList(node.columns, queryId),
            onDelete: node.onDelete,
            onUpdate: node.onUpdate,
        });
    }
    transformCheckConstraint(node, queryId) {
        return requireAllProps({
            kind: 'CheckConstraintNode',
            expression: this.transformNode(node.expression, queryId),
            name: this.transformNode(node.name, queryId),
        });
    }
    transformWith(node, queryId) {
        return requireAllProps({
            kind: 'WithNode',
            expressions: this.transformNodeList(node.expressions, queryId),
            recursive: node.recursive,
        });
    }
    transformCommonTableExpression(node, queryId) {
        return requireAllProps({
            kind: 'CommonTableExpressionNode',
            name: this.transformNode(node.name, queryId),
            materialized: node.materialized,
            expression: this.transformNode(node.expression, queryId),
        });
    }
    transformCommonTableExpressionName(node, queryId) {
        return requireAllProps({
            kind: 'CommonTableExpressionNameNode',
            table: this.transformNode(node.table, queryId),
            columns: this.transformNodeList(node.columns, queryId),
        });
    }
    transformHaving(node, queryId) {
        return requireAllProps({
            kind: 'HavingNode',
            having: this.transformNode(node.having, queryId),
        });
    }
    transformCreateSchema(node, queryId) {
        return requireAllProps({
            kind: 'CreateSchemaNode',
            schema: this.transformNode(node.schema, queryId),
            ifNotExists: node.ifNotExists,
        });
    }
    transformDropSchema(node, queryId) {
        return requireAllProps({
            kind: 'DropSchemaNode',
            schema: this.transformNode(node.schema, queryId),
            ifExists: node.ifExists,
            cascade: node.cascade,
        });
    }
    transformAlterTable(node, queryId) {
        return requireAllProps({
            kind: 'AlterTableNode',
            table: this.transformNode(node.table, queryId),
            renameTo: this.transformNode(node.renameTo, queryId),
            setSchema: this.transformNode(node.setSchema, queryId),
            columnAlterations: this.transformNodeList(node.columnAlterations, queryId),
            addConstraint: this.transformNode(node.addConstraint, queryId),
            dropConstraint: this.transformNode(node.dropConstraint, queryId),
            renameConstraint: this.transformNode(node.renameConstraint, queryId),
            addIndex: this.transformNode(node.addIndex, queryId),
            dropIndex: this.transformNode(node.dropIndex, queryId),
        });
    }
    transformDropColumn(node, queryId) {
        return requireAllProps({
            kind: 'DropColumnNode',
            column: this.transformNode(node.column, queryId),
        });
    }
    transformRenameColumn(node, queryId) {
        return requireAllProps({
            kind: 'RenameColumnNode',
            column: this.transformNode(node.column, queryId),
            renameTo: this.transformNode(node.renameTo, queryId),
        });
    }
    transformAlterColumn(node, queryId) {
        return requireAllProps({
            kind: 'AlterColumnNode',
            column: this.transformNode(node.column, queryId),
            dataType: this.transformNode(node.dataType, queryId),
            dataTypeExpression: this.transformNode(node.dataTypeExpression, queryId),
            setDefault: this.transformNode(node.setDefault, queryId),
            dropDefault: node.dropDefault,
            setNotNull: node.setNotNull,
            dropNotNull: node.dropNotNull,
        });
    }
    transformModifyColumn(node, queryId) {
        return requireAllProps({
            kind: 'ModifyColumnNode',
            column: this.transformNode(node.column, queryId),
        });
    }
    transformAddConstraint(node, queryId) {
        return requireAllProps({
            kind: 'AddConstraintNode',
            constraint: this.transformNode(node.constraint, queryId),
        });
    }
    transformDropConstraint(node, queryId) {
        return requireAllProps({
            kind: 'DropConstraintNode',
            constraintName: this.transformNode(node.constraintName, queryId),
            ifExists: node.ifExists,
            modifier: node.modifier,
        });
    }
    transformRenameConstraint(node, queryId) {
        return requireAllProps({
            kind: 'RenameConstraintNode',
            oldName: this.transformNode(node.oldName, queryId),
            newName: this.transformNode(node.newName, queryId),
        });
    }
    transformCreateView(node, queryId) {
        return requireAllProps({
            kind: 'CreateViewNode',
            name: this.transformNode(node.name, queryId),
            temporary: node.temporary,
            orReplace: node.orReplace,
            ifNotExists: node.ifNotExists,
            materialized: node.materialized,
            columns: this.transformNodeList(node.columns, queryId),
            as: this.transformNode(node.as, queryId),
        });
    }
    transformRefreshMaterializedView(node, queryId) {
        return requireAllProps({
            kind: 'RefreshMaterializedViewNode',
            name: this.transformNode(node.name, queryId),
            concurrently: node.concurrently,
            withNoData: node.withNoData,
        });
    }
    transformDropView(node, queryId) {
        return requireAllProps({
            kind: 'DropViewNode',
            name: this.transformNode(node.name, queryId),
            ifExists: node.ifExists,
            materialized: node.materialized,
            cascade: node.cascade,
        });
    }
    transformGenerated(node, queryId) {
        return requireAllProps({
            kind: 'GeneratedNode',
            byDefault: node.byDefault,
            always: node.always,
            identity: node.identity,
            stored: node.stored,
            expression: this.transformNode(node.expression, queryId),
        });
    }
    transformDefaultValue(node, queryId) {
        return requireAllProps({
            kind: 'DefaultValueNode',
            defaultValue: this.transformNode(node.defaultValue, queryId),
        });
    }
    transformOn(node, queryId) {
        return requireAllProps({
            kind: 'OnNode',
            on: this.transformNode(node.on, queryId),
        });
    }
    transformSelectModifier(node, queryId) {
        return requireAllProps({
            kind: 'SelectModifierNode',
            modifier: node.modifier,
            rawModifier: this.transformNode(node.rawModifier, queryId),
            of: this.transformNodeList(node.of, queryId),
        });
    }
    transformCreateType(node, queryId) {
        return requireAllProps({
            kind: 'CreateTypeNode',
            name: this.transformNode(node.name, queryId),
            enum: this.transformNode(node.enum, queryId),
        });
    }
    transformDropType(node, queryId) {
        return requireAllProps({
            kind: 'DropTypeNode',
            name: this.transformNode(node.name, queryId),
            ifExists: node.ifExists,
        });
    }
    transformExplain(node, queryId) {
        return requireAllProps({
            kind: 'ExplainNode',
            format: node.format,
            options: this.transformNode(node.options, queryId),
        });
    }
    transformSchemableIdentifier(node, queryId) {
        return requireAllProps({
            kind: 'SchemableIdentifierNode',
            schema: this.transformNode(node.schema, queryId),
            identifier: this.transformNode(node.identifier, queryId),
        });
    }
    transformAggregateFunction(node, queryId) {
        return requireAllProps({
            kind: 'AggregateFunctionNode',
            func: node.func,
            aggregated: this.transformNodeList(node.aggregated, queryId),
            distinct: node.distinct,
            orderBy: this.transformNode(node.orderBy, queryId),
            withinGroup: this.transformNode(node.withinGroup, queryId),
            filter: this.transformNode(node.filter, queryId),
            over: this.transformNode(node.over, queryId),
        });
    }
    transformOver(node, queryId) {
        return requireAllProps({
            kind: 'OverNode',
            orderBy: this.transformNode(node.orderBy, queryId),
            partitionBy: this.transformNode(node.partitionBy, queryId),
        });
    }
    transformPartitionBy(node, queryId) {
        return requireAllProps({
            kind: 'PartitionByNode',
            items: this.transformNodeList(node.items, queryId),
        });
    }
    transformPartitionByItem(node, queryId) {
        return requireAllProps({
            kind: 'PartitionByItemNode',
            partitionBy: this.transformNode(node.partitionBy, queryId),
        });
    }
    transformBinaryOperation(node, queryId) {
        return requireAllProps({
            kind: 'BinaryOperationNode',
            leftOperand: this.transformNode(node.leftOperand, queryId),
            operator: this.transformNode(node.operator, queryId),
            rightOperand: this.transformNode(node.rightOperand, queryId),
        });
    }
    transformUnaryOperation(node, queryId) {
        return requireAllProps({
            kind: 'UnaryOperationNode',
            operator: this.transformNode(node.operator, queryId),
            operand: this.transformNode(node.operand, queryId),
        });
    }
    transformUsing(node, queryId) {
        return requireAllProps({
            kind: 'UsingNode',
            tables: this.transformNodeList(node.tables, queryId),
        });
    }
    transformFunction(node, queryId) {
        return requireAllProps({
            kind: 'FunctionNode',
            func: node.func,
            arguments: this.transformNodeList(node.arguments, queryId),
        });
    }
    transformCase(node, queryId) {
        return requireAllProps({
            kind: 'CaseNode',
            value: this.transformNode(node.value, queryId),
            when: this.transformNodeList(node.when, queryId),
            else: this.transformNode(node.else, queryId),
            isStatement: node.isStatement,
        });
    }
    transformWhen(node, queryId) {
        return requireAllProps({
            kind: 'WhenNode',
            condition: this.transformNode(node.condition, queryId),
            result: this.transformNode(node.result, queryId),
        });
    }
    transformJSONReference(node, queryId) {
        return requireAllProps({
            kind: 'JSONReferenceNode',
            reference: this.transformNode(node.reference, queryId),
            traversal: this.transformNode(node.traversal, queryId),
        });
    }
    transformJSONPath(node, queryId) {
        return requireAllProps({
            kind: 'JSONPathNode',
            inOperator: this.transformNode(node.inOperator, queryId),
            pathLegs: this.transformNodeList(node.pathLegs, queryId),
        });
    }
    transformJSONPathLeg(node, _queryId) {
        return requireAllProps({
            kind: 'JSONPathLegNode',
            type: node.type,
            value: node.value,
        });
    }
    transformJSONOperatorChain(node, queryId) {
        return requireAllProps({
            kind: 'JSONOperatorChainNode',
            operator: this.transformNode(node.operator, queryId),
            values: this.transformNodeList(node.values, queryId),
        });
    }
    transformTuple(node, queryId) {
        return requireAllProps({
            kind: 'TupleNode',
            values: this.transformNodeList(node.values, queryId),
        });
    }
    transformMergeQuery(node, queryId) {
        return requireAllProps({
            kind: 'MergeQueryNode',
            into: this.transformNode(node.into, queryId),
            using: this.transformNode(node.using, queryId),
            whens: this.transformNodeList(node.whens, queryId),
            with: this.transformNode(node.with, queryId),
            top: this.transformNode(node.top, queryId),
            endModifiers: this.transformNodeList(node.endModifiers, queryId),
            output: this.transformNode(node.output, queryId),
            returning: this.transformNode(node.returning, queryId),
        });
    }
    transformMatched(node, _queryId) {
        return requireAllProps({
            kind: 'MatchedNode',
            not: node.not,
            bySource: node.bySource,
        });
    }
    transformAddIndex(node, queryId) {
        return requireAllProps({
            kind: 'AddIndexNode',
            name: this.transformNode(node.name, queryId),
            columns: this.transformNodeList(node.columns, queryId),
            unique: node.unique,
            using: this.transformNode(node.using, queryId),
            ifNotExists: node.ifNotExists,
        });
    }
    transformCast(node, queryId) {
        return requireAllProps({
            kind: 'CastNode',
            expression: this.transformNode(node.expression, queryId),
            dataType: this.transformNode(node.dataType, queryId),
        });
    }
    transformFetch(node, queryId) {
        return requireAllProps({
            kind: 'FetchNode',
            rowCount: this.transformNode(node.rowCount, queryId),
            modifier: node.modifier,
        });
    }
    transformTop(node, _queryId) {
        return requireAllProps({
            kind: 'TopNode',
            expression: node.expression,
            modifiers: node.modifiers,
        });
    }
    transformOutput(node, queryId) {
        return requireAllProps({
            kind: 'OutputNode',
            selections: this.transformNodeList(node.selections, queryId),
        });
    }
    transformDataType(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformSelectAll(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformIdentifier(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformValue(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformPrimitiveValueList(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformOperator(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformDefaultInsertValue(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformOrAction(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
    transformCollate(node, _queryId) {
        // An Object.freezed leaf node. No need to clone.
        return node;
    }
}

/// <reference types="./with-schema-transformer.d.ts" />
// This object exist only so that we get a type error when a new RootOperationNode
// is added. If you get a type error here, make sure to add the new root node and
// handle it correctly in the transformer.
//
// DO NOT REFACTOR THIS EVEN IF IT SEEMS USELESS TO YOU!
const ROOT_OPERATION_NODES = freeze({
    AlterTableNode: true,
    CreateIndexNode: true,
    CreateSchemaNode: true,
    CreateTableNode: true,
    CreateTypeNode: true,
    CreateViewNode: true,
    RefreshMaterializedViewNode: true,
    DeleteQueryNode: true,
    DropIndexNode: true,
    DropSchemaNode: true,
    DropTableNode: true,
    DropTypeNode: true,
    DropViewNode: true,
    InsertQueryNode: true,
    RawNode: true,
    SelectQueryNode: true,
    UpdateQueryNode: true,
    MergeQueryNode: true,
});
const SCHEMALESS_FUNCTIONS = {
    json_agg: true,
    to_json: true,
};
class WithSchemaTransformer extends OperationNodeTransformer {
    #schema;
    #schemableIds = new Set();
    #ctes = new Set();
    constructor(schema) {
        super();
        this.#schema = schema;
    }
    transformNodeImpl(node, queryId) {
        if (!this.#isRootOperationNode(node)) {
            return super.transformNodeImpl(node, queryId);
        }
        const ctes = this.#collectCTEs(node);
        for (const cte of ctes) {
            this.#ctes.add(cte);
        }
        const tables = this.#collectSchemableIds(node);
        for (const table of tables) {
            this.#schemableIds.add(table);
        }
        const transformed = super.transformNodeImpl(node, queryId);
        for (const table of tables) {
            this.#schemableIds.delete(table);
        }
        for (const cte of ctes) {
            this.#ctes.delete(cte);
        }
        return transformed;
    }
    transformSchemableIdentifier(node, queryId) {
        const transformed = super.transformSchemableIdentifier(node, queryId);
        if (transformed.schema || !this.#schemableIds.has(node.identifier.name)) {
            return transformed;
        }
        return {
            ...transformed,
            schema: IdentifierNode.create(this.#schema),
        };
    }
    transformReferences(node, queryId) {
        const transformed = super.transformReferences(node, queryId);
        if (transformed.table.table.schema) {
            return transformed;
        }
        return {
            ...transformed,
            table: TableNode.createWithSchema(this.#schema, transformed.table.table.identifier.name),
        };
    }
    transformAggregateFunction(node, queryId) {
        return {
            ...super.transformAggregateFunction({ ...node, aggregated: [] }, queryId),
            aggregated: this.#transformTableArgsWithoutSchemas(node, queryId, 'aggregated'),
        };
    }
    transformFunction(node, queryId) {
        return {
            ...super.transformFunction({ ...node, arguments: [] }, queryId),
            arguments: this.#transformTableArgsWithoutSchemas(node, queryId, 'arguments'),
        };
    }
    transformSelectModifier(node, queryId) {
        return {
            ...super.transformSelectModifier({ ...node, of: undefined }, queryId),
            of: node.of?.map((item) => TableNode.is(item) && !item.table.schema
                ? {
                    ...item,
                    table: this.transformIdentifier(item.table.identifier, queryId),
                }
                : this.transformNode(item, queryId)),
        };
    }
    #transformTableArgsWithoutSchemas(node, queryId, argsKey) {
        return SCHEMALESS_FUNCTIONS[node.func]
            ? node[argsKey].map((arg) => !TableNode.is(arg) || arg.table.schema
                ? this.transformNode(arg, queryId)
                : {
                    ...arg,
                    table: this.transformIdentifier(arg.table.identifier, queryId),
                })
            : this.transformNodeList(node[argsKey], queryId);
    }
    #isRootOperationNode(node) {
        return node.kind in ROOT_OPERATION_NODES;
    }
    #collectSchemableIds(node) {
        const schemableIds = new Set();
        if ('name' in node && node.name && SchemableIdentifierNode.is(node.name)) {
            this.#collectSchemableId(node.name, schemableIds);
        }
        if ('from' in node && node.from) {
            for (const from of node.from.froms) {
                this.#collectSchemableIdsFromTableExpr(from, schemableIds);
            }
        }
        if ('into' in node && node.into) {
            this.#collectSchemableIdsFromTableExpr(node.into, schemableIds);
        }
        if ('table' in node && node.table) {
            this.#collectSchemableIdsFromTableExpr(node.table, schemableIds);
        }
        if ('joins' in node && node.joins) {
            for (const join of node.joins) {
                this.#collectSchemableIdsFromTableExpr(join.table, schemableIds);
            }
        }
        if ('using' in node && node.using) {
            if (JoinNode.is(node.using)) {
                this.#collectSchemableIdsFromTableExpr(node.using.table, schemableIds);
            }
            else {
                this.#collectSchemableIdsFromTableExpr(node.using, schemableIds);
            }
        }
        return schemableIds;
    }
    #collectCTEs(node) {
        const ctes = new Set();
        if ('with' in node && node.with) {
            this.#collectCTEIds(node.with, ctes);
        }
        return ctes;
    }
    #collectSchemableIdsFromTableExpr(node, schemableIds) {
        if (TableNode.is(node)) {
            return this.#collectSchemableId(node.table, schemableIds);
        }
        if (AliasNode.is(node) && TableNode.is(node.node)) {
            return this.#collectSchemableId(node.node.table, schemableIds);
        }
        if (ListNode.is(node)) {
            for (const table of node.items) {
                this.#collectSchemableIdsFromTableExpr(table, schemableIds);
            }
            return;
        }
        if (UsingNode.is(node)) {
            for (const table of node.tables) {
                this.#collectSchemableIdsFromTableExpr(table, schemableIds);
            }
            return;
        }
    }
    #collectSchemableId(node, schemableIds) {
        const id = node.identifier.name;
        if (!this.#schemableIds.has(id) && !this.#ctes.has(id)) {
            schemableIds.add(id);
        }
    }
    #collectCTEIds(node, ctes) {
        for (const expr of node.expressions) {
            const cteId = expr.name.table.table.identifier.name;
            if (!this.#ctes.has(cteId)) {
                ctes.add(cteId);
            }
        }
    }
}

/// <reference types="./with-schema-plugin.d.ts" />
class WithSchemaPlugin {
    #transformer;
    constructor(schema) {
        this.#transformer = new WithSchemaTransformer(schema);
    }
    transformQuery(args) {
        return this.#transformer.transformNode(args.node, args.queryId);
    }
    async transformResult(args) {
        return args.result;
    }
}

/// <reference types="./matched-node.d.ts" />
/**
 * @internal
 */
const MatchedNode = freeze({
    is(node) {
        return node.kind === 'MatchedNode';
    },
    create(not, bySource = false) {
        return freeze({
            kind: 'MatchedNode',
            not,
            bySource,
        });
    },
});

/// <reference types="./merge-parser.d.ts" />
function parseMergeWhen(type, args, refRight) {
    return WhenNode.create(parseFilterList([
        MatchedNode.create(!type.isMatched, type.bySource),
        ...(args && args.length > 0
            ? [
                args.length === 3 && refRight
                    ? parseReferentialBinaryOperation(args[0], args[1], args[2])
                    : parseValueBinaryOperationOrExpression(args),
            ]
            : []),
    ], 'and', false));
}
function parseMergeThen(result) {
    if (isString(result)) {
        return RawNode.create([result], []);
    }
    if (isOperationNodeSource(result)) {
        return result.toOperationNode();
    }
    return result;
}

/// <reference types="./deferred.d.ts" />
class Deferred {
    #promise;
    #resolve;
    #reject;
    constructor() {
        this.#promise = new Promise((resolve, reject) => {
            this.#reject = reject;
            this.#resolve = resolve;
        });
    }
    get promise() {
        return this.#promise;
    }
    resolve = (value) => {
        if (this.#resolve) {
            this.#resolve(value);
        }
    };
    reject = (reason) => {
        if (this.#reject) {
            this.#reject(reason);
        }
    };
}

/// <reference types="./provide-controlled-connection.d.ts" />
async function provideControlledConnection(connectionProvider) {
    const connectionDefer = new Deferred();
    const connectionReleaseDefer = new Deferred();
    connectionProvider
        .provideConnection(async (connection) => {
        connectionDefer.resolve(connection);
        return await connectionReleaseDefer.promise;
    })
        .catch((ex) => connectionDefer.reject(ex));
    // Create composite of the connection and the release method instead of
    // modifying the connection or creating a new nesting `DatabaseConnection`.
    // This way we don't accidentally override any methods of 3rd party
    // connections and don't return wrapped connections to drivers that
    // expect a certain specific connection class.
    return freeze({
        connection: await connectionDefer.promise,
        release: connectionReleaseDefer.resolve,
    });
}

/// <reference types="./query-executor-base.d.ts" />
const NO_PLUGINS = freeze([]);
class QueryExecutorBase {
    #plugins;
    constructor(plugins = NO_PLUGINS) {
        this.#plugins = plugins;
    }
    get plugins() {
        return this.#plugins;
    }
    transformQuery(node, queryId) {
        for (const plugin of this.#plugins) {
            const transformedNode = plugin.transformQuery({ node, queryId });
            // We need to do a runtime check here. There is no good way
            // to write types that enforce this constraint.
            if (transformedNode.kind === node.kind) {
                node = transformedNode;
            }
            else {
                throw new Error([
                    `KyselyPlugin.transformQuery must return a node`,
                    `of the same kind that was given to it.`,
                    `The plugin was given a ${node.kind}`,
                    `but it returned a ${transformedNode.kind}`,
                ].join(' '));
            }
        }
        return node;
    }
    async executeQuery(compiledQuery) {
        return await this.provideConnection(async (connection) => {
            const result = await connection.executeQuery(compiledQuery);
            if ('numUpdatedOrDeletedRows' in result) {
                logOnce('kysely:warning: outdated driver/plugin detected! `QueryResult.numUpdatedOrDeletedRows` has been replaced with `QueryResult.numAffectedRows`.');
            }
            return await this.#transformResult(result, compiledQuery.queryId);
        });
    }
    async *stream(compiledQuery, chunkSize) {
        const { connection, release } = await provideControlledConnection(this);
        try {
            for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
                yield await this.#transformResult(result, compiledQuery.queryId);
            }
        }
        finally {
            release();
        }
    }
    async #transformResult(result, queryId) {
        for (const plugin of this.#plugins) {
            result = await plugin.transformResult({ result, queryId });
        }
        return result;
    }
}

/// <reference types="./noop-query-executor.d.ts" />
/**
 * A {@link QueryExecutor} subclass that can be used when you don't
 * have a {@link QueryCompiler}, {@link ConnectionProvider} or any
 * other needed things to actually execute queries.
 */
class NoopQueryExecutor extends QueryExecutorBase {
    get adapter() {
        throw new Error('this query cannot be compiled to SQL');
    }
    compileQuery() {
        throw new Error('this query cannot be compiled to SQL');
    }
    provideConnection() {
        throw new Error('this query cannot be executed');
    }
    withConnectionProvider() {
        throw new Error('this query cannot have a connection provider');
    }
    withPlugin(plugin) {
        return new NoopQueryExecutor([...this.plugins, plugin]);
    }
    withPlugins(plugins) {
        return new NoopQueryExecutor([...this.plugins, ...plugins]);
    }
    withPluginAtFront(plugin) {
        return new NoopQueryExecutor([plugin, ...this.plugins]);
    }
    withoutPlugins() {
        return new NoopQueryExecutor([]);
    }
}
const NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();

/// <reference types="./merge-result.d.ts" />
class MergeResult {
    numChangedRows;
    constructor(numChangedRows) {
        this.numChangedRows = numChangedRows;
    }
}

/// <reference types="./merge-query-builder.d.ts" />
class MergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * Changes a `merge into` query to an `merge top into` query.
     *
     * `top` clause is only supported by some dialects like MS SQL Server.
     *
     * ### Examples
     *
     * Affect 5 matched rows at most:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(5)
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(5) into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     *
     * Affect 50% of matched rows:
     *
     * ```ts
     * await db.mergeInto('person')
     *   .top(50, 'percent')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (MS SQL Server):
     *
     * ```sql
     * merge top(50) percent into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    top(expression, modifiers) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    using(...args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithUsing(this.#props.queryNode, parseJoin('Using', args)),
        });
    }
    returning(args) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    returningAll(table) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    output(args) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new MergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
}
class WheneableMergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .mergeInto('person')
     *   .using('pet', 'pet.owner_id', 'person.id')
     *   .whenMatched()
     *   .thenDelete()
     *   .modifyEnd(sql.raw('-- this is a comment'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
     * ```
     */
    modifyEnd(modifier) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, modifier.toOperationNode()),
        });
    }
    /**
     * See {@link MergeQueryBuilder.top}.
     */
    top(expression, modifiers) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    /**
     * Adds a simple `when matched` clause to the query.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * For a simple `when not matched` clause, see {@link whenNotMatched}.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    whenMatched() {
        return this.#whenMatched([]);
    }
    whenMatchedAnd(...args) {
        return this.#whenMatched(args);
    }
    /**
     * Adds the `when matched` clause to the query with an `and` condition. But unlike
     * {@link whenMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */
    whenMatchedAndRef(lhs, op, rhs) {
        return this.#whenMatched([lhs, op, rhs], true);
    }
    #whenMatched(args, refRight) {
        return new MatchedThenableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithWhen(this.#props.queryNode, parseMergeWhen({ isMatched: true }, args, refRight)),
        });
    }
    /**
     * Adds a simple `when not matched` clause to the query.
     *
     * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
     *
     * For a simple `when matched` clause, see {@link whenMatched}.
     *
     * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenInsertValues({
     *     first_name: 'John',
     *     last_name: 'Doe',
     *   })
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   insert ("first_name", "last_name") values ($1, $2)
     * ```
     */
    whenNotMatched() {
        return this.#whenNotMatched([]);
    }
    whenNotMatchedAnd(...args) {
        return this.#whenNotMatched(args);
    }
    /**
     * Adds the `when not matched` clause to the query with an `and` condition. But unlike
     * {@link whenNotMatchedAnd}, this method accepts a column reference as the 3rd argument.
     *
     * Unlike {@link whenMatchedAndRef}, you cannot reference columns from the target table.
     *
     * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
     * for that method for more examples.
     */
    whenNotMatchedAndRef(lhs, op, rhs) {
        return this.#whenNotMatched([lhs, op, rhs], true);
    }
    /**
     * Adds a simple `when not matched by source` clause to the query.
     *
     * Supported in MS SQL Server.
     *
     * Similar to {@link whenNotMatched}, but returns a {@link MatchedThenableMergeQueryBuilder}.
     */
    whenNotMatchedBySource() {
        return this.#whenNotMatched([], false, true);
    }
    whenNotMatchedBySourceAnd(...args) {
        return this.#whenNotMatched(args, false, true);
    }
    /**
     * Adds the `when not matched by source` clause to the query with an `and` condition.
     *
     * Similar to {@link whenNotMatchedAndRef}, but you can reference columns from
     * the target table, and not from source table and returns a {@link MatchedThenableMergeQueryBuilder}.
     */
    whenNotMatchedBySourceAndRef(lhs, op, rhs) {
        return this.#whenNotMatched([lhs, op, rhs], true, true);
    }
    returning(args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    returningAll(table) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    output(args) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectArg(args)),
        });
    }
    outputAll(table) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: QueryNode.cloneWithOutput(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    #whenNotMatched(args, refRight = false, bySource = false) {
        const props = {
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithWhen(this.#props.queryNode, parseMergeWhen({ isMatched: false, bySource }, args, refRight)),
        };
        const Builder = bySource
            ? MatchedThenableMergeQueryBuilder
            : NotMatchedThenableMergeQueryBuilder;
        return new Builder(props);
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * import type { Compilable } from 'kysely'
     *
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * await db.updateTable('person')
     *   .set({ first_name: 'John' })
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * import type { PersonUpdate } from 'type-editor' // imaginary module
     *
     * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * Promise<{
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }>
     * ```
     */
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new WheneableMergeQueryBuilder({
            ...this.#props,
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        const { adapter } = this.#props.executor;
        const query = compiledQuery.query;
        if ((query.returning && adapter.supportsReturning) ||
            (query.output && adapter.supportsOutput)) {
            return result.rows;
        }
        return [new MergeResult(result.numAffectedRows)];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
}
class MatchedThenableMergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Performs the `delete` action.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDelete()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   delete
     * ```
     */
    thenDelete() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen('delete')),
        });
    }
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   do nothing
     * ```
     */
    thenDoNothing() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen('do nothing')),
        });
    }
    /**
     * Perform an `update` operation with a full-fledged {@link UpdateQueryBuilder}.
     * This is handy when multiple `set` invocations are needed.
     *
     * For a shorthand version of this method, see {@link thenUpdateSet}.
     *
     * To perform the `delete` action, see {@link thenDelete}.
     *
     * To perform the `do nothing` action, see {@link thenDoNothing}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenMatched()
     *   .thenUpdate((ub) => ub
     *     .set(sql`metadata['has_pets']`, 'Y')
     *     .set({
     *       updated_at: new Date().toISOString(),
     *     })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when matched then
     *   update set metadata['has_pets'] = $1, "updated_at" = $2
     * ```
     */
    thenUpdate(set) {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen(set(new UpdateQueryBuilder({
                queryId: this.#props.queryId,
                executor: NOOP_QUERY_EXECUTOR,
                queryNode: UpdateQueryNode.createWithoutTable(),
            })))),
        });
    }
    thenUpdateSet(...args) {
        // @ts-ignore not sure how to type this so it won't complain about set(...args).
        return this.thenUpdate((ub) => ub.set(...args));
    }
}
class NotMatchedThenableMergeQueryBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Performs the `do nothing` action.
     *
     * This is supported in PostgreSQL.
     *
     * To perform the `insert` action, see {@link thenInsertValues}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db.mergeInto('person')
     *   .using('pet', 'person.id', 'pet.owner_id')
     *   .whenNotMatched()
     *   .thenDoNothing()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet" on "person"."id" = "pet"."owner_id"
     * when not matched then
     *   do nothing
     * ```
     */
    thenDoNothing() {
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen('do nothing')),
        });
    }
    thenInsertValues(insert) {
        const [columns, values] = parseInsertExpression(insert);
        return new WheneableMergeQueryBuilder({
            ...this.#props,
            queryNode: MergeQueryNode.cloneWithThen(this.#props.queryNode, parseMergeThen(InsertQueryNode.cloneWith(InsertQueryNode.createWithoutInto(), {
                columns,
                values,
            }))),
        });
    }
}

/// <reference types="./query-creator.d.ts" />
class QueryCreator {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Creates a `select` query builder for the given table or tables.
     *
     * The tables passed to this method are built as the query's `from` clause.
     *
     * ### Examples
     *
     * Create a select query for one table:
     *
     * ```ts
     * db.selectFrom('person').selectAll()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     *
     * Create a select query for one table with an alias:
     *
     * ```ts
     * const persons = await db.selectFrom('person as p')
     *   .select(['p.id', 'first_name'])
     *   .execute()
     *
     * console.log(persons[0].id)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."id", "first_name" from "person" as "p"
     * ```
     *
     * Create a select query from a subquery:
     *
     * ```ts
     * const persons = await db.selectFrom(
     *     (eb) => eb.selectFrom('person').select('person.id as identifier').as('p')
     *   )
     *   .select('p.identifier')
     *   .execute()
     *
     * console.log(persons[0].identifier)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."identifier",
     * from (
     *   select "person"."id" as "identifier" from "person"
     * ) as p
     * ```
     *
     * Create a select query from raw sql:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db
     *   .selectFrom(sql<{ one: number }>`(select 1 as one)`.as('q'))
     *   .select('q.one')
     *   .execute()
     *
     * console.log(items[0].one)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "q"."one",
     * from (
     *   select 1 as one
     * ) as q
     * ```
     *
     * When you use the `sql` tag you need to also provide the result type of the
     * raw snippet / query so that Kysely can figure out what columns are
     * available for the rest of the query.
     *
     * The `selectFrom` method also accepts an array for multiple tables. All
     * the above examples can also be used in an array.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db.selectFrom([
     *     'person as p',
     *     db.selectFrom('pet').select('pet.species').as('a'),
     *     sql<{ one: number }>`(select 1 as one)`.as('q')
     *   ])
     *   .select(['p.id', 'a.species', 'q.one'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p".id, "a"."species", "q"."one"
     * from
     *   "person" as "p",
     *   (select "pet"."species" from "pet") as a,
     *   (select 1 as one) as "q"
     * ```
     */
    selectFrom(from) {
        return createSelectQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(from), this.#props.withNode),
        });
    }
    selectNoFrom(selection) {
        return createSelectQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(this.#props.withNode), parseSelectArg(selection)),
        });
    }
    /**
     * Creates an insert query.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
     * the {@link ReturningInterface.returning | returning} method for a way to return columns
     * on supported databases like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     *
     * Some databases like PostgreSQL support the `returning` method:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     * ```
     */
    insertInto(table) {
        return new InsertQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode),
        });
    }
    /**
     * Creates a "replace into" query.
     *
     * This is only supported by some dialects like MySQL or SQLite.
     *
     * Similar to MySQL's {@link InsertQueryBuilder.onDuplicateKeyUpdate} that deletes
     * and inserts values on collision instead of updating existing rows.
     *
     * An alias of SQLite's {@link InsertQueryBuilder.orReplace}.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .replaceInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirstOrThrow()
     *
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * replace into `person` (`first_name`, `last_name`) values (?, ?)
     * ```
     */
    replaceInto(table) {
        return new InsertQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode, true),
        });
    }
    /**
     * Creates a delete query.
     *
     * See the {@link DeleteQueryBuilder.where} method for examples on how to specify
     * a where clause for the delete operation.
     *
     * The return value of the query is an instance of {@link DeleteResult}.
     *
     * ### Examples
     *
     * <!-- siteExample("delete", "Single row", 10) -->
     *
     * Delete a single row:
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('person')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numDeletedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * delete from "person" where "person"."id" = $1
     * ```
     *
     * Some databases such as MySQL support deleting from multiple tables:
     *
     * ```ts
     * const result = await db
     *   .deleteFrom(['person', 'pet'])
     *   .using('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `person`, `pet`
     * using `person`
     * inner join `pet` on `pet`.`owner_id` = `person`.`id`
     * where `person`.`id` = ?
     * ```
     */
    deleteFrom(from) {
        return new DeleteQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: DeleteQueryNode.create(parseTableExpressionOrList(from), this.#props.withNode),
        });
    }
    /**
     * Creates an update query.
     *
     * See the {@link UpdateQueryBuilder.where} method for examples on how to specify
     * a where clause for the update operation.
     *
     * See the {@link UpdateQueryBuilder.set} method for examples on how to
     * specify the updates.
     *
     * The return value of the query is an {@link UpdateResult}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .updateTable('person')
     *   .set({ first_name: 'Jennifer' })
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numUpdatedRows)
     * ```
     */
    updateTable(tables) {
        return new UpdateQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: UpdateQueryNode.create(parseTableExpressionOrList(tables), this.#props.withNode),
        });
    }
    /**
     * Creates a merge query.
     *
     * The return value of the query is a {@link MergeResult}.
     *
     * See the {@link MergeQueryBuilder.using} method for examples on how to specify
     * the other table.
     *
     * ### Examples
     *
     * <!-- siteExample("merge", "Source row existence", 10) -->
     *
     * Update a target column based on the existence of a source row:
     *
     * ```ts
     * const result = await db
     *   .mergeInto('person as target')
     *   .using('pet as source', 'source.owner_id', 'target.id')
     *   .whenMatchedAnd('target.has_pets', '!=', 'Y')
     *   .thenUpdateSet({ has_pets: 'Y' })
     *   .whenNotMatchedBySourceAnd('target.has_pets', '=', 'Y')
     *   .thenUpdateSet({ has_pets: 'N' })
     *   .executeTakeFirstOrThrow()
     *
     * console.log(result.numChangedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "person"
     * using "pet"
     * on "pet"."owner_id" = "person"."id"
     * when matched and "has_pets" != $1
     * then update set "has_pets" = $2
     * when not matched by source and "has_pets" = $3
     * then update set "has_pets" = $4
     * ```
     *
     * <!-- siteExample("merge", "Temporary changes table", 20) -->
     *
     * Merge new entries from a temporary changes table:
     *
     * ```ts
     * const result = await db
     *   .mergeInto('wine as target')
     *   .using(
     *     'wine_stock_change as source',
     *     'source.wine_name',
     *     'target.name',
     *   )
     *   .whenNotMatchedAnd('source.stock_delta', '>', 0)
     *   .thenInsertValues(({ ref }) => ({
     *     name: ref('source.wine_name'),
     *     stock: ref('source.stock_delta'),
     *   }))
     *   .whenMatchedAnd(
     *     (eb) => eb('target.stock', '+', eb.ref('source.stock_delta')),
     *     '>',
     *     0,
     *   )
     *   .thenUpdateSet('stock', (eb) =>
     *     eb('target.stock', '+', eb.ref('source.stock_delta')),
     *   )
     *   .whenMatched()
     *   .thenDelete()
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * merge into "wine" as "target"
     * using "wine_stock_change" as "source"
     * on "source"."wine_name" = "target"."name"
     * when not matched and "source"."stock_delta" > $1
     * then insert ("name", "stock") values ("source"."wine_name", "source"."stock_delta")
     * when matched and "target"."stock" + "source"."stock_delta" > $2
     * then update set "stock" = "target"."stock" + "source"."stock_delta"
     * when matched
     * then delete
     * ```
     */
    mergeInto(targetTable) {
        return new MergeQueryBuilder({
            queryId: createQueryId(),
            executor: this.#props.executor,
            queryNode: MergeQueryNode.create(parseAliasedTable(targetTable), this.#props.withNode),
        });
    }
    /**
     * Creates a `with` query (Common Table Expression).
     *
     * ### Examples
     *
     * <!-- siteExample("cte", "Simple selects", 10) -->
     *
     * Common table expressions (CTE) are a great way to modularize complex queries.
     * Essentially they allow you to run multiple separate queries within a
     * single roundtrip to the DB.
     *
     * Since CTEs are a part of the main query, query optimizers inside DB
     * engines are able to optimize the overall query. For example, postgres
     * is able to inline the CTEs inside the using queries if it decides it's
     * faster.
     *
     * ```ts
     * const result = await db
     *   // Create a CTE called `jennifers` that selects all
     *   // persons named 'Jennifer'.
     *   .with('jennifers', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     .select(['id', 'age'])
     *   )
     *   // Select all rows from the `jennifers` CTE and
     *   // further filter it.
     *   .with('adult_jennifers', (db) => db
     *     .selectFrom('jennifers')
     *     .where('age', '>', 18)
     *     .select(['id', 'age'])
     *   )
     *   // Finally select all adult jennifers that are
     *   // also younger than 60.
     *   .selectFrom('adult_jennifers')
     *   .where('age', '<', 60)
     *   .selectAll()
     *   .execute()
     * ```
     *
     * <!-- siteExample("cte", "Inserts, updates and deletions", 20) -->
     *
     * Some databases like postgres also allow you to run other queries than selects
     * in CTEs. On these databases CTEs are extremely powerful:
     *
     * ```ts
     * const result = await db
     *   .with('new_person', (db) => db
     *     .insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       age: 35,
     *     })
     *     .returning('id')
     *   )
     *   .with('new_pet', (db) => db
     *     .insertInto('pet')
     *     .values({
     *       name: 'Doggo',
     *       species: 'dog',
     *       is_favorite: true,
     *       // Use the id of the person we just inserted.
     *       owner_id: db
     *         .selectFrom('new_person')
     *         .select('id')
     *     })
     *     .returning('id')
     *   )
     *   .selectFrom(['new_person', 'new_pet'])
     *   .select([
     *     'new_person.id as person_id',
     *     'new_pet.id as pet_id'
     *   ])
     *   .execute()
     * ```
     *
     * The CTE name can optionally specify column names in addition to
     * a name. In that case Kysely requires the expression to retun
     * rows with the same columns.
     *
     * ```ts
     * await db
     *   .with('jennifers(id, age)', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     // This is ok since we return columns with the same
     *     // names as specified by `jennifers(id, age)`.
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The first argument can also be a callback. The callback is passed
     * a `CTEBuilder` instance that can be used to configure the CTE:
     *
     * ```ts
     * await db
     *   .with(
     *     (cte) => cte('jennifers').materialized(),
     *     (db) => db
     *       .selectFrom('person')
     *       .where('first_name', '=', 'Jennifer')
     *       .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     */
    with(nameOrBuilder, expression) {
        const cte = parseCommonTableExpression(nameOrBuilder, expression);
        return new QueryCreator({
            ...this.#props,
            withNode: this.#props.withNode
                ? WithNode.cloneWithExpression(this.#props.withNode, cte)
                : WithNode.create(cte),
        });
    }
    /**
     * Creates a recursive `with` query (Common Table Expression).
     *
     * Note that recursiveness is a property of the whole `with` statement.
     * You cannot have recursive and non-recursive CTEs in a same `with` statement.
     * Therefore the recursiveness is determined by the **first** `with` or
     * `withRecusive` call you make.
     *
     * See the {@link with} method for examples and more documentation.
     */
    withRecursive(nameOrBuilder, expression) {
        const cte = parseCommonTableExpression(nameOrBuilder, expression);
        return new QueryCreator({
            ...this.#props,
            withNode: this.#props.withNode
                ? WithNode.cloneWithExpression(this.#props.withNode, cte)
                : WithNode.create(cte, { recursive: true }),
        });
    }
    /**
     * Returns a copy of this query creator instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    /**
     * Returns a copy of this query creator instance without any plugins.
     */
    withoutPlugins() {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins(),
        });
    }
    /**
     * Sets the schema to be used for all table references that don't explicitly
     * specify a schema.
     *
     * This only affects the query created through the builder returned from
     * this method and doesn't modify the `db` instance.
     *
     * See [this recipe](https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0007-schemas.md)
     * for a more detailed explanation.
     *
     * ### Examples
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet')
     *   .selectAll()
     *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "mammals"."pet"
     * inner join "public"."person"
     * on "public"."person"."id" = "mammals"."pet"."owner_id"
     * ```
     *
     * `withSchema` is smart enough to not add schema for aliases,
     * common table expressions or other places where the schema
     * doesn't belong to:
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet as p')
     *   .select('p.name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."name" from "mammals"."pet" as "p"
     * ```
     */
    withSchema(schema) {
        return new QueryCreator({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema)),
        });
    }
}

/// <reference types="./parse-utils.d.ts" />
function createQueryCreator() {
    return new QueryCreator({
        executor: NOOP_QUERY_EXECUTOR,
    });
}
function createJoinBuilder(joinType, table) {
    return new JoinBuilder({
        joinNode: JoinNode.create(joinType, parseTableExpression(table)),
    });
}
function createOverBuilder() {
    return new OverBuilder({
        overNode: OverNode.create(),
    });
}

/// <reference types="./join-parser.d.ts" />
function parseJoin(joinType, args) {
    if (args.length === 3) {
        return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
    }
    else if (args.length === 2) {
        return parseCallbackJoin(joinType, args[0], args[1]);
    }
    else if (args.length === 1) {
        return parseOnlessJoin(joinType, args[0]);
    }
    else {
        throw new Error('not implemented');
    }
}
function parseCallbackJoin(joinType, from, callback) {
    return callback(createJoinBuilder(joinType, from)).toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
    return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialBinaryOperation(lhsColumn, '=', rhsColumn));
}
function parseOnlessJoin(joinType, from) {
    return JoinNode.create(joinType, parseTableExpression(from));
}

/// <reference types="./offset-node.d.ts" />
/**
 * @internal
 */
const OffsetNode = freeze({
    is(node) {
        return node.kind === 'OffsetNode';
    },
    create(offset) {
        return freeze({
            kind: 'OffsetNode',
            offset,
        });
    },
});

/// <reference types="./group-by-item-node.d.ts" />
/**
 * @internal
 */
const GroupByItemNode = freeze({
    is(node) {
        return node.kind === 'GroupByItemNode';
    },
    create(groupBy) {
        return freeze({
            kind: 'GroupByItemNode',
            groupBy,
        });
    },
});

/// <reference types="./group-by-parser.d.ts" />
function parseGroupBy(groupBy) {
    groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
    return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}

/// <reference types="./set-operation-node.d.ts" />
/**
 * @internal
 */
const SetOperationNode = freeze({
    is(node) {
        return node.kind === 'SetOperationNode';
    },
    create(operator, expression, all) {
        return freeze({
            kind: 'SetOperationNode',
            operator,
            expression,
            all,
        });
    },
});

/// <reference types="./set-operation-parser.d.ts" />
function parseSetOperations(operator, expression, all) {
    if (isFunction(expression)) {
        expression = expression(createExpressionBuilder());
    }
    if (!isReadonlyArray(expression)) {
        expression = [expression];
    }
    return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}

/// <reference types="./expression-wrapper.d.ts" />
class ExpressionWrapper {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    or(...args) {
        return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    and(...args) {
        return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `ExpressionWrapper` with a new output type.
     */
    $castTo() {
        return new ExpressionWrapper(this.#node);
    }
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */
    $notNull() {
        return new ExpressionWrapper(this.#node);
    }
    toOperationNode() {
        return this.#node;
    }
}
class AliasedExpressionWrapper {
    #expr;
    #alias;
    constructor(expr, alias) {
        this.#expr = expr;
        this.#alias = alias;
    }
    /** @private */
    get expression() {
        return this.#expr;
    }
    /** @private */
    get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return AliasNode.create(this.#expr.toOperationNode(), isOperationNodeSource(this.#alias)
            ? this.#alias.toOperationNode()
            : IdentifierNode.create(this.#alias));
    }
}
class OrWrapper {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    or(...args) {
        return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `OrWrapper` with a new output type.
     */
    $castTo() {
        return new OrWrapper(this.#node);
    }
    toOperationNode() {
        return ParensNode.create(this.#node);
    }
}
class AndWrapper {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedExpressionWrapper(this, alias);
    }
    and(...args) {
        return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
    }
    /**
     * Change the output type of the expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AndWrapper` with a new output type.
     */
    $castTo() {
        return new AndWrapper(this.#node);
    }
    toOperationNode() {
        return ParensNode.create(this.#node);
    }
}

/// <reference types="./fetch-node.d.ts" />
/**
 * @internal
 */
const FetchNode = freeze({
    is(node) {
        return node.kind === 'FetchNode';
    },
    create(rowCount, modifier) {
        return {
            kind: 'FetchNode',
            rowCount: ValueNode.create(rowCount),
            modifier,
        };
    },
});

/// <reference types="./fetch-parser.d.ts" />
function parseFetch(rowCount, modifier) {
    if (!isNumber(rowCount) && !isBigInt(rowCount)) {
        throw new Error(`Invalid fetch row count: ${rowCount}`);
    }
    if (!isFetchModifier(modifier)) {
        throw new Error(`Invalid fetch modifier: ${modifier}`);
    }
    return FetchNode.create(rowCount, modifier);
}
function isFetchModifier(value) {
    return value === 'only' || value === 'with ties';
}

/// <reference types="./select-query-builder.d.ts" />
class SelectQueryBuilderImpl {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    get expressionType() {
        return undefined;
    }
    get isSelectQueryBuilder() {
        return true;
    }
    where(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    having(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    havingRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    select(selection) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectArg(selection)),
        });
    }
    distinctOn(selection) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithDistinctOn(this.#props.queryNode, parseReferenceExpressionOrList(selection)),
        });
    }
    modifyFront(modifier) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode())),
        });
    }
    modifyEnd(modifier) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode())),
        });
    }
    distinct() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.create('Distinct')),
        });
    }
    forUpdate(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForUpdate', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    forShare(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForShare', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    forKeyShare(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForKeyShare', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    forNoKeyUpdate(of) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('ForNoKeyUpdate', of ? asArray(of).map(parseTable) : undefined)),
        });
    }
    skipLocked() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('SkipLocked')),
        });
    }
    noWait() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create('NoWait')),
        });
    }
    selectAll(table) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectAll(table)),
        });
    }
    innerJoin(...args) {
        return this.#join('InnerJoin', args);
    }
    leftJoin(...args) {
        return this.#join('LeftJoin', args);
    }
    rightJoin(...args) {
        return this.#join('RightJoin', args);
    }
    fullJoin(...args) {
        return this.#join('FullJoin', args);
    }
    crossJoin(...args) {
        return this.#join('CrossJoin', args);
    }
    innerJoinLateral(...args) {
        return this.#join('LateralInnerJoin', args);
    }
    leftJoinLateral(...args) {
        return this.#join('LateralLeftJoin', args);
    }
    crossJoinLateral(...args) {
        return this.#join('LateralCrossJoin', args);
    }
    crossApply(...args) {
        return this.#join('CrossApply', args);
    }
    outerApply(...args) {
        return this.#join('OuterApply', args);
    }
    #join(joinType, args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin(joinType, args)),
        });
    }
    orderBy(...args) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args)),
        });
    }
    groupBy(groupBy) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithGroupByItems(this.#props.queryNode, parseGroupBy(groupBy)),
        });
    }
    limit(limit) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit))),
        });
    }
    offset(offset) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithOffset(this.#props.queryNode, OffsetNode.create(parseValueExpression(offset))),
        });
    }
    fetch(rowCount, modifier = 'only') {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithFetch(this.#props.queryNode, parseFetch(rowCount, modifier)),
        });
    }
    top(expression, modifiers) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers)),
        });
    }
    union(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('union', expression, false)),
        });
    }
    unionAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('union', expression, true)),
        });
    }
    intersect(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('intersect', expression, false)),
        });
    }
    intersectAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('intersect', expression, true)),
        });
    }
    except(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('except', expression, false)),
        });
    }
    exceptAll(expression) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations('except', expression, true)),
        });
    }
    as(alias) {
        return new AliasedSelectQueryBuilderImpl(this, alias);
    }
    clearSelect() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutSelections(this.#props.queryNode),
        });
    }
    clearWhere() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode),
        });
    }
    clearLimit() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutLimit(this.#props.queryNode),
        });
    }
    clearOffset() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutOffset(this.#props.queryNode),
        });
    }
    clearOrderBy() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithoutOrderBy(this.#props.queryNode),
        });
    }
    clearGroupBy() {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: SelectQueryNode.cloneWithoutGroupBy(this.#props.queryNode),
        });
    }
    $call(func) {
        return func(this);
    }
    $if(condition, func) {
        if (condition) {
            return func(this);
        }
        return new SelectQueryBuilderImpl({
            ...this.#props,
        });
    }
    $castTo() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $narrowType() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $assertType() {
        return new SelectQueryBuilderImpl(this.#props);
    }
    $asTuple() {
        return new ExpressionWrapper(this.toOperationNode());
    }
    $asScalar() {
        return new ExpressionWrapper(this.toOperationNode());
    }
    withPlugin(plugin) {
        return new SelectQueryBuilderImpl({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery);
        return result.rows;
    }
    async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
    }
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === undefined) {
            const error = isNoResultErrorConstructor(errorConstructor)
                ? new errorConstructor(this.toOperationNode())
                : errorConstructor(this.toOperationNode());
            throw error;
        }
        return result;
    }
    async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize);
        for await (const item of stream) {
            yield* item.rows;
        }
    }
    async explain(format, options) {
        const builder = new SelectQueryBuilderImpl({
            ...this.#props,
            queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options),
        });
        return await builder.execute();
    }
}
function createSelectQueryBuilder(props) {
    return new SelectQueryBuilderImpl(props);
}
/**
 * {@link SelectQueryBuilder} with an alias. The result of calling {@link SelectQueryBuilder.as}.
 */
class AliasedSelectQueryBuilderImpl {
    #queryBuilder;
    #alias;
    constructor(queryBuilder, alias) {
        this.#queryBuilder = queryBuilder;
        this.#alias = alias;
    }
    get expression() {
        return this.#queryBuilder;
    }
    get alias() {
        return this.#alias;
    }
    get isAliasedSelectQueryBuilder() {
        return true;
    }
    toOperationNode() {
        return AliasNode.create(this.#queryBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
    }
}

/// <reference types="./aggregate-function-node.d.ts" />
/**
 * @internal
 */
const AggregateFunctionNode = freeze({
    is(node) {
        return node.kind === 'AggregateFunctionNode';
    },
    create(aggregateFunction, aggregated = []) {
        return freeze({
            kind: 'AggregateFunctionNode',
            func: aggregateFunction,
            aggregated,
        });
    },
    cloneWithDistinct(aggregateFunctionNode) {
        return freeze({
            ...aggregateFunctionNode,
            distinct: true,
        });
    },
    cloneWithOrderBy(aggregateFunctionNode, orderItems, withinGroup = false) {
        const prop = withinGroup ? 'withinGroup' : 'orderBy';
        return freeze({
            ...aggregateFunctionNode,
            [prop]: aggregateFunctionNode[prop]
                ? OrderByNode.cloneWithItems(aggregateFunctionNode[prop], orderItems)
                : OrderByNode.create(orderItems),
        });
    },
    cloneWithFilter(aggregateFunctionNode, filter) {
        return freeze({
            ...aggregateFunctionNode,
            filter: aggregateFunctionNode.filter
                ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, 'And', filter)
                : WhereNode.create(filter),
        });
    },
    cloneWithOrFilter(aggregateFunctionNode, filter) {
        return freeze({
            ...aggregateFunctionNode,
            filter: aggregateFunctionNode.filter
                ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, 'Or', filter)
                : WhereNode.create(filter),
        });
    },
    cloneWithOver(aggregateFunctionNode, over) {
        return freeze({
            ...aggregateFunctionNode,
            over,
        });
    },
});

/// <reference types="./function-node.d.ts" />
/**
 * @internal
 */
const FunctionNode = freeze({
    is(node) {
        return node.kind === 'FunctionNode';
    },
    create(func, args) {
        return freeze({
            kind: 'FunctionNode',
            func,
            arguments: args,
        });
    },
});

/// <reference types="./aggregate-function-builder.d.ts" />
class AggregateFunctionBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    /**
     * Returns an aliased version of the function.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.count<number>('id').as('person_count')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `person_count: number` field exists in the result type.
     * console.log(result.person_count)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("id") as "person_count"
     * from "person"
     * ```
     */
    as(alias) {
        return new AliasedAggregateFunctionBuilder(this, alias);
    }
    /**
     * Adds a `distinct` clause inside the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count(distinct "first_name") as "first_name_count"
     * from "person"
     * ```
     */
    distinct() {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(this.#props.aggregateFunctionNode),
        });
    }
    orderBy(...args) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: QueryNode.cloneWithOrderByItems(this.#props.aggregateFunctionNode, parseOrderBy(args)),
        });
    }
    clearOrderBy() {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: QueryNode.cloneWithoutOrderBy(this.#props.aggregateFunctionNode),
        });
    }
    withinGroupOrderBy(...args) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithOrderBy(this.#props.aggregateFunctionNode, parseOrderBy(args), true),
        });
    }
    filterWhere(...args) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseValueBinaryOperationOrExpression(args)),
        });
    }
    /**
     * Adds a `filter` clause with a nested `where` clause after the function, where
     * both sides of the operator are references to columns.
     *
     * Similar to {@link WhereInterface}'s `whereRef` method.
     *
     * ### Examples
     *
     * Count people with same first and last names versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhereRef('first_name', '=', 'last_name')
     *       .as('repeat_name_count'),
     *     eb.fn.count<number>('id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
     *   count("id") as "total_count"
     * from "person"
     * ```
     */
    filterWhereRef(lhs, op, rhs) {
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs)),
        });
    }
    /**
     * Adds an `over` clause (window functions) after the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over() as "average_age"
     * from "person"
     * ```
     *
     * Also supports passing a callback that returns an over builder,
     * allowing to add partition by and sort by clauses inside over.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
     * from "person"
     * ```
     */
    over(over) {
        const builder = createOverBuilder();
        return new AggregateFunctionBuilder({
            ...this.#props,
            aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(this.#props.aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode()),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    /**
     * Casts the expression to the given type.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `AggregateFunctionBuilder` with a new output type.
     */
    $castTo() {
        return new AggregateFunctionBuilder(this.#props);
    }
    /**
     * Omit null from the expression's type.
     *
     * This function can be useful in cases where you know an expression can't be
     * null, but Kysely is unable to infer it.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of `this` with a new output type.
     */
    $notNull() {
        return new AggregateFunctionBuilder(this.#props);
    }
    toOperationNode() {
        return this.#props.aggregateFunctionNode;
    }
}
/**
 * {@link AggregateFunctionBuilder} with an alias. The result of calling {@link AggregateFunctionBuilder.as}.
 */
class AliasedAggregateFunctionBuilder {
    #aggregateFunctionBuilder;
    #alias;
    constructor(aggregateFunctionBuilder, alias) {
        this.#aggregateFunctionBuilder = aggregateFunctionBuilder;
        this.#alias = alias;
    }
    /** @private */
    get expression() {
        return this.#aggregateFunctionBuilder;
    }
    /** @private */
    get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return AliasNode.create(this.#aggregateFunctionBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
    }
}

/// <reference types="./function-module.d.ts" />
function createFunctionModule() {
    const fn = (name, args) => {
        return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args ?? [])));
    };
    const agg = (name, args) => {
        return new AggregateFunctionBuilder({
            aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : undefined),
        });
    };
    return Object.assign(fn, {
        agg,
        avg(column) {
            return agg('avg', [column]);
        },
        coalesce(...values) {
            return fn('coalesce', values);
        },
        count(column) {
            return agg('count', [column]);
        },
        countAll(table) {
            return new AggregateFunctionBuilder({
                aggregateFunctionNode: AggregateFunctionNode.create('count', parseSelectAll(table)),
            });
        },
        max(column) {
            return agg('max', [column]);
        },
        min(column) {
            return agg('min', [column]);
        },
        sum(column) {
            return agg('sum', [column]);
        },
        any(column) {
            return fn('any', [column]);
        },
        jsonAgg(table) {
            return new AggregateFunctionBuilder({
                aggregateFunctionNode: AggregateFunctionNode.create('json_agg', [
                    isString(table) ? parseTable(table) : table.toOperationNode(),
                ]),
            });
        },
        toJson(table) {
            return new ExpressionWrapper(FunctionNode.create('to_json', [
                isString(table) ? parseTable(table) : table.toOperationNode(),
            ]));
        },
    });
}

/// <reference types="./unary-operation-node.d.ts" />
/**
 * @internal
 */
const UnaryOperationNode = freeze({
    is(node) {
        return node.kind === 'UnaryOperationNode';
    },
    create(operator, operand) {
        return freeze({
            kind: 'UnaryOperationNode',
            operator,
            operand,
        });
    },
});

/// <reference types="./unary-operation-parser.d.ts" />
function parseUnaryOperation(operator, operand) {
    return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
}

/// <reference types="./case-node.d.ts" />
/**
 * @internal
 */
const CaseNode = freeze({
    is(node) {
        return node.kind === 'CaseNode';
    },
    create(value) {
        return freeze({
            kind: 'CaseNode',
            value,
        });
    },
    cloneWithWhen(caseNode, when) {
        return freeze({
            ...caseNode,
            when: freeze(caseNode.when ? [...caseNode.when, when] : [when]),
        });
    },
    cloneWithThen(caseNode, then) {
        return freeze({
            ...caseNode,
            when: caseNode.when
                ? freeze([
                    ...caseNode.when.slice(0, -1),
                    WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then),
                ])
                : undefined,
        });
    },
    cloneWith(caseNode, props) {
        return freeze({
            ...caseNode,
            ...props,
        });
    },
});

/// <reference types="./case-builder.d.ts" />
class CaseBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    when(...args) {
        return new CaseThenBuilder({
            ...this.#props,
            node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args))),
        });
    }
}
class CaseThenBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    then(valueExpression) {
        return new CaseWhenBuilder({
            ...this.#props,
            node: CaseNode.cloneWithThen(this.#props.node, isSafeImmediateValue(valueExpression)
                ? parseSafeImmediateValue(valueExpression)
                : parseValueExpression(valueExpression)),
        });
    }
}
class CaseWhenBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    when(...args) {
        return new CaseThenBuilder({
            ...this.#props,
            node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args))),
        });
    }
    else(valueExpression) {
        return new CaseEndBuilder({
            ...this.#props,
            node: CaseNode.cloneWith(this.#props.node, {
                else: isSafeImmediateValue(valueExpression)
                    ? parseSafeImmediateValue(valueExpression)
                    : parseValueExpression(valueExpression),
            }),
        });
    }
    end() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
    }
    endCase() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
    }
}
class CaseEndBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    end() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
    }
    endCase() {
        return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
    }
}

/// <reference types="./json-path-leg-node.d.ts" />
/**
 * @internal
 */
const JSONPathLegNode = freeze({
    is(node) {
        return node.kind === 'JSONPathLegNode';
    },
    create(type, value) {
        return freeze({
            kind: 'JSONPathLegNode',
            type,
            value,
        });
    },
});

/// <reference types="./json-path-builder.d.ts" />
class JSONPathBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /**
     * Access an element of a JSON array in a specific location.
     *
     * Since there's no guarantee an element exists in the given array location, the
     * resulting type is always nullable. If you're sure the element exists, you
     * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
     *
     * See also {@link key} to access properties of JSON objects.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select(eb =>
     *     eb.ref('nicknames', '->').at(0).as('primary_nickname')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "nicknames"->0 as "primary_nickname" from "person"
     *```
     *
     * Combined with {@link key}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('experience', '->').at(0).key('role').as('first_role')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "experience"->0->'role' as "first_role" from "person"
     * ```
     *
     * You can use `'last'` to access the last element of the array in MySQL:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `nicknames`->'$[last]' as `last_nickname` from `person`
     * ```
     *
     * Or `'#-1'` in SQLite:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
     * )
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
     * ```
     */
    at(index) {
        return this.#createBuilderWithPathLeg('ArrayLocation', index);
    }
    /**
     * Access a property of a JSON object.
     *
     * If a field is optional, the resulting type will be nullable.
     *
     * See also {@link at} to access elements of JSON arrays.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('address', '->').key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "address"->'city' as "city" from "person"
     * ```
     *
     * Going deeper:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
     * )
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select `profile`->'$.website.url' as `website_url` from `person`
     * ```
     *
     * Combined with {@link at}:
     *
     * ```ts
     * db.selectFrom('person').select(eb =>
     *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
     * )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "profile"->'addresses'->0->'city' as "city" from "person"
     * ```
     */
    key(key) {
        return this.#createBuilderWithPathLeg('Member', key);
    }
    #createBuilderWithPathLeg(legType, value) {
        if (JSONReferenceNode.is(this.#node)) {
            return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(this.#node, JSONPathNode.is(this.#node.traversal)
                ? JSONPathNode.cloneWithLeg(this.#node.traversal, JSONPathLegNode.create(legType, value))
                : JSONOperatorChainNode.cloneWithValue(this.#node.traversal, ValueNode.createImmediate(value))));
        }
        return new TraversedJSONPathBuilder(JSONPathNode.cloneWithLeg(this.#node, JSONPathLegNode.create(legType, value)));
    }
}
class TraversedJSONPathBuilder extends JSONPathBuilder {
    #node;
    constructor(node) {
        super(node);
        this.#node = node;
    }
    /** @private */
    get expressionType() {
        return undefined;
    }
    as(alias) {
        return new AliasedJSONPathBuilder(this, alias);
    }
    /**
     * Change the output type of the json path.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `JSONPathBuilder` with a new output type.
     */
    $castTo() {
        return new TraversedJSONPathBuilder(this.#node);
    }
    $notNull() {
        return new TraversedJSONPathBuilder(this.#node);
    }
    toOperationNode() {
        return this.#node;
    }
}
class AliasedJSONPathBuilder {
    #jsonPath;
    #alias;
    constructor(jsonPath, alias) {
        this.#jsonPath = jsonPath;
        this.#alias = alias;
    }
    /** @private */
    get expression() {
        return this.#jsonPath;
    }
    /** @private */
    get alias() {
        return this.#alias;
    }
    toOperationNode() {
        return AliasNode.create(this.#jsonPath.toOperationNode(), isOperationNodeSource(this.#alias)
            ? this.#alias.toOperationNode()
            : IdentifierNode.create(this.#alias));
    }
}

/// <reference types="./tuple-node.d.ts" />
/**
 * @internal
 */
const TupleNode = freeze({
    is(node) {
        return node.kind === 'TupleNode';
    },
    create(values) {
        return freeze({
            kind: 'TupleNode',
            values: freeze(values),
        });
    },
});

/// <reference types="./data-type-node.d.ts" />
const SIMPLE_COLUMN_DATA_TYPES = [
    'varchar',
    'char',
    'text',
    'integer',
    'int2',
    'int4',
    'int8',
    'smallint',
    'bigint',
    'boolean',
    'real',
    'double precision',
    'float4',
    'float8',
    'decimal',
    'numeric',
    'binary',
    'bytea',
    'date',
    'datetime',
    'time',
    'timetz',
    'timestamp',
    'timestamptz',
    'serial',
    'bigserial',
    'uuid',
    'json',
    'jsonb',
    'blob',
    'varbinary',
    'int4range',
    'int4multirange',
    'int8range',
    'int8multirange',
    'numrange',
    'nummultirange',
    'tsrange',
    'tsmultirange',
    'tstzrange',
    'tstzmultirange',
    'daterange',
    'datemultirange',
];
const COLUMN_DATA_TYPE_REGEX = [
    /^varchar\(\d+\)$/,
    /^char\(\d+\)$/,
    /^decimal\(\d+, \d+\)$/,
    /^numeric\(\d+, \d+\)$/,
    /^binary\(\d+\)$/,
    /^datetime\(\d+\)$/,
    /^time\(\d+\)$/,
    /^timetz\(\d+\)$/,
    /^timestamp\(\d+\)$/,
    /^timestamptz\(\d+\)$/,
    /^varbinary\(\d+\)$/,
];
/**
 * @internal
 */
const DataTypeNode = freeze({
    is(node) {
        return node.kind === 'DataTypeNode';
    },
    create(dataType) {
        return freeze({
            kind: 'DataTypeNode',
            dataType,
        });
    },
});
function isColumnDataType(dataType) {
    if (SIMPLE_COLUMN_DATA_TYPES.includes(dataType)) {
        return true;
    }
    if (COLUMN_DATA_TYPE_REGEX.some((r) => r.test(dataType))) {
        return true;
    }
    return false;
}

/// <reference types="./data-type-parser.d.ts" />
function parseDataTypeExpression(dataType) {
    if (isOperationNodeSource(dataType)) {
        return dataType.toOperationNode();
    }
    if (isColumnDataType(dataType)) {
        return DataTypeNode.create(dataType);
    }
    throw new Error(`invalid column data type ${JSON.stringify(dataType)}`);
}

/// <reference types="./cast-node.d.ts" />
/**
 * @internal
 */
const CastNode = freeze({
    is(node) {
        return node.kind === 'CastNode';
    },
    create(expression, dataType) {
        return freeze({
            kind: 'CastNode',
            expression,
            dataType,
        });
    },
});

/// <reference types="./expression-builder.d.ts" />
function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
    function binary(lhs, op, rhs) {
        return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
    }
    function unary(op, expr) {
        return new ExpressionWrapper(parseUnaryOperation(op, expr));
    }
    const eb = Object.assign(binary, {
        fn: undefined,
        eb: undefined,
        selectFrom(table) {
            return createSelectQueryBuilder({
                queryId: createQueryId(),
                executor,
                queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(table)),
            });
        },
        case(reference) {
            return new CaseBuilder({
                node: CaseNode.create(isUndefined(reference)
                    ? undefined
                    : parseReferenceExpression(reference)),
            });
        },
        ref(reference, op) {
            if (isUndefined(op)) {
                return new ExpressionWrapper(parseStringReference(reference));
            }
            return new JSONPathBuilder(parseJSONReference(reference, op));
        },
        jsonPath() {
            return new JSONPathBuilder(JSONPathNode.create());
        },
        table(table) {
            return new ExpressionWrapper(parseTable(table));
        },
        val(value) {
            return new ExpressionWrapper(parseValueExpression(value));
        },
        refTuple(...values) {
            return new ExpressionWrapper(TupleNode.create(values.map(parseReferenceExpression)));
        },
        tuple(...values) {
            return new ExpressionWrapper(TupleNode.create(values.map(parseValueExpression)));
        },
        lit(value) {
            return new ExpressionWrapper(parseSafeImmediateValue(value));
        },
        unary,
        not(expr) {
            return unary('not', expr);
        },
        exists(expr) {
            return unary('exists', expr);
        },
        neg(expr) {
            return unary('-', expr);
        },
        between(expr, start, end) {
            return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create('between'), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
        },
        betweenSymmetric(expr, start, end) {
            return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create('between symmetric'), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
        },
        and(exprs) {
            if (isReadonlyArray(exprs)) {
                return new ExpressionWrapper(parseFilterList(exprs, 'and'));
            }
            return new ExpressionWrapper(parseFilterObject(exprs, 'and'));
        },
        or(exprs) {
            if (isReadonlyArray(exprs)) {
                return new ExpressionWrapper(parseFilterList(exprs, 'or'));
            }
            return new ExpressionWrapper(parseFilterObject(exprs, 'or'));
        },
        parens(...args) {
            const node = parseValueBinaryOperationOrExpression(args);
            if (ParensNode.is(node)) {
                // No double wrapping.
                return new ExpressionWrapper(node);
            }
            else {
                return new ExpressionWrapper(ParensNode.create(node));
            }
        },
        cast(expr, dataType) {
            return new ExpressionWrapper(CastNode.create(parseReferenceExpression(expr), parseDataTypeExpression(dataType)));
        },
        withSchema(schema) {
            return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
        },
    });
    eb.fn = createFunctionModule();
    eb.eb = eb;
    return eb;
}
function expressionBuilder(_) {
    return createExpressionBuilder();
}

/// <reference types="./expression-parser.d.ts" />
function parseExpression(exp) {
    if (isOperationNodeSource(exp)) {
        return exp.toOperationNode();
    }
    else if (isFunction(exp)) {
        return exp(expressionBuilder()).toOperationNode();
    }
    throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
    if (isOperationNodeSource(exp)) {
        return exp.toOperationNode();
    }
    else if (isFunction(exp)) {
        return exp(expressionBuilder()).toOperationNode();
    }
    throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
    return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
}

/// <reference types="./dynamic-table-builder.d.ts" />
class DynamicTableBuilder {
    #table;
    get table() {
        return this.#table;
    }
    constructor(table) {
        this.#table = table;
    }
    as(alias) {
        return new AliasedDynamicTableBuilder(this.#table, alias);
    }
}
class AliasedDynamicTableBuilder {
    #table;
    #alias;
    get table() {
        return this.#table;
    }
    get alias() {
        return this.#alias;
    }
    constructor(table, alias) {
        this.#table = table;
        this.#alias = alias;
    }
    toOperationNode() {
        return AliasNode.create(parseTable(this.#table), IdentifierNode.create(this.#alias));
    }
}
function isAliasedDynamicTableBuilder(obj) {
    return (isObject(obj) &&
        isOperationNodeSource(obj) &&
        isString(obj.table) &&
        isString(obj.alias));
}

/// <reference types="./table-parser.d.ts" />
function parseTableExpressionOrList(table) {
    if (isReadonlyArray(table)) {
        return table.map((it) => parseTableExpression(it));
    }
    else {
        return [parseTableExpression(table)];
    }
}
function parseTableExpression(table) {
    if (isString(table)) {
        return parseAliasedTable(table);
    }
    else if (isAliasedDynamicTableBuilder(table)) {
        return table.toOperationNode();
    }
    else {
        return parseAliasedExpression(table);
    }
}
function parseAliasedTable(from) {
    const ALIAS_SEPARATOR = ' as ';
    if (from.includes(ALIAS_SEPARATOR)) {
        const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim$1);
        return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
    }
    else {
        return parseTable(from);
    }
}
function parseTable(from) {
    const SCHEMA_SEPARATOR = '.';
    if (from.includes(SCHEMA_SEPARATOR)) {
        const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim$1);
        return TableNode.createWithSchema(schema, table);
    }
    else {
        return TableNode.create(from);
    }
}
function trim$1(str) {
    return str.trim();
}

/// <reference types="./add-column-node.d.ts" />
/**
 * @internal
 */
const AddColumnNode = freeze({
    is(node) {
        return node.kind === 'AddColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'AddColumnNode',
            column,
        });
    },
});

/// <reference types="./column-definition-node.d.ts" />
/**
 * @internal
 */
const ColumnDefinitionNode = freeze({
    is(node) {
        return node.kind === 'ColumnDefinitionNode';
    },
    create(column, dataType) {
        return freeze({
            kind: 'ColumnDefinitionNode',
            column: ColumnNode.create(column),
            dataType,
        });
    },
    cloneWithFrontModifier(node, modifier) {
        return freeze({
            ...node,
            frontModifiers: node.frontModifiers
                ? freeze([...node.frontModifiers, modifier])
                : [modifier],
        });
    },
    cloneWithEndModifier(node, modifier) {
        return freeze({
            ...node,
            endModifiers: node.endModifiers
                ? freeze([...node.endModifiers, modifier])
                : [modifier],
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./drop-column-node.d.ts" />
/**
 * @internal
 */
const DropColumnNode = freeze({
    is(node) {
        return node.kind === 'DropColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'DropColumnNode',
            column: ColumnNode.create(column),
        });
    },
});

/// <reference types="./rename-column-node.d.ts" />
/**
 * @internal
 */
const RenameColumnNode = freeze({
    is(node) {
        return node.kind === 'RenameColumnNode';
    },
    create(column, newColumn) {
        return freeze({
            kind: 'RenameColumnNode',
            column: ColumnNode.create(column),
            renameTo: ColumnNode.create(newColumn),
        });
    },
});

/// <reference types="./check-constraint-node.d.ts" />
/**
 * @internal
 */
const CheckConstraintNode = freeze({
    is(node) {
        return node.kind === 'CheckConstraintNode';
    },
    create(expression, constraintName) {
        return freeze({
            kind: 'CheckConstraintNode',
            expression,
            name: constraintName
                ? IdentifierNode.create(constraintName)
                : undefined,
        });
    },
});

/// <reference types="./references-node.d.ts" />
const ON_MODIFY_FOREIGN_ACTIONS = [
    'no action',
    'restrict',
    'cascade',
    'set null',
    'set default',
];
/**
 * @internal
 */
const ReferencesNode = freeze({
    is(node) {
        return node.kind === 'ReferencesNode';
    },
    create(table, columns) {
        return freeze({
            kind: 'ReferencesNode',
            table,
            columns: freeze([...columns]),
        });
    },
    cloneWithOnDelete(references, onDelete) {
        return freeze({
            ...references,
            onDelete,
        });
    },
    cloneWithOnUpdate(references, onUpdate) {
        return freeze({
            ...references,
            onUpdate,
        });
    },
});

/// <reference types="./default-value-parser.d.ts" />
function parseDefaultValueExpression(value) {
    return isOperationNodeSource(value)
        ? value.toOperationNode()
        : ValueNode.createImmediate(value);
}

/// <reference types="./generated-node.d.ts" />
/**
 * @internal
 */
const GeneratedNode = freeze({
    is(node) {
        return node.kind === 'GeneratedNode';
    },
    create(params) {
        return freeze({
            kind: 'GeneratedNode',
            ...params,
        });
    },
    createWithExpression(expression) {
        return freeze({
            kind: 'GeneratedNode',
            always: true,
            expression,
        });
    },
    cloneWith(node, params) {
        return freeze({
            ...node,
            ...params,
        });
    },
});

/// <reference types="./default-value-node.d.ts" />
/**
 * @internal
 */
const DefaultValueNode = freeze({
    is(node) {
        return node.kind === 'DefaultValueNode';
    },
    create(defaultValue) {
        return freeze({
            kind: 'DefaultValueNode',
            defaultValue,
        });
    },
});

/// <reference types="./on-modify-action-parser.d.ts" />
function parseOnModifyForeignAction(action) {
    if (ON_MODIFY_FOREIGN_ACTIONS.includes(action)) {
        return action;
    }
    throw new Error(`invalid OnModifyForeignAction ${action}`);
}

/// <reference types="./column-definition-builder.d.ts" />
class ColumnDefinitionBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /**
     * Adds `auto_increment` or `autoincrement` to the column definition
     * depending on the dialect.
     *
     * Some dialects like PostgreSQL don't support this. On PostgreSQL
     * you can use the `serial` or `bigserial` data type instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key auto_increment
     * )
     * ```
     */
    autoIncrement() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { autoIncrement: true }));
    }
    /**
     * Makes the column an identity column.
     *
     * This only works on some dialects like MS SQL Server (MSSQL).
     *
     * For PostgreSQL's `generated always as identity` use {@link generatedAlwaysAsIdentity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.identity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MSSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer identity primary key
     * )
     * ```
     */
    identity() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { identity: true }));
    }
    /**
     * Makes the column the primary key.
     *
     * If you want to specify a composite primary key use the
     * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key
     * )
     */
    primaryKey() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { primaryKey: true }));
    }
    /**
     * Adds a foreign key constraint for the column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer', (col) => col.references('person.id'))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id")
     * )
     * ```
     */
    references(ref) {
        const references = parseStringReference(ref);
        if (!references.table || SelectAllNode.is(references.column)) {
            throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            references: ReferencesNode.create(references.table, [
                references.column,
            ]),
        }));
    }
    /**
     * Adds an `on delete` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on delete cascade
     * )
     * ```
     */
    onDelete(onDelete) {
        if (!this.#node.references) {
            throw new Error('on delete constraint can only be added for foreign keys');
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            references: ReferencesNode.cloneWithOnDelete(this.#node.references, parseOnModifyForeignAction(onDelete)),
        }));
    }
    /**
     * Adds an `on update` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'owner_id',
     *     'integer',
     *     (col) => col.references('person.id').onUpdate('cascade')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "pet" (
     *   "owner_id" integer references "person" ("id") on update cascade
     * )
     * ```
     */
    onUpdate(onUpdate) {
        if (!this.#node.references) {
            throw new Error('on update constraint can only be added for foreign keys');
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            references: ReferencesNode.cloneWithOnUpdate(this.#node.references, parseOnModifyForeignAction(onUpdate)),
        }));
    }
    /**
     * Adds a unique constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `email` varchar(255) unique
     * )
     * ```
     */
    unique() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unique: true }));
    }
    /**
     * Adds a `not null` constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(255)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `first_name` varchar(255) not null
     * )
     * ```
     */
    notNull() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { notNull: true }));
    }
    /**
     * Adds a `unsigned` modifier for the column.
     *
     * This only works on some dialects like MySQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('age', 'integer', col => col.unsigned())
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `age` integer unsigned
     * )
     * ```
     */
    unsigned() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unsigned: true }));
    }
    /**
     * Adds a default value constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer default 4
     * )
     * ```
     *
     * Values passed to `defaultTo` are interpreted as value literals by default. You can define
     * an arbitrary SQL expression using the {@link sql} template tag:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'created_at',
     *     'timestamp',
     *     (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `created_at` timestamp default CURRENT_TIMESTAMP
     * )
     * ```
     */
    defaultTo(value) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value)),
        }));
    }
    /**
     * Adds a check constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) =>
     *     col.check(sql`number_of_legs < 5`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `pet` (
     *   `number_of_legs` integer check (number_of_legs < 5)
     * )
     * ```
     */
    check(expression) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            check: CheckConstraintNode.create(expression.toOperationNode()),
        }));
    }
    /**
     * Makes the column a generated column using a `generated always as` statement.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)',
     *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name))
     * )
     * ```
     */
    generatedAlwaysAs(expression) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.createWithExpression(expression.toOperationNode()),
        }));
    }
    /**
     * Adds the `generated always as identity` specifier.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated always as identity primary key
     * )
     * ```
     */
    generatedAlwaysAsIdentity() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.create({ identity: true, always: true }),
        }));
    }
    /**
     * Adds the `generated by default as identity` specifier on supported dialects.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.generatedByDefaultAsIdentity().primaryKey())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer generated by default as identity primary key
     * )
     * ```
     */
    generatedByDefaultAsIdentity() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.create({ identity: true, byDefault: true }),
        }));
    }
    /**
     * Makes a generated column stored instead of virtual. This method can only
     * be used with {@link generatedAlwaysAs}
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)', (col) => col
     *     .generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *     .stored()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name)) stored
     * )
     * ```
     */
    stored() {
        if (!this.#node.generated) {
            throw new Error('stored() can only be called after generatedAlwaysAs');
        }
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
            generated: GeneratedNode.cloneWith(this.#node.generated, {
                stored: true,
            }),
        }));
    }
    /**
     * This can be used to add any additional SQL right after the column's data type.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'first_name',
     *     'varchar(36)',
     *     (col) => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(36) collate utf8mb4_general_ci not null
     * )
     * ```
     */
    modifyFront(modifier) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(this.#node, modifier.toOperationNode()));
    }
    /**
     * Adds `nulls not distinct` specifier.
     * Should be used with `unique` constraint.
     *
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(30)', col => col.unique().nullsNotDistinct())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(30) unique nulls not distinct
     * )
     * ```
     */
    nullsNotDistinct() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { nullsNotDistinct: true }));
    }
    /**
     * Adds `if not exists` specifier. This only works for PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addColumn('email', 'varchar(255)', col => col.unique().ifNotExists())
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * alter table "person" add column if not exists "email" varchar(255) unique
     * ```
     */
    ifNotExists() {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { ifNotExists: true }));
    }
    /**
     * This can be used to add any additional SQL to the end of the column definition.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn(
     *     'age',
     *     'integer',
     *     col => col.unsigned()
     *       .notNull()
     *       .modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
     * )
     * ```
     */
    modifyEnd(modifier) {
        return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(this.#node, modifier.toOperationNode()));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}

/// <reference types="./modify-column-node.d.ts" />
/**
 * @internal
 */
const ModifyColumnNode = freeze({
    is(node) {
        return node.kind === 'ModifyColumnNode';
    },
    create(column) {
        return freeze({
            kind: 'ModifyColumnNode',
            column,
        });
    },
});

/// <reference types="./foreign-key-constraint-node.d.ts" />
/**
 * @internal
 */
const ForeignKeyConstraintNode = freeze({
    is(node) {
        return node.kind === 'ForeignKeyConstraintNode';
    },
    create(sourceColumns, targetTable, targetColumns, constraintName) {
        return freeze({
            kind: 'ForeignKeyConstraintNode',
            columns: sourceColumns,
            references: ReferencesNode.create(targetTable, targetColumns),
            name: constraintName
                ? IdentifierNode.create(constraintName)
                : undefined,
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./foreign-key-constraint-builder.d.ts" />
class ForeignKeyConstraintBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    onDelete(onDelete) {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
            onDelete: parseOnModifyForeignAction(onDelete),
        }));
    }
    onUpdate(onUpdate) {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
            onUpdate: parseOnModifyForeignAction(onUpdate),
        }));
    }
    deferrable() {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, { deferrable: true }));
    }
    notDeferrable() {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, { deferrable: false }));
    }
    initiallyDeferred() {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
            initiallyDeferred: true,
        }));
    }
    initiallyImmediate() {
        return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
            initiallyDeferred: false,
        }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}

/// <reference types="./add-constraint-node.d.ts" />
/**
 * @internal
 */
const AddConstraintNode = freeze({
    is(node) {
        return node.kind === 'AddConstraintNode';
    },
    create(constraint) {
        return freeze({
            kind: 'AddConstraintNode',
            constraint,
        });
    },
});

/// <reference types="./unique-constraint-node.d.ts" />
/**
 * @internal
 */
const UniqueConstraintNode = freeze({
    is(node) {
        return node.kind === 'UniqueConstraintNode';
    },
    create(columns, constraintName, nullsNotDistinct) {
        return freeze({
            kind: 'UniqueConstraintNode',
            columns: freeze(columns.map(ColumnNode.create)),
            name: constraintName
                ? IdentifierNode.create(constraintName)
                : undefined,
            nullsNotDistinct,
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
});

/// <reference types="./drop-constraint-node.d.ts" />
/**
 * @internal
 */
const DropConstraintNode = freeze({
    is(node) {
        return node.kind === 'DropConstraintNode';
    },
    create(constraintName) {
        return freeze({
            kind: 'DropConstraintNode',
            constraintName: IdentifierNode.create(constraintName),
        });
    },
    cloneWith(dropConstraint, props) {
        return freeze({
            ...dropConstraint,
            ...props,
        });
    },
});

/// <reference types="./alter-column-node.d.ts" />
/**
 * @internal
 */
const AlterColumnNode = freeze({
    is(node) {
        return node.kind === 'AlterColumnNode';
    },
    create(column, prop, value) {
        return freeze({
            kind: 'AlterColumnNode',
            column: ColumnNode.create(column),
            [prop]: value,
        });
    },
});

/// <reference types="./alter-column-builder.d.ts" />
class AlterColumnBuilder {
    #column;
    constructor(column) {
        this.#column = column;
    }
    setDataType(dataType) {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'dataType', parseDataTypeExpression(dataType)));
    }
    setDefault(value) {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'setDefault', parseDefaultValueExpression(value)));
    }
    dropDefault() {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'dropDefault', true));
    }
    setNotNull() {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'setNotNull', true));
    }
    dropNotNull() {
        return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, 'dropNotNull', true));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
}
/**
 * Allows us to force consumers to do exactly one alteration to a column.
 *
 * One cannot do no alterations:
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .execute() // Property 'execute' does not exist on type 'AlteredColumnBuilder'.
 * ```
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .alterColumn('age', (ac) => ac) // Type 'AlterColumnBuilder' is not assignable to type 'AlteredColumnBuilder'.
 * //  .execute()
 * ```
 *
 * One cannot do multiple alterations:
 *
 * ```ts
 * await db.schema
 *   .alterTable('person')
 * //  .alterColumn('age', (ac) => ac.dropNotNull().setNotNull()) // Property 'setNotNull' does not exist on type 'AlteredColumnBuilder'.
 * //  .execute()
 * ```
 *
 * Which would now throw a compilation error, instead of a runtime error.
 */
class AlteredColumnBuilder {
    #alterColumnNode;
    constructor(alterColumnNode) {
        this.#alterColumnNode = alterColumnNode;
    }
    toOperationNode() {
        return this.#alterColumnNode;
    }
}

/// <reference types="./alter-table-executor.d.ts" />
class AlterTableExecutor {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./alter-table-add-foreign-key-constraint-builder.d.ts" />
class AlterTableAddForeignKeyConstraintBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    onDelete(onDelete) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete),
        });
    }
    onUpdate(onUpdate) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate),
        });
    }
    deferrable() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.deferrable(),
        });
    }
    notDeferrable() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.notDeferrable(),
        });
    }
    initiallyDeferred() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.initiallyDeferred(),
        });
    }
    initiallyImmediate() {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.initiallyImmediate(),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(AlterTableNode.cloneWithTableProps(this.#props.node, {
            addConstraint: AddConstraintNode.create(this.#props.constraintBuilder.toOperationNode()),
        }), this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./alter-table-drop-constraint-builder.d.ts" />
class AlterTableDropConstraintBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
                    ifExists: true,
                }),
            }),
        });
    }
    cascade() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
                    modifier: 'cascade',
                }),
            }),
        });
    }
    restrict() {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
                    modifier: 'restrict',
                }),
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./primary-key-constraint-node.d.ts" />
/**
 * @internal
 */
const PrimaryKeyConstraintNode = freeze({
    is(node) {
        return node.kind === 'PrimaryKeyConstraintNode';
    },
    create(columns, constraintName) {
        return freeze({
            kind: 'PrimaryKeyConstraintNode',
            columns: freeze(columns.map(ColumnNode.create)),
            name: constraintName
                ? IdentifierNode.create(constraintName)
                : undefined,
        });
    },
    cloneWith(node, props) {
        return freeze({ ...node, ...props });
    },
});

/// <reference types="./add-index-node.d.ts" />
/**
 * @internal
 */
const AddIndexNode = freeze({
    is(node) {
        return node.kind === 'AddIndexNode';
    },
    create(name) {
        return freeze({
            kind: 'AddIndexNode',
            name: IdentifierNode.create(name),
        });
    },
    cloneWith(node, props) {
        return freeze({
            ...node,
            ...props,
        });
    },
    cloneWithColumns(node, columns) {
        return freeze({
            ...node,
            columns: [...(node.columns || []), ...columns],
        });
    },
});

/// <reference types="./alter-table-add-index-builder.d.ts" />
class AlterTableAddIndexBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Makes the index unique.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .unique()
     *   .column('email')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_first_name_index` (`email`)
     * ```
     */
    unique() {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
                    unique: true,
                }),
            }),
        });
    }
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .column('first_name')
     *   .column('age desc')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */
    column(column) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
                    parseOrderedColumnName(column),
                ]),
            }),
        });
    }
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_and_age_index')
     *   .columns(['first_name', 'age desc'])
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
     * ```
     */
    columns(columns) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, columns.map(parseOrderedColumnName)),
            }),
        });
    }
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .alterTable('person')
     *   .addIndex('person_first_name_index')
     *   .expression(sql<boolean>`(first_name < 'Sami')`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add index `person_first_name_index` ((first_name < 'Sami'))
     * ```
     */
    expression(expression) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWithColumns(this.#props.node.addIndex, [
                    expression.toOperationNode(),
                ]),
            }),
        });
    }
    using(indexType) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.cloneWith(this.#props.node.addIndex, {
                    using: RawNode.createWithSql(indexType),
                }),
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./unique-constraint-builder.d.ts" />
class UniqueConstraintNodeBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /**
     * Adds `nulls not distinct` to the unique constraint definition
     *
     * Supported by PostgreSQL dialect only
     */
    nullsNotDistinct() {
        return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { nullsNotDistinct: true }));
    }
    deferrable() {
        return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { deferrable: true }));
    }
    notDeferrable() {
        return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { deferrable: false }));
    }
    initiallyDeferred() {
        return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, {
            initiallyDeferred: true,
        }));
    }
    initiallyImmediate() {
        return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, {
            initiallyDeferred: false,
        }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}

/// <reference types="./primary-key-constraint-builder.d.ts" />
class PrimaryKeyConstraintBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    deferrable() {
        return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, { deferrable: true }));
    }
    notDeferrable() {
        return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, { deferrable: false }));
    }
    initiallyDeferred() {
        return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, {
            initiallyDeferred: true,
        }));
    }
    initiallyImmediate() {
        return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(this.#node, {
            initiallyDeferred: false,
        }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}

/// <reference types="./check-constraint-builder.d.ts" />
class CheckConstraintBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#node;
    }
}

/// <reference types="./rename-constraint-node.d.ts" />
/**
 * @internal
 */
const RenameConstraintNode = freeze({
    is(node) {
        return node.kind === 'RenameConstraintNode';
    },
    create(oldName, newName) {
        return freeze({
            kind: 'RenameConstraintNode',
            oldName: IdentifierNode.create(oldName),
            newName: IdentifierNode.create(newName),
        });
    },
});

/// <reference types="./alter-table-builder.d.ts" />
/**
 * This builder can be used to create a `alter table` query.
 */
class AlterTableBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    renameTo(newTableName) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                renameTo: parseTable(newTableName),
            }),
        });
    }
    setSchema(newSchema) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                setSchema: IdentifierNode.create(newSchema),
            }),
        });
    }
    alterColumn(column, alteration) {
        const builder = alteration(new AlterColumnBuilder(column));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode()),
        });
    }
    dropColumn(column) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column)),
        });
    }
    renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn)),
        });
    }
    addColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode())),
        });
    }
    modifyColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode())),
        });
    }
    /**
     * See {@link CreateTableBuilder.addUniqueConstraint}
     */
    addUniqueConstraint(constraintName, columns, build = noop) {
        const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addConstraint: AddConstraintNode.create(uniqueConstraintBuilder.toOperationNode()),
            }),
        });
    }
    /**
     * See {@link CreateTableBuilder.addCheckConstraint}
     */
    addCheckConstraint(constraintName, checkExpression, build = noop) {
        const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode()),
            }),
        });
    }
    /**
     * See {@link CreateTableBuilder.addForeignKeyConstraint}
     *
     * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
     * the constraint builder and doesn't take a callback as the last argument. This
     * is because you can only add one column per `ALTER TABLE` query.
     */
    addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
        const constraintBuilder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder,
        });
    }
    /**
     * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
     */
    addPrimaryKeyConstraint(constraintName, columns, build = noop) {
        const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode()),
            }),
        });
    }
    dropConstraint(constraintName) {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropConstraint: DropConstraintNode.create(constraintName),
            }),
        });
    }
    renameConstraint(oldName, newName) {
        return new AlterTableDropConstraintBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                renameConstraint: RenameConstraintNode.create(oldName, newName),
            }),
        });
    }
    /**
     * This can be used to add index to table.
     *
     *  ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .addIndex('person_email_index')
     *   .column('email')
     *   .unique()
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` add unique index `person_email_index` (`email`)
     * ```
     */
    addIndex(indexName) {
        return new AlterTableAddIndexBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                addIndex: AddIndexNode.create(indexName),
            }),
        });
    }
    /**
     * This can be used to drop index from table.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.alterTable('person')
     *   .dropIndex('person_email_index')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * alter table `person` drop index `test_first_name_index`
     * ```
     */
    dropIndex(indexName) {
        return new AlterTableExecutor({
            ...this.#props,
            node: AlterTableNode.cloneWithTableProps(this.#props.node, {
                dropIndex: DropIndexNode.create(indexName),
            }),
        });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * See {@link CreateTableBuilder.$call}
     */
    $call(func) {
        return func(this);
    }
}
class AlterTableColumnAlteringBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    alterColumn(column, alteration) {
        const builder = alteration(new AlterColumnBuilder(column));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode()),
        });
    }
    dropColumn(column) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column)),
        });
    }
    renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn)),
        });
    }
    addColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode())),
        });
    }
    modifyColumn(columnName, dataType, build = noop) {
        const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new AlterTableColumnAlteringBuilder({
            ...this.#props,
            node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode())),
        });
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./immediate-value-transformer.d.ts" />
/**
 * Transforms all ValueNodes to immediate.
 *
 * WARNING! This should never be part of the public API. Users should never use this.
 * This is an internal helper.
 *
 * @internal
 */
class ImmediateValueTransformer extends OperationNodeTransformer {
    transformPrimitiveValueList(node) {
        return ValueListNode.create(node.values.map(ValueNode.createImmediate));
    }
    transformValue(node) {
        return ValueNode.createImmediate(node.value);
    }
}

/// <reference types="./create-index-builder.d.ts" />
class CreateIndexBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the index already exists, no error is thrown if this method has been called.
     */
    ifNotExists() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                ifNotExists: true,
            }),
        });
    }
    /**
     * Makes the index unique.
     */
    unique() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                unique: true,
            }),
        });
    }
    /**
     * Adds `nulls not distinct` specifier to index.
     * This only works on some dialects like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createIndex('person_first_name_index')
     *  .on('person')
     *  .column('first_name')
     *  .nullsNotDistinct()
     *  .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index"
     * on "test" ("first_name")
     * nulls not distinct;
     * ```
     */
    nullsNotDistinct() {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                nullsNotDistinct: true,
            }),
        });
    }
    /**
     * Specifies the table for the index.
     */
    on(table) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                table: parseTable(table),
            }),
        });
    }
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .column('first_name')
     *         .column('age desc')
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    column(column) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWithColumns(this.#props.node, [
                parseOrderedColumnName(column),
            ]),
        });
    }
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .columns(['first_name', 'age desc'])
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    columns(columns) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWithColumns(this.#props.node, columns.map(parseOrderedColumnName)),
        });
    }
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createIndex('person_first_name_index')
     *   .on('person')
     *   .expression(sql`first_name COLLATE "fi_FI"`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
     * ```
     */
    expression(expression) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWithColumns(this.#props.node, [
                expression.toOperationNode(),
            ]),
        });
    }
    using(indexType) {
        return new CreateIndexBuilder({
            ...this.#props,
            node: CreateIndexNode.cloneWith(this.#props.node, {
                using: RawNode.createWithSql(indexType),
            }),
        });
    }
    where(...args) {
        const transformer = new ImmediateValueTransformer();
        return new CreateIndexBuilder({
            ...this.#props,
            node: QueryNode.cloneWithWhere(this.#props.node, transformer.transformNode(parseValueBinaryOperationOrExpression(args), this.#props.queryId)),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./create-schema-builder.d.ts" />
class CreateSchemaBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifNotExists() {
        return new CreateSchemaBuilder({
            ...this.#props,
            node: CreateSchemaNode.cloneWith(this.#props.node, { ifNotExists: true }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./on-commit-action-parse.d.ts" />
function parseOnCommitAction(action) {
    if (ON_COMMIT_ACTIONS.includes(action)) {
        return action;
    }
    throw new Error(`invalid OnCommitAction ${action}`);
}

/// <reference types="./create-table-builder.d.ts" />
/**
 * This builder can be used to create a `create table` query.
 */
class CreateTableBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary table.
     */
    temporary() {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                temporary: true,
            }),
        });
    }
    /**
     * Adds an "on commit" statement.
     *
     * This can be used in conjunction with temporary tables on supported databases
     * like PostgreSQL.
     */
    onCommit(onCommit) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                onCommit: parseOnCommitAction(onCommit),
            }),
        });
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the table already exists, no error is thrown if this method has been called.
     */
    ifNotExists() {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                ifNotExists: true,
            }),
        });
    }
    /**
     * Adds a column to the table.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
     *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
     *   .addColumn('last_name', 'varchar(255)')
     *   .addColumn('bank_balance', 'numeric(8, 2)')
     *   // You can specify any data type using the `sql` tag if the types
     *   // don't include it.
     *   .addColumn('data', sql`any_type_here`)
     *   .addColumn('parent_id', 'integer', (col) =>
     *     col.references('person.id').onDelete('cascade')
     *   )
     * ```
     *
     * With this method, it's once again good to remember that Kysely just builds the
     * query and doesn't provide the same API for all databases. For example, some
     * databases like older MySQL don't support the `references` statement in the
     * column definition. Instead foreign key constraints need to be defined in the
     * `create table` query. See the next example:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.primaryKey())
     *   .addColumn('parent_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'person_parent_id_fk',
     *     ['parent_id'],
     *     'person',
     *     ['id'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * Another good example is that PostgreSQL doesn't support the `auto_increment`
     * keyword and you need to define an autoincrementing column for example using
     * `serial`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'serial', (col) => col.primaryKey())
     *   .execute()
     * ```
     */
    addColumn(columnName, dataType, build = noop) {
        const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithColumn(this.#props.node, columnBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a primary key constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    addPrimaryKeyConstraint(constraintName, columns, build = noop) {
        const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a unique constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name']
     *   )
     *   .execute()
     * ```
     *
     * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('first_name', 'varchar(64)')
     *   .addColumn('last_name', 'varchar(64)')
     *   .addUniqueConstraint(
     *     'first_name_last_name_unique',
     *     ['first_name', 'last_name'],
     *     (cb) => cb.nullsNotDistinct()
     *   )
     *   .execute()
     * ```
     */
    addUniqueConstraint(constraintName, columns, build = noop) {
        const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, uniqueConstraintBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a check constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('animal')
     *   .addColumn('number_of_legs', 'integer')
     *   .addCheckConstraint('check_legs', sql`number_of_legs < 5`)
     *   .execute()
     * ```
     */
    addCheckConstraint(constraintName, checkExpression, build = noop) {
        const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, constraintBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a foreign key constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id'],
     *     'person',
     *     ['id'],
     *   )
     *   .execute()
     * ```
     *
     * Add constraint for multiple columns:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('owner_id1', 'integer')
     *   .addColumn('owner_id2', 'integer')
     *   .addForeignKeyConstraint(
     *     'owner_id_foreign',
     *     ['owner_id1', 'owner_id2'],
     *     'person',
     *     ['id1', 'id2'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
        const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithConstraint(this.#props.node, builder.toOperationNode()),
        });
    }
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
     *
     * Also see {@link temporary}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .modifyFront(sql`global temporary`)
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (Postgres):
     *
     * ```sql
     * create global temporary table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(64) not null,
     *   "last_name" varchar(64) not null
     * )
     * ```
     */
    modifyFront(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithFrontModifier(this.#props.node, modifier.toOperationNode()),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link onCommit}.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
     *   .modifyEnd(sql`collate utf8_unicode_ci`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(64) not null,
     *   `last_name` varchar(64) not null
     * ) collate utf8_unicode_ci
     * ```
     */
    modifyEnd(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWithEndModifier(this.#props.node, modifier.toOperationNode()),
        });
    }
    /**
     * Allows to create table from `select` query.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('copy')
     *   .temporary()
     *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create temporary table "copy" as
     * select "first_name", "last_name" from "person"
     * ```
     */
    as(expression) {
        return new CreateTableBuilder({
            ...this.#props,
            node: CreateTableNode.cloneWith(this.#props.node, {
                selectQuery: parseExpression(expression),
            }),
        });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createTable('test')
     *   .$call((builder) => builder.addColumn('id', 'integer'))
     *   .execute()
     * ```
     *
     * This is useful for creating reusable functions that can be called with a builder.
     *
     * ```ts
     * import { type CreateTableBuilder, sql } from 'kysely'
     *
     * const addDefaultColumns = (ctb: CreateTableBuilder<any, any>) => {
     *   return ctb
     *     .addColumn('id', 'integer', (col) => col.notNull())
     *     .addColumn('created_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     *     .addColumn('updated_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     * }
     *
     * await db.schema
     *   .createTable('test')
     *   .$call(addDefaultColumns)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./drop-index-builder.d.ts" />
class DropIndexBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Specifies the table the index was created for. This is not needed
     * in all dialects.
     */
    on(table) {
        return new DropIndexBuilder({
            ...this.#props,
            node: DropIndexNode.cloneWith(this.#props.node, {
                table: parseTable(table),
            }),
        });
    }
    ifExists() {
        return new DropIndexBuilder({
            ...this.#props,
            node: DropIndexNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropIndexBuilder({
            ...this.#props,
            node: DropIndexNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./drop-schema-builder.d.ts" />
class DropSchemaBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new DropSchemaBuilder({
            ...this.#props,
            node: DropSchemaNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropSchemaBuilder({
            ...this.#props,
            node: DropSchemaNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./drop-table-builder.d.ts" />
class DropTableBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new DropTableBuilder({
            ...this.#props,
            node: DropTableNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropTableBuilder({
            ...this.#props,
            node: DropTableNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./create-view-node.d.ts" />
/**
 * @internal
 */
const CreateViewNode = freeze({
    is(node) {
        return node.kind === 'CreateViewNode';
    },
    create(name) {
        return freeze({
            kind: 'CreateViewNode',
            name: SchemableIdentifierNode.create(name),
        });
    },
    cloneWith(createView, params) {
        return freeze({
            ...createView,
            ...params,
        });
    },
});

/// <reference types="./immediate-value-plugin.d.ts" />
/**
 * Transforms all ValueNodes to immediate.
 *
 * WARNING! This should never be part of the public API. Users should never use this.
 * This is an internal helper.
 *
 * @internal
 */
class ImmediateValuePlugin {
    #transformer = new ImmediateValueTransformer();
    transformQuery(args) {
        return this.#transformer.transformNode(args.node, args.queryId);
    }
    transformResult(args) {
        return Promise.resolve(args.result);
    }
}

/// <reference types="./create-view-builder.d.ts" />
class CreateViewBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary view.
     */
    temporary() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                temporary: true,
            }),
        });
    }
    materialized() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                materialized: true,
            }),
        });
    }
    /**
     * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
     */
    ifNotExists() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                ifNotExists: true,
            }),
        });
    }
    orReplace() {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                orReplace: true,
            }),
        });
    }
    columns(columns) {
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                columns: columns.map(parseColumnName),
            }),
        });
    }
    /**
     * Sets the select query or a `values` statement that creates the view.
     *
     * WARNING!
     * Some dialects don't support parameterized queries in DDL statements and therefore
     * the query or raw {@link sql } expression passed here is interpolated into a single
     * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
     * into the query or raw expression passed to this method!
     */
    as(query) {
        const queryNode = query
            .withPlugin(new ImmediateValuePlugin())
            .toOperationNode();
        return new CreateViewBuilder({
            ...this.#props,
            node: CreateViewNode.cloneWith(this.#props.node, {
                as: queryNode,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./drop-view-node.d.ts" />
/**
 * @internal
 */
const DropViewNode = freeze({
    is(node) {
        return node.kind === 'DropViewNode';
    },
    create(name) {
        return freeze({
            kind: 'DropViewNode',
            name: SchemableIdentifierNode.create(name),
        });
    },
    cloneWith(dropView, params) {
        return freeze({
            ...dropView,
            ...params,
        });
    },
});

/// <reference types="./drop-view-builder.d.ts" />
class DropViewBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    materialized() {
        return new DropViewBuilder({
            ...this.#props,
            node: DropViewNode.cloneWith(this.#props.node, {
                materialized: true,
            }),
        });
    }
    ifExists() {
        return new DropViewBuilder({
            ...this.#props,
            node: DropViewNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    cascade() {
        return new DropViewBuilder({
            ...this.#props,
            node: DropViewNode.cloneWith(this.#props.node, {
                cascade: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./create-type-node.d.ts" />
/**
 * @internal
 */
const CreateTypeNode = freeze({
    is(node) {
        return node.kind === 'CreateTypeNode';
    },
    create(name) {
        return freeze({
            kind: 'CreateTypeNode',
            name,
        });
    },
    cloneWithEnum(createType, values) {
        return freeze({
            ...createType,
            enum: ValueListNode.create(values.map(ValueNode.createImmediate)),
        });
    },
});

/// <reference types="./create-type-builder.d.ts" />
class CreateTypeBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    /**
     * Creates an anum type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
     * ```
     */
    asEnum(values) {
        return new CreateTypeBuilder({
            ...this.#props,
            node: CreateTypeNode.cloneWithEnum(this.#props.node, values),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./drop-type-node.d.ts" />
/**
 * @internal
 */
const DropTypeNode = freeze({
    is(node) {
        return node.kind === 'DropTypeNode';
    },
    create(name) {
        return freeze({
            kind: 'DropTypeNode',
            name,
        });
    },
    cloneWith(dropType, params) {
        return freeze({
            ...dropType,
            ...params,
        });
    },
});

/// <reference types="./drop-type-builder.d.ts" />
class DropTypeBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    ifExists() {
        return new DropTypeBuilder({
            ...this.#props,
            node: DropTypeNode.cloneWith(this.#props.node, {
                ifExists: true,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./identifier-parser.d.ts" />
function parseSchemableIdentifier(id) {
    const SCHEMA_SEPARATOR = '.';
    if (id.includes(SCHEMA_SEPARATOR)) {
        const parts = id.split(SCHEMA_SEPARATOR).map(trim);
        if (parts.length === 2) {
            return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
        }
        else {
            throw new Error(`invalid schemable identifier ${id}`);
        }
    }
    else {
        return SchemableIdentifierNode.create(id);
    }
}
function trim(str) {
    return str.trim();
}

/// <reference types="./refresh-materialized-view-node.d.ts" />
/**
 * @internal
 */
const RefreshMaterializedViewNode = freeze({
    is(node) {
        return node.kind === 'RefreshMaterializedViewNode';
    },
    create(name) {
        return freeze({
            kind: 'RefreshMaterializedViewNode',
            name: SchemableIdentifierNode.create(name),
        });
    },
    cloneWith(createView, params) {
        return freeze({
            ...createView,
            ...params,
        });
    },
});

/// <reference types="./refresh-materialized-view-builder.d.ts" />
class RefreshMaterializedViewBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    /**
     * Adds the "concurrently" modifier.
     *
     * Use this to refresh the view without locking out concurrent selects on the materialized view.
     *
     * WARNING!
     * This cannot be used with the "with no data" modifier.
     */
    concurrently() {
        return new RefreshMaterializedViewBuilder({
            ...this.#props,
            node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
                concurrently: true,
                withNoData: false,
            }),
        });
    }
    /**
     * Adds the "with data" modifier.
     *
     * If specified (or defaults) the backing query is executed to provide the new data, and the materialized view is left in a scannable state
     */
    withData() {
        return new RefreshMaterializedViewBuilder({
            ...this.#props,
            node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
                withNoData: false,
            }),
        });
    }
    /**
     * Adds the "with no data" modifier.
     *
     * If specified, no new data is generated and the materialized view is left in an unscannable state.
     *
     * WARNING!
     * This cannot be used with the "concurrently" modifier.
     */
    withNoData() {
        return new RefreshMaterializedViewBuilder({
            ...this.#props,
            node: RefreshMaterializedViewNode.cloneWith(this.#props.node, {
                withNoData: true,
                concurrently: false,
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile());
    }
}

/// <reference types="./schema.d.ts" />
/**
 * Provides methods for building database schema.
 */
class SchemaModule {
    #executor;
    constructor(executor) {
        this.#executor = executor;
    }
    /**
     * Create a new table.
     *
     * ### Examples
     *
     * This example creates a new table with columns `id`, `first_name`,
     * `last_name` and `gender`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('first_name', 'varchar', col => col.notNull())
     *   .addColumn('last_name', 'varchar', col => col.notNull())
     *   .addColumn('gender', 'varchar')
     *   .execute()
     * ```
     *
     * This example creates a table with a foreign key. Not all database
     * engines support column-level foreign key constraint definitions.
     * For example if you are using MySQL 5.X see the next example after
     * this one.
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer', col => col
     *     .references('person.id')
     *     .onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * This example adds a foreign key constraint for a columns just
     * like the previous example, but using a table-level statement.
     * On MySQL 5.X you need to define foreign key constraints like
     * this:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
     *     (constraint) => constraint.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    createTable(table) {
        return new CreateTableBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateTableNode.create(parseTable(table)),
        });
    }
    /**
     * Drop a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropTable('person')
     *   .execute()
     * ```
     */
    dropTable(table) {
        return new DropTableBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropTableNode.create(parseTable(table)),
        });
    }
    /**
     * Create a new index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createIndex('person_full_name_unique_index')
     *   .on('person')
     *   .columns(['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    createIndex(indexName) {
        return new CreateIndexBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateIndexNode.create(indexName),
        });
    }
    /**
     * Drop an index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropIndex('person_full_name_unique_index')
     *   .execute()
     * ```
     */
    dropIndex(indexName) {
        return new DropIndexBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropIndexNode.create(indexName),
        });
    }
    /**
     * Create a new schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createSchema('some_schema')
     *   .execute()
     * ```
     */
    createSchema(schema) {
        return new CreateSchemaBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateSchemaNode.create(schema),
        });
    }
    /**
     * Drop a schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropSchema('some_schema')
     *   .execute()
     * ```
     */
    dropSchema(schema) {
        return new DropSchemaBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropSchemaNode.create(schema),
        });
    }
    /**
     * Alter a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
     *   .execute()
     * ```
     */
    alterTable(table) {
        return new AlterTableBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: AlterTableNode.create(parseTable(table)),
        });
    }
    /**
     * Create a new view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createView('dogs')
     *   .orReplace()
     *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
     *   .execute()
     * ```
     */
    createView(viewName) {
        return new CreateViewBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateViewNode.create(viewName),
        });
    }
    /**
     * Refresh a materialized view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .refreshMaterializedView('my_view')
     *   .concurrently()
     *   .execute()
     * ```
     */
    refreshMaterializedView(viewName) {
        return new RefreshMaterializedViewBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: RefreshMaterializedViewNode.create(viewName),
        });
    }
    /**
     * Drop a view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropView('dogs')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropView(viewName) {
        return new DropViewBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropViewNode.create(viewName),
        });
    }
    /**
     * Create a new type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createType('species')
     *   .asEnum(['dog', 'cat', 'frog'])
     *   .execute()
     * ```
     */
    createType(typeName) {
        return new CreateTypeBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: CreateTypeNode.create(parseSchemableIdentifier(typeName)),
        });
    }
    /**
     * Drop a type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropType('species')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropType(typeName) {
        return new DropTypeBuilder({
            queryId: createQueryId(),
            executor: this.#executor,
            node: DropTypeNode.create(parseSchemableIdentifier(typeName)),
        });
    }
    /**
     * Returns a copy of this schema module with the given plugin installed.
     */
    withPlugin(plugin) {
        return new SchemaModule(this.#executor.withPlugin(plugin));
    }
    /**
     * Returns a copy of this schema module  without any plugins.
     */
    withoutPlugins() {
        return new SchemaModule(this.#executor.withoutPlugins());
    }
    /**
     * See {@link QueryCreator.withSchema}
     */
    withSchema(schema) {
        return new SchemaModule(this.#executor.withPluginAtFront(new WithSchemaPlugin(schema)));
    }
}

/// <reference types="./dynamic.d.ts" />
class DynamicModule {
    /**
     * Creates a dynamic reference to a column that is not know at compile time.
     *
     * Kysely is built in a way that by default you can't refer to tables or columns
     * that are not actually visible in the current query and context. This is all
     * done by TypeScript at compile time, which means that you need to know the
     * columns and tables at compile time. This is not always the case of course.
     *
     * This method is meant to be used in those cases where the column names
     * come from the user input or are not otherwise known at compile time.
     *
     * WARNING! Unlike values, column names are not escaped by the database engine
     * or Kysely and if you pass in unchecked column names using this method, you
     * create an SQL injection vulnerability. Always __always__ validate the user
     * input before passing it to this method.
     *
     * There are couple of examples below for some use cases, but you can pass
     * `ref` to other methods as well. If the types allow you to pass a `ref`
     * value to some place, it should work.
     *
     * ### Examples
     *
     * Filter by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(filterColumn: string, filterValue: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where(ref(filterColumn), '=', filterValue)
     *     .execute()
     * }
     *
     * someQuery('first_name', 'Arnold')
     * someQuery('person.last_name', 'Aniston')
     * ```
     *
     * Order by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * In this example we add selections dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput: PossibleColumns = 'birthdate';
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
     *
     * const [person] = await db.selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput),
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | null | undefined = person?.last_name
     * const firstName: string | undefined = person?.first_name
     * const birthDate: Date | null | undefined = person?.birthdate
     *
     * // The result type also contains the compile time selection `id`.
     * person?.id
     * ```
     */
    ref(reference) {
        return new DynamicReferenceBuilder(reference);
    }
    /**
     * Creates a table reference to a table that's not fully known at compile time.
     *
     * The type `T` is allowed to be a union of multiple tables.
     *
     * <!-- siteExample("select", "Generic find query", 130) -->
     *
     * A generic type-safe helper function for finding a row by a column value:
     *
     * ```ts
     * import { SelectType } from 'kysely'
     * import { Database } from 'type-editor'
     *
     * async function getRowByColumn<
     *   T extends keyof Database,
     *   C extends keyof Database[T] & string,
     *   V extends SelectType<Database[T][C]>,
     * >(t: T, c: C, v: V) {
     *   // We need to use the dynamic module since the table name
     *   // is not known at compile time.
     *   const { table, ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom(table(t).as('t'))
     *     .selectAll()
     *     .where(ref(c), '=', v)
     *     .orderBy('t.id')
     *     .executeTakeFirstOrThrow()
     * }
     *
     * const person = await getRowByColumn('person', 'first_name', 'Arnold')
     * ```
     */
    table(table) {
        return new DynamicTableBuilder(table);
    }
}

/// <reference types="./default-connection-provider.d.ts" />
class DefaultConnectionProvider {
    #driver;
    constructor(driver) {
        this.#driver = driver;
    }
    async provideConnection(consumer) {
        const connection = await this.#driver.acquireConnection();
        try {
            return await consumer(connection);
        }
        finally {
            await this.#driver.releaseConnection(connection);
        }
    }
}

/// <reference types="./default-query-executor.d.ts" />
class DefaultQueryExecutor extends QueryExecutorBase {
    #compiler;
    #adapter;
    #connectionProvider;
    constructor(compiler, adapter, connectionProvider, plugins = []) {
        super(plugins);
        this.#compiler = compiler;
        this.#adapter = adapter;
        this.#connectionProvider = connectionProvider;
    }
    get adapter() {
        return this.#adapter;
    }
    compileQuery(node, queryId) {
        return this.#compiler.compileQuery(node, queryId);
    }
    provideConnection(consumer) {
        return this.#connectionProvider.provideConnection(consumer);
    }
    withPlugins(plugins) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, ...plugins]);
    }
    withPlugin(plugin) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, plugin]);
    }
    withPluginAtFront(plugin) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [plugin, ...this.plugins]);
    }
    withConnectionProvider(connectionProvider) {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, connectionProvider, [...this.plugins]);
    }
    withoutPlugins() {
        return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, []);
    }
}

/// <reference types="./performance-now.d.ts" />
function performanceNow() {
    if (typeof performance !== 'undefined' && isFunction(performance.now)) {
        return performance.now();
    }
    else {
        return Date.now();
    }
}

/// <reference types="./runtime-driver.d.ts" />
/**
 * A small wrapper around {@link Driver} that makes sure the driver is
 * initialized before it is used, only initialized and destroyed
 * once etc.
 */
class RuntimeDriver {
    #driver;
    #log;
    #initPromise;
    #initDone;
    #destroyPromise;
    #connections = new WeakSet();
    constructor(driver, log) {
        this.#initDone = false;
        this.#driver = driver;
        this.#log = log;
    }
    async init() {
        if (this.#destroyPromise) {
            throw new Error('driver has already been destroyed');
        }
        if (!this.#initPromise) {
            this.#initPromise = this.#driver
                .init()
                .then(() => {
                this.#initDone = true;
            })
                .catch((err) => {
                this.#initPromise = undefined;
                return Promise.reject(err);
            });
        }
        await this.#initPromise;
    }
    async acquireConnection() {
        if (this.#destroyPromise) {
            throw new Error('driver has already been destroyed');
        }
        if (!this.#initDone) {
            await this.init();
        }
        const connection = await this.#driver.acquireConnection();
        if (!this.#connections.has(connection)) {
            if (this.#needsLogging()) {
                this.#addLogging(connection);
            }
            this.#connections.add(connection);
        }
        return connection;
    }
    async releaseConnection(connection) {
        await this.#driver.releaseConnection(connection);
    }
    beginTransaction(connection, settings) {
        return this.#driver.beginTransaction(connection, settings);
    }
    commitTransaction(connection) {
        return this.#driver.commitTransaction(connection);
    }
    rollbackTransaction(connection) {
        return this.#driver.rollbackTransaction(connection);
    }
    savepoint(connection, savepointName, compileQuery) {
        if (this.#driver.savepoint) {
            return this.#driver.savepoint(connection, savepointName, compileQuery);
        }
        throw new Error('The `savepoint` method is not supported by this driver');
    }
    rollbackToSavepoint(connection, savepointName, compileQuery) {
        if (this.#driver.rollbackToSavepoint) {
            return this.#driver.rollbackToSavepoint(connection, savepointName, compileQuery);
        }
        throw new Error('The `rollbackToSavepoint` method is not supported by this driver');
    }
    releaseSavepoint(connection, savepointName, compileQuery) {
        if (this.#driver.releaseSavepoint) {
            return this.#driver.releaseSavepoint(connection, savepointName, compileQuery);
        }
        throw new Error('The `releaseSavepoint` method is not supported by this driver');
    }
    async destroy() {
        if (!this.#initPromise) {
            return;
        }
        await this.#initPromise;
        if (!this.#destroyPromise) {
            this.#destroyPromise = this.#driver.destroy().catch((err) => {
                this.#destroyPromise = undefined;
                return Promise.reject(err);
            });
        }
        await this.#destroyPromise;
    }
    #needsLogging() {
        return (this.#log.isLevelEnabled('query') || this.#log.isLevelEnabled('error'));
    }
    // This method monkey patches the database connection's executeQuery method
    // by adding logging code around it. Monkey patching is not pretty, but it's
    // the best option in this case.
    #addLogging(connection) {
        const executeQuery = connection.executeQuery;
        const streamQuery = connection.streamQuery;
        const dis = this;
        connection.executeQuery = async (compiledQuery) => {
            let caughtError;
            const startTime = performanceNow();
            try {
                return await executeQuery.call(connection, compiledQuery);
            }
            catch (error) {
                caughtError = error;
                await dis.#logError(error, compiledQuery, startTime);
                throw error;
            }
            finally {
                if (!caughtError) {
                    await dis.#logQuery(compiledQuery, startTime);
                }
            }
        };
        connection.streamQuery = async function* (compiledQuery, chunkSize) {
            let caughtError;
            const startTime = performanceNow();
            try {
                for await (const result of streamQuery.call(connection, compiledQuery, chunkSize)) {
                    yield result;
                }
            }
            catch (error) {
                caughtError = error;
                await dis.#logError(error, compiledQuery, startTime);
                throw error;
            }
            finally {
                if (!caughtError) {
                    await dis.#logQuery(compiledQuery, startTime, true);
                }
            }
        };
    }
    async #logError(error, compiledQuery, startTime) {
        await this.#log.error(() => ({
            level: 'error',
            error,
            query: compiledQuery,
            queryDurationMillis: this.#calculateDurationMillis(startTime),
        }));
    }
    async #logQuery(compiledQuery, startTime, isStream = false) {
        await this.#log.query(() => ({
            level: 'query',
            isStream,
            query: compiledQuery,
            queryDurationMillis: this.#calculateDurationMillis(startTime),
        }));
    }
    #calculateDurationMillis(startTime) {
        return performanceNow() - startTime;
    }
}

/// <reference types="./single-connection-provider.d.ts" />
const ignoreError = () => { };
class SingleConnectionProvider {
    #connection;
    #runningPromise;
    constructor(connection) {
        this.#connection = connection;
    }
    async provideConnection(consumer) {
        while (this.#runningPromise) {
            await this.#runningPromise.catch(ignoreError);
        }
        // `#runningPromise` must be set to undefined before it's
        // resolved or rejected. Otherwise the while loop above
        // will misbehave.
        this.#runningPromise = this.#run(consumer).finally(() => {
            this.#runningPromise = undefined;
        });
        return this.#runningPromise;
    }
    // Run the runner in an async function to make sure it doesn't
    // throw synchronous errors.
    async #run(runner) {
        return await runner(this.#connection);
    }
}

/// <reference types="./driver.d.ts" />
const TRANSACTION_ACCESS_MODES = ['read only', 'read write'];
const TRANSACTION_ISOLATION_LEVELS = [
    'read uncommitted',
    'read committed',
    'repeatable read',
    'serializable',
    'snapshot',
];
function validateTransactionSettings(settings) {
    if (settings.accessMode &&
        !TRANSACTION_ACCESS_MODES.includes(settings.accessMode)) {
        throw new Error(`invalid transaction access mode ${settings.accessMode}`);
    }
    if (settings.isolationLevel &&
        !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
        throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
    }
}

/// <reference types="./log.d.ts" />
const logLevels = ['query', 'error'];
freeze(logLevels);
class Log {
    #levels;
    #logger;
    constructor(config) {
        if (isFunction(config)) {
            this.#logger = config;
            this.#levels = freeze({
                query: true,
                error: true,
            });
        }
        else {
            this.#logger = defaultLogger;
            this.#levels = freeze({
                query: config.includes('query'),
                error: config.includes('error'),
            });
        }
    }
    isLevelEnabled(level) {
        return this.#levels[level];
    }
    async query(getEvent) {
        if (this.#levels.query) {
            await this.#logger(getEvent());
        }
    }
    async error(getEvent) {
        if (this.#levels.error) {
            await this.#logger(getEvent());
        }
    }
}
function defaultLogger(event) {
    if (event.level === 'query') {
        const prefix = `kysely:query:${event.isStream ? 'stream:' : ''}`;
        console.log(`${prefix} ${event.query.sql}`);
        console.log(`${prefix} duration: ${event.queryDurationMillis.toFixed(1)}ms`);
    }
    else if (event.level === 'error') {
        if (event.error instanceof Error) {
            console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
        }
        else {
            console.error(`kysely:error: ${JSON.stringify({
                error: event.error,
                query: event.query.sql,
                queryDurationMillis: event.queryDurationMillis,
            })}`);
        }
    }
}

/// <reference types="./compilable.d.ts" />
function isCompilable(value) {
    return isObject(value) && isFunction(value.compile);
}

/// <reference types="./kysely.d.ts" />
// @ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose');
/**
 * The main Kysely class.
 *
 * You should create one instance of `Kysely` per database using the {@link Kysely}
 * constructor. Each `Kysely` instance maintains its own connection pool.
 *
 * ### Examples
 *
 * This example assumes your database has a "person" table:
 *
 * ```ts
 * import * as Sqlite from 'better-sqlite3'
 * import { type Generated, Kysely, SqliteDialect } from 'kysely'
 *
 * interface Database {
 *   person: {
 *     id: Generated<number>
 *     first_name: string
 *     last_name: string | null
 *   }
 * }
 *
 * const db = new Kysely<Database>({
 *   dialect: new SqliteDialect({
 *     database: new Sqlite(':memory:'),
 *   })
 * })
 * ```
 *
 * @typeParam DB - The database interface type. Keys of this type must be table names
 *    in the database and values must be interfaces that describe the rows in those
 *    tables. See the examples above.
 */
class Kysely extends QueryCreator {
    #props;
    constructor(args) {
        let superProps;
        let props;
        if (isKyselyProps(args)) {
            superProps = { executor: args.executor };
            props = { ...args };
        }
        else {
            const dialect = args.dialect;
            const driver = dialect.createDriver();
            const compiler = dialect.createQueryCompiler();
            const adapter = dialect.createAdapter();
            const log = new Log(args.log ?? []);
            const runtimeDriver = new RuntimeDriver(driver, log);
            const connectionProvider = new DefaultConnectionProvider(runtimeDriver);
            const executor = new DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
            superProps = { executor };
            props = {
                config: args,
                executor,
                dialect,
                driver: runtimeDriver,
            };
        }
        super(superProps);
        this.#props = freeze(props);
    }
    /**
     * Returns the {@link SchemaModule} module for building database schema.
     */
    get schema() {
        return new SchemaModule(this.#props.executor);
    }
    /**
     * Returns a the {@link DynamicModule} module.
     *
     * The {@link DynamicModule} module can be used to bypass strict typing and
     * passing in dynamic values for the queries.
     */
    get dynamic() {
        return new DynamicModule();
    }
    /**
     * Returns a {@link DatabaseIntrospector | database introspector}.
     */
    get introspection() {
        return this.#props.dialect.createIntrospector(this.withoutPlugins());
    }
    case(value) {
        return new CaseBuilder({
            node: CaseNode.create(isUndefined(value) ? undefined : parseExpression(value)),
        });
    }
    /**
     * Returns a {@link FunctionModule} that can be used to write somewhat type-safe function
     * calls.
     *
     * ```ts
     * const { count } = db.fn
     *
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select([
     *     'id',
     *     count('pet.id').as('person_count'),
     *   ])
     *   .groupBy('person.id')
     *   .having(count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "person_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     *
     * Why "somewhat" type-safe? Because the function calls are not bound to the
     * current query context. They allow you to reference columns and tables that
     * are not in the current query. E.g. remove the `innerJoin` from the previous
     * query and TypeScript won't even complain.
     *
     * If you want to make the function calls fully type-safe, you can use the
     * {@link ExpressionBuilder.fn} getter for a query context-aware, stricter {@link FunctionModule}.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select((eb) => [
     *     'person.id',
     *     eb.fn.count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
     *   .execute()
     * ```
     */
    get fn() {
        return createFunctionModule();
    }
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws an exception,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * To run a controlled transaction, allowing you to commit and rollback manually,
     * use {@link startTransaction} instead.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Simple transaction", 10) -->
     *
     * This example inserts two rows in a transaction. If an exception is thrown inside
     * the callback passed to the `execute` method,
     * 1. the exception is caught,
     * 2. the transaction is rolled back, and
     * 3. the exception is thrown again.
     * Otherwise the transaction is committed.
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     *
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    transaction() {
        return new TransactionBuilder({ ...this.#props });
    }
    /**
     * Creates a {@link ControlledTransactionBuilder} that can be used to run queries inside a controlled transaction.
     *
     * The returned {@link ControlledTransactionBuilder} can be used to configure the transaction.
     * The {@link ControlledTransactionBuilder.execute} method can then be called
     * to start the transaction and return a {@link ControlledTransaction}.
     *
     * A {@link ControlledTransaction} allows you to commit and rollback manually,
     * execute savepoint commands. It extends {@link Transaction} which extends {@link Kysely},
     * so you can run queries inside the transaction. Once the transaction is committed,
     * or rolled back, it can't be used anymore - all queries will throw an error.
     * This is to prevent accidentally running queries outside the transaction - where
     * atomicity is not guaranteed anymore.
     *
     * ### Examples
     *
     * <!-- siteExample("transactions", "Controlled transaction", 11) -->
     *
     * A controlled transaction allows you to commit and rollback manually, execute
     * savepoint commands, and queries in general.
     *
     * In this example we start a transaction, use it to insert two rows and then commit
     * the transaction. If an error is thrown, we catch it and rollback the transaction.
     *
     * ```ts
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   const catto = await trx.insertInto('pet')
     *     .values({
     *       owner_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat',
     *       is_favorite: false,
     *     })
     *     .returningAll()
     *     .executeTakeFirstOrThrow()
     *
     *   await trx.commit().execute()
     *
     *   // ...
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     * ```
     *
     * <!-- siteExample("transactions", "Controlled transaction /w savepoints", 12) -->
     *
     * A controlled transaction allows you to commit and rollback manually, execute
     * savepoint commands, and queries in general.
     *
     * In this example we start a transaction, insert a person, create a savepoint,
     * try inserting a toy and a pet, and if an error is thrown, we rollback to the
     * savepoint. Eventually we release the savepoint, insert an audit record and
     * commit the transaction. If an error is thrown, we catch it and rollback the
     * transaction.
     *
     * ```ts
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   const jennifer = await trx
     *     .insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *       age: 40,
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     *   try {
     *     const catto = await trxAfterJennifer
     *       .insertInto('pet')
     *       .values({
     *         owner_id: jennifer.id,
     *         name: 'Catto',
     *         species: 'cat',
     *       })
     *       .returning('id')
     *       .executeTakeFirstOrThrow()
     *
     *     await trxAfterJennifer
     *       .insertInto('toy')
     *       .values({ name: 'Bone', price: 1.99, pet_id: catto.id })
     *       .execute()
     *   } catch (error) {
     *     await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     *   }
     *
     *   await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
     *
     *   await trx.insertInto('audit').values({ action: 'added Jennifer' }).execute()
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     * ```
     */
    startTransaction() {
        return new ControlledTransactionBuilder({ ...this.#props });
    }
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     *
     * async function doStuff(kysely: typeof db) {
     *   // ...
     * }
     * ```
     */
    connection() {
        return new ConnectionBuilder({ ...this.#props });
    }
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin) {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins() {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins(),
        });
    }
    /**
     * @override
     */
    withSchema(schema) {
        return new Kysely({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema)),
        });
    }
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables() {
        return new Kysely({ ...this.#props });
    }
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */
    async destroy() {
        await this.#props.driver.destroy();
    }
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */
    get isTransaction() {
        return false;
    }
    /**
     * @internal
     * @private
     */
    getExecutor() {
        return this.#props.executor;
    }
    /**
     * Executes a given compiled query or query builder.
     *
     * See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
     */
    executeQuery(query, 
    // TODO: remove this in the future. deprecated in  0.28.x
    queryId) {
        if (queryId !== undefined) {
            logOnce('Passing `queryId` in `db.executeQuery` is deprecated and will result in a compile-time error in the future.');
        }
        const compiledQuery = isCompilable(query) ? query.compile() : query;
        return this.getExecutor().executeQuery(compiledQuery);
    }
    async [Symbol.asyncDispose]() {
        await this.destroy();
    }
}
class Transaction extends Kysely {
    #props;
    constructor(props) {
        super(props);
        this.#props = props;
    }
    // The return type is `true` instead of `boolean` to make Kysely<DB>
    // unassignable to Transaction<DB> while allowing assignment the
    // other way around.
    get isTransaction() {
        return true;
    }
    transaction() {
        throw new Error('calling the transaction method for a Transaction is not supported');
    }
    connection() {
        throw new Error('calling the connection method for a Transaction is not supported');
    }
    async destroy() {
        throw new Error('calling the destroy method for a Transaction is not supported');
    }
    withPlugin(plugin) {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    withoutPlugins() {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins(),
        });
    }
    withSchema(schema) {
        return new Transaction({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema)),
        });
    }
    withTables() {
        return new Transaction({ ...this.#props });
    }
}
function isKyselyProps(obj) {
    return (isObject(obj) &&
        isObject(obj.config) &&
        isObject(obj.driver) &&
        isObject(obj.executor) &&
        isObject(obj.dialect));
}
class ConnectionBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    async execute(callback) {
        return this.#props.executor.provideConnection(async (connection) => {
            const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
            const db = new Kysely({
                ...this.#props,
                executor,
            });
            return await callback(db);
        });
    }
}
class TransactionBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    setAccessMode(accessMode) {
        return new TransactionBuilder({
            ...this.#props,
            accessMode,
        });
    }
    setIsolationLevel(isolationLevel) {
        return new TransactionBuilder({
            ...this.#props,
            isolationLevel,
        });
    }
    async execute(callback) {
        const { isolationLevel, accessMode, ...kyselyProps } = this.#props;
        const settings = { isolationLevel, accessMode };
        validateTransactionSettings(settings);
        return this.#props.executor.provideConnection(async (connection) => {
            const state = { isCommitted: false, isRolledBack: false };
            const executor = new NotCommittedOrRolledBackAssertingExecutor(this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection)), state);
            const transaction = new Transaction({
                ...kyselyProps,
                executor,
            });
            let transactionBegun = false;
            try {
                await this.#props.driver.beginTransaction(connection, settings);
                transactionBegun = true;
                const result = await callback(transaction);
                await this.#props.driver.commitTransaction(connection);
                state.isCommitted = true;
                return result;
            }
            catch (error) {
                if (transactionBegun) {
                    await this.#props.driver.rollbackTransaction(connection);
                    state.isRolledBack = true;
                }
                throw error;
            }
        });
    }
}
class ControlledTransactionBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    setAccessMode(accessMode) {
        return new ControlledTransactionBuilder({
            ...this.#props,
            accessMode,
        });
    }
    setIsolationLevel(isolationLevel) {
        return new ControlledTransactionBuilder({
            ...this.#props,
            isolationLevel,
        });
    }
    async execute() {
        const { isolationLevel, accessMode, ...props } = this.#props;
        const settings = { isolationLevel, accessMode };
        validateTransactionSettings(settings);
        const connection = await provideControlledConnection(this.#props.executor);
        await this.#props.driver.beginTransaction(connection.connection, settings);
        return new ControlledTransaction({
            ...props,
            connection,
            executor: this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection.connection)),
        });
    }
}
class ControlledTransaction extends Transaction {
    #props;
    #compileQuery;
    #state;
    constructor(props) {
        const state = { isCommitted: false, isRolledBack: false };
        props = {
            ...props,
            executor: new NotCommittedOrRolledBackAssertingExecutor(props.executor, state),
        };
        const { connection, ...transactionProps } = props;
        super(transactionProps);
        this.#props = freeze(props);
        this.#state = state;
        const queryId = createQueryId();
        this.#compileQuery = (node) => props.executor.compileQuery(node, queryId);
    }
    get isCommitted() {
        return this.#state.isCommitted;
    }
    get isRolledBack() {
        return this.#state.isRolledBack;
    }
    /**
     * Commits the transaction.
     *
     * See {@link rollback}.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   await doSomething(trx)
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     *
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    commit() {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async () => {
            await this.#props.driver.commitTransaction(this.#props.connection.connection);
            this.#state.isCommitted = true;
            this.#props.connection.release();
        });
    }
    /**
     * Rolls back the transaction.
     *
     * See {@link commit} and {@link rollbackToSavepoint}.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * try {
     *   await doSomething(trx)
     *
     *   await trx.commit().execute()
     * } catch (error) {
     *   await trx.rollback().execute()
     * }
     *
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    rollback() {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async () => {
            await this.#props.driver.rollbackTransaction(this.#props.connection.connection);
            this.#state.isRolledBack = true;
            this.#props.connection.release();
        });
    }
    /**
     * Creates a savepoint with a given name.
     *
     * See {@link rollbackToSavepoint} and {@link releaseSavepoint}.
     *
     * For a type-safe experience, you should use the returned instance from now on.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    savepoint(savepointName) {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async () => {
            await this.#props.driver.savepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
            return new ControlledTransaction({ ...this.#props });
        });
    }
    /**
     * Rolls back to a savepoint with a given name.
     *
     * See {@link savepoint} and {@link releaseSavepoint}.
     *
     * You must use the same instance returned by {@link savepoint}, or
     * escape the type-check by using `as any`.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * ```
     */
    rollbackToSavepoint(savepointName) {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async () => {
            await this.#props.driver.rollbackToSavepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
            return new ControlledTransaction({ ...this.#props });
        });
    }
    /**
     * Releases a savepoint with a given name.
     *
     * See {@link savepoint} and {@link rollbackToSavepoint}.
     *
     * You must use the same instance returned by {@link savepoint}, or
     * escape the type-check by using `as any`.
     *
     * ### Examples
     *
     * ```ts
     * import type { Kysely } from 'kysely'
     * import type { Database } from 'type-editor' // imaginary module
     *
     * const trx = await db.startTransaction().execute()
     *
     * await insertJennifer(trx)
     *
     * const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
     *
     * try {
     *   await doSomething(trxAfterJennifer)
     * } catch (error) {
     *   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
     * }
     *
     * await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
     *
     * await doSomethingElse(trx)
     *
     * async function insertJennifer(kysely: Kysely<Database>) {}
     * async function doSomething(kysely: Kysely<Database>) {}
     * async function doSomethingElse(kysely: Kysely<Database>) {}
     * ```
     */
    releaseSavepoint(savepointName) {
        assertNotCommittedOrRolledBack(this.#state);
        return new Command(async () => {
            await this.#props.driver.releaseSavepoint?.(this.#props.connection.connection, savepointName, this.#compileQuery);
            return new ControlledTransaction({ ...this.#props });
        });
    }
    withPlugin(plugin) {
        return new ControlledTransaction({
            ...this.#props,
            executor: this.#props.executor.withPlugin(plugin),
        });
    }
    withoutPlugins() {
        return new ControlledTransaction({
            ...this.#props,
            executor: this.#props.executor.withoutPlugins(),
        });
    }
    withSchema(schema) {
        return new ControlledTransaction({
            ...this.#props,
            executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema)),
        });
    }
    withTables() {
        return new ControlledTransaction({ ...this.#props });
    }
}
class Command {
    #cb;
    constructor(cb) {
        this.#cb = cb;
    }
    /**
     * Executes the command.
     */
    async execute() {
        return await this.#cb();
    }
}
function assertNotCommittedOrRolledBack(state) {
    if (state.isCommitted) {
        throw new Error('Transaction is already committed');
    }
    if (state.isRolledBack) {
        throw new Error('Transaction is already rolled back');
    }
}
/**
 * An executor wrapper that asserts that the transaction state is not committed
 * or rolled back when a query is executed.
 *
 * @internal
 */
class NotCommittedOrRolledBackAssertingExecutor {
    #executor;
    #state;
    constructor(executor, state) {
        if (executor instanceof NotCommittedOrRolledBackAssertingExecutor) {
            this.#executor = executor.#executor;
        }
        else {
            this.#executor = executor;
        }
        this.#state = state;
    }
    get adapter() {
        return this.#executor.adapter;
    }
    get plugins() {
        return this.#executor.plugins;
    }
    transformQuery(node, queryId) {
        return this.#executor.transformQuery(node, queryId);
    }
    compileQuery(node, queryId) {
        return this.#executor.compileQuery(node, queryId);
    }
    provideConnection(consumer) {
        return this.#executor.provideConnection(consumer);
    }
    executeQuery(compiledQuery) {
        assertNotCommittedOrRolledBack(this.#state);
        return this.#executor.executeQuery(compiledQuery);
    }
    stream(compiledQuery, chunkSize) {
        assertNotCommittedOrRolledBack(this.#state);
        return this.#executor.stream(compiledQuery, chunkSize);
    }
    withConnectionProvider(connectionProvider) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withConnectionProvider(connectionProvider), this.#state);
    }
    withPlugin(plugin) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugin(plugin), this.#state);
    }
    withPlugins(plugins) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPlugins(plugins), this.#state);
    }
    withPluginAtFront(plugin) {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withPluginAtFront(plugin), this.#state);
    }
    withoutPlugins() {
        return new NotCommittedOrRolledBackAssertingExecutor(this.#executor.withoutPlugins(), this.#state);
    }
}

class QueryParseError extends Data.TaggedError("QueryParseError") {
  cause = this.parseError.cause;
  message = this.parseError.message;
  stack = this.parseError.stack;
  toJSON = this.parseError.toJSON;
  toString = this.parseError.toString;
}
class QueryError extends Data.TaggedError("QueryError") {
}
class NotFoundError extends Data.TaggedError("NotFoundError") {
}
class MigratorError extends Data.TaggedError("MigratorError") {
}

class DBCallbackFailure extends Data.TaggedError("DBCallbackFailure") {
}
const encode = (inputSchema, input) => pipe(
  input,
  Schema.encode(inputSchema),
  Effect.mapError((parseError) => new QueryParseError({ parseError }))
);
const decode = (outputSchema, encoded) => pipe(
  encoded,
  Schema.decode(outputSchema),
  Effect.mapError((parseError) => new QueryParseError({ parseError }))
);
const toEffect = (query, input) => Effect.tryPromise({
  try: () => query(input),
  /* v8 ignore start */
  catch: (error) => {
    if (error instanceof NoResultError) {
      return new NotFoundError();
    }
    if (error instanceof Error) {
      return new QueryError({ message: error.message });
    }
    return new QueryError({ message: String(error) });
  }
  /* v8 ignore stop */
});
const kyselyClient = () => Context.GenericTag("@withstudiocms/kysely/KyselyClient");
const makeKyselyClient = (dialect) => {
  const db = new Kysely({
    dialect
  });
  return db;
};
const dbClient = () => Effect.gen(function* () {
  const db = yield* kyselyClient();
  const effectDb = Effect.fn(
    (fn) => toEffect(fn, db)
  );
  const withEncoder = ({
    callbackFn,
    encoder
  }) => (input) => Effect.gen(function* () {
    const encoded = yield* encode(encoder, input);
    return yield* callbackFn(effectDb, encoded);
  });
  const withDecoder = ({
    decoder,
    callbackFn
  }) => () => Effect.gen(function* () {
    const res = yield* callbackFn(effectDb, void 0);
    return yield* decode(decoder, res);
  });
  const withCodec = ({
    encoder,
    decoder,
    callbackFn
  }) => (input) => Effect.gen(function* () {
    const encoded = yield* encode(encoder, input);
    const res = yield* callbackFn(effectDb, encoded);
    return yield* decode(decoder, res);
  });
  return {
    db,
    effectDb,
    withCodec,
    withDecoder,
    withEncoder
  };
});
const makeDBClientLive = (dialect) => dbClient().pipe(Effect.provideService(kyselyClient(), makeKyselyClient(dialect)));

const getDBClientLive = (dialect) => makeDBClientLive(dialect);
class KyselyDBClientService extends Context.Tag(
  "@withstudiocms/kysely/client/KyselyDBClientService"
)() {
  static Live = Layer.succeed(this, {
    getDBClientLive: (dialect) => getDBClientLive(dialect)
  });
}

class PermissionExistsError {
  _tag = "PermissionExistsError";
}
const SDKPostModule = Effect.gen(function* () {
  const [{ withCodec }, clear, update, GET, { generateRandomIDNumber }, { invalidateTags }] = yield* Effect.all([
    DBClientLive,
    clear_default,
    update_default,
    get_default,
    SDKGenerators,
    cache_default
  ]);
  const _insertPageData = withCodec({
    encoder: StudioCMSPageData.Insert,
    decoder: Schema$1.Struct({
      id: Schema$1.String
    }),
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPageData").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageData").select(["id"]).where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _insertPageContent = withCodec({
    encoder: StudioCMSPageContent.Insert,
    decoder: Schema$1.Struct({
      id: Schema$1.String
    }),
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPageContent").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageContent").select(["id"]).where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _insertTagData = withCodec({
    encoder: StudioCMSPageDataTags.Insert,
    decoder: Schema$1.Struct({
      id: Schema$1.Number
    }),
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPageDataTags").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageDataTags").select(["id"]).where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _insertCategoryData = withCodec({
    encoder: StudioCMSPageDataCategories.Insert,
    decoder: Schema$1.Struct({
      id: Schema$1.Number
    }),
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPageDataCategories").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageDataCategories").select(["id"]).where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _getUserPermission = withCodec({
    encoder: Schema$1.String,
    decoder: StudioCMSPermissions.Select,
    callbackFn: (db, userId) => db(
      (client) => client.selectFrom("StudioCMSPermissions").selectAll().where("user", "=", userId).executeTakeFirstOrThrow()
    )
  });
  const _insertNewUserPermission = withCodec({
    encoder: StudioCMSPermissions.Insert,
    decoder: StudioCMSPermissions.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPermissions").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPermissions").selectAll().where("user", "=", data.user).executeTakeFirstOrThrow();
      })
    )
  });
  const _insertNewDiffTracking = withCodec({
    encoder: StudioCMSDiffTracking.Insert,
    decoder: StudioCMSDiffTracking.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSDiffTracking").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSDiffTracking").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _insertNewFolder = withCodec({
    encoder: StudioCMSPageFolderStructure.Insert,
    decoder: StudioCMSPageFolderStructure.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSPageFolderStructure").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSPageFolderStructure").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _randomUUIDString = Effect.fn(() => Effect.succeed(crypto.randomUUID().toString()));
  const _pageDataIdOrGenerateUUID = Effect.fn(function* (data) {
    const id = data.id || (yield* _randomUUIDString());
    return { id, ...data };
  });
  const _insertNewPageWithContent = Effect.fn(
    (pageData, pageContent) => Effect.all({
      pageData: _pageDataIdOrGenerateUUID(pageData),
      pageContent: Effect.succeed(pageContent)
    }).pipe(
      Effect.flatMap(
        ({ pageData: { id, contentLang, ...basePageData }, pageContent: pageContent2 }) => Effect.all({
          pageData: _insertPageData({
            ...basePageData,
            id,
            contentLang
          }),
          pageContent: _insertPageContent({
            id: crypto.randomUUID().toString(),
            contentId: id,
            contentLang,
            content: pageContent2.content || ""
          })
        })
      ),
      Effect.tap(() => invalidateTags(cacheTags.pages))
    )
  );
  const _insertPageWithContentArray = Effect.fn(
    (pages) => Effect.all(
      pages.map(({ pageData, pageContent }) => _insertNewPageWithContent(pageData, pageContent))
    )
  );
  const _pickIdOrGenerate = Effect.fn(function* (data) {
    let id;
    if ("id" in data && typeof data.id === "number" && !Number.isNaN(data.id) && data.id > 0) {
      id = data.id;
    } else {
      id = yield* generateRandomIDNumber(9);
    }
    return { id, ...data };
  });
  const _insertNewTag = Effect.fn(
    (tag) => _pickIdOrGenerate(tag).pipe(
      Effect.flatMap(_insertTagData),
      Effect.tap(() => invalidateTags(cacheTags.tags))
    )
  );
  const _insertTagArray = Effect.fn(
    (tags) => Effect.all(tags.map((tag) => _insertNewTag(tag)))
  );
  const _insertNewCategory = Effect.fn(
    (category) => _pickIdOrGenerate(category).pipe(
      Effect.flatMap(_insertCategoryData),
      Effect.tap(() => invalidateTags(cacheTags.categories))
    )
  );
  const _insertCategoryArray = Effect.fn(
    (categories) => Effect.all(categories.map((category) => _insertNewCategory(category)))
  );
  const _insertNewPermission = Effect.fn(
    (userId, rank) => _getUserPermission(userId).pipe(
      Effect.flatMap(
        (exists) => exists ? Effect.fail(new PermissionExistsError()) : Effect.succeed({ user: userId, rank })
      ),
      Effect.flatMap((data) => _insertNewUserPermission(data)),
      Effect.catchTag(
        "PermissionExistsError",
        () => Effect.fail(
          new DBCallbackFailure({
            cause: "Permission for user already exists, Please update instead."
          })
        )
      )
    )
  );
  const _insertPermissionArray = Effect.fn(
    (permissions) => Effect.all(permissions.map(({ userId, rank }) => _insertNewPermission(userId, rank)))
  );
  const _insertDiffTracking = Effect.fn(
    (data) => pipe(
      data.id ? Effect.succeed(data) : _randomUUIDString().pipe(Effect.map((id) => ({ id, ...data }))),
      Effect.flatMap((dataWithId) => _insertNewDiffTracking(dataWithId))
    )
  );
  const _insertFolder = Effect.fn(
    (data) => pipe(
      data.id ? Effect.succeed(data) : _randomUUIDString().pipe(Effect.map((id) => ({ id, ...data }))),
      Effect.flatMap((dataWithId) => _insertNewFolder(dataWithId))
    )
  );
  const _mainInsertFolder = Effect.fn(
    (data) => _insertFolder(data).pipe(Effect.tap(() => Effect.all([update.folderList, update.folderTree])))
  );
  const _mainInsertPage = Effect.fn(
    ({
      pageData,
      pageContent
    }) => _insertNewPageWithContent(pageData, pageContent).pipe(
      Effect.flatMap(({ pageData: { id } }) => GET.page.byId(id)),
      Effect.tap(
        () => Effect.all([
          clear.folderList,
          clear.folderTree,
          invalidateTags([
            ...cacheTags.pages,
            ...cacheTags.pageFolderTree,
            ...cacheTags.folderTree
          ])
        ])
      )
    )
  );
  const databaseEntry = {
    /**
     * Inserts a new page along with its content into the database.
     *
     * @param pageData - The data for the new page, excluding the ID.
     * @param pageContent - The content for the new page.
     * @returns An effect that resolves to an object containing the IDs of the newly inserted page data and content.
     */
    pages: _insertNewPageWithContent,
    /**
     * Inserts a new page content entry into the database.
     *
     * @param data - The page content data to be inserted.
     * @returns An effect that resolves to the ID of the newly inserted page content.
     */
    pageContent: _insertPageContent,
    /**
     * Inserts a new page data tag into the database.
     *
     * @param tag - The tag data to be inserted.
     * @returns An effect that resolves to the ID of the newly inserted tag.
     */
    tags: _insertNewTag,
    /**
     * Inserts a new page data category into the database.
     *
     * @param category - The category data to be inserted.
     * @returns An effect that resolves to the ID of the newly inserted category.
     */
    categories: _insertNewCategory,
    /**
     * Inserts a new permission entry for a user into the database.
     *
     * @param userId - The ID of the user for whom the permission is to be created.
     * @param rank - The rank of the permission to be assigned.
     * @returns An effect that resolves to the newly inserted permission entry.
     */
    permissions: _insertNewPermission,
    /**
     * Inserts a new diff tracking entry into the database.
     *
     * @param data - The diff tracking data to be inserted.
     * @returns An effect that resolves to the newly inserted diff tracking entry.
     */
    diffTracking: _insertDiffTracking,
    /**
     * Inserts a new folder structure entry into the database.
     *
     * @param data - The folder structure data to be inserted.
     * @returns An effect that resolves to the newly inserted folder structure entry.
     */
    folder: _insertFolder
  };
  const databaseEntries = {
    /**
     * Inserts an array of new page data tags into the database.
     *
     * @param tags - The array of tag data to be inserted.
     * @returns An effect that resolves to an array of IDs of the newly inserted tags.
     */
    tags: _insertTagArray,
    /**
     * Inserts an array of new page data categories into the database.
     *
     * @param categories - The array of category data to be inserted.
     * @returns An effect that resolves to an array of IDs of the newly inserted categories.
     */
    categories: _insertCategoryArray,
    /**
     * Inserts an array of new permissions into the database.
     *
     * @param permissions - The array of permission data to be inserted.
     * @returns An effect that resolves to an array of newly inserted permission entries.
     */
    permissions: _insertPermissionArray,
    /**
     * Inserts an array of new pages along with their content into the database.
     *
     * @param data - An array of PageInsert objects containing page data and content.
     * @returns An effect that resolves to an array of objects containing the IDs of the newly inserted page data and content for each page.
     */
    pages: _insertPageWithContentArray
  };
  return {
    databaseEntry,
    databaseEntries,
    /**
     * Inserts a new folder structure entry into the database, ensuring it has an ID.
     *
     * @param data - The folder structure data to be inserted.
     * @returns An effect that resolves to the newly inserted folder structure entry.
     */
    folder: _mainInsertFolder,
    /**
     * Inserts a new page along with its content into the database.
     *
     * @param pageData - The data for the new page, excluding the ID.
     * @param pageContent - The content for the new page.
     * @returns An effect that resolves to the newly inserted page data.
     */
    page: _mainInsertPage
  };
});
var post_default = SDKPostModule;

class resetTokenBucketFail {
  _tag = "resetTokenBucketFail";
}
const SDKResetTokenBucketModule = Effect.gen(function* () {
  const [{ withCodec, withEncoder }, { generateToken, testToken }] = yield* Effect.all([
    DBClientLive,
    SDKGenerators
  ]);
  const _createNewToken = withCodec({
    encoder: StudioCMSUserResetTokens.Insert,
    decoder: StudioCMSUserResetTokens.Select,
    callbackFn: (db, data) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSUserResetTokens").values(data).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSUserResetTokens").selectAll().where("id", "=", data.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _deleteTokenByUserId = withEncoder({
    encoder: Schema$1.String,
    callbackFn: (db, userId) => db(
      (client) => client.deleteFrom("StudioCMSUserResetTokens").where("userId", "=", userId).execute()
    )
  });
  const _getTokenByUserId = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSUserResetTokens.Select),
    callbackFn: (db, userId) => db(
      (client) => client.selectFrom("StudioCMSUserResetTokens").selectAll().where("userId", "=", userId).executeTakeFirst()
    )
  });
  const _createUserResetToken = Effect.fn(
    (userId) => generateToken(userId).pipe(
      Effect.flatMap(
        (token) => _createNewToken({
          id: crypto.randomUUID(),
          userId,
          token
        })
      )
    )
  );
  const _checkIfValid = Effect.fn(
    (token) => !token.isValid || !token.userId ? Effect.fail(new resetTokenBucketFail()) : Effect.succeed(token)
  );
  const _getTokenInfo = Effect.fn(
    ({
      userId
    }) => userId ? _getTokenByUserId(userId) : Effect.fail(new resetTokenBucketFail())
  );
  const _verifyTokenMatch = (token) => Effect.fn(
    (resetToken) => resetToken ? Effect.succeed(resetToken.token === token) : Effect.fail(new resetTokenBucketFail())
  );
  const _checkToken = Effect.fn(
    (token) => testToken(token).pipe(
      Effect.flatMap(_checkIfValid),
      Effect.flatMap(_getTokenInfo),
      Effect.flatMap(_verifyTokenMatch(token)),
      Effect.catchTag("resetTokenBucketFail", () => Effect.succeed(false))
    )
  );
  const resetTokenBucket = {
    /**
     * Creates a new reset token for the specified user.
     *
     * @param userId - The ID of the user for whom to create the reset token.
     * @returns An effect yielding the created reset token record.
     */
    new: _createUserResetToken,
    /**
     * Deletes the reset token for the specified user.
     *
     * @param userId - The ID of the user for whom to delete the reset token.
     * @returns An effect yielding the result of the delete operation.
     */
    delete: _deleteTokenByUserId,
    /**
     * Checks if the specified reset token is valid.
     *
     * @param token - The reset token to check.
     * @returns An effect yielding a boolean indicating whether the token is valid.
     */
    check: _checkToken
  };
  return resetTokenBucket;
});
var resetTokenBucket_default = SDKResetTokenBucketModule;

const SDKRestAPIModule = Effect.gen(function* () {
  const [{ withCodec, withEncoder }, { generateToken }] = yield* Effect.all([
    DBClientLive,
    SDKGenerators
  ]);
  const _getTokensForUser = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.Array(StudioCMSAPIKeys.Select),
    callbackFn: (db, userId) => db(
      (client) => client.selectFrom("StudioCMSAPIKeys").selectAll().where("userId", "=", userId).execute()
    )
  });
  const _newToken = withCodec({
    encoder: StudioCMSAPIKeys.Insert,
    decoder: StudioCMSAPIKeys.Select,
    callbackFn: (db, tokenData) => db(
      (client) => client.transaction().execute(async (trx) => {
        await trx.insertInto("StudioCMSAPIKeys").values(tokenData).executeTakeFirstOrThrow();
        return await trx.selectFrom("StudioCMSAPIKeys").selectAll().where("id", "=", tokenData.id).executeTakeFirstOrThrow();
      })
    )
  });
  const _deleteToken = withEncoder({
    encoder: Schema$1.Struct({
      userId: Schema$1.String,
      tokenId: Schema$1.String
    }),
    callbackFn: (db, { userId, tokenId }) => db(
      (client) => client.deleteFrom("StudioCMSAPIKeys").where("userId", "=", userId).where("id", "=", tokenId).execute()
    )
  });
  const _getByKey = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSAPIKeys.Select),
    callbackFn: (db, key) => db(
      (client) => client.selectFrom("StudioCMSAPIKeys").selectAll().where("key", "=", key).executeTakeFirst()
    )
  });
  const _getKeyPermissions = withCodec({
    encoder: Schema$1.String,
    decoder: Schema$1.UndefinedOr(StudioCMSPermissions.Select),
    callbackFn: (db, userId) => db(
      (client) => client.selectFrom("StudioCMSPermissions").selectAll().where("user", "=", userId).executeTakeFirst()
    )
  });
  const _createNewTokenForUser = Effect.fn(
    (userId, description) => generateToken(userId, true).pipe(
      Effect.flatMap(
        (key) => _newToken({
          id: crypto.randomUUID(),
          key,
          userId,
          description,
          creationDate: (/* @__PURE__ */ new Date()).toISOString()
        })
      )
    )
  );
  const _verifyToken = Effect.fn(
    (key) => Effect.gen(function* () {
      const apiKeyRecord = yield* _getByKey(key);
      if (!apiKeyRecord) return false;
      const permissionsRecord = yield* _getKeyPermissions(apiKeyRecord.userId);
      if (!permissionsRecord) return false;
      return {
        userId: apiKeyRecord.userId,
        key: apiKeyRecord.key,
        rank: permissionsRecord.rank
      };
    })
  );
  const tokens = {
    /**
     * Retrieves all API tokens for a specific user.
     *
     * @param userId - The ID of the user whose tokens are to be retrieved.
     * @returns An Effect that resolves to an array of API keys for the user.
     * @throws {LibSQLDatabaseError} If a database error occurs during the operation.
     */
    get: _getTokensForUser,
    /**
     * Creates a new API token for a user with the specified description.
     *
     * @param userId - The ID of the user for whom to create the token.
     * @param description - A description for the API key.
     * @returns An Effect that resolves to the created API key record.
     * @throws {LibSQLDatabaseError} If a database error occurs during the operation.
     */
    new: _createNewTokenForUser,
    /**
     * Deletes an API token for a user by its ID.
     *
     * @param userId - The ID of the user whose token is to be deleted.
     * @param tokenId - The ID of the API token to delete.
     * @returns An Effect that resolves when the token is successfully deleted.
     * @throws {LibSQLDatabaseError} If a database error occurs during the operation.
     */
    delete: _deleteToken,
    /**
     * Verifies an API token and retrieves associated user information.
     *
     * @param key - The API token to verify.
     * @returns An Effect that resolves to user information if the token is valid, or false if invalid.
     */
    verify: _verifyToken
  };
  return { tokens };
});
var rest_api_default = SDKRestAPIModule;

const SDKUtilModule = Effect.all({
  Collectors: SDKCollectors,
  FolderTree: SDKFolderTree,
  Generators: SDKGenerators,
  GetFromNPM,
  Parsers: SDKParsers,
  Users: SDKUsers
});
var util_default = SDKUtilModule;

const SDKModules = {
  AUTH: auth_default,
  CLEAR: clear_default,
  CONFIG: config_default,
  DELETE: delete_default,
  diffTracking: diffTracking_default,
  GET: get_default,
  INIT: init_default,
  MIDDLEWARES: middleware_default,
  notificationSettings: notificationSettings_default,
  PLUGINS: plugins_default,
  POST: post_default,
  resetTokenBucket: resetTokenBucket_default,
  REST_API: rest_api_default,
  UPDATE: update_default,
  UTIL: util_default
};
var modules_default = SDKModules;

const loggerLayer = Logger.replace(Logger.defaultLogger, makeLogger);
const SDKBaseDependencies = Layer.mergeAll(
  cache_default.Default,
  Deepmerge.Default,
  setLoggerLevel,
  loggerLayer
);
const StudioCMSSDKCore = Effect.all({
  dbService: DBClientLive,
  cache: cache_default,
  ...modules_default
}).pipe(Effect.provide(SDKBaseDependencies));
const makeStudioCMSSDKCoreLive = (context) => StudioCMSSDKCore.pipe(Effect.provide(makeSDKContext(context)));

class UnsupportedDialectError extends Data.TaggedError("UnsupportedDialectError") {
}
const parseDbDialect = Effect.fn(
  (dialect) => Effect.sync(() => {
    switch (dialect) {
      case "libsql":
        return "libsql" /* libsql */;
      case "postgres":
        return "postgres" /* postgres */;
      case "mysql":
        return "mysql" /* mysql */;
      default:
        return null;
    }
  }).pipe(
    Effect.flatMap(
      (d) => d === null ? Effect.fail(new UnsupportedDialectError({ dialect })) : Effect.succeed(d)
    )
  )
);
class DriverImportError extends Data.TaggedError("DriverImportError") {
}
const tryPromise = (dialect) => Effect.fn(
  (_try) => Effect.tryPromise({
    try: _try,
    catch: (cause) => new DriverImportError({ dialect, cause })
  })
);
const getDbDriver = Effect.fn(function* (dialect) {
  const _try = tryPromise(dialect);
  switch (dialect) {
    case "libsql" /* libsql */: {
      const driverModule = yield* _try(() => import('./libsql_B_xxgGTD.mjs'));
      return yield* driverModule.libsqlDriver;
    }
    case "postgres" /* postgres */: {
      const driverModule = yield* _try(() => import('./postgres_BRpFLfFD.mjs'));
      return yield* driverModule.postgresDriver;
    }
    case "mysql" /* mysql */: {
      const driverModule = yield* _try(() => import('./mysql_Bm5zicbh.mjs'));
      return yield* driverModule.mysqlDriver;
    }
    default:
      return yield* new UnsupportedDialectError({ dialect });
  }
});
const getDbClient = (driverDialect) => parseDbDialect(driverDialect).pipe(
  Effect.flatMap(getDbDriver),
  Effect.flatMap(getDBClientLive)
);

const isStorageIdentifier = (identifier) => identifier.startsWith("storage-file://");
const fetchWithTimeout = async (url, options, timeoutMs = 5e3) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }
};
async function resolveStorageIdentifier(identifier, { baseUrl, verbose = false, timeoutMs }) {
  const endpoint = new URL("/studiocms_api/integrations/storage/manager", baseUrl);
  const response = await fetchWithTimeout(
    endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ identifier, action: "resolveUrl" })
    },
    timeoutMs
  );
  if (!response.ok) {
    verbose && console.error(`Failed to resolve storage manager for identifier: ${identifier}`);
    return identifier;
  }
  let data;
  try {
    data = await response.json();
  } catch {
    verbose && console.error(`Failed to parse response for identifier: ${identifier}`);
    return identifier;
  }
  return data.url ?? identifier;
}

class DBClientInitializationError extends Data.TaggedError("DBClientInitializationError") {
}
class SDKInitializationError extends Data.TaggedError("SDKInitializationError") {
}
const cacheStore = /* @__PURE__ */ new Map();
const cacheTagIndex = /* @__PURE__ */ new Map();
const buildSDKContext = Effect.fn(
  (db) => Effect.sync(
    () => ({
      db,
      defaults: {
        GhostUserDefaults,
        NotificationSettingsDefaults
      },
      cache: {
        store: cacheStore,
        tagIndex: cacheTagIndex
      },
      storageManagerResolver: async (identifier) => {
        if (!isStorageIdentifier(identifier)) {
          console.error(`Invalid storage-file identifier: ${identifier}`);
          return identifier;
        }
        return await resolveStorageIdentifier(identifier, {
          baseUrl: site
        });
      }
    })
  )
);
const SDKCore = getDbClient(config.db.dialect).pipe(
  Effect.catchAll((cause) => new DBClientInitializationError({ cause })),
  Effect.flatMap(buildSDKContext),
  Effect.flatMap(makeStudioCMSSDKCoreLive),
  Effect.catchAll((cause) => new SDKInitializationError({ cause }))
);
const SDKCoreJs = await runEffect(SDKCore);
const runSDK = runEffect;

export { AliasNode as A, resolveStorageIdentifier as B, CreateTableNode as C, deepmerge as D, root as E, StudioCMSStorageManagerUrlMappings as F, IdentifierNode as I, NOOP_QUERY_EXECUTOR as N, OperatorNode as O, ParensNode as P, RawNode as R, SDKCoreJs as S, ValueNode as V, WhenNode as W, SDKCore as a, StudioCMSPageFolderStructure as b, StudioCMSPageData as c, createQueryId as d, isObject as e, freeze as f, isOperationNodeSource as g, parseValueExpression as h, isFunction as i, parseStringReference as j, InsertQueryNode as k, CreateViewNode as l, SetOperationNode as m, logOnce as n, isString as o, parseTable as p, isBoolean as q, runSDK as r, site as s, isNumber as t, isBigInt as u, isNull as v, isDate as w, StudioCMSPageDataCategories as x, StudioCMSPageDataTags as y, isStorageIdentifier as z };
