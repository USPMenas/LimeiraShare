import { pool } from "../config/db";

export type Curso = {
  id?: number;
  faculdade: string;
  nome: string;
  periodo: string;
};

// Criar um novo curso
export async function criarCurso(curso: Curso): Promise<Curso> {
  const result = await pool.query(
    "INSERT INTO cursos (faculdade, nome, periodo) VALUES ($1, $2, $3) RETURNING *",
    [curso.faculdade, curso.nome, curso.periodo]
  );
  return result.rows[0];
}

// Buscar todos os cursos
export async function listarCursos(): Promise<Curso[]> {
  const result = await pool.query("SELECT * FROM cursos ORDER BY id");
  return result.rows;
}

// Buscar um curso pelo ID
export async function buscarCursoPorId(id: number): Promise<Curso | null> {
  const result = await pool.query("SELECT * FROM cursos WHERE id = $1", [id]);
  return result.rows[0] || null;
}

// Atualizar um curso
export async function atualizarCurso(
  id: number,
  curso: Curso
): Promise<Curso | null> {
  const result = await pool.query(
    "UPDATE cursos SET faculdade = $1, nome = $2, periodo = $3 WHERE id = $4 RETURNING *",
    [curso.faculdade, curso.nome, curso.periodo, id]
  );
  return result.rows[0] || null;
}

// Deletar um curso
export async function deletarCurso(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM cursos WHERE id = $1", [id]);

  // Correção para evitar erro com rowCount possivelmente nulo
  return result.rowCount ? result.rowCount > 0 : false;
}
