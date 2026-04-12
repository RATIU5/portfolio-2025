import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead, f as renderSlot } from './astro/server_D64VbtqW.mjs';
/* empty css                         */

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { as: As = "div", fullWidth, fullHeight, variant = "default", ...props } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "As", As, { "class:list": ["sui-card", [fullWidth && "full-w", fullHeight && "full-h", variant]], ...props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="sui-card-header"> ${renderSlot($$result2, $$slots["header"])} </div> <div class="sui-card-body"> ${renderSlot($$result2, $$slots["default"])} </div> <div class="sui-card-footer"> ${renderSlot($$result2, $$slots["footer"])} </div> ` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Card/Card.astro", void 0);

export { $$Card as $ };
