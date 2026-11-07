<script setup lang="ts">
import { courseCategories, courses } from "@security-education/course";
import { computed } from "vue";
import CourseCard from "../components/CourseCard.vue";

const props = defineProps<{ categoryId: string }>();

const category = computed(() => courseCategories.find((candidate) => candidate.id === props.categoryId));
const categoryCourses = computed(() =>
  (category.value?.courseIds ?? []).flatMap((id) => courses.filter((course) => course.id === id)),
);
</script>

<template>
  <section v-if="category">
    <p class="text-sm"><RouterLink to="/" class="text-sky-700 hover:underline">コース一覧</RouterLink></p>
    <h1 class="mt-2 text-2xl font-bold">{{ category.title }}</h1>
    <p class="mt-2">
      <span class="rounded-full bg-sky-50 px-3 py-0.5 text-sm text-sky-800">対象：{{ category.audience }}</span>
    </p>
    <ul class="mt-6 grid gap-4 sm:grid-cols-2">
      <li v-for="course in categoryCourses" :key="course.id">
        <CourseCard :course="course" />
      </li>
    </ul>
  </section>
  <section v-else>
    <h1 class="text-2xl font-bold">カテゴリーが見つかりません</h1>
    <p class="mt-2"><RouterLink to="/" class="text-sky-700 hover:underline">コース一覧へ戻る</RouterLink></p>
  </section>
</template>
