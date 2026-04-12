import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { t as templateEngine } from '../../../chunks/index_BYVMfRrk.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/templates.POST")(function* () {
      const [sdk, { templates }, engine] = yield* Effect.all([
        SDKCore,
        readAPIContextJson(ctx),
        templateEngine
      ]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const keys = engine.availableTemplates;
      const updates = {};
      for (const key of keys) {
        if (key in templates) {
          updates[key] = templates[key];
        }
      }
      if (Object.keys(updates).length === 0) {
        return apiResponseLogger(400, "No valid templates provided for update.");
      }
      const updatedConfig = yield* sdk.CONFIG.templateConfig.update(updates);
      if (!updatedConfig) {
        return apiResponseLogger(500, "Failed to update templates.");
      }
      return apiResponseLogger(200, "Templates updated successfully.");
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
