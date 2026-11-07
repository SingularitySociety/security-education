# ヘッダーとフッターに Singularity Society のリンクを張る

## 目的

サイトの上下に、運営する Singularity Society の Web サイト・note・X へのリンクを出す。

## 方針

- リンクは `packages/web/src/lib/orgLinks.ts` に一か所でまとめ、`OrgLinks.vue` で並べる。URL は公式サイト（https://singularitysociety.org）に載っているものを使う。
- ヘッダーは右側に団体名とリンク（スマホ幅では二行目に回る）。もとの「動画を見て、確認テストに合格しよう」はリンクに置き換えた。
- フッターは「運営: Singularity Society」とリンク。
- 外部リンクは新しいタブで開き、`rel="noopener noreferrer"` を付ける。
