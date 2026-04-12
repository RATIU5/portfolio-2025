import { a as createComponent, e as renderComponent, m as maybeRenderHead, d as renderTemplate, b as addAttribute, r as renderScript, c as createAstro, f as renderSlot, F as Fragment } from './astro/server_D64VbtqW.mjs';
import { u as useTranslations } from './Divider_D5DMoGSW.mjs';
import { $ as $$Icon, a as $$Button, b as $$Dropdown } from './LanguageSelector_D2Mp70Tp.mjs';
import { r as runSDK, S as SDKCoreJs } from './index_DmoCs122.mjs';
import { $ as $$Input } from './Input_mJ0hT4yn.mjs';
import { a as $$Center, $ as $$Modal } from './Modal_B-agW0rH.mjs';
import { a as $$Group } from './DashboardLayout_BmXXNyyD.mjs';
/* empty css                                */

const $$Astro$6 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$FolderTreeLeaf = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$FolderTreeLeaf;
  const { node, depth = 0, editPageLink, lang } = Astro2.props;
  function getPageIcon() {
    if (!node.pageData) return "heroicons:document-text";
    if (node.pageData.slug === "index") {
      return "heroicons:home-modern";
    }
    if (node.pageData.draft) {
      return "heroicons:pencil";
    }
    return "heroicons:document-text";
  }
  const icon = getPageIcon();
  const activeIcon = `${icon}-solid`;
  const href = node.page ? editPageLink : "#";
  const t = useTranslations(lang, "@studiocms/dashboard:file-tree-renderer");
  return renderTemplate`${renderComponent($$result, "folder-tree-leaf", "folder-tree-leaf", { "data-node-id": node.id, "data-page-id": node.pageData?.id, "data-depth": depth, "data-href": href, "class": "tree-leaf", "role": "treeitem", "tabindex": "0" }, { "default": () => renderTemplate` ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "leaf-icon default", "width": 20, "height": 20 })} ${renderComponent($$result, "Icon", $$Icon, { "name": activeIcon, "class": "leaf-icon active", "width": 20, "height": 20 })} ${maybeRenderHead()}<span class="tree-leaf-label">${node.name}</span> ${node.pageData?.draft && renderTemplate`<span class="leaf-badge draft-badge"> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "badge-draft" }, { "default": () => renderTemplate` ${t("badge-draft")} ` })} </span>`} ` })} <div${addAttribute(`${node.id}-context-menu`, "id")} class="context-menu" role="menu"> <button class="context-menu-item" role="menuitem" data-action="edit"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:pencil", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "edit-page" }, { "default": () => renderTemplate` ${t("edit-page")} ` })} </span> </button> </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeLeaf.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeLeaf.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeLeaf.astro", void 0);

const $$Astro$5 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$FolderTreeNode = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$FolderTreeNode;
  const { createFolderLink, createPageLink, editFolderLink, node, depth = 0, lang } = Astro2.props;
  const nodeId = `folder-${node.id}`;
  const contentId = `content-${node.id}`;
  const href = node.page === false ? editFolderLink : "#";
  const t = useTranslations(lang, "@studiocms/dashboard:file-tree-renderer");
  return renderTemplate`${renderComponent($$result, "folder-tree-node", "folder-tree-node", { "data-node-id": nodeId, "data-depth": depth, "data-href": href, "data-folder-id": node.id, "data-create-subfolder-link": createFolderLink, "data-create-page-link": createPageLink, "class": "tree-node", "role": "treeitem", "aria-expanded": "false" }, { "default": () => renderTemplate` ${maybeRenderHead()}<div${addAttribute(`${nodeId}-tree-node-header`, "id")} class="tree-node-header"> <button${addAttribute(`${nodeId}-tree-node-toggle`, "id")} class="tree-node-toggle" type="button"${addAttribute(contentId, "aria-controls")}${addAttribute(`Toggle ${node.name} folder`, "aria-label")}>  </button> <div class="tree-node-content"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder", "class": "folder-icon closed", "width": 20, "height": 20 })} ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-open", "class": "folder-icon open", "width": 20, "height": 20 })} ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-open-solid", "class": "folder-icon selected", "width": 20, "height": 20 })} <span class="tree-node-label">${node.name}</span> </div> <button${addAttribute(`${nodeId}-tree-node-menu-trigger`, "id")} class="tree-node-menu-trigger" type="button"${addAttribute(`Open menu for ${node.name}`, "aria-label")} aria-haspopup="menu"${addAttribute(`${nodeId}-context-menu`, "aria-controls")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:ellipsis-vertical", "width": 16, "height": 16 })} </button> </div> <div class="tree-node-children"${addAttribute(contentId, "id")}> <div class="tree-node-children-inner"> ${renderSlot($$result, $$slots["default"])} </div> </div> <div${addAttribute(`${nodeId}-context-menu`, "id")} class="context-menu" role="menu"> <button class="context-menu-item" role="menuitem" data-action="edit"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:pencil", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "edit-folder" }, { "default": () => renderTemplate` ${t("edit-folder")} ` })} </span> </button> <button class="context-menu-item" role="menuitem" data-action="create-folder"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "create-sub-folder" }, { "default": () => renderTemplate` ${t("create-sub-folder")} ` })} </span> </button> <button class="context-menu-item" role="menuitem" data-action="create-page"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:document-plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "create-sub-page" }, { "default": () => renderTemplate` ${t("create-sub-page")} ` })} </span> </button> </div> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeNode.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeNode.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeNode.astro", void 0);

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$FolderTreeNodeTree = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$FolderTreeNodeTree;
  const { data, depth = 0, ...props } = Astro2.props;
  function sortTree(data2) {
    return data2.map((node) => ({
      ...node,
      children: sortTree(node.children)
    })).sort((a, b) => a.name.localeCompare(b.name));
  }
  const sortedData = sortTree(data);
  return renderTemplate`${sortedData.map(
    (node) => node.page ? renderTemplate`${renderComponent($$result, "FolderTreeLeaf", $$FolderTreeLeaf, { "node": node, "depth": depth, ...props })}` : renderTemplate`${renderComponent($$result, "FolderTreeNode", $$FolderTreeNode, { "node": node, "depth": depth, ...props }, { "default": ($$result2) => renderTemplate`${node.children && node.children.length > 0 && renderTemplate`${renderComponent($$result2, "Astro.self", Astro2.self, { "data": node.children, "depth": depth + 1, ...props })}`}` })}`
  )}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeNodeTree.astro", void 0);

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$FolderTreeRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FolderTreeRenderer;
  const {
    class: className,
    id,
    createFolderLink,
    createPageLink,
    editFolderLink,
    lang,
    ...props
  } = Astro2.props;
  const containerId = `folder-tree-${crypto.randomUUID()}`;
  const menuId = `${containerId}-menu`;
  const containerMenuId = `${containerId}-container-menu`;
  const sharedProps = {
    createFolderLink,
    createPageLink,
    editFolderLink,
    lang,
    ...props
  };
  const t = useTranslations(lang, "@studiocms/dashboard:file-tree-renderer");
  return renderTemplate`${renderComponent($$result, "folder-tree-container", "folder-tree-container", { "id": id, "class": className, "data-create-folder-link": createFolderLink, "data-create-page-link": createPageLink, "data-container-id": containerId, "data-container-menu-id": containerMenuId, "data-menu-id": menuId }, { "default": () => renderTemplate` ${maybeRenderHead()}<div${addAttribute(containerMenuId, "id")} class="folder-tree-container-menu"> <button class="container-menu-item" role="menuitem" data-action="collapse-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:minus-16-solid", "width": 14, "height": 14 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "collapse-all" }, { "default": () => renderTemplate` ${t("collapse-all")} ` })} </span> </button> <button class="container-menu-item" role="menuitem" data-action="expand-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:plus-16-solid", "width": 14, "height": 14 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "expand-all" }, { "default": () => renderTemplate` ${t("expand-all")} ` })} </span> </button> </div> ${renderComponent($$result, "FolderTreeNodeTree", $$FolderTreeNodeTree, { ...sharedProps })} ` })} <div${addAttribute(menuId, "id")} class="context-menu" role="menu"> <button class="context-menu-item" role="menuitem" data-action="create-folder"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "create-folder" }, { "default": () => renderTemplate` ${t("create-folder")} ` })} </span> </button> <button class="context-menu-item" role="menuitem" data-action="create-page"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:document-plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "create-page" }, { "default": () => renderTemplate` ${t("create-page")} ` })} </span> </button> <button class="context-menu-item" role="menuitem" data-action="collapse-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:minus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "collapse-all" }, { "default": () => renderTemplate` ${t("collapse-all")} ` })} </span> </button> <button class="context-menu-item" role="menuitem" data-action="expand-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-file-tree-renderer", "t-file-tree-renderer", { "key": "expand-all" }, { "default": () => renderTemplate` ${t("expand-all")} ` })} </span> </button> </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeRenderer.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeRenderer.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/foldertree/FolderTreeRenderer.astro", void 0);

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$ContentSearch = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ContentSearch;
  const { lang, treeRenderElId, searchOutputElId } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:content-sidebar");
  return renderTemplate`${maybeRenderHead()}<form id="search-form"${addAttribute(treeRenderElId, "data-tree-render-el-id")}${addAttribute(searchOutputElId, "data-search-output-el-id")}> ${renderComponent($$result, "Input", $$Input, { "name": "search", "placeholder": t("input-placeholder-search"), "type": "search", "required": true, "icon": "heroicons:magnifying-glass-16-solid" })} </form> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/ContentSearch.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/ContentSearch.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$InnerSidebarElement = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$InnerSidebarElement;
  const { lang } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:content-sidebar");
  const PageFolderTree = await runSDK(SDKCoreJs.GET.pageFolderTree());
  return renderTemplate`${maybeRenderHead()}<div class="inner-sidebar-header"> ${renderComponent($$result, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "md", "id": "back-to-outer", "class": "mobile-btn mid-size-btn" }, { "start-content": async ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:arrow-left", "width": 24, "height": 24, "slot": "start-content" })}` })} ${renderComponent($$result, "ContentSearch", $$ContentSearch, { "lang": lang, "treeRenderElId": "inner-sidebar-items", "searchOutputElId": "inner-sidebar-items-search" })} ${renderComponent($$result, "Dropdown", $$Dropdown, { "id": "create-new-dropdown", "options": [
    {
      label: t("dropdown-create-page"),
      icon: "heroicons:document",
      value: Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementCreate
    },
    {
      label: t("dropdown-create-folder"),
      icon: "heroicons:folder",
      value: Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementFolderCreate
    }
  ], "align": "end", "offset": 8 }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "md", "class": "add-button" }, { "start-content": async ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:plus", "width": 24, "height": 24, "slot": "start-content" })}` })} ` })} ${renderComponent($$result, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "md", "class": "mobile-btn", "id": "show-page" }, { "start-content": async ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:x-mark", "width": 24, "height": 24, "slot": "start-content" })}` })} </div> ${renderComponent($$result, "FolderTreeRenderer", $$FolderTreeRenderer, { "class": "scrollbar", "id": "inner-sidebar-items", "lang": lang, "data": PageFolderTree, "createFolderLink": Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementFolderCreate, "createPageLink": Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementCreate, "editFolderLink": Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementFolderEdit, "editPageLink": Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementEdit })} <div class="folder-tree-search-container scrollbar" id="inner-sidebar-items-search" style="display: none;"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.searchList, "data-searchlist")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementEdit, "data-editpage")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementFolderEdit, "data-editfolder")}></div> <div id="i-dropdown-options"${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementCreate, "data-createpage")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementFolderCreate, "data-createfolder")}></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/InnerSidebarElement.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/InnerSidebarElement.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$PageHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageHeader;
  const { editPage, createPage, createFolder, editFolder, lang } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:content-header");
  const title = t("title");
  let pageTitle = title;
  let pageSlug;
  let currentId = "";
  let folderName = "";
  let exists = false;
  let searched = false;
  const urlParams = Astro2.url.searchParams;
  async function getParams() {
    const editId = urlParams.get("edit");
    const folderId = urlParams.get("folder");
    if (folderId) {
      searched = true;
      const res = await runSDK(SDKCoreJs.GET.folderList());
      const folder = res.find((folder2) => folder2.id === folderId);
      if (editFolder && folder) {
        exists = true;
        pageTitle = `${folder.name}`;
        currentId = folder.id;
        folderName = folder.name;
      }
      return;
    }
    if (editId) {
      searched = true;
      exists = false;
      const res = await runSDK(SDKCoreJs.GET.page.byId(editId));
      if (!res) {
        return;
      }
      if (editPage && res) {
        pageTitle = `${res.title}`;
        pageSlug = res.slug;
        currentId = res.id;
        exists = true;
      }
    }
    return;
  }
  await getParams();
  function getCurrentMode() {
    const hasSearched = searched;
    const itemExists = exists;
    if (hasSearched && !itemExists) return "not-found";
    if (editFolder && editPage) return "edit-folder";
    if (editFolder) return "edit-folder";
    if (editPage) return "edit-page";
    if (createFolder) return "create-folder";
    if (createPage) return "create-page";
    return "none";
  }
  const currentMode = getCurrentMode();
  return renderTemplate`${maybeRenderHead()}<header class="page-header" data-astro-cid-7cv3ynj3> <div class="page-title-container" data-astro-cid-7cv3ynj3> ${renderComponent($$result, "Button", $$Button, { "color": "primary", "id": "nav-open", "class": "mobile-btn", "data-astro-cid-7cv3ynj3": true }, { "start-content": async ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:bars-3", "height": 24, "width": 24, "slot": "start-content", "data-astro-cid-7cv3ynj3": true })}` })} <h1 class="page-title"${addAttribute(Astro2.locals.StudioCMS.routeMap.sdk.pages, "data-link")} data-astro-cid-7cv3ynj3> ${currentMode === "none" ? renderTemplate`${renderComponent($$result, "t-content-header", "t-content-header", { "key": "title", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${pageTitle} ` })}` : currentMode === "edit-folder" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "t-content-header", "t-content-header", { "key": "edit-folder-title", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate`${t("edit-folder-title")}` })}: ${folderName}` })}` : currentMode === "edit-page" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "t-content-header", "t-content-header", { "key": "edit-page-title", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate`${t("edit-page-title")}` })}: ${pageTitle}` })}` : currentMode === "create-folder" ? renderTemplate`${renderComponent($$result, "t-content-header", "t-content-header", { "key": "create-folder-title", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("create-folder-title")} ` })}` : currentMode === "not-found" ? renderTemplate`${renderComponent($$result, "t-content-header", "t-content-header", { "key": "title", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${pageTitle} ` })}` : renderTemplate`${renderComponent($$result, "t-content-header", "t-content-header", { "key": "create-page-title", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("create-page-title")} ` })}`} </h1> </div> <div id="page-actions-container" class="page-actions-container" data-astro-cid-7cv3ynj3> ${editPage && renderTemplate`${renderComponent($$result, "Group", $$Group, { "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "id": "delete-page-modal-trigger", "color": "danger", "type": "submit", "size": "sm", "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:trash-20-solid", "width": 20, "height": 20, "data-astro-cid-7cv3ynj3": true })} ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-button", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-button")} ` })} ` })} ${renderComponent($$result2, "Button", $$Button, { "id": "edit-button", "variant": "solid", "size": "sm", "color": "primary", "type": "submit", "form": "edit-page-form", "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "save-button", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("save-button")} ` })} `, "start-content": async ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:check-20-solid", "width": 20, "height": 20, "data-astro-cid-7cv3ynj3": true })}` })} ` })}
      ${renderComponent($$result, "Modal", $$Modal, { "id": "delete-page-modal", "isForm": true, "cancelButton": { label: "Cancel", color: "default" }, "actionButton": { label: "Confirm", color: "danger" }, "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Center", $$Center, { "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate` <div class="modal-body" data-astro-cid-7cv3ynj3> <input type="hidden" name="page-id"${addAttribute(currentId, "value")} data-astro-cid-7cv3ynj3> <input type="hidden" name="page-slug"${addAttribute(pageSlug, "value")} data-astro-cid-7cv3ynj3> <input type="hidden" name="action-route"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.content.page, "value")} data-astro-cid-7cv3ynj3> <span data-astro-cid-7cv3ynj3>${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-modal-desc-1", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-modal-desc-1")} ` })} <code data-astro-cid-7cv3ynj3>${pageSlug}</code> ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-modal-desc-2", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-modal-desc-2")} ` })}</span> ${renderComponent($$result3, "Input", $$Input, { "name": "slug-confirm", "placeholder": `${pageSlug?.slice(0, pageSlug.length - 2)}...`, "isRequired": true, "data-astro-cid-7cv3ynj3": true })} <span style="color: var(--danger-base)" data-astro-cid-7cv3ynj3>${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-modal-warning", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-modal-warning")} ` })}</span> </div> ` })} `, "header": async ($$result2) => renderTemplate`<h2 data-astro-cid-7cv3ynj3> ${renderComponent($$result2, "t-content-header", "t-content-header", { "key": "delete-modal-header", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-modal-header")} ` })} </h2>` })}`} ${editFolder && renderTemplate`${renderComponent($$result, "Group", $$Group, { "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "id": "delete-folder-modal-trigger", "color": "danger", "type": "submit", "size": "sm", "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:trash-20-solid", "width": 20, "height": 20, "data-astro-cid-7cv3ynj3": true })} ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-button", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-button")} ` })} ` })} ${renderComponent($$result2, "Button", $$Button, { "id": "edit-button", "variant": "solid", "size": "sm", "color": "primary", "type": "submit", "form": "edit-folder-form", "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "save-button", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("save-button")} ` })} `, "start-content": async ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:check-20-solid", "width": 20, "height": 20, "data-astro-cid-7cv3ynj3": true })}` })} ` })}
      ${renderComponent($$result, "Modal", $$Modal, { "id": "delete-folder-modal", "isForm": true, "cancelButton": { label: "Cancel", color: "default" }, "actionButton": { label: "Delete", color: "danger" }, "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Center", $$Center, { "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate` <div class="modal-body" data-astro-cid-7cv3ynj3> <input type="hidden" name="folder-id"${addAttribute(currentId, "value")} data-astro-cid-7cv3ynj3> <input type="hidden" name="folder-name"${addAttribute(folderName, "value")} data-astro-cid-7cv3ynj3> <input type="hidden" name="action-route"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.content.folder, "value")} data-astro-cid-7cv3ynj3> <span data-astro-cid-7cv3ynj3>${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-folder-modal-desc-1", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-folder-modal-desc-1")} ` })} <code data-astro-cid-7cv3ynj3>${folderName}</code> ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-folder-modal-desc-2", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-folder-modal-desc-2")} ` })}</span> ${renderComponent($$result3, "Input", $$Input, { "name": "confirm-folder-name", "placeholder": `${folderName.slice(0, folderName.length - 2)}...`, "isRequired": true, "data-astro-cid-7cv3ynj3": true })} <span style="color: var(--danger-base)" data-astro-cid-7cv3ynj3>${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "delete-modal-warning", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-modal-warning")} ` })}</span> </div> ` })} `, "header": async ($$result2) => renderTemplate`<h2 data-astro-cid-7cv3ynj3> ${renderComponent($$result2, "t-content-header", "t-content-header", { "key": "delete-modal-header", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("delete-modal-header")} ` })} </h2>` })}`} ${createFolder && renderTemplate`${renderComponent($$result, "Button", $$Button, { "id": "edit-button", "variant": "solid", "size": "sm", "color": "primary", "type": "submit", "form": "create-folder-form", "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "t-content-header", "t-content-header", { "key": "create-button", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("create-button")} ` })} `, "start-content": async ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:check-20-solid", "width": 20, "height": 20, "data-astro-cid-7cv3ynj3": true })}` })}`} ${createPage && renderTemplate`${renderComponent($$result, "Group", $$Group, { "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "id": "draft-button", "variant": "outlined", "size": "sm", "color": "primary", "type": "submit", "form": "page-create-form", "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "draft-button", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("draft-button")} ` })} `, "start-content": async ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:document-text-20-solid", "width": 20, "height": 20, "data-astro-cid-7cv3ynj3": true })}` })} ${renderComponent($$result2, "Button", $$Button, { "id": "publish-button", "variant": "solid", "size": "sm", "color": "primary", "type": "submit", "form": "page-create-form", "data-astro-cid-7cv3ynj3": true }, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "t-content-header", "t-content-header", { "key": "publish-button", "data-astro-cid-7cv3ynj3": true }, { "default": () => renderTemplate` ${t("publish-button")} ` })} `, "start-content": async ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "start-content", "name": "heroicons:check-20-solid", "width": 20, "height": 20, "data-astro-cid-7cv3ynj3": true })}` })} ` })}`} </div> </header> <div id="current-mode-selector" style="display: none;"${addAttribute(currentMode, "data-mode")} data-astro-cid-7cv3ynj3></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/PageHeader.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/PageHeader.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/PageHeader.astro", void 0);

export { $$PageHeader as $, $$InnerSidebarElement as a };
