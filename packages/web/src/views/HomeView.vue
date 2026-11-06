<script setup lang="ts">
import { courses } from "@security-education/course";
import StatusBadge from "../components/StatusBadge.vue";
import { useProgress } from "../lib/progressStore.ts";

const { courseProgress } = useProgress();
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold">コース一覧</h1>
    <p class="mt-2 text-slate-600">
      各コースは「動画（2〜3分）→ 確認テスト（5問）」の順に進みます。80%以上の正解で合格です。
    </p>
    <ul class="mt-6 grid gap-4 sm:grid-cols-2">
      <li v-for="course in courses" :key="course.id">
        <RouterLink
          :to="{ name: 'course', params: { courseId: course.id } }"
          class="block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-400 hover:shadow"
        >
          <div class="flex items-start justify-between gap-3">
            <h2 class="text-lg font-bold">{{ course.title }}</h2>
            <StatusBadge :progress="courseProgress(course.id)" />
          </div>
          <p class="mt-2 text-sm text-slate-600">{{ course.summary }}</p>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
