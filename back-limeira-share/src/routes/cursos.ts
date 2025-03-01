import { Router } from "express";
import {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
} from "../controllers/cursoController";

const router = Router(); // Certifique-se de que o Router está sendo criado corretamente

// Definir as rotas
router.get("/", getCursos);
router.get("/:id", getCursoById);
router.post("/", createCurso);
router.put("/:id", updateCurso);
router.delete("/:id", deleteCurso);

export default router;
