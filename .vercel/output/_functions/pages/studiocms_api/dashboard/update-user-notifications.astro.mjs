import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/update-user-notifications.POST")(function* () {
      const sdk = yield* SDKCore;
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const jsonData = yield* readAPIContextJson(ctx);
      const userId = jsonData.id;
      const notifications = jsonData.notifications;
      if (!userId) {
        return apiResponseLogger(400, "Invalid request");
      }
      const user = yield* sdk.GET.users.byId(userId);
      if (!user) {
        return apiResponseLogger(404, "User not found");
      }
      const existingUser = yield* sdk.GET.users.byId(userId);
      if (!existingUser) {
        return apiResponseLogger(404, "User not found");
      }
      const updatedData = yield* sdk.AUTH.user.update({
        userId,
        userData: {
          id: userId,
          name: existingUser.name,
          username: existingUser.username,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          emailVerified: existingUser.emailVerified,
          createdAt: void 0,
          notifications
        }
      });
      if (!updatedData) {
        return apiResponseLogger(400, "Failed to update user notifications");
      }
      return apiResponseLogger(200, "User notifications updated successfully");
    }),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "OPTIONS"] },
    onError: (error) => {
      console.error("API Error:", error);
      return createJsonResponse({ error: "Internal Server Error" }, { status: 500 });
    }
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	OPTIONS,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
