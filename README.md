# セキュリティ教育サイト（プロトタイプ）

短い教育動画を見たあと、確認テストを受けるサイト。題材は Singularity Society
「[セキュリティ脅威マップ](https://singularitysociety.github.io/societys_statement/development/security/README.html)」を元にしている。
今後追加するコースの一覧は issue #6。

公開先: https://singularitysociety.github.io/security-education/

| コース                                                   | 動画      |
| -------------------------------------------------------- | --------- |
| パスワードとアカウントの基本                             | 約3分30秒 |
| メールのフィッシング                                     | 約4分     |
| SMSのスミッシング                                        | 約2分30秒 |
| 電話と画面でだます手口                                   | 約8分     |
| 上司や同僚を名乗る指示                                   | 約6分     |
| 採用を使った攻撃                                         | 約7分     |
| ネット詐欺（チャットアプリに誘導する投資・ロマンス詐欺） | 約6分30秒 |
| 社外で働くときの基本                                     | 約6分     |
| コマンドを貼る前に                                       | 約5分30秒 |
| ツールはどこから入れるか                                 | 約5分30秒 |
| AIは読んだものに操られる                                 | 約6分30秒 |
| AIに入れる情報と、使うツール                             | 約6分     |
| 更新を止めない                                           | 約5分     |
| 捨てる・売る・返すときのデータ消去                       | 約5分30秒 |
| 入社から退職までのアカウント管理                         | 約6分     |
| SNSでの発信と誹謗中傷・デマ                              | 約8分30秒 |
| 標的型攻撃と機密情報の守り方                             | 約8分     |
| 問い合わせ相手を確認する                                 | 約8分30秒 |
| 困ったときは、止まって相談                               | 約6分     |
| スマホとパソコンを安全に使う基本                         | 約8分     |
| メールを送る前の確認                                     | 約7分     |
| 個人情報を見せない・渡さない                             | 約6分30秒 |
| ファイル共有とクラウドの確認                             | 約6分30秒 |
| 子どものゲームとネットを一緒に守る                       | 約7分     |
| ファイル交換と無料ツールの危険                           | 約7分     |
| 家のWi-Fiとスマート家電を守る                            | 約7分     |
| インシデント発生時の初動                                 | 約7分     |
| バックアップと復旧                                       | 約6分30秒 |
| 委託先・取引先とつながるときの基本                       | 約7分30秒 |
| 内部不正と情報の持ち出し                                 | 約7分     |
| IT資産とアカウントの台帳                                 | 約7分     |
| 端末・ネットワーク・SaaSの管理                           | 約7分     |
| ログと監視の基本                                         | 約6分30秒 |
| クラウドの基本設定                                       | 約9分     |
| Webアプリケーションのセキュリティ                        | 約7分30秒 |
| APIのセキュリティ                                        | 約8分     |
| 安全な設計                                               | 約9分     |
| 侵入に気づく仕組み                                       | 約10分    |
| ログとフォレンジック調査                                 | 約8分     |
| ニセ警察・ニセ行政機関の電話とビデオ通話                 | 約9分     |
| ブラウザの情報が丸ごと盗まれたら                         | 約9分30秒 |
| 二要素認証の種類と選び方                                 | 約9分     |
| セッションとトークンの持ち方                             | 約9分     |
| すべての鍵を握る「親アカウント」を守る                   | 約8分     |
| いつもの相手が乗っ取られていたら                         | 約8分30秒 |
| 会社・お店のSNSアカウントを乗っ取られたら                | 約9分     |
| AIで作った声と顔のなりすまし                             | 約8分     |
| 金融機関サポートを装うアカウント乗っ取り                 | 約8分30秒 |
| QRコード・検索広告から始まる、リアルタイムのフィッシング | 約9分30秒 |
| SNS型投資・ロマンス詐欺と「送金役」                      | 約8分     |
| 偽の副業・在宅ワークと「闇バイト」の入口                 | 約9分30秒 |
| メールを乗っ取られたあとに起きること                     | 約9分30秒 |

動画を最後まで見たコースでは、動画の下に「この動画のポイント」（シーンごとの見出し・要点・例・ナレーション全文）が表示され、文字で復習できる。

確認テストは、コースごとの問題プールから毎回ランダムに出題する（出題数は `QUIZ_QUESTION_COUNT`）。選択肢の並びも毎回入れ替わるので、解説では選択肢を記号（a〜d）で指さないこと。

## 構成（yarn workspaces）

- `packages/course` — 台本・クイズ・採点・進捗の純粋関数（動画と Web の共通データ）
- `packages/video` — Remotion で動画を生成。ナレーションは [yomiscript](https://github.com/receptron/yomiscript) の Kokoro。読みは場面ごとに `packages/video/readings/<courseId>.json` へ YomiScript（発音記号）で書き、エンジンはそのとおりに話す（漢字の読み間違いが起きない）
- `packages/web` — Vue 3 + Tailwind CSS + TypeScript。動画を最後まで見ると確認テストが解放され、80%以上で合格。結果はブラウザの localStorage に保存。再生位置も10秒ごとに保存し、開き直すと続きから再生する（見たところまでは早送りできる。一覧には「約○分まで視聴」と出す）

## 使い方

```sh
yarn install
yarn video:build   # ナレーション生成 → mp4 を packages/web/public/videos/ に出力（ffmpeg が必要。初回は読み上げモデルを取得する）
yarn dev           # http://localhost:5173
```

- `yarn video:voice [courseId...]` — 読みから音声だけ再生成（→ `yarn video:render`）。台本を変えたら、その場面の読みも書き直す
- `yarn workspace @security-education/video readings:check [courseId...]` — 読みの元の文字（`<t:…>`）をつなげたものが台本と一致するか確かめる（`yarn test` でも確かめる）
- `yarn video:render [courseId...]` — 動画だけ再レンダリング。描き出した長さを `packages/course/src/videoDurations.json` に書き込み、一覧の「動画 ○分○秒」に使う（このファイルもコミットする）
- `yarn workspace @security-education/video studio` — Remotion Studio でプレビュー
- `yarn build` — 静的サイトを `packages/web/dist/` に出力（相対パスなのでサブパスにもそのまま置ける）

生成物（音声・mp4）は git 管理外。

## 公開（GitHub Pages）

https://singularitysociety.github.io/security-education/

- main に push すると `.github/workflows/pages.yml` がビルドして公開する
- 動画の描き出しは重いので CI では行わず、Release `videos` に添付した mp4 をワークフローが取り込む
- 動画を作り直したら `yarn video:build && yarn video:publish`（Release の mp4 を差し替え、公開ワークフローを再実行する。`gh` のログインが必要）

## 確認

```sh
yarn format && yarn lint && yarn typecheck && yarn test && yarn build
```

## コースの追加

`packages/course/src/courses/` にコースを1ファイル追加し、`packages/course/src/index.ts` の `courses` に登録し、`packages/course/src/categories.ts` のどれかのカテゴリー（一覧の見出しと対象者）に id を入れる。動画がまだのコースは `draftCourses` に入れておくと、一覧に「工事中」として出る。まだ書いていないコースはカテゴリーの `upcoming` に題名と概要を書く。
シーンの種類は `title` / `points` / `email` / `sms` / `url` / `passwords` / `conversation` / `code` / `flow`（`packages/course/src/types.ts`）。会話シーンの右側は「ここが怪しい」が既定で、正しい対応を示す会話には `notesKind: "keyPoints"` を付けて「ここがポイント」にする。
例の会社名・ドメインはすべて架空（`.example`）にすること。

公開するコースには、場面ごとの読み `packages/video/readings/<courseId>.json`（`{ "<scene id>": ["ja /… ↘/", …] }`、文ごとに一つの発話）も書く。`<t:…>` は1語ごとに付け、つなげると台本と1文字も違わないこと。書き方は `npx yomiscript instructions` が出す。
