import { DOMImplementation, XMLSerializer } from "@xmldom/xmldom";
import rough from "roughjs";

export interface SketchRectangleOptions {
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  fill?: string;
  fillStyle?: "hachure" | "solid" | "zigzag" | "cross-hatch" | "dots" | "dashed";
}

export function generateSketchRectangle(
  seed: number,
  width = 100,
  height = 100,
  options?: SketchRectangleOptions
): string {
  const {
    stroke = "currentColor",
    strokeWidth = 2,
    roughness = 1.5,
    bowing = 1,
    fill,
    fillStyle = "hachure",
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

  const rc = rough.svg(svg as unknown as SVGSVGElement);

  const padding = 2;
  const rect = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke,
    strokeWidth,
    roughness,
    bowing,
    seed,
    ...(fill && { fill, fillStyle }),
  });

  svg.appendChild(rect as unknown as Node);

  return new XMLSerializer().serializeToString(svg);
}
