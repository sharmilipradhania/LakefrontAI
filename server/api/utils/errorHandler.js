function handleError(res, error, message) {
  console.error(message, error.message);
  return res.status(500).json({ error: message, details: error.message });
}

module.exports = { handleError };