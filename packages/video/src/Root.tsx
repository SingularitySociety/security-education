import { Composition, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { courses, findCourse } from "@security-education/course";
import { CourseVideo, type CourseVideoProps } from "./CourseVideo.tsx";
import { durationsFileName, isVoiceDurations, sceneFramesFor } from "./voice.ts";

const FPS = 30;
const WIDTH_PX = 1920;
const HEIGHT_PX = 1080;
const PLACEHOLDER_FRAMES = 1;

const loadDurations = async (courseId: string, abortSignal: AbortSignal) => {
  const url = staticFile(durationsFileName(courseId));
  const response = await fetch(url, { signal: abortSignal });
  if (!response.ok) throw new Error(`Failed to load ${url} (${response.status}). Run \`yarn video:voice\` first.`);
  const durations: unknown = await response.json();
  if (!isVoiceDurations(durations)) throw new Error(`Malformed narration durations in ${url}`);
  return durations;
};

const calculateMetadata: CalculateMetadataFunction<CourseVideoProps> = async ({ props, abortSignal }) => {
  const course = findCourse(props.courseId);
  if (!course) throw new Error(`Unknown course: ${props.courseId}`);
  const durations = await loadDurations(course.id, abortSignal);
  const narrationSeconds = course.scenes.map((scene) => durations[scene.id] ?? 0);
  if (narrationSeconds.some((seconds) => seconds === 0)) {
    throw new Error(`Narration missing for some scenes of ${course.id}. Run \`yarn video:voice\`.`);
  }
  const sceneFrames = narrationSeconds.map((seconds) => sceneFramesFor(seconds, FPS));
  const durationInFrames = sceneFrames.reduce((sum, frames) => sum + frames, 0);
  return { durationInFrames, props: { ...props, sceneFrames } };
};

export const Root = () => (
  <>
    {courses.map((course) => (
      <Composition
        key={course.id}
        id={course.id}
        component={CourseVideo}
        defaultProps={{ courseId: course.id, sceneFrames: [] }}
        calculateMetadata={calculateMetadata}
        durationInFrames={PLACEHOLDER_FRAMES}
        fps={FPS}
        width={WIDTH_PX}
        height={HEIGHT_PX}
      />
    ))}
  </>
);
