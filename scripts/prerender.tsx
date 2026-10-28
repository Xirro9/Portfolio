import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import App from "../src/App";
import { allRoutes, href, routeMetadata } from "../src/routes";
import { site } from "../src/content/site";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
const template = await readFile("dist/index.html", "utf8");
const routes = allRoutes();
for (const route of [
  ...routes,
  {
    path: "/404",
    title: "Page not found",
    description: "This portfolio page could not be found.",
  },
]) {
  const meta = route.path === "/404" ? route : routeMetadata(route.path);
  const canonical = `${site.origin}${href(route.path)}`;
  const html = template
    .replace(
      /<title>.*?<\/title>/s,
      `<title>${escapeHtml(meta.title)} | Mahin Moon</title>`,
    )
    .replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      "</head>",
      `${route.path === "/404" ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`}
      <meta property="og:title" content="${escapeHtml(meta.title)} | Mahin Moon" />
      <meta property="og:description" content="${escapeHtml(meta.description)}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${canonical}" />
      <meta property="og:site_name" content="Mahin Moon" />
      <meta name="twitter:card" content="summary" />
    </head>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(<App path={route.path} />)}</div>`,
    );
  const target =
    route.path === "/404"
      ? "dist/404.html"
      : join("dist", route.path, "index.html");
  await mkdir(join(target, ".."), { recursive: true });
  await writeFile(target, html);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${site.origin}${href(route.path)}</loc></url>`).join("")}</urlset>\n`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /Portfolio/\nSitemap: ${site.origin}${site.base}/sitemap.xml\n`,
);
console.log(
  `Generated ${routes.length} static routes, 404.html, and sitemap.xml.`,
);
