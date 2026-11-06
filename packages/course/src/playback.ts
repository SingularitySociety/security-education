import { isRecord, parseRecordMap } from "./recordMap.ts";

export type PlaybackPosition = {
  positionSeconds: number;
  furthestSeconds: number;
};

export type PlaybackMap = Record<string, PlaybackPosition>;

export const EMPTY_PLAYBACK: PlaybackPosition = { positionSeconds: 0, furthestSeconds: 0 };

export const PLAYBACK_SAVE_INTERVAL_SECONDS = 10;
// Resuming in the last few seconds would only replay the closing frame, so start over instead.
export const RESUME_END_MARGIN_SECONDS = 5;

const SECONDS_PER_MINUTE = 60;

const isSeconds = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

export const isPlaybackPosition = (value: unknown): value is PlaybackPosition =>
  isRecord(value) && isSeconds(value.positionSeconds) && isSeconds(value.furthestSeconds);

export const parsePlaybackMap = (raw: string | null): PlaybackMap => parseRecordMap(raw, isPlaybackPosition);

export const playbackOf = (map: PlaybackMap, courseId: string): PlaybackPosition => map[courseId] ?? EMPTY_PLAYBACK;

export const shouldSavePlayback = (lastSavedSeconds: number, currentSeconds: number): boolean =>
  Math.abs(currentSeconds - lastSavedSeconds) >= PLAYBACK_SAVE_INTERVAL_SECONDS;

export const recordPlayback = (map: PlaybackMap, courseId: string, currentSeconds: number): PlaybackMap => {
  const positionSeconds = Math.max(0, currentSeconds);
  const furthestSeconds = Math.max(playbackOf(map, courseId).furthestSeconds, positionSeconds);
  return { ...map, [courseId]: { positionSeconds, furthestSeconds } };
};

export const finishPlayback = (map: PlaybackMap, courseId: string, durationSeconds: number): PlaybackMap => {
  const furthestSeconds = Math.max(playbackOf(map, courseId).furthestSeconds, durationSeconds);
  return { ...map, [courseId]: { positionSeconds: 0, furthestSeconds } };
};

export const resumeSeconds = (playback: PlaybackPosition, durationSeconds: number): number => {
  const nearEnd = playback.positionSeconds >= durationSeconds - RESUME_END_MARGIN_SECONDS;
  return nearEnd ? 0 : playback.positionSeconds;
};

export const watchedSoFarLabel = (furthestSeconds: number): string | undefined => {
  if (furthestSeconds <= 0) return undefined;
  const minutes = Math.floor(furthestSeconds / SECONDS_PER_MINUTE);
  return minutes === 0 ? "1分未満まで視聴" : `約${minutes}分まで視聴`;
};
