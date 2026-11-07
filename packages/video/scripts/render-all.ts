import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { courses, isVideoDurations, videoFileName, withVideoDuration } from "@security-education/course";

const PROGRESS_LOG_STEP_PERCENT = 20;
const PERCENT_SCALE = 100;
// The Pages site has a total size limit. Narration needs little audio bitrate, and mostly still slides
// stay readable at 720p with a high CRF.
const AUDIO_BITRATE = "64k";
const OUTPUT_SCALE = 2 / 3;
const VIDEO_CRF = 28;

const packageDir = fileURLToPath(new URL("../", import.meta.url));
const webPublicDir = fileURLToPath(new URL("../../web/public/", import.meta.url));
const videoDurationsPath = fileURLToPath(new URL("../../course/src/videoDurations.json", import.meta.url));

const recordVideoDuration = async (courseId: string, durationSeconds: number): Promise<void> => {
  const parsed: unknown = JSON.parse(await readFile(videoDurationsPath, "utf8"));
  if (!isVideoDurations(parsed)) throw new Error(`Unexpected content in ${videoDurationsPath}`);
  const updated = withVideoDuration(parsed, courseId, durationSeconds);
  await writeFile(videoDurationsPath, `${JSON.stringify(updated, null, 2)}\n`);
};

const renderCourse = async (serveUrl: string, courseId: string): Promise<void> => {
  const inputProps = { courseId, sceneFrames: [] };
  const composition = await selectComposition({ serveUrl, id: courseId, inputProps });
  const outputLocation = path.join(webPublicDir, videoFileName(courseId));
  await mkdir(path.dirname(outputLocation), { recursive: true });
  const loggedSteps = new Set<number>();
  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    audioBitrate: AUDIO_BITRATE,
    scale: OUTPUT_SCALE,
    crf: VIDEO_CRF,
    x264Preset: "slow",
    inputProps,
    outputLocation,
    onProgress: ({ progress }) => {
      const step = Math.floor((progress * PERCENT_SCALE) / PROGRESS_LOG_STEP_PERCENT);
      if (loggedSteps.has(step)) return;
      loggedSteps.add(step);
      console.log(`${courseId}: ${step * PROGRESS_LOG_STEP_PERCENT}%`);
    },
  });
  const durationSeconds = composition.durationInFrames / composition.fps;
  await recordVideoDuration(courseId, durationSeconds);
  console.log(`${courseId}: wrote ${outputLocation} (${durationSeconds.toFixed(1)}s)`);
};

const main = async (): Promise<void> => {
  const requested = process.argv.slice(2);
  const targets = courses.filter((course) => requested.length === 0 || requested.includes(course.id));
  const serveUrl = await bundle({
    entryPoint: path.join(packageDir, "src/index.ts"),
    publicDir: path.join(packageDir, "public"),
  });
  for (const course of targets) {
    await renderCourse(serveUrl, course.id);
  }
};

await main();
