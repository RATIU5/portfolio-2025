/* empty css                                         */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D64VbtqW.mjs';
import { c as config } from '../chunks/consts_CvAQFK6n.mjs';
/* empty css                                            */
import { u as useTranslations } from '../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button } from '../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_BmXXNyyD.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const lang = config.locale.i18n.defaultLocale;
  const t = useTranslations(lang, "@studiocms/dashboard:404");
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "sidebar": false, "requiredPermission": "none", "config": { data: { title: t("title"), description: t("description") }, id: "" }, "currentUser": null, "lang": lang }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="notfound-container"> <div class="notfound"> <svg viewBox="0 0 755 792" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="305" y="10" width="440" height="446" rx="22" stroke="currentColor" stroke-width="20"></rect> <path d="M262 176V434C262 470.451 291.549 500 328 500H599.5V597C599.5 609.15 589.65 619 577.5 619H180C167.85 619 158 609.15 158 597V198C158 185.85 167.85 176 180 176H262Z" stroke="currentColor" stroke-width="20"></path> <path d="M114 339V597C114 633.451 143.549 663 180 663H451.5V760C451.5 772.15 441.65 782 429.5 782H32C19.8497 782 10 772.15 10 760V361C10 348.85 19.8497 339 32 339H114Z" stroke="currentColor" stroke-width="20"></path> </svg> <h1>${renderComponent($$result2, "t-four", "t-four", { "key": "title" }, { "default": () => renderTemplate`${t("title")}` })}</h1> <h2>${renderComponent($$result2, "t-four", "t-four", { "key": "description" }, { "default": () => renderTemplate`${t("description")}` })}</h2> <p>${renderComponent($$result2, "t-four", "t-four", { "key": "sub-description" }, { "default": () => renderTemplate`${t("sub-description")}` })}</p> ${renderComponent($$result2, "Button", $$Button, { "id": "back-button", "variant": "outlined", "color": "primary", "class": "return", "fullWidth": true }, { "default": ($$result3) => renderTemplate` <span>${renderComponent($$result3, "t-four", "t-four", { "key": "back-button" }, { "default": () => renderTemplate`${t("back-button")}` })}</span> ` })} </div> </div> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/404.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/404.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/404.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
