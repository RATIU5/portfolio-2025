import { a as apiResponseLogger } from '../../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { p as pluginsList } from '../../../../chunks/_studiocms_plugins_BDmfe-c6.mjs';
import { s as settingsEndpoints } from '../../../../chunks/endpoints_CSi6Ih3c.mjs';
import { S as StudioCMSAPIError } from '../../../../chunks/errors_slyqaxPm.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect, pipe } from 'effect';
import { g as genLogger } from '../../../../chunks/logger_bcCLNlRx.mjs';
export { renderers } from '../../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/plugins/[plugin].POST")(function* () {
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel?.isAdmin === true;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { plugin } = ctx.params;
      const settingsPage = yield* Effect.try({
        try: () => pipe(
          pluginsList.filter(({ settingsPage: settingsPage2 }) => !!settingsPage2),
          (p) => p.find(({ identifier }) => identifier === plugin),
          (p) => {
            if (!p) {
              return apiResponseLogger(404, "Plugin not found");
            }
            const settingsPage2 = settingsEndpoints.find(
              ({ identifier }) => identifier === plugin
            );
            if (!settingsPage2) {
              return apiResponseLogger(404, "Plugin does not have a settings page");
            }
            return settingsPage2;
          }
        ),
        catch: (cause) => new StudioCMSAPIError({
          message: "An error occurred while fetching plugin settings page",
          cause
        })
      });
      if (settingsPage instanceof Response) {
        return settingsPage;
      }
      if (!settingsPage.onSave) {
        return apiResponseLogger(404, "Plugin does not have a settings page");
      }
      return settingsPage.onSave(ctx);
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
