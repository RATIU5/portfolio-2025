import { DOMImplementation, XMLSerializer } from "@xmldom/xmldom";
import rough from "roughjs";

export interface SketchLineOptions {
	stroke?: string;
	strokeWidth?: number;
	roughness?: number;
	bowing?: number;
}

export function generateSketchLine(
	seed: number,
	width = 100,
	height = 8,
	options?: SketchLineOptions
): string {
	const {
		stroke = "#2c2c2c",
		strokeWidth = 3,
		roughness = 1.5,
		bowing = 0.5,
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
	const line = rc.line(0, height / 2, width, height / 2, {
		stroke,
		strokeWidth,
		roughness,
		bowing,
		seed,
	});

	svg.appendChild(line as unknown as Node);

	return new XMLSerializer().serializeToString(svg);
}
