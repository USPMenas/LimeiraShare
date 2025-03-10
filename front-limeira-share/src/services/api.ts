const API_URL =
  "https://laughing-space-journey-597x67qjv75fv5qw-5000.app.github.dev/api";

export type Curso = {
  id: number;
  universidade: string;
  campus: string;
  faculdade: string;
  nome: string;
  periodo: string;
};

export async function getCursos(): Promise<Curso[]> {
  try {
    const response = await fetch(`${API_URL}/cursos`);
    if (!response.ok) {
      throw new Error("Erro ao buscar cursos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAnosPorCurso(cursoId: number) {
  try {
    const response = await fetch(`${API_URL}/anos/${cursoId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar anos do curso");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getDisciplinasPorAno(cursoId: number, ano: number) {
  try {
    const response = await fetch(`${API_URL}/cursos/${cursoId}/${ano}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar disciplinas");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPastasPorDisciplina(disciplinaId: number) {
  try {
    const response = await fetch(`${API_URL}/pastas/${disciplinaId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar pastas da disciplina");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArquivosPorPasta(pastaId: number) {
  try {
    const response = await fetch(`${API_URL}/arquivos/${pastaId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar arquivos da pasta");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function criarCurso(curso: Curso): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/cursos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curso),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar curso");
    }

    return true;
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return false;
  }
}

export async function deletarCursoByAll(curso: Curso): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/cursos/deleteCursoByAll`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curso),
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar curso");
    }

    const data = await response.json();
    return data.message === "Curso deletado com sucesso.";
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    return false;
  }
}
