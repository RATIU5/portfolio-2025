import { a as apiResponseLogger } from '../../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../../chunks/index_3ryTCcQ9.mjs';
import { p as pluginsList } from '../../../../chunks/_studiocms_plugins_BDmfe-c6.mjs';
import { a as apiEndpoints } from '../../../../chunks/endpoints_CSi6Ih3c.mjs';
import { a as SDKCore, c as StudioCMSPageData } from '../../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect, Schema } from 'effect';
import { g as genLogger } from '../../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../../renderers.mjs';

const pageTypeOptions = pluginsList.flatMap(({ pageTypes }) => {
  const pageTypeOutput = [];
  if (!pageTypes) return pageTypeOutput;
  for (const pageType of pageTypes) {
    pageTypeOutput.push({
      ...pageType,
      apiEndpoints: apiEndpoints.find((endpoint) => endpoint.identifier === pageType.identifier)
    });
  }
  return pageTypeOutput;
});
function getPageTypeEndpoints(pkg, type) {
  const currentPageType = pageTypeOptions.find((pageType) => pageType.identifier === pkg);
  if (!currentPageType) return void 0;
  return currentPageType.apiEndpoints?.[type];
}
const { POST, PATCH, DELETE, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/content/page.POST")(function* () {
      const [sdk, notify] = yield* Effect.all([SDKCore, Notifications]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isEditor;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const data = yield* readAPIContextJson(ctx);
      ({
        id: crypto.randomUUID()});
      if (!data.title) {
        return apiResponseLogger(400, "Invalid form data, title is required");
      }
      const dataId = crypto.randomUUID();
      const apiRoute = getPageTypeEndpoints(data.package, "onCreate");
      const pageContent = {
        contentLang: "default",
        content: ""
      };
      const {
        title,
        slug,
        description,
        categories,
        tags,
        augments,
        contributorIds,
        updatedAt: ___updatedAt,
        ...rest
      } = data;
      yield* Effect.logInfo("11111");
      const newData = yield* sdk.POST.page({
        pageData: {
          ...rest,
          id: dataId,
          title,
          slug: slug || title.toLowerCase().replace(/\s/g, "-"),
          description: description || "",
          authorId: userData.user?.id || "",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
          categories: JSON.stringify(categories || []),
          tags: JSON.stringify(tags || []),
          augments: JSON.stringify(augments || []),
          contributorIds: JSON.stringify(contributorIds || []),
          contentLang: "default"
        },
        pageContent
      });
      yield* Effect.logInfo("22222");
      if (!newData) {
        return apiResponseLogger(500, "Failed to create page");
      }
      if (apiRoute) {
        yield* Effect.tryPromise(() => apiRoute({ AstroCtx: ctx, pageData: newData }));
      }
      yield* Effect.all([sdk.CLEAR.pages, notify.sendEditorNotification("new_page", data.title)]);
      return apiResponseLogger(200, "Page created successfully");
    }).pipe(Notifications.Provide),
    PATCH: (ctx) => genLogger("studiocms/routes/api/dashboard/content/page.PATCH")(function* () {
      const [sdk, notify] = yield* Effect.all([SDKCore, Notifications]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isEditor;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const combinedData = yield* readAPIContextJson(ctx);
      const { contentId, content: incomingContent, pluginFields, ...data } = combinedData;
      if (!data.id) {
        return apiResponseLogger(400, "Invalid form data, id is required");
      }
      if (!contentId) {
        return apiResponseLogger(400, "Invalid form data, contentId is required");
      }
      const content = {
        id: contentId,
        contentId: data.id,
        content: incomingContent,
        contentLang: "default"
      };
      const currentPageData = yield* sdk.GET.page.byId(data.id);
      if (!currentPageData) {
        return apiResponseLogger(404, "Page not found");
      }
      const { authorId, contributorIds, defaultContent } = currentPageData;
      let AuthorId = authorId;
      if (!authorId) {
        AuthorId = userData.user.id;
      }
      const ContributorIds = contributorIds || [];
      if (!ContributorIds.includes(userData.user.id)) {
        ContributorIds.push(userData.user.id);
      }
      const newData = {
        ...data,
        authorId: AuthorId,
        contributorIds: JSON.stringify(ContributorIds),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        publishedAt: currentPageData.draft && data.draft === false ? (/* @__PURE__ */ new Date()).toISOString() : currentPageData.publishedAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
        categories: JSON.stringify(data.categories || []),
        tags: JSON.stringify(data.tags || []),
        augments: JSON.stringify(data.augments || []),
        contentLang: "default"
      };
      const getMetaData = sdk.dbService.withCodec({
        encoder: Schema.String,
        decoder: StudioCMSPageData.Select,
        callbackFn: (query, input) => query(
          (db) => db.selectFrom("StudioCMSPageData").selectAll().where("id", "=", input).executeTakeFirstOrThrow()
        )
      });
      const startMetaData = yield* getMetaData(data.id);
      const apiRoute = getPageTypeEndpoints(data.package, "onEdit");
      const updatedPage = yield* sdk.UPDATE.page.byId(data.id, {
        pageData: newData,
        pageContent: content
      });
      if (!updatedPage) {
        return apiResponseLogger(500, "Failed to update page");
      }
      const updatedMetaData = yield* getMetaData(data.id);
      const { enableDiffs, diffPerPage = 10 } = ctx.locals.StudioCMS.siteConfig.data;
      if (enableDiffs) {
        yield* sdk.diffTracking.insert(
          // biome-ignore lint/style/noNonNullAssertion: this is a valid use case for non-null assertion
          userData.user.id,
          data.id,
          {
            content: {
              start: defaultContent?.content || "",
              end: content.content || ""
            },
            // biome-ignore lint/style/noNonNullAssertion: this is a valid use case for non-null assertion
            metaData: { start: startMetaData, end: updatedMetaData }
          },
          diffPerPage
        );
      }
      if (apiRoute) {
        yield* Effect.tryPromise(
          () => apiRoute({ AstroCtx: ctx, pageData: updatedPage, pluginFields })
        );
      }
      yield* Effect.all([
        sdk.CLEAR.pages,
        notify.sendEditorNotification("page_updated", data.title || startMetaData?.title || "")
      ]);
      return apiResponseLogger(200, "Page updated successfully");
    }).pipe(Notifications.Provide),
    DELETE: (ctx) => genLogger("studiocms/routes/api/dashboard/content/page.DELETE")(function* () {
      const [sdk, notify] = yield* Effect.all([SDKCore, Notifications]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { id, slug } = yield* readAPIContextJson(ctx);
      const pageToDelete = yield* sdk.GET.page.byId(id);
      if (!pageToDelete) {
        return apiResponseLogger(404, "Page not found");
      }
      if (pageToDelete.slug !== slug) {
        return apiResponseLogger(400, "Invalid request");
      }
      const apiRoute = getPageTypeEndpoints(pageToDelete.package, "onDelete");
      yield* sdk.DELETE.page(id);
      if (apiRoute) {
        yield* Effect.tryPromise(() => apiRoute({ AstroCtx: ctx, pageData: pageToDelete }));
      }
      yield* Effect.all([
        sdk.CLEAR.pages,
        notify.sendEditorNotification("page_deleted", pageToDelete.title)
      ]);
      return apiResponseLogger(200, "Page deleted successfully");
    }).pipe(Notifications.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST", "PATCH", "DELETE"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "PATCH", "DELETE", "OPTIONS"] },
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
	DELETE,
	OPTIONS,
	PATCH,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
