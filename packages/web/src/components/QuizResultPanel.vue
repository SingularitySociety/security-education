<script setup lang="ts">
import { PASS_THRESHOLD_PERCENT } from "@security-education/course";
import type { QuizResult } from "@security-education/course";

defineProps<{ result: QuizResult }>();
defineEmits<{ retry: [] }>();
</script>

<template>
  <div
    class="rounded-xl p-6 text-center"
    :class="result.passed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'"
  >
    <p class="text-3xl font-bold">{{ result.passed ? "合格" : "不合格" }}</p>
    <p class="mt-2 text-lg">{{ result.correctCount }} / {{ result.total }} 問正解（{{ result.scorePercent }}%）</p>
    <p class="mt-1 text-sm opacity-90">合格ライン：{{ PASS_THRESHOLD_PERCENT }}%</p>
    <div class="mt-4 flex justify-center gap-3">
      <button type="button" class="rounded-lg bg-white px-4 py-2 font-semibold text-slate-800" @click="$emit('retry')">
        もう一度受ける
      </button>
      <RouterLink to="/" class="rounded-lg border border-white px-4 py-2 font-semibold">コース一覧へ</RouterLink>
    </div>
  </div>
</template>
