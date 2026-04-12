function categoriesToTaxonomyNodes(categories) {
  const nodes = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    meta: cat.meta,
    parent: cat.parent,
    children: [],
    type: "category"
  }));
  const nodeMap = /* @__PURE__ */ new Map();
  nodes.forEach((node) => nodeMap.set(node.id, node));
  const roots = [];
  nodes.forEach((node) => {
    if (node.parent === null || node.parent === void 0) {
      roots.push(node);
    } else {
      const parent = nodeMap.get(node.parent);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  });
  return roots;
}
function tagsToTaxonomyNodes(tags) {
  return tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    description: tag.description,
    meta: tag.meta,
    parent: null,
    children: [],
    type: "tag"
  }));
}

export { categoriesToTaxonomyNodes as c, tagsToTaxonomyNodes as t };
