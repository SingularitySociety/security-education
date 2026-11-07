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
      "mfa-methods",
      "master-account",
      "phishing",
      "smishing",
      "realtime-phishing",
      "sns-posting",
    ],
    upcoming: [],
  },
  {
    id: "takeover",
    title: "アカウント・ブラウザ・スマホの乗っ取り",
    audience: "すべての人",
    courseIds: [
      "browser-data-theft",
      "browser-extensions",
      "consent-phishing",
      "mobile-apps-payments",
      "financial-support-takeover",
      "email-takeover-abuse",
      "after-data-leak",
    ],
    upcoming: [],
  },
  {
    id: "scams",
    title: "電話やメッセージでだます詐欺",
    audience: "すべての人",
    courseIds: ["phone-scams", "fake-police", "ai-voice-impersonation", "fake-billing"],
    upcoming: [],
  },
  {
    id: "money-scams",
    title: "もうけ話・副業・買い物の詐欺",
    audience: "すべての人",
    courseIds: [
      "online-scams",
      "investment-romance-scams",
      "fake-side-jobs",
      "fake-job-offers",
      "shopping-site-scams",
      "p2p-trade-scams",
    ],
    upcoming: [],
  },
  {
    id: "safety",
    title: "身の安全と家族を守る",
    audience: "すべての人・家族・保護者",
    courseIds: ["tracking-stalkerware", "sextortion", "protect-parents"],
    upcoming: [],
  },
  {
    id: "home",
    title: "家庭で気をつけること",
    audience: "家族・保護者",
    courseIds: ["kids-games", "file-exchange", "home-network", "digital-legacy"],
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
    courseIds: ["boss-impersonation", "chat-impersonation", "payroll-takeover", "hiring-attacks", "targeted-attacks"],
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
    id: "ai",
    title: "AI を使うとき",
    audience: "仕事や暮らしで AI を使う人",
    courseIds: ["ai-data-and-tools", "ai-prompt-injection", "ai-agents-at-work"],
    upcoming: [],
  },
  {
    id: "dev-tools",
    title: "開発ツールとコマンド",
    audience: "開発者向けのツールやコマンドを使う人",
    courseIds: ["paste-commands", "install-sources", "secrets-in-code"],
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
      "ransomware-before-encryption",
      "incident-reporting",
    ],
    upcoming: [],
  },
  {
    id: "it-admin",
    title: "情報システム担当の基本",
    audience: "社内のIT担当（兼務を含む）",
    courseIds: ["it-inventory", "it-environment", "exposed-entry-points", "ddos-continuity"],
    upcoming: [],
  },
  {
    id: "monitoring",
    title: "監視と調査",
    audience: "社内のIT担当・運用担当・開発者",
    courseIds: ["logging-basics", "intrusion-detection", "forensics"],
    upcoming: [],
  },
  {
    id: "developers",
    title: "開発者向け",
    audience: "システムを作る人",
    courseIds: ["cloud-basics", "web-app-security", "api-security", "secure-design", "auth-sessions-tokens"],
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
