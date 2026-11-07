<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ heading: string; message: string; url: string; title: string }>();

const COPIED_NOTICE_MS = 2500;

const notice = ref("");
const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
const messageWithUrl = computed(() => `${props.message}\n${props.url}`);

const showNotice = (text: string) => {
  notice.value = text;
  window.setTimeout(() => (notice.value = ""), COPIED_NOTICE_MS);
};

const copy = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text);
    showNotice(`${label}をコピーしました`);
  } catch {
    showNotice("コピーできませんでした。文面を選んでコピーしてください");
  }
};

const share = async () => {
  try {
    await navigator.share({ title: props.title, text: props.message, url: props.url });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    showNotice("送れませんでした。文面とリンクをコピーして送ってください");
  }
};
</script>

<template>
  <section class="rounded-xl border border-sky-200 bg-sky-50 p-5">
    <h2 class="text-lg font-bold text-sky-900">{{ heading }}</h2>
    <p class="mt-1 text-sm text-slate-600">この文面とリンクを、メッセージで送れます。</p>
    <p class="mt-3 whitespace-pre-wrap rounded-lg bg-white p-4 text-sm text-slate-800 select-all">
      {{ messageWithUrl }}
    </p>
    <div class="mt-3 flex flex-wrap gap-2">
      <button
        v-if="canShare"
        type="button"
        class="rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
        @click="share"
      >
        送る
      </button>
      <button
        type="button"
        class="rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-800 hover:border-sky-500"
        @click="copy(messageWithUrl, '文面とリンク')"
      >
        文面とリンクをコピー
      </button>
      <button
        type="button"
        class="rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-800 hover:border-sky-500"
        @click="copy(url, 'リンク')"
      >
        リンクだけコピー
      </button>
    </div>
    <p class="mt-2 min-h-5 text-sm text-sky-800" role="status">{{ notice }}</p>
  </section>
</template>
