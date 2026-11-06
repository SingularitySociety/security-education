# セキュリティ教育サイト（プロトタイプ）

短い教育動画を見たあと、確認テストを受けるサイト。題材は Singularity Society
「[セキュリティ脅威マップ](https://singularitysociety.github.io/societys_statement/development/security/README.html)」を元にしている。
今後追加するコースの一覧は issue #6。

公開先: https://singularitysociety.github.io/security-education/

| コース                             | 動画      |
| ---------------------------------- | --------- |
| パスワードとアカウントの基本       | 約3分30秒 |
| メールのフィッシング               | 約4分     |
| SMSのスミッシング                  | 約2分30秒 |
| 電話と画面でだます手口             | 約8分     |
| 上司や同僚を名乗る指示             | 約6分     |
| 採用を使った攻撃                   | 約7分     |
| ネット詐欺                         | 約6分30秒 |
| 社外で働くときの基本               | 約6分     |
| コマンドを貼る前に                 | 約5分30秒 |
| ツールはどこから入れるか           | 約5分30秒 |
| AIは読んだものに操られる           | 約6分30秒 |
| AIに入れる情報と、使うツール       | 約6分30秒 |
| 更新を止めない                     | 約5分30秒 |
| 捨てる・売る・返すときのデータ消去 | 約5分30秒 |
| 入社から退職までのアカウント管理   | 約6分     |
| SNSでの発信と誹謗中傷・デマ        | 約8分30秒 |
| 標的型攻撃と機密情報の守り方       | 約8分     |
| 問い合わせ相手を確認する           | 約8分     |
| 困ったときは、止まって相談         | 約6分     |
| スマホとパソコンを安全に使う基本   | 約8分     |

動画を最後まで見たコースでは、動画の下に「この動画のポイント」（シーンごとの見出し・要点・例・ナレーション全文）が表示され、文字で復習できる。

確認テストは、コースごとの問題プールから毎回ランダムに出題する（出題数は `QUIZ_QUESTION_COUNT`）。選択肢の並びも毎回入れ替わるので、解説では選択肢を記号（a〜d）で指さないこと。

## 構成（yarn workspaces）

- `packages/course` — 台本・クイズ・採点・進捗の純粋関数（動画と Web の共通データ）
- `packages/video` — Remotion で動画を生成。ナレーションは macOS の `say`（Kyoko）
- `packages/web` — Vue 3 + Tailwind CSS + TypeScript。動画を最後まで見ると確認テストが解放され、80%以上で合格。結果はブラウザの localStorage に保存

## 使い方

```sh
yarn install
yarn video:build   # ナレーション生成 → mp4 を packages/web/public/videos/ に出力（macOS + ffmpeg が必要）
yarn dev           # http://localhost:5173
```

- `yarn video:voice` — 台本から音声だけ再生成（台本を変えたらこれ → `yarn video:render`）
- `yarn video:render [courseId...]` — 動画だけ再レンダリング
- `yarn workspace @security-education/video studio` — Remotion Studio でプレビュー
- `yarn build` — 静的サイトを `packages/web/dist/` に出力（相対パスなのでサブパスにもそのまま置ける）

生成物（音声・mp4）は git 管理外。

## 公開（GitHub Pages）

https://singularitysociety.github.io/security-education/

- main に push すると `.github/workflows/pages.yml` がビルドして公開する
- 動画は CI では作れない（`say` が macOS 専用）ので、Release `videos` に添付した mp4 をワークフローが取り込む
- 動画を作り直したら `yarn video:build && yarn video:publish`（Release の mp4 を差し替え、公開ワークフローを再実行する。`gh` のログインが必要）

## 確認

```sh
yarn format && yarn lint && yarn typecheck && yarn test && yarn build
```

## コースの追加

`packages/course/src/courses/` にコースを1ファイル追加し、`packages/course/src/index.ts` の `courses` に登録し、`packages/course/src/categories.ts` のどれかのカテゴリー（一覧の見出しと対象者）に id を入れる。動画がまだのコースは `draftCourses` に入れておくと、一覧に「工事中」として出る。まだ書いていないコースはカテゴリーの `upcoming` に題名と概要を書く。
シーンの種類は `title` / `points` / `email` / `sms` / `url` / `passwords` / `conversation` / `code` / `flow`（`packages/course/src/types.ts`）。
例の会社名・ドメインはすべて架空（`.example`）にすること。
