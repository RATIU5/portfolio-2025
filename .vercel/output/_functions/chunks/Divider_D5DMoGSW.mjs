import { s as serverUiTranslations, d as defaultLang } from './LanguageSelector_D2Mp70Tp.mjs';
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, f as renderSlot, d as renderTemplate } from './astro/server_D64VbtqW.mjs';
/* empty css                         */

const uiTranslations = serverUiTranslations;
function useTranslations(lang, component) {
  return function t(key) {
    const v = uiTranslations[lang]?.translations?.[component]?.[key];
    if (typeof v === "string") return v;
    const fb = uiTranslations[defaultLang]?.translations?.[component]?.[key];
    return typeof fb === "string" ? fb : String(key);
  };
}
function generateComponentTranslationMap(component) {
  const map = {};
  for (const lang in uiTranslations) {
    map[lang] = {};
    const translations = uiTranslations[lang]?.translations?.[component];
    if (translations) {
      for (const key in translations) {
        map[lang][key] = translations[key];
      }
    }
  }
  return map;
}

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Divider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Divider;
  const hasDefaultSlot = Astro2.slots.has("default");
  const { background = "background-base" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="sui-divider-container"> <hr class="sui-divider-line"> <div class="sui-divider-content"${addAttribute(`background-color: var(--${background}); padding: ${hasDefaultSlot ? ".25rem .5rem;" : "0"}`, "style")}> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Divider/Divider.astro", void 0);

export { $$Divider as $, generateComponentTranslationMap as g, useTranslations as u };
