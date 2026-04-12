import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderScript, d as renderTemplate } from './astro/server_D64VbtqW.mjs';
import { g as generateID } from './Input_mJ0hT4yn.mjs';
/* empty css                                 */

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Toggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Toggle;
  const {
    size = "md",
    color = "default",
    defaultChecked,
    disabled,
    name = generateID("checkbox"),
    label,
    isRequired
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(name, "for")}${addAttribute(["sui-toggle-label", [
    disabled && "disabled",
    color,
    size
  ]], "class:list")}> <div class="sui-toggle-container"> <div class="sui-toggle-switch" tabindex="0" role="checkbox"${addAttribute(defaultChecked || "false", "aria-checked")}${addAttribute(label, "aria-label")}></div> <input type="checkbox"${addAttribute(name, "name")}${addAttribute(name, "id")}${addAttribute(defaultChecked, "checked")}${addAttribute(disabled, "disabled")}${addAttribute(isRequired, "required")} class="sui-toggle-checkbox" hidden> </div> <span${addAttribute(`label-${name}`, "id")}> ${label} <span class="req-star">${isRequired && "*"}</span> </span> </label> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Toggle/Toggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Toggle/Toggle.astro", void 0);

export { $$Toggle as $ };
