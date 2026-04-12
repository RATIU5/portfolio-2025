import { a as createComponent, m as maybeRenderHead, b as addAttribute, e as renderComponent, d as renderTemplate, c as createAstro } from './astro/server_D64VbtqW.mjs';
import { r as runSDK, S as SDKCoreJs } from './index_DmoCs122.mjs';
import { $ as $$Card } from './Card_DjFryfeQ.mjs';
import { $ as $$Icon } from './LanguageSelector_D2Mp70Tp.mjs';
/* empty css                         */
import { Effect } from 'effect';
import { $ as $$FormattedDate } from './BaseLayout_Dwmia_ez.mjs';
import { c as $$Badge } from './DashboardLayout_BmXXNyyD.mjs';
import { a as $$Center } from './Modal_B-agW0rH.mjs';
import { c as config } from './consts_CvAQFK6n.mjs';
import { $ as $$SSRUser } from './SSRUser_mXPz4_Au.mjs';

const allowedIdentifiers = [
  "studiocms/markdown",
  "studiocms/html",
  "studiocms/mdx",
  "studiocms/markdoc",
  "studiocms/wysiwyg"
];
function withinLast30Days(date) {
  const now = /* @__PURE__ */ new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  return date > thirtyDaysAgo;
}
function sortByDate(a, b, desc) {
  if (!a && !b) {
    return 0;
  }
  if (!a) {
    a = /* @__PURE__ */ new Date(0);
  }
  if (!b) {
    b = /* @__PURE__ */ new Date(0);
  }
  return b.getTime() - a.getTime();
}

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Totals = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Totals;
  const [allPages, totalUsers] = await runSDK(
    Effect.all([SDKCoreJs.GET.pages(true), SDKCoreJs.GET.users.all()])
  );
  const totalPages = allPages.filter((page) => allowedIdentifiers.includes(page.package));
  const totalDraftPages = totalPages.filter((page) => page.draft === true);
  const genericTranslationProps = {
    plugin: "studiocms",
    component: "overview"
  };
  return renderTemplate`${maybeRenderHead()}<div class="totals-grid-item-container" data-astro-cid-oj64bs2w> <div class="totals-grid-item" data-astro-cid-oj64bs2w> <a${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagement, "href")} data-astro-cid-oj64bs2w> ${renderComponent($$result, "Card", $$Card, { "class": "totals-grid-item-card", "data-astro-cid-oj64bs2w": true }, { "default": async ($$result2) => renderTemplate` <div class="totals-grid-item-content" data-astro-cid-oj64bs2w> ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:document-text", "height": 24, "width": 24, "data-astro-cid-oj64bs2w": true })} <div class="totals-grid-item-text" data-astro-cid-oj64bs2w> <span class="totals-grid-item-label" data-astro-cid-oj64bs2w>${renderComponent($$result2, "p-translations", "p-translations", { ...genericTranslationProps, "key": "total-pages", "data-astro-cid-oj64bs2w": true }, { "default": () => renderTemplate`Total Pages` })}</span> <span data-astro-cid-oj64bs2w>${totalPages.length}</span> </div> </div> ` })} </a> </div> <div class="totals-grid-item" data-astro-cid-oj64bs2w> <a${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagement, "href")} data-astro-cid-oj64bs2w> ${renderComponent($$result, "Card", $$Card, { "class": "totals-grid-item-card", "data-astro-cid-oj64bs2w": true }, { "default": async ($$result2) => renderTemplate` <div class="totals-grid-item-content" data-astro-cid-oj64bs2w> ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:document", "height": 24, "width": 24, "data-astro-cid-oj64bs2w": true })} <div class="totals-grid-item-text" data-astro-cid-oj64bs2w> <span class="totals-grid-item-label" data-astro-cid-oj64bs2w>${renderComponent($$result2, "p-translations", "p-translations", { ...genericTranslationProps, "key": "draft-pages", "data-astro-cid-oj64bs2w": true }, { "default": () => renderTemplate`Draft Pages` })}</span> <span data-astro-cid-oj64bs2w>${totalDraftPages.length}</span> </div> </div> ` })} </a> </div> <div class="totals-grid-item" data-astro-cid-oj64bs2w> <a${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.userManagement, "href")} data-astro-cid-oj64bs2w> ${renderComponent($$result, "Card", $$Card, { "class": "totals-grid-item-card", "data-astro-cid-oj64bs2w": true }, { "default": async ($$result2) => renderTemplate` <div class="totals-grid-item-content" data-astro-cid-oj64bs2w> ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:user-group", "height": 24, "width": 24, "data-astro-cid-oj64bs2w": true })} <div class="totals-grid-item-text" data-astro-cid-oj64bs2w> <span class="totals-grid-item-label" data-astro-cid-oj64bs2w>${renderComponent($$result2, "p-translations", "p-translations", { ...genericTranslationProps, "key": "total-users", "data-astro-cid-oj64bs2w": true }, { "default": () => renderTemplate`Total Users` })}</span> <span data-astro-cid-oj64bs2w>${totalUsers.length}</span> </div> </div> ` })} </a> </div> </div> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Totals.astro", void 0);

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$RecentlyUpdatedPages = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$RecentlyUpdatedPages;
  const allPages = await runSDK(SDKCoreJs.GET.pages(true));
  const totalPages = allPages.map((page) => page).filter((page) => allowedIdentifiers.includes(page.package));
  const recentlyUpdatedPages = totalPages.filter((page) => withinLast30Days(page.updatedAt || page.publishedAt)).sort((a, b) => sortByDate(a.updatedAt || a.publishedAt, b.updatedAt || b.publishedAt)).slice(0, 3);
  const genericTranslationProps = {
    plugin: "studiocms",
    component: "recently-updated-pages"
  };
  return renderTemplate`${maybeRenderHead()}<div class="recently-updated-page-container" data-astro-cid-qtskdrxd> ${recentlyUpdatedPages.length > 0 ? recentlyUpdatedPages.map((page) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "fullWidth": true, "class": "recently-updated-page-card", "as": "a", "href": Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementEdit + `?edit=${page.id}`, "data-astro-cid-qtskdrxd": true }, { "default": async ($$result2) => renderTemplate` <div class="card-row" data-astro-cid-qtskdrxd> <span class="card-title" data-astro-cid-qtskdrxd>${page.title} ${page.draft && renderTemplate`${renderComponent($$result2, "Badge", $$Badge, { "label": "Draft", "size": "sm", "variant": "flat", "rounding": "semi", "data-astro-cid-qtskdrxd": true })}`}</span> <span class="card-date" data-astro-cid-qtskdrxd>${renderComponent($$result2, "p-translations", "p-translations", { ...genericTranslationProps, "key": "edited", "data-astro-cid-qtskdrxd": true }, { "default": () => renderTemplate`Edited:` })} ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": page.updatedAt || page.publishedAt, "data-astro-cid-qtskdrxd": true })}</span> </div> <div class="card-row" data-astro-cid-qtskdrxd> <span class="card-description" data-astro-cid-qtskdrxd>${page.description}</span> </div> ` })}`) : renderTemplate`${renderComponent($$result, "Card", $$Card, { "fullWidth": true, "style": "background-color: var(--background-step-2);", "data-astro-cid-qtskdrxd": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "data-astro-cid-qtskdrxd": true }, { "default": async ($$result3) => renderTemplate`<span style="color: var(--text-muted);" data-astro-cid-qtskdrxd>${renderComponent($$result3, "p-translations", "p-translations", { ...genericTranslationProps, "key": "no-pages-found", "data-astro-cid-qtskdrxd": true }, { "default": () => renderTemplate`No recently updated pages found.` })}</span>` })} ` })}`} </div> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Recently-updated-pages.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$RecentlySignedUp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RecentlySignedUp;
  const totalUsers = await runSDK(SDKCoreJs.GET.users.all());
  const recentlyCreatedUsers = totalUsers.sort((a, b) => sortByDate(a.createdAt, b.createdAt)).slice(0, 3);
  return renderTemplate`${maybeRenderHead()}<div class="recently-signed-up-users-container" data-astro-cid-k2mi7r65> ${recentlyCreatedUsers.map((user) => renderTemplate`<a${addAttribute(`${Astro2.locals.StudioCMS.routeMap.mainLinks.userManagementEdit}/?user=${user.id}`, "href")} class="recently-signed-up-user" data-astro-reload data-astro-cid-k2mi7r65> ${renderComponent($$result, "Card", $$Card, { "class": "user-card", "fullWidth": true, "data-astro-cid-k2mi7r65": true }, { "default": async ($$result2) => renderTemplate` <div class="user-flex" data-astro-cid-k2mi7r65> ${renderComponent($$result2, "User", $$SSRUser, { "name": user.name, "avatar": user.avatar ?? void 0, "description": new Date(user.createdAt).toLocaleDateString(config.locale.dateLocale, config.locale.dateTimeFormat), "id": `recent-user-${user.id}`, "data-astro-cid-k2mi7r65": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:eye", "width": 24, "height": 24, "data-astro-cid-k2mi7r65": true })} </div> ` })} </a>`)} </div> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Recently-signed-up.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$RecentlyCreatedPages = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RecentlyCreatedPages;
  const allPages = await runSDK(SDKCoreJs.GET.pages(true));
  const totalPages = allPages.map((page) => page).filter((page) => allowedIdentifiers.includes(page.package));
  const recentlyUpdatedPages = totalPages.filter((page) => withinLast30Days(new Date(page.publishedAt))).sort((a, b) => sortByDate(a.publishedAt, b.publishedAt)).slice(0, 3);
  const genericTranslationProps = {
    plugin: "studiocms",
    component: "recently-created-pages"
  };
  return renderTemplate`${maybeRenderHead()}<div class="recently-created-page-container" data-astro-cid-wbfppzfv> ${recentlyUpdatedPages.length > 0 ? recentlyUpdatedPages.map((page) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "fullWidth": true, "class": "recently-created-page-card", "as": "a", "href": Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementEdit + `?edit=${page.id}`, "data-astro-cid-wbfppzfv": true }, { "default": async ($$result2) => renderTemplate` <div class="card-row" data-astro-cid-wbfppzfv> <span class="card-title" data-astro-cid-wbfppzfv>${page.title} ${page.draft && renderTemplate`${renderComponent($$result2, "Badge", $$Badge, { "label": "Draft", "size": "sm", "variant": "flat", "rounding": "semi", "data-astro-cid-wbfppzfv": true })}`}</span> <span class="card-date" data-astro-cid-wbfppzfv>${renderComponent($$result2, "p-translations", "p-translations", { ...genericTranslationProps, "key": "created", "data-astro-cid-wbfppzfv": true }, { "default": () => renderTemplate`Created:` })} ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": page.publishedAt, "data-astro-cid-wbfppzfv": true })}</span> </div> <div class="card-row" data-astro-cid-wbfppzfv> <span class="card-description" data-astro-cid-wbfppzfv>${page.description}</span> </div> ` })}`) : renderTemplate`${renderComponent($$result, "Card", $$Card, { "fullWidth": true, "style": "background-color: var(--background-step-2);", "data-astro-cid-wbfppzfv": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Center", $$Center, { "data-astro-cid-wbfppzfv": true }, { "default": async ($$result3) => renderTemplate`<span style="color: var(--text-muted);" data-astro-cid-wbfppzfv>${renderComponent($$result3, "p-translations", "p-translations", { ...genericTranslationProps, "key": "no-pages-found", "data-astro-cid-wbfppzfv": true }, { "default": () => renderTemplate`No recently created pages found.` })}</span>` })} ` })}`} </div> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Recently-created-pages.astro", void 0);

const components = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  recentlycreatedpages: $$RecentlyCreatedPages,
  recentlysignedupusers: $$RecentlySignedUp,
  recentlyupdatedpages: $$RecentlyUpdatedPages,
  totals: $$Totals
}, Symbol.toStringTag, { value: 'Module' }));

const currentComponents = [{"name":"studiocms/overview","span":1,"variant":"default","requiresPermission":"editor","header":{"title":"Overview","icon":"heroicons:bolt"},"body":{"html":"<totals></totals>","components":{"totals":"/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Totals.astro"}}},{"name":"studiocms/recently_updated_pages","span":2,"variant":"default","requiresPermission":"editor","header":{"title":"Recently Updated Pages","icon":"heroicons:document-arrow-up"},"body":{"html":"<recentlyupdatedpages></recentlyupdatedpages>","components":{"recentlyupdatedpages":"/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Recently-updated-pages.astro"}}},{"name":"studiocms/recently_signed_up_users","span":1,"variant":"default","requiresPermission":"admin","header":{"title":"Recently Signed Up Users","icon":"heroicons:user-group"},"body":{"html":"<recentlysignedupusers></recentlysignedupusers>","components":{"recentlysignedupusers":"/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Recently-signed-up.astro"}}},{"name":"studiocms/recently_created_pages","span":2,"variant":"default","requiresPermission":"editor","header":{"title":"Recently Created Pages","icon":"heroicons:document-plus"},"body":{"html":"<recentlycreatedpages></recentlycreatedpages>","components":{"recentlycreatedpages":"/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/dist/handlers/plugin-components/Recently-created-pages.astro"}}}];

						const dashboardGridItems = currentComponents.map((item) => {
							const gridItem = { ...item };

							if (gridItem.body?.components) {
								gridItem.body.components = Object.entries(gridItem.body.components).reduce(
									(acc, [key, value]) => ({
										...acc,
										[key]: components[key],
									}),
									{}
								);
							}

							return gridItem;
						});

export { dashboardGridItems as d };
