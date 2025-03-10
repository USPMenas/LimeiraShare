import { pool } from "../config/db";

export type Curso = {
  id?: number;
  universidade: string;
  campus: string;
  faculdade: string;
  nome: string;
  periodo: string;
};

// Criar um novo curso
export async function criarCurso(curso: Curso): Promise<Curso> {
  const result = await pool.query(
    "INSERT INTO cursos (universidade, campus, faculdade, nome, periodo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      curso.universidade,
      curso.campus,
      curso.faculdade,
      curso.nome,
      curso.periodo,
    ]
  );
  return result.rows[0];
}

// Buscar todos os cursos
export async function listarCursos(): Promise<Curso[]> {
  const result = await pool.query(`
    SELECT id, universidade, campus, faculdade, nome, periodo FROM cursos
  `);
  return result.rows;
}

// Buscar um curso pelo ID
export async function buscarCursoPorId(id: number): Promise<Curso | null> {
  const result = await pool.query("SELECT * FROM cursos WHERE id = $1", [id]);
  return result.rows[0] || null;
}

export async function buscarCursoID(
  universidade: string,
  campus: string,
  faculdade: string,
  nome: string,
  periodo: string
): Promise<number | null> {
  try {
    const result = await pool.query(
      `SELECT id FROM cursos 
       WHERE LOWER(universidade) = LOWER($1) 
       AND LOWER(campus) = LOWER($2) 
       AND LOWER(faculdade) = LOWER($3) 
       AND LOWER(nome) = LOWER($4) 
       AND LOWER(periodo) = LOWER($5)`,
      [universidade, campus, faculdade, nome, periodo]
    );

    // Se não encontrar, retorna null
    return result.rows.length > 0 ? result.rows[0].id : null;
  } catch (error) {
    console.error("Erro ao buscar ID do curso:", error);
    return null;
  }
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

export async function deleteCursoByAll(
  universidade: string,
  campus: string,
  faculdade: string,
  nome: string,
  periodo: string
): Promise<boolean> {
  console.log("Antes do buscar curso");
  const cursoID = await buscarCursoID(
    universidade,
    campus,
    faculdade,
    nome,
    periodo
  );
  console.log("logo após o buscar curso");

  if (!cursoID) {
    console.error("Curso não encontrado. Nenhuma ação realizada.");
    return false; // Retorna falso para indicar que não há curso para deletar
  }

  console.log("identificação");

  return await deletarCurso(cursoID); // Usa a função já existente para deletar pelo ID
}
