import { pool } from "../config/db";

export type Ano = {
  id?: number;
  curso_id: number;
  nome: string;
};

// Criar um novo ano
export async function criarAno(ano: Ano): Promise<Ano> {
  const result = await pool.query(
    "INSERT INTO anos (curso_id, nome) VALUES ($1, $2) RETURNING *",
    [ano.curso_id, ano.nome]
  );
  return result.rows[0];
}

// Buscar todos os anos de um curso
export async function listarAnosPorCurso(curso_id: number): Promise<Ano[]> {
  const result = await pool.query(
    "SELECT * FROM anos WHERE curso_id = $1 ORDER BY id",
    [curso_id]
  );
  return result.rows;
}

// Buscar um ano pelo ID
export async function buscarAnoPorId(id: number): Promise<Ano | null> {
  const result = await pool.query("SELECT * FROM anos WHERE id = $1", [id]);
  return result.rows[0] || null;
}

// Deletar um ano
export async function deletarAno(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM anos WHERE id = $1", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}
