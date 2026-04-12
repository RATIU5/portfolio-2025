/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_D64VbtqW.mjs';
/* empty css                                               */
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button } from '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_BmXXNyyD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$UnverifiedEmail = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UnverifiedEmail;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const t = useTranslations(lang, "@studiocms/dashboard:unverifiedEmail");
  const currentUser = security?.userSessionData ?? null;
  const userId = currentUser?.user?.id;
  if (!userId) {
    return Astro2.redirect(Astro2.locals.StudioCMS.routeMap.authLinks.loginURL);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "sidebar": false, "requiredPermission": "none", "lang": lang, "config": config, "currentUser": currentUser }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="notfound-container"> <div class="notfound"> <svg viewBox="0 0 755 792" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="305" y="10" width="440" height="446" rx="22" stroke="currentColor" stroke-width="20"></rect> <path d="M262 176V434C262 470.451 291.549 500 328 500H599.5V597C599.5 609.15 589.65 619 577.5 619H180C167.85 619 158 609.15 158 597V198C158 185.85 167.85 176 180 176H262Z" stroke="currentColor" stroke-width="20"></path> <path d="M114 339V597C114 633.451 143.549 663 180 663H451.5V760C451.5 772.15 441.65 782 429.5 782H32C19.8497 782 10 772.15 10 760V361C10 348.85 19.8497 339 32 339H114Z" stroke="currentColor" stroke-width="20"></path> </svg> <h1>${renderComponent($$result2, "t-unverified", "t-unverified", { "key": "title" }, { "default": () => renderTemplate`${t("title")}` })}</h1> <h2>${renderComponent($$result2, "t-unverified", "t-unverified", { "key": "description" }, { "default": () => renderTemplate`${t("description")}` })}</h2> <p>${renderComponent($$result2, "t-unverified", "t-unverified", { "key": "sub-description" }, { "default": () => renderTemplate`${t("sub-description")}` })}</p> ${renderComponent($$result2, "Button", $$Button, { "id": "resend-button", "variant": "solid", "color": "primary", "class": "resend", "fullWidth": true }, { "default": async ($$result3) => renderTemplate` <div style="display: none;"${addAttribute(userId, "data-userid")}${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.resendVerificationEmail, "data-url")}></div> <span>${renderComponent($$result3, "t-unverified", "t-unverified", { "key": "resend-button" }, { "default": () => renderTemplate`${t("resend-button")}` })}</span> ` })} <br> ${renderComponent($$result2, "Button", $$Button, { "id": "back-button", "variant": "outlined", "color": "primary", "class": "return", "fullWidth": true }, { "default": async ($$result3) => renderTemplate` <span>${renderComponent($$result3, "t-unverified", "t-unverified", { "key": "back-button" }, { "default": () => renderTemplate`${t("back-button")}` })}</span> ` })} </div> </div> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/unverified-email.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/unverified-email.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/unverified-email.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/unverified-email.astro";
const $$url = "/[dashboard]/unverified-email";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$UnverifiedEmail,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
