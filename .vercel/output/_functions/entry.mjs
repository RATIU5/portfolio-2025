import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C0vpKyJp.mjs';
import { manifest } from './manifest_BJJ19RtH.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/404.astro2.mjs');
const _page3 = () => import('./pages/dashboard/configuration.astro.mjs');
const _page4 = () => import('./pages/dashboard/content-management/create.astro.mjs');
const _page5 = () => import('./pages/dashboard/content-management/create-folder.astro.mjs');
const _page6 = () => import('./pages/dashboard/content-management/diff.astro.mjs');
const _page7 = () => import('./pages/dashboard/content-management/edit.astro.mjs');
const _page8 = () => import('./pages/dashboard/content-management/edit-folder.astro.mjs');
const _page9 = () => import('./pages/dashboard/content-management.astro.mjs');
const _page10 = () => import('./pages/dashboard/login.astro.mjs');
const _page11 = () => import('./pages/dashboard/logout.astro.mjs');
const _page12 = () => import('./pages/dashboard/password-reset.astro.mjs');
const _page13 = () => import('./pages/dashboard/plugins/_plugin_.astro.mjs');
const _page14 = () => import('./pages/dashboard/profile.astro.mjs');
const _page15 = () => import('./pages/dashboard/signup.astro.mjs');
const _page16 = () => import('./pages/dashboard/smtp-configuration.astro.mjs');
const _page17 = () => import('./pages/dashboard/system-management.astro.mjs');
const _page18 = () => import('./pages/dashboard/taxonomy/categories.astro.mjs');
const _page19 = () => import('./pages/dashboard/taxonomy/tags.astro.mjs');
const _page20 = () => import('./pages/dashboard/taxonomy.astro.mjs');
const _page21 = () => import('./pages/dashboard/unverified-email.astro.mjs');
const _page22 = () => import('./pages/dashboard/user-management/edit.astro.mjs');
const _page23 = () => import('./pages/dashboard/user-management.astro.mjs');
const _page24 = () => import('./pages/dashboard.astro.mjs');
const _page25 = () => import('./pages/robots.txt.astro.mjs');
const _page26 = () => import('./pages/rss.xml.astro.mjs');
const _page27 = () => import('./pages/sitemap.xml.astro.mjs');
const _page28 = () => import('./pages/studiocms_api/auth/_path_.astro.mjs');
const _page29 = () => import('./pages/studiocms_api/dashboard/api-tokens.astro.mjs');
const _page30 = () => import('./pages/studiocms_api/dashboard/config.astro.mjs');
const _page31 = () => import('./pages/studiocms_api/dashboard/content/diff.astro.mjs');
const _page32 = () => import('./pages/studiocms_api/dashboard/content/folder.astro.mjs');
const _page33 = () => import('./pages/studiocms_api/dashboard/content/page.astro.mjs');
const _page34 = () => import('./pages/studiocms_api/dashboard/create-reset-link.astro.mjs');
const _page35 = () => import('./pages/studiocms_api/dashboard/create-user.astro.mjs');
const _page36 = () => import('./pages/studiocms_api/dashboard/create-user-invite.astro.mjs');
const _page37 = () => import('./pages/studiocms_api/dashboard/email-notification-settings-site.astro.mjs');
const _page38 = () => import('./pages/studiocms_api/dashboard/mailer/config.astro.mjs');
const _page39 = () => import('./pages/studiocms_api/dashboard/mailer/test-email.astro.mjs');
const _page40 = () => import('./pages/studiocms_api/dashboard/plugins/_plugin_.astro.mjs');
const _page41 = () => import('./pages/studiocms_api/dashboard/profile.astro.mjs');
const _page42 = () => import('./pages/studiocms_api/dashboard/resend-verify-email.astro.mjs');
const _page43 = () => import('./pages/studiocms_api/dashboard/reset-password.astro.mjs');
const _page44 = () => import('./pages/studiocms_api/dashboard/search-list.astro.mjs');
const _page45 = () => import('./pages/studiocms_api/dashboard/taxonomy.astro.mjs');
const _page46 = () => import('./pages/studiocms_api/dashboard/taxonomy-search.astro.mjs');
const _page47 = () => import('./pages/studiocms_api/dashboard/templates.astro.mjs');
const _page48 = () => import('./pages/studiocms_api/dashboard/update-user-notifications.astro.mjs');
const _page49 = () => import('./pages/studiocms_api/dashboard/users.astro.mjs');
const _page50 = () => import('./pages/studiocms_api/dashboard/verify-email.astro.mjs');
const _page51 = () => import('./pages/studiocms_api/dashboard/verify-session.astro.mjs');
const _page52 = () => import('./pages/studiocms_api/integrations/_type_/_---id_.astro.mjs');
const _page53 = () => import('./pages/studiocms_api/partials/editor.astro.mjs');
const _page54 = () => import('./pages/studiocms_api/partials/render.astro.mjs');
const _page55 = () => import('./pages/studiocms_api/partials/user-list-items.astro.mjs');
const _page56 = () => import('./pages/studiocms_api/rest/v1/public/_type_/_---id_.astro.mjs');
const _page57 = () => import('./pages/studiocms_api/rest/v1/_type_/_---id_.astro.mjs');
const _page58 = () => import('./pages/studiocms_api/sdk/_---path_.astro.mjs');
const _page59 = () => import('./pages/index.astro.mjs');
const _page60 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credential-provider-web-ide_lmg7wo6eukzjqy6kkumsfind3i/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/404.astro", _page2],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/configuration.astro", _page3],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/createpage.astro", _page4],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/createfolder.astro", _page5],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/diff.astro", _page6],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/editpage.astro", _page7],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/editfolder.astro", _page8],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/content-management/index.astro", _page9],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/login.astro", _page10],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/logout.astro", _page11],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/password-reset.astro", _page12],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/plugins/[plugin].astro", _page13],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/profile.astro", _page14],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/signup.astro", _page15],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/smtp-configuration.astro", _page16],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/system-management.astro", _page17],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/categories.astro", _page18],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/tags.astro", _page19],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/taxonomy/index.astro", _page20],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/unverified-email.astro", _page21],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/user-management/edit.astro", _page22],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/user-management/index.astro", _page23],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/[dashboard]/index.astro", _page24],
    ["src/pages/robots.txt.ts", _page25],
    ["src/pages/rss.xml.ts", _page26],
    ["src/pages/sitemap.xml.ts", _page27],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/auth/[path].ts", _page28],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/api-tokens.ts", _page29],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/config.ts", _page30],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/content/diff.ts", _page31],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/content/folder.ts", _page32],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/content/page.ts", _page33],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/create-reset-link.ts", _page34],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/create-user.ts", _page35],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/create-user-invite.ts", _page36],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/email-notification-settings-site.ts", _page37],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/mailer/config.ts", _page38],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/mailer/check-email.ts", _page39],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/plugins/[plugin].ts", _page40],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/profile.ts", _page41],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/resend-verify-email.ts", _page42],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/reset-password.ts", _page43],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/search-list.ts", _page44],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/taxonomy.ts", _page45],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/taxonomy-search.ts", _page46],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/templates.ts", _page47],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/update-user-notifications.ts", _page48],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/users.ts", _page49],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/verify-email.ts", _page50],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/dashboard/verify-session.ts", _page51],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/integrations/[type]/[...id].ts", _page52],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/editor.astro", _page53],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/render.astro", _page54],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/user-list-items.astro", _page55],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/rest/v1/public/[type]/[...id].ts", _page56],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/rest/v1/[type]/[...id].ts", _page57],
    ["node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/sdk/[...path].ts", _page58],
    ["src/pages/index.astro", _page59],
    ["src/pages/[...slug].astro", _page60]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "7352554e-6268-458c-abf3-0ff547c49b97",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
