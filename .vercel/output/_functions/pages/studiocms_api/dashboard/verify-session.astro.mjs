import { S as Session } from '../../../chunks/core_DE9YiRdf.mjs';
import { l as logger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { A as AuthSessionCookieName } from '../../../chunks/consts_CvAQFK6n.mjs';
import { Schema, Effect } from 'effect';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { p as parseAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

class JsonData extends Schema.Class("JsonData")({
  originPathname: Schema.String
}) {
}
const responseBuilder = (context, isLoggedIn, user, permissionLevel) => {
  const data = {
    isLoggedIn,
    user: user ? {
      id: user.id,
      name: user.name,
      email: user.email || null,
      avatar: user.avatar || null,
      username: user.username
    } : null,
    permissionLevel,
    routes: {
      logout: context.locals.StudioCMS.routeMap.authLinks.logoutAPI,
      userProfile: context.locals.StudioCMS.routeMap.mainLinks.userProfile,
      contentManagement: context.locals.StudioCMS.routeMap.mainLinks.contentManagement,
      dashboardIndex: context.locals.StudioCMS.routeMap.mainLinks.dashboardIndex
    }
  };
  return createJsonResponse(data);
};
const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/verify-session.POST")(function* () {
      const [ses, sdk] = yield* Effect.all([Session, SDKCore]);
      const logger$1 = logger.fork("studiocms:runtime:api:verify-session");
      const { cookies } = ctx;
      const { originPathname } = yield* parseAPIContextJson(ctx, JsonData);
      const sessionToken = cookies.get(AuthSessionCookieName)?.value ?? null;
      if (!sessionToken) {
        logger$1.info(
          `No session token found in cookies, returning unknown session status. Origin: ${originPathname}`
        );
        return responseBuilder(ctx, false, null, "unknown");
      }
      const { session, user } = yield* ses.validateSessionToken(sessionToken);
      if (session === null) {
        yield* ses.deleteSessionTokenCookie(ctx);
        logger$1.info(
          `Session token is invalid or expired, deleting cookie. Origin: ${originPathname}`
        );
        return responseBuilder(ctx, false, null, "unknown");
      }
      if (!user || user === null) {
        logger$1.info(
          `No user found for session token, returning unknown session status. Origin: ${originPathname}`
        );
        return responseBuilder(ctx, false, null, "unknown");
      }
      const result = yield* sdk.AUTH.permission.currentStatus(user.id);
      if (!result) {
        logger$1.error(
          `Failed to retrieve permission status for user ${user.id}, returning unknown session status. Origin: ${originPathname}`
        );
        return responseBuilder(ctx, true, user, "unknown");
      }
      let permissionLevel = "unknown";
      switch (result.rank) {
        case "owner":
          permissionLevel = "owner";
          break;
        case "admin":
          permissionLevel = "admin";
          break;
        case "editor":
          permissionLevel = "editor";
          break;
        case "visitor":
          permissionLevel = "visitor";
          break;
        default:
          permissionLevel = "unknown";
          break;
      }
      return responseBuilder(ctx, true, user, permissionLevel);
    }),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "OPTIONS"] },
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
	JsonData,
	OPTIONS,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
