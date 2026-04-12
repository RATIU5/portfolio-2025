/* empty css                                               */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../../chunks/Divider_D5DMoGSW.mjs';
import '../../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$Input } from '../../../chunks/Input_mJ0hT4yn.mjs';
import { $ as $$MetaContainer } from '../../../chunks/MetaContainer_CfCNCXTh.mjs';
import { $ as $$TaxonomyLayout } from '../../../chunks/TaxonomyLayout_N_YlYET6.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Tags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tags;
  const { defaultLang: lang } = Astro2.locals.StudioCMS;
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-index");
  return renderTemplate`${renderComponent($$result, "TaxonomyLayout", $$TaxonomyLayout, { "type": "tags", "data-astro-cid-sktclgvb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="tag-form"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.taxonomy, "action")} method="post" data-astro-cid-sktclgvb> <input type="hidden" name="mode" value="create" data-astro-cid-sktclgvb> <input type="hidden" name="id" value="" data-astro-cid-sktclgvb> <div class="form-row" data-astro-cid-sktclgvb> ${renderComponent($$result2, "Input", $$Input, { "id": "name", "name": "name", "label": t("label-name"), "isRequired": true, "data-astro-cid-sktclgvb": true })} ${renderComponent($$result2, "Input", $$Input, { "id": "slug", "name": "slug", "label": t("label-slug"), "isRequired": true, "data-astro-cid-sktclgvb": true })} </div> ${renderComponent($$result2, "Input", $$Input, { "id": "description", "name": "description", "label": t("label-description"), "data-astro-cid-sktclgvb": true })} ${renderComponent($$result2, "MetaContainer", $$MetaContainer, { "name": "meta", "data-astro-cid-sktclgvb": true }, { "alert-message-duplicate-keys": async ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "alert-message-duplicate-keys" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "t-taxonomy", "t-taxonomy", { "key": "meta-alert-message-duplicate-keys", "data-astro-cid-sktclgvb": true }, { "default": () => renderTemplate` ${t("meta-alert-message-duplicate-keys")} ` })} ` })}`, "alert-message-keys-empty": async ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "alert-message-keys-empty" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "t-taxonomy", "t-taxonomy", { "key": "meta-alert-message-keys-empty", "data-astro-cid-sktclgvb": true }, { "default": () => renderTemplate` ${t("meta-alert-message-keys-empty")} ` })} ` })}`, "key-label": async ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "key-label" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "t-taxonomy", "t-taxonomy", { "key": "label-meta-key", "data-astro-cid-sktclgvb": true }, { "default": () => renderTemplate` ${t("label-meta-key")} ` })} ` })}`, "title": async ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "t-taxonomy", "t-taxonomy", { "key": "label-meta", "data-astro-cid-sktclgvb": true }, { "default": () => renderTemplate` ${t("label-meta")} ` })} ` })}`, "value-label": async ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "value-label" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "t-taxonomy", "t-taxonomy", { "key": "label-meta-value", "data-astro-cid-sktclgvb": true }, { "default": () => renderTemplate` ${t("label-meta-value")} ` })} ` })}` })} </form> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/tags.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/tags.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/tags.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/tags.astro";
const $$url = "/[dashboard]/taxonomy/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Tags,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
