<script setup lang="ts">
import OrgLinks from "./components/OrgLinks.vue";
import { ORG_NAME, ORG_SITE_URL } from "./lib/orgLinks.ts";
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4">
        <div class="flex items-baseline gap-4">
          <RouterLink to="/" class="text-lg font-bold text-sky-700">セキュリティ教育</RouterLink>
          <nav class="flex gap-3 text-sm" aria-label="ページ">
            <RouterLink
              :to="{ name: 'home' }"
              class="text-slate-600 hover:text-sky-700 aria-[current=page]:font-semibold aria-[current=page]:text-sky-700"
            >
              コース一覧
            </RouterLink>
            <RouterLink
              :to="{ name: 'checklist' }"
              class="text-slate-600 hover:text-sky-700 aria-[current=page]:font-semibold aria-[current=page]:text-sky-700"
            >
              チェックリスト
            </RouterLink>
          </nav>
        </div>
        <div class="flex items-center gap-3 text-xs text-slate-500">
          <span>{{ ORG_NAME }}</span>
          <OrgLinks />
        </div>
      </div>
    </header>
    <main class="mx-auto max-w-4xl px-4 py-8">
      <RouterView />
    </main>
    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-6 text-sm text-slate-500">
        <p>
          運営:
          <a :href="ORG_SITE_URL" target="_blank" rel="noopener noreferrer" class="font-semibold hover:text-sky-700">{{
            ORG_NAME
          }}</a>
        </p>
        <OrgLinks />
      </div>
    </footer>
  </div>
</template>
