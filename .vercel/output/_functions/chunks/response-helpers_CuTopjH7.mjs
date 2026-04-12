import { r as runEffect } from './effect_DkdxkRrn.mjs';

function getCorsHeaders(context, corsConfig) {
  if (!corsConfig)
    return {
      "Access-Control-Allow-Origin": "*"
    };
  const headers = {};
  const origin = context.request.headers.get("origin") ?? context.request.headers.get("Origin") ?? "";
  const cfgOrigin = corsConfig.origin;
  if (cfgOrigin === true) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (typeof cfgOrigin === "string") {
    headers["Access-Control-Allow-Origin"] = cfgOrigin;
  } else if (Array.isArray(cfgOrigin)) {
    if (origin && cfgOrigin.includes(origin)) {
      headers["Access-Control-Allow-Origin"] = origin;
    }
  }
  if (corsConfig.methods) {
    const normalized = corsConfig.methods.map((m) => m.toUpperCase());
    if (context.request.method === "OPTIONS") {
      const methodsSet = Array.from(/* @__PURE__ */ new Set(["OPTIONS", ...normalized]));
      const methodsList = methodsSet.join(", ");
      headers["Access-Control-Allow-Methods"] = methodsList;
      if (!headers.Allow) {
        headers.Allow = methodsList;
      }
    } else {
      headers["Access-Control-Allow-Methods"] = normalized.join(", ");
    }
  }
  if (corsConfig.headers) {
    headers["Access-Control-Allow-Headers"] = corsConfig.headers.join(", ");
  } else if (context.request.method === "OPTIONS") {
    const acrh = context.request.headers.get("access-control-request-headers") ?? context.request.headers.get("Access-Control-Request-Headers");
    if (acrh) {
      headers["Access-Control-Allow-Headers"] = acrh;
    }
  }
  if (corsConfig.credentials) {
    headers["Access-Control-Allow-Credentials"] = "true";
    if (headers["Access-Control-Allow-Origin"] === "*") {
      if (origin) {
        headers["Access-Control-Allow-Origin"] = origin;
      } else {
        delete headers["Access-Control-Allow-Origin"];
      }
    }
  }
  if (origin && headers["Access-Control-Allow-Origin"] === origin) {
    headers.Vary = headers.Vary ? `${headers.Vary}, Origin` : "Origin";
  }
  return headers;
}
const SupportedContentTypeHeadersMap = {
  "application/json": "json" /* JSON */,
  "application/x-www-form-urlencoded": "formData" /* FORM_DATA */,
  "multipart/form-data": "formData" /* FORM_DATA */
};
async function validateRequest(context, validate) {
  if (!validate) return null;
  if (validate.params && !await validate.params(context.params)) {
    return "Invalid parameters";
  }
  if (validate.query) {
    const url = context.url instanceof URL ? context.url : new URL(context.url);
    if (!await validate.query(url.searchParams)) {
      return "Invalid query parameters";
    }
  }
  if (validate.body && context.request.method !== "GET" && context.request.method !== "HEAD") {
    try {
      const contentType = context.request.headers.get("content-type")?.toLowerCase() ?? "";
      let bodyType = "text" /* TEXT */;
      let body;
      const mediaType = contentType.split(";", 1)[0].trim();
      if (mediaType && mediaType in SupportedContentTypeHeadersMap) {
        bodyType = SupportedContentTypeHeadersMap[mediaType];
        body = await context.request.clone()[bodyType]();
      } else if (mediaType.endsWith("+json")) {
        bodyType = "json" /* JSON */;
        body = await context.request.clone().json();
      } else {
        bodyType = "text" /* TEXT */;
        body = await context.request.clone().text();
      }
      switch (bodyType) {
        case "json" /* JSON */:
          if (validate.body.kind !== "json") {
            return "Invalid body content type";
          }
          if (!await validate.body.json(body)) {
            return "Invalid JSON body";
          }
          break;
        case "formData" /* FORM_DATA */:
          if (validate.body.kind !== "formData") {
            return "Invalid body content type";
          }
          if (!await validate.body.formData(body)) {
            return "Invalid form data body";
          }
          break;
        case "text" /* TEXT */:
          if (validate.body.kind !== "text") {
            return "Invalid body content type";
          }
          if (!await validate.body.text(body)) {
            return "Invalid text body";
          }
          break;
      }
    } catch (_error) {
      return "Failed to parse request body";
    }
  }
  return null;
}

const createEffectAPIRoute = (fn) => {
  return async (context) => {
    return await runEffect(fn(context));
  };
};
const withEffectAPI = (fn, options = {}) => {
  return async (context) => {
    try {
      const corsHeaders = getCorsHeaders(context, options.cors);
      if (context.request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders
        });
      }
      let processedContext = context;
      if (options.onBeforeEffect) {
        processedContext = await options.onBeforeEffect(context);
      }
      if (options.validate) {
        const validationError = await validateRequest(processedContext, options.validate);
        if (validationError) {
          const errorResponse = new Response(
            JSON.stringify({ error: "Validation failed", details: validationError }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
          return errorResponse;
        }
      }
      let effectPromise = runEffect(fn(processedContext));
      if (options.timeout) {
        effectPromise = Promise.race([
          effectPromise,
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("Request timeout")), options.timeout)
          )
        ]);
      }
      const response = await effectPromise;
      if (corsHeaders && Object.keys(corsHeaders).length > 0) {
        Object.entries(corsHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      }
      return options.onSuccess ? await options.onSuccess(response, processedContext) : response;
    } catch (error) {
      const corsHeaders = getCorsHeaders(context, options.cors);
      if (options.onError) {
        const errorResponse = await options.onError(error, context);
        Object.entries(corsHeaders).forEach(([key, value]) => {
          errorResponse.headers.set(key, value);
        });
        return errorResponse;
      }
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Internal Server Error"
        }),
        {
          status: error instanceof Error && error.message === "Request timeout" ? 408 : 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }
  };
};
const createEffectAPIRoutes = (handlers, config = {}) => {
  const routes = {};
  for (const [method, handler] of Object.entries(handlers)) {
    if (handler) {
      const methodKey = method;
      const methodConfig = {
        ...config,
        ...config.methods?.[methodKey] || {}
      };
      const { methods: _droppedMethods, ...finalConfig } = methodConfig;
      routes[methodKey] = withEffectAPI(handler, finalConfig);
    }
  }
  return routes;
};

const OptionsResponse = (opts) => new Response(null, {
  status: 204,
  statusText: "No Content",
  headers: {
    ...opts.headers,
    Allow: `OPTIONS, ${opts.allowedMethods.join(", ")}`,
    "Access-Control-Allow-Origin": opts.allowedOrigins?.join(", ") || "*",
    Date: (/* @__PURE__ */ new Date()).toUTCString()
  }
});
const AllResponse = (opts) => new Response(null, {
  status: 405,
  statusText: "Method Not Allowed",
  headers: {
    ...opts?.headers,
    "Access-Control-Allow-Origin": "*",
    Date: (/* @__PURE__ */ new Date()).toUTCString()
  }
});
const createJsonResponse = (data, opts = {}) => new Response(JSON.stringify(data), {
  status: opts.status || 200,
  statusText: opts.statusText || "OK",
  headers: {
    "Content-Type": "application/json",
    ...opts?.headers,
    "Access-Control-Allow-Origin": opts?.allowedOrigins?.join(", ") || "*",
    Date: (/* @__PURE__ */ new Date()).toUTCString()
  }
});

export { AllResponse as A, OptionsResponse as O, createJsonResponse as a, createEffectAPIRoutes as b, createEffectAPIRoute as c };
