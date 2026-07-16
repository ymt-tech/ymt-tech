import { postMessageAction, requireUser } from "@/app/actions";
import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { formatDateTime, getDemoTeam } from "@/lib/team";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const user = await requireUser();
  const team = await getDemoTeam();
  const messages = await prisma.message.findMany({
    where: { teamId: team.id },
    include: { author: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <AppShell user={user} teamName={team.name} eyebrow="Messages" title="チーム連絡">
      <p className="mb-4 text-sm text-ink-soft">チーム全体への連絡をサンプルDBに保存します。</p>

      <div className="mb-4 space-y-3 rounded-xl border border-[var(--line)] bg-white/90 p-4">
        {messages.map((message) => (
          <article key={message.id} className="rounded-lg bg-paper px-3 py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-ink">{message.author.name}</p>
              <p className="text-xs text-ink-soft">{formatDateTime(message.createdAt)}</p>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-ink">{message.body}</p>
          </article>
        ))}
        {messages.length === 0 ? (
          <p className="text-sm text-ink-soft">まだ連絡がありません。</p>
        ) : null}
      </div>

      <form action={postMessageAction} className="flex flex-col gap-3 sm:flex-row">
        <input
          name="body"
          type="text"
          maxLength={200}
          required
          placeholder="連絡を入力（例: 雨天のため室内へ変更）"
          className="min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none ring-turf focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-turf px-4 py-2 font-semibold text-white hover:bg-turf-deep"
        >
          送信
        </button>
      </form>
    </AppShell>
  );
}
