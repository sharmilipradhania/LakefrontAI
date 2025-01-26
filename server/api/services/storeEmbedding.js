const { Pool } = require("pg");
const { getEmbedding, formatTableToText } = require("./openaiService");

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/postgres",
});

// Parse metadata text into a structured format
function parseMetadata(rawText) {
  const lines = rawText.split("\n");

  const tableStartIndex = lines.findIndex(line => line.includes("Column Name"));
  const tableEndIndex = lines.findIndex((line, idx) => idx > tableStartIndex && !line.includes("|"));

  if (tableStartIndex === -1 || tableEndIndex === -1) {
    throw new Error("Table not found in the metadata text.");
  }

  const headerLine = lines[tableStartIndex];
  const dataLines = lines.slice(tableStartIndex + 2, tableEndIndex);

  const headers = headerLine
    .split("|")
    .map(h => h.trim())
    .filter(h => h);

  const tableData = dataLines.map(line => {
    const columns = line
      .split("|")
      .map(c => c.trim())
      .filter(c => c);

    const row = {};
    headers.forEach((header, index) => {
      row[header] = columns[index];
    });
    return row;
  });

  const notesStartIndex = lines.findIndex(line => line.startsWith("**Note:**"));
  const notes = notesStartIndex !== -1 ? lines.slice(notesStartIndex).join("\n") : "";

  return { tableData, notes };
}

// Parse raw embedding string into a numeric array
function parseRawEmbedding(rawString) {
  const values = rawString.replace(/[\{\}"]/g, "").split(",");
  return values.map(value => parseFloat(value.trim()));
}

// Format embedding for PGvector
function formatEmbeddingForPGvector(embedding) {

  if (!Array.isArray(embedding)) {
    throw new Error("Embedding must be an array of numeric values.");
  }
  return `[${embedding.join(",")}]`;
}

function validateEmbedding(embedding) {
    if (!Array.isArray(embedding)) {
      throw new Error("Embedding must be an array.");
    }
  
    // Ensure all elements are numbers
    if (!embedding.every(value => typeof value === "number")) {
      throw new Error("Embedding array must contain only numeric values.");
    }
  }

async function catalogAndStore(username, service, tableName, results, OPENAI_API_KEY) {
  console.log("================================Inside Catalog and Store================================");

  const metadata = results.content;
  console.log(`Metadata: ${metadata}`);

  // Parse metadata (assuming you already implemented `parseMetadata`)
  const { tableData, notes } = parseMetadata(metadata);

  if (!Array.isArray(tableData)) {
    throw new Error("Parsed metadata is not an array. Ensure it follows the expected format.");
  }

  // Convert table data to formatted text
  const formattedText = formatTableToText(tableData);
  console.log("Formatted Text:", formattedText);

  // Generate embeddings using OpenAI service
  const rawEmbedding = await getEmbedding(formattedText, OPENAI_API_KEY);
  console.log("Raw Embedding:", rawEmbedding);

  // Validate and format the embedding
  validateEmbedding(rawEmbedding);
  const embedding = formatEmbeddingForPGvector(rawEmbedding);
  console.log("Formatted Embedding for PGvector:", embedding);

  // Insert data into PostgreSQL
  const query = `
    INSERT INTO cataloging_data (username, service, table_name, embedding, metadata)
    VALUES ($1, $2, $3, $4::vector, $5)
  `;
  const values = [username, service, tableName, embedding, JSON.stringify(embedding)];

  await pool.query(query, values);

  console.log("Data inserted successfully.");
  return { message: "Cataloging data stored successfully." };
}

module.exports = { catalogAndStore, formatEmbeddingForPGvector, validateEmbedding, parseRawEmbedding  };