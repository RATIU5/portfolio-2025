/* empty css                                            */
import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead, b as addAttribute, r as renderScript } from '../../chunks/astro/server_D64VbtqW.mjs';
import { g as getRegistryComponents } from '../../chunks/runtime_B2E_5Ze6.mjs';
import { u as useTranslations } from '../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button, $ as $$Icon } from '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$Card } from '../../chunks/Card_DjFryfeQ.mjs';
import { d as db } from '../../chunks/consts_CvAQFK6n.mjs';
import { $ as $$ComponentRegistryUI } from '../../chunks/ComponentRegistryUI_BSZCgDmS.mjs';
import { $ as $$StorageFileBrowser } from '../../chunks/StorageFileBrowser_D2ybpw7S.mjs';
import { $ as $$PageHeader } from '../../chunks/PageHeader_wh31iQTo.mjs';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_BmXXNyyD.mjs';
/* empty css                                                */
export { renderers } from '../../renderers.mjs';

const debugInfo = "Astro              Unavailable\nAstro Adapter      @astrojs/vercel (v9.0.4)\nDatabase Dialect   LibSQL\nNode.js            v24.14.0\nPackage Manager    npm\nSystem             macOS (ARM64)\nStudioCMS          Unavailable\nStudioCMS UI       v1.1.1\nStudioCMS Plugins  Core (built-in) - studiocms\n                   StudioCMS HTML - @studiocms/html (v0.2.0)\n                   StudioCMS Markdown - @studiocms/md (v0.2.0)\n                   StudioCMS MDX - @studiocms/mdx (v0.2.0)\n                   StudioCMS S3 Storage - @studiocms/s3-storage (v0.2.0)";

const DEFAULT_CONFIG = {
  dialect: "sqlite"
};
const dialectMap = {
  sqlite: "sqlite",
  libsql: "sqlite",
  turso: "sqlite",
  postgres: "postgres",
  mysql: "mysql"
};
const getConfig = () => {
  {
    return {
      ...DEFAULT_CONFIG,
      dialect: dialectMap[db.dialect]
    };
  }
};

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SystemManagement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SystemManagement;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:system-management");
  const userConfig = getConfig();
  const registryData = getRegistryComponents();
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "owner", "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-p4ary243": true }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="page-container" data-astro-cid-p4ary243>  ${renderComponent($$result2, "Card", $$Card, { "fullWidth": true, "data-astro-cid-p4ary243": true }, { "default": ($$result3) => renderTemplate`  <div class="button-shelf" data-astro-cid-p4ary243> ${renderComponent($$result3, "Button", $$Button, { "id": "access-db-studio", "variant": "outlined", "color": "info", "size": "md", "data-astro-cid-p4ary243": true }, { "default": ($$result4) => renderTemplate`  ${renderComponent($$result4, "t-system-management", "t-system-management", { "key": "database-management-label", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("database-management-label")}` })} `, "start-content": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:circle-stack-20-solid", "width": 20, "height": 20, "data-astro-cid-p4ary243": true })}` })} ${renderComponent($$result3, "Button", $$Button, { "id": "access-file-manager", "variant": "outlined", "color": "info", "size": "md", "data-astro-cid-p4ary243": true }, { "default": ($$result4) => renderTemplate`  ${renderComponent($$result4, "t-system-management", "t-system-management", { "key": "access-file-manager", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("access-file-manager")}` })} `, "start-content": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:folder-20-solid", "width": 20, "height": 20, "data-astro-cid-p4ary243": true })}` })} ${renderComponent($$result3, "Button", $$Button, { "id": "access-component-registry", "variant": "outlined", "color": "info", "size": "md", "data-astro-cid-p4ary243": true }, { "default": ($$result4) => renderTemplate`  ${renderComponent($$result4, "t-system-management", "t-system-management", { "key": "access-component-registry", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("access-component-registry")}` })} `, "start-content": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "slot": "start-content", "name": "simpleicons:astro", "width": 18, "height": 18, "data-astro-cid-p4ary243": true })}` })} </div> `, "header": ($$result3) => renderTemplate`<div data-astro-cid-p4ary243> <h2 data-astro-cid-p4ary243>${renderComponent($$result3, "t-system-management", "t-system-management", { "key": "system-utilities-label", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("system-utilities-label")}` })}</h2> </div>` })}  <div class="debug-output" data-astro-cid-p4ary243> <div class="debug-header" data-astro-cid-p4ary243> <h3 data-astro-cid-p4ary243>${renderComponent($$result2, "t-system-management", "t-system-management", { "key": "file-manager-selection", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("file-manager-selection")}` })}</h3> </div> <div class="debug-content-wrapper" data-astro-cid-p4ary243> ${renderTemplate`<input type="text" id="file-browser-url-input" readonly${addAttribute(t("file-manager-url-input-placeholder"), "placeholder")} data-astro-cid-p4ary243>`} </div> </div>  <div class="debug-output" data-astro-cid-p4ary243> <div class="debug-header" data-astro-cid-p4ary243> <h3 data-astro-cid-p4ary243>${renderComponent($$result2, "t-system-management", "t-system-management", { "key": "debug-info-label", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("debug-info-label")}` })}</h3> </div> <div class="debug-content-wrapper" data-astro-cid-p4ary243> ${renderComponent($$result2, "Button", $$Button, { "class": "copy-button", "id": "copyDebugButton", "variant": "solid", "size": "sm", "data-astro-cid-p4ary243": true }, { "start-content": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:clipboard-20-solid", "width": 16, "height": 16, "data-astro-cid-p4ary243": true })}` })} <pre class="debug-content" data-astro-cid-p4ary243><code data-astro-cid-p4ary243>${debugInfo}</code></pre> <div id="debug-data" style="display: none;" data-astro-cid-p4ary243>${debugInfo}</div> </div> </div> </div> ${renderScript($$result2, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/system-management.astro?astro&type=script&index=0&lang.ts")}  `, "external": ($$result2) => renderTemplate`<div data-astro-cid-p4ary243>  <div id="db-studio-container" data-astro-cid-p4ary243> <div class="studio-frame-container" data-astro-cid-p4ary243> <div class="frame-header" data-astro-cid-p4ary243> <span class="frame-title" data-astro-cid-p4ary243> ${renderComponent($$result2, "t-system-management", "t-system-management", { "key": "database-management-label", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("database-management-label")}` })} </span> ${renderComponent($$result2, "Button", $$Button, { "color": "default", "size": "sm", "id": "close-db-studio", "variant": "solid", "data-astro-cid-p4ary243": true }, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "t-system-management", "t-system-management", { "key": "close-button-label", "data-astro-cid-p4ary243": true }, { "default": () => renderTemplate`${t("close-button-label")}` })} `, "start-content": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:x-mark-20-solid", "width": 20, "height": 20, "data-astro-cid-p4ary243": true })}` })} </div> ${renderComponent($$result2, "db-studio", "db-studio", { "dialect": userConfig.dialect, "data-astro-cid-p4ary243": true })} </div> </div>  ${renderComponent($$result2, "StorageFileBrowser", $$StorageFileBrowser, { "triggerId": "access-file-manager", "targetInputId": "file-browser-url-input", "data-astro-cid-p4ary243": true })}  ${renderComponent($$result2, "ComponentRegistryUI", $$ComponentRegistryUI, { "registryData": registryData, "triggerId": "access-component-registry", "noOutput": true, "data-astro-cid-p4ary243": true })} </div>`, "header": ($$result2) => renderTemplate`<div data-astro-cid-p4ary243> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": t("header"), "data-astro-cid-p4ary243": true })} </div>` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/system-management.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/system-management.astro";
const $$url = "/[dashboard]/system-management";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SystemManagement,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
