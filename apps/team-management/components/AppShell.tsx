import Link from "next/link";
import { logoutAction, resetDemoDataAction } from "@/app/actions";
import type { SessionUser } from "@/lib/auth";

const nav = [
  { href: "/schedule", label: "スケジュール" },
  { href: "/attendance", label: "出欠確認" },
  { href: "/messages", label: "チーム連絡" },
  { href: "/board", label: "情報共有" },
];

export function AppShell({
  user,
  teamName,
  title,
  eyebrow,
  children,
}: {
  user: SessionUser;
  teamName: string;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="bg-turf-deep px-4 py-2 text-center text-sm text-white/90">
        ポートフォリオ用デモです。データはサンプルDBに保存されます。
        <a
          className="ml-2 font-bold text-lime"
          href={process.env.PORTFOLIO_URL || "https://tech.ymt-it.jp/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          ポートフォリオへ
        </a>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-6xl md:grid-cols-[220px_1fr]">
        <aside className="bg-turf-deep p-5 text-white md:min-h-full">
          <p className="font-[family-name:var(--font-display)] text-xl font-extrabold">
            チーム管理
          </p>
          <p className="mt-1 text-sm text-white/70">{teamName}</p>
          <nav className="mt-8 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 border-t border-white/15 pt-4 text-sm text-white/70">
            <p>ログイン中: {user.name}</p>
            <form action={logoutAction} className="mt-3">
              <button
                type="submit"
                className="rounded-md border border-white/25 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10"
              >
                ログアウト
              </button>
            </form>
          </div>
        </aside>

        <div className="p-5 md:p-8">
          <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                {eyebrow}
              </p>
              <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink">
                {title}
              </h1>
            </div>
            <form action={resetDemoDataAction}>
              <button
                type="submit"
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-ink-soft hover:bg-mist"
              >
                デモデータをリセット
              </button>
            </form>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
