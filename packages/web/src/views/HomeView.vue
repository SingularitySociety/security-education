<script setup lang="ts">
import {
  audiencePages,
  courseCategories,
  courses,
  draftCourses,
  groupCoursesByCategory,
  PASS_THRESHOLD_PERCENT,
  QUIZ_QUESTION_COUNT,
} from "@security-education/course";
import CourseCard from "../components/CourseCard.vue";

const groups = groupCoursesByCategory(courseCategories, courses, draftCourses);

const sectionId = (categoryId: string): string => `category-${categoryId}`;

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
    <nav class="mt-6 grid gap-3 sm:grid-cols-3" aria-label="目的から選ぶ">
      <RouterLink
        v-for="audience in audiencePages"
        :key="audience.id"
        :to="{ name: 'audience', params: { audienceId: audience.id } }"
        class="rounded-xl border border-sky-200 bg-sky-50 p-4 transition hover:border-sky-400 hover:shadow"
      >
        <p class="font-bold text-sky-800">{{ audience.navLabel }}</p>
        <p class="mt-1 text-sm text-slate-600">{{ audience.tagline }}</p>
      </RouterLink>
      <RouterLink
        :to="{ name: 'checklist' }"
        class="rounded-xl border border-sky-200 bg-sky-50 p-4 transition hover:border-sky-400 hover:shadow"
      >
        <p class="font-bold text-sky-800">安全チェックリスト</p>
        <p class="mt-1 text-sm text-slate-600">危ないことをしていないか、一つずつ確かめる</p>
      </RouterLink>
    </nav>
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
        <h2 class="text-xl font-bold">
          <RouterLink
            v-if="group.category.courseIds.length > 0"
            :to="{ name: 'category', params: { categoryId: group.category.id } }"
            class="hover:text-sky-700 hover:underline"
          >
            {{ group.category.title }}
          </RouterLink>
          <template v-else>{{ group.category.title }}</template>
        </h2>
        <span class="rounded-full bg-sky-50 px-3 py-0.5 text-sm text-sky-800">対象：{{ group.category.audience }}</span>
      </div>
      <ul class="mt-4 grid gap-4 sm:grid-cols-2">
        <li v-for="course in group.courses" :key="course.id">
          <CourseCard :course="course" />
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
