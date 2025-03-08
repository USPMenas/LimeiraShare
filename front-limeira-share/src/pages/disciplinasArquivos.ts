import { getArquivosPorPasta } from "../services/api";

export async function createPastaArquivosPage() {
  console.log("🔹 Executando createPastaArquivosPage()");

  const container = document.createElement("div");
  container.className = "p-4";

  const pathParts = decodeURIComponent(window.location.pathname).split("/");
  console.log("🔹 PathParts:", pathParts);

  const pastaId = Number(pathParts[pathParts.length - 1]);
  const pastaNome = pathParts[pathParts.length - 2].replace(/-/g, " ");

  console.log("🔹 Pasta ID:", pastaId);

  const title = document.createElement("h1");
  title.textContent = `Arquivos da pasta: ${pastaNome}`;
  title.className = "text-2xl font-bold mb-4";
  container.appendChild(title);

  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="bg-gray-200">
      <th class="border border-gray-300 p-2">Nome do Arquivo</th>
      <th class="border border-gray-300 p-2">Tipo</th>
      <th class="border border-gray-300 p-2">Enviado por</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  try {
    const arquivos = await getArquivosPorPasta(pastaId);

    arquivos.forEach((arquivo: any) => {
      const row = document.createElement("tr");
      row.className = "border border-gray-300 cursor-pointer hover:bg-gray-100";

      row.innerHTML = `
        <td class="border border-gray-300 p-2 text-blue-600 underline">${arquivo.nome}</td>
        <td class="border border-gray-300 p-2">${arquivo.tipo}</td>
        <td class="border border-gray-300 p-2">${arquivo.caminho}</td>
      `;

      // 🔹 Adicionamos evento para abrir o arquivo em outra guia ao clicar na linha
      row.addEventListener("click", () => {
        window.open(`/uploads/${arquivo.nome}`, "_blank");
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar arquivos:", error);
  }

  container.appendChild(table);
  return container;
}
