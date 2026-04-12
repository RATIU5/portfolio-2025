import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, u as unescapeHTML, d as renderTemplate } from './astro/server_D64VbtqW.mjs';
import { DOMImplementation, XMLSerializer } from '@xmldom/xmldom';
import rough from 'roughjs';

function generateSketchChevron(seed, size = 24, options) {
  const {
    stroke = "currentColor",
    strokeWidth = 2,
    roughness = 1.5,
    bowing = 0.5,
    direction = "right"
  } = options ?? {};
  const doc = new DOMImplementation().createDocument(
    "http://www.w3.org/2000/svg",
    "svg",
    null
  );
  const svg = doc.documentElement;
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("viewBox", `0 0 24 24`);
  svg.setAttribute("aria-hidden", "true");
  const rc = rough.svg(svg);
  const padding = 6;
  const mid = 12;
  let points;
  switch (direction) {
    case "left":
      points = [
        [24 - padding, padding],
        [padding, mid],
        [24 - padding, 24 - padding]
      ];
      break;
    case "up":
      points = [
        [padding, 24 - padding],
        [mid, padding],
        [24 - padding, 24 - padding]
      ];
      break;
    case "down":
      points = [
        [padding, padding],
        [mid, 24 - padding],
        [24 - padding, padding]
      ];
      break;
    case "right":
    default:
      points = [
        [padding, padding],
        [24 - padding, mid],
        [padding, 24 - padding]
      ];
      break;
  }
  const path = rc.linearPath(points, {
    stroke,
    strokeWidth,
    roughness,
    bowing,
    seed
  });
  svg.appendChild(path);
  return new XMLSerializer().serializeToString(svg);
}

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SketchChevron = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SketchChevron;
  const {
    seed = 12345,
    size = 24,
    stroke,
    strokeWidth,
    roughness,
    bowing,
    direction,
    class: className
  } = Astro2.props;
  const svg = generateSketchChevron(seed, size, {
    stroke,
    strokeWidth,
    roughness,
    bowing,
    direction
  });
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["inline-block", className], "class:list")}>${unescapeHTML(svg)}</span>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/ui/elements/SketchChevron.astro", void 0);

export { $$SketchChevron as $ };
