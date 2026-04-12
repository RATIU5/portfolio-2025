import { a as apiResponseLogger } from '../../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore, b as StudioCMSPageFolderStructure, c as StudioCMSPageData } from '../../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect, Schema } from 'effect';
import { g as genLogger } from '../../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../../renderers.mjs';

const { POST, PATCH, DELETE, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/content/folder.POST")(function* () {
      const [notify, sdk] = yield* Effect.all([Notifications, SDKCore]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { folderName, parentFolder } = yield* readAPIContextJson(ctx);
      if (!folderName) {
        return apiResponseLogger(400, "Invalid form data, folderName is required");
      }
      yield* Effect.all([
        sdk.POST.folder({
          id: crypto.randomUUID(),
          name: folderName,
          parent: parentFolder || null
        }),
        sdk.UPDATE.folderList,
        sdk.UPDATE.folderTree,
        notify.sendEditorNotification("new_folder", folderName)
      ]);
      return apiResponseLogger(200, "Folder created successfully");
    }).pipe(Notifications.Provide),
    PATCH: (ctx) => genLogger("studiocms/routes/api/dashboard/content/folder.PATCH")(function* () {
      const [notify, sdk] = yield* Effect.all([Notifications, SDKCore]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isEditor;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { id, folderName, parentFolder } = yield* readAPIContextJson(ctx);
      if (!id) {
        return apiResponseLogger(400, "Invalid form data, id is required");
      }
      if (!folderName) {
        return apiResponseLogger(400, "Invalid form data, folderName is required");
      }
      if (parentFolder === id) {
        return apiResponseLogger(400, "A folder cannot be its own parent");
      }
      yield* Effect.all([
        sdk.UPDATE.folder({
          id,
          name: folderName,
          parent: parentFolder || null
        }),
        sdk.UPDATE.folderList,
        sdk.UPDATE.folderTree,
        notify.sendEditorNotification("folder_updated", folderName)
      ]);
      return apiResponseLogger(200, "Folder updated successfully");
    }).pipe(Notifications.Provide),
    DELETE: (ctx) => genLogger("studiocms/routes/api/dashboard/content/folder.DELETE")(function* () {
      const [notify, sdk] = yield* Effect.all([Notifications, SDKCore]);
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
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { id } = yield* readAPIContextJson(ctx);
      if (!id) {
        return apiResponseLogger(400, "Invalid form data, id is required");
      }
      const { name: folderName } = (yield* sdk.GET.folder(id)) || {};
      if (!folderName) {
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
        notify.sendEditorNotification("folder_deleted", folderName)
      ]);
      return apiResponseLogger(200, "Folder deleted successfully");
    }).pipe(Notifications.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST", "PATCH", "DELETE"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "PATCH", "DELETE"] },
    onError: (error) => {
      console.error("Error in folder API:", error);
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
