import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  checklistGroups,
  checklistItemIds,
  courses,
  groupProgress,
  isChecked,
  parseCheckedItems,
  toggleChecked,
} from "../packages/course/src/index.ts";
import type { CheckedItems, ChecklistGroup } from "../packages/course/src/index.ts";

const allItems = checklistGroups.flatMap((group) => group.items);

const groupOf = (id: string, itemIds: string[]): ChecklistGroup => ({
  id,
  title: id,
  items: itemIds.map((itemId) => ({ id: itemId, text: itemId, courseIds: ["passwords"] })),
});

describe("checklistGroups", () => {
  it("has no duplicate group or item ids", () => {
    const groupIds = checklistGroups.map((group) => group.id);
    assert.equal(new Set(groupIds).size, groupIds.length);
    const itemIds = checklistItemIds(checklistGroups);
    assert.equal(new Set(itemIds).size, itemIds.length);
  });

  it("has no empty group", () => {
    checklistGroups.forEach((group) => assert.ok(group.items.length > 0, group.id));
  });

  it("links every item to at least one published course", () => {
    const publishedIds = new Set(courses.map((course) => course.id));
    allItems.forEach((item) => {
      assert.ok(item.courseIds.length > 0, item.id);
      item.courseIds.forEach((courseId) => assert.ok(publishedIds.has(courseId), `${item.id} → ${courseId}`));
    });
  });

  it("does not link an item to the same course twice", () => {
    allItems.forEach((item) => assert.equal(new Set(item.courseIds).size, item.courseIds.length, item.id));
  });

  it("has non-empty one-line text", () => {
    allItems.forEach((item) => {
      assert.ok(item.text.trim().length > 0, item.id);
      assert.ok(!item.text.includes("\n"), item.id);
    });
  });
});

describe("parseCheckedItems", () => {
  const known = ["a", "b", "c"];

  it("returns empty for null, malformed JSON, and non-objects", () => {
    [null, "", "{", "[]", '["a"]', "42", '"a"', "null", "true"].forEach((raw) =>
      assert.deepEqual(parseCheckedItems(raw, known), {}, String(raw)),
    );
  });

  it("keeps only known ids whose value is exactly true", () => {
    const raw = '{"a":true,"b":"true","c":1,"unknown":true,"__proto__":true}';
    assert.deepEqual(parseCheckedItems(raw, known), { a: true });
  });

  it("drops ids that were removed from the checklist", () => {
    assert.deepEqual(parseCheckedItems(JSON.stringify({ a: true, removed: true }), known), { a: true });
  });

  it("round-trips what toggleChecked produces", () => {
    const checked = toggleChecked(toggleChecked({}, "a"), "c");
    assert.deepEqual(parseCheckedItems(JSON.stringify(checked), known), checked);
  });
});

describe("toggleChecked", () => {
  it("checks an unchecked item and unchecks a checked one", () => {
    const once = toggleChecked({}, "a");
    assert.equal(isChecked(once, "a"), true);
    assert.deepEqual(toggleChecked(once, "a"), {});
  });

  it("does not mutate its input or touch other items", () => {
    const before: CheckedItems = { a: true, b: true };
    const after = toggleChecked(before, "a");
    assert.deepEqual(before, { a: true, b: true });
    assert.deepEqual(after, { b: true });
  });
});

describe("groupProgress", () => {
  it("counts checked items in the group only", () => {
    const group = groupOf("g", ["a", "b", "c"]);
    assert.deepEqual(groupProgress(group, { a: true, c: true, other: true }), { checkedCount: 2, total: 3 });
  });

  it("reports zero for nothing checked", () => {
    assert.deepEqual(groupProgress(groupOf("g", ["a"]), {}), { checkedCount: 0, total: 1 });
  });
});
