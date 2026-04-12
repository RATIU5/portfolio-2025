import { r as runSDK, S as SDKCoreJs } from '../chunks/index_DmoCs122.mjs';
export { renderers } from '../renderers.mjs';

const GET = async ({ site }) => {
  const pages = await runSDK(SDKCoreJs.GET.folderPages("article"));
  const sortedArticles = pages.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const items = sortedArticles.map(
    (article) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${new URL(`/${article.slug}`, site).href}</link>
      <guid>${new URL(`/${article.slug}`, site).href}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RATIU5</title>
    <description>Articles by RATIU5</description>
    <link>${site}</link>
    <atom:link href="${new URL("/rss.xml", site).href}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
${items}
  </channel>
</rss>`;
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
