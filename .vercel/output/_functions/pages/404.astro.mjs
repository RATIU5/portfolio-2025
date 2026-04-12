/* empty css                                         */
import { a as createComponent, e as renderComponent, d as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_D64VbtqW.mjs';
import { $ as $$Page, a as $$SEO, b as $$ProseMain, c as $$Button } from '../chunks/SEO_BtMR-Ior.mjs';
import { $ as $$SketchChevron } from '../chunks/SketchChevron_C14A2tNK.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Page", $$Page, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ProseMain", $$ProseMain, { "class": "pt-32" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>404</h1> <p>Page not found. The page you're looking for doesn't exist or has been moved.</p> ${renderComponent($$result3, "Button", $$Button, { "type": "link", "href": "/", "size": "medium", "iconPosition": "right" }, { "default": ($$result4) => renderTemplate`
go home
 `, "icon": ($$result4) => renderTemplate`${renderComponent($$result4, "SketchChevron", $$SketchChevron, { "slot": "icon", "size": 18, "direction": "right" })}` })} ` })} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SEO", $$SEO, { "title": "Not Found", "description": "The page you're looking for doesn't exist.", "type": "website" })} ` })}` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/pages/404.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
