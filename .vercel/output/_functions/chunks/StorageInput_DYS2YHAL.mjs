import { a as createComponent, e as renderComponent, d as renderTemplate, c as createAstro, m as maybeRenderHead } from './astro/server_D64VbtqW.mjs';
import { $ as $$StorageFileBrowser } from './StorageFileBrowser_D2ybpw7S.mjs';
import { $ as $$Icon, a as $$Button } from './LanguageSelector_D2Mp70Tp.mjs';
import { $ as $$Input } from './Input_mJ0hT4yn.mjs';
/* empty css                                 */

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$BrowserInputArray = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BrowserInputArray;
  const { triggerInputs, fileTypes } = Astro2.props;
  const baseTriggerConfigs = triggerInputs.map((triggerId) => ({
    triggerId: `storage-input-button-${triggerId}`,
    targetInputId: triggerId
  }));
  const imageFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/avif",
    "image/tiff",
    "image/bmp",
    "image/x-icon"
  ];
  const defaultProps = {
    fileTypes: fileTypes ?? imageFileTypes,
    filesOnly: false,
    returnType: "identifier"
  };
  const triggerConfigs = baseTriggerConfigs.map((config) => ({
    ...defaultProps,
    ...config
  }));
  return renderTemplate`${triggerConfigs.map((props) => renderTemplate`${renderComponent($$result, "StorageFileBrowser", $$StorageFileBrowser, { ...props })}`)}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/storage-manager/BrowserInputArray.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$StorageInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StorageInput;
  const { id, name, disabled, ...inputProps } = Astro2.props;
  const inputId = id || name || crypto.randomUUID();
  const buttonId = `storage-input-button-${inputId}`;
  const buttonDisabled = disabled;
  return renderTemplate`${maybeRenderHead()}<div class="storage-input-container"> ${renderComponent($$result, "Input", $$Input, { ...inputProps, "id": inputId, "name": name, "disabled": disabled })} ${renderComponent($$result, "Button", $$Button, { "variant": "outlined", "color": "info", "size": "md", "id": buttonId, "type": "button", "disabled": buttonDisabled, "aria-label": "Browse Files" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:folder-open-20-solid", "width": 20, "height": 20 })} ` })} </div> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/storage-manager/StorageInput.astro", void 0);

export { $$StorageInput as $, $$BrowserInputArray as a };
