import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

export default function rehypeSketchCodeBlock() {
	return (tree: Root) => {
		visit(tree, "element", (node: Element) => {
			if (
				node.tagName === "pre" &&
				node.properties?.class?.toString().includes("shiki")
			) {
				node.properties["data-sketch-code"] = "true";
			}
		});
	};
}
