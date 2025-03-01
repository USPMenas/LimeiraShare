import { pool } from "../config/db";

export type Disciplina = {
  id?: number;
  ano_id: number;
  codigo: string;
  nome: string;
};

// Criar uma nova disciplina
export async function criarDisciplina(
  disciplina: Disciplina
): Promise<Disciplina> {
  const result = await pool.query(
    "INSERT INTO disciplinas (ano_id, codigo, nome) VALUES ($1, $2, $3) RETURNING *",
    [disciplina.ano_id, disciplina.codigo, disciplina.nome]
  );
  return result.rows[0];
}

// Buscar todas as disciplinas de um ano
export async function listarDisciplinasPorAno(
  ano_id: number
): Promise<Disciplina[]> {
  const result = await pool.query(
    "SELECT * FROM disciplinas WHERE ano_id = $1 ORDER BY id",
    [ano_id]
  );
  return result.rows;
}

// Buscar uma disciplina pelo ID
export async function buscarDisciplinaPorId(
  id: number
): Promise<Disciplina | null> {
  const result = await pool.query("SELECT * FROM disciplinas WHERE id = $1", [
    id,
  ]);
  return result.rows[0] || null;
}

// Deletar uma disciplina
export async function deletarDisciplina(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM disciplinas WHERE id = $1", [
    id,
  ]);
  return result.rowCount ? result.rowCount > 0 : false;
}
