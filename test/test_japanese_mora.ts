import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { kanaOf } from "../packages/video/src/japaneseMora.ts";

describe("kanaOf", () => {
  it("reads moras, palatalized moras and loanword sounds", () => {
    assert.deepEqual(kanaOf("kʲoː wa ame"), { kana: "キョーワアメ", unknown: [] });
    assert.deepEqual(kanaOf("ɸiɕɕiŋɡɯ"), { kana: "フィッシング", unknown: [] });
    assert.deepEqual(kanaOf("jɯːaːɾɯeɾɯ"), { kana: "ユーアールエル", unknown: [] });
    assert.deepEqual(kanaOf("paːtiː"), { kana: "パーティー", unknown: [] });
  });

  it("reads geminates written as doubled consonants or ʔ", () => {
    assert.equal(kanaOf("kitte").kana, "キッテ");
    assert.equal(kanaOf("mattɕi").kana, "マッチ");
    assert.equal(kanaOf("ittsɯ").kana, "イッツ");
    assert.equal(kanaOf("iʔtɕi").kana, "イッチ");
  });

  it("reads every moraic nasal as ン", () => {
    assert.equal(kanaOf("kemmeː").kana, "ケンメー");
    assert.equal(kanaOf("ɡiŋkoː").kana, "ギンコー");
    assert.equal(kanaOf("hoɴ").kana, "ホン");
  });

  it("ignores spaces and pauses", () => {
    assert.equal(kanaOf(" a ‖ i ").kana, "アイ");
    assert.deepEqual(kanaOf(""), { kana: "", unknown: [] });
  });

  it("lists sounds outside the table", () => {
    assert.deepEqual(kanaOf("ga").unknown, ["g"]);
    assert.deepEqual(kanaOf("hi").unknown, ["h"]);
    assert.deepEqual(kanaOf("kɯɹ").unknown, ["ɹ"]);
  });
});

describe("kanaOf nasals", () => {
  it("rejects a nasal written before a vowel instead of a mora", () => {
    assert.deepEqual(kanaOf("ni").unknown, ["ni"]);
    assert.deepEqual(kanaOf("kaɲa").unknown, []);
    assert.deepEqual(kanaOf("ŋa").unknown, ["ŋa"]);
    assert.equal(kanaOf("kaɴi").kana, "カンイ");
    assert.equal(kanaOf("ma").kana, "マ");
  });
});
