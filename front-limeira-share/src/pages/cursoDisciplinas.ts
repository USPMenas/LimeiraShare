import { navigateTo } from "../components/navbar";

export function createCursoDisciplinasPage() {
  const container = document.createElement("div");
  container.className =
    "flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20";

  // Obtendo a faculdade, nome do curso e ano da URL
  const path = window.location.pathname;
  const parts = path.split("/cursos/")[1].split("/");
  const faculdade = decodeURIComponent(parts[0]);
  const curso = decodeURIComponent(parts[1]);
  const ano = decodeURIComponent(parts[2]);

  // Criar título da página
  const title = document.createElement("h1");
  title.textContent = `${faculdade} - ${curso} - ${ano}`;
  title.className = "text-3xl font-bold text-blue-600 mb-6";

  // Criar a tabela
  const table = document.createElement("table");
  table.className = "w-3/4 border border-gray-300 bg-white shadow-md";

  // Simulação de disciplinas para cada ano (pode ser substituído por um backend futuramente)
  const disciplinasPorAno: Record<string, { codigo: string; nome: string }[]> =
    {
      "1º Ano": [
        { codigo: "MC102", nome: "Algoritmos e Programação" },
        { codigo: "MA141", nome: "Cálculo I" },
        { codigo: "FIS101", nome: "Física I" },
      ],
      "2º Ano": [
        { codigo: "MC202", nome: "Estruturas de Dados" },
        { codigo: "MA211", nome: "Cálculo II" },
        { codigo: "FIS201", nome: "Física II" },
      ],
      "3º Ano": [
        { codigo: "MC302", nome: "Banco de Dados" },
        { codigo: "MA311", nome: "Cálculo III" },
        { codigo: "FIS301", nome: "Eletromagnetismo" },
      ],
      "4º Ano": [
        { codigo: "MC402", nome: "Inteligência Artificial" },
        { codigo: "MA411", nome: "Análise Numérica" },
        { codigo: "FIS401", nome: "Física Moderna" },
      ],
      "5º Ano": [
        { codigo: "MC502", nome: "Sistemas Distribuídos" },
        { codigo: "MA511", nome: "Otimização" },
        { codigo: "FIS501", nome: "Mecânica Quântica" },
      ],
      Optativas: [
        { codigo: "MC600", nome: "Computação Gráfica" },
        { codigo: "MC601", nome: "Processamento de Imagens" },
        { codigo: "MC602", nome: "Bioinformática" },
      ],
    };

  const disciplinas = disciplinasPorAno[ano] || [];

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
        `/disciplinas/${disciplina.codigo}-${encodeURIComponent(
          disciplina.nome
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
