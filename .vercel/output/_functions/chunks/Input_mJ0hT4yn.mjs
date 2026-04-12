import { c as createAstro, a as createComponent, g as AstroUserError, m as maybeRenderHead, b as addAttribute, d as renderTemplate, e as renderComponent, s as spreadAttributes } from './astro/server_D64VbtqW.mjs';
/* empty css                                 */
import { $ as $$Icon } from './LanguageSelector_D2Mp70Tp.mjs';

function generateID(prefix) {
  return `${prefix}-${Math.random().toString(16).slice(2)}`;
}

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Input;
  const {
    label,
    placeholder,
    name = generateID("input"),
    type = "text",
    defaultValue,
    isRequired = false,
    disabled = false,
    class: className,
    icon,
    description,
    ...props
  } = Astro2.props;
  if (typeof icon === "object") {
    if (!icon.name) throw new AstroUserError("Missing icon name for input!");
    if (!icon.position) throw new AstroUserError("Missing icon position for input!");
    if (!["left", "right"].includes(icon.position))
      throw new AstroUserError("Invalid icon position for input!");
  }
  const iconPos = icon ? typeof icon === "string" || typeof icon === "object" && icon.position === "left" ? "left" : "right" : void 0;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(name, "for")}${addAttribute(["sui-input-label", [disabled && "disabled"]], "class:list")}> ${label && renderTemplate`<span class="label"> ${label} <span class="req-star">${isRequired && "*"}</span> </span>`} <div class="sui-input-wrapper"> ${typeof icon === "object" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon.name, "width": 20, "height": 20, "class:list": ["input-icon", [`icon-${iconPos}`]] })}`} ${typeof icon === "string" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": 20, "height": 20, "class": "input-icon icon-left" })}`} <input${addAttribute(placeholder, "placeholder")}${addAttribute(name, "name")}${addAttribute(name, "id")}${addAttribute(type, "type")}${addAttribute(["sui-input", [className, iconPos && `icon-${iconPos}`]], "class:list")}${addAttribute(isRequired, "required")}${addAttribute(disabled, "disabled")}${addAttribute(defaultValue, "value")}${spreadAttributes(props)}> </div> ${description && renderTemplate`<span class="sui-input-desc">${description}</span>`} </label>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Input/Input.astro", void 0);

export { $$Input as $, generateID as g };
