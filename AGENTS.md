# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **static personal portfolio website** (プレーンな HTML / CSS / JavaScript)。
ビルド工程・パッケージマネージャ・バックエンド・DB はありません。

### 構成
- `index.html` — 単一ページのサイト本体
- `css/styles.css` — スタイル
- `js/main.js` — スクロール挙動・リビールアニメーション・コピーライト年の動的表示
- `assets/` — 画像
- `CNAME`, `.nojekyll` — GitHub Pages（本番）用の設定

### 開発サーバーの起動（run）
依存インストールは不要です。任意の静的ファイルサーバーでリポジトリのルートを配信します。

```
python3 -m http.server 8080
```

その後 `http://localhost:8080/` を開きます。長時間稼働させる場合は tmux セッションで起動してください。

### Lint / Test / Build
- **Lint / Test / Build のツールチェーンはこのリポジトリには存在しません**（テストランナー・リンター・ビルド設定なし）。
- 動作確認は、上記の静的サーバーを立ててブラウザでページを表示し、ナビゲーション・スクロール・フッターの年号（JS が動く証拠）を目視するのが基本です。

### 注意点
- Google Fonts は CDN から読み込みますが、未取得でもフォールバックフォントで表示されます（サイト自体は動作します）。
- `team-management-demo.ymt-it.jp` などの外部リンクはこのリポジトリの成果物ではありません。
