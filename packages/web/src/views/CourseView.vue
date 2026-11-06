<script setup lang="ts">
import { computed, ref } from "vue";
import { findCourse, resumeSeconds, shouldSavePlayback, videoFileName } from "@security-education/course";
import CourseNotFound from "../components/CourseNotFound.vue";
import CourseReviewPoints from "../components/CourseReviewPoints.vue";
import { usePlayback } from "../lib/playbackStore.ts";
import { useProgress } from "../lib/progressStore.ts";
import { clampSeekTime } from "../lib/seekGuard.ts";

const props = defineProps<{ courseId: string }>();

const course = computed(() => findCourse(props.courseId));
const { courseProgress, markWatched } = useProgress();
const watched = computed(() => courseProgress(props.courseId).watched);
const videoSrc = computed(() => `${import.meta.env.BASE_URL}${videoFileName(props.courseId)}`);
const videoError = ref(false);
const { coursePlayback, savePosition, saveFinished } = usePlayback();
const maxWatchedSeconds = ref(0);
const lastSavedSeconds = ref(0);

const onLoadedMetadata = (event: Event) => {
  if (!(event.target instanceof HTMLVideoElement)) return;
  const playback = coursePlayback(props.courseId);
  const startSeconds = resumeSeconds(playback, event.target.duration);
  maxWatchedSeconds.value = playback.furthestSeconds;
  lastSavedSeconds.value = startSeconds;
  if (startSeconds > 0) event.target.currentTime = startSeconds;
};

const onTimeUpdate = (event: Event) => {
  if (!(event.target instanceof HTMLVideoElement) || event.target.seeking) return;
  const currentSeconds = event.target.currentTime;
  maxWatchedSeconds.value = Math.max(maxWatchedSeconds.value, currentSeconds);
  if (!shouldSavePlayback(lastSavedSeconds.value, currentSeconds)) return;
  savePosition(props.courseId, currentSeconds);
  lastSavedSeconds.value = currentSeconds;
};

const onEnded = (event: Event) => {
  markWatched(props.courseId);
  if (event.target instanceof HTMLVideoElement) saveFinished(props.courseId, event.target.duration);
  lastSavedSeconds.value = 0;
};

const onSeeking = (event: Event) => {
  if (watched.value || !(event.target instanceof HTMLVideoElement)) return;
  const allowedSeconds = clampSeekTime(event.target.currentTime, maxWatchedSeconds.value);
  if (allowedSeconds !== event.target.currentTime) event.target.currentTime = allowedSeconds;
};
</script>

<template>
  <CourseNotFound v-if="!course" />
  <section v-else>
    <RouterLink to="/" class="text-sm text-sky-700 underline">← コース一覧</RouterLink>
    <h1 class="mt-2 text-2xl font-bold">{{ course.title }}</h1>
    <p class="mt-2 text-slate-600">{{ course.summary }}</p>

    <div class="mt-6 overflow-hidden rounded-xl bg-black shadow">
      <video
        class="aspect-video w-full"
        :src="videoSrc"
        controls
        playsinline
        preload="metadata"
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="onTimeUpdate"
        @seeking="onSeeking"
        @ended="onEnded"
        @error="videoError = true"
      />
    </div>
    <p v-if="videoError" class="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
      動画を読み込めませんでした。開発環境では <code>yarn video:build</code> で動画を生成してください。
    </p>

    <div class="mt-6 flex flex-wrap items-center gap-4">
      <RouterLink
        v-if="watched"
        :to="{ name: 'quiz', params: { courseId: course.id } }"
        class="rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
      >
        確認テストへ進む
      </RouterLink>
      <button
        v-else
        type="button"
        disabled
        class="cursor-not-allowed rounded-lg bg-slate-300 px-5 py-3 font-semibold text-slate-600"
      >
        確認テストへ進む
      </button>
      <span v-if="!watched" class="text-sm text-slate-500">動画を最後まで視聴すると、確認テストに進めます。</span>
    </div>

    <CourseReviewPoints v-if="watched" :scenes="course.scenes" />
  </section>
</template>
