/* empty css                                               */
import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate, g as AstroUserError } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { p as pluginsList } from '../../../chunks/_studiocms_plugins_BDmfe-c6.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const partial = true;
const $$Editor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Editor;
  async function load() {
    const jsonData = await Astro2.request.json();
    const pageTypeComponents = [];
    for (const { pageTypes } of pluginsList) {
      if (!pageTypes) continue;
      for (const { identifier, pageContentComponent } of pageTypes) {
        if (!pageContentComponent) continue;
        pageTypeComponents.push({
          identifier,
          Component: (await import(
            /* @vite-ignore */
            pageContentComponent
          )).default
        });
      }
    }
    let Editor;
    Editor = pageTypeComponents.find((ed) => ed.identifier === jsonData?.editor);
    if (!Editor) {
      const MarkdownEditor = pageTypeComponents.find(
        (editor) => editor.identifier === "studiocms/markdown"
      );
      if (MarkdownEditor) {
        Editor = MarkdownEditor;
      } else {
        throw new AstroUserError(
          `No editor found for identifier: ${jsonData?.editor}`,
          "StudioCMSDashboardPartialEditorError - No editor found"
        );
      }
    }
    if (jsonData?.content) {
      return {
        content: jsonData.content,
        ActiveEditor: Editor.Component
      };
    }
    return {
      content: "No content to display",
      ActiveEditor: Editor.Component
    };
  }
  const { content, ActiveEditor } = await load();
  return renderTemplate`${renderComponent($$result, "ActiveEditor", ActiveEditor, { "content": content })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/editor.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/pages/studiocms_api/partials/editor.astro";
const $$url = "/studiocms_api/partials/editor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Editor,
	file: $$file,
	partial,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
