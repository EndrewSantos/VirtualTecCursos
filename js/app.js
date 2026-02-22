document.addEventListener("DOMContentLoaded", () => {

  // === NAVEGAÇÃO ===
  const menuItems = document.querySelectorAll(".menu-item");
  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    menuItems.forEach(item => item.classList.remove("active"));
    document.querySelector(`[data-page="${pageId}"]`).classList.add("active");
  }

  menuItems.forEach(item => {
    item.onclick = () => {
      const page = item.dataset.page;
      if (page) showPage(page);
    };
  });

  // === LOGIN (localStorage) ===
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

  loginBtn.onclick = () => {
    const user = loginUser.value;
    if (!user) return;

    currentUser = user;
    localStorage.setItem("user", user);
    updateProfile();
    alert("Login realizado!");
  };

  updateProfile();

  // === TESTE GRÁTIS ===
  const trialBtn = document.getElementById("trial-btn");
  const trialStatus = document.querySelector(".trial-status");

  const TRIAL_KEY = "trial_start";
  const DAYS = 7;

  function getDaysLeft() {
    const start = localStorage.getItem(TRIAL_KEY);
    if (!start) return DAYS;

    const diff = Math.floor((new Date() - new Date(start)) / (1000*60*60*24));
    return Math.max(DAYS - diff, 0);
  }

  function updateTrial() {
    const days = getDaysLeft();

    if (days > 0) {
      trialStatus.innerText = `Teste ativo. ${days} dias restantes.`;
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
      updateTrial();
    };
  }

  updateTrial();

  // === CURSOS E PROGRESSO ===
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
    progressBar.style.width = `${(saved/total)*100}%`;
    progressText.innerText = `Progresso: ${saved}/${total}`;

    panel.classList.remove("hidden");
  }

  function closeCourse() {
    document.getElementById("course-panel").classList.add("hidden");
  }

  document.querySelectorAll(".course-card").forEach(card => {
    card.onclick = () => openCourse(card.dataset.course);
  });

  document.getElementById("continue-btn").onclick = () => {
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
  };
});document.addEventListener("DOMContentLoaded", () => {

  // === TESTE GRÁTIS (7 DIAS) ===
  const trialBtn = document.getElementById("trial-btn");
  const trialStatus = document.querySelector(".trial-status");

  const TRIAL_KEY = "trial_start";
  const DAYS = 7;

  function getTrialDaysLeft() {
    const start = localStorage.getItem(TRIAL_KEY);
    if (!start) return DAYS;

    const startDate = new Date(start);
    const now = new Date();
    const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

    return Math.max(DAYS - diff, 0);
  }

  function updateTrialUI() {
    const daysLeft = getTrialDaysLeft();

    if (daysLeft > 0) {
      trialStatus.innerText = `Teste grátis ativo. ${daysLeft} dias restantes.`;
      trialBtn.disabled = false;
    } else {
      trialStatus.innerText = "Teste expirado. Assine para continuar.";
      trialBtn.disabled = true;
    }
  }

  if (trialBtn) {
    trialBtn.onclick = () => {
      localStorage.setItem(TRIAL_KEY, new Date().toISOString());
      alert("Teste grátis iniciado! Você tem 7 dias.");
      updateTrialUI();
    };
  }

  updateTrialUI();

  // === NAVEGAÇÃO ENTRE PÁGINAS ===
  const menuItems = document.querySelectorAll(".menu-item");
  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    menuItems.forEach(item => item.classList.remove("active"));
    document.querySelector(`[data-page="${pageId}"]`).classList.add("active");
  }

  menuItems.forEach(item => {
    item.onclick = () => {
      const page = item.dataset.page;
      if (page) showPage(page);
    };
  });

  // === CURSOS GRATUITOS ===
  const courses = {
    excel: { title: "Excel Avançado", modules: [
      { name: "Introdução", desc: "Visão geral do Excel." },
      { name: "Fórmulas", desc: "PROCV e funções." },
      { name: "Tabelas Dinâmicas", desc: "Relatórios." },
      { name: "Dashboards", desc: "Gráficos." },
      { name: "Automação", desc: "VBA básico." }
    ]},

    logica: { title: "Lógica de Programação", modules: [
      { name: "Algoritmos", desc: "Fundamentos." },
      { name: "Variáveis", desc: "Tipos." },
      { name: "Condicionais", desc: "If e Else." },
      { name: "Loops", desc: "For e While." },
      { name: "Funções", desc: "Organização." }
    ]},

    html: { title: "HTML e CSS", modules: [
      { name: "Estrutura", desc: "Tags." },
      { name: "Estilização", desc: "CSS." },
      { name: "Flexbox", desc: "Layouts." },
      { name: "Grid", desc: "Colunas." },
      { name: "Responsividade", desc: "Media queries." }
    ]},

    marketing: { title: "Marketing Digital", modules: [
      { name: "Fundamentos", desc: "Conceitos." },
      { name: "Redes", desc: "Estratégias." },
      { name: "Tráfego", desc: "Anúncios." },
      { name: "Copywriting", desc: "Escrita." },
      { name: "Funil", desc: "Conversão." }
    ]}
  };

  let currentCourse = null;

  function openCourse(courseId) {
    currentCourse = courseId;

    const panel = document.getElementById("course-panel");
    const title = document.getElementById("course-title");
    const moduleList = document.getElementById("module-list");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const continueBtn = document.getElementById("continue-btn");

    const course = courses[courseId];
    const savedProgress = parseInt(localStorage.getItem(courseId)) || 0;

    title.innerText = course.title;
    moduleList.innerHTML = "";

    course.modules.forEach((module, index) => {
      const item = document.createElement("li");
      item.classList.add("module-item");

      const circle = document.createElement("div");
      circle.classList.add("module-circle");
      circle.innerText = index + 1;
      if (index < savedProgress) circle.classList.add("completed");

      const content = document.createElement("div");
      content.classList.add("module-content");

      const h4 = document.createElement("h4");
      h4.innerText = module.name;

      const p = document.createElement("p");
      p.innerText = module.desc;

      content.appendChild(h4);
      content.appendChild(p);

      item.appendChild(circle);
      item.appendChild(content);

      moduleList.appendChild(item);
    });

    const total = course.modules.length;
    const percentage = Math.floor((savedProgress / total) * 100);
    progressBar.style.width = percentage + "%";
    progressText.innerText = `Progresso: ${percentage}%`;

    continueBtn.innerText =
      savedProgress == 0 ? "Iniciar Curso" :
      savedProgress < total ? "Continuar" : "Finalizar";

    panel.classList.remove("hidden");
  }

  function closeCourse() {
    document.getElementById("course-panel").classList.add("hidden");
  }

  document.querySelectorAll(".course-card").forEach(card => {
    card.onclick = () => openCourse(card.dataset.course);
  });

  document.getElementById("continue-btn").onclick = () => {
    if (!currentCourse) return;

    let progress = parseInt(localStorage.getItem(currentCourse)) || 0;
    const total = courses[currentCourse].modules.length;

    if (progress >= total) {
      localStorage.removeItem(currentCourse);
      closeCourse();
      return;
    }

    progress++;
    localStorage.setItem(currentCourse, progress);
    openCourse(currentCourse);
  };
});
