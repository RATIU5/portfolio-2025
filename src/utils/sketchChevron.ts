import { DOMImplementation, XMLSerializer } from "@xmldom/xmldom";
import rough from "roughjs";

export interface SketchChevronOptions {
	stroke?: string;
	strokeWidth?: number;
	roughness?: number;
	bowing?: number;
	direction?: "left" | "right" | "up" | "down";
}

export function generateSketchChevron(
	seed: number,
	size = 24,
	options?: SketchChevronOptions
): string {
	const {
		stroke = "currentColor",
		strokeWidth = 2,
		roughness = 1.5,
		bowing = 0.5,
		direction = "right",
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

	const rc = rough.svg(svg as unknown as SVGSVGElement);

	const padding = 6;
	const mid = 12;

	let points: [number, number][];
	switch (direction) {
		case "left":
			points = [
				[24 - padding, padding],
				[padding, mid],
				[24 - padding, 24 - padding],
			];
			break;
		case "up":
			points = [
				[padding, 24 - padding],
				[mid, padding],
				[24 - padding, 24 - padding],
			];
			break;
		case "down":
			points = [
				[padding, padding],
				[mid, 24 - padding],
				[24 - padding, padding],
			];
			break;
		case "right":
		default:
			points = [
				[padding, padding],
				[24 - padding, mid],
				[padding, 24 - padding],
			];
			break;
	}

	const path = rc.linearPath(points, {
		stroke,
		strokeWidth,
		roughness,
		bowing,
		seed,
	});

	svg.appendChild(path as unknown as Node);

	return new XMLSerializer().serializeToString(svg);
}
