/* empty css                                            */
import { a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead, b as addAttribute, r as renderScript, c as createAstro } from '../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations, $ as $$Divider } from '../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button, $ as $$Icon } from '../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$StorageInput, a as $$BrowserInputArray } from '../../chunks/StorageInput_DYS2YHAL.mjs';
import { v as validImages } from '../../chunks/index_ChAUemj7.mjs';
import { d as dashboardGridItems } from '../../chunks/dashboard-grid-items_Ckh8pxry.mjs';
import { $ as $$Card } from '../../chunks/Card_DjFryfeQ.mjs';
import { $ as $$Input } from '../../chunks/Input_mJ0hT4yn.mjs';
import { b as $$Select, $ as $$DashboardLayout } from '../../chunks/DashboardLayout_BmXXNyyD.mjs';
import { $ as $$Toggle } from '../../chunks/Toggle_VLjNm0rL.mjs';
/* empty css                                            */
import { $ as $$PageHeader } from '../../chunks/PageHeader_wh31iQTo.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$LoginPreview = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LoginPreview;
  const imageFilter = (filterName) => validImages.filter(({ name }) => name === filterName)[0];
  function getLoginImage(name) {
    const image = imageFilter(name);
    if (!image) {
      throw new Error(`Image with name ${name} not found in validImages.`);
    }
    if (!image.light || !image.dark) {
      throw new Error(`Image with name ${name} does not have both light and dark variants.`);
    }
    return {
      light: image.light,
      dark: image.dark
    };
  }
  const blobs = getLoginImage("studiocms-blobs");
  const blocks = getLoginImage("studiocms-blocks");
  const curves = getLoginImage("studiocms-curves");
  const { light, dark, defaultLang } = Astro2.props;
  const lightSrc = light ? light : blobs.light;
  const darkSrc = dark ? dark : blobs.dark;
  const stringifyable = {
    blobs: {
      light: blobs.light.src,
      dark: blobs.dark.src
    },
    blocks: {
      light: blocks.light.src,
      dark: blocks.dark.src
    },
    curves: {
      light: curves.light.src,
      dark: curves.dark.src
    }
  };
  const lang = defaultLang ?? Astro2.locals?.StudioCMS?.defaultLang ?? "en";
  const t = useTranslations(lang, "@studiocms/dashboard:configuration");
  return renderTemplate`${renderComponent($$result, "Card", $$Card, { "class": "login-preview-container", "data-astro-cid-4tzrfubb": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "login-preview", "login-preview", { "class": "wrapper", "data-sources": JSON.stringify(stringifyable), "data-astro-cid-4tzrfubb": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="before" data-astro-cid-4tzrfubb> <img${addAttribute(640, "width")}${addAttribute(360, "height")} class="content-image light-image-holder"${addAttribute(lightSrc.src, "src")} draggable="false" alt="Light Preview"${addAttribute("eager", "loading")} data-astro-cid-4tzrfubb> </div> <div class="after" data-astro-cid-4tzrfubb> <img${addAttribute(640, "width")}${addAttribute(360, "height")} class="content-image dark-image-holder"${addAttribute(darkSrc.src, "src")} draggable="false" alt="Dark Preview"${addAttribute("eager", "loading")} data-astro-cid-4tzrfubb> </div> ` })} `, "header": ($$result2) => renderTemplate`<div data-astro-cid-4tzrfubb> <span data-astro-cid-4tzrfubb>${renderComponent($$result2, "t-config-form", "t-config-form", { "key": "login-page-preview", "data-astro-cid-4tzrfubb": true }, { "default": () => renderTemplate`${t("login-page-preview")}` })}</span> </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/configuration/LoginPreview.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/configuration/LoginPreview.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/configuration/LoginPreview.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$ConfigForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ConfigForm;
  const { config } = Astro2.props;
  const { data } = config;
  const ogSelectOptions = validImages.map(({ label, name: value }) => ({ label, value }));
  const currentLoginPageBg = validImages.find(
    ({ name }) => name === data.loginPageBackground && name !== "custom"
  );
  const currentlyEnabledGridItems = data.gridItems ?? [];
  const allGridItems = dashboardGridItems.map((item) => ({
    name: item.name,
    label: item.header?.title ?? item.name
  }));
  const gridItemOptions = allGridItems.map(({ name, label }) => {
    if (currentlyEnabledGridItems.length === 0) {
      return {
        enabled: true,
        name,
        label
      };
    }
    return {
      enabled: currentlyEnabledGridItems.includes(name),
      name,
      label
    };
  });
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/dashboard:configuration");
  return renderTemplate`${maybeRenderHead()}<form id="site-config-form"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.config, "action")} data-astro-cid-jca3d6dc> <div class="form-content" data-astro-cid-jca3d6dc> <div class="form-row" data-astro-cid-jca3d6dc> ${renderComponent($$result, "Input", $$Input, { "label": t("input-site-title"), "name": "site-title", "placeholder": "My Awesome Website", "value": data.title, "isRequired": true, "data-astro-cid-jca3d6dc": true })} ${renderComponent($$result, "Input", $$Input, { "label": t("input-site-description"), "name": "site-description", "placeholder": "Built with StudioCMS!", "value": data.description, "isRequired": true, "data-astro-cid-jca3d6dc": true })} </div> <div class="form-row" data-astro-cid-jca3d6dc> ${renderComponent($$result, "StorageInput", $$StorageInput, { "label": t("input-og-image"), "name": "default-og-image", "placeholder": "'https://...' for local, or '/...' for public/ folder", "value": data.defaultOgImage, "data-astro-cid-jca3d6dc": true })} ${renderComponent($$result, "StorageInput", $$StorageInput, { "label": "Site Icon (Public facing Favicon)", "name": "site-icon", "placeholder": "'https://...' for local, or '/...' for public/ folder", "value": data.siteIcon, "data-astro-cid-jca3d6dc": true })} </div> <div class="form-row" data-astro-cid-jca3d6dc> ${renderComponent($$result, "Select", $$Select, { "label": t("select-page-diff-tracking"), "name": "diff-enabled", "defaultValue": `${data.enableDiffs}`, "options": [{ label: "True", value: "true" }, { label: "False", value: "false" }], "fullWidth": true, "data-astro-cid-jca3d6dc": true })} ${renderComponent($$result, "Input", $$Input, { "label": t("input-diff-tracking-limit"), "name": "diff-per-page", "placeholder": "10", "value": data.diffPerPage, "data-astro-cid-jca3d6dc": true })} </div> <div class="form-row" data-astro-cid-jca3d6dc> ${renderComponent($$result, "Select", $$Select, { "label": t("select-smtp-mailer"), "name": "enable-mailer", "defaultValue": `${data.enableMailer}`, "options": [{ label: "True", value: "true" }, { label: "False", value: "false" }], "fullWidth": true, "data-astro-cid-jca3d6dc": true })} </div> ${renderComponent($$result, "Divider", $$Divider, { "data-astro-cid-jca3d6dc": true })} <span data-astro-cid-jca3d6dc> ${renderComponent($$result, "t-config-form", "t-config-form", { "key": "dashboard-grid-label", "data-astro-cid-jca3d6dc": true }, { "default": () => renderTemplate`${t("dashboard-grid-label")}` })} </span> <div class="grid-items-container" data-astro-cid-jca3d6dc> ${gridItemOptions.map(({ enabled, label, name }) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "style": "background-color: var(--background-step-2);", "data-astro-cid-jca3d6dc": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Toggle", $$Toggle, { "label": label, "name": name, "color": "primary", "defaultChecked": enabled, "data-astro-cid-jca3d6dc": true })} ` })}`)} </div> ${renderComponent($$result, "Divider", $$Divider, { "data-astro-cid-jca3d6dc": true })} <div class="form-row" data-astro-cid-jca3d6dc> ${renderComponent($$result, "Select", $$Select, { "label": t("select-login-page-bg"), "name": "login-page-background", "defaultValue": data.loginPageBackground, "options": ogSelectOptions, "fullWidth": true, "data-astro-cid-jca3d6dc": true })} ${renderComponent($$result, "StorageInput", $$StorageInput, { "label": t("input-custom-login-page"), "name": "login-page-background-custom", "placeholder": "'https://...' for local, or '/...' for public/ folder", "value": data.loginPageCustomImage, "disabled": data.loginPageBackground !== "custom", "data-astro-cid-jca3d6dc": true })} </div> ${renderComponent($$result, "LoginPreview", $$LoginPreview, { "light": currentLoginPageBg?.light, "dark": currentLoginPageBg?.dark, "data-astro-cid-jca3d6dc": true })} </div> </form> <div id="grid-items-data-list"${addAttribute(JSON.stringify(gridItemOptions.map(({ name }) => name)), "data-items")} style="display: none;" data-astro-cid-jca3d6dc></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/configuration/ConfigForm.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/configuration/ConfigForm.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/configuration/ConfigForm.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Configuration = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Configuration;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:configuration");
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "owner", "lang": lang, "config": config, "currentUser": currentUser }, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "ConfigForm", $$ConfigForm, { "config": config })} `, "external": ($$result2) => renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result2, "BrowserInputArray", $$BrowserInputArray, { "triggerInputs": ["default-og-image", "site-icon", "login-page-background-custom"] })} </div>`, "header": ($$result2) => renderTemplate`<div> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": t("header") }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "sm", "type": "submit", "form": "site-config-form" }, { "default": ($$result4) => renderTemplate`  ${renderComponent($$result4, "t-config", "t-config", { "key": "save-button" }, { "default": () => renderTemplate`${t("save-button")}` })} `, "start-content": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:check-20-solid", "width": 20, "height": 20 })}` })} ` })} </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/configuration.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/configuration.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/configuration.astro";
const $$url = "/[dashboard]/configuration";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Configuration,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
