import { parse } from "@yomiscript/core";
import { kanaOf } from "./japaneseMora.ts";

// Each scene's narration as YomiScript utterances, one per sentence, in order.
export type CourseReadings = Record<string, string[]>;

export const readingsFileName = (courseId: string): string => `readings/${courseId}.json`;

export const isCourseReadings = (value: unknown): value is CourseReadings =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  Object.values(value).every(
    (utterances) => Array.isArray(utterances) && utterances.every((utterance) => typeof utterance === "string"),
  );

const CONTEXT_CHARS = 12;

const firstDifference = (expected: string, actual: string): string => {
  const index = [...expected].findIndex((char, i) => [...actual][i] !== char);
  const at = index === -1 ? [...expected].length : index;
  const around = (text: string) => [...text].slice(Math.max(0, at - CONTEXT_CHARS), at + CONTEXT_CHARS).join("");
  return `differs at character ${at}: narration "…${around(expected)}…", reading "…${around(actual)}…"`;
};

const originalTextOf = (utterance: string): string => parse(utterance).texts.join("");

// A span is one word, so a long one means a whole phrase was given a single (likely wrong) reading.
export const MAX_SPAN_CHARS = 16;
const JAPANESE_UTTERANCE = /^ja \/[^{}]*\/$/u;
const SPAN_PATTERN = /([^<>]*?)<t:([^>]*)>/gu;
const UNSPOKEN_TEXT = /[\s\p{P}\p{S}]/gu;
const NOT_A_SOUND = /^ja \/|[↘↗/]/gu;

// Kokoro drops symbols outside its inventory without a word, so every sound must be a known mora.
// Every written character is at least one kana, so a shorter reading skipped part of its text.
const spanProblem = ([, written = "", text = ""]: RegExpMatchArray): string | undefined => {
  const reading = written.replace(NOT_A_SOUND, "");
  const { kana, unknown } = kanaOf(reading);
  if ([...text].length > MAX_SPAN_CHARS) return `span "${text}" is longer than one word`;
  if (unknown.length > 0) return `reading "${reading.trim()}" of "${text}" has unknown sounds: ${unknown.join(" ")}`;
  const spokenChars = [...text.replace(UNSPOKEN_TEXT, "")].length;
  return [...kana].length < spokenChars ? `reading "${reading.trim()}" is too short for "${text}"` : undefined;
};

const utteranceProblems = (utterance: string): string[] => {
  if (!JAPANESE_UTTERANCE.test(utterance.trim())) return [`not one Japanese utterance: ${utterance.slice(0, 20)}`];
  return [...utterance.matchAll(SPAN_PATTERN)].flatMap((span) => spanProblem(span) ?? []);
};

// Empty when the utterances parse and their <t:…> text joins back to the narration exactly.
export const readingProblems = (narration: string, utterances: readonly string[] | undefined): string[] => {
  if (utterances === undefined || utterances.length === 0) return ["no reading"];
  try {
    const readingText = utterances.map(originalTextOf).join("");
    if (readingText !== narration) return [firstDifference(narration, readingText)];
    return utterances.flatMap(utteranceProblems);
  } catch (error) {
    return [`does not parse: ${error instanceof Error ? error.message : String(error)}`];
  }
};

export const readingProblem = (narration: string, utterances: readonly string[] | undefined): string | undefined =>
  readingProblems(narration, utterances)[0];
