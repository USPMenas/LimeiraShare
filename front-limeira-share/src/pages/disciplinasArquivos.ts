import { navigateTo } from "../components/navbar";

export function createDisciplinaArquivosPage() {
  const container = document.createElement("div");
  container.className =
    "flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20";

  // Obtendo o código e nome da disciplina da URL
  const path = window.location.pathname;
  const parts = path.split("/disciplinas/")[1].split("-");
  const codigo = decodeURIComponent(parts[0]);
  const nome = decodeURIComponent(parts.slice(1).join(" "));

  // Criar título da disciplina
  const title = document.createElement("h1");
  title.textContent = `${codigo} - ${nome}`;
  title.className = "text-3xl font-bold text-blue-600 mb-6";

  // Criar a tabela
  const table = document.createElement("table");
  table.className = "w-3/4 border border-gray-300 bg-white shadow-md";

  // Lista de categorias
  const categorias = [
    "Resoluções",
    "Listas de Exercícios",
    "Provas Antigas",
    "Resumos",
    "Livros",
  ];

  // Criar as linhas da tabela
  categorias.forEach((categoria) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-200 cursor-pointer hover:bg-gray-200";

    // Ícone de pasta
    const iconTd = document.createElement("td");
    iconTd.className = "p-4 text-center";
    iconTd.innerHTML = "📁"; // Ícone de pasta

    // Nome da categoria
    const categoriaTd = document.createElement("td");
    categoriaTd.className = "p-4 font-semibold text-gray-800";
    categoriaTd.textContent = categoria;

    // Redirecionamento ao clicar
    row.addEventListener("click", () => {
      navigateTo(
        `/disciplinas/${codigo}-${nome.replace(
          /\s+/g,
          "-"
        )}/${encodeURIComponent(categoria)}`
      );
    });

    row.appendChild(iconTd);
    row.appendChild(categoriaTd);
    table.appendChild(row);
  });

  container.appendChild(title);
  container.appendChild(table);
  return container;
}
