<script setup lang="ts">
import { computed } from "vue";
import { toReviewSections } from "@security-education/course";
import type { Scene } from "@security-education/course";
import ReviewSectionBody from "./ReviewSectionBody.vue";

const props = defineProps<{ scenes: readonly Scene[] }>();

const sections = computed(() => toReviewSections(props.scenes));
</script>

<template>
  <section class="mt-10" aria-labelledby="review-points-heading">
    <h2 id="review-points-heading" class="text-xl font-bold">この動画のポイント</h2>
    <ol class="mt-4 space-y-4">
      <li v-for="section in sections" :key="section.sceneId" class="rounded-xl bg-white p-4 shadow-sm">
        <h3 class="mb-2 font-semibold">{{ section.heading }}</h3>
        <ReviewSectionBody :body="section.body" />
        <details class="mt-3 text-sm text-slate-600">
          <summary class="cursor-pointer text-sky-700">ナレーションを読む</summary>
          <p class="mt-2 leading-relaxed">{{ section.narration }}</p>
        </details>
      </li>
    </ol>
  </section>
</template>
