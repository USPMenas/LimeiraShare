import { getAnosPorCurso } from "../services/api";
import { navigateTo } from "../components/navbar";

export async function createCursoAnosPage() {
  const container = document.createElement("div");
  container.className = "p-4";

  // Pegamos o ID do curso da URL
  const pathParts = window.location.pathname.split("/");
  const cursoId = Number(pathParts[pathParts.length - 1]);
  const cursoNome = decodeURIComponent(
    pathParts[pathParts.length - 2].replace(/\s+/g, "-")
  );

  const title = document.createElement("h1");
  title.textContent = `Anos do curso de ${cursoNome}`;
  title.className = "text-2xl font-bold mb-4";
  container.appendChild(title);

  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="bg-gray-200">
      <th class="border border-gray-300 p-2">Ano</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  try {
    const anos = await getAnosPorCurso(cursoId);
    console.log(anos);

    anos.forEach((ano: any) => {
      const row = document.createElement("tr");
      row.className =
        "border-b border-gray-200 cursor-pointer hover:bg-gray-200";

      row.innerHTML = `
        <td class="border border-gray-300 p-2 text-blue-600 underline">📁</td>
        <td class="border border-gray-300 p-2 text-blue-600 underline">${ano.nome}</td>
      `;

      // Adiciona evento de clique para navegar para a página de disciplinas do curso naquele ano
      row.addEventListener("click", () => {
        navigateTo(
          `/cursos/${cursoNome.replace(/\s+/g, "-")}/${cursoId}/${ano.nome}/${
            ano.id
          }`
        );
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar anos do curso:", error);
  }

  container.appendChild(table);
  return container;
}
