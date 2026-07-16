(() => {
  const viewMeta = {
    schedule: { eyebrow: "Schedule", title: "今週の予定" },
    attendance: { eyebrow: "Attendance", title: "出欠確認" },
    messages: { eyebrow: "Messages", title: "チーム連絡" },
    board: { eyebrow: "Board", title: "情報共有" },
  };

  const initialEvents = [
    {
      id: "e1",
      title: "土曜練習",
      type: "練習",
      when: "7/19（土） 9:00–11:00",
      place: "青葉グラウンド A面",
      note: "ビブス持参。水分補給をこまめに。",
    },
    {
      id: "e2",
      title: "練習試合 vs 緑ヶ丘",
      type: "試合",
      when: "7/21（月・祝） 13:30 集合",
      place: "市営スポーツ公園 第2ピッチ",
      note: "集合後にアップ 20 分。保護者の送迎協力お願いします。",
    },
    {
      id: "e3",
      title: "保護者ミーティング",
      type: "連絡",
      when: "7/23（水） 20:00–20:40",
      place: "オンライン（Zoom）",
      note: "夏合宿の日程案を共有します。",
    },
  ];

  const initialMembers = [
    { id: "m1", name: "佐藤 蓮", role: "FW", status: "出席", interactive: false },
    { id: "m2", name: "鈴木 陽翔", role: "MF", status: "出席", interactive: false },
    { id: "m3", name: "高橋 蒼", role: "DF", status: "欠席", interactive: false },
    { id: "m4", name: "あなた（デモ）", role: "GK", status: "未回答", interactive: true },
  ];

  const initialMessages = [
    {
      id: "msg1",
      author: "谷許（コーチ）",
      time: "昨日 18:20",
      body: "明日の練習は予定どおり実施します。熱中症対策のため休憩を多めに取ります。",
    },
    {
      id: "msg2",
      author: "佐藤 保護者",
      time: "昨日 19:05",
      body: "承知しました。水分は多めに持たせます。",
    },
  ];

  const boardItems = [
    {
      type: "お知らせ",
      title: "夏合宿 候補日",
      body: "8/9–8/11 または 8/16–8/18。出欠アンケートを週末までに集計します。",
    },
    {
      type: "資料",
      title: "練習メニュー（PDF）",
      body: "パス回し → ミニゲーム → セットプレー確認。印刷して持参可。",
    },
    {
      type: "会場",
      title: "雨天時の振替先",
      body: "屋内フットサルコート（青葉スポーツセンター 第3）。連絡は当日朝 7:00。",
    },
  ];

  const state = {
    events: structuredClone(initialEvents),
    members: structuredClone(initialMembers),
    messages: structuredClone(initialMessages),
    selectedEventId: "e1",
  };

  const els = {
    eyebrow: document.getElementById("view-eyebrow"),
    title: document.getElementById("view-title"),
    navButtons: [...document.querySelectorAll(".nav-btn")],
    panels: {
      schedule: document.getElementById("panel-schedule"),
      attendance: document.getElementById("panel-attendance"),
      messages: document.getElementById("panel-messages"),
      board: document.getElementById("panel-board"),
    },
    eventList: document.getElementById("event-list"),
    eventDetail: document.getElementById("event-detail"),
    attendanceLabel: document.getElementById("attendance-event-label"),
    attendanceStats: document.getElementById("attendance-stats"),
    memberList: document.getElementById("member-list"),
    messageThread: document.getElementById("message-thread"),
    messageForm: document.getElementById("message-form"),
    messageInput: document.getElementById("message-input"),
    boardGrid: document.getElementById("board-grid"),
    resetDemo: document.getElementById("reset-demo"),
  };

  const switchView = (view) => {
    const meta = viewMeta[view];
    if (!meta) return;

    els.eyebrow.textContent = meta.eyebrow;
    els.title.textContent = meta.title;

    els.navButtons.forEach((btn) => {
      const active = btn.dataset.view === view;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    Object.entries(els.panels).forEach(([key, panel]) => {
      const active = key === view;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  };

  const renderEvents = () => {
    els.eventList.innerHTML = "";
    state.events.forEach((event) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `event${event.id === state.selectedEventId ? " is-selected" : ""}`;
      btn.setAttribute("role", "listitem");
      btn.innerHTML = `
        <div class="event__row">
          <p class="event__title">${event.title}</p>
          <span class="tag${event.type === "試合" ? " tag--match" : ""}">${event.type}</span>
        </div>
        <p class="event__meta">${event.when} ／ ${event.place}</p>
      `;
      btn.addEventListener("click", () => {
        state.selectedEventId = event.id;
        renderEvents();
        renderEventDetail();
        els.attendanceLabel.textContent = `${event.title}（${event.when.split(" ")[0]}）`;
      });
      els.eventList.appendChild(btn);
    });
  };

  const renderEventDetail = () => {
    const event = state.events.find((item) => item.id === state.selectedEventId);
    if (!event) {
      els.eventDetail.innerHTML = "<p>予定を選択してください。</p>";
      return;
    }
    els.eventDetail.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>日時:</strong> ${event.when}</p>
      <p><strong>場所:</strong> ${event.place}</p>
      <p><strong>メモ:</strong> ${event.note}</p>
    `;
  };

  const countByStatus = (status) =>
    state.members.filter((member) => member.status === status).length;

  const renderAttendance = () => {
    els.attendanceStats.innerHTML = `
      <div class="stat"><strong>${countByStatus("出席")}</strong><span>出席</span></div>
      <div class="stat"><strong>${countByStatus("欠席")}</strong><span>欠席</span></div>
      <div class="stat"><strong>${countByStatus("未回答")}</strong><span>未回答</span></div>
    `;

    els.memberList.innerHTML = "";
    state.members.forEach((member) => {
      const li = document.createElement("li");
      li.className = "member";
      li.innerHTML = `
        <div>
          <p class="member__name">${member.name}</p>
          <p class="member__role">${member.role}</p>
        </div>
      `;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "status-btn";
      button.dataset.status = member.status;
      button.textContent = member.status;
      if (member.interactive) {
        button.setAttribute("aria-label", `${member.name}の出欠を切り替える`);
        button.addEventListener("click", () => {
          const order = ["未回答", "出席", "欠席"];
          const next = order[(order.indexOf(member.status) + 1) % order.length];
          member.status = next;
          renderAttendance();
        });
      } else {
        button.disabled = true;
        button.title = "デモ用の固定データです";
      }
      li.appendChild(button);
      els.memberList.appendChild(li);
    });
  };

  const renderMessages = () => {
    els.messageThread.innerHTML = "";
    state.messages.forEach((message) => {
      const article = document.createElement("article");
      article.className = "message";
      article.innerHTML = `
        <div class="message__head">
          <span class="message__author">${message.author}</span>
          <time>${message.time}</time>
        </div>
        <p>${message.body}</p>
      `;
      els.messageThread.appendChild(article);
    });
  };

  const renderBoard = () => {
    els.boardGrid.innerHTML = boardItems
      .map(
        (item) => `
      <article class="board-item">
        <p class="board-item__type">${item.type}</p>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </article>
    `
      )
      .join("");
  };

  const resetState = () => {
    state.events = structuredClone(initialEvents);
    state.members = structuredClone(initialMembers);
    state.messages = structuredClone(initialMessages);
    state.selectedEventId = "e1";
    els.messageInput.value = "";
    renderAll();
    switchView("schedule");
  };

  const renderAll = () => {
    renderEvents();
    renderEventDetail();
    renderAttendance();
    renderMessages();
    renderBoard();
    const selected = state.events.find((item) => item.id === state.selectedEventId);
    if (selected) {
      els.attendanceLabel.textContent = `${selected.title}（${selected.when.split(" ")[0]}）`;
    }
  };

  els.navButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  els.messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const body = els.messageInput.value.trim();
    if (!body) return;
    const now = new Date();
    const time = `今日 ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    state.messages.push({
      id: `msg-${Date.now()}`,
      author: "あなた（デモ）",
      time,
      body,
    });
    els.messageInput.value = "";
    renderMessages();
    els.messageThread.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  els.resetDemo.addEventListener("click", resetState);

  renderAll();
  switchView("schedule");
})();
