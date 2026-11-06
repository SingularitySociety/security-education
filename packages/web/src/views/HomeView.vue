<script setup lang="ts">
import {
  courseCategories,
  courses,
  groupCoursesByCategory,
  PASS_THRESHOLD_PERCENT,
  QUIZ_QUESTION_COUNT,
} from "@security-education/course";
import StatusBadge from "../components/StatusBadge.vue";
import { useProgress } from "../lib/progressStore.ts";

const { courseProgress } = useProgress();
const groups = groupCoursesByCategory(courseCategories, courses);
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold">コース一覧</h1>
    <p class="mt-2 text-slate-600">
      各コースは「動画 → 確認テスト（{{ QUIZ_QUESTION_COUNT }}問）」の順に進みます。{{
        PASS_THRESHOLD_PERCENT
      }}%以上の正解で合格です。
    </p>
    <section v-for="group in groups" :key="group.category.id" class="mt-10">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 class="text-xl font-bold">{{ group.category.title }}</h2>
        <span class="rounded-full bg-sky-50 px-3 py-0.5 text-sm text-sky-800">対象：{{ group.category.audience }}</span>
      </div>
      <ul class="mt-4 grid gap-4 sm:grid-cols-2">
        <li v-for="course in group.courses" :key="course.id">
          <RouterLink
            :to="{ name: 'course', params: { courseId: course.id } }"
            class="block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-400 hover:shadow"
          >
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-lg font-bold">{{ course.title }}</h3>
              <StatusBadge :progress="courseProgress(course.id)" />
            </div>
            <p class="mt-2 text-sm text-slate-600">{{ course.summary }}</p>
          </RouterLink>
        </li>
      </ul>
    </section>
  </section>
</template>
