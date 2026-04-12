import { r as runSDK, S as SDKCoreJs } from '../chunks/index_DmoCs122.mjs';
export { renderers } from '../renderers.mjs';

const GET = async ({ site }) => {
  const pages = await runSDK(SDKCoreJs.GET.folderPages("article"));
  const staticPages = [
    { loc: new URL("/", site).href, priority: "1.0" },
    { loc: new URL("/articles", site).href, priority: "0.8" }
  ];
  const articlePages = pages.map((page) => ({
    loc: new URL(`/${page.slug}`, site).href,
    lastmod: page.updatedAt ? new Date(page.updatedAt).toISOString() : new Date(page.publishedAt).toISOString(),
    priority: "0.6"
  }));
  const urls = [...staticPages, ...articlePages];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(
    (url) => `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ""}
    <priority>${url.priority}</priority>
  </url>`
  ).join("\n")}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
