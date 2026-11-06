import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { courses, voiceFileName } from "@security-education/course";
import type { Course, Scene } from "@security-education/course";
import { durationsFileName, type VoiceDurations } from "../src/voice.ts";

const run = promisify(execFile);

const VOICE_NAME = "Kyoko";
const SPEECH_RATE_WPM = 200;
const SAMPLE_RATE_HZ = 48000;
const publicDir = fileURLToPath(new URL("../public/", import.meta.url));

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

const synthesizeScene = async (course: Course, scene: Scene, workDir: string): Promise<number> => {
  const aiffPath = path.join(workDir, `${course.id}-${scene.id}.aiff`);
  const wavPath = path.join(publicDir, voiceFileName(course.id, scene.id));
  await runTool("say", ["-v", VOICE_NAME, "-r", String(SPEECH_RATE_WPM), "-o", aiffPath, scene.narration]);
  await runTool("ffmpeg", ["-y", "-loglevel", "error", "-i", aiffPath, "-ar", String(SAMPLE_RATE_HZ), wavPath]);
  return probeDurationSeconds(wavPath);
};

const synthesizeCourse = async (course: Course, workDir: string): Promise<void> => {
  await mkdir(path.join(publicDir, path.dirname(voiceFileName(course.id, "x"))), { recursive: true });
  const durations: VoiceDurations = {};
  for (const scene of course.scenes) {
    durations[scene.id] = await synthesizeScene(course, scene, workDir);
  }
  await writeFile(path.join(publicDir, durationsFileName(course.id)), `${JSON.stringify(durations, null, 2)}\n`);
  const totalSeconds = Object.values(durations).reduce((sum, seconds) => sum + seconds, 0);
  console.log(`${course.id}: ${course.scenes.length} scenes, narration ${totalSeconds.toFixed(1)}s`);
};

const main = async (): Promise<void> => {
  const workDir = await mkdtemp(path.join(tmpdir(), "security-voice-"));
  try {
    await Promise.all(courses.map((course) => synthesizeCourse(course, workDir)));
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
};

await main();
