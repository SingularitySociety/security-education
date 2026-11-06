# feat: GitHub Pages で公開する

## ゴール

main の内容を https://singularitysociety.github.io/security-education/ で公開する。

## 方針

- `.github/workflows/pages.yml`: main への push（と手動実行）でビルドし、`actions/deploy-pages` で公開
- 動画は CI で作れない（ナレーションが macOS `say` 専用）。ローカルで生成した mp4 を Release `videos` に添付し、
  ワークフローが `gh release download` で `packages/web/public/videos/` に取り込んでからビルドする
- mp4 は git に入れない（台本を直すたびに履歴が膨らむため）
- `yarn video:publish`: Release の mp4 を差し替えて公開ワークフローを再実行する
- 権限は top-level `contents: read`、deploy ジョブだけ `pages: write` / `id-token: write`
