import { a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderScript, d as renderTemplate, c as createAstro, e as renderComponent, f as renderSlot, j as renderHead } from './astro/server_D64VbtqW.mjs';
import { d as defaultLang } from './LanguageSelector_D2Mp70Tp.mjs';
/* empty css                         */
import { c as config, S as STUDIOCMS_THEME_COLOR, F as FAVICON_ASSETS } from './consts_CvAQFK6n.mjs';

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Toaster = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Toaster;
  const {
    position = "top-center",
    duration = 4e3,
    closeButton = false,
    offset = 32,
    gap = 8
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="sui-toaster"${addAttribute([
    closeButton && "closeable",
    position
  ], "class:list")}> <div id="sui-toast-drawer"${addAttribute(offset, "data-offset")}${addAttribute(gap, "data-gap")}${addAttribute(duration, "data-duration")}${addAttribute([
    `${position.includes("top-") ? "top:" : "bottom:"} ${offset}px;`,
    position.includes("-left") && `left: ${offset}px`,
    position.includes("-right") && `right: ${offset}px`,
    position.includes("-center") && `left: 50%; transform: translateX(-50%);`,
    `--gap: ${gap}px;`,
    `padding-left: ${offset}px;`,
    `padding-right: ${offset}px;`
  ].filter(Boolean).join(""), "style")}></div> </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Toast/Toaster.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Toast/Toaster.astro", void 0);

const $$BaseBody = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<body> ${renderComponent($$result, "Toaster", $$Toaster, {})} ${renderSlot($$result, $$slots["default"])} </body>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/BaseBody.astro", void 0);

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const {
    locale: { dateLocale: locales, dateTimeFormat: options }
  } = config;
  const { date, __test_mode = false } = Astro2.props;
  const datetime = date.toISOString();
  const formattedDate = __test_mode ? date.toUTCString() : date.toLocaleDateString(locales, options);
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(datetime, "datetime")}>${formattedDate}</time>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/components/FormattedDate.astro", void 0);

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Generator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Generator;
  return renderTemplate`<meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="generator"${addAttribute(Astro2.locals.StudioCMS.SCMSGenerator, "content")}><meta name="generator"${addAttribute(Astro2.locals.StudioCMS.SCMSUiGenerator, "content")}>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/virtuals/components/Generator.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ThemeManager = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<script>\n    window.theme ??= (() => {\n        const defaultTheme = "system";\n        const storageKey = "studiocms-theme-preference";\n        const store =\n            typeof localStorage !== "undefined"\n            ? localStorage\n            : { getItem: () => null, setItem: () => {} };\n    \n        const mediaMatcher = window.matchMedia("(prefers-color-scheme: light)");\n        let systemTheme = mediaMatcher.matches ? "light" : "dark";\n        mediaMatcher.addEventListener("change", (event) => {\n            systemTheme = event.matches ? "light" : "dark";\n            applyTheme(theme.getTheme());\n        });\n    \n        function applyTheme(theme) {\n            const resolvedTheme = theme === "system" ? systemTheme : theme;\n            document.documentElement.dataset.theme = resolvedTheme;\n            document.dispatchEvent(\n            new CustomEvent("theme-changed", {\n                detail: { theme, systemTheme, defaultTheme },\n            })\n            );\n        }\n    \n        function setTheme(theme = defaultTheme) {\n            store.setItem(storageKey, theme);\n            applyTheme(theme);\n        }\n    \n        function getTheme() {\n            return store.getItem(storageKey) || defaultTheme;\n        }\n    \n        function getSystemTheme() {\n            return systemTheme;\n        }\n    \n        function getDefaultTheme() {\n            return defaultTheme;\n        }\n    \n        return { setTheme, getTheme, getSystemTheme, getDefaultTheme };\n    })();\n    theme.setTheme(theme.getTheme());\n<\/script> ', ""])), renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/ThemeManager.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/ThemeManager.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { title, description, generators } = Astro2.props;
  return renderTemplate`<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="theme-color"${addAttribute(STUDIOCMS_THEME_COLOR, "content")}>${generators && renderTemplate`${renderComponent($$result, "Generator", $$Generator, {})}`}<link rel="icon"${addAttribute(FAVICON_ASSETS.svg, "href")} type="image/svg+xml"><link rel="icon"${addAttribute(FAVICON_ASSETS.png.light, "href")} type="image/png" media="(prefers-color-scheme: dark)"><link rel="icon"${addAttribute(FAVICON_ASSETS.png.dark, "href")} type="image/png" media="(prefers-color-scheme: light)">${renderComponent($$result, "ThemeManager", $$ThemeManager, {})}${renderHead()}</head>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/BaseHead.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { lang = defaultLang, generators: genMeta = true, ...headProps } = Astro2.props;
  const generators = genMeta;
  return renderTemplate`<html${addAttribute(lang, "lang")}> ${renderComponent($$result, "BaseHead", $$BaseHead, { ...headProps, "generators": generators })}${renderComponent($$result, "BaseBody", $$BaseBody, {}, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}</html>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/layouts/BaseLayout.astro", void 0);

export { $$FormattedDate as $, $$BaseLayout as a };
