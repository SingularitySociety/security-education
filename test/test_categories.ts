import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  courseCategories,
  courses,
  draftCourses,
  groupCoursesByCategory,
  UNCATEGORIZED_CATEGORY,
} from "../packages/course/src/index.ts";
import type { Course, CourseCategory } from "../packages/course/src/index.ts";

const courseWithId = (id: string): Course => ({ id, title: id, summary: "", scenes: [], questionPool: [] });

const category = (id: string, courseIds: string[], upcomingTitles: string[] = []): CourseCategory => ({
  id,
  title: id,
  audience: "",
  courseIds,
  upcoming: upcomingTitles.map((title) => ({ title, summary: "" })),
});

const groupIds = (groups: ReturnType<typeof groupCoursesByCategory>) =>
  groups.map((group) => [group.category.id, group.courses.map((course) => course.id)]);

describe("groupCoursesByCategory", () => {
  it("keeps category order and the order of courseIds within a category", () => {
    const groups = groupCoursesByCategory(
      [category("first", ["b", "a"]), category("second", ["c"])],
      ["a", "b", "c"].map(courseWithId),
    );
    assert.deepEqual(groupIds(groups), [
      ["first", ["b", "a"]],
      ["second", ["c"]],
    ]);
  });

  it("drops categories that have no registered course", () => {
    const groups = groupCoursesByCategory(
      [category("empty", ["missing"]), category("full", ["a"])],
      [courseWithId("a")],
    );
    assert.deepEqual(groupIds(groups), [["full", ["a"]]]);
  });

  it("puts courses that belong to no category into the uncategorized group at the end", () => {
    const groups = groupCoursesByCategory([category("first", ["a"])], ["a", "orphan"].map(courseWithId));
    assert.deepEqual(groupIds(groups), [
      ["first", ["a"]],
      [UNCATEGORIZED_CATEGORY.id, ["orphan"]],
    ]);
  });

  it("returns nothing when there are no courses, and only uncategorized when there are no categories", () => {
    assert.deepEqual(groupCoursesByCategory([category("first", ["a"])], []), []);
    assert.deepEqual(groupIds(groupCoursesByCategory([], [courseWithId("a")])), [[UNCATEGORIZED_CATEGORY.id, ["a"]]]);
  });
});

describe("groupCoursesByCategory with drafts and upcoming courses", () => {
  it("lists drafts and upcoming courses under their category, apart from published ones", () => {
    const [group] = groupCoursesByCategory(
      [category("first", ["a", "draft"], ["planned"])],
      [courseWithId("a")],
      [courseWithId("draft")],
    );
    assert.deepEqual(
      group?.courses.map((course) => course.id),
      ["a"],
    );
    assert.deepEqual(
      group?.drafts.map((course) => course.id),
      ["draft"],
    );
    assert.deepEqual(
      group?.upcoming.map((course) => course.title),
      ["planned"],
    );
  });

  it("keeps a category that has only upcoming courses", () => {
    const groups = groupCoursesByCategory([category("future", [], ["planned"])], []);
    assert.deepEqual(groupIds(groups), [["future", []]]);
  });

  it("puts drafts that belong to no category into the uncategorized group", () => {
    const groups = groupCoursesByCategory([], [], [courseWithId("orphan")]);
    assert.deepEqual(groups[0]?.category.id, UNCATEGORIZED_CATEGORY.id);
    assert.deepEqual(
      groups[0]?.drafts.map((course) => course.id),
      ["orphan"],
    );
  });
});

describe("courseCategories", () => {
  it("no course is both published and a draft", () => {
    const publishedIds = new Set(courses.map((course) => course.id));
    draftCourses.forEach((course) => assert.ok(!publishedIds.has(course.id), course.id));
  });

  it("every published and draft course belongs to exactly one category", () => {
    [...courses, ...draftCourses].forEach((course) => {
      const owners = courseCategories.filter((candidate) => candidate.courseIds.includes(course.id));
      assert.equal(owners.length, 1, course.id);
    });
  });

  it("category ids and listed course ids are unique", () => {
    const categoryIds = courseCategories.map((candidate) => candidate.id);
    const listedCourseIds = courseCategories.flatMap((candidate) => candidate.courseIds);
    assert.equal(new Set(categoryIds).size, categoryIds.length);
    assert.equal(new Set(listedCourseIds).size, listedCourseIds.length);
  });
});
