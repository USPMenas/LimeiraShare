import { navigateTo } from "../components/navbar";

export function createCursoAnosPage() {
  const container = document.createElement("div");
  container.className =
    "flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20";

  // Obtendo a faculdade e nome do curso da URL
  const path = window.location.pathname;
  const parts = path.split("/cursos/")[1].split("/");
  const faculdade = decodeURIComponent(parts[0]);
  const curso = decodeURIComponent(parts[1]);

  // Criar título do curso
  const title = document.createElement("h1");
  title.textContent = `${faculdade} - ${curso}`;
  title.className = "text-3xl font-bold text-blue-600 mb-6";

  // Criar a tabela
  const table = document.createElement("table");
  table.className = "w-3/4 border border-gray-300 bg-white shadow-md";

  // Lista de anos do curso
  const anos = ["1º Ano", "2º Ano", "3º Ano", "4º Ano", "5º Ano", "Optativas"];

  // Criando as linhas da tabela
  anos.forEach((ano) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-200 cursor-pointer hover:bg-gray-200";

    // Ícone de pasta
    const iconTd = document.createElement("td");
    iconTd.className = "p-4 text-center";
    iconTd.innerHTML = "📁"; // Ícone de pasta

    // Nome do ano
    const anoTd = document.createElement("td");
    anoTd.className = "p-4 font-semibold text-gray-800";
    anoTd.textContent = ano;

    // Redirecionamento ao clicar
    row.addEventListener("click", () => {
      navigateTo(
        `/cursos/${encodeURIComponent(faculdade)}/${encodeURIComponent(
          curso
        )}/${encodeURIComponent(ano)}`
      );
    });

    row.appendChild(iconTd);
    row.appendChild(anoTd);
    table.appendChild(row);
  });

  container.appendChild(title);
  container.appendChild(table);
  return container;
}
