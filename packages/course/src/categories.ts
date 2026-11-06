import type { Course } from "./types.ts";

export type CourseCategory = {
  id: string;
  title: string;
  audience: string;
  courseIds: string[];
};

export type CategoryGroup = {
  category: CourseCategory;
  courses: Course[];
};

export const UNCATEGORIZED_CATEGORY: CourseCategory = {
  id: "uncategorized",
  title: "そのほかのコース",
  audience: "すべての人",
  courseIds: [],
};

export const courseCategories: readonly CourseCategory[] = [
  {
    id: "basics",
    title: "まず押さえる基本",
    audience: "すべての人",
    courseIds: ["passwords", "phishing", "smishing"],
  },
  {
    id: "scams",
    title: "電話やネットの詐欺",
    audience: "すべての人",
    courseIds: ["phone-scams", "online-scams"],
  },
  {
    id: "workplace",
    title: "職場を狙うだまし",
    audience: "会社で働く人",
    courseIds: ["boss-impersonation", "hiring-attacks"],
  },
  {
    id: "remote",
    title: "社外で働くとき",
    audience: "会社で働く人",
    courseIds: ["outside-work"],
  },
  {
    id: "ai-and-tools",
    title: "AI と開発ツールを使うとき",
    audience: "AI や開発者向けのツールを使う人",
    courseIds: ["ai-prompt-injection", "ai-data-and-tools", "paste-commands", "install-sources"],
  },
  {
    id: "smb",
    title: "中小企業の管理",
    audience: "経営者・管理担当",
    courseIds: ["patching", "data-disposal", "account-lifecycle"],
  },
];

const coursesIn = (category: CourseCategory, courses: readonly Course[]): Course[] =>
  category.courseIds.flatMap((courseId) => courses.filter((course) => course.id === courseId));

const uncategorizedCourses = (categories: readonly CourseCategory[], courses: readonly Course[]): Course[] => {
  const categorizedIds = new Set(categories.flatMap((category) => category.courseIds));
  return courses.filter((course) => !categorizedIds.has(course.id));
};

export const groupCoursesByCategory = (
  categories: readonly CourseCategory[],
  courses: readonly Course[],
): CategoryGroup[] =>
  [
    ...categories.map((category) => ({ category, courses: coursesIn(category, courses) })),
    { category: UNCATEGORIZED_CATEGORY, courses: uncategorizedCourses(categories, courses) },
  ].filter((group) => group.courses.length > 0);
