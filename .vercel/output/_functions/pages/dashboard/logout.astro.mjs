/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, b as addAttribute, d as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button } from '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$AuthLayout } from '../../chunks/AuthLayout_BStMwEya.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/auth:logout");
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": t("title"), "description": t("description"), "lang": lang, "disableScreen": true, "data-astro-cid-ml3wyzcb": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div data-astro-cid-ml3wyzcb> ${renderComponent($$result2, "Button", $$Button, { "id": "cancel-logout", "variant": "solid", "color": "danger", "size": "lg", "data-astro-cid-ml3wyzcb": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "t-logout", "t-logout", { "key": "cancel-button-label", "data-astro-cid-ml3wyzcb": true }, { "default": () => renderTemplate`${t("cancel-button-label")}` })}` })} </div> `, "header": ($$result2) => renderTemplate`<div data-astro-cid-ml3wyzcb> <div class="header-container" data-astro-cid-ml3wyzcb> <h1 data-astro-cid-ml3wyzcb>${renderComponent($$result2, "t-logout", "t-logout", { "key": "header", "data-astro-cid-ml3wyzcb": true }, { "default": () => renderTemplate`${t("header")}` })}</h1> <p data-astro-cid-ml3wyzcb>${renderComponent($$result2, "t-logout", "t-logout", { "key": "sub-header", "data-astro-cid-ml3wyzcb": true }, { "default": () => renderTemplate`${t("sub-header")}` })}</p> </div> <div class="countdown-container" data-astro-cid-ml3wyzcb><span id="countdown" data-astro-cid-ml3wyzcb>5</span></div> </div>` })}  ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/logout.astro?astro&type=script&index=0&lang.ts")} <div style="display: none;" id="routes"${addAttribute(Astro2.locals.StudioCMS.routeMap.authLinks.logoutAPI, "data-redirect")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.dashboardIndex, "data-dashboard")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.baseSiteURL, "data-site-index")} data-astro-cid-ml3wyzcb></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/logout.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/logout.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/logout.astro";
const $$url = "/[dashboard]/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
