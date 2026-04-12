import { a as createComponent, m as maybeRenderHead, b as addAttribute, e as renderComponent, d as renderTemplate, r as renderScript, c as createAstro } from './astro/server_D64VbtqW.mjs';
import { $ as $$Icon } from './LanguageSelector_D2Mp70Tp.mjs';
/* empty css                         */

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SSRUser = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SSRUser;
  const heroIconsUserDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADSklEQVR4AdSWS2xMYRTHjQXRRupRKVWrJhrxSCRigTQpYUHq0VYsarwi8RgJ0rCwFJEQEQ1psZFQXWgGRZB6NdFalkSFFRutV1UJNhLj9+dcOubeud8dC2lzfvd/7vedc77TO999DB/2n/+GZgOpVCoOSegx5K/N5WJGugIsNhHusNBZqIJiQ/455tqgiDFni9QAVZthIVyBBTAWJsBKeAOL4Tw4m3MD/GebqVoBV2Ox2ArohAHog1bGZ0MfLCJ2A+pkzg1QrRpkB3X4G5p4xdhOkOknkYYSpYE5Vu2pqZ/ctUFdDXOzS5QGvlkplxyXmJ/lnAOJfgSyMh0C0AbVVJcOLkRp4JQV3GeaJmy8SQzUg6xRBxecG2CTaaffpGgli12DeVAAhaDb8CFzhXCZ2Ouokzk3YNU2ordhGXTCALyDS6AH0C10CzhbpAb4z16DHjZxVtCivWgPJCHO3BJ4i+9skRrwqrJIE1TBZCiBGmjy5qNoTg1EWSAsNlIDbLZi2AEt0A2fDPkX8BOguyFs3d/zTg1QNB+OkPUcjkMNTIfRhvzV+CfgBbGHYBR+qIU2QCG97dqpVAcjoRuOgpqYggr5GnvCuWL2ou3kjkOzWtYGKFBAdgfoPfAR1S02iw1XB0l4achXgzOJ2QaKnYt2WA1cfwtsgETNtZA2FXR/l7LYaUhx7muag5NMloI+XKahzdSKob6mRXwnGEyA7nm949dQ+D3nTmax2hN6SC0lSVcOyTTfBuhYl36/hddS8IP5zmI56y3hADW1Ye30j/g2wLQ21Ri0i0JtaE5G7g0SH8N40PsCSbegBiot7J7pv4hXw6uZViuogRkWpdvP3JzFq6E7JKNIUAP63FbwJn67KsjTSRSUA/o2XGd5Xk07/SVBDei7/zshq0Bvun6KtcIeqIUKKAM9IfNQ+RrTnGL07dBvufrtVesM5xnm2wCbZyuRer9vR+/DCFgOh0FvPX18PsP/DF9AvsY0pxjFKke5up2LqLmLuAzzbUBRJOh7vxEt57wEVKABvQgPQO+Fr6iQrzHNKWY343pNl5PfAHqWMJRpgQ0MDqVAL9RDAqphPujJmI8K+RrTnGKOMa6PlcFlfH2nBnwzHQfDwn4AAAD//6qWhy8AAAAGSURBVAMAJXQ0UKI3Vu0AAAAASUVORK5CYII=";
  const {
    name,
    description,
    avatar,
    class: className,
    loading = "lazy",
    timeoutDelay = 3e3,
    id
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["sui-user-container", [className]], "class:list")}${addAttribute(id, "id")} data-astro-cid-enel7ifv> <div class="sui-avatar-container" data-astro-cid-enel7ifv> ${avatar ? renderTemplate`${renderComponent($$result, "studiocms-avatar", "studiocms-avatar", { "data-avatar-url": avatar, "data-avatar-timeout": timeoutDelay, "data-avatar-fallback": heroIconsUserDataUri, "data-avatar-name": name, "data-avatar-loading": loading, "data-astro-cid-enel7ifv": true }, { "default": () => renderTemplate` <img${addAttribute(heroIconsUserDataUri, "src")}${addAttribute(64, "width")}${addAttribute(64, "height")} class="sui-avatar-img"${addAttribute(name, "alt")}${addAttribute(loading, "loading")} decoding="async" referrerpolicy="no-referrer" data-astro-cid-enel7ifv> ` })}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:user", "width": 24, "height": 24, "role": "img", "aria-label": `Placeholder avatar for ${name}`, "data-astro-cid-enel7ifv": true })}`} </div> <div class="sui-text-content" data-astro-cid-enel7ifv> <span class="sui-name" data-astro-cid-enel7ifv>${name}</span> <span class="sui-description" data-astro-cid-enel7ifv>${description}</span> </div> </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/SSRUser.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/shared/SSRUser.astro", void 0);

export { $$SSRUser as $ };
