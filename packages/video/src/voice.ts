export type VoiceDurations = Record<string, number>;

export const durationsFileName = (courseId: string): string => `voice/${courseId}/durations.json`;

export const isVoiceDurations = (value: unknown): value is VoiceDurations =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  Object.values(value).every((seconds) => typeof seconds === "number" && Number.isFinite(seconds) && seconds > 0);

export const SCENE_LEAD_IN_FRAMES = 12;
export const SCENE_TAIL_FRAMES = 24;

export const sceneFramesFor = (narrationSeconds: number, fps: number): number =>
  SCENE_LEAD_IN_FRAMES + Math.ceil(narrationSeconds * fps) + SCENE_TAIL_FRAMES;
