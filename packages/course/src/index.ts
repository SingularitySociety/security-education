import { passwordsCourse } from "./courses/passwords.ts";
import { phishingCourse } from "./courses/phishing.ts";
import { phoneScamsCourse } from "./courses/phoneScams.ts";
import { bossImpersonationCourse } from "./courses/bossImpersonation.ts";
import { hiringAttacksCourse } from "./courses/hiringAttacks.ts";
import { smishingCourse } from "./courses/smishing.ts";
import type { Course } from "./types.ts";

export type * from "./types.ts";
export * from "./scoring.ts";
export * from "./progress.ts";
export * from "./drawQuiz.ts";

export const courses: readonly Course[] = [
  passwordsCourse,
  phishingCourse,
  smishingCourse,
  phoneScamsCourse,
  bossImpersonationCourse,
  hiringAttacksCourse,
];

export const findCourse = (courseId: string): Course | undefined => courses.find((course) => course.id === courseId);

export const voiceFileName = (courseId: string, sceneId: string): string => `voice/${courseId}/${sceneId}.wav`;

export const videoFileName = (courseId: string): string => `videos/${courseId}.mp4`;
