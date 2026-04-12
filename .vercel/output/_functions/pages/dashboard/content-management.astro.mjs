/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$PageHeader, a as $$InnerSidebarElement } from '../../chunks/PageHeader_iKb6IMF-.mjs';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_BmXXNyyD.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:content-index");
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "editor", "sidebar": "double", "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-r4lj6wox": true }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<div id="placeholder-info" class="placeholder-info" data-astro-cid-r4lj6wox> <p data-astro-cid-r4lj6wox> ${renderComponent($$result2, "t-content-index", "t-content-index", { "key": "placeholder", "data-astro-cid-r4lj6wox": true }, { "default": () => renderTemplate`${t("placeholder")}` })} </p> </div> `, "double-sidebar": ($$result2) => renderTemplate`<div class="inner-sidebar-container" data-astro-cid-r4lj6wox> <div class="sidebar-links-container" data-astro-cid-r4lj6wox> ${renderComponent($$result2, "InnerSidebarElement", $$InnerSidebarElement, { "lang": lang, "data-astro-cid-r4lj6wox": true })} </div> </div>`, "header": ($$result2) => renderTemplate`<div data-astro-cid-r4lj6wox> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "lang": lang, "data-astro-cid-r4lj6wox": true })} </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/index.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/index.astro";
const $$url = "/[dashboard]/content-management";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
