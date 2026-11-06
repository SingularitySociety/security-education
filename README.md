# セキュリティ教育サイト（プロトタイプ）

短い教育動画を見たあと、確認テストを受けるサイト。題材は Singularity Society
「[セキュリティ脅威マップ](https://singularitysociety.github.io/societys_statement/development/security/README.html)」の
「なりすまし・フィッシング系」。

| コース               | 動画      | 確認テスト |
| -------------------- | --------- | ---------- |
| メールのフィッシング | 約2分30秒 | 5問        |
| SMSのスミッシング    | 約2分     | 5問        |

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

`packages/course/src/courses/` にコースを1ファイル追加し、`packages/course/src/index.ts` の `courses` に登録する。
シーンの種類は `title` / `points` / `email` / `sms` / `url`（`packages/course/src/types.ts`）。
例の会社名・ドメインはすべて架空（`.example`）にすること。
