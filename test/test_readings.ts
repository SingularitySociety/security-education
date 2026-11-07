import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { courses } from "../packages/course/src/index.ts";
import {
  isCourseReadings,
  MAX_SPAN_CHARS,
  readingProblem,
  readingProblems,
  readingsFileName,
} from "../packages/video/src/readings.ts";

const RAIN = "ja /ame<t:雨> desɯ<t:です。> ↘/";

describe("readingProblem", () => {
  it("accepts utterances whose text joins back to the narration", () => {
    assert.equal(readingProblem("雨です。", [RAIN]), undefined);
    assert.equal(readingProblem("雨です。雨です。", [RAIN, RAIN]), undefined);
    assert.equal(readingProblem("今日は、雨。", ["ja /kʲoː<t:今日> wa<t:は> ‖<t:、> ame<t:雨。> ↘/"]), undefined);
  });

  it("reports a missing reading", () => {
    assert.equal(readingProblem("雨です。", undefined), "no reading");
    assert.equal(readingProblem("雨です。", []), "no reading");
  });

  it("reports where the text differs from the narration", () => {
    assert.match(readingProblem("雪です。", [RAIN]) ?? "", /character 0/);
    assert.match(readingProblem("雨です。雨です。", [RAIN]) ?? "", /character 4/);
    assert.match(readingProblem("雨です", [RAIN]) ?? "", /character 3/);
    assert.match(readingProblem("雨です。", ["ja /ame desɯ ↘/"]) ?? "", /character 0/);
  });

  it("reports what does not parse", () => {
    assert.match(readingProblem("雨", ["ja /ame<t:雨"]) ?? "", /does not parse/);
  });

  it("rejects a whole phrase read as one span", () => {
    const longText = "あ".repeat(MAX_SPAN_CHARS + 1);
    assert.match(
      readingProblem(longText, [`ja /${"a".repeat(MAX_SPAN_CHARS + 1)}<t:${longText}> ↘/`]) ?? "",
      /one word/,
    );
  });

  it("rejects a reading shorter than its text", () => {
    assert.match(readingProblem("今日は雨です。", ["ja /a<t:今日は雨です。> ↘/"]) ?? "", /too short/);
    assert.match(readingProblem("雨です。", ["ja /ame<t:雨> <t:です。> ↘/"]) ?? "", /too short/);
  });
});

describe("isCourseReadings", () => {
  it("accepts scene ids mapped to string arrays", () => {
    assert.ok(isCourseReadings({}));
    assert.ok(isCourseReadings({ intro: [RAIN], empty: [] }));
  });

  it("rejects anything else", () => {
    [null, 3, "x", [], { intro: RAIN }, { intro: [1] }, { intro: null }].forEach((value) =>
      assert.equal(isCourseReadings(value), false, JSON.stringify(value)),
    );
  });
});

describe("readingProblem sounds", () => {
  it("rejects sounds outside the Japanese mora table", () => {
    ["ja /ga<t:が> ↘/", "ja /hito<t:人> ↘/", "ja /naku<t:なく> ↘/", "ja /mazɯ<t:まず> ↘/"].forEach((utterance) =>
      assert.match(readingProblem(utterance.match(/<t:([^>]*)>/u)?.[1] ?? "", [utterance]) ?? "", /unknown sounds/),
    );
  });

  it("accepts geminates, the moraic nasal and long vowels", () => {
    assert.equal(readingProblem("切手", ["ja /kitte<t:切手> ↘/"]), undefined);
    assert.equal(readingProblem("マッチ", ["ja /mattɕi<t:マッチ> ↘/"]), undefined);
    assert.equal(readingProblem("認証", ["ja /ɲiɴɕoː<t:認証> ↘/"]), undefined);
    assert.equal(readingProblem("一致", ["ja /iʔtɕi<t:一致> ↘/"]), undefined);
  });

  it("rejects utterances that are not one Japanese utterance", () => {
    assert.match(readingProblem("Hi", ["en-US /ˈhaɪ<t:Hi> ↘/"]) ?? "", /not one Japanese utterance/);
    assert.match(readingProblem("田中", ["ja /{ja tanaka<t:田中>} ↘/"]) ?? "", /not one Japanese utterance/);
  });
});

describe("published course readings", () => {
  it("every scene of every published course has a reading that matches its narration", () => {
    const problems = courses.flatMap((course) => {
      const raw: unknown = JSON.parse(
        readFileSync(new URL(`../packages/video/${readingsFileName(course.id)}`, import.meta.url), "utf8"),
      );
      if (!isCourseReadings(raw)) return [`${course.id}: not readings`];
      return course.scenes.flatMap((scene) =>
        readingProblems(scene.narration, raw[scene.id]).map((problem) => `${course.id}/${scene.id}: ${problem}`),
      );
    });
    assert.deepEqual(problems, []);
  });
});
