export function createArquivosPage() {
  const container = document.createElement("div");
  container.className =
    "flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20";

  // Obtendo o código, nome da disciplina e categoria da URL
  const path = window.location.pathname;
  const parts = path.split("/disciplinas/")[1].split("/");
  const disciplinaParts = parts[0].split("-");
  const codigo = decodeURIComponent(disciplinaParts[0]);
  const nome = decodeURIComponent(disciplinaParts.slice(1).join(" "));
  const categoria = decodeURIComponent(parts[1]);

  // Criar título da disciplina
  const title = document.createElement("h1");
  title.textContent = `${codigo} - ${nome}`;
  title.className = "text-3xl font-bold text-blue-600 mb-2";

  // Criar título da categoria
  const categoriaTitle = document.createElement("h2");
  categoriaTitle.textContent = categoria;
  categoriaTitle.className = "text-2xl font-semibold text-gray-700 mb-6";

  // Criar a tabela
  const table = document.createElement("table");
  table.className = "w-3/4 border border-gray-300 bg-white shadow-md";

  // Criar cabeçalho da tabela
  const thead = document.createElement("thead");
  thead.innerHTML = `
      <tr class="bg-blue-600 text-white">
        <th class="p-4">Nome do Arquivo</th>
        <th class="p-4">Tipo</th>
        <th class="p-4">Usuário</th>
      </tr>
    `;
  table.appendChild(thead);

  // Simulação de arquivos cadastrados
  const arquivos = [
    {
      nome: "Lista de física 1 para a P1",
      tipo: "PDF",
      usuario: "Pedro Amaral",
    },
    { nome: "Resumo de Cálculo II", tipo: "DOC", usuario: "Maria Oliveira" },
    { nome: "Provas antigas 2019", tipo: "ZIP", usuario: "Carlos Mendes" },
  ];

  // Criando as linhas da tabela
  const tbody = document.createElement("tbody");
  arquivos.forEach((arquivo) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-200 cursor-pointer hover:bg-gray-200";

    // Nome do arquivo
    const nomeTd = document.createElement("td");
    nomeTd.className = "p-4 text-gray-800";
    nomeTd.textContent = arquivo.nome;

    // Tipo do arquivo
    const tipoTd = document.createElement("td");
    tipoTd.className = "p-4 text-gray-600";
    tipoTd.textContent = arquivo.tipo;

    // Nome do usuário
    const usuarioTd = document.createElement("td");
    usuarioTd.className = "p-4 text-gray-600";
    usuarioTd.textContent = arquivo.usuario;

    // Evento de clique para abrir o arquivo em nova aba
    row.addEventListener("click", (event) => {
      event.stopPropagation(); // Impede que outros eventos da SPA interfiram
      const fileUrl = window.location.origin + "/teste.pdf"; // Caminho absoluto
      window.open(fileUrl, "_blank");
    });
    row.appendChild(nomeTd);
    row.appendChild(tipoTd);
    row.appendChild(usuarioTd);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(title);
  container.appendChild(categoriaTitle);
  container.appendChild(table);
  return container;
}
