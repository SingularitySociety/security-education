import { passwordsCourse } from "./courses/passwords.ts";
import { phishingCourse } from "./courses/phishing.ts";
import { smishingCourse } from "./courses/smishing.ts";
import type { Course } from "./types.ts";

export type * from "./types.ts";
export * from "./scoring.ts";
export * from "./progress.ts";
export * from "./drawQuiz.ts";
export * from "./reviewPoints.ts";

export const courses: readonly Course[] = [passwordsCourse, phishingCourse, smishingCourse];

export const findCourse = (courseId: string): Course | undefined => courses.find((course) => course.id === courseId);

export const voiceFileName = (courseId: string, sceneId: string): string => `voice/${courseId}/${sceneId}.wav`;

export const videoFileName = (courseId: string): string => `videos/${courseId}.mp4`;
