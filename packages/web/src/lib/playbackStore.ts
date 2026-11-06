import { ref } from "vue";
import { finishPlayback, parsePlaybackMap, playbackOf, recordPlayback } from "@security-education/course";
import type { PlaybackMap, PlaybackPosition } from "@security-education/course";
import { readStorage, writeStorage } from "./browserStorage.ts";

const STORAGE_KEY = "security-education:playback:v1";

const playbackMap = ref<PlaybackMap>(parsePlaybackMap(readStorage(STORAGE_KEY)));

const save = (next: PlaybackMap): void => {
  playbackMap.value = next;
  writeStorage(STORAGE_KEY, next);
};

export const usePlayback = () => ({
  coursePlayback: (courseId: string): PlaybackPosition => playbackOf(playbackMap.value, courseId),
  savePosition: (courseId: string, currentSeconds: number) =>
    save(recordPlayback(playbackMap.value, courseId, currentSeconds)),
  saveFinished: (courseId: string, durationSeconds: number) =>
    save(finishPlayback(playbackMap.value, courseId, durationSeconds)),
});
