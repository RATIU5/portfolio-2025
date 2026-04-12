import { a as apiResponseLogger } from '../../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { M as Mailer } from '../../../../chunks/index_BGOImdQ1.mjs';
import { p as parseAPIContextJson } from '../../../../chunks/context-utils_B5oaSSnO.mjs';
import { Schema, Effect } from 'effect';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../chunks/response-helpers_CuTopjH7.mjs';
import { g as genLogger } from '../../../../chunks/logger_bcCLNlRx.mjs';
export { renderers } from '../../../../renderers.mjs';

class SmtpConfigSchema extends Schema.Class("SmtpConfigSchema")({
  port: Schema.Number,
  host: Schema.String,
  secure: Schema.Boolean,
  proxy: Schema.Union(Schema.String, Schema.Null),
  auth_user: Schema.Union(Schema.String, Schema.Null),
  auth_pass: Schema.Union(Schema.String, Schema.Null),
  tls_rejectUnauthorized: Schema.Union(Schema.Boolean, Schema.Null),
  tls_servername: Schema.Union(Schema.String, Schema.Null),
  default_sender: Schema.String
}) {
}
const { POST, PATCH, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("routes/mailer/config/POST")(function* () {
      const mailer = yield* Mailer;
      if (!ctx.locals.StudioCMS.security?.userSessionData.isLoggedIn) {
        return apiResponseLogger(401, "Authentication required");
      }
      if (!ctx.locals.StudioCMS.security?.userPermissionLevel.isOwner) {
        return apiResponseLogger(403, "Forbidden");
      }
      const smtpConfig = yield* parseAPIContextJson(ctx, SmtpConfigSchema);
      if (!Number.isInteger(smtpConfig.port) || smtpConfig.port < 1 || smtpConfig.port > 65535) {
        return apiResponseLogger(
          400,
          "Invalid form data, port must be an integer between 1 and 65535"
        );
      }
      if (typeof smtpConfig.host !== "string" || smtpConfig.host.trim() === "") {
        return apiResponseLogger(400, "Invalid form data, host is required");
      }
      if (typeof smtpConfig.secure !== "boolean") {
        return apiResponseLogger(400, "Invalid form data, secure must be a boolean");
      }
      if (typeof smtpConfig.default_sender !== "string" || smtpConfig.default_sender.trim() === "") {
        return apiResponseLogger(400, "Invalid form data, default_sender is required");
      }
      const config = yield* mailer.createMailerConfigTable(smtpConfig);
      if (!config) {
        return apiResponseLogger(500, "Error creating mailer config table");
      }
      return apiResponseLogger(200, "Mailer config updated");
    }).pipe(Mailer.Provide),
    PATCH: (ctx) => genLogger("routes/mailer/config/PATCH")(function* () {
      const mailer = yield* Mailer;
      if (!ctx.locals.StudioCMS.security?.userSessionData.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      if (!ctx.locals.StudioCMS.security?.userPermissionLevel.isOwner) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const smtpConfig = yield* parseAPIContextJson(ctx, SmtpConfigSchema);
      if (!smtpConfig.port) {
        return apiResponseLogger(400, "Invalid form data, port is required");
      }
      if (!smtpConfig.host) {
        return apiResponseLogger(400, "Invalid form data, host is required");
      }
      if (!smtpConfig.secure) {
        return apiResponseLogger(400, "Invalid form data, secure is required");
      }
      if (!smtpConfig.default_sender) {
        return apiResponseLogger(400, "Invalid form data, default_sender is required");
      }
      const config = yield* mailer.updateMailerConfigTable(smtpConfig);
      if (!config) {
        return apiResponseLogger(500, "Error updating mailer config table");
      }
      return apiResponseLogger(200, "Mailer config updated");
    }).pipe(Mailer.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST", "PATCH"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "PATCH", "OPTIONS"] },
    // biome-ignore lint/suspicious/noExplicitAny: allows for better error handling
    onError: (error) => {
      console.error("API Error:", error);
      const isClientError = error?.status === 400 || error?.name === "SyntaxError" || error?._tag === "ParseError" || error?._tag === "JSONParseError" || typeof error?.name === "string" && error.name.includes("Schema");
      return createJsonResponse(
        { error: isClientError ? "Invalid request body" : "Internal Server Error" },
        { status: isClientError ? 400 : 500 }
      );
    }
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	OPTIONS,
	PATCH,
	POST,
	SmtpConfigSchema
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
