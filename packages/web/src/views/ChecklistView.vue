<script setup lang="ts">
import { checklistGroups, findCourse, groupProgress } from "@security-education/course";
import type { ChecklistGroup } from "@security-education/course";
import { useChecklist } from "../lib/checklistStore.ts";

const { checkedItems, isChecked, toggle, clearAll } = useChecklist();

const progressLabel = (group: ChecklistGroup): string => {
  const { checkedCount, total } = groupProgress(group, checkedItems.value);
  return `${checkedCount} / ${total} 項目`;
};

const courseTitle = (courseId: string): string => findCourse(courseId)?.title ?? courseId;

const checkboxId = (itemId: string): string => `checklist-${itemId}`;
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold">安全チェックリスト</h1>
    <p class="mt-2 text-slate-600">
      ふだんの設定や行動を、一つずつ確かめて直しましょう。できたものにチェックを付けると、このブラウザに保存されます。くわしくは、各項目のコースで学べます。
    </p>
    <div class="mt-4">
      <button
        type="button"
        class="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-rose-400 hover:text-rose-700"
        @click="clearAll"
      >
        チェックを全部外す
      </button>
    </div>
    <section v-for="group in checklistGroups" :key="group.id" class="mt-10">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 class="text-xl font-bold">{{ group.title }}</h2>
        <span class="rounded-full bg-sky-50 px-3 py-0.5 text-sm text-sky-800">{{ progressLabel(group) }}</span>
      </div>
      <ul class="mt-4 grid gap-3">
        <li
          v-for="item in group.items"
          :key="item.id"
          class="rounded-xl border p-4 shadow-sm"
          :class="isChecked(item.id) ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'"
        >
          <div class="flex items-start gap-3">
            <input
              :id="checkboxId(item.id)"
              type="checkbox"
              class="mt-1 size-5 shrink-0 accent-emerald-600"
              :checked="isChecked(item.id)"
              @change="toggle(item.id)"
            />
            <label :for="checkboxId(item.id)" class="min-w-0 flex-1 cursor-pointer">{{ item.text }}</label>
          </div>
          <p class="mt-2 flex flex-wrap gap-2 pl-8 text-xs">
            <RouterLink
              v-for="courseId in item.courseIds"
              :key="courseId"
              :to="{ name: 'course', params: { courseId } }"
              class="rounded-full bg-slate-100 px-2.5 py-0.5 text-sky-700 hover:bg-sky-100"
            >
              {{ courseTitle(courseId) }}
            </RouterLink>
          </p>
        </li>
      </ul>
    </section>
  </section>
</template>
