/* empty css                                         */
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, u as unescapeHTML, d as renderTemplate, e as renderComponent, F as Fragment } from '../chunks/astro/server_D64VbtqW.mjs';
import { r as runSDK, S as SDKCoreJs } from '../chunks/index_DmoCs122.mjs';
import { c as $$Button, $ as $$Page, a as $$SEO, b as $$ProseMain } from '../chunks/SEO_BtMR-Ior.mjs';
import { $ as $$SketchChevron } from '../chunks/SketchChevron_C14A2tNK.mjs';
import { DOMImplementation, XMLSerializer } from '@xmldom/xmldom';
import rough from 'roughjs';
export { renderers } from '../renderers.mjs';

function generateSketchVerticalLine(seed, width = 8, height = 100, options) {
  const {
    stroke = "#2c2c2c",
    strokeWidth = 3,
    roughness = 1.5,
    bowing = 0.5
  } = options ?? {};
  const doc = new DOMImplementation().createDocument(
    "http://www.w3.org/2000/svg",
    "svg",
    null
  );
  const svg = doc.documentElement;
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  const rc = rough.svg(svg);
  const line = rc.line(width / 2, 0, width / 2, height, {
    stroke,
    strokeWidth,
    roughness,
    bowing,
    seed
  });
  svg.appendChild(line);
  return new XMLSerializer().serializeToString(svg);
}

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SketchVerticalLine = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SketchVerticalLine;
  const {
    seed = 12345,
    width = 8,
    height = 100,
    stroke,
    strokeWidth,
    roughness,
    bowing,
    class: className
  } = Astro2.props;
  const svg = generateSketchVerticalLine(seed, width, height, {
    stroke,
    strokeWidth,
    roughness,
    bowing
  });
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["block", className], "class:list")}>${unescapeHTML(svg)}</span>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/ui/elements/SketchVerticalLine.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$ArticleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArticleCard;
  const { title, description, link } = Astro2.props;
  const truncateAtWord = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace === -1) return `${truncated.replace(/[^a-zA-Z0-9]+$/, "")}...`;
    const lastWord = truncated.slice(lastSpace + 1);
    if (lastWord.length < 15) {
      return `${truncated.slice(0, lastSpace).replace(/[^a-zA-Z0-9]+$/, "")}...`;
    }
    return `${truncated.replace(/[^a-zA-Z0-9]+$/, "")}...`;
  };
  const shortenedDescription = truncateAtWord(description, 160);
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-3 md:gap-4 w-full"> ${renderComponent($$result, "SketchVerticalLine", $$SketchVerticalLine, { "width": 6, "height": 100, "strokeWidth": 2, "class": "shrink-0 [&_svg]:h-full" })} <div class="flex-1 min-w-0"> <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-6"> <h2 class="text-2xl sm:text-3xl md:text-4xl leading-tight font-sans font-semibold mt-0 mb-0"> ${title} </h2> ${renderComponent($$result, "Button", $$Button, { "type": "link", "href": link, "size": "medium", "iconPosition": "right", "class": "self-start shrink-0 mb-4 md:mb-0" }, { "default": ($$result2) => renderTemplate`
read
 `, "icon": ($$result2) => renderTemplate`${renderComponent($$result2, "SketchChevron", $$SketchChevron, { "slot": "icon", "size": 18, "direction": "right" })}` })} </div> <p class="text-base sm:text-lg md:text-xl text-gray-600 mb-0 mt-2 sm:mt-3"> ${shortenedDescription} </p> </div> </div>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/ui/elements/ArticleCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const data = await runSDK(SDKCoreJs.GET.folderPages("article"));
  return renderTemplate`${renderComponent($$result, "Page", $$Page, {}, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "ProseMain", $$ProseMain, { "class": "pt-32" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>articles</h1> <div class="flex flex-col gap-20"> ${data.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).map((article) => renderTemplate`${renderComponent($$result3, "ArticleCard", $$ArticleCard, { "title": article.title, "description": article.description, "link": article.slug })}`)} </div> ` })} `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "SEO", $$SEO, { "title": "Articles", "description": "Articles and writings by RATIU5", "type": "website" })} ` })}` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/pages/index.astro", void 0);

const $$file = "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
