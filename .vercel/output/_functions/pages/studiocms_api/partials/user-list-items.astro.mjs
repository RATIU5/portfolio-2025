/* empty css                                               */
import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { $ as $$UserListItem } from '../../../chunks/UserListItem_yRdlIzh0.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const partial = true;
const $$UserListItems = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserListItems;
  async function setData() {
    const jsonData = await Astro2.request.json();
    if (jsonData) return jsonData;
    return "No Users to display";
  }
  const usersData = await setData();
  return renderTemplate`${typeof usersData !== "string" ? usersData.users.map((user) => renderTemplate`${renderComponent($$result, "UserListItem", $$UserListItem, { "user": user, "searchQuery": usersData.searchQuery })}`) : usersData}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/user-list-items.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/user-list-items.astro";
const $$url = "/studiocms_api/partials/user-list-items";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$UserListItems,
	file: $$file,
	partial,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
