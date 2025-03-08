import { Request, Response } from "express";
import {
  criarCurso,
  listarCursos,
  buscarCursoPorId,
  atualizarCurso,
  deletarCurso,
} from "../models/cursoModel";

import { pool } from "../config/db";

// export async function getCursos(req: Request, res: Response): Promise<any> {
//   try {
//     const cursos = await listarCursos();
//     res.json(cursos);
//   } catch (err) {
//     res.status(500).json({ error: "Erro ao buscar cursos" });
//   }
// }

export async function getCursos(req: Request, res: Response): Promise<any> {
  try {
    console.log("🔹 Iniciando busca de cursos no banco de dados...");

    const cursos = await listarCursos();

    console.log("✅ Cursos retornados:", cursos);

    res.json(cursos);
  } catch (error) {
    console.error("❌ Erro ao buscar cursos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function getCursoById(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const curso = await buscarCursoPorId(Number(id));

  if (!curso) return res.status(404).json({ error: "Curso não encontrado" });

  res.json(curso);
}

export async function createCurso(req: Request, res: Response): Promise<any> {
  const { faculdade, nome, periodo } = req.body;

  if (!faculdade || !nome || !periodo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const novoCurso = await criarCurso({ faculdade, nome, periodo });
  res.status(201).json(novoCurso);
}

export async function updateCurso(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const { faculdade, nome, periodo } = req.body;

  const cursoAtualizado = await atualizarCurso(Number(id), {
    faculdade,
    nome,
    periodo,
  });

  if (!cursoAtualizado)
    return res.status(404).json({ error: "Curso não encontrado" });

  res.json(cursoAtualizado);
}

export async function deleteCurso(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const deletado = await deletarCurso(Number(id));

  if (!deletado) return res.status(404).json({ error: "Curso não encontrado" });

  res.json({ message: "Curso deletado com sucesso" });
}

export async function getDisciplinasPorAno(
  req: Request,
  res: Response
): Promise<any> {
  const { curso_id, ano } = req.params;

  try {
    const query = `
      SELECT d.id, d.nome, d.codigo
      FROM disciplinas d
      JOIN anos a ON d.ano_id = a.id
      JOIN cursos c ON a.curso_id = c.id
      WHERE c.id = $1 AND a.id = $2
    `;

    const { rows } = await pool.query(query, [curso_id, ano]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma disciplina encontrada." });
    }

    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
