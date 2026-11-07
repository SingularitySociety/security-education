import type { ChecklistGroup } from "./checklist.ts";
import { parseRecordMap } from "./recordMap.ts";

export type CheckedItems = Readonly<Record<string, true>>;

export type GroupProgress = {
  checkedCount: number;
  total: number;
};

const isTrue = (value: unknown): value is true => value === true;

export const checklistItemIds = (groups: readonly ChecklistGroup[]): string[] =>
  groups.flatMap((group) => group.items.map((item) => item.id));

export const parseCheckedItems = (raw: string | null, knownItemIds: readonly string[]): CheckedItems => {
  const known = new Set(knownItemIds);
  return Object.fromEntries(Object.entries(parseRecordMap(raw, isTrue)).filter(([itemId]) => known.has(itemId)));
};

export const isChecked = (checked: CheckedItems, itemId: string): boolean => checked[itemId] === true;

export const toggleChecked = (checked: CheckedItems, itemId: string): CheckedItems =>
  isChecked(checked, itemId)
    ? Object.fromEntries(Object.entries(checked).filter(([id]) => id !== itemId))
    : { ...checked, [itemId]: true };

export const groupProgress = (group: ChecklistGroup, checked: CheckedItems): GroupProgress => ({
  checkedCount: group.items.filter((item) => isChecked(checked, item.id)).length,
  total: group.items.length,
});
