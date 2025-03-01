import { Router } from "express";
import {
  getPastasPorDisciplina,
  createPasta,
  deletePasta,
} from "../controllers/pastaController";

const router = Router();

router.get("/:disciplina_id", getPastasPorDisciplina);
router.post("/", createPasta);
router.delete("/:id", deletePasta);

export default router;
