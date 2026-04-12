import { Effect, Schema } from 'effect';
import { a as createRestRouter } from '../../../../../../chunks/rest-router_nRSMzoTu.mjs';
import { a as SDKCore } from '../../../../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../../../../chunks/response-helpers_CuTopjH7.mjs';
import { g as genLogger } from '../../../../../../chunks/logger_bcCLNlRx.mjs';
import { a as apiResponseLogger } from '../../../../../../chunks/_studiocms_logger_DedMAODS.mjs';
export { renderers } from '../../../../../../renderers.mjs';

const categoriesRouter = {
  __idType: "number",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studiocms:rest:v1:public:categories:GET")(function* () {
        const sdk = yield* SDKCore;
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
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: () => genLogger(`studiocms:rest:v1:public:categories:${id}:GET`)(function* () {
        const sdk = yield* SDKCore;
        const category = yield* sdk.GET.categories.byId(id);
        if (!category) {
          return createJsonResponse({ error: "Category not found" }, { status: 404 });
        }
        return createJsonResponse(category);
      }),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  )
};

const foldersRouter = {
  __idType: "string",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:public:folders:GET")(function* () {
        const sdk = yield* SDKCore;
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
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: () => genLogger("studioCMS:rest:v1:public:folders:[id]:GET")(function* () {
        const sdk = yield* SDKCore;
        if (!id) {
          return apiResponseLogger(400, "Invalid folder ID");
        }
        const folder = yield* sdk.GET.folder(id);
        if (!folder) {
          return apiResponseLogger(404, "Folder not found");
        }
        return createJsonResponse(folder);
      }),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  )
};

const pagesRouter = {
  __idType: "string",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studioCMS:rest:v1:public:pages:GET")(function* () {
        const sdk = yield* SDKCore;
        const pages = yield* sdk.GET.pages();
        const searchParams = ctx.url.searchParams;
        const titleFilter = searchParams.get("title");
        const slugFilter = searchParams.get("slug");
        const authorFilter = searchParams.get("author");
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
        if (parentFolderFilter) {
          filteredPages = filteredPages.filter(
            (page) => page.parentFolder === parentFolderFilter
          );
        }
        return createJsonResponse(filteredPages);
      }),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse(
          { error: "Internal Server Error" },
          { status: 500, statusText: "Internal Server Error" }
        );
      }
    }
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: () => genLogger("studioCMS:rest:v1:public:pages:[id]:GET")(function* () {
        const sdk = yield* SDKCore;
        if (!id) {
          return apiResponseLogger(400, "Invalid page ID");
        }
        const page = yield* sdk.GET.page.byId(id);
        if (!page) {
          return apiResponseLogger(404, "Page not found");
        }
        if (page.draft) {
          return apiResponseLogger(404, "Page not found");
        }
        return createJsonResponse(page);
      }),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse(
          { error: "Internal Server Error" },
          { status: 500, statusText: "Internal Server Error" }
        );
      }
    }
  )
};

const tagsRouter = {
  __idType: "number",
  __index: createEffectAPIRoutes(
    {
      GET: (ctx) => genLogger("studiocms:rest:v1:public:tags:GET")(function* () {
        const sdk = yield* SDKCore;
        const searchParams = ctx.url.searchParams;
        const folderNameFilter = searchParams.get("name");
        let tags = yield* sdk.GET.tags.getAll();
        if (folderNameFilter) {
          tags = tags.filter((tag) => tag.name.includes(folderNameFilter));
        }
        return createJsonResponse(tags);
      }),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  ),
  id: (id) => createEffectAPIRoutes(
    {
      GET: () => genLogger(`studiocms:rest:v1:public:tags:${id}:GET`)(function* () {
        const sdk = yield* SDKCore;
        const tag = yield* sdk.GET.tags.byId(id);
        if (!tag) {
          return createJsonResponse({ error: "Tag not found" }, { status: 404 });
        }
        return createJsonResponse(tag);
      }),
      OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["GET"] })),
      ALL: () => Effect.try(() => AllResponse())
    },
    {
      cors: { methods: ["GET", "OPTIONS"] },
      onError: (error) => {
        console.error("API Error:", error);
        return createJsonResponse({ error: "Something went wrong" }, { status: 500 });
      }
    }
  )
};

const registry = {
  categories: categoriesRouter,
  tags: tagsRouter,
  folders: foldersRouter,
  pages: pagesRouter
};
const ALL = createRestRouter(
  "studiocms:rest:v1:public",
  Schema.Literal("categories", "tags", "folders", "pages"),
  registry
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
