import { a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead, b as addAttribute, r as renderScript, c as createAstro, F as Fragment, f as renderSlot } from './astro/server_D64VbtqW.mjs';
import { u as useTranslations } from './Divider_D5DMoGSW.mjs';
import { $ as $$Icon, a as $$Button, b as $$Dropdown } from './LanguageSelector_D2Mp70Tp.mjs';
import { r as runSDK, S as SDKCoreJs } from './index_DmoCs122.mjs';
import { Effect } from 'effect';
import { a as $$TabItem, $ as $$Tabs } from './TabItem_D9zl4WlC.mjs';
import { c as categoriesToTaxonomyNodes, t as tagsToTaxonomyNodes } from './shared_M7agDqrl.mjs';
import { $ as $$Input } from './Input_mJ0hT4yn.mjs';
/* empty css                              */
import { a as $$Center, $ as $$Modal } from './Modal_B-agW0rH.mjs';
import { a as $$Group, $ as $$DashboardLayout } from './DashboardLayout_BmXXNyyD.mjs';

const $$Astro$7 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$TaxonomyTreeLeaf = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$TaxonomyTreeLeaf;
  const { node, depth = 0, baseTagLink = "/", baseCategoryLink = "/", lang } = Astro2.props;
  const href = node.type === "category" ? baseCategoryLink : baseTagLink;
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-tree-renderer");
  return renderTemplate`${renderComponent($$result, "taxonomy-tree-leaf", "taxonomy-tree-leaf", { "data-node-id": `taxonomy-${node.type}-${node.id}`, "data-taxonomy-id": node.id, "data-taxonomy-type": node.type, "data-depth": depth, "data-href": href, "data-create-category-link": baseCategoryLink, "class": "tree-leaf", "role": "treeitem", "tabindex": "0" }, { "default": () => renderTemplate` ${node.type === "category" ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder", "class": "leaf-icon default", "width": 20, "height": 20 })}
            ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-solid", "class": "leaf-icon active", "width": 20, "height": 20 })}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:tag", "class": "leaf-icon default", "width": 20, "height": 20 })}
            ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:tag-solid", "class": "leaf-icon active", "width": 20, "height": 20 })}`} ${maybeRenderHead()}<span class="tree-leaf-label">${node.name}</span> ` })} <div${addAttribute(`taxonomy-${node.type}-${node.id}-context-menu`, "id")} class="context-menu" role="menu"> <button class="context-menu-item" role="menuitem" data-action="edit"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:pencil", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-leaf", "t-taxonomy-tree-leaf", { "key": node.type === "category" ? "edit-category" : "edit-tag" }, { "default": () => renderTemplate` ${t(node.type === "category" ? "edit-category" : "edit-tag")} ` })} </span> </button> ${node.type === "category" && renderTemplate`<button class="context-menu-item" role="menuitem" data-action="create-subcategory"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-leaf", "t-taxonomy-tree-leaf", { "key": "create-sub-category" }, { "default": () => renderTemplate` ${t("create-sub-category")} ` })} </span> </button>`} </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeLeaf.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeLeaf.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeLeaf.astro", void 0);

const $$Astro$6 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$TaxonomyTreeNode = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$TaxonomyTreeNode;
  const { baseTagLink = "/", baseCategoryLink = "/", node, depth = 0, lang } = Astro2.props;
  const nodeId = `taxonomy-${node.type}-${node.id}`;
  const contentId = `content-${nodeId}`;
  const href = node.type === "category" ? baseCategoryLink : baseTagLink;
  const hasChildren = node.children.length > 0;
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-tree-renderer");
  return renderTemplate`${renderComponent($$result, "taxonomy-tree-node", "taxonomy-tree-node", { "data-node-id": nodeId, "data-depth": depth, "data-href": href, "data-taxonomy-id": node.id, "data-taxonomy-type": node.type, "data-create-category-link": baseCategoryLink, "data-has-children": hasChildren, "class": "tree-node", "role": "treeitem", "aria-expanded": "false" }, { "default": () => renderTemplate` ${maybeRenderHead()}<div${addAttribute(`${nodeId}-tree-node-header`, "id")} class="tree-node-header"> ${hasChildren && renderTemplate`<button${addAttribute(`${nodeId}-tree-node-toggle`, "id")} class="tree-node-toggle" type="button"${addAttribute(contentId, "aria-controls")}${addAttribute(`Toggle ${node.name}`, "aria-label")}>  </button>`} <div class="tree-node-content"> ${node.type === "category" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:folder", "class": "folder-icon closed", "width": 20, "height": 20 })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:folder-open", "class": "folder-icon open", "width": 20, "height": 20 })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:folder-open-solid", "class": "folder-icon selected", "width": 20, "height": 20 })} ` })}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:tag", "class": "folder-icon", "width": 20, "height": 20 })}`} <span class="tree-node-label">${node.name}</span> <button${addAttribute(`${nodeId}-tree-node-menu-trigger`, "id")} class="tree-node-menu-trigger" type="button"${addAttribute(`Open menu for ${node.name}`, "aria-label")} aria-haspopup="menu"${addAttribute(`${nodeId}-context-menu`, "aria-controls")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:ellipsis-vertical", "width": 16, "height": 16 })} </button> </div> </div> ${hasChildren && renderTemplate`<div class="tree-node-children"${addAttribute(contentId, "id")}> <div class="tree-node-children-inner"> ${renderSlot($$result, $$slots["default"])} </div> </div>`} <div${addAttribute(`${nodeId}-context-menu`, "id")} class="context-menu" role="menu"> <button class="context-menu-item" role="menuitem" data-action="edit"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:pencil", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-node", "t-taxonomy-tree-node", { "key": node.type === "category" ? "edit-category" : "edit-tag" }, { "default": () => renderTemplate` ${t(node.type === "category" ? "edit-category" : "edit-tag")} ` })} </span> </button> ${node.type === "category" && renderTemplate`<button class="context-menu-item" role="menuitem" data-action="create-subcategory"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-node", "t-taxonomy-tree-node", { "key": "create-sub-category" }, { "default": () => renderTemplate` ${t("create-sub-category")} ` })} </span> </button>`} </div> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeNode.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeNode.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeNode.astro", void 0);

const $$Astro$5 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$TaxonomyTreeNodeTree = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$TaxonomyTreeNodeTree;
  const { data, depth = 0, ...props } = Astro2.props;
  function sortTree(data2) {
    return data2.map((node) => ({
      ...node,
      children: sortTree(node.children)
    })).sort((a, b) => a.name.localeCompare(b.name));
  }
  const sortedData = sortTree(data);
  return renderTemplate`${sortedData.map(
    (node) => node.children.length === 0 ? renderTemplate`${renderComponent($$result, "TaxonomyTreeLeaf", $$TaxonomyTreeLeaf, { "node": node, "depth": depth, ...props })}` : renderTemplate`${renderComponent($$result, "TaxonomyTreeNode", $$TaxonomyTreeNode, { "node": node, "depth": depth, ...props }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Astro.self", Astro2.self, { "data": node.children, "depth": depth + 1, ...props })}` })}`
  )}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeNodeTree.astro", void 0);

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$TaxonomyTreeRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TaxonomyTreeRenderer;
  const {
    type,
    baseTagLink = "/",
    baseCategoryLink = "/",
    id,
    class: className,
    lang,
    ...props
  } = Astro2.props;
  const containerId = `taxonomy-tree-${type}-${crypto.randomUUID()}`;
  const menuId = `${containerId}-menu`;
  const containerMenuId = `${containerId}-container-menu`;
  const sharedProps = {
    baseCategoryLink,
    baseTagLink,
    lang,
    ...props
  };
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-tree-renderer");
  return renderTemplate`${renderComponent($$result, "taxonomy-tree-container", "taxonomy-tree-container", { "data-type": type, "data-create-link": type === "category" ? baseCategoryLink : baseTagLink, "data-container-id": containerId, "data-container-menu-id": containerMenuId, "data-menu-id": menuId, "id": id, "class": className }, { "default": () => renderTemplate` ${type === "category" && renderTemplate`${maybeRenderHead()}<div${addAttribute(containerMenuId, "id")} class="folder-tree-container-menu"> <button class="container-menu-item" role="menuitem" data-action="collapse-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:minus-16-solid", "width": 12, "height": 12 })} <span> ${renderComponent($$result, "t-taxonomy-tree-renderer", "t-taxonomy-tree-renderer", { "key": "collapse-all" }, { "default": () => renderTemplate` ${t("collapse-all")} ` })} </span> </button> <button class="container-menu-item" role="menuitem" data-action="expand-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:plus-16-solid", "width": 12, "height": 12 })} <span> ${renderComponent($$result, "t-taxonomy-tree-renderer", "t-taxonomy-tree-renderer", { "key": "expand-all" }, { "default": () => renderTemplate` ${t("expand-all")} ` })} </span> </button> </div>`} ${renderComponent($$result, "TaxonomyTreeNodeTree", $$TaxonomyTreeNodeTree, { ...sharedProps })} ` })} <div${addAttribute(menuId, "id")} class="context-menu" role="menu"> ${type === "category" && renderTemplate`<button class="context-menu-item" role="menuitem" data-action="create-category"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:folder-plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-renderer", "t-taxonomy-tree-renderer", { "key": "create-category" }, { "default": () => renderTemplate` ${t("create-category")} ` })} </span> </button>`} ${type === "tag" && renderTemplate`<button class="context-menu-item" role="menuitem" data-action="create-tag"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:tag", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-renderer", "t-taxonomy-tree-renderer", { "key": "create-tag" }, { "default": () => renderTemplate` ${t("create-tag")} ` })} </span> </button>`} ${type === "category" && renderTemplate`<button class="context-menu-item" role="menuitem" data-action="collapse-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:minus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-renderer", "t-taxonomy-tree-renderer", { "key": "collapse-all" }, { "default": () => renderTemplate` ${t("collapse-all")} ` })} </span> </button>
            <button class="context-menu-item" role="menuitem" data-action="expand-all"> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:plus", "width": 16, "height": 16 })} <span> ${renderComponent($$result, "t-taxonomy-tree-renderer", "t-taxonomy-tree-renderer", { "key": "expand-all" }, { "default": () => renderTemplate` ${t("expand-all")} ` })} </span> </button>`} </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeRenderer.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeRenderer.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/taxonomy/TaxonomyTreeRenderer.astro", void 0);

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$TaxonomySearch = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TaxonomySearch;
  const { lang, treeRenderElId, searchOutputElId } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:content-sidebar");
  return renderTemplate`${maybeRenderHead()}<form id="taxonomy-search-form"${addAttribute(treeRenderElId, "data-tree-render-el-id")}${addAttribute(searchOutputElId, "data-search-output-el-id")}> ${renderComponent($$result, "Input", $$Input, { "name": "taxonomy-search", "placeholder": t("input-placeholder-search"), "type": "search", "required": true, "icon": "heroicons:magnifying-glass-16-solid" })} </form> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/TaxonomySearch.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/TaxonomySearch.astro", void 0);

function appendQueryParamsToPath(path, params) {
  const url = new URL(path, "http://example.com");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }
  return url.pathname + url.search;
}

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$InnerSidebarElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$InnerSidebarElement;
  const { lang, categories, tags } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-sidebar");
  const categoryData = categoriesToTaxonomyNodes(categories);
  const tagData = tagsToTaxonomyNodes(tags);
  return renderTemplate`${maybeRenderHead()}<div class="inner-sidebar-header" data-astro-cid-i26w427y> ${renderComponent($$result, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "md", "id": "back-to-outer", "class": "mobile-btn mid-size-btn", "data-astro-cid-i26w427y": true }, { "start-content": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:arrow-left", "width": 24, "height": 24, "slot": "start-content", "data-astro-cid-i26w427y": true })}` })} ${renderComponent($$result, "TaxonomySearch", $$TaxonomySearch, { "lang": lang, "treeRenderElId": "inner-sidebar-items", "searchOutputElId": "inner-sidebar-items-search", "data-astro-cid-i26w427y": true })} ${renderComponent($$result, "Dropdown", $$Dropdown, { "id": "taxonomy-create-new", "options": [
    {
      label: t("dropdown-create-category"),
      icon: "heroicons:folder",
      value: appendQueryParamsToPath(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyCategories, { mode: "create" })
    },
    {
      label: t("dropdown-create-tag"),
      icon: "heroicons:tag",
      value: appendQueryParamsToPath(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyTags, { mode: "create" })
    }
  ], "align": "end", "offset": 8, "data-astro-cid-i26w427y": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "md", "class": "add-button", "data-astro-cid-i26w427y": true }, { "start-content": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:plus", "width": 24, "height": 24, "slot": "start-content", "data-astro-cid-i26w427y": true })}` })} ` })} ${renderComponent($$result, "Button", $$Button, { "variant": "solid", "color": "primary", "size": "md", "class": "mobile-btn", "id": "show-page", "data-astro-cid-i26w427y": true }, { "start-content": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:x-mark", "width": 24, "height": 24, "slot": "start-content", "data-astro-cid-i26w427y": true })}` })} </div> <div id="inner-sidebar-items" data-astro-cid-i26w427y> ${renderComponent($$result, "Tabs", $$Tabs, { "storage": "persistent", "syncKey": "taxonomy-selection", "variant": "starlight", "data-astro-cid-i26w427y": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TabItem", $$TabItem, { "id": "categories-tab", "label": t("tab-label-categories"), "icon": "heroicons:folder", "data-astro-cid-i26w427y": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "TaxonomyTreeRenderer", $$TaxonomyTreeRenderer, { "type": "category", "class": "scrollbar", "id": "categories-tree-renderer", "baseCategoryLink": Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyCategories, "baseTagLink": Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyTags, "data": categoryData, "lang": lang, "data-astro-cid-i26w427y": true })} ` })} ${renderComponent($$result2, "TabItem", $$TabItem, { "id": "tags-tab", "label": t("tab-label-tags"), "icon": "heroicons:tag", "data-astro-cid-i26w427y": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "TaxonomyTreeRenderer", $$TaxonomyTreeRenderer, { "type": "tag", "class": "scrollbar", "id": "tags-tree-renderer", "baseCategoryLink": Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyCategories, "baseTagLink": Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyTags, "data": tagData, "lang": lang, "data-astro-cid-i26w427y": true })} ` })} ` })} </div> <div id="inner-sidebar-items-search" class="folder-tree-search-container scrollbar" style="display: none;"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.taxonomySearch, "data-searchlist")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyCategories, "data-base-category-link")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyTags, "data-base-tag-link")} data-astro-cid-i26w427y>  </div> <div id="i-dropdown-options" style="display: none;"${addAttribute(appendQueryParamsToPath(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyCategories, { mode: "create" }), "data-create-category")}${addAttribute(appendQueryParamsToPath(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomyTags, { mode: "create" }), "data-create-tag")} data-astro-cid-i26w427y></div>   ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/InnerSidebarElement.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/InnerSidebarElement.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/InnerSidebarElement.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$PageHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PageHeader;
  const { lang, type, mode, pageTitle = "", pageId = "", pageSlug = "" } = Astro2.props;
  if (["categories", "tags"].includes(type) && !mode) {
    throw new Error("Mode is required when type is categories or tags");
  }
  if (["categories", "tags"].includes(type) && mode === "edit" && !pageTitle) {
    throw new Error("pageTitle is required when type is categories or tags and mode is edit");
  }
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-header");
  const replaceNameParam = (str) => str.replace("{name}", pageTitle);
  return renderTemplate`${renderComponent($$result, "tabs-context-updater", "tabs-context-updater", { "type": type, "data-astro-cid-rvfno4ia": true })} ${maybeRenderHead()}<header class="page-header" data-astro-cid-rvfno4ia> <div class="page-title-container" id="page-header-data"${addAttribute(pageTitle, "data-page-title")}${addAttribute(
    type === "tags" && mode === "edit" ? "tags.edit-title" : type === "categories" && mode === "edit" ? "categories.edit-title" : "",
    "data-title-translation-key"
  )}${addAttribute(type, "data-type")}${addAttribute(mode, "data-mode")} data-astro-cid-rvfno4ia> ${renderComponent($$result, "Button", $$Button, { "color": "primary", "id": "nav-open", "class": "mobile-btn", "data-astro-cid-rvfno4ia": true }, { "start-content": async ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:bars-3", "height": 24, "width": 24, "slot": "start-content", "data-astro-cid-rvfno4ia": true })}` })} <h1 id="page-title" class="page-title" data-astro-cid-rvfno4ia> ${type === "index" && renderTemplate`${renderComponent($$result, "t-taxonomy-header", "t-taxonomy-header", { "key": "index.title", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate`${t("index.title")}` })}`} ${type === "categories" && mode === "create" && renderTemplate`${renderComponent($$result, "t-taxonomy-header", "t-taxonomy-header", { "key": "categories.create-title", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate`${t("categories.create-title")}` })}`} ${type === "tags" && mode === "create" && renderTemplate`${renderComponent($$result, "t-taxonomy-header", "t-taxonomy-header", { "key": "tags.create-title", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate`${t("tags.create-title")}` })}`} ${type === "tags" && mode === "edit" && replaceNameParam(t("tags.edit-title"))} ${type === "categories" && mode === "edit" && replaceNameParam(t("categories.edit-title"))} </h1> </div> <div id="page-actions-container" class="page-actions-container" data-astro-cid-rvfno4ia> ${mode === "edit" && renderTemplate`${renderComponent($$result, "Group", $$Group, { "data-astro-cid-rvfno4ia": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Button", $$Button, { "form": type === "categories" ? "category-form" : type === "tags" ? "tag-form" : "", "variant": "outlined", "color": "danger", "id": "delete-taxonomy-entry-btn", "type": "button", "data-astro-cid-rvfno4ia": true }, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "t-taxonomy-header", "t-taxonomy-header", { "key": "delete-button", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate`${t("delete-button")}` })} `, "start-content": async ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:trash", "width": 20, "height": 20, "slot": "start-content", "data-astro-cid-rvfno4ia": true })}` })} ${renderComponent($$result2, "Button", $$Button, { "form": type === "categories" ? "category-form" : type === "tags" ? "tag-form" : "", "variant": "solid", "color": "primary", "id": "save-taxonomy-entry-btn", "type": "submit", "data-astro-cid-rvfno4ia": true }, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "t-taxonomy-header", "t-taxonomy-header", { "key": "save-button", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate`${t("save-button")}` })} `, "start-content": async ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:check-circle", "width": 20, "height": 20, "slot": "start-content", "data-astro-cid-rvfno4ia": true })}` })} ` })}
                ${renderComponent($$result, "Modal", $$Modal, { "id": "delete-taxonomy-modal", "isForm": true, "cancelButton": { label: "Cancel", color: "default" }, "actionButton": { label: "Delete", color: "danger" }, "data-astro-cid-rvfno4ia": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Center", $$Center, { "data-astro-cid-rvfno4ia": true }, { "default": async ($$result3) => renderTemplate` <div class="modal-body" data-astro-cid-rvfno4ia> <input type="hidden" name="type"${addAttribute(type, "value")} data-astro-cid-rvfno4ia> <input type="hidden" name="id"${addAttribute(pageId, "value")} data-astro-cid-rvfno4ia> <input type="hidden" name="slug"${addAttribute(pageSlug, "value")} data-astro-cid-rvfno4ia> <input type="hidden" name="action-route"${addAttribute(Astro2.locals.StudioCMS.routeMap.endpointLinks.taxonomy, "value")} data-astro-cid-rvfno4ia> <span data-astro-cid-rvfno4ia> ${renderComponent($$result3, "t-text-replacer", "t-text-replacer", { "key": "delete-modal-desc-1", "replace-param": "{slug}", "replace-value": pageSlug, "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate` ${t("delete-modal-desc-1").replace("{slug}", pageSlug)} ` })} ${renderComponent($$result3, "t-taxonomy-header", "t-taxonomy-header", { "key": "delete-modal-desc-2", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate` ${t("delete-modal-desc-2")} ` })} </span> ${renderComponent($$result3, "Input", $$Input, { "name": "confirm-slug", "placeholder": `${pageSlug.slice(0, pageSlug.length - 2)}...`, "label": t("delete-modal-input-label"), "required": true, "data-astro-cid-rvfno4ia": true })} <span style="color: var(--danger-base)" data-astro-cid-rvfno4ia> ${renderComponent($$result3, "t-taxonomy-header", "t-taxonomy-header", { "key": "delete-modal-warning", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate` ${t("delete-modal-warning")} ` })} </span> </div> ` })} `, "header": async ($$result2) => renderTemplate`<h2 data-astro-cid-rvfno4ia> ${renderComponent($$result2, "t-text-replacer", "t-text-replacer", { "key": "delete-modal-header", "replace-param": "{type}", "replace-value": type === "categories" ? "delete-modal-type-category" : "delete-modal-type-tag", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate` ${replaceNameParam(t("delete-modal-header").replace("{type}", type === "categories" ? t("delete-modal-type-category") : t("delete-modal-type-tag")))} ` })} </h2>` })}`} ${mode === "create" && renderTemplate`${renderComponent($$result, "Button", $$Button, { "form": type === "categories" ? "category-form" : type === "tags" ? "tag-form" : "", "variant": "solid", "color": "primary", "id": "create-taxonomy-entry-btn", "type": "submit", "data-astro-cid-rvfno4ia": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "t-taxonomy-header", "t-taxonomy-header", { "key": "create-button", "data-astro-cid-rvfno4ia": true }, { "default": () => renderTemplate`${t("create-button")}` })} `, "start-content": async ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:plus-circle", "width": 20, "height": 20, "slot": "start-content", "data-astro-cid-rvfno4ia": true })}` })}`} </div> </header> <div id="current-mode-selector" style="display: none;"${addAttribute(`${mode}-${type}`, "data-mode")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomy, "data-index")} data-astro-cid-rvfno4ia></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/PageHeader.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/PageHeader.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/PageHeader.astro?astro&type=script&index=2&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/taxonomy/PageHeader.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$TaxonomyLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TaxonomyLayout;
  const { type } = Astro2.props;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:taxonomy-index");
  const searchParams = Astro2.url.searchParams;
  const mode = searchParams.get("mode") ?? void 0;
  const editId = searchParams.get("edit") ?? void 0;
  const parsedEditId = editId ? Number.parseInt(editId, 10) : void 0;
  const parentId = searchParams.get("parent") ? Number.parseInt(searchParams.get("parent"), 10) : void 0;
  const [allCategories, allTags] = await runSDK(
    Effect.all([SDKCoreJs.GET.categories.getAll(), SDKCoreJs.GET.tags.getAll()])
  );
  let pageTitle;
  let currentCategory;
  let currentTag;
  if (type === "categories" && mode === "edit") {
    currentCategory = allCategories.find((cat) => cat.id === parsedEditId);
    pageTitle = currentCategory ? currentCategory.name : void 0;
    if (!currentCategory) {
      throw new Error("Category to edit not found");
    }
  }
  if (type === "tags" && mode === "edit") {
    currentTag = allTags.find((tag) => tag.id === parsedEditId);
    pageTitle = currentTag ? currentTag.name : void 0;
    if (!currentTag) {
      throw new Error("Tag to edit not found");
    }
  }
  let currentEntry;
  if (type === "categories") {
    currentEntry = currentCategory;
  } else if (type === "tags") {
    currentEntry = currentTag;
  } else {
    currentEntry = void 0;
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "editor", "sidebar": "double", "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-6hvlm7hw": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div id="current-taxonomy-entry-data"${addAttribute(type, "data-type")}${addAttribute(mode ?? "", "data-mode")}${addAttribute(JSON.stringify(currentEntry ?? {}), "data-current-entry")}${addAttribute(parentId ?? "", "data-parent-id")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.taxonomy, "data-redirect")} data-astro-cid-6hvlm7hw></div> ${renderSlot($$result2, $$slots["default"])} `, "double-sidebar": async ($$result2) => renderTemplate`<div class="inner-sidebar-container" data-astro-cid-6hvlm7hw> <div class="sidebar-links-container" data-astro-cid-6hvlm7hw> ${renderComponent($$result2, "InnerSidebarElement", $$InnerSidebarElement, { "lang": lang, "categories": allCategories, "tags": allTags, "data-astro-cid-6hvlm7hw": true })} </div> </div>`, "header": async ($$result2) => renderTemplate`<div data-astro-cid-6hvlm7hw> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "lang": lang, "mode": mode, "pageTitle": pageTitle, "type": type, "pageId": currentEntry ? String(currentEntry.id) : void 0, "pageSlug": currentEntry ? currentEntry.slug : void 0, "data-astro-cid-6hvlm7hw": true })} </div>` })}  ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/layouts/TaxonomyLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/layouts/TaxonomyLayout.astro", void 0);

export { $$TaxonomyLayout as $ };
