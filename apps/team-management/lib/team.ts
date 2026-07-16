import { prisma } from "./prisma";

export async function getDemoTeam() {
  const team = await prisma.team.findFirst({
    orderBy: { createdAt: "asc" },
  });
  if (!team) {
    throw new Error("サンプルチームがありません。seed を実行してください。");
  }
  return team;
}

export const eventTypeLabel: Record<string, string> = {
  PRACTICE: "練習",
  MATCH: "試合",
  MEETING: "連絡",
};

export const attendanceLabel: Record<string, string> = {
  PRESENT: "出席",
  ABSENT: "欠席",
  UNANSWERED: "未回答",
};

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
