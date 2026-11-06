<script setup lang="ts">
import { computed } from "vue";
import type { CourseProgress } from "@security-education/course";

const props = defineProps<{ progress: CourseProgress }>();

const status = computed(() => {
  if (props.progress.passed)
    return { label: `合格（最高 ${props.progress.bestScorePercent}%）`, tone: "bg-emerald-100 text-emerald-800" };
  if (props.progress.bestScorePercent !== null)
    return { label: `不合格（最高 ${props.progress.bestScorePercent}%）`, tone: "bg-rose-100 text-rose-800" };
  if (props.progress.watched) return { label: "動画視聴済み", tone: "bg-sky-100 text-sky-800" };
  return { label: "未受講", tone: "bg-slate-100 text-slate-600" };
});
</script>

<template>
  <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="status.tone">{{ status.label }}</span>
</template>
