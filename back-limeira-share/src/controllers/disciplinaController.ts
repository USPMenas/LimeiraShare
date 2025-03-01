import { Request, Response } from "express";
import {
  criarDisciplina,
  listarDisciplinasPorAno,
  buscarDisciplinaPorId,
  deletarDisciplina,
} from "../models/disciplinaModel";

export async function getDisciplinasPorAno(
  req: Request,
  res: Response
): Promise<any> {
  const { ano_id } = req.params;
  const disciplinas = await listarDisciplinasPorAno(Number(ano_id));
  res.json(disciplinas);
}

export async function createDisciplina(
  req: Request,
  res: Response
): Promise<any> {
  const { ano_id, codigo, nome } = req.body;

  if (!ano_id || !codigo || !nome) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const novaDisciplina = await criarDisciplina({ ano_id, codigo, nome });
  res.status(201).json(novaDisciplina);
}

export async function deleteDisciplina(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.params;
  const deletado = await deletarDisciplina(Number(id));

  if (!deletado)
    return res.status(404).json({ error: "Disciplina não encontrada" });

  res.json({ message: "Disciplina deletada com sucesso" });
}
