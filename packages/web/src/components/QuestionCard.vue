<script setup lang="ts">
import type { QuestionResult, QuizQuestion } from "@security-education/course";
import SampleEmail from "./SampleEmail.vue";
import SampleSms from "./SampleSms.vue";

defineProps<{ question: QuizQuestion; number: number; result: QuestionResult | null }>();
const selected = defineModel<string | undefined>();
</script>

<template>
  <fieldset class="rounded-xl border border-slate-200 bg-white p-5">
    <legend class="sr-only">問{{ number }}</legend>
    <p class="font-semibold">
      <span class="mr-2 text-sky-700">問{{ number }}</span
      >{{ question.prompt }}
    </p>
    <div v-if="question.sample" class="mt-3">
      <SampleEmail v-if="question.sample.kind === 'email'" :email="question.sample.email" />
      <SampleSms v-else :sms="question.sample.sms" />
    </div>
    <div class="mt-4 grid gap-2">
      <label
        v-for="choice in question.choices"
        :key="choice.id"
        class="flex cursor-pointer items-start gap-3 rounded-lg border p-3"
        :class="[
          result && choice.id === question.correctChoiceId ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200',
          result && !result.isCorrect && choice.id === result.chosenChoiceId ? 'border-rose-500 bg-rose-50' : '',
          result ? 'cursor-default' : 'hover:border-sky-400',
        ]"
      >
        <input
          v-model="selected"
          type="radio"
          class="mt-1"
          :name="question.id"
          :value="choice.id"
          :disabled="result !== null"
        />
        <span>{{ choice.label }}</span>
      </label>
    </div>
    <div
      v-if="result"
      class="mt-4 rounded-lg p-3 text-sm"
      :class="result.isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'"
    >
      <p class="font-semibold">{{ result.isCorrect ? "正解" : "不正解" }}</p>
      <p class="mt-1">{{ question.explanation }}</p>
    </div>
  </fieldset>
</template>
