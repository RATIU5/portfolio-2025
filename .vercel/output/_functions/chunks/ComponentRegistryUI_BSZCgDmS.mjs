import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, c as createAstro } from './astro/server_D64VbtqW.mjs';
import { g as generateComponentTranslationMap } from './Divider_D5DMoGSW.mjs';
import './LanguageSelector_D2Mp70Tp.mjs';
/* empty css                            */
/* empty css                         */

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$ComponentRegistryUI = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ComponentRegistryUI;
  const { registryData, noOutput, triggerId } = Astro2.props;
  const translations = generateComponentTranslationMap("@studiocms/component-registry-ui");
  return renderTemplate`${renderComponent($$result, "component-registry-modal", "component-registry-modal", { "data-registry": JSON.stringify(registryData), "data-no-output": noOutput ? "true" : "false", "data-trigger-id": triggerId, "data-translations": JSON.stringify(translations), "data-lang-storage-key": "studiocms-i18n-locale" })}  ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/ComponentRegistryUI.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/ComponentRegistryUI.astro", void 0);

export { $$ComponentRegistryUI as $ };
