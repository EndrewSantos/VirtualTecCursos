document.addEventListener("DOMContentLoaded", () => {
  // PREMIUM
  let isPremium = localStorage.getItem("premium") === "true";

  const subscribeBtn = document.getElementById("subscribe-btn");
  const premiumStatus = document.getElementById("premium-status");
  const acervoPage = document.getElementById("acervo");

  function updatePremiumUI() {
    premiumStatus.innerText = isPremium
      ? "Plano atual: Premium 🚀"
      : "Plano atual: Gratuito";
  }

  subscribeBtn.onclick = () => {
    localStorage.setItem("premium", "true");
    isPremium = true;
    updatePremiumUI();
    alert("Parabéns! Agora você é Premium 🚀");
  };

  function openAcervo() {
    if (!isPremium) {
      alert("O acervo completo é exclusivo para assinantes Premium 🔒");
      return;
    }
    acervoPage.classList.add("active");
  }

  document.querySelector('[data-page="acervo"]').onclick = openAcervo;

  updatePremiumUI();

  // CURSOS
  const courses = {
    excel: {
      title: "Excel Avançado",
      modules: [
        { name: "Introdução ao Excel", desc: "Visão geral da interface." },
        { name: "Fórmulas Avançadas", desc: "PROCV, SOMASES e funções." },
        { name: "Tabelas Dinâmicas", desc: "Criação e personalização." },
        { name: "Dashboards", desc: "Gráficos profissionais." },
        { name: "Automação VBA", desc: "Introdução à automação." }
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
        { name: "Estrutura HTML", desc: "Tags e semântica." },
        { name: "Estilização CSS", desc: "Classes e IDs." },
        { name: "Flexbox", desc: "Layouts modernos." },
        { name: "Grid", desc: "Sistema de colunas." },
        { name: "Responsividade", desc: "Media queries." }
      ]
    },
    marketing: {
      title: "Marketing Digital",
      modules: [
        { name: "Fundamentos", desc: "Conceitos iniciais." },
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
