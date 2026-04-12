import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, e as renderComponent, d as renderTemplate, F as Fragment, r as renderScript, u as unescapeHTML, f as renderSlot } from './astro/server_D64VbtqW.mjs';
import { g as generateID } from './Input_mJ0hT4yn.mjs';
import { $ as $$Icon } from './LanguageSelector_D2Mp70Tp.mjs';
/* empty css                              */

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Tabs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Tabs;
  const getAttributes = (tagContent) => {
    const attributes = {};
    const attributeRegex = /data-([\w-]+)="([^"]*)"/g;
    for (const match of tagContent.matchAll(attributeRegex)) {
      const [, key, value] = match;
      if (!key || !value) continue;
      if (key === "icon" || key === "label" || key === "color") {
        attributes[key] = value;
      } else if (key === "tab-id") {
        attributes.tabId = value;
      } else if (key === "active") {
        attributes.active = value === "true";
      }
    }
    return attributes;
  };
  const extractTabInfoWithRegex = (html) => {
    const nestedContainerRanges = [];
    const containerRegex = /<div[^>]*?class="[^"]*?\bsui-tabs-container\b[^"]*?".*?>/gi;
    for (const containerMatch of html.matchAll(containerRegex)) {
      const startIndex = containerMatch.index;
      let openCount = 0;
      const searchArea = html.substring(startIndex);
      const tagRegex = /<\/?div/gi;
      for (const tagMatch of searchArea.matchAll(tagRegex)) {
        if (tagMatch[0].toLowerCase() === "<div") {
          openCount++;
        } else {
          openCount--;
        }
        if (openCount === 0) {
          const endIndex = startIndex + tagMatch.index + tagMatch[0].length;
          nestedContainerRanges.push({ start: startIndex, end: endIndex });
          break;
        }
      }
    }
    const tabs2 = [];
    const tabItemRegex = /<sui-tab-item([^>]*?)>/gi;
    for (const tabMatch of html.matchAll(tabItemRegex)) {
      const tabIndex = tabMatch.index;
      const isNested = nestedContainerRanges.some(
        (range) => tabIndex > range.start && tabIndex < range.end
      );
      if (!isNested) {
        const attributes = getAttributes(tabMatch[1]);
        if (attributes.tabId) {
          tabs2.push(attributes);
        }
      }
    }
    return tabs2;
  };
  const markTabAsActive = (tabId, html) => {
    if (!tabId) return html;
    const updatedHtml = html.replace(
      /<sui-tab-item[^>]*data-tab-id="([^"]*)"[^>]*>/g,
      (match, tabIdValue) => {
        if (tabIdValue === tabId) {
          if (match.includes('class="')) {
            return match.replace(/(class="[^"]*)"/, '$1 active"');
          }
          return match.replace(/(<sui-tab-item[^>]*data-tab-id="[^"]*")/, '$1 class="active"');
        }
        return match;
      }
    );
    return updatedHtml;
  };
  const uniqueId = generateID("sui-tabs-container");
  const {
    id: customId,
    syncKey: originalSyncKey,
    storage = "session",
    variant = "default",
    align = "left"
  } = Astro2.props;
  const syncKey = originalSyncKey ? `sui-tabs-${originalSyncKey}` : void 0;
  const tabContents = await Astro2.slots.render("default");
  const tabs = extractTabInfoWithRegex(tabContents);
  const defaultActiveTab = tabs.find((tab) => tab.active) ?? tabs[0];
  const finalizedTabContents = markTabAsActive(defaultActiveTab?.tabId || "", tabContents);
  const containerId = generateID("sui-tabs-container");
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(customId ?? containerId, "id")}${addAttribute(syncKey, "data-sync-key")}${addAttribute(customId ?? uniqueId, "data-unique-id")}${addAttribute(storage, "data-storage-strategy")}${addAttribute(["sui-tabs-container", [variant, align]], "class:list")}> <div class="sui-tabs-list" role="tablist"> ${tabs.map((tab, i) => {
    const isActive = tab.tabId === defaultActiveTab?.tabId;
    return renderTemplate`<button role="tab" type="button"${addAttribute(syncKey ? `${syncKey}-${i}` : void 0, "id")}${addAttribute(isActive ? 0 : -1, "tabindex")}${addAttribute(tab.tabId, "data-tab-child")}${addAttribute(["sui-tab-header", [isActive && "active", tab.color, syncKey && `${syncKey}:${i}`]], "class:list")}> ${tab.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": tab.icon, "width": 24, "height": 24 })}`} <span>${tab.label}</span> </button>`;
  })} </div> <div class="sui-tabs-content"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(finalizedTabContents)}` })} </div> </div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Tabs/Tabs.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Tabs/Tabs.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$TabItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TabItem;
  const id = generateID("tab");
  const { icon, label, color = "primary", active = false, id: customId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "sui-tab-item", "sui-tab-item", { "id": customId ?? id, "data-icon": icon, "data-label": label, "data-color": color, "data-tab-id": customId ?? id, "data-active": active ? "true" : void 0, "data-astro-cid-l3ifl5vs": true }, { "default": () => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Tabs/TabItem.astro", void 0);

export { $$Tabs as $, $$TabItem as a };
