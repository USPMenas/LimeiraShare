import { Request, Response } from "express";
import {
  criarAno,
  listarAnosPorCurso,
  buscarAnoPorId,
  deletarAno,
} from "../models/anoModel";

export async function getAnosPorCurso(
  req: Request,
  res: Response
): Promise<any> {
  const { curso_id } = req.params;
  const anos = await listarAnosPorCurso(Number(curso_id));
  res.json(anos);
}

export async function createAno(req: Request, res: Response): Promise<any> {
  const { curso_id, nome } = req.body;

  if (!curso_id || !nome) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const novoAno = await criarAno({ curso_id, nome });
  res.status(201).json(novoAno);
}

export async function deleteAno(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const deletado = await deletarAno(Number(id));

  if (!deletado) return res.status(404).json({ error: "Ano não encontrado" });

  res.json({ message: "Ano deletado com sucesso" });
}
