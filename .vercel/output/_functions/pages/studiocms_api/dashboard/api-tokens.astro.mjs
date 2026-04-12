import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, DELETE, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/api-tokens.POST")(function* () {
      const sdk = yield* SDKCore;
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isEditor;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const jsonData = yield* readAPIContextJson(ctx);
      if (!jsonData.description) {
        return apiResponseLogger(400, "Invalid form data, description is required");
      }
      if (!jsonData.user) {
        return apiResponseLogger(400, "Invalid form data, user is required");
      }
      const newToken = yield* sdk.REST_API.tokens.new(jsonData.user, jsonData.description);
      return createJsonResponse({ token: newToken.key });
    }),
    DELETE: (ctx) => genLogger("studiocms/routes/api/dashboard/api-tokens.DELETE")(function* () {
      const sdk = yield* SDKCore;
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isEditor;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const jsonData = yield* readAPIContextJson(ctx);
      if (!jsonData.tokenID) {
        return apiResponseLogger(400, "Invalid form data, tokenID is required");
      }
      if (!jsonData.userID) {
        return apiResponseLogger(400, "Invalid form data, userID is required");
      }
      yield* sdk.REST_API.tokens.delete({ tokenId: jsonData.tokenID, userId: jsonData.userID });
      return apiResponseLogger(200, "Token deleted");
    }),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST", "DELETE"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "DELETE", "OPTIONS"] },
    onError: (error) => {
      console.error("API Error:", error);
      return createJsonResponse(
        { error: "Internal Server Error" },
        {
          status: 500
        }
      );
    }
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	DELETE,
	OPTIONS,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
