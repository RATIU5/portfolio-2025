import { a as apiResponseLogger } from '../../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/content/diff.POST")(function* () {
      const [notify, sdk] = yield* Effect.all([Notifications, SDKCore]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isEditor;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const jsonData = yield* readAPIContextJson(ctx);
      const { id, type } = jsonData;
      if (!id || !type) {
        return apiResponseLogger(400, "Invalid ID or Type");
      }
      if (!["data", "content", "both"].includes(type)) {
        return apiResponseLogger(400, "Invalid Type");
      }
      const data = yield* sdk.diffTracking.revertToDiff(id, type);
      yield* Effect.all([
        sdk.CLEAR.pages,
        notify.sendEditorNotification("page_updated", data.pageMetaData.end.title || "")
      ]);
      return apiResponseLogger(200, "Page Reverted successfully");
    }).pipe(Notifications.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "OPTIONS"] },
    onError: (error) => {
      console.error("Error in diff API:", error);
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
