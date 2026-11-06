import { readonly, ref } from "vue";
import { markWatched, parseProgressMap, progressOf, recordAttempt } from "@security-education/course";
import type { CourseProgress, ProgressMap, QuizResult } from "@security-education/course";
import { readStorage, writeStorage } from "./browserStorage.ts";

const STORAGE_KEY = "security-education:progress:v1";

const progressMap = ref<ProgressMap>(parseProgressMap(readStorage(STORAGE_KEY)));

const save = (next: ProgressMap): void => {
  progressMap.value = next;
  writeStorage(STORAGE_KEY, next);
};

export const useProgress = () => ({
  progressMap: readonly(progressMap),
  courseProgress: (courseId: string): CourseProgress => progressOf(progressMap.value, courseId),
  markWatched: (courseId: string) => save(markWatched(progressMap.value, courseId)),
  recordAttempt: (courseId: string, result: QuizResult) => save(recordAttempt(progressMap.value, courseId, result)),
});
