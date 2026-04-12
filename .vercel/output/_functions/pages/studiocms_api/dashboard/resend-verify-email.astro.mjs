import { V as VerifyEmail } from '../../../chunks/verify-email_Bpr69dg6.mjs';
import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/resend-verify-email.POST")(function* () {
      const [sdk, verifier] = yield* Effect.all([SDKCore, VerifyEmail]);
      if (!ctx.locals.StudioCMS.siteConfig.data.enableMailer) {
        return apiResponseLogger(400, "Mailer is disabled, this action is disabled.");
      }
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isPrivileged = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin || ctx.locals.StudioCMS.security?.userPermissionLevel.isOwner;
      if (!isPrivileged) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { userId } = yield* readAPIContextJson(ctx);
      if (!userId) {
        return apiResponseLogger(400, "Invalid request");
      }
      const newToken = yield* sdk.AUTH.verifyEmail.create(userId);
      if (!newToken) {
        return apiResponseLogger(500, "Failed to create verification token");
      }
      const response = yield* verifier.sendVerificationEmail(userId);
      if (!response) {
        return apiResponseLogger(500, "Failed to send verification email");
      }
      if ("error" in response) {
        return apiResponseLogger(500, response.error);
      }
      return apiResponseLogger(200, response.message);
    }).pipe(VerifyEmail.Provide),
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
