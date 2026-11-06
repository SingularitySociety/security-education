# 動画を途中から再開する（#57）

## 目的

途中まで見て再読み込みすると最初からになる。続きから見られるようにし、一覧にもどこまで見たかを出す。

## 方針

- 再生位置は localStorage の `security-education:playback:v1`（コース id → `positionSeconds` / `furthestSeconds`）。進捗（`progress:v1`）とは分けた。形式が違い、片方が壊れてももう片方は残るように。
- 規則は `packages/course/src/playback.ts` の純粋関数。
  - `shouldSavePlayback`: 前回保存した位置から10秒以上動いたら保存する（戻る方向も）。
  - `recordPlayback`: 位置を記録し、最も先まで見た位置は下げない。
  - `finishPlayback`: 最後まで見たら位置を0に戻し、最も先は動画の長さにする。
  - `resumeSeconds`: 末尾近く（数秒以内）なら最初から。
  - `watchedSoFarLabel`: 分単位に切り捨てて「約○分まで視聴」。1分未満は「1分未満まで視聴」。
- 画面
  - `loadedmetadata` で保存位置へ移動し、早送りの上限を保存済みの「最も先」にする。
  - `timeupdate` で10秒ごとに保存。`ended` で視聴済みにして位置を0へ。
  - 一覧は、視聴済みでないコースだけ「約○分まで視聴」を出す。
- `parseProgressMap` と同じ読み込み処理を `recordMap.ts` に切り出した。old と new を生成入力で並べて比べ、一致を確かめた。
- localStorage の読み書きの try/catch を `browserStorage.ts` にまとめた。

## やらないこと

- 別タブでの視聴は、そのタブを開き直すまで一覧に反映されない（進捗と同じ）。
