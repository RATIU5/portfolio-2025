import { $ as $$A, a as $$CustomImage, b as $$Img, t as transformHTML, c as createComponentProxy, d as convertUnderscoresToHyphens, e as toComponentProxyError } from './transform-html_CfEpmdGo.mjs';

const componentKeys = ["cms_img","a","img"];
const componentProps = [{"name":"cms-img","props":[{"name":"src","type":"string","optional":false},{"name":"alt","type":"string","optional":false},{"name":"width","type":"number","optional":false},{"name":"height","type":"number","optional":false}],"safeName":"cms_img"},{"name":"a","props":[],"safeName":"a"},{"name":"img","props":[],"safeName":"img"}];

const registry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  a: $$A,
  cms_img: $$CustomImage,
  componentKeys,
  componentProps,
  img: $$Img
}, Symbol.toStringTag, { value: 'Module' }));

const name = 'studiocms';

function getRegistryComponents() {
  return componentProps;
}
const buildPrefix = (key, name2) => `Failed to import component "${key}" from [${name2}] component-registry`;
async function getRendererComponents() {
  const predefinedComponents = {};
  for (const key of componentKeys) {
    try {
      predefinedComponents[convertUnderscoresToHyphens(key)] = registry[key];
    } catch (e) {
      if (e instanceof Error) {
        throw toComponentProxyError(e, buildPrefix(key, name));
      }
      throw toComponentProxyError(new Error("Unknown error"), buildPrefix(key, name));
    }
  }
  return predefinedComponents;
}
async function setupRendererComponentProxy(result) {
  const components = await getRendererComponents();
  return createComponentProxy(result, components);
}
async function createRenderer(result, sanitizeOpts, preRenderer, transformers) {
  const components = await setupRendererComponentProxy(result);
  return async (content) => {
    let html;
    if (preRenderer && typeof preRenderer === "function") {
      html = await preRenderer(content);
    } else {
      html = content;
    }
    return await transformHTML(html, components, sanitizeOpts, transformers);
  };
}

export { createRenderer as c, getRegistryComponents as g };
