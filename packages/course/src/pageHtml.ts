import { coursePath, fileUrl, pageUrl, PUBLISHER_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./sitePages.ts";
import type { PageLink, PageSection, SitePage } from "./sitePages.ts";
import { toReviewSections } from "./reviewPoints.ts";
import type { Course } from "./types.ts";

const OG_IMAGE_WIDTH_PX = 1200;
const OG_IMAGE_HEIGHT_PX = 630;

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const escapeHtml = (text: string): string => text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

export const ogImagePath = (key: string): string => `og/${key}.png`;

// Marks the tags the app replaces when it moves to another page.
export const PAGE_HEAD_ATTRIBUTE = "data-page-head";

const meta = (attribute: "name" | "property", key: string, value: string): string =>
  `<meta ${PAGE_HEAD_ATTRIBUTE} ${attribute}="${key}" content="${escapeHtml(value)}" />`;

const jsonLdScript = (data: unknown): string =>
  `<script ${PAGE_HEAD_ATTRIBUTE} type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

export const renderHeadTags = (page: SitePage): string => {
  const url = pageUrl(page.path);
  const image = fileUrl(ogImagePath(page.ogImageKey));
  const tags = [
    `<title ${PAGE_HEAD_ATTRIBUTE}>${escapeHtml(page.title)}</title>`,
    meta("name", "description", page.description),
    `<link ${PAGE_HEAD_ATTRIBUTE} rel="canonical" href="${escapeHtml(url)}" />`,
  ];
  if (!page.indexable) tags.push(meta("name", "robots", "noindex"));
  tags.push(
    meta("property", "og:type", page.path === "" ? "website" : "article"),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:locale", "ja_JP"),
    meta("property", "og:title", page.title),
    meta("property", "og:description", page.description),
    meta("property", "og:url", url),
    meta("property", "og:image", image),
    meta("property", "og:image:width", String(OG_IMAGE_WIDTH_PX)),
    meta("property", "og:image:height", String(OG_IMAGE_HEIGHT_PX)),
    meta("property", "og:image:alt", page.heading),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", page.title),
    meta("name", "twitter:description", page.description),
    meta("name", "twitter:image", image),
  );
  page.jsonLd.forEach((data) => tags.push(jsonLdScript(data)));
  return tags.join("\n    ");
};

const linkHtml = (link: PageLink): string =>
  link.path === undefined
    ? escapeHtml(link.text)
    : `<a href="${escapeHtml(pageUrl(link.path))}">${escapeHtml(link.text)}</a>`;

const sectionBodyHtml = (section: PageSection): string =>
  section.layout === "paragraphs"
    ? section.items.map((item) => `<p>${linkHtml(item)}</p>`).join("\n")
    : ["<ul>", ...section.items.map((item) => `<li>${linkHtml(item)}</li>`), "</ul>"].join("\n");

export const renderStaticBody = (page: SitePage): string => {
  const parts = [
    `<main class="mx-auto max-w-4xl px-4 py-8">`,
    `<p><a href="${SITE_URL}">${SITE_NAME}</a></p>`,
    `<h1>${escapeHtml(page.heading)}</h1>`,
    `<p>${escapeHtml(page.description)}</p>`,
  ];
  page.sections.forEach((section) => parts.push(`<h2>${escapeHtml(section.heading)}</h2>`, sectionBodyHtml(section)));
  parts.push(`<p>運営：<a href="https://singularitysociety.org">${PUBLISHER_NAME}</a></p>`, "</main>");
  return parts.join("\n");
};

export const renderPageHtml = (template: string, page: SitePage): string =>
  template
    .replace(/<title>[^<]*<\/title>/, () => renderHeadTags(page))
    .replace('<div id="app"></div>', () => `<div id="app">\n${renderStaticBody(page)}\n</div>`);

export const renderSitemap = (pages: readonly SitePage[]): string => {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];
  pages
    .filter((page) => page.indexable)
    .forEach((page) => lines.push(`  <url><loc>${escapeHtml(pageUrl(page.path))}</loc></url>`));
  lines.push("</urlset>", "");
  return lines.join("\n");
};

export const renderLlmsTxt = (pages: readonly SitePage[]): string => {
  const lines = [`# ${SITE_NAME}`, "", `> ${SITE_DESCRIPTION}`, "", `運営：${PUBLISHER_NAME}`, ""];
  const home = pages.find((page) => page.path === "");
  home?.sections.forEach((section) => {
    lines.push(`## ${section.heading}`, "");
    section.items.forEach((item) =>
      lines.push(item.path === undefined ? `- ${item.text}` : `- [${item.text}](${pageUrl(item.path)})`),
    );
    lines.push("");
  });
  lines.push(`全コースのナレーション本文：${fileUrl("llms-full.txt")}`, "");
  return lines.join("\n");
};

const courseNarration = (course: Course): string[] => {
  const lines = [`## ${course.title}`, "", pageUrl(coursePath(course.id)), "", course.summary, ""];
  toReviewSections(course.scenes).forEach((section) => lines.push(`### ${section.heading}`, "", section.narration, ""));
  return lines;
};

export const renderLlmsFullTxt = (courses: readonly Course[]): string =>
  [`# ${SITE_NAME}：全コースのナレーション`, "", `> ${SITE_DESCRIPTION}`, "", ...courses.flatMap(courseNarration)].join(
    "\n",
  );
