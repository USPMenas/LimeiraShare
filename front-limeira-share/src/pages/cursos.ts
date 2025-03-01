import { navigateTo } from "../components/navbar";
import { getCursos, Curso } from "../services/api";

export async function createCursosPage() {
  const container = document.createElement("div");
  container.className = "p-4";

  const title = document.createElement("h1");
  title.textContent = "Cursos Disponíveis";
  title.className = "text-2xl font-bold mb-4";
  container.appendChild(title);

  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="bg-gray-200">
      <th class="border border-gray-300 p-2">Faculdade</th>
      <th class="border border-gray-300 p-2">Nome do Curso</th>
      <th class="border border-gray-300 p-2">Período</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  try {
    const cursos: Curso[] = await getCursos();
    console.log("Cursos recebidos:", cursos); // 🔹 Verifique se os cursos estão vindo corretamente

    cursos.forEach((curso: Curso) => {
      if (!curso) {
        console.error("Curso inválido:", curso);
        return;
      }

      const row = document.createElement("tr");
      row.className = "border border-gray-300";

      row.innerHTML = `
        <td class="border border-gray-300 p-2">${curso.faculdade}</td>
        <td class="border border-gray-300 p-2 cursor-pointer text-blue-600 underline">${curso.nome}</td>
        <td class="border border-gray-300 p-2">${curso.periodo}</td>
      `;

      row.children[1].addEventListener("click", () => {
        navigateTo(`/cursos/${curso.id}`);
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
  }

  container.appendChild(table);
  return container;
}
