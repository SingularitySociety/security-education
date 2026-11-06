import videoDurations from "./videoDurations.json" with { type: "json" };

export type VideoDurations = Record<string, number>;

const SECONDS_PER_MINUTE = 60;
const TENTHS_PER_SECOND = 10;

export const isVideoDurations = (value: unknown): value is VideoDurations =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  Object.values(value).every((seconds) => typeof seconds === "number" && Number.isFinite(seconds) && seconds > 0);

export const withVideoDuration = (
  durations: VideoDurations,
  courseId: string,
  durationSeconds: number,
): VideoDurations => {
  const roundedSeconds = Math.round(durationSeconds * TENTHS_PER_SECOND) / TENTHS_PER_SECOND;
  const entries = Object.entries({ ...durations, [courseId]: roundedSeconds });
  return Object.fromEntries(entries.sort(([a], [b]) => a.localeCompare(b)));
};

const durationsByCourseId: VideoDurations = isVideoDurations(videoDurations) ? videoDurations : {};

export const videoDurationSeconds = (courseId: string): number | undefined => durationsByCourseId[courseId];

export const formatMinutesSeconds = (totalSeconds: number): string => {
  const roundedSeconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(roundedSeconds / SECONDS_PER_MINUTE);
  const seconds = roundedSeconds % SECONDS_PER_MINUTE;
  if (minutes === 0) return `${seconds}秒`;
  return seconds === 0 ? `${minutes}分` : `${minutes}分${seconds}秒`;
};
