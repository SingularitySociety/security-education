<script setup lang="ts">
import type { ReviewBody } from "@security-education/course";
import SampleEmail from "./SampleEmail.vue";
import SampleSms from "./SampleSms.vue";

defineProps<{ body: ReviewBody }>();
</script>

<template>
  <p v-if="body.kind === 'subtitle'" class="text-slate-600">{{ body.text }}</p>

  <ul v-else-if="body.kind === 'points'" class="list-disc space-y-1 pl-5">
    <li v-for="point in body.points" :key="point">{{ point }}</li>
  </ul>

  <div v-else-if="body.kind === 'email' || body.kind === 'sms'" class="space-y-3">
    <SampleEmail v-if="body.kind === 'email'" :email="body.email" />
    <SampleSms v-else :sms="body.sms" />
    <div v-if="body.redFlags.length > 0" class="rounded-lg bg-rose-50 p-3 text-sm text-rose-900">
      <div class="font-semibold">ここが怪しい</div>
      <ul class="mt-1 list-disc space-y-1 pl-5">
        <li v-for="flag in body.redFlags" :key="flag">{{ flag }}</li>
      </ul>
    </div>
  </div>

  <ul v-else-if="body.kind === 'urls'" class="space-y-2">
    <li v-for="row in body.urls" :key="row.url" class="rounded-lg border border-slate-200 p-3 text-sm">
      <span
        class="mr-2 inline-block rounded px-2 py-0.5 text-xs font-bold text-white"
        :class="row.isFake ? 'bg-rose-600' : 'bg-emerald-600'"
      >
        {{ row.verdictLabel }}
      </span>
      <code class="break-all">{{ row.url }}</code>
      <div class="mt-1 text-slate-600">{{ row.note }}</div>
    </li>
  </ul>

  <div v-else-if="body.kind === 'conversation'" class="space-y-3">
    <div class="rounded-lg border border-slate-300 bg-white p-4 text-sm">
      <div class="border-b border-slate-200 pb-2 text-center">
        <div class="font-semibold">{{ body.contactName }}</div>
        <div class="text-xs text-slate-500">{{ body.contactDetail }}</div>
      </div>
      <div class="mt-3 flex flex-col gap-2">
        <p
          v-for="(message, index) in body.messages"
          :key="`${index}-${message.text}`"
          class="max-w-[85%] rounded-2xl px-3 py-2"
          :class="message.from === 'me' ? 'self-end bg-blue-600 text-white' : 'self-start bg-slate-100'"
        >
          {{ message.text }}
        </p>
      </div>
    </div>
    <div
      v-if="body.redFlags.length > 0"
      class="rounded-lg p-3 text-sm"
      :class="body.notesKind === 'keyPoints' ? 'bg-sky-50 text-sky-900' : 'bg-rose-50 text-rose-900'"
    >
      <div class="font-semibold">{{ body.notesHeading }}</div>
      <ul class="mt-1 list-disc space-y-1 pl-5">
        <li v-for="flag in body.redFlags" :key="flag">{{ flag }}</li>
      </ul>
    </div>
  </div>

  <div v-else-if="body.kind === 'code'" class="space-y-3">
    <div class="overflow-x-auto rounded-lg bg-slate-900 py-3 text-sm text-slate-100">
      <div class="px-4 pb-2 text-xs text-slate-400">{{ body.language }}</div>
      <pre
        v-for="(line, index) in body.lines"
        :key="`${index}-${line.text}`"
        class="border-l-4 px-4 font-mono"
        :class="
          line.mark === 'bad'
            ? 'border-rose-500 bg-rose-500/20'
            : line.mark === 'good'
              ? 'border-emerald-500 bg-emerald-500/20'
              : 'border-transparent'
        "
        >{{ line.text || " " }}</pre>
    </div>
    <ul class="list-disc space-y-1 pl-5">
      <li v-for="note in body.notes" :key="note">{{ note }}</li>
    </ul>
  </div>

  <ol v-else-if="body.kind === 'flow'" class="space-y-2">
    <li
      v-for="(step, index) in body.steps"
      :key="step.label"
      class="rounded-lg border-l-4 bg-white p-3 text-sm shadow-sm"
      :class="
        step.tone === 'danger' ? 'border-rose-500' : step.tone === 'safe' ? 'border-emerald-500' : 'border-sky-500'
      "
    >
      <span class="font-semibold">{{ index + 1 }}. {{ step.label }}</span>
      <span class="ml-2 text-slate-600">{{ step.detail }}</span>
    </li>
  </ol>

  <ul v-else class="space-y-2">
    <li
      v-for="row in body.rows"
      :key="row.service"
      class="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-slate-200 p-3 text-sm"
    >
      <span class="font-semibold">{{ row.service }}</span>
      <code class="break-all">{{ row.password }}</code>
      <span class="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">{{ row.statusLabel }}</span>
    </li>
  </ul>
</template>
