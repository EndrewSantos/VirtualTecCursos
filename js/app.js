document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     NAVEGAÇÃO
  ========================== */
  const menuItems = document.querySelectorAll(".menu-item");
  const pages = document.querySelectorAll(".page");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    menuItems.forEach(i => i.classList.remove("active"));
    document.querySelector(`[data-page="${id}"]`).classList.add("active");
  }

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      showPage(item.dataset.page);
    });
  });


  /* =========================
     LOGIN
  ========================== */
  const loginBtn = document.getElementById("login-btn");
  const loginUser = document.getElementById("login-user");
  const loginStatus = document.getElementById("login-status");
  const profileInfo = document.getElementById("profile-info");

  function updateProfile() {
    const user = localStorage.getItem("user");
    loginStatus.textContent = user ? "Logado como " + user : "Não logado";
    profileInfo.textContent = user ? "Usuário: " + user : "Faça login.";
  }

  loginBtn.addEventListener("click", () => {
    const user = loginUser.value.trim();
    if (!user) return;
    localStorage.setItem("user", user);
    updateProfile();
  });

  updateProfile();


  /* =========================
     CURSOS + TRILHA
  ========================== */

  const courses = {
    html: 5,
    logica: 5,
    excel: 5,
    marketing: 5
  };

  let currentCourse = null;

  const lessonList = document.getElementById("lesson-list");
  const trailTitle = document.getElementById("trail-title");
  const startBtn = document.getElementById("start-course-btn");

  function renderTrail(courseId) {
    currentCourse = courseId;

    const total = courses[courseId];
    const progress = parseInt(localStorage.getItem(courseId)) || 0;

    trailTitle.textContent = courseId.toUpperCase();
    lessonList.innerHTML = "";
    startBtn.classList.remove("hidden");

    if (progress === 0) {
      startBtn.textContent = "Começar";
    } else if (progress < total) {
      startBtn.textContent = "Continuar";
    } else {
      startBtn.textContent = "Finalizado";
    }

    for (let i = 1; i <= total; i++) {
      const div = document.createElement("div");
      div.classList.add("lesson-item");

      if (i <= progress) {
        div.classList.add("completed");
      }

      div.innerHTML = `
        <span>Aula ${i}</span>
        <span>${i <= progress ? "✔" : ""}</span>
      `;

      lessonList.appendChild(div);
    }
  }

  // clique no card → só renderiza trilha
  document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", () => {
      renderTrail(card.dataset.course);
    });
  });


  /* =========================
     MODAL
  ========================== */

  function openCourse(id) {
    const saved = parseInt(localStorage.getItem(id)) || 0;
    const total = courses[id];

    document.getElementById("course-title").textContent = id.toUpperCase();
    document.getElementById("progress-bar").style.width =
      (saved / total) * 100 + "%";
    document.getElementById("progress-text").textContent =
      saved + "/" + total;

    document.getElementById("course-panel").classList.remove("hidden");
  }

  // botão Começar / Continuar
  startBtn.addEventListener("click", () => {
    if (!currentCourse) return;
    openCourse(currentCourse);
  });

  // botão Continuar dentro do modal
  document.getElementById("continue-btn").addEventListener("click", () => {
    if (!currentCourse) return;

    let progress = parseInt(localStorage.getItem(currentCourse)) || 0;

    if (progress < courses[currentCourse]) {
      progress++;
      localStorage.setItem(currentCourse, progress);
    }

    renderTrail(currentCourse);
    openCourse(currentCourse);
  });

  document.getElementById("close-course")
    .addEventListener("click", () =>
      document.getElementById("course-panel").classList.add("hidden")
    );


  /* =========================
     ASSINATURA
  ========================== */

  const renewBtn = document.getElementById("renew-btn");
  const chartFill = document.querySelector(".chart-fill");
  const renewDateText = document.getElementById("renew-date");
  const historyList = document.getElementById("history-list");

  const CIRC = 440;

  function updateSubscription() {
    const sub = JSON.parse(localStorage.getItem("subscription"));
    if (!sub) return;

    const now = new Date();
    const renew = new Date(sub.renewal);
    const total = 30 * 24 * 60 * 60 * 1000;
    const elapsed = now - new Date(sub.start);
    const progress = Math.min(elapsed / total, 1);

    chartFill.style.strokeDashoffset =
      CIRC - (CIRC * progress);

    renewDateText.textContent =
      renew.toLocaleDateString();

    historyList.innerHTML = "";
    sub.history.forEach(h => {
      const li = document.createElement("li");
      li.textContent = h;
      historyList.appendChild(li);
    });
  }

  renewBtn.addEventListener("click", () => {
    const now = new Date();
    const renewal = new Date();
    renewal.setMonth(renewal.getMonth() + 1);

    const sub = {
      start: now.toISOString(),
      renewal: renewal.toISOString(),
      history: [now.toLocaleDateString()]
    };

    localStorage.setItem("subscription", JSON.stringify(sub));
    updateSubscription();
  });

  updateSubscription();

});
