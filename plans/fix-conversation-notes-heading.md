# 会話シーンの見出しを、怪しい点とポイントで分ける

issue #50

## 問題

会話シーンの右側の見出しが「ここが怪しい」で固定されている。正しい対応を示す会話（情報システム担当の指示など）でも同じ見出しになり、逆の意味に読める。

## 方針

- `ConversationScene` に `notesKind?: "redFlags" | "keyPoints"` を足す。省略時は `redFlags`（既存の会話はそのまま）
- 見出しは `CONVERSATION_NOTES_HEADINGS`（course パッケージ）に一か所で持ち、動画と視聴後のポイントの両方が使う
- 省略時の解決は純粋関数 `conversationNotesKind` にまとめ、テストする
- 色: 怪しい点は赤、ポイントは水色（動画は `theme.accent`、Web は sky）
- 正しい対応を示す会話に `notesKind: "keyPoints"` を付け、該当する公開済みの動画を描き直して Release に上げ直す
- 退職者のアカウントの会話（account-lifecycle）は、怪しい点が中心なので既定のままにする

## 確認

- lint / typecheck / test / build
- 描き直した動画の該当シーンを静止画で確認
- ビルドした画面で、視聴後のポイントの見出しが変わることを確認
