const axios = require("axios");

async function connect({ clientId, clientSecret, baseUrl }) {
  if (!clientId || !clientSecret || !baseUrl) {
    throw new Error("Missing Looker credentials");
  }

  const authUrl = `${baseUrl}/login`;
  const response = await axios.post(authUrl, {
    client_id: clientId,
    client_secret: clientSecret,
  });

  if (response.status !== 200) {
    throw new Error("Failed to authenticate with Looker");
  }

  console.log("Authenticated with Looker");
}

module.exports = { connect };