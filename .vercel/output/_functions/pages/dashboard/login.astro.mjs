/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, b as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button } from '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import '../../chunks/Card_DjFryfeQ.mjs';
import { $ as $$Modal, a as $$Center } from '../../chunks/Modal_B-agW0rH.mjs';
import { $ as $$Input } from '../../chunks/Input_mJ0hT4yn.mjs';
import { s as showOAuth, p as providerData } from '../../chunks/oAuthButtonProviders_DW1P4kMf.mjs';
import { $ as $$AuthLayout } from '../../chunks/AuthLayout_BStMwEya.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/auth:login");
  let DemoMode = {
    enabled: false
  };
  const SHOW_OAUTH = showOAuth && providerData.some(({ enabled }) => enabled);
  const { siteConfig: config } = Astro2.locals.StudioCMS;
  const { enableMailer } = config.data || {
    enableMailer: false
  };
  let paragraph;
  if (SHOW_OAUTH) {
    paragraph = "sub-header-usernamepasswordoauth";
  } else if (!SHOW_OAUTH) {
    paragraph = "sub-header-usernamepassword";
  } else {
    paragraph = "sub-header-noprovider";
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": t("title"), "description": t("description"), "lang": lang, "checkLogin": true, "data-astro-cid-dx7hw4f5": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Modal", $$Modal, { "id": "forgot-password-modal", "size": "md", "isForm": true, "actionButton": "Submit", "cancelButton": "Cancel", "data-astro-cid-dx7hw4f5": true }, { "default": async ($$result3) => renderTemplate`  ${maybeRenderHead()}<input type="hidden" name="action-url"${addAttribute(Astro2.locals.StudioCMS.routeMap.authLinks.forgotPasswordAPI, "value")} data-astro-cid-dx7hw4f5> <p data-astro-cid-dx7hw4f5> ${renderComponent($$result3, "t-login", "t-login", { "key": "forgot-password-message", "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate`${t("forgot-password-message")}` })} </p> ${renderComponent($$result3, "Input", $$Input, { "label": t("email-label"), "name": "email", "type": "email", "data-astro-cid-dx7hw4f5": true })} `, "header": async ($$result3) => renderTemplate`<h2 data-astro-cid-dx7hw4f5> ${renderComponent($$result3, "t-login", "t-login", { "key": "forgot-password-title", "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate`${t("forgot-password-title")}` })} </h2>` })}  ${renderTemplate`<form class="form" id="login-form" method="post"${addAttribute(Astro2.locals.StudioCMS.routeMap.authLinks.loginAPI, "action")} data-astro-cid-dx7hw4f5> ${renderComponent($$result2, "Input", $$Input, { "label": t("username-label"), "name": "username", "type": "text", "data-astro-cid-dx7hw4f5": true })} ${renderComponent($$result2, "Input", $$Input, { "label": t("password-label"), "name": "password", "type": "password", "data-astro-cid-dx7hw4f5": true })} ${renderComponent($$result2, "Button", $$Button, { "fullWidth": true, "as": "button", "type": "submit", "color": "primary", "size": "md", "variant": "solid", "data-astro-cid-dx7hw4f5": true }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "t-login", "t-login", { "key": "login-button", "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate`${t("login-button")}` })} ` })} ${enableMailer && renderTemplate`${renderComponent($$result2, "Center", $$Center, { "data-astro-cid-dx7hw4f5": true }, { "default": async ($$result3) => renderTemplate` <div id="forgot-password" class="forgot-password" data-astro-cid-dx7hw4f5> ${renderComponent($$result3, "t-login", "t-login", { "key": "forgot-password", "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate`${t("forgot-password")}` })} </div> ` })}`} </form>`}`, "footer": async ($$result2) => renderTemplate`${renderTemplate`<p data-astro-cid-dx7hw4f5> ${renderComponent($$result2, "t-login", "t-login", { "key": "allow-registration-noaccount", "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate` ${t("allow-registration-noaccount")} ` })} <a${addAttribute(Astro2.locals.StudioCMS.routeMap.authLinks.signupURL, "href")} data-astro-cid-dx7hw4f5> ${renderComponent($$result2, "t-login", "t-login", { "key": "allow-registration-register", "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate` ${t("allow-registration-register")} ` })} </a> </p>`}`, "header": async ($$result2) => renderTemplate`<div class="form-header" data-astro-cid-dx7hw4f5> ${DemoMode.enabled} <h1 data-astro-cid-dx7hw4f5> ${renderComponent($$result2, "t-login", "t-login", { "key": "header", "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate`${t("header")}` })} </h1> <p data-astro-cid-dx7hw4f5> ${renderComponent($$result2, "t-login", "t-login", { "key": paragraph, "data-astro-cid-dx7hw4f5": true }, { "default": () => renderTemplate`${t(paragraph)}` })} </p> </div>` })}  ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/login.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/login.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/login.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/login.astro";
const $$url = "/[dashboard]/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
