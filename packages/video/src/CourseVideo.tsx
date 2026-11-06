import { AbsoluteFill, Html5Audio, Sequence, Series, staticFile } from "remotion";
import { findCourse, voiceFileName } from "@security-education/course";
import type { Course, Scene } from "@security-education/course";
import { theme } from "./theme.ts";
import { SCENE_LEAD_IN_FRAMES, SCENE_TAIL_FRAMES } from "./voice.ts";
import { SceneShell } from "./scenes/SceneShell.tsx";
import { SceneView } from "./scenes/SceneView.tsx";

export type CourseVideoProps = {
  courseId: string;
  sceneFrames: number[];
};

const SceneWithVoice = ({
  course,
  scene,
  index,
  frames,
}: {
  course: Course;
  scene: Scene;
  index: number;
  frames: number;
}) => {
  const narrationFrames = frames - SCENE_LEAD_IN_FRAMES - SCENE_TAIL_FRAMES;
  return (
    <SceneShell courseTitle={course.title} sceneIndex={index} sceneCount={course.scenes.length} frames={frames}>
      <SceneView scene={scene} narrationFrames={narrationFrames} />
      <Sequence from={SCENE_LEAD_IN_FRAMES} layout="none">
        <Html5Audio src={staticFile(voiceFileName(course.id, scene.id))} />
      </Sequence>
    </SceneShell>
  );
};

export const CourseVideo = ({ courseId, sceneFrames }: CourseVideoProps) => {
  const course = findCourse(courseId);
  if (!course) throw new Error(`Unknown course: ${courseId}`);
  return (
    <AbsoluteFill style={{ backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text }}>
      <Series>
        {course.scenes.map((scene, index) => (
          <Series.Sequence key={scene.id} durationInFrames={sceneFrames[index] ?? 1}>
            <SceneWithVoice course={course} scene={scene} index={index} frames={sceneFrames[index] ?? 1} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
