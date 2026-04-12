/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, b as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button } from '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$Input } from '../../chunks/Input_mJ0hT4yn.mjs';
import { s as showOAuth, p as providerData } from '../../chunks/oAuthButtonProviders_DW1P4kMf.mjs';
import { $ as $$AuthLayout } from '../../chunks/AuthLayout_BStMwEya.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Signup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signup;
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/auth:signup");
  const SHOW_OAUTH = showOAuth && providerData.some(({ enabled }) => enabled);
  let paragraph;
  if (SHOW_OAUTH) {
    paragraph = "sub-header-usernamepasswordoauth";
  } else if (!SHOW_OAUTH) {
    paragraph = "sub-header-usernamepassword";
  } else {
    paragraph = "sub-header-noprovider";
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": t("title"), "description": t("description"), "lang": lang, "checkLogin": true }, { "default": ($$result2) => renderTemplate`  ${renderTemplate`${maybeRenderHead()}<form class="form" id="sign-up-form" method="post"${addAttribute(Astro2.locals.StudioCMS.routeMap.authLinks.registerAPI, "action")}> ${renderComponent($$result2, "Input", $$Input, { "label": t("username-label"), "name": "username", "type": "text" })} ${renderComponent($$result2, "Input", $$Input, { "label": t("email-label"), "name": "email", "type": "email" })} ${renderComponent($$result2, "Input", $$Input, { "label": t("displayname-label"), "name": "displayname", "type": "text" })} ${renderComponent($$result2, "Input", $$Input, { "label": t("password-label"), "name": "password", "type": "password" })} ${renderComponent($$result2, "Input", $$Input, { "label": t("confirm-password-label"), "name": "confirm-password", "type": "password" })} ${renderComponent($$result2, "Button", $$Button, { "fullWidth": true, "type": "submit", "as": "button", "type": "submit", "color": "primary", "variant": "solid" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "t-signup", "t-signup", { "key": "create-account-button" }, { "default": () => renderTemplate`${t("create-account-button")}` })} ` })} </form>`}`, "footer": ($$result2) => renderTemplate`${renderTemplate`<p> ${renderComponent($$result2, "t-signup", "t-signup", { "key": "allow-login-haveaccount" }, { "default": () => renderTemplate` ${t("allow-login-haveaccount")} ` })} <a${addAttribute(Astro2.locals.StudioCMS.routeMap.authLinks.loginURL, "href")}> ${renderComponent($$result2, "t-signup", "t-signup", { "key": "allow-login-login" }, { "default": () => renderTemplate` ${t("allow-login-login")} ` })} </a> </p>`}`, "header": ($$result2) => renderTemplate`<div class="form-header"> <h1> ${renderComponent($$result2, "t-signup", "t-signup", { "key": "header" }, { "default": () => renderTemplate`${t("header")}` })} </h1> <p> ${renderComponent($$result2, "t-signup", "t-signup", { "key": paragraph }, { "default": () => renderTemplate`${t(paragraph)}` })} </p> </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/signup.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/signup.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/signup.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/signup.astro";
const $$url = "/[dashboard]/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Signup,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
