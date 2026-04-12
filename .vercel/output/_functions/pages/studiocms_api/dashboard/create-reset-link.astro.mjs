import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/create-reset-link.POST")(function* () {
      const [notify, sdk] = yield* Effect.all([Notifications, SDKCore]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { userId } = yield* readAPIContextJson(ctx);
      if (!userId) {
        return apiResponseLogger(400, "Invalid form data, userId is required");
      }
      const token = yield* sdk.resetTokenBucket.new(userId);
      if (!token) {
        return apiResponseLogger(500, "Failed to create reset link");
      }
      const user = yield* sdk.GET.users.byId(userId);
      if (!user) {
        return apiResponseLogger(404, "User not found");
      }
      yield* notify.sendAdminNotification("user_updated", user.username);
      return createJsonResponse(token);
    }).pipe(Notifications.Provide),
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
	OPTIONS,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
