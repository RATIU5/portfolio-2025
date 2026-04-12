/* empty css                                               */
import { a as createComponent, e as renderComponent, d as renderTemplate, c as createAstro, m as maybeRenderHead, b as addAttribute, r as renderScript } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button, $ as $$Icon } from '../../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { p as pluginsList } from '../../../chunks/_studiocms_plugins_BDmfe-c6.mjs';
import { $ as $$PageHeader } from '../../../chunks/PageHeader_wh31iQTo.mjs';
import { $ as $$DynamicSettingsRenderer } from '../../../chunks/DynamicSettingsRenderer_D8gUSA0S.mjs';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_BmXXNyyD.mjs';
/* empty css                                          */
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SettingsRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SettingsRenderer;
  return renderTemplate`${renderComponent($$result, "DynamicSettingsRenderer", $$DynamicSettingsRenderer, { ...Astro2.props })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/plugins/SettingsRenderer.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$plugin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$plugin;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:plugin-settings");
  const filteredPluginList = pluginsList.filter((plugin2) => !!plugin2.settingsPage);
  const { plugin } = Astro2.params;
  if (!plugin) {
    return new Response(null, { status: 404 });
  }
  const pluginData = filteredPluginList.find((p) => p.identifier === plugin);
  if (!pluginData) {
    return new Response(null, { status: 404 });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "editor", "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-yigobnin": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<form id="plugin-settings-form"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.plugins + pluginData.identifier, "action")} method="POST" data-astro-cid-yigobnin> <div class="form-settings" data-astro-cid-yigobnin> ${pluginData.settingsPage && renderTemplate`${renderComponent($$result2, "SettingsRenderer", $$SettingsRenderer, { "fields": pluginData.settingsPage.fields, "data-astro-cid-yigobnin": true })}`} </div> </form> <div style="display: none;" id="plugin-name"${addAttribute(pluginData.name, "data-value")} data-astro-cid-yigobnin></div> ${renderScript($$result2, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/plugins/[plugin].astro?astro&type=script&index=0&lang.ts")}  `, "header": ($$result2) => renderTemplate`<div data-astro-cid-yigobnin> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": `${t("header")}: ${pluginData.name}`, "data-astro-cid-yigobnin": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "sm", "type": "submit", "form": "plugin-settings-form", "data-astro-cid-yigobnin": true }, { "default": ($$result4) => renderTemplate`  ${renderComponent($$result4, "t-plugins", "t-plugins", { "key": "save-button", "data-astro-cid-yigobnin": true }, { "default": () => renderTemplate`${t("save-button")}` })} `, "start-content": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:check-20-solid", "width": 20, "height": 20, "data-astro-cid-yigobnin": true })}` })} ` })} </div>` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/plugins/[plugin].astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/plugins/[plugin].astro";
const $$url = "/[dashboard]/plugins/[plugin]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$plugin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
