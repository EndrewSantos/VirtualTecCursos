const courses = {
  excel: {
    title: "Excel Avançado",
    modules: [
      "Introdução ao Excel",
      "Fórmulas Avançadas",
      "Tabelas Dinâmicas",
      "Dashboards",
      "Automação com VBA"
    ]
  },
  logica: {
    title: "Lógica de Programação",
    modules: [
      "Algoritmos",
      "Variáveis",
      "Estruturas Condicionais",
      "Loops",
      "Funções"
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
    li.innerText = module;

    if (index < savedProgress) {
      li.classList.add("completed");
    }

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
