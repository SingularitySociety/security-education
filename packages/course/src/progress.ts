import type { QuizResult } from "./scoring.ts";

export type CourseProgress = {
  watched: boolean;
  bestScorePercent: number | null;
  passed: boolean;
};

export type ProgressMap = Record<string, CourseProgress>;

export const EMPTY_PROGRESS: CourseProgress = { watched: false, bestScorePercent: null, passed: false };

const MAX_PERCENT = 100;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPercent = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= MAX_PERCENT;

export const isCourseProgress = (value: unknown): value is CourseProgress =>
  isRecord(value) &&
  typeof value.watched === "boolean" &&
  typeof value.passed === "boolean" &&
  (value.bestScorePercent === null || isPercent(value.bestScorePercent));

export const parseProgressMap = (raw: string | null): ProgressMap => {
  if (raw === null) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return {};
    return Object.entries(parsed).reduce<ProgressMap>((map, [courseId, value]) => {
      if (isCourseProgress(value)) map[courseId] = value;
      return map;
    }, {});
  } catch {
    return {};
  }
};

export const progressOf = (map: ProgressMap, courseId: string): CourseProgress => map[courseId] ?? EMPTY_PROGRESS;

export const markWatched = (map: ProgressMap, courseId: string): ProgressMap => ({
  ...map,
  [courseId]: { ...progressOf(map, courseId), watched: true },
});

export const recordAttempt = (map: ProgressMap, courseId: string, result: QuizResult): ProgressMap => {
  const previous = progressOf(map, courseId);
  const bestScorePercent = Math.max(previous.bestScorePercent ?? 0, result.scorePercent);
  return {
    ...map,
    [courseId]: { ...previous, bestScorePercent, passed: previous.passed || result.passed },
  };
};
