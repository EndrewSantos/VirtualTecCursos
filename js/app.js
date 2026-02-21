document.addEventListener("DOMContentLoaded", () => {
  // --- Estado Premium ---
  let isPremium = localStorage.getItem("premium") === "true";

  const subscribeBtn = document.getElementById("subscribe-btn");
  const premiumStatus = document.getElementById("premium-status");
  const acervo = document.getElementById("acervo");

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
    acervo.style.display = "block";
  }

  // Botão de abrir acervo
  const btnAcervo = document.getElementById("btn-acervo");
  if (btnAcervo) btnAcervo.onclick = openAcervo;

  updatePremiumUI();

  // --- Cursos ---
  const courses = {
    excel: {
      title: "Excel Avançado",
      modules: [
        { name: "Introdução ao Excel", desc: "Visão geral da interface e conceitos básicos." },
        { name: "Fórmulas Avançadas", desc: "PROCV, SOMASES e funções lógicas." },
        { name: "Tabelas Dinâmicas", desc: "Criação e personalização." },
        { name: "Dashboards", desc: "Gráficos e indicadores visuais." },
        { name: "Automação VBA", desc: "Introdução à automação." }
      ]
    },
    logica: {
      title: "Lógica de Programação",
      modules: [
        { name: "Algoritmos", desc: "Conceitos fundamentais." },
        { name: "Variáveis", desc: "Tipos e armazenamento." },
        { name: "Condicionais", desc: "If, Else e Switch." },
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
        { name: "Redes Sociais", desc: "Estratégias orgânicas." },
        { name: "Tráfego Pago", desc: "Anúncios online." },
        { name: "Copywriting", desc: "Escrita persuasiva." },
        { name: "Funil de Vendas", desc: "Conversão e retenção." }
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
    const continueBtn = document.getElementById("continue-btn");
    const progressText = document.getElementById("progress-text");

    const course = courses[courseId];
    const savedProgress = parseInt(localStorage.getItem(courseId)) || 0;

    // Atualiza título
    title.innerText = course.title;

    // Limpa lista de módulos
    moduleList.innerHTML = "";

    // Monta módulos
    course.modules.forEach((module, index) => {
      const moduleItem = document.createElement("li");
      moduleItem.classList.add("module-item");

      const moduleCircle = document.createElement("div");
      moduleCircle.classList.add("module-circle");
      moduleCircle.innerText = index + 1;
      if (index < savedProgress) moduleCircle.classList.add("completed");

      const moduleContent = document.createElement("div");
      moduleContent.classList.add("module-content");

      const moduleTitle = document.createElement("h4");
      moduleTitle.innerText = module.name;

      const moduleDesc = document.createElement("p");
      moduleDesc.innerText = module.desc;

      moduleContent.appendChild(moduleTitle);
      moduleContent.appendChild(moduleDesc);

      moduleItem.appendChild(moduleCircle);
      moduleItem.appendChild(moduleContent);

      moduleList.appendChild(moduleItem);
    });

    // Atualiza barra de progresso
    const totalModules = course.modules.length;
    const percentage = Math.floor((savedProgress / totalModules) * 100);
    progressBar.style.width = percentage + "%";
    progressText.innerText = `Progresso: ${percentage}%`;

    // Atualiza botão continuar
    if (savedProgress == 0) {
      continueBtn.innerText = "Iniciar Curso";
    } else if (savedProgress < totalModules) {
      continueBtn.innerText = "Continuar";
    } else {
      continueBtn.innerText = "Finalizar";
    }

    // Mostra painel do curso
    panel.classList.remove("hidden");
  }

  function closeCourse() {
    document.getElementById("course-panel").classList.add("hidden");
  }

  const continueBtn = document.getElementById("continue-btn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      if (!currentCourse) return;

      let progress = parseInt(localStorage.getItem(currentCourse)) || 0;
      const totalModules = courses[currentCourse].modules.length;

      if (progress >= totalModules) {
        localStorage.removeItem(currentCourse); // Reinicia progresso
        closeCourse();
        return;
      }

      progress++;
      localStorage.setItem(currentCourse, progress);
      openCourse(currentCourse);
    });
  }

  // --- Opcional: inicializar botões de cursos ---
  document.querySelectorAll(".course-btn").forEach(btn => {
    btn.onclick = () => openCourse(btn.dataset.course);
  });
});
