/* empty css                                         */
import { a as createComponent, e as renderComponent, m as maybeRenderHead, d as renderTemplate, F as Fragment, u as unescapeHTML, c as createAstro, r as renderScript } from '../chunks/astro/server_D64VbtqW.mjs';
import { u as useTranslations } from '../chunks/Divider_D5DMoGSW.mjs';
import { $ as $$Icon, a as $$Button } from '../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { U as User } from '../chunks/core_DE9YiRdf.mjs';
import { d as dashboardGridItems } from '../chunks/dashboard-grid-items_Ckh8pxry.mjs';
import { a as $$Center } from '../chunks/Modal_B-agW0rH.mjs';
import { c as createComponentProxy, t as transformHTML, d as convertUnderscoresToHyphens } from '../chunks/transform-html_CfEpmdGo.mjs';
import { $ as $$Card } from '../chunks/Card_DjFryfeQ.mjs';
import { Effect } from 'effect';
import { s as studioCMSSocials } from '../chunks/consts_CvAQFK6n.mjs';
/* empty css                                 */
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_BmXXNyyD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$DashboardGridItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$DashboardGridItem;
  const { span, variant, body, header, name } = Astro2.props;
  const components = createComponentProxy($$result, body?.components);
  let html;
  if (body?.html) {
    html = await transformHTML(body.html, components, body.sanitizeOpts);
  }
  const [pluginId, componentSafeId] = name.split("/");
  const componentId = convertUnderscoresToHyphens(componentSafeId);
  const genericTranslationProps = {
    plugin: pluginId,
    component: componentId
  };
  return renderTemplate`${renderComponent($$result, "Card", $$Card, { "fullWidth": true, "variant": variant, "class:list": ["grid-item", [span > 1 && `span-${span}`]], "id": name }, { "default": async ($$result2) => renderTemplate`${html && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(html)}` })}`}`, "header": async ($$result2) => renderTemplate`${header && renderTemplate`${maybeRenderHead()}<div> <span class="grid-item-title"> ${header.icon && renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": header.icon, "width": 24, "height": 24 })}`} <span>${renderComponent($$result2, "p-translations", "p-translations", { ...genericTranslationProps, "key": "title" }, { "default": () => renderTemplate`${header.title}` })}</span> </span> </div>`}` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/DashboardGridItem.astro", void 0);

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$DashboardGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DashboardGrid;
  const {
    lang,
    config: { data },
    currentUser
  } = Astro2.props;
  let gridItems = dashboardGridItems;
  if ((data.gridItems ?? []).length > 0) {
    gridItems = dashboardGridItems.filter(
      (item) => (data.gridItems ?? []).includes(item.name)
    );
  }
  const checkAllowed = (perm) => Effect.gen(function* () {
    const user = yield* User;
    return user.isUserAllowed(currentUser, perm ?? "unknown");
  });
  return renderTemplate`${maybeRenderHead()}<div class="dashboard-grid-container"> ${gridItems.length > 0 ? gridItems.map(async (item) => {
    if (item.requiresPermission) {
      const allowed = await Effect.runPromise(checkAllowed(item.requiresPermission));
      if (allowed) {
        return renderTemplate`${renderComponent($$result, "DashboardGridItem", $$DashboardGridItem, { ...item, "lang": lang })}`;
      }
    } else {
      return renderTemplate`${renderComponent($$result, "DashboardGridItem", $$DashboardGridItem, { ...item, "lang": lang })}`;
    }
  }) : renderTemplate`${renderComponent($$result, "Center", $$Center, {}, { "default": async ($$result2) => renderTemplate` <p>There is nothing to display</p> ` })}`} </div>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/DashboardGrid.astro", void 0);

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$UserName = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$UserName;
  const { currentUser } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${currentUser?.user?.name || "Unknown User"}` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/UserName.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$DashboardPageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$DashboardPageHeader;
  const { lang, currentUser } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:index");
  return renderTemplate`${maybeRenderHead()}<header class="index-page-header" data-astro-cid-hwets5xs> <div class="page-title-container" data-astro-cid-hwets5xs> ${renderComponent($$result, "Button", $$Button, { "color": "primary", "id": "nav-open", "class": "mobile-btn", "data-astro-cid-hwets5xs": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:bars-3", "height": 24, "width": 24, "data-astro-cid-hwets5xs": true })} ` })} <h1 class="page-title" data-astro-cid-hwets5xs> ${renderComponent($$result, "t-dashboard-header", "t-dashboard-header", { "key": "welcome-title", "data-astro-cid-hwets5xs": true }, { "default": () => renderTemplate`${t("welcome-title")}` })}, ${renderComponent($$result, "UserName", $$UserName, { "currentUser": currentUser, "data-astro-cid-hwets5xs": true })}.
</h1> </div> <div class="page-actions-container" data-astro-cid-hwets5xs> ${renderComponent($$result, "Button", $$Button, { "color": "primary", "variant": "flat", "as": "a", "href": studioCMSSocials.discord, "target": "_blank", "rel": "noopener noreferrer", "data-astro-cid-hwets5xs": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "t-dashboard-header", "t-dashboard-header", { "key": "title-button:discord", "data-astro-cid-hwets5xs": true }, { "default": () => renderTemplate`${t("title-button:discord")}` })} `, "start-content": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "start-content" }, { "default": ($$result3) => renderTemplate`${unescapeHTML(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011a.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0a8 8 0 0 0-.412-.833a.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02a.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595a.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085a8 8 0 0 1-1.249.594a.05.05 0 0 0-.03.03a.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019a13.2 13.2 0 0 0 4.001-2.02a.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613c0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613c0 .888-.631 1.612-1.438 1.612"/></svg>`)}` })}` })}  ${renderComponent($$result, "Button", $$Button, { "color": "success", "variant": "flat", "id": "feedback-button", "as": "a", "href": studioCMSSocials.github, "target": "_blank", "rel": "noopener noreferrer", "data-astro-cid-hwets5xs": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:chat-bubble-oval-left-ellipsis", "width": 24, "height": 24, "data-astro-cid-hwets5xs": true })} ${renderComponent($$result2, "t-dashboard-header", "t-dashboard-header", { "key": "title-button:feedback", "data-astro-cid-hwets5xs": true }, { "default": () => renderTemplate`${t("title-button:feedback")}` })} ` })} </div> </header> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/DashboardPageHeader.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/DashboardPageHeader.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:index");
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "editor", "lang": lang, "config": config, "currentUser": currentUser }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "DashboardGrid", $$DashboardGrid, { "lang": lang, "config": config, "currentUser": currentUser })} `, "header": ($$result2) => renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result2, "DashboardPageHeader", $$DashboardPageHeader, { "lang": lang, "currentUser": currentUser })} <span class="index-sub-header"> ${renderComponent($$result2, "t-dashboard", "t-dashboard", { "key": "sub-header" }, { "default": () => renderTemplate`${t("sub-header")}` })} </span> </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/index.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/index.astro";
const $$url = "/[dashboard]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
