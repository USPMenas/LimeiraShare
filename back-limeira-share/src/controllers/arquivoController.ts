import { Request, Response } from "express";
import {
  criarArquivo,
  listarArquivosPorPasta,
  deletarArquivo,
} from "../models/arquivoModel";
import path from "path";

export async function getArquivosPorPasta(
  req: Request,
  res: Response
): Promise<any> {
  const { pasta_id } = req.params;
  const arquivos = await listarArquivosPorPasta(Number(pasta_id));
  res.json(arquivos);
}

export async function uploadArquivo(req: Request, res: Response): Promise<any> {
  console.log("Body recebido:", req.body);
  console.log("Arquivo recebido:", req.file);

  const { pasta_id } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  if (!pasta_id) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const novoArquivo = await criarArquivo({
    pasta_id: Number(pasta_id),
    nome: req.file.originalname,
    tipo: req.file.mimetype,
    caminho: `/uploads/${req.file.filename}`,
  });

  res.status(201).json(novoArquivo);
}

export async function deleteArquivo(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const deletado = await deletarArquivo(Number(id));

  if (!deletado)
    return res.status(404).json({ error: "Arquivo não encontrado" });

  res.json({ message: "Arquivo deletado com sucesso" });
}
