<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { findCourse, isQuizComplete, scoreQuiz } from "@security-education/course";
import type { QuizResult } from "@security-education/course";
import CourseNotFound from "../components/CourseNotFound.vue";
import QuestionCard from "../components/QuestionCard.vue";
import QuizResultPanel from "../components/QuizResultPanel.vue";
import { useProgress } from "../lib/progressStore.ts";

const props = defineProps<{ courseId: string }>();

const router = useRouter();
const course = computed(() => findCourse(props.courseId));
const { courseProgress, recordAttempt } = useProgress();
const answers = ref<Record<string, string>>({});
const result = ref<QuizResult | null>(null);

if (course.value && !courseProgress(props.courseId).watched) {
  void router.replace({ name: "course", params: { courseId: props.courseId } });
}

const canSubmit = computed(() => course.value !== undefined && isQuizComplete(course.value.quiz, answers.value));

const resultFor = (questionId: string) =>
  result.value?.questionResults.find((questionResult) => questionResult.questionId === questionId) ?? null;

const submit = () => {
  if (!course.value || !canSubmit.value) return;
  result.value = scoreQuiz(course.value.quiz, answers.value);
  recordAttempt(course.value.id, result.value);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const retry = () => {
  answers.value = {};
  result.value = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <CourseNotFound v-if="!course" />
  <section v-else>
    <RouterLink :to="{ name: 'course', params: { courseId: course.id } }" class="text-sm text-sky-700 underline">
      ← 動画に戻る
    </RouterLink>
    <h1 class="mt-2 text-2xl font-bold">確認テスト：{{ course.title }}</h1>

    <QuizResultPanel v-if="result" class="mt-6" :result="result" @retry="retry" />

    <form class="mt-6 grid gap-5" @submit.prevent="submit">
      <QuestionCard
        v-for="(question, index) in course.quiz"
        :key="question.id"
        v-model="answers[question.id]"
        :question="question"
        :number="index + 1"
        :result="resultFor(question.id)"
      />
      <button
        v-if="!result"
        type="submit"
        :disabled="!canSubmit"
        class="rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
      >
        {{ canSubmit ? "採点する" : "すべての問題に回答してください" }}
      </button>
    </form>
  </section>
</template>
