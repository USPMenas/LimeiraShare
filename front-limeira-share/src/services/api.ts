const API_URL =
  "https://laughing-space-journey-597x67qjv75fv5qw-5000.app.github.dev/api";

export type Curso = {
  id: number;
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
