<script setup lang="ts">
import type { EmailSample } from "@security-education/course";

defineProps<{ email: EmailSample }>();
</script>

<template>
  <div class="rounded-lg border border-slate-300 bg-white p-4 text-sm">
    <div class="border-b border-slate-200 pb-2">
      <div><span class="text-slate-500">差出人：</span>{{ email.fromName }} &lt;{{ email.fromAddress }}&gt;</div>
      <div class="font-semibold"><span class="font-normal text-slate-500">件名：</span>{{ email.subject }}</div>
    </div>
    <p v-for="line in email.body" :key="line" class="mt-2">{{ line }}</p>
    <template v-if="email.linkLabel !== undefined">
      <div class="mt-3 inline-block rounded bg-blue-600 px-3 py-2 font-semibold text-white">{{ email.linkLabel }}</div>
      <div class="mt-1 break-all text-xs text-slate-500">{{ email.linkUrl }}</div>
    </template>
  </div>
</template>
