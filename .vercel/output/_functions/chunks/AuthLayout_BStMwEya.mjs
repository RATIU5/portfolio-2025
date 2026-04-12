import { a as createComponent, m as maybeRenderHead, b as addAttribute, d as renderTemplate, c as createAstro, e as renderComponent, r as renderScript, F as Fragment, u as unescapeHTML, f as renderSlot } from './astro/server_D64VbtqW.mjs';
/* empty css                         */
import { $ as $$Image } from './_astro_assets_BnXYBOz6.mjs';
import { v as validImages } from './index_ChAUemj7.mjs';
import { $ as $$Divider, u as useTranslations } from './Divider_D5DMoGSW.mjs';
import { a as $$Button } from './LanguageSelector_D2Mp70Tp.mjs';
import { s as showOAuth, p as providerData } from './oAuthButtonProviders_DW1P4kMf.mjs';
import { a as $$BaseLayout } from './BaseLayout_Dwmia_ez.mjs';

const $$Astro$6 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$StudioCMSLogoSVG = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$StudioCMSLogoSVG;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute([className], "class:list")} width="755" height="792" viewBox="0 0 755 792" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="295" width="460" height="466" rx="32" fill="currentColor"></rect> <path d="M272 434V166H180C162.327 166 148 180.327 148 198V597C148 614.673 162.327 629 180 629H577.5C595.173 629 609.5 614.673 609.5 597V490H328C297.072 490 272 464.928 272 434Z" fill="currentColor"></path> <path d="M124 597V329H32C14.3269 329 0 343.327 0 361V760C0 777.673 14.3269 792 32 792H429.5C447.173 792 461.5 777.673 461.5 760V653H180C149.072 653 124 627.928 124 597Z" fill="currentColor"></path> </svg>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/StudioCMSLogoSVG.astro", void 0);

const $$Astro$5 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$FallbackCanvas = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$FallbackCanvas;
  const config = Astro2.locals.StudioCMS.siteConfig;
  const { loginPageBackground, loginPageCustomImage } = config.data;
  const fallbackImageSrc = loginPageBackground === "custom" ? (
    /* v8 ignore start */
    loginPageCustomImage
  ) : (
    /* v8 ignore stop */
    validImages.find((x) => x.name !== "custom" && x.name === loginPageBackground)?.dark
  );
  return renderTemplate`${maybeRenderHead()}<div class="fallback-container" id="fallback-config"${addAttribute(JSON.stringify({ loginPageBackground, loginPageCustomImage }), "data-config")}> ${renderComponent($$result, "StudioCMSLogoSVG", $$StudioCMSLogoSVG, { "class": "static-logo" })} ${typeof fallbackImageSrc === "string" && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": fallbackImageSrc || "", "inferSize": true, "alt": "A fallback image displaying because the interactive wallpaper couldn't be loaded.", "class": "fallback-image", "quality": 100 })}`} ${typeof fallbackImageSrc !== "string" && !!fallbackImageSrc && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": fallbackImageSrc, "alt": "A fallback image displaying because the interactive wallpaper couldn't be loaded.", "class": "fallback-image", "quality": 100 })}`} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/FallbackCanvas.astro?astro&type=script&index=0&lang.ts")} </div>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/FallbackCanvas.astro", void 0);

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$OAuthButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$OAuthButton;
  const { href, label, image } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Button", $$Button, { "fullWidth": true, "as": "a", "href": href, "variant": "solid", "size": "lg", "data-astro-cid-tpcbq75r": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(image)}` })} ${maybeRenderHead()}<span data-astro-cid-tpcbq75r>${label}</span> ` })} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/OAuthButton.astro", void 0);

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$OAuthButtonStack = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$OAuthButtonStack;
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/auth:oauth-stack");
  const shouldShowOAuth = showOAuth && providerData.some(({ enabled }) => enabled);
  return renderTemplate`${shouldShowOAuth && renderTemplate`${renderComponent($$result, "Divider", $$Divider, {}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "t-comp-oauth", "t-comp-oauth", { "key": "or-login-with" }, { "default": () => renderTemplate`${t("or-login-with")}` })}` })}
    ${maybeRenderHead()}<div class="button-stack">${providerData.map(({ enabled, ...props }) => enabled && renderTemplate`${renderComponent($$result, "OAuthButton", $$OAuthButton, { ...props })}`)}</div>`}${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/OAuthButtonStack.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/OAuthButtonStack.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$StaticAuthCheck = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$StaticAuthCheck;
  const { userData } = Astro2.props;
  const isLoggedIn = userData?.isLoggedIn ?? false;
  return renderTemplate(_a || (_a = __template(["", '<div id="login-check" style="display: none;"', "", "></div> <script>\n  const loginCheck = document.getElementById('login-check');\n\n  if (loginCheck.dataset.is_logged_in === 'true') {\n    window.location.href = loginCheck.dataset.redirect_route;\n  }\n<\/script>"])), maybeRenderHead(), addAttribute(`${isLoggedIn}`, "data-is_logged_in"), addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.dashboardIndex, "data-redirect_route"));
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/StaticAuthCheck.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$ThreeCanvasLoader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ThreeCanvasLoader;
  const config = Astro2.locals.StudioCMS.siteConfig;
  const { loginPageBackground, loginPageCustomImage } = config.data;
  return renderTemplate`${maybeRenderHead()}<div style="display: none;" id="auth-pages-config"${addAttribute(loginPageBackground, "data-config_background")}${addAttribute(loginPageCustomImage, "data-config_custom_image")}></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/ThreeCanvasLoader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/auth/ThreeCanvasLoader.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthLayout;
  const { siteConfig: config, security } = Astro2.locals.StudioCMS;
  const userData = security?.userSessionData || null;
  const { disableScreen, checkLogin, ...headProps } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { ...headProps }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div id="canvas-container"> ${renderComponent($$result2, "FallbackCanvas", $$FallbackCanvas, { "config": config })} </div> <div class="login-form-container"> ${renderSlot($$result2, $$slots["header"])} ${renderSlot($$result2, $$slots["default"])} ${!disableScreen && renderTemplate`${renderComponent($$result2, "OAuthButtonStack", $$OAuthButtonStack, {})}`} <div class="form-footer"> ${renderSlot($$result2, $$slots["footer"])} </div> </div> </main> ${checkLogin && renderTemplate`${renderComponent($$result2, "StaticAuthCheck", $$StaticAuthCheck, { "userData": userData })}`}${renderComponent($$result2, "ThreeCanvasLoader", $$ThreeCanvasLoader, {})} ` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $ };
