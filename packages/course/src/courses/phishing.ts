import type { Course } from "../types.ts";

export const phishingCourse: Course = {
  id: "phishing",
  title: "メールのフィッシング",
  summary: "本物のふりをしたメールを見抜き、パスワードやお金をだまし取られないための基本を学びます。",
  scenes: [
    {
      id: "intro",
      kind: "title",
      title: "メールのフィッシング",
      subtitle: "本物のふりをしたメールを見抜く",
      narration:
        "このレッスンでは、メールを使ったフィッシング詐欺の手口と、見抜き方を学びます。フィッシングとは、銀行や会社、上司など、本物のふりをして、パスワードやお金をだまし取る攻撃です。",
    },
    {
      id: "why",
      kind: "points",
      heading: "なぜフィッシングが危ないのか",
      points: [
        "攻撃の入口として、もっとも件数が多い",
        "狙われるのはシステムではなく「人の判断」",
        "メールを乗っ取られると、他のサービスも芋づる式に",
      ],
      narration:
        "フィッシングは、サイバー攻撃の入口として、もっとも多い手口の一つです。狙われるのは、システムではなく、人の判断です。特にメールアカウントは、パスワード再設定の受け口になっているため、乗っ取られると、他のサービスまで芋づる式に被害が広がります。",
    },
    {
      id: "example",
      kind: "email",
      email: {
        fromName: "サンプル銀行",
        fromAddress: "support@sample-bank.account-verify.example",
        subject: "【重要】お客様のアカウントを一時停止しました",
        body: [
          "お客様のアカウントで不審なログインを検知したため、ご利用を一時停止しました。",
          "24時間以内に本人確認を完了しない場合、アカウントは永久に凍結されます。",
        ],
        linkLabel: "今すぐ本人確認する",
        linkUrl: "https://sample-bank.account-verify.example/login",
      },
      redFlags: [
        { target: "from", label: "差出人のドメインが公式と違う" },
        { target: "body", label: "「24時間以内」「永久に凍結」と急がせ、怖がらせる" },
        { target: "link", label: "メールのリンクからログインさせようとする" },
      ],
      narration:
        "では、実際の例を見てみましょう。アカウントを一時停止した、という件名のメールです。まず、差出人のアドレスをよく見てください。銀行の名前は入っていますが、公式のドメインとは違います。次に、二十四時間以内、永久に凍結、と、急がせて、怖がらせています。そして、メールのリンクからログインさせようとしています。この三つがそろったら、典型的なフィッシングです。",
    },
    {
      id: "domain",
      kind: "url",
      heading: "ドメインは「右から」読む",
      urls: [
        {
          parts: [
            { text: "https://www.", isRegisteredDomain: false },
            { text: "sample-bank.example", isRegisteredDomain: true },
            { text: "/login", isRegisteredDomain: false },
          ],
          verdict: "safe",
          note: "公式のドメイン",
        },
        {
          parts: [
            { text: "https://sample-bank.", isRegisteredDomain: false },
            { text: "account-verify.example", isRegisteredDomain: true },
            { text: "/login", isRegisteredDomain: false },
          ],
          verdict: "fake",
          note: "本当の持ち主は account-verify.example",
        },
        {
          parts: [
            { text: "https://www.", isRegisteredDomain: false },
            { text: "sarnple-bank.example", isRegisteredDomain: true },
            { text: "/login", isRegisteredDomain: false },
          ],
          verdict: "fake",
          note: "「m」が「r」と「n」に置き換わっている",
        },
      ],
      narration:
        "リンク先が本物かどうかは、ドメインで見分けます。ポイントは、ドメインを右から読むことです。一つ目は、公式のドメインです。二つ目は、先頭に銀行の名前がありますが、本当の持ち主は、右側の部分です。三つ目は、エムの文字が、アールとエヌに置き換わった、そっくりなドメインです。別の言語の、そっくりな文字が使われることもあります。",
    },
    {
      id: "variants",
      kind: "points",
      heading: "メールの手口はほかにも",
      points: [
        "ビジネスメール詐欺：社長や取引先になりすまし「振込先が変わった」",
        "標的型攻撃メール：請求書や議事録を装った添付ファイル",
        "検索結果の広告やQRコードから偽サイトへ",
      ],
      narration:
        "メールの手口は、ほかにもあります。社長や取引先になりすまして、振込先の変更を求める、ビジネスメール詐欺。請求書や議事録を装って、添付ファイルを開かせる、標的型攻撃メール。また、検索結果の広告や、QRコードから、偽サイトに誘導されることもあります。",
    },
    {
      id: "habits",
      kind: "points",
      heading: "身を守る5つの習慣",
      points: [
        "急かすメールこそ、一拍おく",
        "メールのリンクではなく、公式アプリやブックマークからログイン",
        "送金・振込先の変更は、登録済みの電話番号で確認",
        "メールと重要なアカウントは多要素認証（MFA）を設定",
        "怪しい・踏んでしまったら、すぐに報告",
      ],
      narration:
        "身を守るための習慣は、五つです。急かすメールこそ、一拍おく。メールのリンクではなく、公式アプリやブックマークからログインする。送金や振込先の変更は、登録済みの電話番号で確認する。メールと重要なアカウントには、多要素認証を設定する。そして、怪しいと思ったら、踏んでしまった後でも、すぐに報告する。早く報告するほど、被害は小さくなります。",
    },
    {
      id: "summary",
      kind: "title",
      title: "まとめ",
      subtitle: "差出人のドメイン・急がせる文面・リンクからのログイン",
      narration:
        "まとめです。差出人のドメイン、急がせる文面、リンクからのログイン。この三つに注意して、迷ったら、公式の入口から確かめましょう。このあと、確認テストに進んでください。",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "次のメールが届きました。最も適切な対応はどれですか？",
      sample: {
        kind: "email",
        email: {
          fromName: "サンプルストア",
          fromAddress: "info@samplestore-billing.example",
          subject: "お支払い方法の確認のお願い",
          body: [
            "ご登録のクレジットカードの有効期限が切れています。",
            "本日中に更新いただけない場合、ご注文はキャンセルされます。",
          ],
          linkLabel: "お支払い情報を更新する",
          linkUrl: "https://samplestore-billing.example/update",
        },
      },
      choices: [
        { id: "a", label: "注文がキャンセルされると困るので、リンクから情報を更新する" },
        { id: "b", label: "メールに返信して、本物かどうか問い合わせる" },
        { id: "c", label: "メールのリンクは使わず、公式アプリやブックマークからログインして確認する" },
        { id: "d", label: "念のため、同僚にも転送して見てもらう" },
      ],
      correctChoiceId: "c",
      explanation:
        "「本日中」と急がせ、リンクから入力させる典型的な手口です。返信先は攻撃者の可能性があり、転送は被害を広げます。公式の入口から自分で確認しましょう。",
    },
    {
      id: "q2",
      prompt: "次のうち、本当の持ち主が「sample-bank.example」であるURLはどれですか？",
      choices: [
        { id: "a", label: "https://sample-bank.example.login-check.example/" },
        { id: "b", label: "https://www.sample-bank.example/login" },
        { id: "c", label: "https://sample-bank-login.example/" },
        { id: "d", label: "https://www.sarnple-bank.example/" },
      ],
      correctChoiceId: "b",
      explanation:
        "ドメインは右から読みます。a の持ち主は login-check.example、c は別のドメイン、d は「m」を「rn」にしたそっくりドメインです。",
    },
    {
      id: "q3",
      prompt:
        "社長から「至急、いつもと違う口座に振り込んでほしい。詳しくは後で説明する」というメールが届きました。正しい対応はどれですか？",
      choices: [
        { id: "a", label: "社長の指示なので、すぐに振り込む" },
        { id: "b", label: "そのメールに返信して、本当か確認する" },
        { id: "c", label: "登録済みの電話番号など、メール以外の経路で本人に確認する" },
        { id: "d", label: "見なかったことにして何もしない" },
      ],
      correctChoiceId: "c",
      explanation:
        "ビジネスメール詐欺の典型です。メールへの返信は攻撃者に届くかもしれません。必ず別の経路で確認し、怪しければ報告しましょう。",
    },
    {
      id: "q4",
      prompt: "メールのリンクを開き、パスワードを入力してしまいました。まず何をすべきですか？",
      choices: [
        { id: "a", label: "恥ずかしいので、しばらく様子を見る" },
        { id: "b", label: "すぐに担当者へ報告し、公式サイトからパスワードを変更する" },
        { id: "c", label: "メールを削除して忘れる" },
        { id: "d", label: "何も起きていないので、そのまま使い続ける" },
      ],
      correctChoiceId: "b",
      explanation: "早く報告するほど被害は小さくなります。踏んでしまったことを責める必要はありません。",
    },
    {
      id: "q5",
      prompt: "フィッシング対策として、メールアカウントで特に設定すべきものはどれですか？",
      choices: [
        { id: "a", label: "すべてのメールの自動転送" },
        { id: "b", label: "多要素認証（MFA）" },
        { id: "c", label: "迷惑メールへの自動返信" },
        { id: "d", label: "覚えやすい短いパスワード" },
      ],
      correctChoiceId: "b",
      explanation:
        "パスワードが盗まれても、多要素認証があればログインを防ぎやすくなります。メールは他のサービスの合鍵になるので特に重要です。",
    },
  ],
};
