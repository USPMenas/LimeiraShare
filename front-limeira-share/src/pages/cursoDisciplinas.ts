import { getDisciplinasPorAno } from "../services/api";
import { navigateTo } from "../components/navbar";

export async function createCursoDisciplinasPage() {
  console.log("🔹 Executando createCursoDisciplinasPage()");

  const container = document.createElement("div");
  container.className = "p-4";

  const pathParts = decodeURIComponent(window.location.pathname).split("/");
  console.log("🔹 PathParts:", pathParts);

  const cursoId = Number(pathParts[pathParts.length - 3]); // Pega o ID do curso
  const ano_id = Number(pathParts[pathParts.length - 1][0]); // Pega o ano
  const ano = pathParts[pathParts.length - 2][0]; // Pega o ano
  const cursoNome = pathParts[2].replace(/-/g, " ");

  console.log("🔹 Curso ID:", cursoId, "Ano:", ano);

  const title = document.createElement("h1");
  title.textContent = `Disciplinas do ${ano}º ano - ${cursoNome}`;
  title.className = "text-2xl font-bold mb-4";
  container.appendChild(title);

  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="bg-gray-200">
      <th class="border border-gray-300 p-2">Código</th>
      <th class="border border-gray-300 p-2">Nome da Disciplina</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  try {
    const disciplinas = await getDisciplinasPorAno(cursoId, ano_id);

    disciplinas.forEach((disciplina: any) => {
      const row = document.createElement("tr");
      row.className = "border border-gray-300 cursor-pointer hover:bg-gray-100";

      row.innerHTML = `
        <td class="border border-gray-300 p-2">${disciplina.codigo}</td>
        <td class="border border-gray-300 p-2 text-blue-600 underline">${disciplina.nome}</td>
      `;

      // 🔹 Adicionamos o evento para redirecionar para a página de pastas da disciplina
      row.addEventListener("click", () => {
        const formattedName = disciplina.nome
          .replace(/\s+/g, "-")
          .toLowerCase();
        navigateTo(
          `/disciplinas/${cursoNome}/${formattedName}/${disciplina.id}`
        );
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar disciplinas:", error);
  }

  container.appendChild(table);
  return container;
}
