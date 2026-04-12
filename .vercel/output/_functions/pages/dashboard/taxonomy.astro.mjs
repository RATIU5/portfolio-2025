/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$TaxonomyLayout } from '../../chunks/TaxonomyLayout_N_YlYET6.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { defaultLang: lang } = Astro2.locals.StudioCMS;
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-index");
  return renderTemplate`${renderComponent($$result, "TaxonomyLayout", $$TaxonomyLayout, { "type": "index", "data-astro-cid-aciskrey": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="placeholder-info" class="placeholder-info" data-astro-cid-aciskrey> <p data-astro-cid-aciskrey> ${renderComponent($$result2, "t-taxonomy", "t-taxonomy", { "key": "placeholder", "data-astro-cid-aciskrey": true }, { "default": () => renderTemplate`${t("placeholder")}` })} </p> </div> ` })} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/index.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/index.astro";
const $$url = "/[dashboard]/taxonomy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
