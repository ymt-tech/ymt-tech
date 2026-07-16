"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AttendanceStatus } from "@prisma/client";
import { authenticate, clearSession, getSessionUser, setSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDemoTeam } from "@/lib/team";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const user = await authenticate(email, password);
  if (!user) {
    redirect("/login?error=1");
  }
  await setSession(user);
  redirect("/schedule");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

export async function updateAttendanceAction(formData: FormData) {
  await requireUser();
  const recordId = String(formData.get("recordId") || "");
  const status = String(formData.get("status") || "") as AttendanceStatus;
  if (!recordId || !["PRESENT", "ABSENT", "UNANSWERED"].includes(status)) {
    return;
  }
  await prisma.attendanceRecord.update({
    where: { id: recordId },
    data: { status },
  });
  revalidatePath("/attendance");
}

export async function postMessageAction(formData: FormData) {
  const user = await requireUser();
  const body = String(formData.get("body") || "").trim();
  if (!body || body.length > 200) {
    return;
  }
  const team = await getDemoTeam();
  await prisma.message.create({
    data: {
      teamId: team.id,
      authorId: user.id,
      body,
    },
  });
  revalidatePath("/messages");
}

export async function resetDemoDataAction() {
  await requireUser();
  const team = await getDemoTeam();
  await prisma.message.deleteMany({ where: { teamId: team.id } });
  const coach = await prisma.user.findFirst({ where: { email: "demo@ymt-works.jp" } });
  if (coach) {
    await prisma.message.createMany({
      data: [
        {
          teamId: team.id,
          authorId: coach.id,
          body: "今週の練習は通常どおり 9:00 開始です。遅刻しそうな場合は連絡ください。",
        },
        {
          teamId: team.id,
          authorId: coach.id,
          body: "試合の集合場所は第2ピッチ入口です。ボールを忘れずに。",
        },
      ],
    });
  }
  const records = await prisma.attendanceRecord.findMany({
    where: { event: { teamId: team.id } },
    include: { member: true },
    orderBy: { member: { name: "asc" } },
  });
  for (const record of records) {
    let status: AttendanceStatus = AttendanceStatus.UNANSWERED;
    if (["佐藤 蓮", "鈴木 陽翔", "伊藤 結"].includes(record.member.name)) {
      status = AttendanceStatus.PRESENT;
    }
    if (record.member.name === "高橋 蒼") status = AttendanceStatus.ABSENT;
    await prisma.attendanceRecord.update({
      where: { id: record.id },
      data: { status },
    });
  }
  revalidatePath("/attendance");
  revalidatePath("/messages");
  revalidatePath("/schedule");
  revalidatePath("/board");
}
