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
        <span class="hidden text-sm text-slate-500 md:inline">動画を見て、確認テストに合格しよう</span>
      </div>
    </header>
    <main class="mx-auto max-w-4xl px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
