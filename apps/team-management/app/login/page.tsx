import { loginAction } from "@/app/actions";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getSessionUser();
  if (user) redirect("/schedule");
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <div className="rounded-2xl border border-[var(--line)] bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,61,44,0.12)]">
        <p className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.16em] text-turf">
          Team Management
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink">
          チーム管理
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          ポートフォリオ用の本番相当デモです。サンプルDBのデータを使って操作できます。
        </p>

        {params.error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            メールアドレスまたはパスワードが正しくありません。
          </p>
        ) : null}

        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-ink">メール</span>
            <input
              name="email"
              type="email"
              defaultValue="demo@ymt-works.jp"
              required
              className="w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2 outline-none ring-turf focus:ring-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-ink">パスワード</span>
            <input
              name="password"
              type="password"
              defaultValue="demo1234"
              required
              className="w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2 outline-none ring-turf focus:ring-2"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-turf px-4 py-2.5 font-semibold text-white transition hover:bg-turf-deep"
          >
            デモに入る
          </button>
        </form>

        <div className="mt-5 rounded-lg bg-mist/70 px-3 py-3 text-xs leading-relaxed text-ink-soft">
          <p className="font-semibold text-ink">サンプルアカウント</p>
          <p className="mt-1">demo@ymt-works.jp / demo1234</p>
        </div>
      </div>
    </main>
  );
}
