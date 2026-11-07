# feat: 安全チェックリストのページ

issue #98

- `packages/course/src/checklist.ts`: グループ（ブラウザ / パソコン / スマホ / アカウント / 家族 / 会社の場合）と項目を純粋なデータで定義する。各項目は id・一行の文・それを扱うコース id（1つ以上）
- 項目は公開済みコースで教えている行動だけを、短い命令形にする。文面は Codex でレビューしてから入れる
- `packages/course/src/checklistProgress.ts`: チェック状態（`{ [itemId]: true }`）のパース・切り替え・グループごとの数え上げ。パースは `parseRecordMap` を使い、値が `true` でないものと、もう無い項目の id は捨てる
- `packages/web`: `/checklist` のページ。状態は localStorage の `security-education:checklist:v1` に保存し、グループごとに「n / m 項目」を出す。各項目からコースへリンクし、全部外すボタンを置く。ヘッダーにコース一覧と並べて導線を置く
- テスト: 項目 id の重複なし、空のグループなし、リンク先が公開済みコースに実在する、保存データの壊れた JSON・型違い・未知の id を安全に扱う
- 「スマホのルート化・脱獄をしない」は mobile-apps-payments へリンクする。コース側の記述はこのあと足す
