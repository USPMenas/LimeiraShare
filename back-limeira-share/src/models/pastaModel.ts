import { pool } from "../config/db";

export type Pasta = {
  id?: number;
  disciplina_id: number;
  nome: string;
};

// Criar uma nova pasta dentro de uma disciplina
export async function criarPasta(pasta: Pasta): Promise<Pasta> {
  const result = await pool.query(
    "INSERT INTO pastas (disciplina_id, nome) VALUES ($1, $2) RETURNING *",
    [pasta.disciplina_id, pasta.nome]
  );
  return result.rows[0];
}

// Listar todas as pastas de uma disciplina
export async function listarPastasPorDisciplina(
  disciplina_id: number
): Promise<Pasta[]> {
  const result = await pool.query(
    "SELECT * FROM pastas WHERE disciplina_id = $1",
    [disciplina_id]
  );
  return result.rows;
}

// Deletar uma pasta
export async function deletarPasta(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM pastas WHERE id = $1", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}
