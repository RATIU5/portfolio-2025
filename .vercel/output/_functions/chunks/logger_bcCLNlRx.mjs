import { styleText } from 'node:util';
import './effect_DkdxkRrn.mjs';
import { Effect, pipe, Layer, Logger, List, LogLevel, Config } from 'effect';
import { dual } from 'effect/Function';

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
class CMSLogger {
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
    return new CMSLogger(this.options, label);
  }
  info(message) {
    console.log(`${getEventPrefix("info", this.label)} ${message}`);
  }
  warn(message) {
    console.warn(`${getEventPrefix("warn", this.label)} ${message}`);
  }
  error(message) {
    console.error(`${getEventPrefix("error", this.label)} ${message}`);
  }
  debug(message) {
    console.debug(`${getEventPrefix("debug", this.label)} ${message}`);
  }
}
const _logger = new CMSLogger({ level: "info" }, "studiocms:runtime");
const makeLogger = (label) => Logger.make(({ logLevel, message: _message, spans }) => {
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
).pipe(
  Effect.catchTag(
    "ConfigError",
    (e) => Effect.sync(() => {
      console.warn(
        `Warning: Invalid STUDIOCMS_LOGLEVEL value. Defaulting to 'Info'. (${e.message})`
      );
      return LogLevel.Info;
    })
  ),
  Effect.andThen(Logger.minimumLogLevel),
  Layer.unwrapEffect
);
const setLogger = (label) => Effect.provide(
  Layer.mergeAll(Logger.replace(Logger.defaultLogger, makeLogger(label)), setLoggerLevel)
);
const runtimeLogger = dual(2, (self, label) => pipe(self, setLogger(label)));
const pipeLogger = dual(2, (effect, label) => pipe(effect, runtimeLogger(label), Effect.withLogSpan(`span-${label}`)));
function genLogger(label) {
  return (f) => pipeLogger(label)(Effect.gen(f));
}

export { CMSLogger as C, genLogger as g, pipeLogger as p };
