/* empty css                                               */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { $ as $$FormattedDate } from '../../../chunks/BaseLayout_Dwmia_ez.mjs';
import { u as useTranslations } from '../../../chunks/Divider_D5DMoGSW.mjs';
import { a as $$Button } from '../../../chunks/LanguageSelector_D2Mp70Tp.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { $ as $$Card } from '../../../chunks/Card_DjFryfeQ.mjs';
import { $ as $$DashboardLayout, a as $$Group } from '../../../chunks/DashboardLayout_BmXXNyyD.mjs';
import { $ as $$Input } from '../../../chunks/Input_mJ0hT4yn.mjs';
import { $ as $$PageHeader, a as $$InnerSidebarElement } from '../../../chunks/PageHeader_iKb6IMF-.mjs';
/* empty css                                      */
import { r as runEffect } from '../../../chunks/effect_DkdxkRrn.mjs';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { Effect } from 'effect';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Diff = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Diff;
  const { siteConfig: config, defaultLang: lang, security } = Astro2.locals.StudioCMS;
  const currentUser = security?.userSessionData ?? null;
  const t = useTranslations(lang, "@studiocms/dashboard:content-index");
  const td = useTranslations(lang, "@studiocms/dashboard:content-diff");
  const urlParams = Astro2.url.searchParams;
  const diffId = urlParams.get("diff");
  if (!diffId) return Astro2.redirect("/404");
  const { user, diff } = await runEffect(
    genLogger("studiocms/routes/dashboard/content-management/diff.users-diff")(function* () {
      const sdk = yield* SDKCore;
      const [users, diff2] = yield* Effect.all([
        sdk.GET.users.all(),
        sdk.diffTracking.get.single(diffId)
      ]);
      const user2 = (id) => users.find((u) => u.id === id)?.name;
      return { user: user2, diff: diff2 };
    })
  );
  if (!diff) return Astro2.redirect("/404");
  const [page, metaDataChanges, diffContentHTML] = await runEffect(
    genLogger("studiocms/routes/dashboard/content-management/diff.page-meta")(function* () {
      const sdk = yield* SDKCore;
      return yield* Effect.all([
        sdk.GET.page.byId(diff.pageId),
        sdk.diffTracking.utils.getMetaDataDifferences(diff.pageMetaData.start, diff.pageMetaData.end),
        sdk.diffTracking.utils.getDiffHTML(diff.diff ?? "")
      ]);
    })
  );
  if (!page) return new Response(null, { status: 404 });
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": t("title"), "description": t("description"), "requiredPermission": "editor", "sidebar": "double", "lang": lang, "config": config, "currentUser": currentUser, "data-astro-cid-yrmzgfyc": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<h4 data-astro-cid-yrmzgfyc> ${renderComponent($$result2, "t-content-diff", "t-content-diff", { "key": "page-metadata", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("page-metadata")}` })} </h4> ${metaDataChanges.length > 0 ? metaDataChanges.map(({ current, label, previous }) => renderTemplate`<div class="diff-screen metadata-diffs" data-astro-cid-yrmzgfyc> <div data-astro-cid-yrmzgfyc>${label}</div> <div class="form-row" data-astro-cid-yrmzgfyc> ${renderComponent($$result2, "Input", $$Input, { "label": "Previous", "value": `${previous}`, "disabled": true, "data-astro-cid-yrmzgfyc": true })} ${renderComponent($$result2, "Input", $$Input, { "label": "Current", "value": `${current}`, "disabled": true, "data-astro-cid-yrmzgfyc": true })} </div> </div>`) : renderTemplate`<div class="diff-screen metadata-diffs" data-astro-cid-yrmzgfyc> <div data-astro-cid-yrmzgfyc> ${renderComponent($$result2, "t-content-diff", "t-content-diff", { "key": "no-metadata-changes", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate` ${td("no-metadata-changes")} ` })} </div> </div>`}<h4 data-astro-cid-yrmzgfyc> ${renderComponent($$result2, "t-content-diff", "t-content-diff", { "key": "page-content", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("page-content")}` })} </h4> <div class="diff-screen" data-astro-cid-yrmzgfyc>${unescapeHTML(diffContentHTML)}</div> `, "double-sidebar": async ($$result2) => renderTemplate`<div class="inner-sidebar-container" data-astro-cid-yrmzgfyc> <div class="sidebar-links-container" data-astro-cid-yrmzgfyc> ${renderComponent($$result2, "InnerSidebarElement", $$InnerSidebarElement, { "lang": lang, "data-astro-cid-yrmzgfyc": true })} </div> </div>`, "header": async ($$result2) => renderTemplate`<div data-astro-cid-yrmzgfyc> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "lang": lang, "data-astro-cid-yrmzgfyc": true })} <span style="width: 100%; display: flex; padding: 1rem 0; gap: 1rem;" data-astro-cid-yrmzgfyc> ${renderComponent($$result2, "Button", $$Button, { "variant": "outlined", "color": "info", "size": "sm", "href": `${Astro2.locals.StudioCMS.routeMap.mainLinks.contentManagementEdit}?edit=${page.id}`, "data-astro-cid-yrmzgfyc": true }, { "default": async ($$result3) => renderTemplate`${renderComponent($$result3, "t-content-diff", "t-content-diff", { "key": "view-page", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("view-page")}` })} ` })} ${renderComponent($$result2, "Group", $$Group, { "data-astro-cid-yrmzgfyc": true }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", $$Button, { "id": "revert-metadata", "variant": "outlined", "color": "primary", "size": "sm", "disabled": metaDataChanges.length === 0, "data-id": diff.id, "data-url": Astro2.locals.StudioCMS.routeMap.endpointLinks.content.diff, "data-type": "data", "data-astro-cid-yrmzgfyc": true }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "t-content-diff", "t-content-diff", { "key": "revert-metadata", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("revert-metadata")}` })} ` })} ${renderComponent($$result3, "Button", $$Button, { "id": "revert-content", "variant": "outlined", "color": "primary", "size": "sm", "data-id": diff.id, "data-url": Astro2.locals.StudioCMS.routeMap.endpointLinks.content.diff, "data-type": "content", "data-astro-cid-yrmzgfyc": true }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "t-content-diff", "t-content-diff", { "key": "revert-content", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("revert-content")}` })} ` })} ${renderComponent($$result3, "Button", $$Button, { "id": "revert-all-changes", "variant": "outlined", "color": "primary", "size": "sm", "data-id": diff.id, "data-url": Astro2.locals.StudioCMS.routeMap.endpointLinks.content.diff, "data-type": "both", "data-astro-cid-yrmzgfyc": true }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "t-content-diff", "t-content-diff", { "key": "revert-all", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("revert-all")}` })} ` })} ` })} </span> ${renderComponent($$result2, "Card", $$Card, { "style": "margin-left: 2rem;", "data-astro-cid-yrmzgfyc": true }, { "default": async ($$result3) => renderTemplate` <table class="page-diff-info" data-astro-cid-yrmzgfyc> <tr data-astro-cid-yrmzgfyc> <td data-astro-cid-yrmzgfyc>${renderComponent($$result3, "t-content-diff", "t-content-diff", { "key": "page-title", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("page-title")}` })}</td> <td data-astro-cid-yrmzgfyc>${page.title}</td> </tr> <tr data-astro-cid-yrmzgfyc> <td data-astro-cid-yrmzgfyc>${renderComponent($$result3, "t-content-diff", "t-content-diff", { "key": "edited-by", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("edited-by")}` })}</td> <td data-astro-cid-yrmzgfyc>${user(diff.userId)}</td> </tr> <tr data-astro-cid-yrmzgfyc> <td data-astro-cid-yrmzgfyc>${renderComponent($$result3, "t-content-diff", "t-content-diff", { "key": "edited-on", "data-astro-cid-yrmzgfyc": true }, { "default": () => renderTemplate`${td("edited-on")}` })}</td> <td data-astro-cid-yrmzgfyc>${renderComponent($$result3, "FormattedDate", $$FormattedDate, { "date": diff.timestamp, "data-astro-cid-yrmzgfyc": true })}</td> </tr> </table> ` })} </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/diff.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/diff.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/diff.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/diff.astro";
const $$url = "/[dashboard]/content-management/diff";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Diff,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
