import { requireUser, updateAttendanceAction } from "@/app/actions";
import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { attendanceLabel, getDemoTeam } from "@/lib/team";

export const dynamic = "force-dynamic";

export default async function AttendancePage() {
  const user = await requireUser();
  const team = await getDemoTeam();
  const event = await prisma.event.findFirst({
    where: { teamId: team.id },
    orderBy: { startsAt: "asc" },
  });

  if (!event) {
    return (
      <AppShell user={user} teamName={team.name} eyebrow="Attendance" title="出欠確認">
        <p>イベントがありません。</p>
      </AppShell>
    );
  }

  const records = await prisma.attendanceRecord.findMany({
    where: { eventId: event.id },
    include: { member: true },
    orderBy: { member: { name: "asc" } },
  });

  const counts = {
    PRESENT: records.filter((r) => r.status === "PRESENT").length,
    ABSENT: records.filter((r) => r.status === "ABSENT").length,
    UNANSWERED: records.filter((r) => r.status === "UNANSWERED").length,
  };

  return (
    <AppShell user={user} teamName={team.name} eyebrow="Attendance" title="出欠確認">
      <p className="mb-4 text-sm text-ink-soft">
        対象: <strong className="text-ink">{event.title}</strong>
      </p>
      <div className="mb-5 grid grid-cols-3 gap-3">
        {(
          [
            ["出席", counts.PRESENT],
            ["欠席", counts.ABSENT],
            ["未回答", counts.UNANSWERED],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--line)] bg-white/90 px-3 py-3 text-center"
          >
            <p className="text-xs text-ink-soft">{label}</p>
            <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {records.map((record) => (
          <li
            key={record.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-white/90 p-4"
          >
            <div>
              <p className="font-semibold text-ink">{record.member.name}</p>
              <p className="text-sm text-ink-soft">
                {record.member.role} · 現在: {attendanceLabel[record.status]}
              </p>
            </div>
            <form action={updateAttendanceAction} className="flex flex-wrap gap-2">
              <input type="hidden" name="recordId" value={record.id} />
              {(["PRESENT", "ABSENT", "UNANSWERED"] as const).map((status) => (
                <button
                  key={status}
                  name="status"
                  value={status}
                  type="submit"
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    record.status === status
                      ? "bg-turf text-white"
                      : "border border-[var(--line)] bg-paper text-ink-soft hover:bg-mist"
                  }`}
                >
                  {attendanceLabel[status]}
                </button>
              ))}
            </form>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
