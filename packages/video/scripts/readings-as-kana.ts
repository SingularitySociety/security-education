import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { kanaOf } from "../src/japaneseMora.ts";
import { isCourseReadings, readingsFileName } from "../src/readings.ts";

const packageDir = fileURLToPath(new URL("../", import.meta.url));
const SPAN_PATTERN = /([^<>]*?)<t:([^>]*)>/gu;
const NOT_A_SOUND = /^ja \/|[↘↗/]/gu;

const spanAsKana = ([, written = "", text = ""]: RegExpMatchArray): string => {
  const { kana } = kanaOf(written.replace(NOT_A_SOUND, ""));
  return kana === "" ? text : `${text}(${kana})`;
};

const printCourse = async (courseId: string): Promise<void> => {
  const readingsPath = path.join(packageDir, readingsFileName(courseId));
  const parsed: unknown = JSON.parse(await readFile(readingsPath, "utf8"));
  if (!isCourseReadings(parsed)) throw new Error(`Unexpected content in ${readingsPath}`);
  Object.entries(parsed).forEach(([sceneId, utterances]) => {
    const line = utterances.flatMap((utterance) => [...utterance.matchAll(SPAN_PATTERN)].map(spanAsKana)).join("");
    console.log(`${courseId}/${sceneId}: ${line}`);
  });
};

for (const courseId of process.argv.slice(2)) {
  await printCourse(courseId);
}
