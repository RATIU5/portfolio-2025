/* empty css                                               */
import { a as createComponent, e as renderComponent, m as maybeRenderHead, b as addAttribute, d as renderTemplate, r as renderScript, c as createAstro } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../../chunks/Divider_D5DMoGSW.mjs';
import '../../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$StorageInput, a as $$BrowserInputArray } from '../../../chunks/StorageInput_DYS2YHAL.mjs';
import { p as pluginsList } from '../../../chunks/_studiocms_plugins_BDmfe-c6.mjs';
import { r as renderAugments } from '../../../chunks/augments_BbB86mwY.mjs';
import { r as runSDK, S as SDKCoreJs } from '../../../chunks/index_DmoCs122.mjs';
import { $ as $$Card } from '../../../chunks/Card_DjFryfeQ.mjs';
import { $ as $$Input } from '../../../chunks/Input_mJ0hT4yn.mjs';
import { b as $$Select, $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_BmXXNyyD.mjs';
import { $ as $$Tabs, a as $$TabItem } from '../../../chunks/TabItem_D9zl4WlC.mjs';
import { p as pageTypeOptions, c as createSelectOptions, t as trueFalse, $ as $$PageTypeHandler } from '../../../chunks/shared_mDRLEEkl.mjs';
/* empty css                                            */
import { Effect } from 'effect';
import { $ as $$PageHeader, a as $$InnerSidebarElement } from '../../../chunks/PageHeader_iKb6IMF-.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$CreatePage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CreatePage;
  const pluginFields = pluginsList.flatMap(({ pageTypes }) => pageTypes ?? []);
  const [folderList, categories, tags] = await runSDK(
    Effect.all([
      SDKCoreJs.GET.folderList(),
      SDKCoreJs.GET.categories.getAll(),
      SDKCoreJs.GET.tags.getAll()
    ])
  );
  const parentFolderOptions = [
    { value: "null", label: "None" },
    ...folderList.map(({ id: value, name: label }) => ({ value, label }))
  ];
  const { lang } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:content-page");
  const searchParams = Astro2.url.searchParams;
  const preselectedParentFolder = searchParams.get("parent-folder") ?? "null";
  return renderTemplate`${renderComponent($$result, "PageTypeHandler", $$PageTypeHandler, { "pluginFields": pluginFields, "data-astro-cid-z3b4cojp": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="create-page-container"${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagement, "data-content-management-url")} data-astro-cid-z3b4cojp> <form id="page-create-form"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.content.page, "action")} data-astro-cid-z3b4cojp> ${renderComponent($$result2, "Tabs", $$Tabs, { "variant": "starlight", "data-astro-cid-z3b4cojp": true }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "TabItem", $$TabItem, { "id": "tab-label-basic-info", "label": t("tab-label-basic-info"), "icon": "heroicons:information-circle-20-solid", "color": "primary", "data-astro-cid-z3b4cojp": true }, { "default": async ($$result4) => renderTemplate` <div class="tab-section" data-astro-cid-z3b4cojp> <div class="form-row" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Input", $$Input, { "label": t("input-page-title"), "name": "page-title", "isRequired": true, "data-astro-cid-z3b4cojp": true })} ${renderComponent($$result4, "Input", $$Input, { "label": t("input-page-slug"), "name": "page-slug", "isRequired": true, "data-astro-cid-z3b4cojp": true })} </div> <div class="form-row" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Input", $$Input, { "label": t("input-page-description"), "name": "page-description", "isRequired": true, "data-astro-cid-z3b4cojp": true })} ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-type"), "name": "page-type", "isRequired": true, "fullWidth": true, "defaultValue": "studiocms/markdown", "options": pageTypeOptions, "data-astro-cid-z3b4cojp": true })} </div> <div class="form-row" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-parent-folder"), "name": "parent-folder", "fullWidth": true, "options": parentFolderOptions, "defaultValue": preselectedParentFolder, "data-astro-cid-z3b4cojp": true })} ${renderComponent($$result4, "Select", $$Select, { "label": t("select-augments-label"), "name": "cms-plugin-augments", "multiple": true, "fullWidth": true, "disabled": renderAugments.length === 0, "defaultValue": renderAugments.length > 0 ? [] : ["no-augments"], "options": renderAugments.length > 0 ? renderAugments.map(({ id }) => ({ label: id, value: id })) : [
    {
      label: t("no-augments"),
      value: "no-augments",
      disabled: true
    }
  ], "data-astro-cid-z3b4cojp": true })} </div> <div class="form-row" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-categories"), "name": "categories", "placeholder": categories.length === 0 ? "No categories available" : "Select", "fullWidth": true, "options": createSelectOptions(
    categories.map(({ id: value, name: label }) => ({
      label,
      value: String(value)
    }))
  ), "multiple": true, "disabled": categories.length === 0, "data-astro-cid-z3b4cojp": true })} ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-tags"), "name": "tags", "placeholder": tags.length === 0 ? "No tags available" : "Select", "fullWidth": true, "options": createSelectOptions(
    tags.map(({ id: value, name: label }) => ({
      label,
      value: String(value)
    }))
  ), "multiple": true, "disabled": tags.length === 0, "data-astro-cid-z3b4cojp": true })} </div> <div class="form-row-single" data-astro-cid-z3b4cojp> <div class="form-row-item" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "StorageInput", $$StorageInput, { "label": t("input-page-hero-image"), "name": "page-hero-image", "placeholder": "https://...", "data-astro-cid-z3b4cojp": true })} <span class="form-row-item__description" data-astro-cid-z3b4cojp>${renderComponent($$result4, "t-content-create-page", "t-content-create-page", { "key": "requires-supported-frontend", "data-astro-cid-z3b4cojp": true }, { "default": () => renderTemplate`${t("requires-supported-frontend")}` })}</span> </div> </div> <div class="form-row-booleans" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-draft"), "name": "draft", "fullWidth": true, "options": trueFalse, "disabled": true, "placeholder": "Use submission buttons above", "data-astro-cid-z3b4cojp": true })} <div class="form-row-item" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-show-author"), "name": "show-author", "defaultValue": "false", "fullWidth": true, "options": trueFalse, "data-astro-cid-z3b4cojp": true })} <span class="form-row-item__description" data-astro-cid-z3b4cojp>${renderComponent($$result4, "t-content-create-page", "t-content-create-page", { "key": "requires-supported-frontend", "data-astro-cid-z3b4cojp": true }, { "default": () => renderTemplate`${t("requires-supported-frontend")}` })}</span> </div> <div class="form-row-item" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-show-in-nav"), "name": "show-in-nav", "defaultValue": "false", "fullWidth": true, "options": trueFalse, "data-astro-cid-z3b4cojp": true })} <span class="form-row-item__description" data-astro-cid-z3b4cojp>${renderComponent($$result4, "t-content-create-page", "t-content-create-page", { "key": "requires-supported-frontend", "data-astro-cid-z3b4cojp": true }, { "default": () => renderTemplate`${t("requires-supported-frontend")}` })}</span> </div> <div class="form-row-item" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Select", $$Select, { "label": t("select-page-show-contributors"), "name": "show-contributors", "defaultValue": "false", "fullWidth": true, "options": trueFalse, "data-astro-cid-z3b4cojp": true })} <span class="form-row-item__description" data-astro-cid-z3b4cojp>${renderComponent($$result4, "t-content-create-page", "t-content-create-page", { "key": "requires-supported-frontend", "data-astro-cid-z3b4cojp": true }, { "default": () => renderTemplate`${t("requires-supported-frontend")}` })}</span> </div> </div> <div id="custom-page-type-fields" style="display: none;" data-astro-cid-z3b4cojp> ${renderComponent($$result4, "Card", $$Card, { "fullWidth": true, "data-astro-cid-z3b4cojp": true }, { "default": async ($$result5) => renderTemplate`  <div data-astro-cid-z3b4cojp> ${renderComponent($$result5, "t-content-create-page", "t-content-create-page", { "key": "custom-page-types-description-new", "data-astro-cid-z3b4cojp": true }, { "default": () => renderTemplate`${t("custom-page-types-description-new")}` })} </div> `, "header": async ($$result5) => renderTemplate`<div data-astro-cid-z3b4cojp> <span data-astro-cid-z3b4cojp> ${renderComponent($$result5, "t-content-create-page", "t-content-create-page", { "key": "custom-page-type-fields-header", "data-astro-cid-z3b4cojp": true }, { "default": () => renderTemplate`${t("custom-page-type-fields-header")}` })} </span> </div>` })} </div> </div> ` })} ${renderComponent($$result3, "TabItem", $$TabItem, { "id": "tab-label-content", "label": t("tab-label-content"), "icon": "heroicons:document-text-20-solid", "color": "success", "data-astro-cid-z3b4cojp": true }, { "default": async ($$result4) => renderTemplate` <div class="tab-section" data-astro-cid-z3b4cojp> <div class="page-content-editor" data-astro-cid-z3b4cojp> <div id="page-content-editor-placeholder" data-astro-cid-z3b4cojp></div> </div> </div> ` })} ` })} </form> </div> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/CreatePage.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/CreatePage.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/CreatePage.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Createpage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Createpage;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:content-index");
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "editor", "sidebar": "double", "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-67nqcwcv": true }, { "default": ($$result2) => renderTemplate`    ${renderComponent($$result2, "CreatePage", $$CreatePage, { "lang": lang, "data-astro-cid-67nqcwcv": true })} `, "double-sidebar": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="inner-sidebar-container" data-astro-cid-67nqcwcv> <div class="sidebar-links-container" data-astro-cid-67nqcwcv> ${renderComponent($$result2, "InnerSidebarElement", $$InnerSidebarElement, { "lang": lang, "data-astro-cid-67nqcwcv": true })} </div> </div>`, "external": ($$result2) => renderTemplate`<div data-astro-cid-67nqcwcv> ${renderComponent($$result2, "BrowserInputArray", $$BrowserInputArray, { "triggerInputs": ["page-hero-image"], "data-astro-cid-67nqcwcv": true })} </div>`, "header": ($$result2) => renderTemplate`<div data-astro-cid-67nqcwcv> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "lang": lang, "createPage": true, "data-astro-cid-67nqcwcv": true })} </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/createpage.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/createpage.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/createpage.astro";
const $$url = "/[dashboard]/content-management/createpage";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Createpage,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
