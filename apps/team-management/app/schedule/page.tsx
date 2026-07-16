import { requireUser } from "@/app/actions";
import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { eventTypeLabel, formatDateTime, getDemoTeam } from "@/lib/team";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const user = await requireUser();
  const team = await getDemoTeam();
  const events = await prisma.event.findMany({
    where: { teamId: team.id },
    orderBy: { startsAt: "asc" },
  });

  return (
    <AppShell user={user} teamName={team.name} eyebrow="Schedule" title="今週の予定">
      <p className="mb-5 text-sm text-ink-soft">
        練習・試合・ミーティングをサンプルDBから表示しています。
      </p>
      <ul className="space-y-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-xl border border-[var(--line)] bg-white/90 p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-semibold text-turf-deep">
                {eventTypeLabel[event.type] || event.type}
              </span>
              <h2 className="text-lg font-bold text-ink">{event.title}</h2>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{formatDateTime(event.startsAt)}</p>
            <p className="mt-1 text-sm text-ink-soft">{event.place}</p>
            {event.note ? <p className="mt-2 text-sm text-ink">{event.note}</p> : null}
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
