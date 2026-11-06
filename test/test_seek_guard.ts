import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { clampSeekTime, SEEK_TOLERANCE_SECONDS } from "../packages/web/src/lib/seekGuard.ts";

describe("clampSeekTime", () => {
  it("allows seeking backwards and within what was watched", () => {
    [0, 5, 30].forEach((requested) => assert.equal(clampSeekTime(requested, 30), requested));
  });

  it("allows small forward jumps within the tolerance", () => {
    assert.equal(clampSeekTime(30 + SEEK_TOLERANCE_SECONDS, 30), 30 + SEEK_TOLERANCE_SECONDS);
  });

  it("pulls forward skips back to the furthest watched point", () => {
    [31.5, 60, 1000].forEach((requested) => assert.equal(clampSeekTime(requested, 30), 30));
    assert.equal(clampSeekTime(10, 0), 0);
  });
});
