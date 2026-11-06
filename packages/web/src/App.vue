<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <RouterLink to="/" class="text-lg font-bold text-sky-700">セキュリティ教育</RouterLink>
        <span class="hidden text-sm text-slate-500 sm:inline">動画を見て、確認テストに合格しよう</span>
      </div>
    </header>
    <main class="mx-auto max-w-4xl px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
