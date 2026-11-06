<script setup lang="ts">
import {
  courseCategories,
  courses,
  draftCourses,
  formatMinutesSeconds,
  groupCoursesByCategory,
  PASS_THRESHOLD_PERCENT,
  QUIZ_QUESTION_COUNT,
  videoDurationSeconds,
} from "@security-education/course";
import StatusBadge from "../components/StatusBadge.vue";
import { useProgress } from "../lib/progressStore.ts";

const { courseProgress } = useProgress();
const groups = groupCoursesByCategory(courseCategories, courses, draftCourses);

const sectionId = (categoryId: string): string => `category-${categoryId}`;

const videoLengthLabel = (courseId: string): string | undefined => {
  const seconds = videoDurationSeconds(courseId);
  return seconds === undefined ? undefined : `動画 ${formatMinutesSeconds(seconds)}`;
};

const scrollToCategory = (categoryId: string) => {
  document.getElementById(sectionId(categoryId))?.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold">コース一覧</h1>
    <p class="mt-2 text-slate-600">
      各コースは「動画 → 確認テスト（{{ QUIZ_QUESTION_COUNT }}問）」の順に進みます。{{
        PASS_THRESHOLD_PERCENT
      }}%以上の正解で合格です。
    </p>
    <nav class="mt-6 flex flex-wrap gap-2" aria-label="カテゴリー">
      <button
        v-for="group in groups"
        :key="group.category.id"
        type="button"
        class="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-sky-400 hover:text-sky-700"
        @click="scrollToCategory(group.category.id)"
      >
        {{ group.category.title }}
      </button>
    </nav>
    <section
      v-for="group in groups"
      :id="sectionId(group.category.id)"
      :key="group.category.id"
      class="mt-10 scroll-mt-4"
    >
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
            <p v-if="videoLengthLabel(course.id)" class="mt-3 text-xs text-slate-500">
              {{ videoLengthLabel(course.id) }}
            </p>
          </RouterLink>
        </li>
        <li
          v-for="course in [...group.drafts, ...group.upcoming]"
          :key="course.title"
          class="h-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-slate-500"
          aria-disabled="true"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-lg font-bold">{{ course.title }}</h3>
            <span
              class="shrink-0 whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
            >
              工事中
            </span>
          </div>
          <p class="mt-2 text-sm">{{ course.summary }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>
