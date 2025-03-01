import { navigateTo } from "../components/navbar";

export function createCursosPage() {
  const container = document.createElement("div");
  container.className =
    "flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20";

  const title = document.createElement("h1");
  title.textContent = "Cursos Disponíveis";
  title.className = "text-3xl font-bold text-blue-600 mb-6";

  // Criar a tabela
  const table = document.createElement("table");
  table.className = "w-3/4 border border-gray-300 bg-white shadow-md";

  // Lista de cursos (exemplo)
  const cursos = [
    {
      faculdade: "Universidade de São Paulo",
      curso: "Engenharia Ambiental",
      periodo: "Integral",
    },
    {
      faculdade: "Universidade Estadual de Campinas",
      curso: "Ciência da Computação",
      periodo: "Noturno",
    },
    {
      faculdade: "Universidade Federal de Minas Gerais",
      curso: "Medicina",
      periodo: "Integral",
    },
  ];

  // Criando as linhas da tabela
  cursos.forEach((curso) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-200 cursor-pointer hover:bg-gray-200";

    // Ícone universitário
    const iconTd = document.createElement("td");
    iconTd.className = "p-4 text-center";
    iconTd.innerHTML = "🎓"; // Ícone de universidade

    // Nome da faculdade
    const faculdadeTd = document.createElement("td");
    faculdadeTd.className = "p-4 font-semibold text-gray-800";
    faculdadeTd.textContent = curso.faculdade;

    // Nome do curso
    const cursoTd = document.createElement("td");
    cursoTd.className = "p-4 text-gray-600";
    cursoTd.textContent = curso.curso;

    // Período
    const periodoTd = document.createElement("td");
    periodoTd.className = "p-4 text-gray-600";
    periodoTd.textContent = curso.periodo;

    // Evento de clique para redirecionar para os anos do curso
    row.addEventListener("click", () => {
      navigateTo(
        `/cursos/${encodeURIComponent(curso.faculdade)}/${encodeURIComponent(
          curso.curso
        )}`
      );
    });

    row.appendChild(iconTd);
    row.appendChild(faculdadeTd);
    row.appendChild(cursoTd);
    row.appendChild(periodoTd);
    table.appendChild(row);
  });

  container.appendChild(title);
  container.appendChild(table);
  return container;
}
