# 一覧に動画の長さを出す（#56）

## 目的

コース一覧のカードに、各コースの動画の長さを「7分30秒」の形で出す。

## 方針

- 長さのデータは `packages/course/src/videoDurations.json`（コース id → 秒、小数1桁）。
  - 最初の値は、公開中の mp4 を ffprobe で測った長さ。
  - `render-all` が描き出すたびに、composition の長さ（フレーム数 ÷ fps）でその行を更新する。mp4 の実測と一致する。
- 書式と更新は `videoDuration.ts` の純粋関数（`formatMinutesSeconds` / `withVideoDuration` / `isVideoDurations`）。
- 公開中の全コースに長さがあることをテストで確かめる（動画を足したのに JSON を更新し忘れると落ちる）。
- 一覧のカードは概要の下に「動画 ○分○秒」を出す。
