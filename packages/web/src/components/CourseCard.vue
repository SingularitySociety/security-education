<script setup lang="ts">
import { formatMinutesSeconds, videoDurationSeconds, watchedSoFarLabel } from "@security-education/course";
import type { Course } from "@security-education/course";
import { computed } from "vue";
import StatusBadge from "./StatusBadge.vue";
import { usePlayback } from "../lib/playbackStore.ts";
import { useProgress } from "../lib/progressStore.ts";

const props = defineProps<{ course: Course }>();

const { courseProgress } = useProgress();
const { coursePlayback } = usePlayback();

const videoLengthLabel = computed(() => {
  const seconds = videoDurationSeconds(props.course.id);
  return seconds === undefined ? undefined : `動画 ${formatMinutesSeconds(seconds)}`;
});

const partWatchedLabel = computed(() =>
  courseProgress(props.course.id).watched
    ? undefined
    : watchedSoFarLabel(coursePlayback(props.course.id).furthestSeconds),
);
</script>

<template>
  <RouterLink
    :to="{ name: 'course', params: { courseId: course.id } }"
    class="block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-400 hover:shadow"
  >
    <div class="flex items-start justify-between gap-3">
      <h3 class="text-lg font-bold">{{ course.title }}</h3>
      <StatusBadge :progress="courseProgress(course.id)" />
    </div>
    <p class="mt-2 text-sm text-slate-600">{{ course.summary }}</p>
    <p class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
      <span v-if="videoLengthLabel">{{ videoLengthLabel }}</span>
      <span v-if="partWatchedLabel" class="font-semibold text-sky-700">{{ partWatchedLabel }}</span>
    </p>
  </RouterLink>
</template>
