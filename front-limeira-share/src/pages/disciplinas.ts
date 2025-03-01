import { navigateTo } from "../components/navbar";

export function createDisciplinasPage() {
  const container = document.createElement("div");
  container.className =
    "flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20";

  const title = document.createElement("h1");
  title.textContent = "Disciplinas";
  title.className = "text-3xl font-bold text-blue-600 mb-6";

  // Criando a tabela
  const table = document.createElement("table");
  table.className = "w-3/4 border border-gray-300 bg-white shadow-md";

  // Lista de disciplinas (exemplo)
  const disciplinas = [
    { codigo: "MC102", nome: "Algoritmos e Programação" },
    { codigo: "MA211", nome: "Cálculo II" },
    { codigo: "Física I", nome: "Física para Engenharia" },
  ];

  // Criando as linhas da tabela
  disciplinas.forEach((disciplina) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-200 cursor-pointer hover:bg-gray-200";

    // Ícone de pasta
    const iconTd = document.createElement("td");
    iconTd.className = "p-4 text-center";
    iconTd.innerHTML = "📁"; // Ícone de pasta

    // Código da disciplina
    const codigoTd = document.createElement("td");
    codigoTd.className = "p-4 font-semibold text-gray-800";
    codigoTd.textContent = disciplina.codigo;

    // Nome da disciplina
    const nomeTd = document.createElement("td");
    nomeTd.className = "p-4 text-gray-600";
    nomeTd.textContent = disciplina.nome;

    // Redirecionamento ao clicar na disciplina
    row.addEventListener("click", () => {
      navigateTo(
        `/disciplinas/${disciplina.codigo}-${disciplina.nome.replace(
          /\s+/g,
          "-"
        )}`
      );
    });

    row.appendChild(iconTd);
    row.appendChild(codigoTd);
    row.appendChild(nomeTd);
    table.appendChild(row);
  });

  container.appendChild(title);
  container.appendChild(table);
  return container;
}
