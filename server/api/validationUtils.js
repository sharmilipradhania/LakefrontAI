const validateInput = (prompt, selectedModels, apiKeys) => {
    // Check if prompt is provided
    console.log("prompt is provided", prompt);
    console.log(selectedModels);
    if (!prompt) {
      throw new Error("Prompt is required.");
    }
  
    // Check if any model is selected
    if (!selectedModels || selectedModels.length === 0) {
      throw new Error("At least one model must be selected.");
    }
  
    // Check API keys only for selected models
    const missingKeys = selectedModels.filter((model) => !apiKeys[model]);
    if (missingKeys.length > 0) {
      throw new Error(
        `API key(s) missing for the following selected models: ${missingKeys.join(", ")}.`
      );
    }
  };
  
  module.exports = { validateInput };