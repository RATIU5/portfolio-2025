import { Effect as Effect$1, Schedule as Schedule$1 } from 'effect';
import { dual, flow, identity, constFalse } from 'effect/Function';
import * as Effect from 'effect/Effect';
import * as FiberRef from 'effect/FiberRef';
import * as Stream from 'effect/Stream';
import * as FiberRefs from 'effect/FiberRefs';
import { globalValue } from 'effect/GlobalValue';
import * as Inspectable from 'effect/Inspectable';
import { symbolRedactable } from 'effect/Inspectable';
import * as Redacted from 'effect/Redacted';
import * as Predicate from 'effect/Predicate';
import { hasProperty } from 'effect/Predicate';
import * as Data from 'effect/Data';
import * as Cause from 'effect/Cause';
import * as Context from 'effect/Context';
import * as Layer from 'effect/Layer';
import { pipeArguments } from 'effect/Pipeable';
import * as Schedule from 'effect/Schedule';
import * as Arr from 'effect/Array';
import * as Either from 'effect/Either';
import * as Option from 'effect/Option';
import * as Duration from 'effect/Duration';
import * as Record from 'effect/Record';

/**
 * @since 1.0.0
 * @category error
 */
const TypeIdError = (typeId, tag) => {
  class Base extends Data.Error {
    _tag = tag;
  }
  Base.prototype[typeId] = typeId;
  Base.prototype.name = tag;
  return Base;
};

/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category type ids
 */
const TypeId$7 = /*#__PURE__*/Symbol.for("@effect/platform/Cookies");
/**
 * @since 1.0.0
 * @category type ids
 */
const CookieTypeId = /*#__PURE__*/Symbol.for("@effect/platform/Cookies/Cookie");
const Proto$2 = {
  [TypeId$7]: TypeId$7,
  ...Inspectable.BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/Cookies",
      cookies: Record.map(this.cookies, cookie => cookie.toJSON())
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
/**
 * Create a Cookies object from an Iterable
 *
 * @since 1.0.0
 * @category constructors
 */
const fromReadonlyRecord = cookies => {
  const self = Object.create(Proto$2);
  self.cookies = cookies;
  return self;
};
/**
 * Create a Cookies object from an Iterable
 *
 * @since 1.0.0
 * @category constructors
 */
const fromIterable = cookies => {
  const record = {};
  for (const cookie of cookies) {
    record[cookie.name] = cookie;
  }
  return fromReadonlyRecord(record);
};
/**
 * Create a Cookies object from a set of Set-Cookie headers
 *
 * @since 1.0.0
 * @category constructors
 */
const fromSetCookie = headers => {
  const arrayHeaders = typeof headers === "string" ? [headers] : headers;
  const cookies = [];
  for (const header of arrayHeaders) {
    const cookie = parseSetCookie(header.trim());
    if (Option.isSome(cookie)) {
      cookies.push(cookie.value);
    }
  }
  return fromIterable(cookies);
};
function parseSetCookie(header) {
  const parts = header.split(";").map(_ => _.trim()).filter(_ => _ !== "");
  if (parts.length === 0) {
    return Option.none();
  }
  const firstEqual = parts[0].indexOf("=");
  if (firstEqual === -1) {
    return Option.none();
  }
  const name = parts[0].slice(0, firstEqual);
  if (!fieldContentRegExp.test(name)) {
    return Option.none();
  }
  const valueEncoded = parts[0].slice(firstEqual + 1);
  const value = tryDecodeURIComponent(valueEncoded);
  if (parts.length === 1) {
    return Option.some(Object.assign(Object.create(CookieProto), {
      name,
      value,
      valueEncoded
    }));
  }
  const options = {};
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const equalIndex = part.indexOf("=");
    const key = equalIndex === -1 ? part : part.slice(0, equalIndex).trim();
    const value = equalIndex === -1 ? undefined : part.slice(equalIndex + 1).trim();
    switch (key.toLowerCase()) {
      case "domain":
        {
          if (value === undefined) {
            break;
          }
          const domain = value.trim().replace(/^\./, "");
          if (domain) {
            options.domain = domain;
          }
          break;
        }
      case "expires":
        {
          if (value === undefined) {
            break;
          }
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            options.expires = date;
          }
          break;
        }
      case "max-age":
        {
          if (value === undefined) {
            break;
          }
          const maxAge = parseInt(value, 10);
          if (!isNaN(maxAge)) {
            options.maxAge = Duration.seconds(maxAge);
          }
          break;
        }
      case "path":
        {
          if (value === undefined) {
            break;
          }
          if (value[0] === "/") {
            options.path = value;
          }
          break;
        }
      case "priority":
        {
          if (value === undefined) {
            break;
          }
          switch (value.toLowerCase()) {
            case "low":
              options.priority = "low";
              break;
            case "medium":
              options.priority = "medium";
              break;
            case "high":
              options.priority = "high";
              break;
          }
          break;
        }
      case "httponly":
        {
          options.httpOnly = true;
          break;
        }
      case "secure":
        {
          options.secure = true;
          break;
        }
      case "partitioned":
        {
          options.partitioned = true;
          break;
        }
      case "samesite":
        {
          if (value === undefined) {
            break;
          }
          switch (value.toLowerCase()) {
            case "lax":
              options.sameSite = "lax";
              break;
            case "strict":
              options.sameSite = "strict";
              break;
            case "none":
              options.sameSite = "none";
              break;
          }
          break;
        }
    }
  }
  return Option.some(Object.assign(Object.create(CookieProto), {
    name,
    value,
    valueEncoded,
    options: Object.keys(options).length > 0 ? options : undefined
  }));
}
// eslint-disable-next-line no-control-regex
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
const CookieProto = {
  [CookieTypeId]: CookieTypeId,
  ...Inspectable.BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/Cookies/Cookie",
      name: this.name,
      value: this.value,
      options: this.options
    };
  }
};
const tryDecodeURIComponent = str => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category type ids
 */
const HeadersTypeId = /*#__PURE__*/Symbol.for("@effect/platform/Headers");
const Proto$1 = /*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), {
  [HeadersTypeId]: HeadersTypeId,
  [symbolRedactable](fiberRefs) {
    return redact(this, FiberRefs.getOrDefault(fiberRefs, currentRedactedNames));
  }
});
const make$2 = input => Object.assign(Object.create(Proto$1), input);
/**
 * @since 1.0.0
 * @category constructors
 */
const empty$3 = /*#__PURE__*/Object.create(Proto$1);
/**
 * @since 1.0.0
 * @category constructors
 */
const fromInput$1 = input => {
  if (input === undefined) {
    return empty$3;
  } else if (Symbol.iterator in input) {
    const out = Object.create(Proto$1);
    for (const [k, v] of input) {
      out[k.toLowerCase()] = v;
    }
    return out;
  }
  const out = Object.create(Proto$1);
  for (const [k, v] of Object.entries(input)) {
    if (Array.isArray(v)) {
      out[k.toLowerCase()] = v.join(", ");
    } else if (v !== undefined) {
      out[k.toLowerCase()] = v;
    }
  }
  return out;
};
/**
 * @since 1.0.0
 * @category constructors
 */
const unsafeFromRecord = input => Object.setPrototypeOf(input, Proto$1);
/**
 * @since 1.0.0
 * @category combinators
 */
const set = /*#__PURE__*/dual(3, (self, key, value) => {
  const out = make$2(self);
  out[key.toLowerCase()] = value;
  return out;
});
/**
 * @since 1.0.0
 * @category combinators
 */
const setAll$1 = /*#__PURE__*/dual(2, (self, headers) => make$2({
  ...self,
  ...fromInput$1(headers)
}));
/**
 * @since 1.0.0
 * @category combinators
 */
const merge = /*#__PURE__*/dual(2, (self, headers) => {
  const out = make$2(self);
  Object.assign(out, headers);
  return out;
});
/**
 * @since 1.0.0
 * @category combinators
 */
const remove = /*#__PURE__*/dual(2, (self, key) => {
  const out = make$2(self);
  const modify = key => {
    if (typeof key === "string") {
      const k = key.toLowerCase();
      if (k in self) {
        delete out[k];
      }
    } else {
      for (const name in self) {
        if (key.test(name)) {
          delete out[name];
        }
      }
    }
  };
  if (Array.isArray(key)) {
    for (let i = 0; i < key.length; i++) {
      modify(key[i]);
    }
  } else {
    modify(key);
  }
  return out;
});
/**
 * @since 1.0.0
 * @category combinators
 */
const redact = /*#__PURE__*/dual(2, (self, key) => {
  const out = {
    ...self
  };
  const modify = key => {
    if (typeof key === "string") {
      const k = key.toLowerCase();
      if (k in self) {
        out[k] = Redacted.make(self[k]);
      }
    } else {
      for (const name in self) {
        if (key.test(name)) {
          out[name] = Redacted.make(self[name]);
        }
      }
    }
  };
  if (Array.isArray(key)) {
    for (let i = 0; i < key.length; i++) {
      modify(key[i]);
    }
  } else {
    modify(key);
  }
  return out;
});
/**
 * @since 1.0.0
 * @category fiber refs
 */
const currentRedactedNames = /*#__PURE__*/globalValue("@effect/platform/Headers/currentRedactedNames", () => FiberRef.unsafeMake(["authorization", "cookie", "set-cookie", "x-api-key"]));

/** @internal */
const TypeId$6 = /*#__PURE__*/Symbol.for("@effect/platform/HttpClientError");

/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category type id
 */
const TypeId$5 = TypeId$6;
/**
 * @since 1.0.0
 * @category guards
 */
const isHttpClientError = u => hasProperty(u, TypeId$5);
/**
 * @since 1.0.0
 * @category error
 */
class RequestError extends /*#__PURE__*/TypeIdError(TypeId$5, "RequestError") {
  get methodAndUrl() {
    return `${this.request.method} ${this.request.url}`;
  }
  get message() {
    return this.description ? `${this.reason}: ${this.description} (${this.methodAndUrl})` : `${this.reason} error (${this.methodAndUrl})`;
  }
}
/**
 * @since 1.0.0
 * @category error
 */
class ResponseError extends /*#__PURE__*/TypeIdError(TypeId$5, "ResponseError") {
  get methodAndUrl() {
    return `${this.request.method} ${this.request.url}`;
  }
  get message() {
    const info = `${this.response.status} ${this.methodAndUrl}`;
    return this.description ? `${this.reason}: ${this.description} (${info})` : `${this.reason} error (${info})`;
  }
}

/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category constructors
 */
const fromInput = input => {
  const parsed = fromInputNested(input);
  const out = [];
  for (let i = 0; i < parsed.length; i++) {
    if (Array.isArray(parsed[i][0])) {
      const [keys, value] = parsed[i];
      out.push([`${keys[0]}[${keys.slice(1).join("][")}]`, value]);
    } else {
      out.push(parsed[i]);
    }
  }
  return out;
};
const fromInputNested = input => {
  const entries = Symbol.iterator in input ? Arr.fromIterable(input) : Object.entries(input);
  const out = [];
  for (const [key, value] of entries) {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== undefined) {
          out.push([key, String(value[i])]);
        }
      }
    } else if (typeof value === "object") {
      const nested = fromInputNested(value);
      for (const [k, v] of nested) {
        out.push([[key, ...(typeof k === "string" ? [k] : k)], v]);
      }
    } else if (value !== undefined) {
      out.push([key, String(value)]);
    }
  }
  return out;
};
/**
 * @since 1.0.0
 * @category constructors
 */
const empty$2 = [];
/**
 * @since 1.0.0
 * @category combinators
 */
const setAll = /*#__PURE__*/dual(2, (self, input) => {
  const out = fromInput(input);
  const keys = new Set();
  for (let i = 0; i < out.length; i++) {
    keys.add(out[i][0]);
  }
  for (let i = 0; i < self.length; i++) {
    if (keys.has(self[i][0])) continue;
    out.push(self[i]);
  }
  return out;
});
/**
 * @since 1.0.0
 * @category conversions
 */
const makeUrl = (url, params, hash) => {
  try {
    const urlInstance = new URL(url, baseUrl());
    for (let i = 0; i < params.length; i++) {
      const [key, value] = params[i];
      if (value !== undefined) {
        urlInstance.searchParams.append(key, value);
      }
    }
    if (hash._tag === "Some") {
      urlInstance.hash = hash.value;
    }
    return Either.right(urlInstance);
  } catch (e) {
    return Either.left(e);
  }
};
const baseUrl = () => {
  if ("location" in globalThis && globalThis.location !== undefined && globalThis.location.origin !== undefined && globalThis.location.pathname !== undefined) {
    return location.origin + location.pathname;
  }
  return undefined;
};

/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category type ids
 */
const TypeId$4 = /*#__PURE__*/Symbol.for("@effect/platform/HttpIncomingMessage");
/**
 * @since 1.0.0
 */
const inspect = (self, that) => {
  const contentType = self.headers["content-type"] ?? "";
  let body;
  if (contentType.includes("application/json")) {
    try {
      body = Effect.runSync(self.json);
    } catch {
      //
    }
  } else if (contentType.includes("text/") || contentType.includes("urlencoded")) {
    try {
      body = Effect.runSync(self.text);
    } catch {
      //
    }
  }
  const obj = {
    ...that,
    headers: Inspectable.redact(self.headers),
    remoteAddress: self.remoteAddress.toJSON()
  };
  if (body !== undefined) {
    obj.body = body;
  }
  return obj;
};

/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category encoding
 */
const toHeaders = span => unsafeFromRecord({
  b3: `${span.traceId}-${span.spanId}-${span.sampled ? "1" : "0"}${span.parent._tag === "Some" ? `-${span.parent.value.spanId}` : ""}`,
  traceparent: `00-${span.traceId}-${span.spanId}-${span.sampled ? "01" : "00"}`
});

/** @internal */
const TypeId$3 = /*#__PURE__*/Symbol.for("@effect/platform/HttpBody");
/** @internal */
const ErrorTypeId = /*#__PURE__*/Symbol.for("@effect/platform/HttpBody/HttpBodyError");
const bodyError = /*#__PURE__*/Data.tagged("HttpBodyError");
/** @internal */
const HttpBodyError = reason => bodyError({
  [ErrorTypeId]: ErrorTypeId,
  reason
});
class BodyBase {
  [TypeId$3];
  constructor() {
    this[TypeId$3] = TypeId$3;
  }
  [Inspectable.NodeInspectSymbol]() {
    return this.toJSON();
  }
  toString() {
    return Inspectable.format(this);
  }
}
class EmptyImpl extends BodyBase {
  _tag = "Empty";
  toJSON() {
    return {
      _id: "@effect/platform/HttpBody",
      _tag: "Empty"
    };
  }
}
/** @internal */
const empty$1 = /*#__PURE__*/new EmptyImpl();
class Uint8ArrayImpl extends BodyBase {
  body;
  contentType;
  _tag = "Uint8Array";
  constructor(body, contentType) {
    super();
    this.body = body;
    this.contentType = contentType;
  }
  get contentLength() {
    return this.body.length;
  }
  toJSON() {
    const toString = this.contentType.startsWith("text/") || this.contentType.endsWith("json");
    return {
      _id: "@effect/platform/HttpBody",
      _tag: "Uint8Array",
      body: toString ? new TextDecoder().decode(this.body) : `Uint8Array(${this.body.length})`,
      contentType: this.contentType,
      contentLength: this.contentLength
    };
  }
}
/** @internal */
const uint8Array = (body, contentType) => new Uint8ArrayImpl(body, contentType);
const encoder = /*#__PURE__*/new TextEncoder();
/** @internal */
const text = (body, contentType) => uint8Array(encoder.encode(body), contentType);
/** @internal */
const unsafeJson = body => text(JSON.stringify(body), "application/json");
/** @internal */
const json = body => Effect.try({
  try: () => unsafeJson(body),
  catch: error => HttpBodyError({
    _tag: "JsonError",
    error
  })
});

/** @internal */
const TypeId$2 = /*#__PURE__*/Symbol.for("@effect/platform/HttpClientRequest");
const Proto = {
  [TypeId$2]: TypeId$2,
  ...Inspectable.BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/HttpClientRequest",
      method: this.method,
      url: this.url,
      urlParams: this.urlParams,
      hash: this.hash,
      headers: Inspectable.redact(this.headers),
      body: this.body.toJSON()
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
function makeInternal(method, url, urlParams, hash, headers, body) {
  const self = Object.create(Proto);
  self.method = method;
  self.url = url;
  self.urlParams = urlParams;
  self.hash = hash;
  self.headers = headers;
  self.body = body;
  return self;
}
/** @internal */
const empty = /*#__PURE__*/makeInternal("GET", "", empty$2, /*#__PURE__*/Option.none(), empty$3, empty$1);
/** @internal */
const make$1 = method => (url, options) => modify(empty, {
  method,
  url,
  ...(options ?? undefined)
});
/** @internal */
const get$1 = /*#__PURE__*/make$1("GET");
/** @internal */
const post$1 = /*#__PURE__*/make$1("POST");
/** @internal */
const put$1 = /*#__PURE__*/make$1("PUT");
/** @internal */
const patch$1 = /*#__PURE__*/make$1("PATCH");
/** @internal */
const del$1 = /*#__PURE__*/make$1("DELETE");
/** @internal */
const head$1 = /*#__PURE__*/make$1("HEAD");
/** @internal */
const options$1 = /*#__PURE__*/make$1("OPTIONS");
/** @internal */
const modify = /*#__PURE__*/dual(2, (self, options) => {
  let result = self;
  if (options.method) {
    result = setMethod(result, options.method);
  }
  if (options.url) {
    result = setUrl(result, options.url);
  }
  if (options.headers) {
    result = setHeaders(result, options.headers);
  }
  if (options.urlParams) {
    result = setUrlParams(result, options.urlParams);
  }
  if (options.hash) {
    result = setHash(result, options.hash);
  }
  if (options.body) {
    result = setBody(result, options.body);
  }
  if (options.accept) {
    result = accept(result, options.accept);
  }
  if (options.acceptJson) {
    result = acceptJson(result);
  }
  return result;
});
/** @internal */
const setHeader = /*#__PURE__*/dual(3, (self, key, value) => makeInternal(self.method, self.url, self.urlParams, self.hash, set(self.headers, key, value), self.body));
/** @internal */
const setHeaders = /*#__PURE__*/dual(2, (self, input) => makeInternal(self.method, self.url, self.urlParams, self.hash, setAll$1(self.headers, input), self.body));
/** @internal */
const accept = /*#__PURE__*/dual(2, (self, mediaType) => setHeader(self, "Accept", mediaType));
/** @internal */
const acceptJson = /*#__PURE__*/accept("application/json");
/** @internal */
const setMethod = /*#__PURE__*/dual(2, (self, method) => makeInternal(method, self.url, self.urlParams, self.hash, self.headers, self.body));
/** @internal */
const setUrl = /*#__PURE__*/dual(2, (self, url) => {
  if (typeof url === "string") {
    return makeInternal(self.method, url, self.urlParams, self.hash, self.headers, self.body);
  }
  const clone = new URL(url.toString());
  const urlParams = fromInput(clone.searchParams);
  const hash = clone.hash ? Option.some(clone.hash.slice(1)) : Option.none();
  clone.search = "";
  clone.hash = "";
  return makeInternal(self.method, clone.toString(), urlParams, hash, self.headers, self.body);
});
/** @internal */
const setUrlParams = /*#__PURE__*/dual(2, (self, input) => makeInternal(self.method, self.url, setAll(self.urlParams, input), self.hash, self.headers, self.body));
/** @internal */
const setHash = /*#__PURE__*/dual(2, (self, hash) => makeInternal(self.method, self.url, self.urlParams, Option.some(hash), self.headers, self.body));
/** @internal */
const setBody = /*#__PURE__*/dual(2, (self, body) => {
  let headers = self.headers;
  if (body._tag === "Empty" || body._tag === "FormData") {
    headers = remove(headers, ["Content-type", "Content-length"]);
  } else {
    const contentType = body.contentType;
    if (contentType) {
      headers = set(headers, "content-type", contentType);
    }
    const contentLength = body.contentLength;
    if (contentLength) {
      headers = set(headers, "content-length", contentLength.toString());
    }
  }
  return makeInternal(self.method, self.url, self.urlParams, self.hash, headers, body);
});
/** @internal */
const bodyJson = /*#__PURE__*/dual(2, (self, body) => Effect.map(json(body), body => setBody(self, body)));

/** @internal */
const TypeId$1 = /*#__PURE__*/Symbol.for("@effect/platform/HttpClientResponse");
/** @internal */
const fromWeb = (request, source) => new ClientResponseImpl(request, source);
class ClientResponseImpl extends Inspectable.Class {
  request;
  source;
  [TypeId$4];
  [TypeId$1];
  constructor(request, source) {
    super();
    this.request = request;
    this.source = source;
    this[TypeId$4] = TypeId$4;
    this[TypeId$1] = TypeId$1;
  }
  toJSON() {
    return inspect(this, {
      _id: "@effect/platform/HttpClientResponse",
      request: this.request.toJSON(),
      status: this.status
    });
  }
  get status() {
    return this.source.status;
  }
  get headers() {
    return fromInput$1(this.source.headers);
  }
  cachedCookies;
  get cookies() {
    if (this.cachedCookies) {
      return this.cachedCookies;
    }
    return this.cachedCookies = fromSetCookie(this.source.headers.getSetCookie());
  }
  get remoteAddress() {
    return Option.none();
  }
  get stream() {
    return this.source.body ? Stream.fromReadableStream(() => this.source.body, cause => new ResponseError({
      request: this.request,
      response: this,
      reason: "Decode",
      cause
    })) : Stream.fail(new ResponseError({
      request: this.request,
      response: this,
      reason: "EmptyBody",
      description: "can not create stream from empty body"
    }));
  }
  get json() {
    return Effect.tryMap(this.text, {
      try: text => text === "" ? null : JSON.parse(text),
      catch: cause => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    });
  }
  textBody;
  get text() {
    return this.textBody ??= Effect.tryPromise({
      try: () => this.source.text(),
      catch: cause => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }).pipe(Effect.cached, Effect.runSync);
  }
  get urlParamsBody() {
    return Effect.flatMap(this.text, _ => Effect.try({
      try: () => fromInput(new URLSearchParams(_)),
      catch: cause => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }));
  }
  formDataBody;
  get formData() {
    return this.formDataBody ??= Effect.tryPromise({
      try: () => this.source.formData(),
      catch: cause => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }).pipe(Effect.cached, Effect.runSync);
  }
  arrayBufferBody;
  get arrayBuffer() {
    return this.arrayBufferBody ??= Effect.tryPromise({
      try: () => this.source.arrayBuffer(),
      catch: cause => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }).pipe(Effect.cached, Effect.runSync);
  }
}

const ATTR_HTTP_REQUEST_HEADER = key => `http.request.header.${key}`;
const ATTR_HTTP_REQUEST_METHOD = "http.request.method";
const ATTR_HTTP_RESPONSE_HEADER = key => `http.response.header.${key}`;
const ATTR_HTTP_RESPONSE_STATUS_CODE = "http.response.status_code";
const ATTR_SERVER_ADDRESS = "server.address";
const ATTR_SERVER_PORT = "server.port";
const ATTR_URL_FULL = "url.full";
const ATTR_URL_PATH = "url.path";
const ATTR_URL_SCHEME = "url.scheme";
const ATTR_URL_QUERY = "url.query";
/** @internal */
const TypeId = /*#__PURE__*/Symbol.for("@effect/platform/HttpClient");
/** @internal */
const tag = /*#__PURE__*/Context.GenericTag("@effect/platform/HttpClient");
/** @internal */
const currentTracerDisabledWhen = /*#__PURE__*/globalValue(/*#__PURE__*/Symbol.for("@effect/platform/HttpClient/tracerDisabledWhen"), () => FiberRef.unsafeMake(constFalse));
/** @internal */
const currentTracerPropagation = /*#__PURE__*/globalValue(/*#__PURE__*/Symbol.for("@effect/platform/HttpClient/currentTracerPropagation"), () => FiberRef.unsafeMake(true));
/** @internal */
const SpanNameGenerator = /*#__PURE__*/Context.Reference()("@effect/platform/HttpClient/SpanNameGenerator", {
  defaultValue: () => request => `http.client ${request.method}`
});
const ClientProto = {
  [TypeId]: TypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...Inspectable.BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/HttpClient"
    };
  },
  get(url, options) {
    return this.execute(get$1(url, options));
  },
  head(url, options) {
    return this.execute(head$1(url, options));
  },
  post(url, options) {
    return this.execute(post$1(url, options));
  },
  put(url, options) {
    return this.execute(put$1(url, options));
  },
  patch(url, options) {
    return this.execute(patch$1(url, options));
  },
  del(url, options) {
    return this.execute(del$1(url, options));
  },
  options(url, options) {
    return this.execute(options$1(url, options));
  }
};
/** @internal */
const makeWith = (postprocess, preprocess) => {
  const self = Object.create(ClientProto);
  self.preprocess = preprocess;
  self.postprocess = postprocess;
  self.execute = function (request) {
    return postprocess(preprocess(request));
  };
  return self;
};
const responseRegistry = /*#__PURE__*/globalValue("@effect/platform/HttpClient/responseRegistry", () => {
  if ("FinalizationRegistry" in globalThis && globalThis.FinalizationRegistry) {
    const registry = new FinalizationRegistry(controller => {
      controller.abort();
    });
    return {
      register(response, controller) {
        registry.register(response, controller, response);
      },
      unregister(response) {
        registry.unregister(response);
      }
    };
  }
  const timers = new Map();
  return {
    register(response, controller) {
      timers.set(response, setTimeout(() => controller.abort(), 5000));
    },
    unregister(response) {
      const timer = timers.get(response);
      if (timer === undefined) return;
      clearTimeout(timer);
      timers.delete(response);
    }
  };
});
const scopedRequests = /*#__PURE__*/globalValue("@effect/platform/HttpClient/scopedRequests", () => new WeakMap());
/** @internal */
const make = f => makeWith(effect => Effect.flatMap(effect, request => Effect.withFiberRuntime(fiber => {
  const scopedController = scopedRequests.get(request);
  const controller = scopedController ?? new AbortController();
  const urlResult = makeUrl(request.url, request.urlParams, request.hash);
  if (urlResult._tag === "Left") {
    return Effect.fail(new RequestError({
      request,
      reason: "InvalidUrl",
      cause: urlResult.left
    }));
  }
  const url = urlResult.right;
  const tracerDisabled = !fiber.getFiberRef(FiberRef.currentTracerEnabled) || fiber.getFiberRef(currentTracerDisabledWhen)(request);
  if (tracerDisabled) {
    const effect = f(request, url, controller.signal, fiber);
    if (scopedController) return effect;
    return Effect.uninterruptibleMask(restore => Effect.matchCauseEffect(restore(effect), {
      onSuccess(response) {
        responseRegistry.register(response, controller);
        return Effect.succeed(new InterruptibleResponse(response, controller));
      },
      onFailure(cause) {
        if (Cause.isInterrupted(cause)) {
          controller.abort();
        }
        return Effect.failCause(cause);
      }
    }));
  }
  const nameGenerator = Context.get(fiber.currentContext, SpanNameGenerator);
  return Effect.useSpan(nameGenerator(request), {
    kind: "client",
    captureStackTrace: false
  }, span => {
    span.attribute(ATTR_HTTP_REQUEST_METHOD, request.method);
    span.attribute(ATTR_SERVER_ADDRESS, url.origin);
    if (url.port !== "") {
      span.attribute(ATTR_SERVER_PORT, +url.port);
    }
    span.attribute(ATTR_URL_FULL, url.toString());
    span.attribute(ATTR_URL_PATH, url.pathname);
    span.attribute(ATTR_URL_SCHEME, url.protocol.slice(0, -1));
    const query = url.search.slice(1);
    if (query !== "") {
      span.attribute(ATTR_URL_QUERY, query);
    }
    const redactedHeaderNames = fiber.getFiberRef(currentRedactedNames);
    const redactedHeaders = redact(request.headers, redactedHeaderNames);
    for (const name in redactedHeaders) {
      span.attribute(ATTR_HTTP_REQUEST_HEADER(name), String(redactedHeaders[name]));
    }
    request = fiber.getFiberRef(currentTracerPropagation) ? setHeaders(request, toHeaders(span)) : request;
    return Effect.uninterruptibleMask(restore => restore(f(request, url, controller.signal, fiber)).pipe(Effect.withParentSpan(span), Effect.matchCauseEffect({
      onSuccess: response => {
        span.attribute(ATTR_HTTP_RESPONSE_STATUS_CODE, response.status);
        const redactedHeaders = redact(response.headers, redactedHeaderNames);
        for (const name in redactedHeaders) {
          span.attribute(ATTR_HTTP_RESPONSE_HEADER(name), String(redactedHeaders[name]));
        }
        if (scopedController) return Effect.succeed(response);
        responseRegistry.register(response, controller);
        return Effect.succeed(new InterruptibleResponse(response, controller));
      },
      onFailure(cause) {
        if (!scopedController && Cause.isInterrupted(cause)) {
          controller.abort();
        }
        return Effect.failCause(cause);
      }
    })));
  });
})), Effect.succeed);
class InterruptibleResponse {
  original;
  controller;
  constructor(original, controller) {
    this.original = original;
    this.controller = controller;
  }
  [TypeId$1] = TypeId$1;
  [TypeId$4] = TypeId$4;
  applyInterrupt(effect) {
    return Effect.suspend(() => {
      responseRegistry.unregister(this.original);
      return Effect.onInterrupt(effect, () => Effect.sync(() => {
        this.controller.abort();
      }));
    });
  }
  get request() {
    return this.original.request;
  }
  get status() {
    return this.original.status;
  }
  get headers() {
    return this.original.headers;
  }
  get cookies() {
    return this.original.cookies;
  }
  get remoteAddress() {
    return this.original.remoteAddress;
  }
  get formData() {
    return this.applyInterrupt(this.original.formData);
  }
  get text() {
    return this.applyInterrupt(this.original.text);
  }
  get json() {
    return this.applyInterrupt(this.original.json);
  }
  get urlParamsBody() {
    return this.applyInterrupt(this.original.urlParamsBody);
  }
  get arrayBuffer() {
    return this.applyInterrupt(this.original.arrayBuffer);
  }
  get stream() {
    return Stream.suspend(() => {
      responseRegistry.unregister(this.original);
      return Stream.ensuring(this.original.stream, Effect.sync(() => {
        this.controller.abort();
      }));
    });
  }
  toJSON() {
    return this.original.toJSON();
  }
  [Inspectable.NodeInspectSymbol]() {
    return this.original[Inspectable.NodeInspectSymbol]();
  }
}
const {
  /** @internal */
  del,
  /** @internal */
  execute,
  /** @internal */
  get,
  /** @internal */
  head,
  /** @internal */
  options,
  /** @internal */
  patch,
  /** @internal */
  post,
  /** @internal */
  put
} = /*#__PURE__*/Effect.serviceFunctions(tag);
/** @internal */
const transformResponse = /*#__PURE__*/dual(2, (self, f) => {
  const client = self;
  return makeWith(request => f(client.postprocess(request)), client.preprocess);
});
/** @internal */
const retryTransient$1 = /*#__PURE__*/dual(2, (self, options) => {
  const isOnlySchedule = Schedule.ScheduleTypeId in options;
  const mode = isOnlySchedule ? "both" : options.mode ?? "both";
  const schedule = isOnlySchedule ? options : options.schedule;
  const passthroughSchedule = schedule && Schedule.passthrough(schedule);
  const times = isOnlySchedule ? undefined : options.times;
  return transformResponse(self, flow(mode === "errors-only" ? identity : Effect.repeat({
    schedule: passthroughSchedule,
    times,
    while: isTransientResponse
  }), mode === "response-only" ? identity : Effect.retry({
    while: isOnlySchedule || options.while === undefined ? isTransientError : Predicate.or(isTransientError, options.while),
    schedule,
    times
  })));
});
const isTransientError = error => Predicate.hasProperty(error, Cause.TimeoutExceptionTypeId) || isTransientHttpError(error);
const isTransientHttpError = error => isHttpClientError(error) && (error._tag === "RequestError" && error.reason === "Transport" || error._tag === "ResponseError" && isTransientResponse(error.response));
const isTransientResponse = response => response.status === 408 || response.status === 429 || response.status === 500 || response.status === 502 || response.status === 503 || response.status === 504;
/** @internal */
const layerMergedContext = effect => Layer.effect(tag, Effect.flatMap(Effect.context(), context => Effect.map(effect, client => transformResponse(client, Effect.mapInputContext(input => Context.merge(context, input))))));

/** @internal */
const fetchTagKey = "@effect/platform/FetchHttpClient/Fetch";
/** @internal */
const requestInitTagKey = "@effect/platform/FetchHttpClient/FetchOptions";
const fetch = /*#__PURE__*/make((request, url, signal, fiber) => {
  const context = fiber.getFiberRef(FiberRef.currentContext);
  const fetch = context.unsafeMap.get(fetchTagKey) ?? globalThis.fetch;
  const options = context.unsafeMap.get(requestInitTagKey) ?? {};
  const headers = options.headers ? merge(fromInput$1(options.headers), request.headers) : request.headers;
  const send = body => Effect.map(Effect.tryPromise({
    try: () => fetch(url, {
      ...options,
      method: request.method,
      headers,
      body,
      duplex: request.body._tag === "Stream" ? "half" : undefined,
      signal
    }),
    catch: cause => new RequestError({
      request,
      reason: "Transport",
      cause
    })
  }), response => fromWeb(request, response));
  switch (request.body._tag) {
    case "Raw":
    case "Uint8Array":
      return send(request.body.body);
    case "FormData":
      return send(request.body.formData);
    case "Stream":
      return Effect.flatMap(Stream.toReadableStreamEffect(request.body.stream), send);
  }
  return send(undefined);
});
/** @internal */
const layer$1 = /*#__PURE__*/layerMergedContext(/*#__PURE__*/Effect.succeed(fetch));

/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category layers
 */
const layer = layer$1;

/**
 * @since 1.0.0
 * @category tags
 */
const HttpClient = tag;
/**
 * Retries common transient errors, such as rate limiting, timeouts or network issues.
 *
 * Specifying a `while` predicate allows you to consider other errors as
 * transient.
 *
 * @since 1.0.0
 * @category error handling
 */
const retryTransient = retryTransient$1;

const runEffect = async (effect) => await Effect$1.runPromise(effect);
const appendSearchParamsToUrl = dual(3, (url, name, value) => {
  url.searchParams.append(name, value);
  return url;
});
class HTTPClient extends Effect$1.Service()("HTTPClient", {
  dependencies: [layer],
  effect: Effect$1.gen(function* () {
    const baseHttpClient = (yield* HttpClient).pipe(
      retryTransient({
        times: 3,
        schedule: Schedule$1.spaced("3 second")
      })
    );
    return baseHttpClient;
  })
}) {
}

export { HTTPClient as H, appendSearchParamsToUrl as a, bodyJson as b, HttpClient as c, layer as l, post$1 as p, runEffect as r, setHeaders as s };
