import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  audiencePages,
  audiencePath,
  categoryPath,
  checklistGroups,
  courseCategories,
  courses,
  findAudiencePage,
  findSitePage,
  sitePages,
} from "../packages/course/src/index.ts";

const courseIds = new Set(courses.map((course) => course.id));
const groupIds = new Set(checklistGroups.map((group) => group.id));
const pages = sitePages();

describe("audience pages", () => {
  it("have unique ids", () => {
    assert.equal(new Set(audiencePages.map((page) => page.id)).size, audiencePages.length);
  });

  it("only recommend published courses, each at most once per page", () => {
    audiencePages.forEach((page) => {
      const recommended = page.steps.flatMap((step) => step.courseIds);
      recommended.forEach((id) => assert.ok(courseIds.has(id), `${page.id}: ${id}`));
      assert.equal(new Set(recommended).size, recommended.length, page.id);
    });
  });

  it("only point to existing checklist groups", () => {
    audiencePages.forEach((page) =>
      page.checklistGroupIds.forEach((id) => assert.ok(groupIds.has(id), `${page.id}: ${id}`)),
    );
  });

  it("have no empty steps or texts", () => {
    audiencePages.forEach((page) => {
      [page.title, page.navLabel, page.tagline, page.description, page.shareHeading, page.shareMessage].forEach(
        (text) => assert.ok(text.length > 0, page.id),
      );
      assert.ok(page.intro.length > 0, page.id);
      page.steps.forEach((step) => assert.ok(step.courseIds.length > 0, `${page.id}: ${step.heading}`));
    });
  });

  it("can be found by id", () => {
    assert.equal(findAudiencePage("family")?.id, "family");
    assert.equal(findAudiencePage("no-such-page"), undefined);
  });

  it("each have a site page that lists every recommended course", () => {
    audiencePages.forEach((audience) => {
      const page = findSitePage(pages, audiencePath(audience.id));
      assert.ok(page, audience.id);
      const linked = page.sections.flatMap((section) => section.items.flatMap((item) => item.path ?? []));
      audience.steps
        .flatMap((step) => step.courseIds)
        .forEach((id) => assert.ok(linked.includes(`courses/${id}`), `${audience.id}: ${id}`));
    });
  });
});

describe("category pages", () => {
  it("exist for every category with courses, and list exactly its courses", () => {
    courseCategories.forEach((category) => {
      const page = findSitePage(pages, categoryPath(category.id));
      assert.ok(page, category.id);
      const linked = page.sections.flatMap((section) => section.items.flatMap((item) => item.path ?? []));
      assert.deepEqual(
        linked,
        category.courseIds.map((id) => `courses/${id}`),
      );
    });
  });

  it("are linked from the home page", () => {
    const home = findSitePage(pages, "");
    assert.ok(home);
    const linked = home.sections.flatMap((section) => section.items.flatMap((item) => item.path ?? []));
    courseCategories.forEach((category) => assert.ok(linked.includes(categoryPath(category.id)), category.id));
    audiencePages.forEach((audience) => assert.ok(linked.includes(audiencePath(audience.id)), audience.id));
  });
});
