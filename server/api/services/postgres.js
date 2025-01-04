const { Client } = require("pg");

async function connect({ host, port, username, password, database }) {
  if (!host || !port || !username || !password || !database) {
    throw new Error("Missing PostgreSQL credentials");
  }

  const client = new Client({
    host,
    port,
    user: username,
    password,
    database,
  });

  await client.connect();
  console.log("Connected to PostgreSQL");
  await client.end();
}

module.exports = { connect };