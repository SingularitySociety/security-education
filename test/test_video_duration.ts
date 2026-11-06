import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  courses,
  formatMinutesSeconds,
  isVideoDurations,
  videoDurationSeconds,
  withVideoDuration,
} from "../packages/course/src/index.ts";

describe("formatMinutesSeconds", () => {
  it("formats minutes and seconds", () => {
    assert.equal(formatMinutesSeconds(450), "7分30秒");
    assert.equal(formatMinutesSeconds(61), "1分1秒");
  });

  it("drops the zero part", () => {
    assert.equal(formatMinutesSeconds(420), "7分");
    assert.equal(formatMinutesSeconds(42), "42秒");
    assert.equal(formatMinutesSeconds(0), "0秒");
  });

  it("rounds to the nearest second, carrying into minutes", () => {
    assert.equal(formatMinutesSeconds(59.6), "1分");
    assert.equal(formatMinutesSeconds(596.4), "9分56秒");
  });

  it("treats negative input as zero", () => {
    assert.equal(formatMinutesSeconds(-5), "0秒");
  });
});

describe("videoDurationSeconds", () => {
  it("knows the length of every published course video", () => {
    courses.forEach((course) => {
      const seconds = videoDurationSeconds(course.id);
      assert.ok(seconds !== undefined && seconds > 0, course.id);
    });
  });

  it("returns undefined for an unknown course", () => {
    assert.equal(videoDurationSeconds("no-such-course"), undefined);
  });
});

describe("isVideoDurations", () => {
  it("accepts a map of positive finite seconds", () => {
    assert.ok(isVideoDurations({}));
    assert.ok(isVideoDurations({ a: 1.5, b: 600 }));
  });

  it("rejects anything else", () => {
    [null, undefined, 3, "x", [], { a: "1" }, { a: 0 }, { a: -1 }, { a: Number.NaN }, { a: Infinity }].forEach(
      (value) => assert.equal(isVideoDurations(value), false, String(value)),
    );
  });
});

describe("withVideoDuration", () => {
  it("adds or replaces one entry rounded to a tenth, sorted by id, without mutating", () => {
    const before = { c: 3, a: 1 };
    assert.deepEqual(Object.entries(withVideoDuration(before, "b", 2.345)), [
      ["a", 1],
      ["b", 2.3],
      ["c", 3],
    ]);
    assert.deepEqual(withVideoDuration(before, "a", 9.96), { a: 10, c: 3 });
    assert.deepEqual(before, { c: 3, a: 1 });
  });
});
