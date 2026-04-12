import { V as VerifyEmail } from '../../../chunks/verify-email_Bpr69dg6.mjs';
import 'node:path';
import { s as stripLeadingAndTrailingSlashes } from '../../../chunks/routeMap_Dx-D39YV.mjs';
import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
export { renderers } from '../../../renderers.mjs';

const { GET, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    GET: (ctx) => genLogger("studiocms/routes/api/dashboard/verify-email.GET")(function* () {
      const [sdk, verifyEmail] = yield* Effect.all([SDKCore, VerifyEmail]);
      if (!ctx.locals.StudioCMS.siteConfig.data.enableMailer) {
        return apiResponseLogger(400, "Mailer is disabled, this action is disabled.");
      }
      const url = new URL(ctx.request.url);
      const params = url.searchParams;
      const token = params.get("token");
      const userId = params.get("userId");
      if (!token || !userId) {
        return apiResponseLogger(400, "Invalid request");
      }
      const verificationToken = yield* verifyEmail.getEmailVerificationRequest(userId);
      if (!verificationToken) {
        return apiResponseLogger(404, "Verification token not found");
      }
      if (verificationToken.token !== token) {
        return apiResponseLogger(400, "Invalid token");
      }
      const existingUser = yield* sdk.GET.users.byId(userId);
      if (!existingUser) {
        return apiResponseLogger(404, "User not found");
      }
      yield* Effect.all([
        sdk.AUTH.user.update({
          userId,
          userData: {
            id: userId,
            name: existingUser.name,
            username: existingUser.username,
            emailVerified: true,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            createdAt: void 0
          }
        }),
        sdk.AUTH.verifyEmail.delete(userId)
      ]);
      if (!ctx.site) {
        return apiResponseLogger(400, "Site URL is not configured");
      }
      return ctx.redirect(
        stripLeadingAndTrailingSlashes(ctx.site.toString()) + ctx.locals.StudioCMS.routeMap.mainLinks.dashboardIndex
      );
    }).pipe(VerifyEmail.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["GET", "OPTIONS"] },
    onError: (error) => {
      console.error("API Error:", error);
      return createJsonResponse({ error: "Internal Server Error" }, { status: 500 });
    }
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	GET,
	OPTIONS
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
