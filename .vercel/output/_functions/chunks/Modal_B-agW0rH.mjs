import { a as createComponent, m as maybeRenderHead, f as renderSlot, d as renderTemplate, c as createAstro, b as addAttribute, e as renderComponent } from './astro/server_D64VbtqW.mjs';
/* empty css                         */
import { $ as $$Icon, a as $$Button } from './LanguageSelector_D2Mp70Tp.mjs';
/* empty css                                */

const $$Center = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="sui-center"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Center/Center.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Modal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Modal;
  const {
    id,
    size = "md",
    dismissable = true,
    isForm = false,
    cancelButton,
    actionButton
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<dialog popover${addAttribute(id, "id")}${addAttribute(`${dismissable}`, "data-dismissable")}${addAttribute(actionButton, "data-has-action-button")}${addAttribute(cancelButton, "data-has-cancel-button")}${addAttribute(["sui-modal", [size]], "class:list")}${addAttribute(isForm, "data-form")}> <div class="sui-modal-header"> ${renderSlot($$result, $$slots["header"])} ${(dismissable || !cancelButton && !actionButton) && renderTemplate`<button class="x-mark-container"${addAttribute(`${id}-btn-x`, "id")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:x-mark", "width": 24, "height": 24, "class": "dismiss-icon" })} </button>`} </div> <form${addAttribute(`${id}-form-element`, "id")}> <div class="sui-modal-body"> ${renderSlot($$result, $$slots["default"])} </div> <div class="sui-modal-footer"> ${cancelButton && renderTemplate`${renderComponent($$result, "Button", $$Button, { "id": `${id}-btn-cancel`, "color": typeof cancelButton === "string" ? "danger" : cancelButton.color, "variant": "flat", "type": isForm ? "reset" : "button" }, { "default": ($$result2) => renderTemplate`${typeof cancelButton === "string" ? cancelButton : cancelButton.label}` })}`} ${actionButton && renderTemplate`${renderComponent($$result, "Button", $$Button, { "id": `${id}-btn-confirm`, "type": "submit", "color": typeof actionButton === "string" ? "primary" : actionButton.color, "variant": "solid", "type": isForm ? "submit" : "button" }, { "default": ($$result2) => renderTemplate`${typeof actionButton === "string" ? actionButton : actionButton.label}` })}`} </div> </form> </dialog>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Modal/Modal.astro", void 0);

export { $$Modal as $, $$Center as a };
