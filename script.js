const content = document.getElementById("content");
const music = document.getElementById("music");
const screenPhoto = document.getElementById("screenPhoto");

const screenPhotos = {
  intro: null,
  song: "music.png",
  question: null,
  calendar: "day.png",
  time: "time.png",
  ice: null,
  final: "final.png",
};

let selectedDate = "";
let selectedTime = "";
let selectedActivity = "";
let noButtonMoveHandler = null;

// Вставь сюда URL Google Apps Script Web App после публикации скрипта.
const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyvdZEppKk8ppL3MLcp26e7Czzc6iPWejHuZfz1RdQC9VyEe5XReORqnt3EYF1hqfuv/exec";

// IP можно получить только через внешний сервис или на сервере.
// Здесь используется прозрачный best-effort запрос к ipify; при ошибке сайт продолжит работать.
const COLLECT_PUBLIC_IP = true;

let isSubmittingDatePlan = false;
let hasSubmittedDatePlan = false;

const calendarYear = 2026;
const calendarMonth = 10;

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const notSundayHints = [
  "Хороший день... но воскресенье будто создано для свидания.",
  "Можно и так, но воскресенье звучит романтичнее.",
  "Хмм... а если подумать сердцем, то оно шепчет: воскресенье.",
  "Этот день неплохой, но воскресенье уже нарядилось для нас.",
  "Я записал... но воскресенье немного ревнует.",
  "Судьба, кажется, показывает пальчиком на воскресенье.",
];

const sundayHints = [
  "Вот это выбор! Воскресенье одобрено сердечком.",
  "Да! Именно воскресенье звучит как идеальный план.",
  "Ну всё, календарь счастлив, я тоже.",
];

const activities = [
  { name: "Боулинг", icon: "🎳" },
  { name: "Каток", icon: "⛸️" },
  { name: "Бильярд", icon: "🎱" },
  { name: "Прогулка в парке", icon: "🌳" },
  { name: "Покататься на горках", icon: "🎢" },
  { name: "Сходить в кино", icon: "🎬" },
  { name: "Поорать в караоке", icon: "🎤" },
  { name: "Прогулка по городу", icon: "🏙️" },
  { name: "Свой вариант...", icon: "💡", custom: true },
];

const times = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

showScreen("intro");

/* ========================= */

function showScreen(id) {
  updateScreenPhoto(id);

  if (noButtonMoveHandler) {
    document.removeEventListener("mousemove", noButtonMoveHandler);
    document.removeEventListener("click", noButtonMoveHandler);
    document.removeEventListener("touchstart", noButtonMoveHandler);
    noButtonMoveHandler = null;
  }

  const template = document.getElementById(id);
  const card = document.getElementById("card");

  card.dataset.screen = id;

  content.innerHTML = "";
  content.appendChild(template.content.cloneNode(true));

  card.scrollTop = 0;

  card.classList.remove("show");
  void card.offsetWidth;
  card.classList.add("show");

  bindScreen(id);
}

/* ========================= */

function updateScreenPhoto(id) {
  if (!screenPhoto) {
    return;
  }

  const fileName = screenPhotos[id];

  screenPhoto.className = `screen-photo screen-photo--${id}`;

  if (!fileName) {
    screenPhoto.removeAttribute("src");
    screenPhoto.classList.add("screen-photo--hidden");
    return;
  }

  screenPhoto.src = `./assets/images/${fileName}`;
  screenPhoto.classList.remove("screen-photo--hidden");
}

/* ========================= */

function bindScreen(id) {
  switch (id) {
    case "intro":
      bindIntro();
      break;

    case "song":
      bindSong();
      break;

    case "question":
      bindQuestion();
      break;

    case "calendar":
      buildCalendar();
      break;

    case "time":
      buildTime();
      break;

    case "ice":
      buildIce();
      break;

    case "final":
      buildFinal();
      break;
  }
}

/* ========================= */

function bindIntro() {
  const btn = document.querySelector("[data-next]");

  btn.onclick = () => {
    music.volume = 0;

    try {
      music.currentTime = 0;
    } catch (err) {
      console.log(err);
    }

    music.play().catch((err) => {
      console.log(err);
    });

    fadeMusic();
    hearts(8);
    showScreen("song");
  };
}

/* ========================= */

function bindSong() {
  const btn = document.querySelector("[data-next]");

  btn.onclick = () => {
    hearts(8);
    showScreen("question");
  };
}

/* ========================= */

function bindQuestion() {
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");

  yes.onclick = () => {
    hearts(10);

    setTimeout(() => {
      showScreen("calendar");
    }, 500);
  };

  const texts = [
    "Нет",
    "Неа",
    "Не получится",
    "Слишком медленно",
    "Почти поймала",
    "А вот и нет",
    "Даже не пытайся",
  ];

  let index = 0;
  let isFlying = false;

  function getPointer(event) {
    const touch = event.touches?.[0] || event.changedTouches?.[0];

    return {
      x: touch ? touch.clientX : (event.clientX ?? window.innerWidth / 2),
      y: touch ? touch.clientY : (event.clientY ?? window.innerHeight / 2),
    };
  }

  function activateFlyingMode() {
    if (isFlying) {
      return;
    }

    const rect = no.getBoundingClientRect();

    no.classList.add("no-is-flying");

    no.style.left = rect.left + "px";
    no.style.top = rect.top + "px";
    // no.style.width = rect.width + "px";

    isFlying = true;
  }

  function getRandomPositionAwayFromPointer(pointerX, pointerY) {
    const padding = 30;

    const btnWidth = no.offsetWidth;
    const btnHeight = no.offsetHeight;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    let bestX = padding;
    let bestY = padding;
    let bestDistance = 0;

    for (let i = 0; i < 30; i++) {
      const x = padding + Math.random() * Math.max(1, maxX - padding);
      const y = padding + Math.random() * Math.max(1, maxY - padding);

      const centerX = x + btnWidth / 2;
      const centerY = y + btnHeight / 2;

      const distance = Math.hypot(centerX - pointerX, centerY - pointerY);

      if (distance > bestDistance) {
        bestDistance = distance;
        bestX = x;
        bestY = y;
      }
    }

    return {
      x: bestX,
      y: bestY,
    };
  }

  function moveNo(
    pointerX = window.innerWidth / 2,
    pointerY = window.innerHeight / 2,
  ) {
    const firstMove = !isFlying;

    activateFlyingMode();

    const runMove = () => {
      const position = getRandomPositionAwayFromPointer(pointerX, pointerY);

      no.style.left = position.x + "px";
      no.style.top = position.y + "px";

      no.innerHTML = texts[index];

      no.style.transform = `
        rotate(${Math.random() * 28 - 14}deg)
        scale(${0.95 + Math.random() * 0.12})
      `;

      index++;

      if (index >= texts.length) {
        index = 0;
      }
    };

    if (firstMove) {
      requestAnimationFrame(runMove);
    } else {
      runMove();
    }
  }

  function evadeNo(event) {
    if (event.cancelable) {
      event.preventDefault();
    }

    const pointer = getPointer(event);

    moveNo(pointer.x, pointer.y);
  }

  no.addEventListener("pointerenter", evadeNo);

  noButtonMoveHandler = (event) => {
    if (!isFlying) {
      return;
    }

    const pointer = getPointer(event);
    const rect = no.getBoundingClientRect();

    const noCenterX = rect.left + rect.width / 2;
    const noCenterY = rect.top + rect.height / 2;

    const distance = Math.hypot(pointer.x - noCenterX, pointer.y - noCenterY);

    if (distance < 190) {
      moveNo(pointer.x, pointer.y);
    }
  };

  document.addEventListener("mousemove", noButtonMoveHandler);
}

/* ========================= */

function buildCalendar() {
  const grid = document.getElementById("calendarGrid");
  const text = document.getElementById("calendarText");
  const title = document.getElementById("calendarTitle");
  const choice = document.getElementById("calendarChoice");

  grid.innerHTML = "";
  choice.innerHTML = "";

  title.innerHTML = `${monthNames[calendarMonth]} ${calendarYear}`;

  weekDays.forEach((dayName) => {
    const weekday = document.createElement("div");

    weekday.className = "weekday";
    weekday.innerHTML = dayName;

    grid.appendChild(weekday);
  });

  const firstDay = new Date(calendarYear, calendarMonth, 1);
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  let startDay = firstDay.getDay();

  startDay = startDay === 0 ? 6 : startDay - 1;

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");

    empty.className = "day empty";

    grid.appendChild(empty);
  }

  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
    const day = document.createElement("div");

    const date = new Date(calendarYear, calendarMonth, dayNumber);
    const isSunday = date.getDay() === 0;

    day.className = "day";
    day.dataset.day = dayNumber;

    if (isSunday) {
      day.classList.add("sunday");
    }

    day.innerHTML = dayNumber;

    day.onclick = () => {
      document.querySelectorAll(".day").forEach((item) => {
        item.classList.remove("selected", "best");
      });

      day.classList.add("selected");

      selectedDate = `${dayNumber} ноября ${calendarYear}`;

      if (isSunday) {
        day.classList.add("best");

        const randomText =
          sundayHints[Math.floor(Math.random() * sundayHints.length)];

        text.innerHTML = randomText;

        choice.innerHTML = `
          <div class="choiceButtons">
            <button id="confirmDate">Да, этот день ♥</button>
          </div>
        `;

        hearts(10);

        document.getElementById("confirmDate").onclick = () => {
          hearts(12);

          setTimeout(() => {
            showScreen("time");
          }, 500);
        };
      } else {
        const randomText =
          notSundayHints[Math.floor(Math.random() * notSundayHints.length)];

        text.innerHTML = randomText;

        choice.innerHTML = `
          <div class="choiceButtons">
            <button id="chooseSunday">Ладно, посмотрю воскресенье</button>
            <button id="confirmAnyDate">Нет, хочу ${dayNumber} число</button>
          </div>
        `;

        day.animate(
          [
            {
              transform: "translateX(-6px)",
            },
            {
              transform: "translateX(6px)",
            },
            {
              transform: "translateX(0)",
            },
          ],
          {
            duration: 250,
          },
        );

        document.getElementById("chooseSunday").onclick = () => {
          const nearestSunday = getNearestSunday(dayNumber);
          const sundayElement = document.querySelector(
            `.day.sunday[data-day="${nearestSunday}"]`,
          );

          if (sundayElement) {
            sundayElement.click();
          }
        };

        document.getElementById("confirmAnyDate").onclick = () => {
          text.innerHTML = `Окей, ${dayNumber} ноября тоже звучит мило.`;

          hearts(8);

          setTimeout(() => {
            showScreen("time");
          }, 700);
        };
      }
    };

    grid.appendChild(day);
  }
}

/* ========================= */

function getNearestSunday(dayNumber) {
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  let nearest = null;
  let bestDistance = Infinity;

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(calendarYear, calendarMonth, i);

    if (date.getDay() === 0) {
      const distance = Math.abs(i - dayNumber);

      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = i;
      }
    }
  }

  return nearest;
}

/* ========================= */

function buildTime() {
  const grid = document.getElementById("timeGrid");
  const customTimeInput = document.getElementById("customTimeInput");
  const customTimeButton = document.getElementById("customTimeButton");

  grid.innerHTML = "";

  const goToIce = (timeValue) => {
    selectedTime = timeValue;

    hearts(8);

    setTimeout(() => {
      showScreen("ice");
    }, 500);
  };

  times.forEach((time) => {
    const card = document.createElement("div");

    card.className = "time";
    card.innerHTML = time;

    card.onclick = () => {
      goToIce(time);
    };

    grid.appendChild(card);
  });

  if (customTimeInput && customTimeButton) {
    customTimeInput.value = "18:00";

    customTimeButton.onclick = () => {
      const value = customTimeInput.value;

      if (!value) {
        return;
      }

      goToIce(value);
    };

    customTimeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        customTimeButton.click();
      }
    });
  }
}

/* ========================= */

function buildIce() {
  const grid = document.getElementById("iceGrid");
  const customContainer = document.getElementById("customActivity");
  const customInput = document.getElementById("customActivityInput");
  const customButton = document.getElementById("customActivityButton");
  grid.innerHTML = "";

  function chooseActivity(name) {
    selectedActivity = name;
    hearts(10);
    setTimeout(() => showScreen("final"), 500);
  }

  activities.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "ice";
    const icon = document.createElement("span");
    icon.className = "activity-icon";
    icon.textContent = item.icon;
    icon.setAttribute("aria-hidden", "true");
    const name = document.createElement("span");
    name.textContent = item.name;
    card.append(icon, name);

    card.onclick = () => {
      if (item.custom) {
        customContainer.hidden = false;
        customInput.focus();
      } else {
        chooseActivity(item.name);
      }
    };
    grid.appendChild(card);
  });

  const submitCustom = () => {
    const value = customInput.value.trim();
    if (!value) {
      customInput.focus();
      return;
    }
    chooseActivity(value);
  };
  customButton.onclick = submitCustom;
  customInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitCustom();
  });
}

/* ========================= */

function buildFinal() {
  document.getElementById("finalTime").innerHTML = selectedTime;

  hearts(16);
  sendToGoogleSheets();

  setTimeout(() => {
    finalMessage();
  }, 1500);
}

/* ========================= */

function finalMessage() {
  const card = document.getElementById("content");

  const div = document.createElement("div");

  div.className = "final-details";

  div.innerHTML = `
    <p>
      Отлично.
      <br><br>
      <b>Дата:</b> ${selectedDate}
      <br>
      <b>Время:</b> ${selectedTime}
      <br>
      <b>План:</b> ${selectedActivity}
      <br><br>
      С тебя хорошее настроение, остальное беру на себя
    </p>
  `;

  card.appendChild(div);
}

/* ========================= */

function buildDatePlanPayload(ipInfo = {}) {
  const now = new Date();
  const screenSize = `${window.screen.width}x${window.screen.height}`;
  const viewportSize = `${window.innerWidth}x${window.innerHeight}`;

  return {
    received_at_client: now.toISOString(),
    selected_date: selectedDate,
    selected_time: selectedTime,
    selected_ice: selectedActivity,
    page_url: window.location.href,
    referrer: document.referrer || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    timezone_offset_minutes: String(now.getTimezoneOffset()),
    language: navigator.language || "",
    languages: Array.isArray(navigator.languages)
      ? navigator.languages.join(", ")
      : "",
    user_agent: navigator.userAgent || "",
    platform: navigator.platform || "",
    screen: screenSize,
    viewport: viewportSize,
    device_pixel_ratio: String(window.devicePixelRatio || 1),
    public_ip: ipInfo.public_ip || "",
    ip_lookup_error: ipInfo.ip_lookup_error || "",
    consent_notice:
      "Пользователь видел уведомление на первом экране: ответ, IP и базовые технические данные будут сохранены.",
  };
}

async function getPublicIpInfo() {
  if (!COLLECT_PUBLIC_IP) {
    return {};
  }

  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`IP service HTTP ${response.status}`);
    }

    const data = await response.json();

    return {
      public_ip: data.ip || "",
    };
  } catch (err) {
    console.log("Не удалось получить публичный IP", err);

    return {
      public_ip: "",
      ip_lookup_error: err && err.message ? err.message : "unknown error",
    };
  }
}

async function sendToGoogleSheets() {
  if (hasSubmittedDatePlan || isSubmittingDatePlan) {
    return;
  }

  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    console.info("Google Sheets URL не задан. Ответ не отправлен.");
    return;
  }

  isSubmittingDatePlan = true;

  try {
    const ipInfo = await getPublicIpInfo();
    const payload = buildDatePlanPayload(ipInfo);

    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    hasSubmittedDatePlan = true;
    console.info("Ответ отправлен в Google Sheets.");
  } catch (err) {
    console.log("Не удалось отправить ответ в Google Sheets", err);
  } finally {
    isSubmittingDatePlan = false;
  }
}

/* ========================= */

function hearts(count) {
  const container = document.getElementById("hearts");

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");

      heart.className = "heart";

      heart.innerHTML = `
        <svg class="heartSvg">
          <use href="#icon-heart"></use>
        </svg>
      `;

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.bottom = "0";

      const size = 24 + Math.random() * 18;

      heart.style.width = size + "px";
      heart.style.height = size + "px";

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2400);
    }, i * 90);
  }
}

/* ========================= */

function fadeMusic() {
  let volume = 0;

  const timer = setInterval(() => {
    volume += 0.02;

    if (volume >= 0.35) {
      volume = 0.35;
      clearInterval(timer);
    }

    music.volume = volume;
  }, 80);
}
