import { Request, Response } from "express";
import {
  criarPasta,
  listarPastasPorDisciplina,
  deletarPasta,
} from "../models/pastaModel";

export async function getPastasPorDisciplina(
  req: Request,
  res: Response
): Promise<any> {
  const { disciplina_id } = req.params;
  const pastas = await listarPastasPorDisciplina(Number(disciplina_id));
  res.json(pastas);
}

export async function createPasta(req: Request, res: Response): Promise<any> {
  const { disciplina_id, nome } = req.body;

  if (!disciplina_id || !nome) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const novaPasta = await criarPasta({ disciplina_id, nome });
  res.status(201).json(novaPasta);
}

export async function deletePasta(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const deletado = await deletarPasta(Number(id));

  if (!deletado) return res.status(404).json({ error: "Pasta não encontrada" });

  res.json({ message: "Pasta deletada com sucesso" });
}
