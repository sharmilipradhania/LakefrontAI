const axios = require("axios");
const OpenAI = require("openai");

// Call OpenAI API
const callOpenAI = async (prompt, apiKey) => {
  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });
    return response.choices[0]?.message?.content || "No response from OpenAI.";
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.message);
    throw new Error("Error fetching response from OpenAI");
  }
};

// Call Gemini API
const callGemini = async (prompt, apiKey) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta3/models/gemini-pro:generateContent",
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    return response.data?.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    throw new Error("Error fetching response from Gemini");
  }
};

module.exports = { callOpenAI, callGemini };