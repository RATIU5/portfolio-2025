import { Schema, Either, ParseResult, Effect } from 'effect';
import { S as StudioCMSAPIError } from './errors_slyqaxPm.mjs';
import { c as createEffectAPIRoute, a as createJsonResponse, A as AllResponse } from './response-helpers_CuTopjH7.mjs';
import { g as genLogger } from './logger_bcCLNlRx.mjs';

const extractParams = (schema, overrideOptions) => {
  return (callback) => {
    return (ctx) => {
      const userSchemaOpts = {};
      const schemaOpts = {
        errors: "all",
        ...userSchemaOpts
      };
      const data = Schema.decodeUnknownEither(schema, schemaOpts)(ctx.params);
      if (Either.isLeft(data)) {
        const parsedErrors = ParseResult.ArrayFormatter.formatErrorSync(data.left);
        return Effect.succeed(
          new Response(
            JSON.stringify({ error: "API Parameters Decoding Error", errors: parsedErrors }),
            {
              status: 400,
              statusText: "Bad Request",
              headers: { "Content-Type": "application/json" }
            }
          )
        );
      }
      return callback(data.right, ctx);
    };
  };
};

const firstLetterUppercase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isString(value) {
  return typeof value === "string";
}
function idOrPathRouter(id, rootRoute, subPathRouter) {
  if (!id.includes("/")) {
    return rootRoute(id);
  }
  const parts = id.split("/");
  const pageId = parts[0];
  const subPath = parts.slice(1).join("/");
  const subRouter = subPathRouter[subPath];
  if (subRouter) {
    const router = subRouter(pageId);
    return router;
  }
  for (const key in subPathRouter) {
    if (key.includes("[") && key.includes("]")) {
      const pattern = key.replace(/\[([^\]]+)\]/g, "([^/]+)");
      const regex = new RegExp(`^${pattern}$`);
      const match = subPath.match(regex);
      if (match) {
        const params = {};
        const paramNames = Array.from(key.matchAll(/\[([^\]]+)\]/g)).map((m) => m[1]);
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        const router = subPathRouter[key](pageId, params);
        return router;
      }
    }
  }
  return {};
}
const processHandler = Effect.fn("processHandler")(function* (handler, ctx, path, method) {
  if (!handler) {
    return AllResponse();
  }
  const response = yield* Effect.tryPromise({
    try: async () => await handler(ctx),
    catch: (error) => new StudioCMSAPIError({
      message: `Error in handler for path ${path} [${method}]: ${String(error)}`,
      cause: error
    })
  }).pipe(
    Effect.catchAll(
      (error) => Effect.logError(`API Route Error: ${String(error)}`).pipe(
        Effect.as(createJsonResponse({ error: "Internal Server Error" }, { status: 500 }))
      )
    )
  );
  return response;
});
const createRestRouter = (prefix, types, registry) => {
  const paramSchema = Schema.Struct({
    type: types,
    id: Schema.optional(Schema.String)
  }).annotations({
    identifier: "TypeParams",
    parseIssueTitle: ({ actual }) => {
      if (Schema.is(paramSchema)(actual)) {
        return `Type: ${// biome-ignore lint/style/noNonNullAssertion: we know it's defined here
        firstLetterUppercase(actual.type.toString())}`;
      }
    }
  });
  return createEffectAPIRoute(
    extractParams(paramSchema)(
      ({ type, id = "__index" }, ctx) => genLogger(`${prefix}:${type}${id !== "__index" ? `:${id}` : ""}:${ctx.request.method}`)(
        function* () {
          const method = ctx.request.method.toUpperCase();
          const routeGroup = registry[type];
          let handlers;
          switch (routeGroup.__idType) {
            case "number": {
              if (id === "__index") {
                handlers = routeGroup.__index;
              } else {
                const numericId = Number(id);
                if (!isNumber(numericId)) {
                  return createJsonResponse(
                    { error: `Invalid ID for type ${type}: ${id}` },
                    { status: 400 }
                  );
                }
                handlers = routeGroup.id ? routeGroup.id(numericId) : void 0;
              }
              break;
            }
            case "string": {
              if (id === "__index") {
                handlers = routeGroup.__index;
              } else {
                if (!isString(id)) {
                  return createJsonResponse(
                    { error: `Invalid ID for type ${type}: ${id}` },
                    { status: 400 }
                  );
                }
                handlers = routeGroup.id ? routeGroup.id(id) : void 0;
              }
              break;
            }
          }
          const handler = handlers ? handlers[method] || handlers.ALL : void 0;
          return yield* processHandler(handler, ctx, `${type}/${id}`, method);
        }
      )
    )
  );
};
const createSimplePathRouter = (prefix, router) => {
  const pathSchema = Schema.Struct({
    path: Schema.transform(Schema.UndefinedOr(Schema.String), Schema.String, {
      strict: true,
      decode: (value) => value === void 0 || value === "" ? "__index" : value,
      encode: (value) => value
    })
  }).annotations({
    identifier: "PathParams",
    parseIssueTitle: ({ actual }) => {
      if (Schema.is(pathSchema)(actual)) {
        return `Path: ${firstLetterUppercase(actual.path?.toString() || "index")}`;
      }
    }
  });
  return createEffectAPIRoute(
    extractParams(pathSchema)(
      ({ path }, ctx) => genLogger(`${prefix}:${path}:${ctx.request.method}`)(function* () {
        const method = ctx.request.method.toUpperCase();
        const handlers = router[path];
        if (!handlers) {
          return AllResponse();
        }
        const handler = handlers[method] || handlers.ALL;
        return yield* processHandler(handler, ctx, path, method);
      })
    )
  );
};
function pathRouter(id, subPathRouter) {
  if (!subPathRouter[id]) return {};
  return subPathRouter[id](id);
}

export { createRestRouter as a, createSimplePathRouter as c, idOrPathRouter as i, pathRouter as p };
