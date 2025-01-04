const mysql = require("mysql2/promise");

async function connect({ host, port, username, password, database }) {
  if (!host || !port || !username || !password || !database) {
    throw new Error("Missing MySQL credentials");
  }

  const connection = await mysql.createConnection({
    host,
    port,
    user: username,
    password,
    database,
  });

  await connection.connect();
  console.log("Connected to MySQL");
  await connection.end();
}

module.exports = { connect };