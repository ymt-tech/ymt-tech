import { requireUser } from "@/app/actions";
import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { formatDateTime, getDemoTeam } from "@/lib/team";

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  const user = await requireUser();
  const team = await getDemoTeam();
  const posts = await prisma.boardPost.findMany({
    where: { teamId: team.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell user={user} teamName={team.name} eyebrow="Board" title="情報共有">
      <p className="mb-5 text-sm text-ink-soft">
        お知らせ・資料・会場情報をサンプルDBから表示しています。
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-[var(--line)] bg-white/90 p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-turf">
              {post.category}
            </p>
            <h2 className="mt-2 text-lg font-bold text-ink">{post.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{post.body}</p>
            <p className="mt-3 text-xs text-ink-soft">{formatDateTime(post.createdAt)}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
