/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead, b as addAttribute, r as renderScript } from '../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button, $ as $$Icon } from '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { l as logger } from '../../chunks/_studiocms_logger_DedMAODS.mjs';
import { r as runSDK, S as SDKCoreJs } from '../../chunks/index_DmoCs122.mjs';
import { $ as $$Card } from '../../chunks/Card_DjFryfeQ.mjs';
import { $ as $$Input } from '../../chunks/Input_mJ0hT4yn.mjs';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_BmXXNyyD.mjs';
/* empty css                                             */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$PasswordReset = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PasswordReset;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:password-reset");
  const urlSearchParams = Astro2.url.searchParams;
  const token = urlSearchParams.get("token");
  const id = urlSearchParams.get("id");
  const userId = urlSearchParams.get("userid") ?? "";
  if (!token || !id || !userId || userId === "") {
    logger.warn("Missing - token/id/userid");
    return new Response(null, { status: 404 });
  }
  const user = await runSDK(SDKCoreJs.GET.users.byId(userId));
  if (!user) {
    logger.warn("Missing - user");
    return new Response(null, { status: 404 });
  }
  const lookupToken = await runSDK(SDKCoreJs.resetTokenBucket.check(token));
  if (!lookupToken) {
    logger.warn("Missing - token");
    return new Response(null, { status: 404 });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "none", "sidebar": false, "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-wztv3i5s": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Card", $$Card, { "class": "reset-form", "fullWidth": true, "as": "form", "id": "reset-password-form", "action": Astro2.locals.StudioCMS.routeMap.endpointLinks.resetPassword, "data-astro-cid-wztv3i5s": true }, { "default": async ($$result3) => renderTemplate`  ${maybeRenderHead()}<div class="password-reset-form-body" data-astro-cid-wztv3i5s> <input type="hidden" name="token"${addAttribute(token, "value")} data-astro-cid-wztv3i5s> <input type="hidden" name="id"${addAttribute(id, "value")} data-astro-cid-wztv3i5s> <input type="hidden" name="userid"${addAttribute(userId, "value")} data-astro-cid-wztv3i5s> ${renderComponent($$result3, "Input", $$Input, { "label": t("password-label"), "type": "password", "placeholder": "********", "isRequired": true, "autocomplete": "password new_password", "name": "new-password", "data-astro-cid-wztv3i5s": true })} ${renderComponent($$result3, "Input", $$Input, { "label": t("confirm-password-label"), "type": "password", "placeholder": "********", "isRequired": true, "autocomplete": "password new_password", "name": "confirm-new-password", "data-astro-cid-wztv3i5s": true })} </div>  `, "footer": async ($$result3) => renderTemplate`<div data-astro-cid-wztv3i5s> <div class="form-footer" data-astro-cid-wztv3i5s> ${renderComponent($$result3, "Button", $$Button, { "type": "submit", "size": "sm", "variant": "solid", "color": "primary", "data-astro-cid-wztv3i5s": true }, { "default": async ($$result4) => renderTemplate`  ${renderComponent($$result4, "t-password-reset", "t-password-reset", { "key": "reset-button", "data-astro-cid-wztv3i5s": true }, { "default": () => renderTemplate`${t("reset-button")}` })} `, "start-content": async ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:check", "width": 24, "height": 24, "data-astro-cid-wztv3i5s": true })}` })} </div> </div>`, "header": async ($$result3) => renderTemplate`<div data-astro-cid-wztv3i5s> <h2 data-astro-cid-wztv3i5s> ${renderComponent($$result3, "t-password-reset", "t-password-reset", { "key": "header", "data-astro-cid-wztv3i5s": true }, { "default": () => renderTemplate`${t("header")}` })} </h2> <p data-astro-cid-wztv3i5s> ${renderComponent($$result3, "t-password-reset", "t-password-reset", { "key": "sub-header-start", "data-astro-cid-wztv3i5s": true }, { "default": () => renderTemplate`${t("sub-header-start")}` })}, ${user?.name || "User"}. <br data-astro-cid-wztv3i5s> ${renderComponent($$result3, "t-password-reset", "t-password-reset", { "key": "sub-header-end", "data-astro-cid-wztv3i5s": true }, { "default": () => renderTemplate`${t("sub-header-end")}` })} </p> </div>` })} ${renderScript($$result2, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/password-reset.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result2, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/password-reset.astro?astro&type=script&index=1&lang.ts")}  ` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/password-reset.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/password-reset.astro";
const $$url = "/[dashboard]/password-reset";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$PasswordReset,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
