import { pool } from "../config/db";

export type Arquivo = {
  id?: number;
  pasta_id: number;
  nome: string;
  tipo: string;
  caminho: string;
};

// Criar um novo arquivo dentro de uma pasta
export async function criarArquivo(arquivo: Arquivo): Promise<Arquivo> {
  const result = await pool.query(
    "INSERT INTO arquivos (pasta_id, nome, tipo, caminho) VALUES ($1, $2, $3, $4) RETURNING *",
    [arquivo.pasta_id, arquivo.nome, arquivo.tipo, arquivo.caminho]
  );
  return result.rows[0];
}

// Listar todos os arquivos de uma pasta
export async function listarArquivosPorPasta(
  pasta_id: number
): Promise<Arquivo[]> {
  const result = await pool.query(
    "SELECT * FROM arquivos WHERE pasta_id = $1",
    [pasta_id]
  );
  return result.rows;
}

// Deletar um arquivo
export async function deletarArquivo(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM arquivos WHERE id = $1", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}
