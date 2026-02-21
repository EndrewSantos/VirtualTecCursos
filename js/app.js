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

  const course = courses[courseId];
  const savedProgress = localStorage.getItem(courseId) || 0;

  title.innerText = course.title;
  moduleList.innerHTML = "";

course.modules.forEach((module, index) => {

  const li = document.createElement("li");
  li.classList.add("module-item");

  const circle = document.createElement("div");
  circle.classList.add("module-circle");
  circle.innerText = index + 1;

  if (index < savedProgress) {
    circle.classList.add("completed");
  }

  const content = document.createElement("div");
  content.classList.add("module-content");

  const title = document.createElement("h4");
  title.innerText = module.name;

  const desc = document.createElement("p");
  desc.innerText = module.desc;

  content.appendChild(title);
  content.appendChild(desc);

  li.appendChild(circle);
  li.appendChild(content);

  moduleList.appendChild(li);
  });

  const progressPercent = (savedProgress / course.modules.length) * 100;
  progressBar.style.width = progressPercent + "%";

  if (savedProgress == 0) {
  continueBtn.innerText = "Iniciar Curso";
} else if (savedProgress < course.modules.length) {
  continueBtn.innerText = "Continuar";
} else {
  continueBtn.innerText = "Finalizar";
}

  panel.classList.remove("hidden");
}

function closeCourse() {
  document.getElementById("course-panel").classList.add("hidden");
}

document.getElementById("continue-btn").addEventListener("click", () => {
  if (!currentCourse) return;

  let progress = parseInt(localStorage.getItem(currentCourse)) || 0;
  const totalModules = courses[currentCourse].modules.length;

  // Se já terminou → reinicia
  if (progress >= totalModules) {
    localStorage.removeItem(currentCourse); // Zera progresso
    closeCourse(); // Fecha painel
    return;
  }

  // Avança módulo
  progress++;
  localStorage.setItem(currentCourse, progress);
  openCourse(currentCourse);
});
