import { a as apiResponseLogger } from '../../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { M as Mailer } from '../../../../chunks/index_BGOImdQ1.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("routes/mailer/test-email/POST")(function* () {
      const mailer = yield* Mailer;
      if (!ctx.locals.StudioCMS.siteConfig.data.enableMailer) {
        return apiResponseLogger(403, "Mailer is disabled for this site");
      }
      if (!ctx.locals.StudioCMS.security?.userSessionData.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      if (!ctx.locals.StudioCMS.security?.userPermissionLevel.isOwner) {
        return apiResponseLogger(403, "Unauthorized");
      }
      let test_email;
      try {
        ({ test_email } = yield* readAPIContextJson(ctx));
      } catch {
        return apiResponseLogger(400, "Invalid JSON body");
      }
      if (typeof test_email !== "string" || test_email.trim() === "") {
        return apiResponseLogger(400, "Invalid form data, test_email is required");
      }
      const email = test_email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return apiResponseLogger(400, "Invalid email address");
      }
      const response = yield* mailer.sendMail({
        to: test_email,
        subject: "StudioCMS Test Email",
        text: "This is a test email from StudioCMS."
      });
      if ("error" in response) {
        console.error("Mailer test-email failed:", response.error);
        return apiResponseLogger(500, "Failed to send test email");
      }
      return apiResponseLogger(200, "Test email sent");
    }).pipe(Mailer.Provide),
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
