import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { t as tagsToTaxonomyNodes, c as categoriesToTaxonomyNodes } from '../../../chunks/shared_M7agDqrl.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
export { renderers } from '../../../renderers.mjs';

const { GET, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    GET: () => genLogger("studiocms/routes/api/dashboard/search-list.GET")(function* () {
      const sdk = yield* SDKCore;
      return yield* Effect.all([sdk.GET.categories.getAll(), sdk.GET.tags.getAll()]).pipe(
        Effect.map(([categories, tags]) => ({
          categories: categoriesToTaxonomyNodes(categories),
          tags: tagsToTaxonomyNodes(tags)
        })),
        Effect.map(({ categories, tags }) => {
          return [...categories, ...tags];
        }),
        Effect.map(createJsonResponse)
      );
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
	GET,
	OPTIONS
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
