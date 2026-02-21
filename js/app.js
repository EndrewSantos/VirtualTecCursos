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

  continueBtn.innerText = savedProgress == 0 ? "Iniciar Curso" : "Continuar";

  panel.classList.remove("hidden");
}

function closeCourse() {
  document.getElementById("course-panel").classList.add("hidden");
}

document.getElementById("continue-btn").addEventListener("click", () => {
  if (!currentCourse) return;

  let progress = parseInt(localStorage.getItem(currentCourse)) || 0;
  const totalModules = courses[currentCourse].modules.length;

  if (progress < totalModules) {
    progress++;
    localStorage.setItem(currentCourse, progress);
    openCourse(currentCourse);
  }
});
