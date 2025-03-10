import { navigateTo } from "../components/navbar";
import {
  getCursos,
  Curso,
  criarCurso,
  deletarCursoByAll,
} from "../services/api";
import { createModal } from "../components/modal";

export async function createCursosPage() {
  console.log("estou aqui");
  const container = document.createElement("div");
  container.className = "p-4";

  const title = document.createElement("h1");
  title.textContent = "Cursos Disponíveis";
  title.className = "text-2xl font-bold mb-4";
  container.appendChild(title);

  // Criar botões de adicionar e deletar curso
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "flex gap-4 mb-4";

  const addButton = document.createElement("button");
  addButton.textContent = "Adicionar Curso";
  addButton.className = "bg-green-500 text-white px-4 py-2 rounded";
  addButton.addEventListener("click", () => openAddCursoModal());

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Deletar Curso";
  deleteButton.className = "bg-red-500 text-white px-4 py-2 rounded";
  deleteButton.addEventListener("click", () => openDeleteCursoModal());

  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(deleteButton);
  container.appendChild(buttonContainer);

  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="bg-gray-200">
      <th class="border border-gray-300 p-2">Universidade</th>
      <th class="border border-gray-300 p-2">Campus</th>
      <th class="border border-gray-300 p-2">Faculdade</th>
      <th class="border border-gray-300 p-2">Nome do Curso</th>
      <th class="border border-gray-300 p-2">Período</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  function openAddCursoModal() {
    const form = document.createElement("form");
    form.className = "flex flex-col gap-4";

    const universidade = createSelect(["USP", "UNICAMP"], "Universidade");
    const campus = createSelect(["Cidade Universitária", "Campinas"], "Campus");
    const faculdade = createSelect(
      ["Escola Politécnica", "Faculdade de Ciências Médicas"],
      "Faculdade"
    );
    const nomeCurso = document.createElement("input");
    nomeCurso.placeholder = "Nome do Curso";
    nomeCurso.className = "border p-2 rounded";

    const periodo = createSelect(["Noturno", "Diurno", "Integral"], "Período");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Adicionar Curso";
    submitButton.className = "bg-green-500 text-white px-4 py-2 rounded";
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      await criarCurso({
        id: 0,
        universidade: universidade.value,
        campus: campus.value,
        faculdade: faculdade.value,
        nome: nomeCurso.value.trim(),
        periodo: periodo.value,
      });
      window.location.reload(); // Atualiza a página
    });

    form.appendChild(universidade);
    form.appendChild(campus);
    form.appendChild(faculdade);
    form.appendChild(nomeCurso);
    form.appendChild(periodo);
    form.appendChild(submitButton);

    createModal("Adicionar Curso", form, () => {});
  }

  function createSelect(options: string[], label: string) {
    const select = document.createElement("select");
    select.className = "border p-2 rounded";
    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
    return select;
  }

  function openDeleteCursoModal() {
    const form = document.createElement("form");
    form.className = "flex flex-col gap-4";

    const universidade = createSelect(["USP", "UNICAMP"], "Universidade");
    const campus = createSelect(["Cidade Universitária", "Campinas"], "Campus");
    const faculdade = createSelect(
      ["Escola Politécnica", "Faculdade de Ciências Médicas"],
      "Faculdade"
    );
    const nomeCurso = document.createElement("input");
    nomeCurso.placeholder = "Nome do Curso";
    nomeCurso.className = "border p-2 rounded";

    const periodo = createSelect(["Noturno", "Diurno", "Integral"], "Período");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Deletar Curso";
    submitButton.className = "bg-red-500 text-white px-4 py-2 rounded";
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log(universidade.value);
      console.log(typeof universidade.value);
      await deletarCursoByAll({
        id: 0,
        universidade: universidade.value,
        campus: campus.value,
        faculdade: faculdade.value,
        nome: nomeCurso.value.trim(),
        periodo: periodo.value,
      });
      // window.location.reload(); // Atualiza a página
    });

    form.appendChild(universidade);
    form.appendChild(campus);
    form.appendChild(faculdade);
    form.appendChild(nomeCurso);
    form.appendChild(periodo);
    form.appendChild(submitButton);

    createModal("Deletar Curso", form, () => {});
  }

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
      <td class="border border-gray-300 p-2">${curso.universidade}</td>
      <td class="border border-gray-300 p-2">${curso.campus}</td>
      <td class="border border-gray-300 p-2">${curso.faculdade}</td>
      <td class="border border-gray-300 p-2 text-blue-600 underline">${curso.nome}</td>
      <td class="border border-gray-300 p-2">${curso.periodo}</td>
    `;

      row.children[1].addEventListener("click", () => {
        const formattedName = curso.nome.replace(/\s+/g, "-").toLowerCase();
        navigateTo(`/cursos/${formattedName}/${curso.id}`);
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
  }

  container.appendChild(table);
  return container;
}
