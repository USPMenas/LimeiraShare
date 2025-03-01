import express from "express";
import cors from "cors";
import { config } from "dotenv";

import cursoRoutes from "./routes/cursos.ts";
import disciplinaRoutes from "./routes/disciplinas";
import arquivoRoutes from "./routes/arquivos";

config(); // Carregar variáveis de ambiente

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/cursos", cursoRoutes);
app.use("/api/disciplinas", disciplinaRoutes);
app.use("/api/arquivos", arquivoRoutes);

export default app;
