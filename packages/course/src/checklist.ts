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
        courseIds: ["phishing", "realtime-phishing", "financial-support-takeover"],
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
        courseIds: ["browser-data-theft", "install-sources"],
      },
      {
        id: "browser-warning-phone",
        text: "「ウイルス感染」の警告画面に出た電話番号にかけない",
        courseIds: ["phone-scams", "stop-and-ask"],
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
        courseIds: ["backup-recovery", "device-basics"],
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
        courseIds: ["device-basics"],
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
    ],
  },
  {
    id: "account",
    title: "アカウント",
    items: [
      {
        id: "account-unique-passwords",
        text: "パスワードはサービスごとに別の長いものにし、パスワードマネージャーに作らせる",
        courseIds: ["passwords", "master-account"],
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
        courseIds: ["browser-data-theft", "after-data-leak"],
      },
      {
        id: "account-mail-forwarding",
        text: "メールに、覚えのない転送や振り分けの設定がないか確かめる",
        courseIds: ["email-takeover-abuse", "master-account"],
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
        courseIds: ["ai-voice-impersonation", "chat-impersonation"],
      },
      {
        id: "family-call-back",
        text: "家族からのお金の頼みは、前から登録してある番号にかけ直して確かめる",
        courseIds: ["ai-voice-impersonation", "chat-impersonation"],
      },
      {
        id: "family-fake-police",
        text: "「警察がSNSやビデオ通話で連絡してきたら詐欺」と家族で話しておく",
        courseIds: ["fake-police"],
      },
      {
        id: "family-kids-account",
        text: "子どもには子ども用のアカウントを作り、見守り機能で購入を制限する",
        courseIds: ["kids-games", "master-account"],
      },
      {
        id: "family-kids-promise",
        text: "困ったことを話してくれたら叱らない、と子どもと約束する",
        courseIds: ["kids-games"],
      },
      {
        id: "family-no-shared-master-password",
        text: "親アカウントのパスワードは、家族とも共有しない",
        courseIds: ["master-account", "device-basics"],
      },
      {
        id: "family-router-admin-password",
        text: "ルーターの管理用パスワードが初期のままなら、変える",
        courseIds: ["home-network"],
      },
      {
        id: "family-wifi-encryption",
        text: "家のWi-Fiの方式を、WPA3かWPA2（AES）にする",
        courseIds: ["home-network"],
      },
      {
        id: "family-home-device-updates",
        text: "ルーターやカメラのソフトを最新にし、サポート期限を確かめる",
        courseIds: ["home-network"],
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
    ],
  },
  {
    id: "work",
    title: "会社の場合",
    items: [
      {
        id: "work-report-quickly",
        text: "怪しいメールを開いた・入力してしまったら、すぐ社内の窓口に報告する",
        courseIds: ["phishing", "incident-first-response"],
      },
      {
        id: "work-verify-payment-change",
        text: "振込先の変更は、メールとは別に前から知っている番号で確かめ、一人で決めない",
        courseIds: ["email-takeover-abuse", "ai-voice-impersonation"],
      },
      {
        id: "work-ai-input",
        text: "会社が許可したAIだけを使い、顧客情報や社外秘を入れない",
        courseIds: ["ai-data-and-tools"],
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
    ],
  },
];
