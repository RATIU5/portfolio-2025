import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, DELETE } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/taxonomy:POST")(function* () {
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
      if (!data.mode || !data.type) {
        return apiResponseLogger(400, "Missing mode or type for taxonomy entry");
      }
      const newId = yield* sdk.UTIL.Generators.generateRandomIDNumber(9);
      switch (data.type) {
        case "tags": {
          const { mode, type: _, ...tagData } = data;
          switch (mode) {
            case "create": {
              const newTag = yield* sdk.POST.databaseEntry.tags({
                ...tagData,
                id: tagData.id && tagData.id > 0 ? tagData.id : newId,
                meta: JSON.stringify(tagData.meta)
              });
              if (!newTag) {
                return apiResponseLogger(500, "Failed to create tag");
              }
              yield* notify.sendEditorNotification("new_tag", tagData.name);
              return apiResponseLogger(200, "Tag created successfully");
            }
            case "edit": {
              const updatedTag = yield* sdk.UPDATE.tags({
                ...tagData,
                meta: JSON.stringify(tagData.meta)
              });
              if (!updatedTag) {
                return apiResponseLogger(500, "Failed to update tag");
              }
              yield* notify.sendEditorNotification("update_tag", tagData.name);
              return apiResponseLogger(200, "Tag updated successfully");
            }
            default:
              return apiResponseLogger(400, "Invalid mode");
          }
        }
        case "categories": {
          const { mode, type: _, ...categoryData } = data;
          switch (mode) {
            case "create": {
              const newCategory = yield* sdk.POST.databaseEntry.categories({
                ...categoryData,
                id: categoryData.id && categoryData.id > 0 ? categoryData.id : newId,
                meta: JSON.stringify(categoryData.meta)
              });
              if (!newCategory) {
                return apiResponseLogger(500, "Failed to create category");
              }
              yield* notify.sendEditorNotification("new_category", categoryData.name);
              return apiResponseLogger(200, "Category created successfully");
            }
            case "edit": {
              if (categoryData.id === categoryData.parent) {
                return apiResponseLogger(400, "Category cannot be its own parent");
              }
              const updatedCategory = yield* sdk.UPDATE.categories({
                ...categoryData,
                meta: JSON.stringify(categoryData.meta)
              });
              if (!updatedCategory) {
                return apiResponseLogger(500, "Failed to update category");
              }
              yield* notify.sendEditorNotification("update_category", categoryData.name);
              return apiResponseLogger(200, "Category updated successfully");
            }
            default:
              return apiResponseLogger(400, "Invalid mode");
          }
        }
        default:
          return apiResponseLogger(400, "Invalid taxonomy type");
      }
    }).pipe(Notifications.Provide),
    DELETE: (ctx) => genLogger("studiocms/routes/api/dashboard/taxonomy:DELETE")(function* () {
      const [sdk, notify] = yield* Effect.all([SDKCore, Notifications]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { id, type } = yield* readAPIContextJson(ctx);
      if (!id || !type) {
        return apiResponseLogger(400, "Missing id or type for deletion");
      }
      switch (type) {
        case "tags": {
          const foundTag = yield* sdk.GET.tags.byId(id);
          if (!foundTag) {
            return apiResponseLogger(404, "Tag not found");
          }
          const deletionSuccess = yield* sdk.DELETE.tags(id);
          if (!deletionSuccess) {
            return apiResponseLogger(500, "Failed to delete tag");
          }
          yield* notify.sendEditorNotification("delete_tag", foundTag.name);
          return apiResponseLogger(200, "Tag deleted successfully");
        }
        case "categories": {
          const allCategories = yield* sdk.GET.categories.getAll();
          const isParentCategory = allCategories.some((category) => category.parent === id);
          if (isParentCategory) {
            return apiResponseLogger(400, "Cannot delete category with child categories");
          }
          const foundCategory = allCategories.find((category) => category.id === id);
          if (!foundCategory) {
            return apiResponseLogger(404, "Category not found");
          }
          const deletionSuccess = yield* sdk.DELETE.categories(id);
          if (!deletionSuccess) {
            return apiResponseLogger(500, "Failed to delete category");
          }
          yield* notify.sendEditorNotification("delete_category", foundCategory.name);
          return apiResponseLogger(200, "Category deleted successfully");
        }
        default:
          return apiResponseLogger(400, "Invalid taxonomy type");
      }
    }).pipe(Notifications.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST", "DELETE"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "DELETE", "OPTIONS"] },
    onError: (error) => {
      console.error("Error in taxonomy API route:", error);
      return createJsonResponse({ error: "Internal Server Error" }, { status: 500 });
    }
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
