import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/email-notification-settings-site.POST")(
      function* () {
        const sdk = yield* SDKCore;
        const userData = ctx.locals.StudioCMS.security?.userSessionData;
        if (!userData?.isLoggedIn) {
          return apiResponseLogger(403, "Unauthorized");
        }
        const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isOwner;
        if (!isAuthorized) {
          return apiResponseLogger(403, "Unauthorized");
        }
        yield* readAPIContextJson(ctx).pipe(
          Effect.map((raw) => {
            const rawData = raw ?? {};
            const safe = {
              emailVerification: typeof rawData.emailVerification === "boolean" ? rawData.emailVerification : void 0,
              requireAdminVerification: typeof rawData.requireAdminVerification === "boolean" ? rawData.requireAdminVerification : void 0,
              requireEditorVerification: typeof rawData.requireEditorVerification === "boolean" ? rawData.requireEditorVerification : void 0,
              oAuthBypassVerification: typeof rawData.oAuthBypassVerification === "boolean" ? rawData.oAuthBypassVerification : void 0
            };
            return safe;
          }),
          Effect.flatMap((data) => sdk.notificationSettings.site.update(data))
        );
        return apiResponseLogger(200, "Notification settings updated");
      }
    ),
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
