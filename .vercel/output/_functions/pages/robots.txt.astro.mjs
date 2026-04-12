export { renderers } from '../renderers.mjs';

const GET = ({ site }) => {
  const sitemapUrl = new URL("/sitemap.xml", site).href;
  const body = `User-agent: *
Allow: /
Disallow: /dashboard/

Sitemap: ${sitemapUrl}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
