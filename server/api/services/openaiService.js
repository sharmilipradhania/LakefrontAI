const axios = require("axios");
const { OpenAI } = require("openai");


/**
 * Generate embeddings for the given text using OpenAI's API.
 * @param {string} text - The text to generate embeddings for.
 * @param {string} OPENAI_API_KEY - OpenAI API key for authentication.
 * @returns {Promise<Array<number>>} - The embedding vector.
 */
async function getEmbedding(text, OPENAI_API_KEY) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/embeddings",
        {
          model: "text-embedding-ada-002",
          input: text,
        },
        {
          headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
        }
      );
  
      return response.data.data[0].embedding;
    } catch (error) {
      console.error("Error generating embedding:", error.message);
      throw new Error("Failed to generate embedding.");
    }
  }
  
  /**
   * Convert tabular data into a formatted text description.
   * @param {Array<Object>} tableData - Array of table rows as objects.
   * @returns {string} - Formatted string representation of the table.
   */
  function formatTableToText(tableData) {
    if (!Array.isArray(tableData)) {
        throw new Error("Input data is not an array. Please provide an array of table rows.");
    }
    let text = "Data Catalog:\n";
  
    tableData.forEach((row, index) => {
      text += `Row ${index + 1}:\n`;
      Object.entries(row).forEach(([key, value]) => {
        text += `  ${key}: ${value}\n`;
      });
      text += "\n";
    });
  
    return text.trim();
  }

async function generateAnswer(question, context, OPENAI_API_KEY) {
    // OpenAI API call using GPT-4
      // Load API keys
    const  prompt = `Answer the question based on the following context:\n\n${JSON.stringify(context)}\n\nQuestion: ${question}`;
   
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        });

    const answer = response.choices[0].message['content'];


  return answer;
}

module.exports = { getEmbedding, generateAnswer, formatTableToText };