import type { CourseCategory } from "./categories.ts";
import type { ChecklistGroup } from "./checklist.ts";
import { toReviewSections } from "./reviewPoints.ts";
import type { Course } from "./types.ts";

export const SITE_URL = "https://singularitysociety.github.io/security-education/";
export const SITE_NAME = "セキュリティ教育";
export const SITE_DESCRIPTION =
  "詐欺・乗っ取り・情報漏えいから身を守るための、無料のセキュリティ教育。短い動画と確認テストで、家庭でも職場でも学べます。";
export const PUBLISHER_NAME = "Singularity Society";
export const PUBLISHER_URL = "https://singularitysociety.org";

export type JsonLd = Record<string, unknown>;

export type PageLink = { text: string; path?: string };

export type PageSection = { heading: string; items: readonly PageLink[]; layout?: "list" | "paragraphs" };

export type SitePage = {
  path: string;
  title: string;
  heading: string;
  tagline: string;
  description: string;
  ogImageKey: string;
  indexable: boolean;
  jsonLd: readonly JsonLd[];
  sections: readonly PageSection[];
};

export type SiteContent = {
  courses: readonly Course[];
  categories: readonly CourseCategory[];
  checklistGroups: readonly ChecklistGroup[];
  videoSeconds: (courseId: string) => number | undefined;
};

const SECONDS_PER_MINUTE = 60;

// GitHub Pages redirects /courses/<id> to /courses/<id>/, so the trailing slash is the canonical form.
export const pageUrl = (path: string): string => (path === "" ? SITE_URL : `${SITE_URL}${path}/`);

export const fileUrl = (relativePath: string): string => `${SITE_URL}${relativePath}`;

export const coursePath = (courseId: string): string => `courses/${courseId}`;

export const quizPath = (courseId: string): string => `courses/${courseId}/quiz`;

const pageTitle = (heading: string): string => `${heading}｜${SITE_NAME}`;

const publisher = (): JsonLd => ({ "@type": "Organization", name: PUBLISHER_NAME, url: PUBLISHER_URL });

// The first scene is the title card; the rest carry the lesson.
const lessonSections = (course: Course): PageSection[] =>
  toReviewSections(course.scenes.slice(1)).map((section) => ({
    heading: section.heading,
    items: [{ text: section.narration }],
    layout: "paragraphs",
  }));

const courseTagline = (course: Course): string => {
  const [titleScene] = course.scenes;
  return titleScene?.kind === "title" ? titleScene.subtitle : course.summary;
};

const courseLink = (course: Course): PageLink => ({
  text: `${course.title}：${course.summary}`,
  path: coursePath(course.id),
});

const workloadIso = (seconds: number | undefined): string | undefined =>
  seconds === undefined ? undefined : `PT${Math.ceil(seconds / SECONDS_PER_MINUTE)}M`;

const courseJsonLd = (course: Course, seconds: number | undefined): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.title,
  description: course.summary,
  url: pageUrl(coursePath(course.id)),
  inLanguage: "ja",
  isAccessibleForFree: true,
  provider: publisher(),
  offers: { "@type": "Offer", price: 0, priceCurrency: "JPY", category: "Free" },
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: workloadIso(seconds) },
});

const homePage = (content: SiteContent): SitePage => ({
  path: "",
  title: `${SITE_NAME}｜詐欺・乗っ取り・情報漏えいから身を守る無料の動画とテスト`,
  heading: SITE_NAME,
  tagline: "詐欺・乗っ取り・情報漏えいから身を守る",
  description: SITE_DESCRIPTION,
  ogImageKey: "home",
  indexable: true,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "ja",
      description: SITE_DESCRIPTION,
      publisher: publisher(),
    },
  ],
  sections: [
    { heading: "チェックリスト", items: [{ text: "安全チェックリスト", path: "checklist" }] },
    ...content.categories.map((category) => ({
      heading: `${category.title}（対象：${category.audience}）`,
      items: category.courseIds.flatMap((id) => content.courses.filter((course) => course.id === id)).map(courseLink),
    })),
  ],
});

const checklistPage = (content: SiteContent): SitePage => ({
  path: "checklist",
  title: pageTitle("安全チェックリスト"),
  heading: "安全チェックリスト",
  tagline: "危ないことをしていないか、一つずつ確かめる",
  description:
    "ブラウザ・パソコン・スマホ・アカウント・家族・職場で、危ないことをしていないかを一つずつ確かめるチェックリスト。印をつけて、自分の状態を確かめられます。",
  ogImageKey: "checklist",
  indexable: true,
  jsonLd: [],
  sections: content.checklistGroups.map((group) => ({
    heading: group.title,
    items: group.items.map((item) => ({ text: item.text })),
  })),
});

const coursePage = (course: Course, content: SiteContent): SitePage => ({
  path: coursePath(course.id),
  title: pageTitle(course.title),
  heading: course.title,
  tagline: courseTagline(course),
  description: course.summary,
  ogImageKey: course.id,
  indexable: true,
  jsonLd: [courseJsonLd(course, content.videoSeconds(course.id))],
  sections: [
    ...lessonSections(course),
    { heading: "確認テスト", items: [{ text: `確認テストに進む：${course.title}`, path: quizPath(course.id) }] },
  ],
});

const quizPage = (course: Course): SitePage => ({
  path: quizPath(course.id),
  title: pageTitle(`確認テスト：${course.title}`),
  heading: course.title,
  tagline: courseTagline(course),
  description: `「${course.title}」の確認テスト。${course.summary}`,
  ogImageKey: course.id,
  indexable: false,
  jsonLd: [],
  sections: [{ heading: "コースに戻る", items: [{ text: course.title, path: coursePath(course.id) }] }],
});

export const buildSitePages = (content: SiteContent): SitePage[] => [
  homePage(content),
  checklistPage(content),
  ...content.courses.flatMap((course) => [coursePage(course, content), quizPage(course)]),
];

const trimSlashes = (path: string): string => path.replace(/^\/+|\/+$/g, "");

export const findSitePage = (pages: readonly SitePage[], path: string): SitePage | undefined =>
  pages.find((page) => page.path === trimSlashes(path));

export const pathFromLegacyHash = (hash: string): string | undefined => {
  if (!hash.startsWith("#/")) return undefined;
  return hash.slice(1);
};
