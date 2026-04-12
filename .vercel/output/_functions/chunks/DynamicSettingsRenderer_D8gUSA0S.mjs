import { a as createComponent, m as maybeRenderHead, b as addAttribute, s as spreadAttributes, d as renderTemplate, c as createAstro, e as renderComponent, r as renderScript, f as renderSlot } from './astro/server_D64VbtqW.mjs';
import { g as generateID, $ as $$Input } from './Input_mJ0hT4yn.mjs';
/* empty css                            */
import { b as $$Select } from './DashboardLayout_BmXXNyyD.mjs';

const $$Astro$5 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Checkmark = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Checkmark;
  const { height = 24, width = 24, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg role="presentation" viewBox="0 0 17 18"${addAttribute(width, "width")}${addAttribute(height, "height")}${spreadAttributes(props)}> <polyline fill="none" points="1 9 7 14 15 4" stroke="currentColor" stroke-dasharray="22" stroke-dashoffset="66" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> </svg>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/icons/Checkmark.astro", void 0);

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Checkbox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Checkbox;
  const {
    size = "md",
    color = "default",
    defaultChecked,
    disabled,
    name = generateID("checkbox"),
    label,
    isRequired,
    value
  } = Astro2.props;
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 24
  };
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(name, "for")}${addAttribute(["sui-checkmark-label", [
    disabled && "disabled",
    color,
    size
  ]], "class:list")}> <div class="sui-checkmark-container" tabindex="0" role="checkbox"${addAttribute(defaultChecked || "false", "aria-checked")}${addAttribute(`label-${name}`, "aria-labelledby")}> ${renderComponent($$result, "Checkmark", $$Checkmark, { "class": "sui-checkmark", "width": iconSizes[size], "height": iconSizes[size] })} <input type="checkbox"${addAttribute(name, "name")}${addAttribute(name, "id")}${addAttribute(defaultChecked, "checked")}${addAttribute(disabled, "disabled")}${addAttribute(isRequired, "required")} class="sui-checkbox"${addAttribute(value, "value")} hidden${addAttribute(defaultChecked || "false", "aria-checked")}> </div> <span${addAttribute(`label-${name}`, "id")}> ${label} <span class="req-star">${isRequired && "*"}</span> </span> </label> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Checkbox/Checkbox.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Checkbox/Checkbox.astro", void 0);

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$RadioGroup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$RadioGroup;
  const {
    label,
    color = "primary",
    defaultValue,
    options,
    disabled = false,
    isRequired = false,
    horizontal = false,
    name = generateID("radio"),
    class: className
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["sui-radio-container", [
    disabled && "disabled",
    horizontal && "horizontal",
    color,
    className
  ]], "class:list")}> <span> ${label} <span class="req-star">${isRequired && "*"}</span> </span> <div class="sui-radio-inputs" role="radiogroup"> ${options.map(({ label: label2, value, disabled: individuallyDisabled }, i) => renderTemplate`<label${addAttribute(value, "for")}${addAttribute(["sui-radio-label", [individuallyDisabled && "disabled"]], "class:list")}> <div class="sui-radio-box-container"> <div class="sui-radio-box" role="radio"${addAttribute(i === 0 ? 0 : -1, "tabindex")}${addAttribute(value === defaultValue, "aria-checked")}${addAttribute(label2, "aria-label")}></div> </div> <input class="sui-radio-toggle" type="radio"${addAttribute(value, "value")}${addAttribute(value, "id")}${addAttribute(name, "name")}${addAttribute(value === defaultValue, "checked")}${addAttribute(disabled || individuallyDisabled, "disabled")}${addAttribute(isRequired, "required")}> <span>${label2}</span> </label>`)} </div> </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/RadioGroup/RadioGroup.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/RadioGroup/RadioGroup.astro", void 0);

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Row = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Row;
  const { alignCenter, gapSize = "md", ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["sui-row", [alignCenter && "align", gapSize]], "class:list")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Row/Row.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Textarea = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Textarea;
  const {
    label,
    placeholder,
    isRequired,
    fullWidth,
    fullHeight,
    resize,
    name = generateID("textarea"),
    disabled,
    defaultValue,
    ...props
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(name, "for")}${addAttribute(["sui-textarea-label", [
    fullWidth && "full-width",
    fullHeight && "full-height",
    resize && "resize",
    disabled && "disabled"
  ]], "class:list")}> <span class="label"> ${label} <span class="req-star">${isRequired && "*"}</span> </span> <textarea${addAttribute(placeholder, "placeholder")}${addAttribute(name, "name")}${addAttribute(name, "id")} class="sui-textarea"${addAttribute(isRequired, "required")}${addAttribute(disabled, "disabled")}${spreadAttributes(props)}>${defaultValue}</textarea> </label>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Textarea/Textarea.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$DynamicSettingsRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DynamicSettingsRenderer;
  const { fields } = Astro2.props;
  return renderTemplate`${fields.map((field) => {
    switch (field.input) {
      case "checkbox":
        return renderTemplate`${renderComponent($$result, "Checkbox", $$Checkbox, { "label": field.label, "size": field.size, "color": field.color, "defaultChecked": field.defaultChecked, "disabled": field.readOnly, "name": field.name, "isRequired": field.required })}`;
      case "input":
        return renderTemplate`${renderComponent($$result, "Input", $$Input, { "label": field.label, "type": field.type, "placeholder": field.placeholder, "isRequired": field.required, "name": field.name, "disabled": field.readOnly, "defaultValue": field.defaultValue })}`;
      case "textarea":
        return renderTemplate`${renderComponent($$result, "Textarea", $$Textarea, { "label": field.label, "placeholder": field.placeholder, "isRequired": field.required, "name": field.name, "disabled": field.readOnly, "defaultValue": field.defaultValue })}`;
      case "radio":
        return renderTemplate`${renderComponent($$result, "RadioGroup", $$RadioGroup, { "label": field.label, "name": field.name, "options": field.options, "isRequired": field.required, "disabled": field.readOnly, "color": field.color, "defaultValue": field.defaultValue, "horizontal": field.direction === "horizontal" })}`;
      case "select":
        return renderTemplate`${renderComponent($$result, "Select", $$Select, { "label": field.label, "name": field.name, "options": field.options, "isRequired": field.required, "disabled": field.readOnly, "defaultValue": field.defaultValue })}`;
      case "row":
        return renderTemplate`${renderComponent($$result, "Row", $$Row, { "alignCenter": field.alignCenter, "gapSize": field.gapSize }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Astro.self", Astro2.self, { "fields": field.fields })}` })}`;
    }
  })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/DynamicSettingsRenderer.astro", void 0);

export { $$DynamicSettingsRenderer as $ };
