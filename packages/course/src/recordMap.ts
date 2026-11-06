export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const parseRecordMap = <T>(raw: string | null, isEntry: (value: unknown) => value is T): Record<string, T> => {
  if (raw === null) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return {};
    return Object.entries(parsed).reduce<Record<string, T>>((map, [key, value]) => {
      if (isEntry(value)) map[key] = value;
      return map;
    }, {});
  } catch {
    return {};
  }
};
