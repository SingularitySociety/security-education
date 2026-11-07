<script setup lang="ts">
import { audiencePath, checklistGroups, courses, findAudiencePage, pageUrl } from "@security-education/course";
import { computed } from "vue";
import CourseCard from "../components/CourseCard.vue";
import ShareBox from "../components/ShareBox.vue";

const props = defineProps<{ audienceId: string }>();

const audience = computed(() => findAudiencePage(props.audienceId));
const coursesFor = (courseIds: readonly string[]) =>
  courseIds.flatMap((id) => courses.filter((course) => course.id === id));
const checklistItems = computed(() =>
  checklistGroups
    .filter((group) => audience.value?.checklistGroupIds.includes(group.id))
    .flatMap((group) => group.items),
);
</script>

<template>
  <section v-if="audience">
    <p class="text-sm"><RouterLink to="/" class="text-sky-700 hover:underline">コース一覧</RouterLink></p>
    <h1 class="mt-2 text-2xl font-bold">{{ audience.title }}</h1>
    <p v-for="paragraph in audience.intro" :key="paragraph" class="mt-3 text-slate-700">{{ paragraph }}</p>
    <ShareBox
      class="mt-6"
      :heading="audience.shareHeading"
      :message="audience.shareMessage"
      :url="pageUrl(audiencePath(audience.id))"
      :title="audience.title"
    />
    <section v-for="(step, index) in audience.steps" :key="step.heading" class="mt-10">
      <h2 class="text-xl font-bold">{{ index + 1 }}. {{ step.heading }}</h2>
      <p class="mt-1 text-slate-600">{{ step.note }}</p>
      <ul class="mt-4 grid gap-4 sm:grid-cols-2">
        <li v-for="course in coursesFor(step.courseIds)" :key="course.id">
          <CourseCard :course="course" />
        </li>
      </ul>
    </section>
    <section class="mt-10">
      <h2 class="text-xl font-bold">あわせて確かめる</h2>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-slate-700">
        <li v-for="item in checklistItems" :key="item.id">{{ item.text }}</li>
      </ul>
      <p class="mt-3">
        <RouterLink :to="{ name: 'checklist' }" class="font-semibold text-sky-700 hover:underline">
          安全チェックリストで、印をつけて確かめる
        </RouterLink>
      </p>
    </section>
  </section>
  <section v-else>
    <h1 class="text-2xl font-bold">ページが見つかりません</h1>
    <p class="mt-2"><RouterLink to="/" class="text-sky-700 hover:underline">コース一覧へ戻る</RouterLink></p>
  </section>
</template>
