import { DOMImplementation, XMLSerializer } from "@xmldom/xmldom";
import rough from "roughjs";

export interface SketchVerticalLineOptions {
	stroke?: string;
	strokeWidth?: number;
	roughness?: number;
	bowing?: number;
}

export function generateSketchVerticalLine(
	seed: number,
	width = 8,
	height = 100,
	options?: SketchVerticalLineOptions
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
	const line = rc.line(width / 2, 0, width / 2, height, {
		stroke,
		strokeWidth,
		roughness,
		bowing,
		seed,
	});

	svg.appendChild(line as unknown as Node);

	return new XMLSerializer().serializeToString(svg);
}
