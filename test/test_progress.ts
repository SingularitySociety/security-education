import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_PROGRESS,
  markWatched,
  parseProgressMap,
  progressOf,
  recordAttempt,
} from "../packages/course/src/progress.ts";
import type { QuizResult } from "../packages/course/src/scoring.ts";

const resultWith = (scorePercent: number, passed: boolean): QuizResult => ({
  correctCount: 0,
  total: 0,
  scorePercent,
  passed,
  questionResults: [],
});

describe("parseProgressMap", () => {
  it("returns empty for null, malformed JSON, and non-objects", () => {
    [null, "", "{", "[]", "42", '"text"', "null"].forEach((raw) =>
      assert.deepEqual(parseProgressMap(raw), {}, String(raw)),
    );
  });

  it("keeps valid entries and drops invalid ones", () => {
    const raw = JSON.stringify({
      ok: { watched: true, bestScorePercent: 80, passed: true },
      fresh: { watched: false, bestScorePercent: null, passed: false },
      badType: { watched: "yes", bestScorePercent: null, passed: false },
      outOfRange: { watched: true, bestScorePercent: 120, passed: true },
      negative: { watched: true, bestScorePercent: -1, passed: false },
      missing: { watched: true },
      notObject: 3,
    });
    assert.deepEqual(Object.keys(parseProgressMap(raw)).sort(), ["fresh", "ok"]);
  });
});

describe("progress updates", () => {
  it("progressOf falls back to empty progress", () => {
    assert.deepEqual(progressOf({}, "x"), EMPTY_PROGRESS);
  });

  it("markWatched keeps score and does not mutate input", () => {
    const before = { a: { watched: false, bestScorePercent: 60, passed: false } };
    const after = markWatched(before, "a");
    assert.deepEqual(after.a, { watched: true, bestScorePercent: 60, passed: false });
    assert.equal(before.a.watched, false);
  });

  it("recordAttempt keeps the best score and never un-passes", () => {
    const passedOnce = recordAttempt({}, "a", resultWith(100, true));
    const thenFailed = recordAttempt(passedOnce, "a", resultWith(40, false));
    assert.deepEqual(thenFailed.a, { watched: false, bestScorePercent: 100, passed: true });
  });

  it("recordAttempt raises the best score on improvement", () => {
    const first = recordAttempt({}, "a", resultWith(40, false));
    const second = recordAttempt(first, "a", resultWith(80, true));
    assert.deepEqual(second.a, { watched: false, bestScorePercent: 80, passed: true });
  });
});
