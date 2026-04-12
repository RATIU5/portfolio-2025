import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, c as createAstro } from './astro/server_D64VbtqW.mjs';
/* empty css                            */
import { g as generateComponentTranslationMap } from './Divider_D5DMoGSW.mjs';
import './LanguageSelector_D2Mp70Tp.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$StorageFileBrowser = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StorageFileBrowser;
  const {
    triggerId,
    targetInputId,
    fileTypes = [],
    filesOnly = false,
    returnType = "identifier"
  } = Astro2.props;
  const rawTranslationMap = generateComponentTranslationMap("@studiocms/storage-file-browser");
  const fileTypesJson = JSON.stringify(fileTypes);
  const translationMap = JSON.stringify(rawTranslationMap);
  return renderTemplate`${renderComponent($$result, "storage-file-browser", "storage-file-browser", { "trigger-id": triggerId, "target-input-id": targetInputId, "file-types": fileTypesJson, "files-only": filesOnly.toString(), "return-type": returnType, "translation-map": translationMap })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/storage-manager/StorageFileBrowser.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/storage-manager/StorageFileBrowser.astro", void 0);

export { $$StorageFileBrowser as $ };
