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
    id: "basics",
    title: "まず押さえる基本",
    audience: "すべての人",
    courseIds: ["passwords", "phishing", "smishing"],
    upcoming: [
      {
        title: "スマホとアプリの安全",
        summary: "不正アプリ、スマホ決済の不正利用、QRコードの貼り替えなど、スマホで狙われる手口と設定を学びます。",
      },
      {
        title: "SNSでの発信と誹謗中傷・デマ",
        summary: "業務情報や写真の写り込み、デマの拡散、誹謗中傷をしない・されたときの相談先を学びます。",
      },
    ],
  },
  {
    id: "scams",
    title: "電話やネットの詐欺",
    audience: "すべての人",
    courseIds: ["phone-scams", "online-scams"],
    upcoming: [],
  },
  {
    id: "workplace",
    title: "職場を狙うだまし",
    audience: "会社で働く人",
    courseIds: ["boss-impersonation", "hiring-attacks"],
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
