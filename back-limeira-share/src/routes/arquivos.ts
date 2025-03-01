import { Router } from "express";
import {
  getArquivosPorPasta,
  uploadArquivo,
  deleteArquivo,
} from "../controllers/arquivoController";
import upload from "../config/multer";

const router = Router();

router.get("/:pasta_id", getArquivosPorPasta);
router.post("/", upload.single("arquivo"), uploadArquivo);
router.delete("/:id", deleteArquivo);

export default router;
