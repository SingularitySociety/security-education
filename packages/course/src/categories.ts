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
    courseIds: ["passwords", "phishing", "smishing", "sns-posting"],
    upcoming: [],
  },
  {
    id: "scams",
    title: "電話やネットの詐欺",
    audience: "すべての人",
    courseIds: ["phone-scams", "online-scams"],
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
    courseIds: ["boss-impersonation", "hiring-attacks", "targeted-attacks"],
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
    courseIds: ["kids-games", "file-exchange", "home-network"],
    upcoming: [],
  },
  {
    id: "ai-and-tools",
    title: "AI と開発ツールを使うとき",
    audience: "AI や開発者向けのツールを使う人",
    courseIds: ["ai-prompt-injection", "ai-data-and-tools", "paste-commands", "install-sources"],
    upcoming: [],
  },
  {
    id: "smb",
    title: "中小企業の管理",
    audience: "経営者・管理担当",
    courseIds: ["patching", "data-disposal", "account-lifecycle"],
    upcoming: [
      {
        title: "委託先・取引先とつながるときの基本",
        summary:
          "委託先に渡すアカウント、取引先を装う・乗っ取られた取引先からのメール、被害を広げないための初動を学びます。",
      },
      {
        title: "内部不正と情報の持ち出し",
        summary:
          "在職中の持ち出しがなぜ問題になるか、悪意がなくても事故になること、会社として決めておくことを学びます。",
      },
    ],
  },
  {
    id: "incident",
    title: "事故が起きたとき",
    audience: "会社で働く人・経営者・管理担当",
    courseIds: [],
    upcoming: [
      {
        title: "インシデント発生時の初動",
        summary: "感染・誤送信・紛失・乗っ取りに気づいた直後に何をするか、誰に何をいつ報告するかを学びます。",
      },
      {
        title: "バックアップと復旧",
        summary:
          "ランサムウェアに備えて、何をどう分けて保管し、本当に戻せるかを試し、止まった業務をどう続けるかを学びます。",
      },
    ],
  },
  {
    id: "it-admin",
    title: "情報システム担当の基本",
    audience: "社内のIT担当（兼務を含む）",
    courseIds: [],
    upcoming: [
      {
        title: "IT資産とアカウントの台帳",
        summary: "機器・ソフト・SaaS・管理者権限を一覧にし、誰が何を管理するかを決める方法を学びます。",
      },
      {
        title: "端末・ネットワーク・SaaSの管理",
        summary: "多要素認証、端末の管理、ネットワークの分離、SaaSの設定など、社内のIT環境を守る基本を学びます。",
      },
      {
        title: "ログと監視の基本",
        summary: "何を記録し、どんな動きに気づけばよいか、社内のIT運用で無理なく続けられる監視の始め方を学びます。",
      },
    ],
  },
  {
    id: "developers",
    title: "開発者向け",
    audience: "システムを作る・運用する人",
    courseIds: [],
    upcoming: [
      {
        title: "クラウドの基本設定",
        summary: "IAMの権限、公開されたストレージ、漏れたアクセスキーなど、クラウドで起きやすい事故を学びます。",
      },
      {
        title: "Webアプリケーションのセキュリティ",
        summary: "XSS、SQLインジェクション、CSRFなど、Webアプリの代表的な弱点と直し方を学びます。",
      },
      {
        title: "APIのセキュリティ",
        summary: "認可の不備で他人のデータに届く問題や、レート制限の欠如など、APIの弱点を学びます。",
      },
      { title: "安全な設計", summary: "最小権限や信頼の境界など、作る前に考えておく設計の原則を学びます。" },
      {
        title: "侵入に気づく仕組み",
        summary: "侵入されることを前提に、何を検出し、どうアラートを出し、誰がいつ対応するかを学びます。",
      },
      {
        title: "ログとフォレンジック調査",
        summary:
          "何をどれだけ記録して守るか、何が・いつから・どこまで取られたかを突き止める手順と証拠の保全を学びます。",
      },
    ],
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
