import { Request, Response } from "express";
import {
  criarCurso,
  listarCursos,
  buscarCursoPorId,
  atualizarCurso,
  deletarCurso,
} from "../models/cursoModel";

export async function getCursos(req: Request, res: Response): Promise<any> {
  try {
    const cursos = await listarCursos();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cursos" });
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
