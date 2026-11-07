export type ChecklistItem = {
  id: string;
  text: string;
  courseIds: readonly string[];
};

export type ChecklistGroup = {
  id: string;
  title: string;
  items: readonly ChecklistItem[];
};

export const checklistGroups: readonly ChecklistGroup[] = [
  {
    id: "browser",
    title: "ブラウザ",
    items: [
      {
        id: "browser-bookmark-login",
        text: "よく使うサイトには、ブックマークか公式アプリから入る",
        courseIds: [
          "phishing",
          "realtime-phishing",
          "financial-support-takeover",
          "shopping-site-scams",
          "p2p-trade-scams",
        ],
      },
      {
        id: "browser-no-search-ads",
        text: "検索結果の広告から、ログインやソフトのダウンロードをしない",
        courseIds: ["realtime-phishing", "install-sources"],
      },
      {
        id: "browser-autofill-missing",
        text: "いつもは出るパスワードの自動入力が出ないときは、入力せずにブックマークか公式アプリから開き直す",
        courseIds: ["phishing", "realtime-phishing"],
      },
      {
        id: "browser-extensions",
        text: "拡張機能は必要なものだけにし、使わないものは外す",
        courseIds: ["browser-extensions", "browser-data-theft", "install-sources"],
      },
      {
        id: "browser-warning-phone",
        text: "「ウイルス感染」の警告画面に出た電話番号にかけない",
        courseIds: ["phone-scams", "stop-and-ask", "protect-parents"],
      },
      {
        id: "browser-no-paste-commands",
        text: "画面の指示で、コマンドを貼り付けて実行しない",
        courseIds: ["paste-commands", "browser-data-theft"],
      },
      {
        id: "browser-shop-check",
        text: "安すぎる通販サイトは、メーカーの公式サイトで売っているか確かめてから買う",
        courseIds: ["shopping-site-scams"],
      },
      {
        id: "browser-extension-profile",
        text: "お金と仕事のサイトは、拡張機能を入れない別のプロファイルで開く",
        courseIds: ["browser-extensions"],
      },
      {
        id: "browser-leak-notice-official",
        text: "漏えいのおわびや補償の連絡は、リンクを開かず、公式サイトのお知らせで確かめる",
        courseIds: ["after-data-leak", "incident-reporting", "supply-chain-breach"],
      },
    ],
  },
  {
    id: "computer",
    title: "パソコン",
    items: [
      {
        id: "computer-updates",
        text: "OS・ブラウザ・アプリの更新を後回しにせず、できるものは自動更新をオンにする",
        courseIds: ["patching", "device-basics"],
      },
      {
        id: "computer-official-source",
        text: "ソフトは公式の入手先から入れ、海賊版は使わない",
        courseIds: ["browser-data-theft", "install-sources"],
      },
      {
        id: "computer-no-remote-control",
        text: "電話で頼まれても、遠隔操作ソフトを入れない",
        courseIds: ["phone-scams", "financial-support-takeover"],
      },
      {
        id: "computer-disconnect-when-infected",
        text: "おかしなソフトを入れてしまったら、ネットから切り離し、自分で初期化せずに相談する",
        courseIds: ["stop-and-ask", "browser-data-theft"],
      },
      {
        id: "computer-screen-lock",
        text: "席を離れるときは、画面をロックする",
        courseIds: ["device-basics", "outside-work"],
      },
      {
        id: "computer-backup",
        text: "大事なファイルを外付けの機器にもバックアップし、取るときだけつなぐ",
        courseIds: ["backup-recovery", "device-basics", "ransomware-before-encryption"],
      },
      {
        id: "computer-backup-restore",
        text: "ときどき、バックアップしたファイルが本当に開けるか確かめる",
        courseIds: ["backup-recovery", "device-basics"],
      },
      {
        id: "computer-end-of-support",
        text: "サポートが終わった機器は、使い続けずに買い替えを考える",
        courseIds: ["device-basics", "patching"],
      },
    ],
  },
  {
    id: "smartphone",
    title: "スマホ",
    items: [
      {
        id: "smartphone-no-root",
        text: "スマホのルート化・脱獄をしない",
        courseIds: ["mobile-apps-payments"],
      },
      {
        id: "smartphone-official-store",
        text: "アプリは公式のアプリストアを基本にして提供元と許可を確かめ、メッセージのリンクからは入れない",
        courseIds: ["device-basics", "mobile-apps-payments", "smishing"],
      },
      {
        id: "smartphone-permissions",
        text: "ユーザー補助やSMSの読み取りなどの強い許可は、アプリの役目に必要か確かめ、不要なら許可しない",
        courseIds: ["mobile-apps-payments"],
      },
      {
        id: "smartphone-remove-unused-apps",
        text: "使わないアプリは消し、定期購入はストアの画面で解約を確かめる",
        courseIds: ["device-basics", "mobile-apps-payments"],
      },
      {
        id: "smartphone-screen-lock",
        text: "推測されにくい暗証番号で、画面ロックをかける",
        courseIds: ["device-basics", "tracking-stalkerware"],
      },
      {
        id: "smartphone-find-device",
        text: "「端末を探す」機能を、前もってオンにする",
        courseIds: ["device-basics", "mobile-apps-payments"],
      },
      {
        id: "smartphone-sms-links",
        text: "SMSのリンクは開かず、公式アプリやブックマークで確かめる",
        courseIds: ["smishing"],
      },
      {
        id: "smartphone-qr-login",
        text: "届いた案内や貼り紙のQRコードから、ログインしない",
        courseIds: ["realtime-phishing"],
      },
      {
        id: "smartphone-shop-qr",
        text: "お店のQRコードは貼り替えの跡を確かめ、店名と金額を見てから払う",
        courseIds: ["device-basics"],
      },
      {
        id: "smartphone-payment-notifications",
        text: "決済アプリの利用通知をオンにし、履歴をときどき見る",
        courseIds: ["device-basics", "mobile-apps-payments"],
      },
      {
        id: "smartphone-payment-limits",
        text: "キャリア決済やチャージの上限額を、設定できるなら必要な分まで下げる",
        courseIds: ["mobile-apps-payments"],
      },
      {
        id: "smartphone-location-sharing",
        text: "位置情報を共有している相手を見直す。心当たりのない相手がいたら、止める前に身の安全を考えて相談する",
        courseIds: ["tracking-stalkerware"],
      },
      {
        id: "smartphone-unknown-tag",
        text: "知らないタグの通知が来たら、まず安全な場所へ移り、タグは壊さず捨てずに警察へ相談する",
        courseIds: ["tracking-stalkerware"],
      },
      {
        id: "smartphone-p2p-in-app",
        text: "フリマなどの取引は、直接の振込やアプリの外のチャットに移らず、アプリの中で終える",
        courseIds: ["p2p-trade-scams"],
      },
    ],
  },
  {
    id: "account",
    title: "アカウント",
    items: [
      {
        id: "account-unique-passwords",
        text: "パスワードはサービスごとに別の長いものにし、パスワードマネージャーに作らせる",
        courseIds: ["passwords", "master-account", "after-data-leak", "shopping-site-scams", "p2p-trade-scams"],
      },
      {
        id: "account-no-personal-hints",
        text: "誕生日や出身校を、パスワードや秘密の質問の答えに使わない",
        courseIds: ["passwords", "sns-posting"],
      },
      {
        id: "account-mfa",
        text: "メール・お金・仕事のアカウントから、二要素認証を設定する",
        courseIds: ["mfa-methods", "passwords"],
      },
      {
        id: "account-passkey",
        text: "パスキーを使えるサービスでは、パスキーを選ぶ",
        courseIds: ["mfa-methods", "passwords"],
      },
      {
        id: "account-never-share-codes",
        text: "確認コードは、誰に頼まれても教えない",
        courseIds: ["passwords", "mfa-methods", "device-basics"],
      },
      {
        id: "account-deny-unknown-approval",
        text: "身に覚えのない承認の通知は拒否し、公式アプリやブックマークからパスワードを変える",
        courseIds: ["mfa-methods"],
      },
      {
        id: "account-recovery-contacts",
        text: "親アカウントの回復用のメールと電話番号が、今も自分だけのものか確かめる",
        courseIds: ["master-account"],
      },
      {
        id: "account-recovery-codes",
        text: "回復用のコードを作り、端末とは別の安全な場所に保管する",
        courseIds: ["master-account", "mfa-methods"],
      },
      {
        id: "account-login-notifications",
        text: "ログインの通知をオンにする",
        courseIds: ["master-account", "financial-support-takeover"],
      },
      {
        id: "account-review-devices",
        text: "ログイン中の端末の一覧に、知らない端末がないか確かめる",
        courseIds: [
          "browser-data-theft",
          "after-data-leak",
          "tracking-stalkerware",
          "fake-job-offers",
          "p2p-trade-scams",
        ],
      },
      {
        id: "account-mail-forwarding",
        text: "メールに、覚えのない転送や振り分けの設定がないか確かめる",
        courseIds: ["email-takeover-abuse", "master-account"],
      },
      {
        id: "account-connected-apps",
        text: "アカウントの「連携アプリ」を見直し、使っていない連携は解除する",
        courseIds: ["ai-agents-at-work", "browser-extensions"],
      },
      {
        id: "account-legacy-contact",
        text: "亡くなったときにアクセスできる人を指名できるアカウントでは設定し、その人に伝えておく",
        courseIds: ["digital-legacy"],
      },
    ],
  },
  {
    id: "family",
    title: "家族",
    items: [
      {
        id: "family-codeword",
        text: "SNSなどから推測できない家族の合言葉を、会って口頭で決め、書き残さない",
        courseIds: ["ai-voice-impersonation", "chat-impersonation", "protect-parents"],
      },
      {
        id: "family-call-back",
        text: "家族からのお金の頼みは、前から登録してある番号にかけ直して確かめる",
        courseIds: ["ai-voice-impersonation", "chat-impersonation", "protect-parents"],
      },
      {
        id: "family-fake-police",
        text: "「警察がSNSやビデオ通話で連絡してきたら詐欺」と家族で話しておく",
        courseIds: ["fake-police", "sextortion"],
      },
      {
        id: "family-kids-account",
        text: "子どもには子ども用のアカウントを作り、見守り機能で購入を制限する",
        courseIds: ["kids-games", "master-account"],
      },
      {
        id: "family-kids-promise",
        text: "困ったことを話してくれたら叱らない、と子どもと約束する",
        courseIds: ["kids-games", "sextortion"],
      },
      {
        id: "family-no-shared-master-password",
        text: "親アカウントのパスワードは、家族とも共有しない",
        courseIds: ["master-account", "device-basics"],
      },
      {
        id: "family-router-admin-password",
        text: "ルーターの管理用パスワードが初期のままなら、変える",
        courseIds: ["home-network", "exposed-entry-points", "ddos-continuity", "ransomware-before-encryption"],
      },
      {
        id: "family-wifi-encryption",
        text: "家のWi-Fiの方式を、WPA3かWPA2（AES）にする",
        courseIds: ["home-network"],
      },
      {
        id: "family-home-device-updates",
        text: "ルーターやカメラのソフトを最新にし、サポート期限を確かめる",
        courseIds: ["home-network", "exposed-entry-points", "ddos-continuity"],
      },
      {
        id: "family-photo-check",
        text: "写真を投稿する前に、顔・学校・家が分かるものや、写真の位置情報がないか確かめる",
        courseIds: ["sns-posting"],
      },
      {
        id: "family-post-after-trip",
        text: "旅行中の写真は、帰ってから投稿する",
        courseIds: ["sns-posting"],
      },
      {
        id: "family-sextortion",
        text: "性的な画像で脅されたら、安全を確保し、払わず追加で送らず、できる範囲で証拠を残して相談する（脅された人は悪くない）",
        courseIds: ["sextortion"],
      },
      {
        id: "family-parents-phone",
        text: "離れて暮らす親の電話は在宅中も留守番電話にし、カードの引き出し限度額も一緒に確かめる",
        courseIds: ["protect-parents"],
      },
      {
        id: "family-emoney-card",
        text: "「電子マネーのカードを買って番号を教えて」は詐欺、と家族で話しておく",
        courseIds: ["fake-billing"],
      },
      {
        id: "family-job-offer",
        text: "求人の連絡で、身分証やカードの写真、お金を求められたら応じず、会社の公式サイトで調べた番号で確かめる",
        courseIds: ["fake-job-offers"],
      },
      {
        id: "family-contract-list",
        text: "ネット銀行やサブスクなど契約の一覧を作り、置き場所を決めた家族に伝える（パスワードはそのまま書かない）",
        courseIds: ["digital-legacy"],
      },
    ],
  },
  {
    id: "work",
    title: "会社の場合",
    items: [
      {
        id: "work-report-quickly",
        text: "怪しいメールを開いた・入力してしまった、または情報が漏れたおそれを知ったら、すぐ社内の窓口に報告する",
        courseIds: [
          "phishing",
          "incident-first-response",
          "incident-reporting",
          "supply-chain-breach",
          "ransomware-before-encryption",
          "browser-extensions",
          "ai-agents-at-work",
        ],
      },
      {
        id: "work-verify-payment-change",
        text: "振込先の変更は、メールとは別に前から知っている番号で確かめ、一人で決めない",
        courseIds: ["email-takeover-abuse", "ai-voice-impersonation"],
      },
      {
        id: "work-ai-input",
        text: "会社が許可したAIだけを使い、顧客情報や社外秘を入れない",
        courseIds: ["ai-data-and-tools", "secrets-in-code"],
      },
      {
        id: "work-share-by-address",
        text: "社外への共有は相手のアドレスを指定し、終わったら権限を外す",
        courseIds: ["file-sharing"],
      },
      {
        id: "work-no-personal-cloud",
        text: "業務データを、個人のクラウドやメールに送らない",
        courseIds: ["file-sharing"],
      },
      {
        id: "work-unknown-usb",
        text: "拾った・配られたUSBメモリは挿さず、担当者に渡す",
        courseIds: ["outside-work"],
      },
      {
        id: "work-ai-agent-approval",
        text: "AIエージェントの権限は仕事に要る範囲だけにし、送信や共有は人が確かめてから承認し、支払いや削除は任せない",
        courseIds: ["ai-agents-at-work"],
      },
      {
        id: "work-supplier-ledger",
        text: "委託先ごとに、預けているデータ・接続の方法・事故のときの連絡先を台帳にまとめる",
        courseIds: ["supply-chain-breach", "incident-reporting"],
      },
    ],
  },
  {
    id: "dev-it",
    title: "開発・IT 担当",
    items: [
      {
        id: "dev-secrets-not-in-code",
        text: "APIキーやパスワードをコードに書かず、漏れたら消すより先に無効にして作り直す",
        courseIds: ["secrets-in-code"],
      },
      {
        id: "dev-entry-points",
        text: "外から見える入口（VPN・管理画面・保守用の接続口）を一覧にし、使わないものは影響を確かめて止め、残す入口のログインには多要素認証を付ける",
        courseIds: ["exposed-entry-points", "ransomware-before-encryption", "supply-chain-breach"],
      },
      {
        id: "dev-offline-runbook",
        text: "夜間・休日も含めた連絡網と対応手順を、止まるかもしれないシステムの外（紙など）にも置く",
        courseIds: ["ddos-continuity"],
      },
    ],
  },
];
