import { passwordsCourse } from "./courses/passwords.ts";
import { phishingCourse } from "./courses/phishing.ts";
import { phoneScamsCourse } from "./courses/phoneScams.ts";
import { bossImpersonationCourse } from "./courses/bossImpersonation.ts";
import { hiringAttacksCourse } from "./courses/hiringAttacks.ts";
import { smishingCourse } from "./courses/smishing.ts";
import { onlineScamsCourse } from "./courses/onlineScams.ts";
import { outsideWorkCourse } from "./courses/outsideWork.ts";
import { aiPromptInjectionCourse } from "./courses/aiPromptInjection.ts";
import { aiDataAndToolsCourse } from "./courses/aiDataAndTools.ts";
import { pasteCommandsCourse } from "./courses/pasteCommands.ts";
import { installSourcesCourse } from "./courses/installSources.ts";
import { patchingCourse } from "./courses/patching.ts";
import { dataDisposalCourse } from "./courses/dataDisposal.ts";
import { accountLifecycleCourse } from "./courses/accountLifecycle.ts";
import { snsPostingCourse } from "./courses/snsPosting.ts";
import { targetedAttacksCourse } from "./courses/targetedAttacks.ts";
import { supportDeskIdentityCourse } from "./courses/supportDeskIdentity.ts";
import { stopAndAskCourse } from "./courses/stopAndAsk.ts";
import { deviceBasicsCourse } from "./courses/deviceBasics.ts";
import { emailBeforeSendCourse } from "./courses/emailBeforeSend.ts";
import { personalInfoCourse } from "./courses/personalInfo.ts";
import { fileSharingCourse } from "./courses/fileSharing.ts";
import type { Course } from "./types.ts";

export type * from "./types.ts";
export * from "./scoring.ts";
export * from "./progress.ts";
export * from "./drawQuiz.ts";
export * from "./reviewPoints.ts";
export * from "./categories.ts";

export const courses: readonly Course[] = [
  passwordsCourse,
  phishingCourse,
  smishingCourse,
  phoneScamsCourse,
  bossImpersonationCourse,
  hiringAttacksCourse,
  onlineScamsCourse,
  outsideWorkCourse,
  pasteCommandsCourse,
  installSourcesCourse,
  aiPromptInjectionCourse,
  aiDataAndToolsCourse,
  patchingCourse,
  dataDisposalCourse,
  accountLifecycleCourse,
  snsPostingCourse,
  targetedAttacksCourse,
  supportDeskIdentityCourse,
  stopAndAskCourse,
  deviceBasicsCourse,
  emailBeforeSendCourse,
  personalInfoCourse,
  fileSharingCourse,
];

// Written but not yet published: listed as under construction until their videos are rendered.
export const draftCourses: readonly Course[] = [];

export const findCourse = (courseId: string): Course | undefined => courses.find((course) => course.id === courseId);

export const voiceFileName = (courseId: string, sceneId: string): string => `voice/${courseId}/${sceneId}.wav`;

export const videoFileName = (courseId: string): string => `videos/${courseId}.mp4`;
