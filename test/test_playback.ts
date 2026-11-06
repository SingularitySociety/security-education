import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_PLAYBACK,
  finishPlayback,
  parsePlaybackMap,
  PLAYBACK_SAVE_INTERVAL_SECONDS,
  playbackOf,
  recordPlayback,
  RESUME_END_MARGIN_SECONDS,
  resumeSeconds,
  shouldSavePlayback,
  watchedSoFarLabel,
} from "../packages/course/src/playback.ts";

describe("parsePlaybackMap", () => {
  it("returns empty for null, malformed JSON, and non-objects", () => {
    [null, "", "{", "[]", "42", '"text"', "null"].forEach((raw) =>
      assert.deepEqual(parsePlaybackMap(raw), {}, String(raw)),
    );
  });

  it("keeps valid entries and drops invalid ones", () => {
    const raw = JSON.stringify({
      ok: { positionSeconds: 30, furthestSeconds: 60 },
      zero: { positionSeconds: 0, furthestSeconds: 0 },
      negative: { positionSeconds: -1, furthestSeconds: 60 },
      text: { positionSeconds: "30", furthestSeconds: 60 },
      missing: { positionSeconds: 30 },
      notObject: 3,
    });
    assert.deepEqual(Object.keys(parsePlaybackMap(raw)).sort(), ["ok", "zero"]);
  });
});

describe("shouldSavePlayback", () => {
  it("saves once playback moved by the interval in either direction", () => {
    assert.equal(shouldSavePlayback(0, PLAYBACK_SAVE_INTERVAL_SECONDS - 0.1), false);
    assert.equal(shouldSavePlayback(0, PLAYBACK_SAVE_INTERVAL_SECONDS), true);
    assert.equal(shouldSavePlayback(100, 100 - PLAYBACK_SAVE_INTERVAL_SECONDS), true);
    assert.equal(shouldSavePlayback(100, 95), false);
  });
});

describe("recordPlayback / finishPlayback", () => {
  it("falls back to empty playback", () => {
    assert.deepEqual(playbackOf({}, "a"), EMPTY_PLAYBACK);
  });

  it("stores the position and never lowers the furthest point", () => {
    const forward = recordPlayback({}, "a", 120);
    const back = recordPlayback(forward, "a", 30);
    assert.deepEqual(back.a, { positionSeconds: 30, furthestSeconds: 120 });
    assert.deepEqual(forward.a, { positionSeconds: 120, furthestSeconds: 120 });
  });

  it("clamps negative positions to zero", () => {
    assert.deepEqual(recordPlayback({}, "a", -3).a, EMPTY_PLAYBACK);
  });

  it("finishing rewinds to the start and marks the whole video as reached", () => {
    const finished = finishPlayback(recordPlayback({}, "a", 120), "a", 400);
    assert.deepEqual(finished.a, { positionSeconds: 0, furthestSeconds: 400 });
  });

  it("leaves other courses alone", () => {
    const map = recordPlayback({ b: { positionSeconds: 5, furthestSeconds: 9 } }, "a", 10);
    assert.deepEqual(map.b, { positionSeconds: 5, furthestSeconds: 9 });
  });
});

describe("resumeSeconds", () => {
  it("resumes from the stored position", () => {
    assert.equal(resumeSeconds({ positionSeconds: 120, furthestSeconds: 120 }, 400), 120);
    assert.equal(resumeSeconds(EMPTY_PLAYBACK, 400), 0);
  });

  it("starts over when the position is at the very end", () => {
    [400 - RESUME_END_MARGIN_SECONDS, 399, 400, 500].forEach((positionSeconds) =>
      assert.equal(
        resumeSeconds({ positionSeconds, furthestSeconds: positionSeconds }, 400),
        0,
        String(positionSeconds),
      ),
    );
  });
});

describe("watchedSoFarLabel", () => {
  it("is absent before anything was watched", () => {
    assert.equal(watchedSoFarLabel(0), undefined);
  });

  it("rounds down to whole minutes", () => {
    assert.equal(watchedSoFarLabel(1), "1分未満まで視聴");
    assert.equal(watchedSoFarLabel(59.9), "1分未満まで視聴");
    assert.equal(watchedSoFarLabel(60), "約1分まで視聴");
    assert.equal(watchedSoFarLabel(239), "約3分まで視聴");
  });
});
