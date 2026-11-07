export type AudienceStep = {
  heading: string;
  note: string;
  courseIds: readonly string[];
};

export type AudiencePage = {
  id: string;
  title: string;
  navLabel: string;
  tagline: string;
  description: string;
  intro: readonly string[];
  steps: readonly AudienceStep[];
  checklistGroupIds: readonly string[];
  shareHeading: string;
  shareMessage: string;
};

export const audiencePages: readonly AudiencePage[] = [
  {
    id: "family",
    title: "家族に送る：詐欺と乗っ取りから家族を守る",
    navLabel: "家族に送る",
    tagline: "家族で見て、家族で決めておく",
    description:
      "警察や銀行を名乗る電話、偽のSMS、投資やロマンスの誘いなど、家族が狙われやすい手口を短い動画で学べるコースをまとめました。リンクを家族に送って、一緒に確かめてください。",
    intro: [
      "詐欺は、お年寄りだけでなく、どの年代も狙われます。だます側は、急がせ、ほかの人に相談させないようにします。家族で手口を知り、「お金や暗証番号の話が出たら、一人で決めずに家族に相談する」と決めておくことが、いちばんの守りです。",
      "どのコースも、動画を見てから、短い確認テストに答えます。登録はいりません。上から順に見るのがおすすめです。",
    ],
    steps: [
      {
        heading: "まず、ここから",
        note: "怪しいと思ったら止まって相談する。すべての手口に効く、いちばんの基本です。",
        courseIds: ["stop-and-ask", "device-basics"],
      },
      {
        heading: "電話とメッセージの詐欺",
        note: "警察・役所・銀行・サポートを名乗る電話や、宅配や料金の未払いを装うSMSです。",
        courseIds: ["fake-police", "phone-scams", "smishing", "fake-billing", "ai-voice-impersonation"],
      },
      {
        heading: "お金をだまし取る誘い",
        note: "SNSで始まる投資やロマンスの誘い、楽にもうかる副業です。",
        courseIds: ["online-scams", "investment-romance-scams", "fake-side-jobs"],
      },
      {
        heading: "家族で決めておくこと",
        note: "合言葉や、かけ直しのルール、子どものネットの使い方、アカウントとパスワードの守り方です。",
        courseIds: ["protect-parents", "kids-games", "passwords"],
      },
    ],
    checklistGroupIds: ["family", "smartphone"],
    shareHeading: "家族に送る",
    shareMessage:
      "警察や銀行を名乗る電話や、偽のSMSの詐欺の手口を、短い動画で一緒に確かめてみて。お金や暗証番号、パスワードや確認コードの話が出たら、一人で決めずに家族に相談してね。",
  },
  {
    id: "smb",
    title: "中小企業で使う：無料の社員研修とセキュリティ管理",
    navLabel: "中小企業で使う",
    tagline: "社員研修と、管理する人のためのコース",
    description:
      "社員全員で見る研修と、経営者・管理担当・IT担当向けのコースを、使う順にまとめました。登録なしで、動画と確認テストをそのまま研修に使えます。",
    intro: [
      "セキュリティの事故は、メールの開封や送金の依頼、パスワードの使い回しなど、毎日の仕事から始まることが多いです。まず社員全員で基本をそろえ、そのうえで、管理する人が守りの仕組みを整えます。",
      "どのコースも、動画を見てから、短い確認テストに答えます。登録はいりません。受講の記録は、受講した人のブラウザに保存され、このサイトから会社に送られることはありません。ブラウザのデータを消すと、記録も消えます。研修として使う場合は、合格の画面を見せてもらうなど、確かめ方を決めておいてください。",
    ],
    steps: [
      {
        heading: "社員全員で見る",
        note: "だましの手口と、困ったときに止まって相談し、すぐに報告することです。新しく入った人にも、最初に見てもらいましょう。",
        courseIds: [
          "stop-and-ask",
          "passwords",
          "phishing",
          "boss-impersonation",
          "email-before-send",
          "personal-info",
          "incident-first-response",
        ],
      },
      {
        heading: "経営者・管理担当が見る",
        note: "更新、アカウント、バックアップ、委託先の管理と、事故が起きたときの報告です。",
        courseIds: ["patching", "account-lifecycle", "backup-recovery", "suppliers", "incident-reporting"],
      },
      {
        heading: "IT担当（兼務を含む）が見る",
        note: "機器とアカウントの台帳、外から見える入口、ランサムウェアの兆しです。",
        courseIds: ["it-inventory", "it-environment", "exposed-entry-points", "ransomware-before-encryption"],
      },
    ],
    checklistGroupIds: ["work", "dev-it"],
    shareHeading: "社内に送る",
    shareMessage:
      "無料のセキュリティ研修です。登録なしで、動画と確認テストで進められます。まずは「社員全員で見る」のコースを、順に受講してください。",
  },
];

export const findAudiencePage = (id: string): AudiencePage | undefined => audiencePages.find((page) => page.id === id);
