import { readonly, ref } from "vue";
import { markWatched, parseProgressMap, progressOf, recordAttempt } from "@security-education/course";
import type { CourseProgress, ProgressMap, QuizResult } from "@security-education/course";

const STORAGE_KEY = "security-education:progress:v1";

const load = (): ProgressMap => {
  try {
    return parseProgressMap(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return {};
  }
};

const progressMap = ref<ProgressMap>(load());

const save = (next: ProgressMap): void => {
  progressMap.value = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn(`Failed to save progress to localStorage key "${STORAGE_KEY}"`, error);
  }
};

export const useProgress = () => ({
  progressMap: readonly(progressMap),
  courseProgress: (courseId: string): CourseProgress => progressOf(progressMap.value, courseId),
  markWatched: (courseId: string) => save(markWatched(progressMap.value, courseId)),
  recordAttempt: (courseId: string, result: QuizResult) => save(recordAttempt(progressMap.value, courseId, result)),
});
