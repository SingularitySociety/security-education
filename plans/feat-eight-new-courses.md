# 新しいコース8本の公開（#61 #62 #67 #73 #74 #75 #76 #77）

## 目的

Codex と web で調べた手口・対策・事故対応をもとに書いたコースを、動画つきで一覧に出す。

| id                     | 題名                                      | カテゴリー         |
| ---------------------- | ----------------------------------------- | ------------------ |
| fake-police            | ニセ警察・ニセ行政機関の電話とビデオ通話  | 電話やネットの詐欺 |
| ai-voice-impersonation | AIで作った声と顔のなりすまし              | 電話やネットの詐欺 |
| mfa-methods            | 二要素認証の種類と選び方                  | まず押さえる基本   |
| master-account         | すべての鍵を握る「親アカウント」を守る    | まず押さえる基本   |
| browser-data-theft     | ブラウザの情報が丸ごと盗まれたら          | まず押さえる基本   |
| chat-impersonation     | いつもの相手が乗っ取られていたら          | 職場を狙うだまし   |
| business-sns-takeover  | 会社・お店のSNSアカウントを乗っ取られたら | 事故が起きたとき   |
| auth-sessions-tokens   | セッションとトークンの持ち方              | 開発者向け         |

## 方針

- 台本・クイズは Codex でクロスレビュー済み（web の公的情報と突き合わせ）。
- 読み（`packages/video/readings/<id>.json`）は `readings:check` と、Codex によるカナ表記のレビューを通したもの。
- `courses` に登録し、`yarn video:voice` → `yarn video:render` で描き出す。`videoDurations.json` も更新する。
- 動画はそれぞれ10分未満であること。
- mp4 は Release `videos` に添付する。
