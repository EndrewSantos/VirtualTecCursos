document.addEventListener("DOMContentLoaded", () => {

    // BOTÃO DE TESTE GRÁTIS
  const trialBtn = document.getElementById("trial-btn");

  if (trialBtn) {
    trialBtn.onclick = () => {
      alert("Teste grátis iniciado! Você tem 7 dias de acesso.");
    };
  }
  
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
    excel: {
      title: "Excel Avançado",
      modules: [
        { name: "Introdução", desc: "Visão geral do Excel." },
        { name: "Fórmulas", desc: "PROCV e funções." },
        { name: "Tabelas Dinâmicas", desc: "Criação de relatórios." },
        { name: "Dashboards", desc: "Gráficos profissionais." },
        { name: "Automação", desc: "Introdução ao VBA." }
      ]
    },

    logica: {
      title: "Lógica de Programação",
      modules: [
        { name: "Algoritmos", desc: "Conceitos fundamentais." },
        { name: "Variáveis", desc: "Tipos e armazenamento." },
        { name: "Condicionais", desc: "If e Else." },
        { name: "Loops", desc: "For e While." },
        { name: "Funções", desc: "Organização do código." }
      ]
    },

    html: {
      title: "HTML e CSS",
      modules: [
        { name: "Estrutura", desc: "Tags e semântica." },
        { name: "Estilização", desc: "Classes e IDs." },
        { name: "Flexbox", desc: "Layouts modernos." },
        { name: "Grid", desc: "Sistema de colunas." },
        { name: "Responsividade", desc: "Media queries." }
      ]
    },

    marketing: {
      title: "Marketing Digital",
      modules: [
        { name: "Fundamentos", desc: "Conceitos básicos." },
        { name: "Redes Sociais", desc: "Estratégias." },
        { name: "Tráfego Pago", desc: "Anúncios." },
        { name: "Copywriting", desc: "Escrita persuasiva." },
        { name: "Funil de Vendas", desc: "Conversão." }
      ]
    }
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

    if (savedProgress == 0) continueBtn.innerText = "Iniciar Curso";
    else if (savedProgress < total) continueBtn.innerText = "Continuar";
    else continueBtn.innerText = "Finalizar";

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
