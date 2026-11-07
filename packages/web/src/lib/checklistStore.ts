import { readonly, ref } from "vue";
import {
  checklistGroups,
  checklistItemIds,
  isChecked,
  parseCheckedItems,
  toggleChecked,
} from "@security-education/course";
import type { CheckedItems } from "@security-education/course";
import { readStorage, writeStorage } from "./browserStorage.ts";

const STORAGE_KEY = "security-education:checklist:v1";

const checkedItems = ref<CheckedItems>(parseCheckedItems(readStorage(STORAGE_KEY), checklistItemIds(checklistGroups)));

const save = (next: CheckedItems): void => {
  checkedItems.value = next;
  writeStorage(STORAGE_KEY, next);
};

export const useChecklist = () => ({
  checkedItems: readonly(checkedItems),
  isChecked: (itemId: string): boolean => isChecked(checkedItems.value, itemId),
  toggle: (itemId: string) => save(toggleChecked(checkedItems.value, itemId)),
  clearAll: () => save({}),
});
