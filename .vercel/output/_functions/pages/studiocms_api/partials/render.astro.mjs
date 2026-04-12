/* empty css                                               */
import { c as createAstro, a as createComponent, e as renderComponent, F as Fragment, d as renderTemplate, u as unescapeHTML } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { p as parseMarkdown } from '../../../chunks/tinyMDParser_CSO28P3U.mjs';
import { pipe } from 'effect';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const partial = true;
const $$Render = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Render;
  const html = pipe(
    {
      queryParam: Astro2.url.searchParams.get("content"),
      preQuery: Astro2.url.searchParams.get("preload-content"),
      astroJsonData: await (async () => {
        const ct = Astro2.request.headers.get("content-type") ?? "";
        if (!ct.toLowerCase().includes("application/json")) return void 0;
        try {
          return await Astro2.request.json();
        } catch {
          return void 0;
        }
      })()
    },
    (data) => {
      const { queryParam, preQuery, astroJsonData } = data;
      if (astroJsonData && astroJsonData.content !== void 0) {
        return astroJsonData.content;
      }
      if (queryParam && queryParam !== "null") {
        return queryParam;
      }
      if (preQuery && preQuery !== "null") {
        return preQuery;
      }
      return "No content to display";
    },
    (content) => parseMarkdown(content)
  );
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/render.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/render.astro";
const $$url = "/studiocms_api/partials/render";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Render,
	file: $$file,
	partial,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
