import { PrismaClient, EventType, AttendanceStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.count();
  if (existing > 0 && process.env.FORCE_SEED !== "1") {
    console.log("Sample data already present. Skip seed (set FORCE_SEED=1 to reset).");
    return;
  }

  await prisma.attendanceRecord.deleteMany();
  await prisma.message.deleteMany();
  await prisma.boardPost.deleteMany();
  await prisma.event.deleteMany();
  await prisma.member.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("demo1234", 10);

  const coach = await prisma.user.create({
    data: {
      email: "demo@ymt-works.jp",
      name: "谷許（コーチ）",
      passwordHash,
      role: "coach",
    },
  });

  const team = await prisma.team.create({
    data: { name: "青葉 FC U-15" },
  });

  const members = await Promise.all(
    [
      { name: "佐藤 蓮", role: "FW" },
      { name: "鈴木 陽翔", role: "MF" },
      { name: "高橋 蒼", role: "DF" },
      { name: "デモ選手", role: "GK" },
      { name: "伊藤 結", role: "MF" },
      { name: "渡辺 海", role: "DF" },
    ].map((m) =>
      prisma.member.create({
        data: { ...m, teamId: team.id },
      })
    )
  );

  const now = new Date();
  const day = (offset: number, hour: number, minute = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() + offset);
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  const events = await Promise.all([
    prisma.event.create({
      data: {
        teamId: team.id,
        title: "土曜練習",
        type: EventType.PRACTICE,
        startsAt: day(2, 9),
        endsAt: day(2, 11),
        place: "青葉グラウンド A面",
        note: "ビブス持参。水分補給をこまめに。",
      },
    }),
    prisma.event.create({
      data: {
        teamId: team.id,
        title: "練習試合 vs 緑ヶ丘",
        type: EventType.MATCH,
        startsAt: day(4, 13, 30),
        endsAt: day(4, 15, 30),
        place: "市営スポーツ公園 第2ピッチ",
        note: "集合後にアップ 20 分。保護者の送迎協力お願いします。",
      },
    }),
    prisma.event.create({
      data: {
        teamId: team.id,
        title: "保護者ミーティング",
        type: EventType.MEETING,
        startsAt: day(6, 20),
        endsAt: day(6, 20, 40),
        place: "オンライン（Zoom）",
        note: "夏合宿の日程案を共有します。",
      },
    }),
  ]);

  for (const event of events) {
    for (const [index, member] of members.entries()) {
      let status: AttendanceStatus = AttendanceStatus.UNANSWERED;
      if (index === 0 || index === 1 || index === 4) status = AttendanceStatus.PRESENT;
      if (index === 2) status = AttendanceStatus.ABSENT;
      await prisma.attendanceRecord.create({
        data: {
          eventId: event.id,
          memberId: member.id,
          status,
        },
      });
    }
  }

  await prisma.message.createMany({
    data: [
      {
        teamId: team.id,
        authorId: coach.id,
        body: "今週の練習は通常どおり 9:00 開始です。遅刻しそうな場合は連絡ください。",
        createdAt: day(-1, 18),
      },
      {
        teamId: team.id,
        authorId: coach.id,
        body: "試合の集合場所は第2ピッチ入口です。ボールを忘れずに。",
        createdAt: day(-1, 19),
      },
    ],
  });

  await prisma.boardPost.createMany({
    data: [
      {
        teamId: team.id,
        category: "お知らせ",
        title: "夏合宿の候補日",
        body: "8/10–12 または 8/17–19 で調整中です。希望を連絡チャンネルへ。",
      },
      {
        teamId: team.id,
        category: "資料",
        title: "練習メニュー（PDF 想定）",
        body: "ウォームアップ → パス回し → ミニゲーム。詳細はチーム共有フォルダを参照。",
      },
      {
        teamId: team.id,
        category: "会場",
        title: "雨天時の振替先",
        body: "屋内フットサルコート（青葉スポーツセンター 第3）。連絡は当日朝 7:00。",
      },
    ],
  });

  console.log("Seed completed.");
  console.log("Demo login: demo@ymt-works.jp / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
