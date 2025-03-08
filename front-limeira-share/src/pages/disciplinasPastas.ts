import { getPastasPorDisciplina } from "../services/api";
import { navigateTo } from "../components/navbar";

export async function createDisciplinaPastasPage() {
  console.log("🔹 Executando createDisciplinaPastasPage()");

  const container = document.createElement("div");
  container.className = "p-4";

  const pathParts = decodeURIComponent(window.location.pathname).split("/");
  console.log("🔹 PathParts:", pathParts);

  const disciplinaId = Number(pathParts[pathParts.length - 1]);
  const disciplinaNome = pathParts[pathParts.length - 2].replace(/-/g, " ");
  const cursoNome = pathParts[2];

  console.log("🔹 Disciplina ID:", disciplinaId);

  const title = document.createElement("h1");
  title.textContent = `Pastas da disciplina: ${disciplinaNome}`;
  title.className = "text-2xl font-bold mb-4";
  container.appendChild(title);

  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="bg-gray-200">
      <th class="border border-gray-300 p-2">Nome da Pasta</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  try {
    const pastas = await getPastasPorDisciplina(disciplinaId);
    console.log(pastas);

    pastas.forEach((pasta: any) => {
      console.log(pasta);
      const row = document.createElement("tr");
      row.className = "border border-gray-300 cursor-pointer hover:bg-gray-100";

      row.innerHTML = `
        <td class="border border-gray-300 p-2 text-blue-600 underline">📁${pasta.nome}</td>
      `;

      // 🔹 Adicionamos evento para redirecionar para a página de arquivos dentro da pasta
      row.addEventListener("click", () => {
        const formattedName = disciplinaNome.replace(/\s+/g, "-").toLowerCase();
        navigateTo(
          `/disciplinas/pastas/${cursoNome}/${formattedName}/${disciplinaId}/${pasta.id}`
        );
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar pastas:", error);
  }

  container.appendChild(table);
  return container;
}
