import { Router } from "express";
import {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  getDisciplinasPorAno,
} from "../controllers/cursoController";

const router = Router(); // Certifique-se de que o Router está sendo criado corretamente

// Definir as rotas
router.get("/", getCursos);
router.get("/:id", getCursoById);
router.post("/", createCurso);
router.put("/:id", updateCurso);
router.delete("/:id", deleteCurso);
router.get("/:curso_id/:ano", getDisciplinasPorAno); // 🔹 Nova rota para buscar disciplinas por curso e ano

export default router;
