document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // NAVEGAÇÃO
  // =====================================
  const menuItems = document.querySelectorAll(".menu-item");
  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageId)?.classList.add("active");

    menuItems.forEach(item => item.classList.remove("active"));
    document.querySelector(`[data-page="${pageId}"]`)?.classList.add("active");
  }

  menuItems.forEach(item => {
    item.onclick = () => {
      const page = item.dataset.page;
      if (page) showPage(page);
    };
  });


  // =====================================
  // LOGIN
  // =====================================
  const loginBtn = document.getElementById("login-btn");
  const loginUser = document.getElementById("login-user");
  const loginStatus = document.getElementById("login-status");
  const profileInfo = document.getElementById("profile-info");

  let currentUser = localStorage.getItem("user") || null;

  function updateProfile() {
    if (currentUser) {
      loginStatus.innerText = `Logado como ${currentUser}`;
      profileInfo.innerText = `Usuário: ${currentUser}`;
    } else {
      loginStatus.innerText = "Não logado";
      profileInfo.innerText = "Faça login para ver seu perfil.";
    }
  }

  if (loginBtn) {
    loginBtn.onclick = () => {
      const user = loginUser.value.trim();
      if (!user) return;

      currentUser = user;
      localStorage.setItem("user", user);
      updateProfile();
      alert("Login realizado!");
    };
  }

  updateProfile();


  // =====================================
  // TESTE GRÁTIS (7 DIAS)
  // =====================================
  const trialBtn = document.getElementById("trial-btn");
  const trialStatus = document.querySelector(".trial-status");

  const TRIAL_KEY = "trial_start";
  const TRIAL_DAYS = 7;

  function getTrialDaysLeft() {
    const start = localStorage.getItem(TRIAL_KEY);
    if (!start) return TRIAL_DAYS;

    const diff = Math.floor((new Date() - new Date(start)) / (1000 * 60 * 60 * 24));
    return Math.max(TRIAL_DAYS - diff, 0);
  }

  function updateTrialUI() {
    if (!trialStatus || !trialBtn) return;

    const daysLeft = getTrialDaysLeft();

    if (daysLeft > 0) {
      trialStatus.innerText = `Teste ativo. ${daysLeft} dias restantes.`;
      trialBtn.disabled = false;
    } else {
      trialStatus.innerText = "Teste expirado.";
      trialBtn.disabled = true;
    }
  }

  if (trialBtn) {
    trialBtn.onclick = () => {
      localStorage.setItem(TRIAL_KEY, new Date().toISOString());
      alert("Teste iniciado!");
      updateTrialUI();
    };
  }

  updateTrialUI();


  // =====================================
  // ASSINATURA COM GRÁFICO
  // =====================================
  const renewBtn = document.getElementById("renew-btn");
  const chartFill = document.querySelector(".chart-fill");
  const renewDateText = document.getElementById("renew-date");
  const historyList = document.getElementById("history-list");

  const SUB_KEY = "subscription";
  const SUB_DAYS = 30;
  const ALERT_BEFORE = 5;
  const CIRCUMFERENCE = 440;

  function loadSubscription() {
    return JSON.parse(localStorage.getItem(SUB_KEY)) || null;
  }

  function saveSubscription(data) {
    localStorage.setItem(SUB_KEY, JSON.stringify(data));
  }

  function getRenewalDate(start) {
    const d = new Date(start);
    d.setMonth(d.getMonth() + 1);
    return d;
  }

  function renderHistory(history = []) {
    if (!historyList) return;

    historyList.innerHTML = "";
    history.forEach(item => {
      const li = document.createElement("li");
      li.innerText = `Renovado em: ${item}`;
      historyList.appendChild(li);
    });
  }

  function updateSubscriptionUI() {
    if (!renewBtn || !chartFill || !renewDateText) return;

    const sub = loadSubscription();

    if (!sub) {
      renewBtn.innerText = "Assinar";
      renewBtn.disabled = false;
      renewDateText.innerText = "Sem assinatura";
      chartFill.style.strokeDashoffset = CIRCUMFERENCE;
      renderHistory([]);
      return;
    }

    const now = new Date();
    const renew = new Date(sub.renewal);

    const totalTime = SUB_DAYS * 24 * 60 * 60 * 1000;
    const elapsed = now - new Date(sub.start);
    const progress = Math.min(elapsed / totalTime, 1);

    chartFill.style.strokeDashoffset =
      CIRCUMFERENCE - (CIRCUMFERENCE * progress);

    renewDateText.innerText = renew.toLocaleDateString();

    const daysLeft = Math.ceil((renew - now) / (1000 * 60 * 60 * 24));

    if (daysLeft <= ALERT_BEFORE) {
      renewBtn.innerText = "Renovar";
      renewBtn.disabled = false;
    } else {
      renewBtn.innerText = `Renova em ${daysLeft} dias`;
      renewBtn.disabled = true;
    }

    renderHistory(sub.history || []);
  }

  if (renewBtn) {
    renewBtn.onclick = () => {
      const now = new Date();
      const renewal = getRenewalDate(now);

      let sub = loadSubscription() || { history: [] };

      sub.start = now.toISOString();
      sub.renewal = renewal.toISOString();
      sub.history = sub.history || [];
      sub.history.unshift(now.toLocaleDateString());

      saveSubscription(sub);

      alert("Assinatura ativada!");
      updateSubscriptionUI();
    };
  }

  updateSubscriptionUI();


  // =====================================
  // CURSOS E PROGRESSO
  // =====================================
  const courses = {
    html: { title: "HTML e CSS", modules: 5 },
    logica: { title: "Lógica de Programação", modules: 5 }
  };

  let currentCourse = null;

  function openCourse(id) {
    currentCourse = id;

    const panel = document.getElementById("course-panel");
    const title = document.getElementById("course-title");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    const saved = parseInt(localStorage.getItem(id)) || 0;
    const total = courses[id].modules;

    title.innerText = courses[id].title;
    progressBar.style.width = `${(saved / total) * 100}%`;
    progressText.innerText = `Progresso: ${saved}/${total}`;

    panel.classList.remove("hidden");
  }

  function closeCourse() {
    document.getElementById("course-panel")?.classList.add("hidden");
  }

  document.querySelectorAll(".course-card").forEach(card => {
    card.onclick = () => openCourse(card.dataset.course);
  });

  document.getElementById("continue-btn")?.addEventListener("click", () => {
    if (!currentCourse) return;

    let progress = parseInt(localStorage.getItem(currentCourse)) || 0;
    const total = courses[currentCourse].modules;

    if (progress >= total) {
      localStorage.removeItem(currentCourse);
      closeCourse();
      return;
    }

    progress++;
    localStorage.setItem(currentCourse, progress);
    openCourse(currentCourse);
  });

  document.getElementById("close-course")?.addEventListener("click", closeCourse);

});
