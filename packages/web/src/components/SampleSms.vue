<script setup lang="ts">
import type { SmsSample } from "@security-education/course";

defineProps<{ sms: SmsSample }>();
</script>

<template>
  <div class="max-w-sm rounded-2xl border border-slate-300 bg-slate-100 p-4 text-sm">
    <div class="text-center font-semibold text-slate-700">{{ sms.sender }}</div>
    <div class="mt-3 rounded-2xl bg-white p-3">
      {{ sms.text }}
      <div class="mt-2 break-all text-blue-600 underline">{{ sms.linkUrl }}</div>
    </div>
  </div>
</template>
