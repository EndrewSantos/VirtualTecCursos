document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // NAVEGAÇÃO
  // =========================
  var menuItems = document.querySelectorAll(".menu-item");
  var pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach(function (p) {
      p.classList.remove("active");
    });

    var page = document.getElementById(pageId);
    if (page) page.classList.add("active");

    menuItems.forEach(function (item) {
      item.classList.remove("active");
    });

    var activeItem = document.querySelector('[data-page="' + pageId + '"]');
    if (activeItem) activeItem.classList.add("active");
  }

  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var page = item.getAttribute("data-page");
      if (page) showPage(page);
    });
  });


  // =========================
  // LOGIN
  // =========================
  var loginBtn = document.getElementById("login-btn");
  var loginUser = document.getElementById("login-user");
  var loginStatus = document.getElementById("login-status");
  var profileInfo = document.getElementById("profile-info");

  function updateProfile() {
    var user = localStorage.getItem("user");

    if (user) {
      if (loginStatus) loginStatus.innerText = "Logado como " + user;
      if (profileInfo) profileInfo.innerText = "Usuário: " + user;
    } else {
      if (loginStatus) loginStatus.innerText = "Não logado";
      if (profileInfo) profileInfo.innerText = "Faça login para ver seu perfil.";
    }
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      var user = loginUser.value.trim();
      if (!user) return;

      localStorage.setItem("user", user);
      updateProfile();
      alert("Login realizado!");
    });
  }

  updateProfile();


  // =========================
  // TESTE GRÁTIS (7 DIAS)
  // =========================
  var trialBtn = document.getElementById("trial-btn");
  var trialStatus = document.querySelector(".trial-status");

  var TRIAL_KEY = "trial_start";
  var TRIAL_DAYS = 7;

  function getTrialDaysLeft() {
    var start = localStorage.getItem(TRIAL_KEY);
    if (!start) return TRIAL_DAYS;

    var diff = Math.floor((new Date() - new Date(start)) / (1000 * 60 * 60 * 24));
    return Math.max(TRIAL_DAYS - diff, 0);
  }

  function updateTrial() {
    if (!trialBtn || !trialStatus) return;

    var days = getTrialDaysLeft();

    if (days > 0) {
      trialStatus.innerText = "Teste ativo. " + days + " dias restantes.";
      trialBtn.disabled = false;
    } else {
      trialStatus.innerText = "Teste expirado.";
      trialBtn.disabled = true;
    }
  }

  if (trialBtn) {
    trialBtn.addEventListener("click", function () {
      localStorage.setItem(TRIAL_KEY, new Date().toISOString());
      alert("Teste iniciado!");
      updateTrial();
    });
  }

  updateTrial();


  // =========================
  // ASSINATURA COM GRÁFICO
  // =========================
  var renewBtn = document.getElementById("renew-btn");
  var chartFill = document.querySelector(".chart-fill");
  var renewDateText = document.getElementById("renew-date");
  var historyList = document.getElementById("history-list");

  var SUB_KEY = "subscription";
  var SUB_DAYS = 30;
  var ALERT_BEFORE = 5;
  var CIRC = 440;

  function loadSub() {
    return JSON.parse(localStorage.getItem(SUB_KEY));
  }

  function saveSub(data) {
    localStorage.setItem(SUB_KEY, JSON.stringify(data));
  }

  function updateSubscription() {
    if (!renewBtn || !chartFill || !renewDateText) return;

    var sub = loadSub();

    if (!sub) {
      renewBtn.innerText = "Assinar";
      renewBtn.disabled = false;
      renewDateText.innerText = "Sem assinatura";
      chartFill.style.strokeDashoffset = CIRC;
      if (historyList) historyList.innerHTML = "";
      return;
    }

    var now = new Date();
    var renew = new Date(sub.renewal);

    var totalTime = SUB_DAYS * 24 * 60 * 60 * 1000;
    var elapsed = now - new Date(sub.start);
    var progress = Math.min(elapsed / totalTime, 1);

    chartFill.style.strokeDashoffset = CIRC - (CIRC * progress);

    renewDateText.innerText = renew.toLocaleDateString();

    var daysLeft = Math.ceil((renew - now) / (1000 * 60 * 60 * 24));

    if (daysLeft <= ALERT_BEFORE) {
      renewBtn.innerText = "Renovar";
      renewBtn.disabled = false;
    } else {
      renewBtn.innerText = "Renova em " + daysLeft + " dias";
      renewBtn.disabled = true;
    }

    if (historyList) {
      historyList.innerHTML = "";
      (sub.history || []).forEach(function (h) {
        var li = document.createElement("li");
        li.innerText = "Renovado em: " + h;
        historyList.appendChild(li);
      });
    }
  }

  if (renewBtn) {
    renewBtn.addEventListener("click", function () {
      var now = new Date();
      var renewal = new Date();
      renewal.setMonth(renewal.getMonth() + 1);

      var sub = loadSub() || { history: [] };

      sub.start = now.toISOString();
      sub.renewal = renewal.toISOString();
      sub.history = sub.history || [];
      sub.history.unshift(now.toLocaleDateString());

      saveSub(sub);

      alert("Assinatura ativada!");
      updateSubscription();
    });
  }

  updateSubscription();


  // =========================
  // CURSOS E PROGRESSO
  // =========================
  var courses = {
    html: { title: "HTML e CSS", total: 5 },
    logica: { title: "Lógica de Programação", total: 5 },
    excel: { title: "Excel Avançado", total: 5 },
    marketing: { title: "Marketing Digital", total: 5 }
  };

  var currentCourse = null;

  function openCourse(id) {
    if (!courses[id]) return;

    currentCourse = id;

    var panel = document.getElementById("course-panel");
    var title = document.getElementById("course-title");
    var progressBar = document.getElementById("progress-bar");
    var progressText = document.getElementById("progress-text");

    var saved = parseInt(localStorage.getItem(id)) || 0;
    var total = courses[id].total;

    if (title) title.innerText = courses[id].title;
    if (progressBar) progressBar.style.width = (saved / total) * 100 + "%";
    if (progressText) progressText.innerText = "Progresso: " + saved + "/" + total;

    if (panel) panel.classList.remove("hidden");
  }

  function closeCourse() {
    var panel = document.getElementById("course-panel");
    if (panel) panel.classList.add("hidden");
  }

  document.querySelectorAll(".course-card").forEach(function (card) {
    card.addEventListener("click", function () {
      openCourse(card.getAttribute("data-course"));
    });
  });

  var continueBtn = document.getElementById("continue-btn");

  if (continueBtn) {
    continueBtn.addEventListener("click", function () {
      if (!currentCourse) return;

      var progress = parseInt(localStorage.getItem(currentCourse)) || 0;
      var total = courses[currentCourse].total;

      if (progress >= total) {
        localStorage.removeItem(currentCourse);
        closeCourse();
        return;
      }

      progress++;
      localStorage.setItem(currentCourse, progress);
      openCourse(currentCourse);
    });
  }

  var closeBtn = document.getElementById("close-course");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCourse);
  }

});
