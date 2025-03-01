import { Router } from "express";
import {
  getDisciplinasPorAno,
  createDisciplina,
  deleteDisciplina,
} from "../controllers/disciplinaController";

const router = Router();

router.get("/:ano_id", getDisciplinasPorAno);
router.post("/", createDisciplina);
router.delete("/:id", deleteDisciplina);

export default router;
