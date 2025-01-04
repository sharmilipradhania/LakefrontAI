function handleError(res, error, message) {
    console.error(message, error.message || error);
    res.status(500).json({ error: message });
  }
  
  module.exports = { handleError };