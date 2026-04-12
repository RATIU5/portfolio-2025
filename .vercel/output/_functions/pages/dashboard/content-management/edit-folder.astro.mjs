/* empty css                                               */
import { a as createComponent, m as maybeRenderHead, b as addAttribute, e as renderComponent, r as renderScript, d as renderTemplate, c as createAstro } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../../../chunks/Divider_D5DMoGSW.mjs';
import '../../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { r as runSDK, S as SDKCoreJs } from '../../../chunks/index_DmoCs122.mjs';
import { $ as $$Input } from '../../../chunks/Input_mJ0hT4yn.mjs';
import { b as $$Select, $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_BmXXNyyD.mjs';
/* empty css                                            */
import { $ as $$PageHeader, a as $$InnerSidebarElement } from '../../../chunks/PageHeader_iKb6IMF-.mjs';
import { Effect } from 'effect';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$EditFolder = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EditFolder;
  const { lang, currentFolder, folderList } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:content-folder");
  const filteredParentFolderOptions = [
    { value: "null", label: "None" },
    ...folderList.map(({ id: value, name: label }) => ({ value, label }))
  ].filter((option) => option.value !== currentFolder.id);
  return renderTemplate`${maybeRenderHead()}<div id="edit-folder-container"${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagement, "data-content-management-url")} data-astro-cid-6fghvr6t> <form id="edit-folder-form"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.content.folder, "action")} data-astro-cid-6fghvr6t> <input type="hidden" name="folder-id"${addAttribute(currentFolder.id, "value")} data-astro-cid-6fghvr6t> ${renderComponent($$result, "Input", $$Input, { "label": t("input-folder-name"), "name": "folder-name", "defaultValue": currentFolder.name, "isRequired": true, "data-astro-cid-6fghvr6t": true })} ${renderComponent($$result, "Select", $$Select, { "label": t("input-folder-parent"), "name": "parent-folder", "options": filteredParentFolderOptions, "defaultValue": currentFolder.parent || "null", "fullWidth": true, "data-astro-cid-6fghvr6t": true })} </form> </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/EditFolder.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/EditFolder.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/EditFolder.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Editfolder = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Editfolder;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:content-index");
  const urlParams = Astro2.url.searchParams;
  const editId = urlParams.get("folder") || "";
  const [currentFolder, folderList] = await runSDK(
    Effect.all([SDKCoreJs.GET.folder(editId), SDKCoreJs.GET.folderList()])
  );
  if (!currentFolder) {
    console.warn(`Folder with ID ${editId} not found.`);
    return new Response(null, { status: 404 });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "editor", "sidebar": "double", "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-qzkhwzb7": true }, { "default": async ($$result2) => renderTemplate`   ${renderComponent($$result2, "EditFolder", $$EditFolder, { "lang": lang, "currentFolder": currentFolder, "folderList": folderList, "data-astro-cid-qzkhwzb7": true })} `, "double-sidebar": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="inner-sidebar-container" data-astro-cid-qzkhwzb7> <div class="sidebar-links-container" data-astro-cid-qzkhwzb7> ${renderComponent($$result2, "InnerSidebarElement", $$InnerSidebarElement, { "lang": lang, "data-astro-cid-qzkhwzb7": true })} </div> </div>`, "header": async ($$result2) => renderTemplate`<div data-astro-cid-qzkhwzb7> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "lang": lang, "editFolder": true, "data-astro-cid-qzkhwzb7": true })} </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/editfolder.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/editfolder.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/editfolder.astro";
const $$url = "/[dashboard]/content-management/editfolder";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Editfolder,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
