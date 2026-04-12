import { a as createComponent, e as renderComponent, f as renderSlot, d as renderTemplate, r as renderScript, c as createAstro } from './astro/server_D64VbtqW.mjs';
import { p as pluginsList } from './_studiocms_plugins_BDmfe-c6.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$PageTypeHandler = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageTypeHandler;
  const { pluginFields } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "page-type-handler", "page-type-handler", { "data-plugin-fields": JSON.stringify(pluginFields) }, { "default": () => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/PageTypeHandler.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/content-mgmt/PageTypeHandler.astro", void 0);

const pageTypeOptions = pluginsList.flatMap(({ pageTypes }) => {
  const pageTypeOutput = [];
  if (!pageTypes) {
    return pageTypeOutput;
  }
  for (const { label, identifier } of pageTypes) {
    pageTypeOutput.push({ label, value: identifier });
  }
  return pageTypeOutput;
});
const trueFalse = [
  { label: "True", value: "true" },
  { label: "False", value: "false" }
];
const createSelectOptions = (opts) => [...opts];

export { $$PageTypeHandler as $, createSelectOptions as c, pageTypeOptions as p, trueFalse as t };
