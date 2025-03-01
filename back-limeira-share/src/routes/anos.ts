import { Router } from "express";
import {
  getAnosPorCurso,
  createAno,
  deleteAno,
} from "../controllers/anoController";

const router = Router();

router.get("/:curso_id", getAnosPorCurso);
router.post("/", createAno);
router.delete("/:id", deleteAno);

export default router;
