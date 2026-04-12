import { a as createComponent, m as maybeRenderHead, e as renderComponent, d as renderTemplate, f as renderSlot, c as createAstro } from './astro/server_D64VbtqW.mjs';
import { $ as $$Icon, a as $$Button } from './LanguageSelector_D2Mp70Tp.mjs';
/* empty css                                 */

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$PageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageHeader;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="page-header" data-astro-cid-jpqzowb4> <div class="page-title-container" data-astro-cid-jpqzowb4> ${renderComponent($$result, "Button", $$Button, { "color": "primary", "id": "nav-open", "class": "mobile-btn", "data-astro-cid-jpqzowb4": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:bars-3", "height": 24, "width": 24, "data-astro-cid-jpqzowb4": true })} ` })} <h1 class="page-title" data-astro-cid-jpqzowb4>${title}</h1> </div> <div class="page-actions-container" data-astro-cid-jpqzowb4> ${renderSlot($$result, $$slots["default"])} </div> </header> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/PageHeader.astro", void 0);

export { $$PageHeader as $ };
