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
  questionPool: [
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
        "ドメインは右から読みます。「sample-bank.example.login-check.example」の持ち主は login-check.example、「sample-bank-login.example」は別のドメイン、「sarnple-bank.example」は「m」を「rn」にしたそっくりドメインです。",
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
    {
      id: "q6",
      prompt: "次のメールが届きました。差出人について正しい説明はどれですか？",
      sample: {
        kind: "email",
        email: {
          fromName: "サンプル銀行",
          fromAddress: "security@sample-bank-alert.example",
          subject: "【重要】不正ログインを検知しました",
          body: [
            "お客様のアカウントに、普段と異なる環境からのログインがありました。",
            "下記より本人確認をお願いします。",
          ],
          linkLabel: "本人確認を行う",
          linkUrl: "https://sample-bank-alert.example/verify",
        },
      },
      choices: [
        { id: "a", label: "表示名が「サンプル銀行」なので本物だ" },
        { id: "b", label: "アドレスのドメインが sample-bank.example ではなく、別の持ち主のものだ" },
        { id: "c", label: "件名に【重要】とあるので、すぐに対応すべきだ" },
        { id: "d", label: "銀行の名前が入ったドメインなので、銀行の関連会社だ" },
      ],
      correctChoiceId: "b",
      explanation:
        "表示名は誰でも自由に付けられます。アドレスのドメインを右から読むと、持ち主は sample-bank-alert.example で、銀行のものではありません。",
    },
    {
      id: "q7",
      prompt:
        "メール本文に「https://www.sample-bank.example/」と書かれたリンクがあります。リンクの扱いとして適切なのはどれですか？",
      choices: [
        { id: "a", label: "表示されている文字が公式のURLなので、そのままクリックしてよい" },
        { id: "b", label: "表示の文字と実際の行き先は別にできるので、リンクは使わず公式アプリやブックマークから開く" },
        { id: "c", label: "クリックして、開いたページの見た目が本物そっくりなら安全だ" },
        { id: "d", label: "リンクが青い文字で表示されていれば安全だ" },
      ],
      correctChoiceId: "b",
      explanation:
        "リンクは、見えている文字と実際の行き先を別々に設定できます。見た目そっくりの偽サイトも簡単に作れるので、公式の入口から自分で開きましょう。",
    },
    {
      id: "q8",
      prompt:
        "「多要素認証の再設定が必要です。添付のQRコードをスマホで読み取ってください」というメールが届きました。どうしますか？",
      choices: [
        { id: "a", label: "スマホで読み取れば会社のパソコンには影響がないので、読み取る" },
        { id: "b", label: "QRコードは読み取らず、担当者に報告する。再設定が必要かは公式の入口から確認する" },
        { id: "c", label: "QRコードの画像が鮮明なので本物と判断する" },
        { id: "d", label: "同僚にも読み取ってもらい、結果を比べる" },
      ],
      correctChoiceId: "b",
      explanation:
        "QRコードは行き先のURLが見えないため、メールのフィルターや目視の確認をすり抜けやすい手口です。読み取る前に立ち止まりましょう。",
    },
    {
      id: "q9",
      prompt:
        "銀行のサイトを開こうと検索したところ、検索結果の一番上に「広告」と表示されたリンクがありました。どうするのが安全ですか？",
      choices: [
        { id: "a", label: "一番上に出ているので、公式サイトとしてクリックする" },
        { id: "b", label: "広告枠に偽サイトが出ることもあるので、ブックマークや公式アプリから開く" },
        { id: "c", label: "広告はお金を払って出しているので、本物に違いない" },
        { id: "d", label: "広告のリンクを開き、URLの中に銀行名が入っていれば安全だ" },
      ],
      correctChoiceId: "b",
      explanation:
        "攻撃者が検索広告を出して偽サイトへ誘導する例があります。よく使うサイトはブックマークや公式アプリから開く習慣をつけましょう。",
    },
    {
      id: "q10",
      prompt:
        "取引先の担当者の名前で、先週の打ち合わせの内容に触れたメールが届き、「今月から振込先の口座が変わりました」とあります。正しい対応はどれですか？",
      choices: [
        { id: "a", label: "打ち合わせの内容を知っているので、本物と判断して口座を変更する" },
        { id: "b", label: "メールに返信して、口座変更の理由を確認する" },
        { id: "c", label: "以前から知っている電話番号などで取引先に直接確認し、社内の担当者にも報告する" },
        { id: "d", label: "差出人の名前が担当者と同じなので問題ない" },
      ],
      correctChoiceId: "c",
      explanation:
        "事前に調べた本物らしい情報を使う「標的型」の手口では、内容が具体的でも本物とは限りません。お金や口座の変更は、必ず別の経路で確かめましょう。",
    },
    {
      id: "q11",
      prompt: "フィッシングサイトの見分け方の説明として、誤っているものはどれですか？",
      choices: [
        { id: "a", label: "アドレス欄に鍵マーク（https）があれば、本物のサイトだと判断できる" },
        { id: "b", label: "ドメインを右から読み、本当の持ち主を確かめる" },
        { id: "c", label: "「今すぐ」「本日中」と急がせる文面は疑う" },
        { id: "d", label: "メールのリンクではなく、公式の入口から開く" },
      ],
      correctChoiceId: "a",
      explanation:
        "鍵マークは通信が暗号化されていることを示すだけで、相手が本物かどうかは示しません。偽サイトでも鍵マークは簡単に付けられます。",
    },
    {
      id: "q12",
      prompt: "パスワードマネージャーがフィッシング対策にも役立つ理由として、正しいものはどれですか？",
      choices: [
        { id: "a", label: "登録したドメインでしか自動入力されないので、そっくりな偽サイトでは入力されず気づける" },
        { id: "b", label: "怪しいメールを自動で削除してくれる" },
        { id: "c", label: "パスワードが長くなるので、盗まれても悪用されない" },
        { id: "d", label: "パソコンのウイルスを駆除してくれる" },
      ],
      correctChoiceId: "a",
      explanation:
        "人間はそっくりなドメインを見落としますが、パスワードマネージャーはドメインが違えば自動入力しません。「いつもの自動入力が出ない」は危険のサインです。",
    },
    {
      id: "q13",
      prompt: "怪しいメールを受け取りましたが、リンクは開いていません。どうするのがよいですか？",
      choices: [
        { id: "a", label: "自分は無事なので、削除して終わりにする" },
        { id: "b", label: "送信元に「詐欺ですね」と返信する" },
        { id: "c", label: "組織で決められた窓口に報告する" },
        { id: "d", label: "注意喚起のため、全員にそのメールを転送する" },
      ],
      correctChoiceId: "c",
      explanation:
        "同じメールが他の人にも届いているかもしれません。報告があれば組織全体で対処できます。返信や転送は、かえって被害を広げるおそれがあります。",
    },
    {
      id: "q14",
      prompt:
        "サポート担当を名乗る人から電話があり、「本人確認のため、今届いた6桁の確認コードを読み上げてください」と言われました。どうしますか？",
      choices: [
        { id: "a", label: "サポート担当なので、コードを伝える" },
        { id: "b", label: "コードは誰にも伝えず、電話を切って公式の窓口に自分から連絡する" },
        { id: "c", label: "コードの半分だけ伝える" },
        { id: "d", label: "メールでならコードを送ってよい" },
      ],
      correctChoiceId: "b",
      explanation:
        "確認コードは、あなたがログインしようとしている証拠です。誰かに伝えると、その人があなたとしてログインできてしまいます。本物のサポートはコードを聞きません。",
    },
    {
      id: "q15",
      prompt: "次のメールについて、怪しい点の組み合わせとして最も適切なものはどれですか？",
      sample: {
        kind: "email",
        email: {
          fromName: "システム管理者",
          fromAddress: "admin@mailbox-quota.example",
          subject: "メールボックスの容量が上限に達しました",
          body: [
            "容量が上限に達したため、24時間後から新しいメールを受信できなくなります。",
            "以下から容量の追加を申請してください。",
          ],
          linkLabel: "容量を追加する",
          linkUrl: "https://mailbox-quota.example/login",
        },
      },
      choices: [
        { id: "a", label: "差出人のドメインが自社のものでない・期限を切って急がせる・リンク先でログインさせる" },
        { id: "b", label: "件名が日本語・本文が短い・リンクが青い" },
        { id: "c", label: "平日に届いた・敬語で書かれている・署名がない" },
        { id: "d", label: "怪しい点は特にない" },
      ],
      correctChoiceId: "a",
      explanation:
        "社内の管理者を名乗っていても、ドメインは社外のものです。期限を切って急がせ、ログインさせようとするのは、パスワードを盗む典型的な手口です。",
    },
  ],
};
