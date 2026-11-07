# ページごとの URL と HTML、共有用の画像、検索・AI 向けの対応

## 目的

SNS にリンクを貼ったときに題名・説明・画像が出るようにし、検索エンジンと AI のクローラーが各ページの中身を読めるようにする（#120）。

## 方針

- URL を `#/courses/<id>` から `/courses/<id>/` にする（`createWebHistory`、`base: "/security-education/"`）。古い `#/...` のリンクは、起動後に新しい URL へ移す。
- ページの一覧は `packages/course/src/sitePages.ts` の純粋な関数で作る。ビルドのあと `packages/web/scripts/prerender.ts` が、ページごとに `index.html` を書き出す。
  - head: 題名、説明文、正規 URL（末尾に `/`。GitHub Pages がそちらへ転送するため）、OGP、X のカード、JSON-LD（トップは WebSite、コースは Course）。確認テストのページは `noindex`。
  - 本文: JavaScript なしでも読めるように、`#app` の中にコースの概要と、場面ごとの見出しとナレーションを入れる。Vue が起動すると置き換わる。
- `404.html`（知らない URL でもアプリを開き、トップへ移す）、`sitemap.xml`、`llms.txt`（コースの一覧）、`llms-full.txt`（全コースのナレーション）も書き出す。
- アプリの中でページを移ったときも、題名・説明文・正規 URL・`noindex` を合わせる。
- 共有用の画像は Remotion の静止画（1200x630、動画と同じ見た目）で描き、`packages/web/public/og/` にコミットする。ヒラギノを使うので CI では描かない。テストで、全ページの画像がそろっているかを確かめる。
- `robots.txt` はドメインの直下にしか置けないので置かない。sitemap は Search Console で登録する。
