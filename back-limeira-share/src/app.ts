import express from "express";
import cors from "cors";
import { config } from "dotenv";

import cursoRoutes from "./routes/cursos.ts";
import disciplinaRoutes from "./routes/disciplinas";
import arquivoRoutes from "./routes/arquivos";
import anoRoutes from "./routes/anos";
import pastaRoutes from "./routes/pastas";

config(); // Carregar variáveis de ambiente

const app = express();
// 🔹 Configurar CORS para permitir requisições do frontend (substitua pela URL exata)
const corsOptions = {
  origin: "*", // Permite qualquer origem (para testes)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use("/api/cursos", cursoRoutes);
app.use("/api/disciplinas", disciplinaRoutes);
app.use("/api/arquivos", arquivoRoutes);
app.use("/api/anos", anoRoutes);
app.use("/api/pastas", pastaRoutes);
app.use("/uploads", express.static("uploads"));

export default app;
