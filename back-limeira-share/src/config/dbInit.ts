import { pool } from "./db";

async function createTables() {
  try {
    await pool.query(`
  CREATE TABLE arquivos (
    id SERIAL PRIMARY KEY,
    pasta_id INT REFERENCES pastas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Exemplo: "pdf", "txt", "docx"
    caminho TEXT NOT NULL -- Caminho no servidor
  );
    `);

    console.log("✅ Tabela 'cursos' criada com sucesso.");
  } catch (err) {
    console.error("❌ Erro ao criar tabelas:", err);
  }
}

createTables();

// CREATE TABLE IF NOT EXISTS anos (
//   id SERIAL PRIMARY KEY,
//   curso_id INT REFERENCES cursos(id) ON DELETE CASCADE,
//   nome VARCHAR(20) NOT NULL

// CREATE TABLE disciplinas (
//   id SERIAL PRIMARY KEY,
//   ano_id INT REFERENCES anos(id) ON DELETE CASCADE,
//   codigo VARCHAR(20) NOT NULL,
//   nome VARCHAR(255) NOT NULL
// );

// CREATE TABLE pastas (
//   id SERIAL PRIMARY KEY,
//   disciplina_id INT REFERENCES disciplinas(id) ON DELETE CASCADE,
//   nome VARCHAR(255) NOT NULL
// );

// CREATE TABLE arquivos (
//   id SERIAL PRIMARY KEY,
//   pasta_id INT REFERENCES pastas(id) ON DELETE CASCADE,
//   nome VARCHAR(255) NOT NULL,
//   tipo VARCHAR(50) NOT NULL, -- Exemplo: "pdf", "txt", "docx"
//   caminho TEXT NOT NULL -- Caminho no servidor
// );
