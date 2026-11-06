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
    <div v-if="body.redFlags.length > 0" class="rounded-lg bg-rose-50 p-3 text-sm text-rose-900">
      <div class="font-semibold">ここが怪しい</div>
      <ul class="mt-1 list-disc space-y-1 pl-5">
        <li v-for="flag in body.redFlags" :key="flag">{{ flag }}</li>
      </ul>
    </div>
  </div>

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
