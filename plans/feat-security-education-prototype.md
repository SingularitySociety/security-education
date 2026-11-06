# feat: セキュリティ教育サイト プロトタイプ（フィッシング / スミッシング）

## ゴール

短い教育動画（各 2〜3 分）を見たあと、簡単な Web 試験を受けるサイトのプロトタイプ。
題材は Singularity Society「セキュリティ脅威マップ」の「なりすまし・フィッシング系」。

- コース1: メールのフィッシング
- コース2: SMS のスミッシング

## 決定事項

| 項目       | 決定                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| Web        | Vue 3 + Tailwind CSS v4 + TypeScript（Vite）                                    |
| 動画       | Remotion。ナレーションは macOS `say`（Kyoko）で生成した日本語音声               |
| 結果の保存 | ブラウザの localStorage のみ（サーバー無し、静的ホスティング可）                |
| 構成       | 1リポ・yarn workspaces（`packages/course` / `packages/video` / `packages/web`） |

## 構成

- `packages/course` — 台本・クイズの単一の情報源（TS データ）と採点などの純粋関数。動画と Web の両方が読む
- `packages/video` — Remotion。`scripts/generate-voice.ts` が台本から音声を生成し、
  `calculateMetadata` が音声の長さからシーン尺を決める。`yarn render` で `packages/web/public/videos/*.mp4` を出力
- `packages/web` — コース一覧 → 動画視聴（最後まで見ると試験が解放）→ 試験 → 結果と解説
- `test/` — `node:test` で採点・進捗の純粋関数をテスト

## 方針

- 例に出す会社名・ドメインは全て架空（`.example` ドメイン）。実在ブランドを模倣しない
- 合格ライン 80%。不合格は再受験可
- 生成物（音声・mp4）は git 管理外。`yarn video:build` で再生成

## 範囲外（プロトの次）

- ログイン・管理者向け受講状況ダッシュボード
- 他の脅威ジャンル（マルウェア・乗っ取り等）
