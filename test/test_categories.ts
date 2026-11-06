import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  courseCategories,
  courses,
  groupCoursesByCategory,
  UNCATEGORIZED_CATEGORY,
} from "../packages/course/src/index.ts";
import type { Course, CourseCategory } from "../packages/course/src/index.ts";

const courseWithId = (id: string): Course => ({ id, title: id, summary: "", scenes: [], questionPool: [] });

const category = (id: string, courseIds: string[]): CourseCategory => ({ id, title: id, audience: "", courseIds });

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
    assert.deepEqual(groupCoursesByCategory(courseCategories, []), []);
    assert.deepEqual(groupIds(groupCoursesByCategory([], [courseWithId("a")])), [[UNCATEGORIZED_CATEGORY.id, ["a"]]]);
  });
});

describe("courseCategories", () => {
  it("every registered course belongs to exactly one category", () => {
    courses.forEach((course) => {
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
