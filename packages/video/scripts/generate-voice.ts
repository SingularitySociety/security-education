import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import type { Katarite, Speech } from "@yomiscript/core";
import { openKatarite, writeWav } from "yomiscript";
import { courses, voiceFileName } from "@security-education/course";
import type { Course, Scene } from "@security-education/course";
import { durationsFileName, type VoiceDurations } from "../src/voice.ts";
import { isCourseReadings, readingProblem, readingsFileName, type CourseReadings } from "../src/readings.ts";

const run = promisify(execFile);

const SAMPLE_RATE_HZ = 48000;
const SENTENCE_GAP_SECONDS = 0.3;
// Kokoro speaks about a quarter slower than the narration pace the videos were timed for.
const NARRATION_TEMPO = 1.25;
const packageDir = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(packageDir, "public");

const runTool = async (command: string, args: string[]): Promise<string> => {
  try {
    const { stdout } = await run(command, args);
    return stdout;
  } catch (error) {
    throw new Error(`${command} failed (${args.join(" ")}): ${String(error)}`, { cause: error });
  }
};

const probeDurationSeconds = async (wavPath: string): Promise<number> => {
  const stdout = await runTool("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "csv=p=0",
    wavPath,
  ]);
  const seconds = Number.parseFloat(stdout.trim());
  if (!Number.isFinite(seconds)) throw new Error(`ffprobe returned no duration for ${wavPath}`);
  return seconds;
};

const loadReadings = async (course: Course): Promise<CourseReadings> => {
  const readingsPath = path.join(packageDir, readingsFileName(course.id));
  const parsed: unknown = JSON.parse(await readFile(readingsPath, "utf8"));
  if (!isCourseReadings(parsed)) throw new Error(`Unexpected content in ${readingsPath}`);
  const problems = course.scenes.flatMap((scene) => {
    const problem = readingProblem(scene.narration, parsed[scene.id]);
    return problem === undefined ? [] : [`${scene.id}: ${problem}`];
  });
  if (problems.length > 0)
    throw new Error(`Readings in ${readingsPath} do not match the script:\n${problems.join("\n")}`);
  return parsed;
};

const joinWithGaps = (speeches: readonly Speech[]): Speech => {
  const sampleRate = speeches[0]?.sampleRate ?? SAMPLE_RATE_HZ;
  const gap = new Float32Array(Math.round(SENTENCE_GAP_SECONDS * sampleRate));
  const parts = speeches.flatMap((speech, index) => (index === 0 ? [speech.samples] : [gap, speech.samples]));
  const samples = new Float32Array(parts.reduce((length, part) => length + part.length, 0));
  parts.reduce((offset, part) => {
    samples.set(part, offset);
    return offset + part.length;
  }, 0);
  return { samples, sampleRate, texts: [], times: [] };
};

const synthesizeScene = async (katarite: Katarite, utterances: readonly string[], wavPath: string, workDir: string) => {
  const speeches: Speech[] = [];
  for (const utterance of utterances) {
    speeches.push(await katarite.speak(utterance));
  }
  const rawPath = await writeWav(joinWithGaps(speeches), path.join(workDir, `${path.basename(wavPath)}.raw.wav`));
  await runTool("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    rawPath,
    "-filter:a",
    `atempo=${NARRATION_TEMPO}`,
    "-ar",
    String(SAMPLE_RATE_HZ),
    wavPath,
  ]);
  return probeDurationSeconds(wavPath);
};

const synthesizeCourse = async (katarite: Katarite, course: Course, workDir: string): Promise<void> => {
  const readings = await loadReadings(course);
  await mkdir(path.join(publicDir, path.dirname(voiceFileName(course.id, "x"))), { recursive: true });
  const durations: VoiceDurations = {};
  for (const scene of course.scenes) {
    const wavPath = path.join(publicDir, voiceFileName(course.id, scene.id));
    durations[scene.id] = await synthesizeScene(katarite, readingsFor(readings, scene), wavPath, workDir);
  }
  await writeFile(path.join(publicDir, durationsFileName(course.id)), `${JSON.stringify(durations, null, 2)}\n`);
  const totalSeconds = Object.values(durations).reduce((sum, seconds) => sum + seconds, 0);
  console.log(`${course.id}: ${course.scenes.length} scenes, narration ${totalSeconds.toFixed(1)}s`);
};

const readingsFor = (readings: CourseReadings, scene: Scene): string[] => readings[scene.id] ?? [];

const main = async (): Promise<void> => {
  const requested = process.argv.slice(2);
  const targets = courses.filter((course) => requested.length === 0 || requested.includes(course.id));
  const katarite = await openKatarite("kokoro");
  const workDir = await mkdtemp(path.join(tmpdir(), "security-voice-"));
  try {
    for (const course of targets) {
      await synthesizeCourse(katarite, course, workDir);
    }
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
};

await main();
