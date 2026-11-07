import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  courses,
  coursePath,
  escapeHtml,
  findSitePage,
  ogImagePath,
  PAGE_HEAD_ATTRIBUTE,
  pageUrl,
  pathFromLegacyHash,
  quizPath,
  renderHeadTags,
  renderLlmsFullTxt,
  renderLlmsTxt,
  renderPageHtml,
  renderSitemap,
  renderStaticBody,
  SITE_URL,
  sitePages,
} from "../packages/course/src/index.ts";
import type { SitePage } from "../packages/course/src/index.ts";

const pages = sitePages();
const webPublicDir = fileURLToPath(new URL("../packages/web/public/", import.meta.url));
const TEMPLATE = '<html><head><title>x</title></head><body><div id="app"></div></body></html>';

const tricky: SitePage = {
  path: "courses/tricky",
  title: 'A & B <"quoted">',
  heading: "見出し </script>",
  tagline: "t",
  description: "$& $1 </script><script>alert(1)</script>",
  ogImageKey: "tricky",
  indexable: false,
  jsonLd: [{ "@type": "Course", name: "</script><script>alert(1)</script>" }],
  sections: [{ heading: "<h>", items: [{ text: "a<b", path: "courses/x" }, { text: "plain" }] }],
};

describe("site pages", () => {
  it("has a home page, the checklist, and a course and quiz page for every course", () => {
    assert.ok(findSitePage(pages, "/"));
    assert.ok(findSitePage(pages, "/checklist"));
    courses.forEach((course) => {
      assert.ok(findSitePage(pages, `/${coursePath(course.id)}`), course.id);
      assert.ok(findSitePage(pages, `/${quizPath(course.id)}`), course.id);
    });
  });

  it("gives every page a unique path", () => {
    assert.equal(new Set(pages.map((page) => page.path)).size, pages.length);
  });

  it("keeps quiz pages out of search results and the sitemap", () => {
    const quizzes = pages.filter((page) => page.path.endsWith("/quiz"));
    assert.equal(quizzes.length, courses.length);
    quizzes.forEach((page) => assert.equal(page.indexable, false));
    const sitemap = renderSitemap(pages);
    assert.ok(!sitemap.includes("/quiz"));
    courses.forEach((course) => assert.ok(sitemap.includes(pageUrl(coursePath(course.id))), course.id));
  });

  it("has a rendered share image for every page (run `yarn workspace @security-education/video og`)", () => {
    const missing = [...new Set(pages.map((page) => page.ogImageKey))].filter(
      (key) => !existsSync(`${webPublicDir}${ogImagePath(key)}`),
    );
    assert.deepEqual(missing, []);
  });

  it("gives every page a non-empty title, heading, tagline and description", () => {
    pages.forEach((page) => {
      [page.title, page.heading, page.tagline, page.description].forEach((text) =>
        assert.ok(text.length > 0, page.path),
      );
    });
  });
});

describe("findSitePage", () => {
  it("ignores leading and trailing slashes", () => {
    assert.equal(findSitePage(pages, "/courses/passwords/")?.path, "courses/passwords");
    assert.equal(findSitePage(pages, "courses/passwords")?.path, "courses/passwords");
    assert.equal(findSitePage(pages, "")?.path, "");
  });

  it("returns undefined for unknown paths", () => {
    assert.equal(findSitePage(pages, "/courses/no-such-course"), undefined);
    assert.equal(findSitePage(pages, "/nothing"), undefined);
  });
});

describe("pageUrl", () => {
  it("uses the site root for the home page and a trailing slash elsewhere", () => {
    assert.equal(pageUrl(""), SITE_URL);
    assert.equal(pageUrl("courses/passwords"), `${SITE_URL}courses/passwords/`);
  });
});

describe("pathFromLegacyHash", () => {
  it("turns an old hash link into a path", () => {
    assert.equal(pathFromLegacyHash("#/courses/passwords"), "/courses/passwords");
    assert.equal(pathFromLegacyHash("#/checklist"), "/checklist");
    assert.equal(pathFromLegacyHash("#/"), "/");
  });

  it("leaves anything else alone", () => {
    assert.equal(pathFromLegacyHash(""), undefined);
    assert.equal(pathFromLegacyHash("#category-basics"), undefined);
    assert.equal(pathFromLegacyHash("/courses/passwords"), undefined);
  });
});

describe("page HTML", () => {
  it("escapes HTML special characters", () => {
    assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });

  it("escapes text in head tags and keeps JSON-LD from closing its script element", () => {
    const head = renderHeadTags(tricky);
    assert.ok(head.includes(">A &amp; B &lt;&quot;quoted&quot;&gt;</title>"));
    assert.ok(!head.includes("<script>alert"));
    assert.equal(head.split("</script>").length - 1, 1);
    assert.ok(head.includes('name="robots" content="noindex"'));
  });

  it("marks every head tag so the app can replace them all on navigation", () => {
    const lines = renderHeadTags(tricky)
      .split("\n")
      .map((line) => line.trim());
    lines.forEach((line) => assert.ok(line.includes(PAGE_HEAD_ATTRIBUTE), line));
  });

  it("puts the canonical URL, share image and card type in the head", () => {
    const page = findSitePage(pages, "/courses/passwords");
    assert.ok(page);
    const head = renderHeadTags(page);
    assert.ok(head.includes(`rel="canonical" href="${SITE_URL}courses/passwords/"`));
    assert.ok(head.includes(`content="${SITE_URL}og/passwords.png"`));
    assert.ok(head.includes('content="summary_large_image"'));
    assert.ok(!head.includes("noindex"));
    assert.ok(head.includes('"@type":"Course"'));
  });

  it("does not treat $ patterns in the content as replacement patterns", () => {
    const html = renderPageHtml(TEMPLATE, tricky);
    assert.ok(html.includes("$&amp; $1"));
    assert.ok(!html.includes("<title>x</title>"));
    assert.ok(html.includes('<div id="app">\n<main'));
  });

  it("links sections in the static body and escapes their text", () => {
    const body = renderStaticBody(tricky);
    assert.ok(body.includes(`<a href="${SITE_URL}courses/x/">a&lt;b</a>`));
    assert.ok(body.includes("<li>plain</li>"));
    assert.ok(body.includes("<h2>&lt;h&gt;</h2>"));
  });

  it("includes every course's narration in the course page body", () => {
    const page = findSitePage(pages, "/courses/passwords");
    const course = courses.find((candidate) => candidate.id === "passwords");
    assert.ok(page && course);
    const body = renderStaticBody(page);
    course.scenes.slice(1).forEach((scene) => assert.ok(body.includes(escapeHtml(scene.narration)), scene.id));
  });
});

describe("llms.txt", () => {
  it("links every course", () => {
    const text = renderLlmsTxt(pages);
    courses.forEach((course) => assert.ok(text.includes(pageUrl(coursePath(course.id))), course.id));
  });

  it("carries every course's narration in the full text", () => {
    const text = renderLlmsFullTxt(courses);
    courses.forEach((course) =>
      course.scenes.forEach((scene) => assert.ok(text.includes(scene.narration), `${course.id}/${scene.id}`)),
    );
  });
});
