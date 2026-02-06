#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { basename, extname, dirname, join } from "path";
import { parseArgs } from "util";
import { DOMImplementation, XMLSerializer, DOMParser } from "@xmldom/xmldom";
import rough from "roughjs";

const { values, positionals } = parseArgs({
	allowPositionals: true,
	options: {
		output: { type: "string", short: "o" },
		roughness: { type: "string", short: "r", default: "1.5" },
		bowing: { type: "string", short: "b", default: "1" },
		strokeWidth: { type: "string", short: "s" },
		fillStyle: { type: "string", short: "f", default: "hachure" },
		fillWeight: { type: "string", short: "w" },
		hachureGap: { type: "string", short: "g" },
		seed: { type: "string" },
		help: { type: "boolean", short: "h" },
	},
});

if (values.help || positionals.length === 0) {
	console.log(`
Usage: sketch-svg [options] <input.svg>

Converts SVG icons to a hand-drawn sketch style using rough.js.
Processes paths, circles, ellipses, rects, lines, polylines, and polygons.

Options:
  -o, --output <path>      Output file path (default: <input>-sketch.svg)
  -r, --roughness <n>      Roughness intensity (default: 1.5)
  -b, --bowing <n>         Line curvature (default: 1)
  -s, --strokeWidth <n>    Stroke width (overrides original)
  -f, --fillStyle <style>  Fill style: hachure, solid, zigzag, cross-hatch, dots, dashed (default: hachure)
  -w, --fillWeight <n>     Fill line thickness (default: half of strokeWidth)
  -g, --hachureGap <n>     Gap between fill lines in pixels (smaller = denser)
  --seed <n>               Random seed for reproducible output
  -h, --help               Show this help

Examples:
  sketch-svg icon.svg
  sketch-svg -r 2.5 -b 2 icon.svg
  sketch-svg -o output.svg -r 1 --seed 12345 icon.svg
`);
	process.exit(0);
}

const inputPath = positionals[0];
const inputSvg = readFileSync(inputPath, "utf-8");

const parser = new DOMParser();
const inputDoc = parser.parseFromString(inputSvg, "image/svg+xml");
const sourceSvg = inputDoc.documentElement;

if (!sourceSvg || sourceSvg.tagName !== "svg") {
	console.error("Error: No SVG element found in input file");
	process.exit(1);
}

const width = sourceSvg.getAttribute("width") || "24";
const height = sourceSvg.getAttribute("height") || "24";
const viewBox = sourceSvg.getAttribute("viewBox") || `0 0 ${width} ${height}`;

const doc = new DOMImplementation().createDocument(
	"http://www.w3.org/2000/svg",
	"svg",
	null
);
const outputSvg = doc.documentElement;
outputSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
outputSvg.setAttribute("width", width);
outputSvg.setAttribute("height", height);
outputSvg.setAttribute("viewBox", viewBox);
outputSvg.setAttribute("aria-hidden", "true");

const rc = rough.svg(outputSvg);

const baseConfig = {
	roughness: parseFloat(values.roughness),
	bowing: parseFloat(values.bowing),
	fillStyle: values.fillStyle,
};

if (values.seed) {
	baseConfig.seed = parseInt(values.seed, 10);
}

if (values.fillWeight) {
	baseConfig.fillWeight = parseFloat(values.fillWeight);
}

if (values.hachureGap) {
	baseConfig.hachureGap = parseFloat(values.hachureGap);
}

function getAttr(el, name, fallback = 0) {
	const val = el.getAttribute(name);
	return val ? parseFloat(val) : fallback;
}

function getStyle(el) {
	const stroke = el.getAttribute("stroke") || "currentColor";
	const fill = el.getAttribute("fill");
	const sw = el.getAttribute("stroke-width");

	const config = { ...baseConfig, stroke };

	if (fill && fill !== "none") {
		config.fill = fill;
	}

	if (values.strokeWidth) {
		config.strokeWidth = parseFloat(values.strokeWidth);
	} else if (sw) {
		config.strokeWidth = parseFloat(sw);
	}

	return config;
}

function processElement(el) {
	const tag = el.tagName;
	const config = getStyle(el);

	let drawn = null;

	switch (tag) {
		case "path": {
			const d = el.getAttribute("d");
			if (d) {
				drawn = rc.path(d, config);
			}
			break;
		}
		case "circle": {
			const cx = getAttr(el, "cx");
			const cy = getAttr(el, "cy");
			const r = getAttr(el, "r");
			drawn = rc.circle(cx, cy, r * 2, config);
			break;
		}
		case "ellipse": {
			const cx = getAttr(el, "cx");
			const cy = getAttr(el, "cy");
			const rx = getAttr(el, "rx");
			const ry = getAttr(el, "ry");
			drawn = rc.ellipse(cx, cy, rx * 2, ry * 2, config);
			break;
		}
		case "rect": {
			const x = getAttr(el, "x");
			const y = getAttr(el, "y");
			const w = getAttr(el, "width");
			const h = getAttr(el, "height");
			drawn = rc.rectangle(x, y, w, h, config);
			break;
		}
		case "line": {
			const x1 = getAttr(el, "x1");
			const y1 = getAttr(el, "y1");
			const x2 = getAttr(el, "x2");
			const y2 = getAttr(el, "y2");
			drawn = rc.line(x1, y1, x2, y2, config);
			break;
		}
		case "polyline":
		case "polygon": {
			const points = el.getAttribute("points");
			if (points) {
				const coords = points
					.trim()
					.split(/[\s,]+/)
					.map(parseFloat);
				const pts = [];
				for (let i = 0; i < coords.length; i += 2) {
					pts.push([coords[i], coords[i + 1]]);
				}
				if (tag === "polygon") {
					drawn = rc.polygon(pts, config);
				} else {
					drawn = rc.linearPath(pts, config);
				}
			}
			break;
		}
		case "g": {
			for (let i = 0; i < el.childNodes.length; i++) {
				const child = el.childNodes[i];
				if (child.nodeType === 1) {
					processElement(child);
				}
			}
			break;
		}
	}

	if (drawn) {
		outputSvg.appendChild(drawn);
	}
}

for (let i = 0; i < sourceSvg.childNodes.length; i++) {
	const child = sourceSvg.childNodes[i];
	if (child.nodeType === 1) {
		processElement(child);
	}
}

const outputPath =
	values.output ||
	join(
		dirname(inputPath),
		`${basename(inputPath, extname(inputPath))}-sketch.svg`
	);

const serializer = new XMLSerializer();
writeFileSync(outputPath, serializer.serializeToString(outputSvg));
console.log(`Wrote: ${outputPath}`);
