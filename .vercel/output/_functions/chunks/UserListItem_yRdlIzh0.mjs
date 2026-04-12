import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, c as createAstro } from './astro/server_D64VbtqW.mjs';
import { $ as $$Divider, u as useTranslations } from './Divider_D5DMoGSW.mjs';
import { $ as $$Icon } from './LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$SSRUser } from './SSRUser_mXPz4_Au.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$UserListItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserListItem;
  const { user, searchQuery } = Astro2.props;
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/dashboard:user-component");
  const userListItemHref = new URL(
    Astro2.locals.StudioCMS.routeMap.mainLinks.userManagementEdit,
    Astro2.url.origin
  );
  userListItemHref.searchParams.set("user", user.id);
  if (searchQuery) {
    userListItemHref.searchParams.set("search", searchQuery);
  }
  const userListItemHrefString = userListItemHref.toString();
  const id = `user-mngmt-user-account-${user.id || "unknown"}`;
  const permissionLevel = user.permissionsData?.rank ?? "unknown";
  return renderTemplate`${renderComponent($$result, "user-list-item", "user-list-item", { "class": "sidebar-user", "href": userListItemHrefString, "data-selector-id": id, "data-permission-level": permissionLevel }, { "default": () => renderTemplate` ${renderComponent($$result, "User", $$SSRUser, { "id": id, "name": user.name, "avatar": user.avatar ?? void 0, "description": t(permissionLevel) })} ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:chevron-right", "width": 24, "height": 24 })} ` })} ${renderComponent($$result, "Divider", $$Divider, { "background": "background-step-1" })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/user-mgmt/UserListItem.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/user-mgmt/UserListItem.astro", void 0);

export { $$UserListItem as $ };
