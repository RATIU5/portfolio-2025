import { Schema, Effect } from 'effect';
import { i as idOrPathRouter, a as createRestRouter } from '../../../../../chunks/rest-router_nRSMzoTu.mjs';
import { a as apiResponseLogger } from '../../../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore, x as StudioCMSPageDataCategories, b as StudioCMSPageFolderStructure, c as StudioCMSPageData, y as StudioCMSPageDataTags } from '../../../../../chunks/index_DmoCs122.mjs';
import { g as genLogger } from '../../../../../chunks/logger_bcCLNlRx.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../../chunks/response-helpers_CuTopjH7.mjs';
import { p as parseAPIContextJson, r as readAPIContextJson } from '../../../../../chunks/context-utils_B5oaSSnO.mjs';
import { U as User, P as Password } from '../../../../../chunks/core_DE9YiRdf.mjs';
import { U as UserPermissionLevel } from '../../../../../chunks/consts_CvAQFK6n.mjs';
import { h as coerce } from '../../../../../chunks/astro/server_D64VbtqW.mjs';
export { renderers } from '../../../../../renderers.mjs';

const isSchemaAll = (schema) => {
  return schema instanceof Schema.Struct;
};
const buildPartialSchema = (base) => {
  const partialFields = Object.entries(base.fields).reduce(
    (acc, [key, entry]) => {
      if (isSchemaAll(entry)) {
        const safeKey = key;
        acc[safeKey] = Schema.optional(entry);
      }
      return acc;
    },
    {}
  );
  return Schema.Struct(partialFields);
};

const getAuthTokenFromHeader = (context) => genLogger("routes/rest/utils/auth-token/getAuthTokenFromHeader")(function* () {
  const authTokenData = yield* Effect.try(() => context.request.headers.get("Authorization"));
  if (!authTokenData) {
    return null;
  }
  const parts = authTokenData.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return null;
  }
  return parts[1];
});
const verifyAuthTokenFromHeader = (context) => genLogger("routes/rest/utils/auth-token/verifyAuthTokenFromHeader")(function* () {
  const sdk = yield* SDKCore;
  const authToken = yield* getAuthTokenFromHeader(context);
  if (!authToken) {
    return apiResponseLogger(401, "Unauthorized");
  }
  const user = yield* sdk.REST_API.tokens.verify(authToken);
  if (!user) {
    return apiResponseLogger(401, "Unauthorized");
  }
  return user;
});

const PartialCategories = buildPartialSchema(StudioCMSPageDataCategories.Select);
const categoriesRouter = {
  __idType: "number",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studiocms:rest:v1:categories:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const searchParams = ctx.url.searchParams;
        const folderNameFilter = searchParams.get("name");
        const folderParentFilter = searchParams.get("parent");
        let categories = yield* sdk.GET.categories.getAll();
        if (folderNameFilter) {
          categories = categories.filter((category) => category.name.includes(folderNameFilter));
        }
        if (folderParentFilter) {
          categories = categories.filter(
            (category) => category.parent === Number.parseInt(folderParentFilter, 10)
          );
        }
        return createJsonResponse(categories);
      }),
      POST: (ctx) => genLogger("studiocms:rest:v1:categories:POST")(function* () {
        const [notifier, user, sdk] = yield* Effect.all([
          Notifications,
          verifyAuthTokenFromHeader(ctx),
          SDKCore
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        return yield* parseAPIContextJson(
          ctx,
          StudioCMSPageDataCategories.Insert.omit("id")
        ).pipe(
          Effect.flatMap(
            Effect.fn(function* (data) {
              const id = yield* sdk.UTIL.Generators.generateRandomIDNumber(9);
              return { id, ...data };
            })
          ),
          Effect.flatMap((data) => sdk.POST.databaseEntry.categories(data).pipe(Effect.as(data))),
          Effect.tap((data) => notifier.sendEditorNotification("new_category", data.name)),
          Effect.map(createJsonResponse)
        );
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "POST"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "POST", "OPTIONS"] },
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
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger(`studiocms:rest:v1:categories:${id}:GET`)(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const category = yield* sdk.GET.categories.byId(id);
        if (!category) {
          return apiResponseLogger(404, "Category not found");
        }
        return createJsonResponse(category);
      }),
      PATCH: (ctx) => genLogger(`studiocms:rest:v1:categories:${id}:PATCH`)(function* () {
        const [sdk, user, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          Notifications
        ]);
        const updateCategory = sdk.dbService.withCodec({
          encoder: PartialCategories,
          decoder: StudioCMSPageDataCategories.Select,
          callbackFn: (db, data) => db(
            (client) => client.transaction().execute(async (trx) => {
              await trx.updateTable("StudioCMSPageDataCategories").set(data).where("id", "=", id).executeTakeFirstOrThrow();
              return await trx.selectFrom("StudioCMSPageDataCategories").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
            })
          )
        });
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const jsonData = yield* parseAPIContextJson(ctx, PartialCategories);
        if (jsonData.id) {
          return apiResponseLogger(400, "Cannot update ID field");
        }
        const parentId = jsonData.parent;
        if (parentId && parentId === id) {
          return apiResponseLogger(400, "Category cannot be its own parent");
        }
        return yield* updateCategory(jsonData).pipe(
          Effect.tap((data) => notifier.sendEditorNotification("update_category", data.name)),
          Effect.map(createJsonResponse)
        );
      }).pipe(Notifications.Provide),
      DELETE: (ctx) => genLogger(`studiocms:rest:v1:categories:${id}:DELETE`)(function* () {
        const [sdk, user, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          Notifications
        ]);
        const checkForChildrenCategories = sdk.dbService.withCodec({
          encoder: Schema.Number,
          decoder: Schema.Array(StudioCMSPageDataCategories.Select),
          callbackFn: (client, categoryId) => client(
            (db) => db.selectFrom("StudioCMSPageDataCategories").where("parent", "=", categoryId).selectAll().execute()
          )
        });
        const getPageList = sdk.GET.pages(true, true);
        const flattenAndCount = (arrays) => {
          return arrays.flat().filter((data) => data.id === id).length > 0;
        };
        const checkForChildrenPagesCategories = () => getPageList.pipe(
          Effect.map((data) => data.map(({ categories }) => categories)),
          Effect.map(flattenAndCount)
        );
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const existingCategory = yield* sdk.GET.categories.byId(id);
        if (!existingCategory) {
          return apiResponseLogger(404, "Category not found");
        }
        const hasChildrenCategories = yield* checkForChildrenCategories(id).pipe(
          Effect.map((categories) => categories.length > 0)
        );
        if (hasChildrenCategories) {
          return apiResponseLogger(400, "Cannot delete category with child categories");
        }
        const hasChildrenPages = yield* checkForChildrenPagesCategories();
        if (hasChildrenPages) {
          return apiResponseLogger(400, "Cannot delete category assigned to pages");
        }
        yield* sdk.DELETE.categories(id).pipe(
          Effect.tap(
            () => notifier.sendEditorNotification("delete_category", existingCategory.name)
          )
        );
        return createJsonResponse({ success: true });
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "PATCH", "DELETE"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "PATCH", "DELETE", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Internal Server Error" }, { status: 500 });
      }
    }
  )
};

class FolderBase extends Schema.Class("FolderBase")({
  folderName: Schema.String,
  parentFolder: Schema.Union(Schema.String, Schema.Null)
}) {
}
const foldersRouter = {
  __idType: "string",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:folders:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const folders = yield* sdk.GET.folderList();
        const searchParams = ctx.url.searchParams;
        const folderNameFilter = searchParams.get("name");
        const folderParentFilter = searchParams.get("parent");
        let filteredFolders = folders;
        if (folderNameFilter) {
          filteredFolders = filteredFolders.filter(
            (folder) => folder.name.includes(folderNameFilter)
          );
        }
        if (folderParentFilter) {
          filteredFolders = filteredFolders.filter(
            (folder) => folder.parent === folderParentFilter
          );
        }
        return createJsonResponse(filteredFolders);
      }),
      POST: (ctx) => genLogger("studioCMS:rest:v1:folders:POST")(function* () {
        const [notifier, user, sdk] = yield* Effect.all([
          Notifications,
          verifyAuthTokenFromHeader(ctx),
          SDKCore
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const { folderName, parentFolder } = yield* parseAPIContextJson(ctx, FolderBase);
        const newFolder = yield* sdk.POST.databaseEntry.folder({
          name: folderName,
          parent: parentFolder || null,
          id: crypto.randomUUID()
        });
        yield* Effect.all([
          sdk.UPDATE.folderList,
          sdk.UPDATE.folderTree,
          notifier.sendEditorNotification("new_folder", folderName)
        ]);
        return apiResponseLogger(200, `Folder created successfully with id: ${newFolder.id}`);
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "POST"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "POST", "OPTIONS"] },
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
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:folders:[id]:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const folder = yield* sdk.GET.folder(id);
        if (!folder) {
          return apiResponseLogger(404, "Folder not found");
        }
        return createJsonResponse(folder);
      }),
      PATCH: (ctx) => genLogger("studioCMS:rest:v1:folders:[id]:PATCH")(function* () {
        const [sdk, user, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          Notifications
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const { folderName, parentFolder } = yield* parseAPIContextJson(ctx, FolderBase);
        if (!folderName) {
          return apiResponseLogger(400, "Invalid form data, folderName is required");
        }
        if (parentFolder === id) {
          return apiResponseLogger(400, "A folder cannot be its own parent");
        }
        const folderData = yield* sdk.UPDATE.folder({
          id,
          name: folderName,
          parent: parentFolder || null
        });
        if (!folderData) {
          return apiResponseLogger(404, "Folder not found");
        }
        yield* Effect.all([
          sdk.UPDATE.folderList,
          sdk.UPDATE.folderTree,
          notifier.sendEditorNotification("folder_updated", folderName)
        ]);
        return apiResponseLogger(200, "Folder updated successfully");
      }).pipe(Notifications.Provide),
      DELETE: (ctx) => genLogger("studioCMS:rest:v1:folders:[id]:DELETE")(function* () {
        const [sdk, notifier, user] = yield* Effect.all([
          SDKCore,
          Notifications,
          verifyAuthTokenFromHeader(ctx)
        ]);
        const checkForChildrenFolders = sdk.dbService.withCodec({
          encoder: Schema.String,
          decoder: Schema.Array(StudioCMSPageFolderStructure),
          callbackFn: (client, id2) => client(
            (db) => db.selectFrom("StudioCMSPageFolderStructure").where("parent", "=", id2).selectAll().execute()
          )
        });
        const checkForChildrenPages = sdk.dbService.withCodec({
          encoder: Schema.String,
          decoder: Schema.Array(StudioCMSPageData),
          callbackFn: (client, id2) => client(
            (db) => db.selectFrom("StudioCMSPageData").where("parentFolder", "=", id2).selectAll().execute()
          )
        });
        const checkForChildren = Effect.fn(
          (id2) => Effect.all({
            folders: checkForChildrenFolders(id2),
            pages: checkForChildrenPages(id2)
          }).pipe(
            Effect.map(({ folders, pages }) => {
              return { hasChildren: folders.length > 0 || pages.length > 0 };
            })
          )
        );
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const folder = yield* sdk.GET.folder(id);
        if (!folder) {
          return apiResponseLogger(404, "Folder not found");
        }
        const { hasChildren } = yield* checkForChildren(id);
        if (hasChildren) {
          return apiResponseLogger(
            400,
            "Folder cannot be deleted because it contains subfolders or pages"
          );
        }
        yield* Effect.all([
          sdk.DELETE.folder(id),
          sdk.UPDATE.folderList,
          sdk.UPDATE.folderTree,
          notifier.sendEditorNotification("folder_deleted", folder.name)
        ]);
        return apiResponseLogger(200, "Folder deleted successfully");
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "PATCH", "DELETE"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "PATCH", "DELETE", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Internal Server Error" }, { status: 500 });
      }
    }
  )
};

const subPathRouter = {
  history: (id, _params) => createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:public:pages:[id]:history:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const page = yield* sdk.GET.page.byId(id);
        if (!page) {
          return apiResponseLogger(404, "Page not found");
        }
        const searchParams = ctx.url.searchParams;
        const limitParam = searchParams.get("limit");
        const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : void 0;
        const limit = typeof parsedLimit === "number" && Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : void 0;
        const diffs = limit !== void 0 ? yield* sdk.diffTracking.get.byPageId.latest(id, limit) : yield* sdk.diffTracking.get.byPageId.all(id);
        return createJsonResponse(diffs);
      }),
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
  ),
  "history/[diffId]": (id, params) => createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:pages:[id]:history:[diffid]:GET")(function* () {
        const sdk = yield* SDKCore;
        const user = yield* verifyAuthTokenFromHeader(ctx);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const diffId = params?.diffId;
        if (!id) {
          return apiResponseLogger(400, "Invalid page ID");
        }
        if (!diffId) {
          return apiResponseLogger(400, "Invalid diff ID");
        }
        const diff = yield* sdk.diffTracking.get.single(diffId);
        if (!diff) {
          return apiResponseLogger(404, "Diff not found");
        }
        if (diff.pageId !== id) {
          return apiResponseLogger(404, "Diff not found");
        }
        return createJsonResponse(diff);
      }),
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
  )
};
const pageIdRouter = (id) => createEffectAPIRoutes(
  {
    GET: (ctx) => genLogger("studioCMS:rest:v1:pages:[id]:GET")(function* () {
      const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
      if (user instanceof Response) {
        return user;
      }
      const { rank } = user;
      if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
        return apiResponseLogger(401, "Unauthorized");
      }
      const page = yield* sdk.GET.page.byId(id);
      if (!page) {
        return apiResponseLogger(404, "Page not found");
      }
      return createJsonResponse(page);
    }),
    PATCH: (ctx) => genLogger("studioCMS:rest:v1:pages:[id]:PATCH")(function* () {
      const [sdk, user, notifier] = yield* Effect.all([
        SDKCore,
        verifyAuthTokenFromHeader(ctx),
        Notifications
      ]);
      if (user instanceof Response) {
        return user;
      }
      const { rank, userId } = user;
      if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
        return apiResponseLogger(401, "Unauthorized");
      }
      const jsonData = yield* readAPIContextJson(ctx);
      const { data, content } = jsonData;
      if (!data) {
        return apiResponseLogger(400, "Invalid form data, data is required");
      }
      if (!content) {
        return apiResponseLogger(400, "Invalid form data, content is required");
      }
      if (!data.id) {
        return apiResponseLogger(400, "Invalid form data, id is required");
      }
      if (!content.id) {
        return apiResponseLogger(400, "Invalid form data, id is required");
      }
      if (data.id !== id) {
        return apiResponseLogger(400, "Payload id does not match path id");
      }
      const currentPageData = yield* sdk.GET.page.byId(id);
      if (!currentPageData) {
        return apiResponseLogger(404, "Page not found");
      }
      const { authorId, contributorIds, defaultContent } = currentPageData;
      let AuthorId = authorId;
      if (!authorId) {
        AuthorId = userId;
      }
      const ContributorIds = contributorIds || [];
      if (!ContributorIds.includes(userId)) {
        ContributorIds.push(userId);
      }
      const newData = {
        ...data,
        authorId: AuthorId,
        contributorIds: JSON.stringify(ContributorIds),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        publishedAt: currentPageData.draft && data.draft === false ? (/* @__PURE__ */ new Date()).toISOString() : currentPageData.publishedAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
        categories: JSON.stringify(data.categories || []),
        tags: JSON.stringify(data.tags || []),
        augments: JSON.stringify(data.augments || [])
      };
      const getMetaData = sdk.dbService.withCodec({
        encoder: Schema.String,
        decoder: StudioCMSPageData.Select,
        callbackFn: (query, input) => query(
          (db) => db.selectFrom("StudioCMSPageData").selectAll().where("id", "=", input).executeTakeFirstOrThrow()
        )
      });
      const startMetaData = yield* getMetaData(data.id);
      yield* sdk.UPDATE.page.byId(data.id, {
        pageData: newData,
        pageContent: content
      });
      const updatedMetaData = yield* getMetaData(data.id);
      const siteConfig = yield* sdk.GET.siteConfig();
      if (!siteConfig) {
        return apiResponseLogger(500, "Site configuration not found");
      }
      const { enableDiffs, diffPerPage = 10 } = siteConfig.data;
      if (enableDiffs) {
        yield* sdk.diffTracking.insert(
          userId,
          data.id,
          {
            content: {
              start: defaultContent?.content || "",
              end: content.content || ""
            },
            // biome-ignore lint/style/noNonNullAssertion: This is a valid use case for non-null assertion
            metaData: { start: startMetaData, end: updatedMetaData }
          },
          diffPerPage
        );
      }
      yield* sdk.CLEAR.page.byId(id);
      yield* notifier.sendEditorNotification("page_updated", updatedMetaData.title);
      return apiResponseLogger(200, "Page updated successfully");
    }).pipe(Notifications.Provide),
    DELETE: (ctx) => genLogger("studioCMS:rest:v1:pages:[id]:DELETE")(function* () {
      const [sdk, user, notifier] = yield* Effect.all([
        SDKCore,
        verifyAuthTokenFromHeader(ctx),
        Notifications
      ]);
      if (user instanceof Response) {
        return user;
      }
      const { rank } = user;
      if (rank !== "owner" && rank !== "admin") {
        return apiResponseLogger(401, "Unauthorized");
      }
      const jsonData = yield* readAPIContextJson(ctx);
      const { slug } = jsonData;
      if (!slug) {
        return apiResponseLogger(400, "Invalid request");
      }
      const page = yield* sdk.GET.page.byId(id);
      if (!page) {
        return apiResponseLogger(404, "Page not found");
      }
      yield* sdk.DELETE.page(id);
      yield* sdk.CLEAR.page.byId(id);
      yield* notifier.sendEditorNotification("page_deleted", page.title);
      return apiResponseLogger(200, "Page deleted successfully");
    }).pipe(Notifications.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "PATCH", "DELETE"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["GET", "PATCH", "DELETE", "OPTIONS"] },
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
const pagesRouter = {
  __idType: "string",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:public:pages:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const pages = yield* sdk.GET.pages(true);
        const searchParams = ctx.url.searchParams;
        const titleFilter = searchParams.get("title");
        const slugFilter = searchParams.get("slug");
        const authorFilter = searchParams.get("author");
        const draftFilter = searchParams.get("draft") === "true";
        const publishedFilter = searchParams.get("published") === "true";
        const parentFolderFilter = searchParams.get("parentFolder");
        let filteredPages = pages;
        if (titleFilter) {
          filteredPages = filteredPages.filter((page) => page.title.includes(titleFilter));
        }
        if (slugFilter) {
          filteredPages = filteredPages.filter((page) => page.slug.includes(slugFilter));
        }
        if (authorFilter) {
          filteredPages = filteredPages.filter((page) => page.authorId === authorFilter);
        }
        if (draftFilter) {
          filteredPages = filteredPages.filter((page) => page.draft === draftFilter);
        }
        if (publishedFilter) {
          filteredPages = filteredPages.filter((page) => !page.draft);
        }
        if (parentFolderFilter) {
          filteredPages = filteredPages.filter(
            (page) => page.parentFolder === parentFolderFilter
          );
        }
        return createJsonResponse(filteredPages);
      }),
      POST: (ctx) => genLogger("studioCMS:rest:v1:public:pages:POST")(function* () {
        const [sdk, user, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          Notifications
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank, userId } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const jsonData = yield* readAPIContextJson(ctx);
        const { data, content } = jsonData;
        if (!data) {
          return apiResponseLogger(400, "Invalid form data, data is required");
        }
        if (!content) {
          return apiResponseLogger(400, "Invalid form data, content is required");
        }
        if (!data.title) {
          return apiResponseLogger(400, "Invalid form data, title is required");
        }
        const dataId = crypto.randomUUID();
        const {
          title,
          slug,
          description,
          categories,
          tags,
          contributorIds,
          augments,
          id: ___id,
          authorId: __authorId,
          updatedAt: __updatedAt,
          publishedAt: __publishedAt,
          ...restPageData
        } = data;
        const { id: ____id, ...contentData } = content;
        yield* sdk.POST.databaseEntry.pages(
          {
            id: dataId,
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""),
            // Remove leading/trailing hyphens '-'),
            description: description || "",
            authorId: userId,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
            categories: JSON.stringify(categories || []),
            tags: JSON.stringify(tags || []),
            contributorIds: JSON.stringify(contributorIds || []),
            augments: JSON.stringify(augments || []),
            ...restPageData
          },
          { ...contentData }
        );
        yield* notifier.sendEditorNotification("new_page", data.title);
        return apiResponseLogger(200, `Page created successfully with id: ${dataId}`);
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "POST"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "POST", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  ),
  id: (id) => idOrPathRouter(id, pageIdRouter, subPathRouter)
};

const settingsRouter = {
  __idType: "string",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:settings:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const siteConfig = yield* sdk.GET.siteConfig();
        return createJsonResponse(siteConfig);
      }),
      PATCH: (ctx) => genLogger("studioCMS:rest:v1:settings:PATCH")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const siteConfig = yield* readAPIContextJson(ctx);
        if (typeof siteConfig.title !== "string" || siteConfig.title.trim() === "") {
          return apiResponseLogger(400, "Invalid form data, title is required");
        }
        if (typeof siteConfig.description !== "string" || siteConfig.description.trim() === "") {
          return apiResponseLogger(400, "Invalid form data, description is required");
        }
        if (typeof siteConfig.loginPageBackground !== "string" || siteConfig.loginPageBackground.trim() === "") {
          return apiResponseLogger(400, "Invalid form data, loginPageBackground is required");
        }
        if (siteConfig.loginPageBackground === "custom" && (typeof siteConfig.loginPageCustomImage !== "string" || siteConfig.loginPageCustomImage.trim() === "")) {
          return apiResponseLogger(400, "Invalid form data, loginPageCustomImage is required");
        }
        yield* sdk.UPDATE.siteConfig(siteConfig);
        return apiResponseLogger(200, "Site config updated");
      }),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "PATCH"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "PATCH", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        if (error instanceof SyntaxError) {
          return createJsonResponse({ error: "Invalid JSON" }, { status: 400 });
        }
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  )
};

const PartialTags = buildPartialSchema(StudioCMSPageDataTags.Select);
const tagsRouter = {
  __idType: "number",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studiocms:rest:v1:tags:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const searchParams = ctx.url.searchParams;
        const folderNameFilter = searchParams.get("name");
        let tags = yield* sdk.GET.tags.getAll();
        if (folderNameFilter) {
          tags = tags.filter((tag) => tag.name.includes(folderNameFilter));
        }
        return createJsonResponse(tags);
      }),
      POST: (ctx) => genLogger("studiocms:rest:v1:tags:POST")(function* () {
        const [notifier, user, sdk] = yield* Effect.all([
          Notifications,
          verifyAuthTokenFromHeader(ctx),
          SDKCore
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        return yield* parseAPIContextJson(ctx, StudioCMSPageDataTags.Insert.omit("id")).pipe(
          Effect.flatMap(
            Effect.fn(function* (data) {
              const id = yield* sdk.UTIL.Generators.generateRandomIDNumber(9);
              return { id, ...data };
            })
          ),
          Effect.flatMap((data) => sdk.POST.databaseEntry.tags(data).pipe(Effect.as(data))),
          Effect.tap((data) => notifier.sendEditorNotification("new_tag", data.name)),
          Effect.map(createJsonResponse)
        );
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "POST"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "POST", "OPTIONS"] },
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
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger(`studiocms:rest:v1:tags:${id}:GET`)(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const tag = yield* sdk.GET.tags.byId(id);
        if (!tag) {
          return apiResponseLogger(404, "Tag not found");
        }
        return createJsonResponse(tag);
      }),
      PATCH: (ctx) => genLogger(`studiocms:rest:v1:tags:${id}:PATCH`)(function* () {
        const [sdk, user, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          Notifications
        ]);
        const updateTag = sdk.dbService.withCodec({
          encoder: PartialTags,
          decoder: StudioCMSPageDataTags.Select,
          callbackFn: (db, data) => db(
            (client) => client.transaction().execute(async (trx) => {
              await trx.updateTable("StudioCMSPageDataTags").set(data).where("id", "=", id).executeTakeFirstOrThrow();
              return await trx.selectFrom("StudioCMSPageDataTags").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
            })
          )
        });
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const jsonData = yield* parseAPIContextJson(ctx, PartialTags);
        if (jsonData.id) {
          return apiResponseLogger(400, "Cannot update ID field");
        }
        return yield* updateTag(jsonData).pipe(
          Effect.tap((data) => notifier.sendEditorNotification("update_tag", data.name)),
          Effect.map(createJsonResponse)
        );
      }).pipe(Notifications.Provide),
      DELETE: (ctx) => genLogger(`studiocms:rest:v1:tags:${id}:DELETE`)(function* () {
        const [sdk, user, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          Notifications
        ]);
        const getPageList = sdk.GET.pages(true, true);
        const flattenAndCount = (arrays) => {
          return arrays.flat().filter((data) => data.id === id).length > 0;
        };
        const checkForChildrenPagesTags = () => getPageList.pipe(
          Effect.map((data) => data.map(({ tags }) => tags)),
          Effect.map(flattenAndCount)
        );
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin" && rank !== "editor") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const existingTag = yield* sdk.GET.tags.byId(id);
        if (!existingTag) {
          return apiResponseLogger(404, "Tag not found");
        }
        const hasChildrenPages = yield* checkForChildrenPagesTags();
        if (hasChildrenPages) {
          return apiResponseLogger(400, "Cannot delete tag assigned to pages");
        }
        yield* sdk.DELETE.tags(id).pipe(
          Effect.tap(() => notifier.sendEditorNotification("delete_tag", existingTag.name))
        );
        return createJsonResponse({ success: true });
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "PATCH", "DELETE"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "PATCH", "DELETE", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Internal Server Error" }, { status: 500 });
      }
    }
  )
};

class IndexJSONData extends Schema.Class("IndexJSONData")({
  username: Schema.Union(Schema.String, Schema.Undefined),
  password: Schema.Union(Schema.String, Schema.Undefined),
  email: Schema.Union(Schema.String, Schema.Undefined),
  displayname: Schema.Union(Schema.String, Schema.Undefined),
  rank: Schema.Union(
    Schema.Literal("owner"),
    Schema.Literal("admin"),
    Schema.Literal("editor"),
    Schema.Literal("visitor"),
    Schema.Undefined
  )
}) {
}
class IdJSONData extends Schema.Class("IdJSONData")({
  rank: Schema.Union(
    Schema.Literal("owner"),
    Schema.Literal("admin"),
    Schema.Literal("editor"),
    Schema.Literal("visitor"),
    Schema.Literal("unknown")
  )
}) {
}
const usersRouter = {
  __idType: "string",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:users:GET")(function* () {
        const [sdk, user] = yield* Effect.all([SDKCore, verifyAuthTokenFromHeader(ctx)]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const users = yield* sdk.GET.users.all();
        let data = users.map(
          ({
            avatar,
            createdAt,
            email,
            id,
            name,
            permissionsData,
            updatedAt,
            url,
            username
          }) => ({
            avatar,
            createdAt,
            email,
            id,
            name,
            rank: permissionsData?.rank ?? "unknown",
            updatedAt,
            url,
            username
          })
        );
        if (rank !== "owner") {
          data = data.filter((user2) => user2.rank !== "owner");
        }
        const searchParams = ctx.url.searchParams;
        const rankFilter = searchParams.get("rank");
        const usernameFilter = searchParams.get("username");
        const nameFilter = searchParams.get("name");
        const usernameFilterLower = usernameFilter?.toLowerCase();
        const nameFilterLower = nameFilter?.toLowerCase();
        let filteredData = data;
        if (rankFilter) {
          filteredData = filteredData.filter((u) => u.rank === rankFilter);
        }
        if (usernameFilterLower) {
          filteredData = filteredData.filter(
            (u) => (u.username ?? "").toLowerCase().includes(usernameFilterLower)
          );
        }
        if (nameFilterLower) {
          filteredData = filteredData.filter(
            (u) => (u.name ?? "").toLowerCase().includes(nameFilterLower)
          );
        }
        return createJsonResponse(filteredData);
      }),
      POST: (ctx) => genLogger("studioCMS:rest:v1:users:POST")(function* () {
        const [sdk, user, userUtils, passwordUtils, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          User,
          Password,
          Notifications
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin") {
          return apiResponseLogger(401, "Unauthorized");
        }
        let {
          username,
          password,
          email,
          displayname,
          rank: newUserRank
        } = yield* parseAPIContextJson(ctx, IndexJSONData);
        if (!username) {
          return apiResponseLogger(400, "Missing field: Username is required");
        }
        if (newUserRank === "owner" && rank !== "owner") {
          return apiResponseLogger(401, "Unauthorized");
        }
        if (!password) {
          password = yield* sdk.UTIL.Generators.generateRandomPassword(12);
        }
        if (!email) {
          return apiResponseLogger(400, "Missing field: Email is required");
        }
        if (!displayname) {
          return apiResponseLogger(400, "Missing field: Display name is required");
        }
        if (!newUserRank) {
          return apiResponseLogger(400, "Missing field: Rank is required");
        }
        if (rank === "admin" && newUserRank === "owner") {
          return apiResponseLogger(
            403,
            "Forbidden: insufficient permission to assign owner rank"
          );
        }
        const checkEmail = coerce.string().email({ message: "Email address is invalid" }).safeParse(email);
        if (!checkEmail.success) {
          return apiResponseLogger(400, `Invalid email: ${checkEmail.error.message}`);
        }
        const [verifyUsernameResponse, verifyPasswordResponse, { usernameSearch, emailSearch }] = yield* Effect.all([
          userUtils.verifyUsernameInput(username),
          passwordUtils.verifyPasswordStrength(password),
          sdk.AUTH.user.searchUsersForUsernameOrEmail(username, checkEmail.data)
        ]);
        if (verifyUsernameResponse !== true) {
          return apiResponseLogger(400, verifyUsernameResponse);
        }
        if (verifyPasswordResponse !== true) {
          return apiResponseLogger(400, verifyPasswordResponse);
        }
        if (usernameSearch.length > 0) {
          return apiResponseLogger(400, "Invalid username: Username is already in use");
        }
        if (emailSearch.length > 0) {
          return apiResponseLogger(400, "Invalid email: Email is already in use");
        }
        const newUser = yield* userUtils.createLocalUser(
          displayname,
          username,
          checkEmail.data,
          password
        );
        const updateRank = yield* sdk.UPDATE.permissions({
          user: newUser.id,
          rank: newUserRank
        });
        yield* notifier.sendAdminNotification("new_user", newUser.username);
        return apiResponseLogger(
          200,
          JSON.stringify({
            username,
            email: checkEmail.data,
            displayname,
            rank: updateRank.rank,
            password
          })
        );
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "POST"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "POST", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:users:[id]:GET")(function* () {
        const [sdk, user, userUtils] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          User
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const existingUser = yield* sdk.GET.users.byId(id);
        if (!existingUser) {
          return apiResponseLogger(404, "User not found");
        }
        const { avatar, createdAt, email, name, permissionsData, updatedAt, url, username } = existingUser;
        const existingUserRank = permissionsData?.rank ?? "visitor";
        const data = {
          avatar,
          createdAt,
          email,
          id,
          name,
          rank: existingUserRank,
          updatedAt,
          url,
          username
        };
        const loggedInUser = yield* sdk.GET.users.byId(user.userId);
        if (!loggedInUser || loggedInUser === void 0) {
          return apiResponseLogger(400, "User Error");
        }
        const permissionLevelInput = {
          isLoggedIn: true,
          user: loggedInUser,
          permissionLevel: loggedInUser.permissionsData?.rank ?? "visitor"
        };
        const userPermissionLevel = yield* userUtils.getUserPermissionLevel(permissionLevelInput);
        const requiredPerms = () => {
          switch (existingUserRank) {
            case "owner":
              return UserPermissionLevel.owner;
            case "admin":
              return UserPermissionLevel.admin;
            case "editor":
              return UserPermissionLevel.editor;
            case "visitor":
              return UserPermissionLevel.visitor;
            default:
              return UserPermissionLevel.unknown;
          }
        };
        const isAllowed = userPermissionLevel > requiredPerms();
        if (!isAllowed) {
          return apiResponseLogger(401, "Unauthorized");
        }
        return createJsonResponse(data);
      }),
      PATCH: (ctx) => genLogger("studioCMS:rest:v1:users:[id]:PATCH")(function* () {
        const [sdk, user, userUtils, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          User,
          Notifications
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin") {
          return apiResponseLogger(401, "Unauthorized");
        }
        const existingUser = yield* sdk.GET.users.byId(id);
        if (!existingUser) {
          return apiResponseLogger(400, "User not found");
        }
        const { permissionsData } = existingUser;
        const existingUserRank = permissionsData?.rank ?? "visitor";
        const loggedInUser = yield* sdk.GET.users.byId(user.userId);
        if (!loggedInUser || loggedInUser === void 0) {
          return apiResponseLogger(400, "User Error");
        }
        const permissionLevelInput = {
          isLoggedIn: true,
          user: loggedInUser,
          permissionLevel: loggedInUser.permissionsData?.rank ?? "visitor"
        };
        const userPermissionLevel = yield* userUtils.getUserPermissionLevel(permissionLevelInput);
        const requiredPerms = () => {
          switch (existingUserRank) {
            case "owner":
              return UserPermissionLevel.owner;
            case "admin":
              return UserPermissionLevel.admin;
            case "editor":
              return UserPermissionLevel.editor;
            case "visitor":
              return UserPermissionLevel.visitor;
            default:
              return UserPermissionLevel.unknown;
          }
        };
        const isAllowed = userPermissionLevel > requiredPerms();
        if (!isAllowed) {
          return apiResponseLogger(401, "Unauthorized");
        }
        const { rank: newRank } = yield* parseAPIContextJson(ctx, IdJSONData);
        if (!newRank) {
          return apiResponseLogger(400, "Missing field: Rank is required");
        }
        const requiredPermsForNewRank = (() => {
          switch (newRank) {
            case "owner":
              return UserPermissionLevel.owner;
            case "admin":
              return UserPermissionLevel.admin;
            case "editor":
              return UserPermissionLevel.editor;
            case "visitor":
              return UserPermissionLevel.visitor;
            default:
              return UserPermissionLevel.unknown;
          }
        })();
        if (userPermissionLevel <= requiredPermsForNewRank) {
          return apiResponseLogger(403, "Forbidden");
        }
        const updateRank = yield* sdk.UPDATE.permissions({
          user: id,
          rank: newRank
        });
        if (!updateRank) {
          return apiResponseLogger(400, "Failed to update rank");
        }
        const updatedUser = yield* sdk.GET.users.byId(id);
        if (!updatedUser) {
          return apiResponseLogger(400, "Failed to get updated user");
        }
        const {
          avatar,
          createdAt,
          email,
          name,
          permissionsData: newPermissionsData,
          updatedAt,
          url,
          username
        } = updatedUser;
        const updatedUserRank = newPermissionsData?.rank ?? "unknown";
        const data = {
          avatar,
          createdAt,
          email,
          id,
          name,
          rank: updatedUserRank,
          updatedAt,
          url,
          username
        };
        yield* notifier.sendUserNotification("account_updated", id);
        yield* notifier.sendAdminNotification("user_updated", username);
        return createJsonResponse(data);
      }).pipe(Notifications.Provide),
      DELETE: (ctx) => genLogger("studioCMS:rest:v1:users:[id]:DELETE")(function* () {
        const [sdk, user, userUtils, notifier] = yield* Effect.all([
          SDKCore,
          verifyAuthTokenFromHeader(ctx),
          User,
          Notifications
        ]);
        if (user instanceof Response) {
          return user;
        }
        const { rank } = user;
        if (rank !== "owner" && rank !== "admin") {
          return apiResponseLogger(401, "Unauthorized");
        }
        if (id === user.userId) {
          return apiResponseLogger(400, "Cannot delete your own account");
        }
        const existingUser = yield* sdk.GET.users.byId(id);
        if (!existingUser) {
          return apiResponseLogger(400, "User not found");
        }
        const { permissionsData } = existingUser;
        const existingUserRank = permissionsData?.rank ?? "visitor";
        const loggedInUser = yield* sdk.GET.users.byId(user.userId);
        if (!loggedInUser || loggedInUser === void 0) {
          return apiResponseLogger(400, "User Error");
        }
        const permissionLevelInput = {
          isLoggedIn: true,
          user: loggedInUser,
          permissionLevel: loggedInUser.permissionsData?.rank ?? "visitor"
        };
        const userPermissionLevel = yield* userUtils.getUserPermissionLevel(permissionLevelInput);
        const requiredPerms = () => {
          switch (existingUserRank) {
            case "owner":
              return UserPermissionLevel.owner;
            case "admin":
              return UserPermissionLevel.admin;
            case "editor":
              return UserPermissionLevel.editor;
            case "visitor":
              return UserPermissionLevel.visitor;
            default:
              return UserPermissionLevel.unknown;
          }
        };
        const isAllowed = userPermissionLevel > requiredPerms();
        if (!isAllowed) {
          return apiResponseLogger(401, "Unauthorized");
        }
        const response = yield* sdk.DELETE.user(id);
        if (!response) {
          return apiResponseLogger(400, "Failed to delete user");
        }
        if (response.status === "error") {
          return apiResponseLogger(400, response.message);
        }
        yield* notifier.sendAdminNotification("user_deleted", existingUser.username);
        return apiResponseLogger(200, response.message);
      }).pipe(Notifications.Provide),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET", "PATCH", "DELETE"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "PATCH", "DELETE", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  )
};

const registry = {
  categories: categoriesRouter,
  folders: foldersRouter,
  pages: pagesRouter,
  settings: settingsRouter,
  tags: tagsRouter,
  users: usersRouter
};
const ALL = createRestRouter(
  "studiocms:rest:v1",
  Schema.Literal("categories", "folders", "pages", "settings", "tags", "users"),
  registry
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
