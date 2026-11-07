import type { Course } from "./types.ts";

export type UpcomingCourse = {
  title: string;
  summary: string;
};

export type CourseCategory = {
  id: string;
  title: string;
  audience: string;
  courseIds: string[];
  upcoming: UpcomingCourse[];
};

export type CategoryGroup = {
  category: CourseCategory;
  courses: Course[];
  drafts: Course[];
  upcoming: UpcomingCourse[];
};

export const UNCATEGORIZED_CATEGORY: CourseCategory = {
  id: "uncategorized",
  title: "そのほかのコース",
  audience: "すべての人",
  courseIds: [],
  upcoming: [],
};

export const courseCategories: readonly CourseCategory[] = [
  {
    id: "beginners",
    title: "はじめての人へ",
    audience: "パソコンやスマホに詳しくない人",
    courseIds: ["stop-and-ask", "device-basics"],
    upcoming: [],
  },
  {
    id: "basics",
    title: "まず押さえる基本",
    audience: "すべての人",
    courseIds: [
      "passwords",
      "phishing",
      "smishing",
      "sns-posting",
      "mfa-methods",
      "master-account",
      "browser-data-theft",
      "realtime-phishing",
      "after-data-leak",
      "mobile-apps-payments",
      "browser-extensions",
      "tracking-stalkerware",
      "consent-phishing",
    ],
    upcoming: [],
  },
  {
    id: "scams",
    title: "電話やネットの詐欺",
    audience: "すべての人",
    courseIds: [
      "phone-scams",
      "online-scams",
      "fake-police",
      "ai-voice-impersonation",
      "financial-support-takeover",
      "investment-romance-scams",
      "fake-side-jobs",
      "shopping-site-scams",
      "fake-billing",
      "p2p-trade-scams",
      "fake-job-offers",
    ],
    upcoming: [],
  },
  {
    id: "office",
    title: "職場の毎日の仕事",
    audience: "事務・営業など一般の従業員",
    courseIds: ["email-before-send", "personal-info", "file-sharing"],
    upcoming: [],
  },
  {
    id: "support-desk",
    title: "カスタマーサポート・窓口",
    audience: "問い合わせ対応・受付の担当",
    courseIds: ["support-desk-identity"],
    upcoming: [],
  },
  {
    id: "workplace",
    title: "職場を狙うだまし",
    audience: "会社で働く人",
    courseIds: ["boss-impersonation", "hiring-attacks", "targeted-attacks", "chat-impersonation", "payroll-takeover"],
    upcoming: [],
  },
  {
    id: "remote",
    title: "社外で働くとき",
    audience: "会社で働く人",
    courseIds: ["outside-work"],
    upcoming: [],
  },
  {
    id: "home",
    title: "家庭で気をつけること",
    audience: "家族・保護者",
    courseIds: ["kids-games", "file-exchange", "home-network", "sextortion", "protect-parents", "digital-legacy"],
    upcoming: [],
  },
  {
    id: "ai-and-tools",
    title: "AI と開発ツールを使うとき",
    audience: "AI や開発者向けのツールを使う人",
    courseIds: ["ai-prompt-injection", "ai-data-and-tools", "paste-commands", "install-sources", "ai-agents-at-work"],
    upcoming: [],
  },
  {
    id: "smb",
    title: "中小企業の管理",
    audience: "経営者・管理担当",
    courseIds: [
      "patching",
      "data-disposal",
      "account-lifecycle",
      "suppliers",
      "insider-threat",
      "supply-chain-breach",
      "ot-iot-sites",
    ],
    upcoming: [],
  },
  {
    id: "incident",
    title: "事故が起きたとき",
    audience: "会社で働く人・経営者・管理担当",
    courseIds: [
      "incident-first-response",
      "backup-recovery",
      "business-sns-takeover",
      "email-takeover-abuse",
      "ransomware-before-encryption",
      "incident-reporting",
    ],
    upcoming: [],
  },
  {
    id: "it-admin",
    title: "情報システム担当の基本",
    audience: "社内のIT担当（兼務を含む）",
    courseIds: ["it-inventory", "it-environment", "logging-basics", "exposed-entry-points", "ddos-continuity"],
    upcoming: [],
  },
  {
    id: "developers",
    title: "開発者向け",
    audience: "システムを作る・運用する人",
    courseIds: [
      "cloud-basics",
      "web-app-security",
      "api-security",
      "secure-design",
      "intrusion-detection",
      "forensics",
      "auth-sessions-tokens",
      "secrets-in-code",
    ],
    upcoming: [],
  },
];

const coursesIn = (category: CourseCategory, courses: readonly Course[]): Course[] =>
  category.courseIds.flatMap((courseId) => courses.filter((course) => course.id === courseId));

const isCategorized = (categories: readonly CourseCategory[]) => {
  const categorizedIds = new Set(categories.flatMap((category) => category.courseIds));
  return (course: Course): boolean => categorizedIds.has(course.id);
};

const uncategorizedGroup = (
  categories: readonly CourseCategory[],
  courses: readonly Course[],
  drafts: readonly Course[],
): CategoryGroup => {
  const categorized = isCategorized(categories);
  return {
    category: UNCATEGORIZED_CATEGORY,
    courses: courses.filter((course) => !categorized(course)),
    drafts: drafts.filter((course) => !categorized(course)),
    upcoming: [],
  };
};

const hasAnyCourse = (group: CategoryGroup): boolean =>
  group.courses.length + group.drafts.length + group.upcoming.length > 0;

export const groupCoursesByCategory = (
  categories: readonly CourseCategory[],
  courses: readonly Course[],
  drafts: readonly Course[] = [],
): CategoryGroup[] =>
  [
    ...categories.map((category) => ({
      category,
      courses: coursesIn(category, courses),
      drafts: coursesIn(category, drafts),
      upcoming: [...category.upcoming],
    })),
    uncategorizedGroup(categories, courses, drafts),
  ].filter(hasAnyCourse);
