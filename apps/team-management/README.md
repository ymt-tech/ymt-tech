# チーム管理（ポートフォリオ用デモ）

スポーツチーム向けグループウェアの **本番相当デモ** です。
Render 上の PostgreSQL（サンプルデータ）に接続して動作します。

## デモログイン

- Email: `demo@ymt-works.jp`
- Password: `demo1234`

## 機能

- スケジュール
- 出欠確認（DB 更新）
- チーム連絡（DB 保存）
- 情報共有ボード

## ローカル開発

```bash
cp .env.example .env
# PostgreSQL を起動し DATABASE_URL を設定
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

## Render

リポジトリ直下の `render.yaml` を Blueprint デプロイしてください。
サービス名: `team-management-demo`
