# Hi there 👋 I'm 谷許 淳一

ソフトウェアエンジニアとして、技術選定から実装・運用まで一貫した開発体験を大切にしています。
基本的に Cursor を使用して開発しております。

🌐 **ポートフォリオ**: [tech.ymt-it.jp](https://tech.ymt-it.jp/)

## About Me

- 🔭 現在は **スポーツチーム向けグループウェア** を開発しています
- 🌱 **TypeScript / Next.js / Docker / GitHub Actions** を実践的に学んでいます
- 💼 **エンジニア** として活動しています（YMT Works）
- 📫 連絡先: [tech@ymt-works.jp](mailto:tech@ymt-works.jp)

## Featured Project: チーム管理

スポーツチームの運営を支えるグループウェアです。
練習・試合スケジュール、出欠、連絡、チーム内の情報共有といった日常業務を、ひとつの Web アプリにまとめることを目指しています。

| 項目 | 内容 |
|:--|:--|
| プロジェクト | **チーム管理** (`team-management`) |
| 概要 | スポーツチーム向けグループウェア |
| 主な用途 | スケジュール管理 / 出欠確認 / チーム連絡 / 情報共有 |
| 技術スタック | Next.js, React, TypeScript, Prisma, PostgreSQL, Render |
| アプリ本体 | [`apps/team-management/`](./apps/team-management/)（このリポジトリ内） |
| 関連リポジトリ | [`ymt-tech/team-management`](https://github.com/ymt-tech/team-management)（分割予定） |
| デモ | [Render で開く](https://team-management-demo.onrender.com/login)（サンプルDB） |
| デモログイン | `demo@ymt-works.jp` / `demo1234` |

## Tech Stack

### Languages
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Go](https://img.shields.io/badge/-Go-00ADD8?style=flat-square&logo=go&logoColor=white)

### Frameworks & Libraries
![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)

### Infrastructure
![AWS](https://img.shields.io/badge/-AWS-232F3E?style=flat-square&logo=amazonaws)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![Render](https://img.shields.io/badge/-Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

## GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=ymt-tech&show_icons=true&theme=radical)

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=ymt-tech&layout=compact&theme=radical)

## Development Practices

個人開発でもチーム開発を意識した運用を心がけています。

- ブランチ戦略: `main` / `develop` / `feature/*` / `fix/*` / `docs/*`
- コミット: [Conventional Commits](https://www.conventionalcommits.org/)（例: `feat:`, `fix:`, `docs:`）
- レビュー: Issue → feature ブランチ → Pull Request → マージ

## GitHub Pages（ポートフォリオ）

このリポジトリのルートに静的ポートフォリオ（`index.html`）があります。

Settings → Pages → Source: **Deploy from a branch** → Branch: **main** / **/ (root)** で公開できます。

カスタムドメイン例: https://tech.ymt-it.jp/

## Render（チーム管理デモ = 本番相当 + サンプルDB）

`render.yaml` で **Web Service + PostgreSQL** を定義しています。静的フェイクUIではなく、アプリがサンプルDBに読み書きします。

1. [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**
2. このリポジトリ `ymt-tech/ymt-tech` を接続
3. Blueprint をデプロイ（`team-management-demo` + `team-management-db`）
4. https://team-management-demo.onrender.com/login で確認

| 役割 | 場所 | 公開先 |
|:--|:--|:--|
| ポートフォリオサイト | リポジトリルート | GitHub Pages |
| チーム管理デモアプリ | `apps/team-management/` | Render Web Service + Postgres |

※ Free Postgres は作成から 30 日で期限切れになります。継続する場合は有料プランへアップグレードしてください。

## Links

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ymt-tech)
[![Portfolio](https://img.shields.io/badge/-Portfolio-1F6B4A?style=flat-square)](https://tech.ymt-it.jp/)
[![Demo](https://img.shields.io/badge/-Demo-46E3B7?style=flat-square&logo=render&logoColor=black)](https://team-management-demo.onrender.com/login)
[![Mail](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:tech@ymt-works.jp)
