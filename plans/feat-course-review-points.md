# feat: 視聴済みのコースで動画のポイントを表示する（#23）

## ゴール

動画を見終えた人が、文字で内容を復習できるようにする。

## 方針

- `packages/course/src/reviewPoints.ts`（純粋関数）: `Scene` を表示用の `ReviewSection`（見出し・本文・ナレーション）に変換する
  - title → 見出し + 副題 / points → 箇条書き / email・sms → 例の文面 + 「ここが怪しい」/ url → URL と公式・偽物の判定と説明 / passwords → サービス・パスワード・状態
  - switch は `never` で網羅性を型で検出する（シーンの種類を足すと型エラーになる）
- `CourseReviewPoints.vue` / `ReviewSectionBody.vue`: 変換結果を表示する。例の文面は既存の `SampleEmail` / `SampleSms` を再利用。ナレーション全文は `<details>` で開閉
- `CourseView.vue`: `courseProgress(id).watched` のときだけ動画の下に出す
- テスト（`test/test_review_points.ts`）: 全種類・空の入力・全コースの全シーンが変換できること・一覧のキーが重複しないこと
