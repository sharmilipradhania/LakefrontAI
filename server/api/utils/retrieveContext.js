const { Pool } = require("pg");
const { getEmbedding } = require("../services/openaiService");
const { validateEmbedding, formatEmbeddingForPGvector } = require("../services/storeEmbedding");

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/postgres",
});

async function retrieveContext(username, question, OPENAI_API_KEY) {
    try {
      const rawQuestionEmbedding = await getEmbedding(question, OPENAI_API_KEY);
      console.log("Raw Embedding:", rawQuestionEmbedding);
  
      // Validate and format the embedding
      validateEmbedding(rawQuestionEmbedding);
      const questionEmbedding = formatEmbeddingForPGvector(rawQuestionEmbedding);
      console.log("Formatted Embedding for PGvector:", questionEmbedding);
  
      const query = `
        SELECT table_name, metadata, 
               1 - (embedding <=> $1) AS similarity
        FROM cataloging_data
        WHERE username = $2
        ORDER BY similarity DESC
        LIMIT 1;
      `;
      const values = [questionEmbedding, username];
  
      const result = await pool.query(query, values);
      console.log("Result rows:", result.rows);
      return result;
    } catch (error) {
      console.error("Error in retrieveContext:", error.message);
      throw new Error("Failed to retrieve context.");
    }
  }

module.exports = { retrieveContext };