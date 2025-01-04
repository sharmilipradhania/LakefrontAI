const snowflake = require("snowflake-sdk");
const axios = require("axios");
snowflake.configure({ logLevel: "DEBUG" });

/**
 * Establish a connection to Snowflake.
 */
async function connectToSnowflake({ account, username, password, warehouse, database, schema }) {
    return new Promise((resolve, reject) => {
      const connection = snowflake.createConnection({
        account,
        username,
        password,
        warehouse,
        database,
        schema,
      });
  
      console.log("Connecting to Snowflake...");
      connection.connect((err) => {
        if (err) {
          console.error("Unable to connect to Snowflake:", err.message);
  
          // Enhanced error handling
          if (err.code === "ECONNREFUSED") {
            console.error("Connection refused. Check your network or firewall settings.");
          } else if (err.message.includes("Could not reach Snowflake")) {
            console.error(
              "Network error. Ensure the account URL is correct and reachable. Check firewall or proxy settings."
            );
          } else {
            console.error("Unexpected error during Snowflake connection:", err);
          }
          reject(err);
        } else {
          console.log("Connected to Snowflake successfully.");
          resolve(connection);
        }
      });
    });
  }

/**
 * Execute a query on Snowflake and retrieve data.
 */

// Query Snowflake function
function querySnowflake({ account, username, password, warehouse, database, schema }, query) {
  return new Promise((resolve, reject) => {
    const connection = snowflake.createConnection({
      account,
      username,
      password,
      warehouse,
      database,
      schema,
    });

    console.log("Connecting to Snowflake...");
    connection.connect((err) => {
      if (err) {
        console.error("Unable to connect to Snowflake:", err.message);
        return reject(err);
      }

      console.log("Connected to Snowflake. Executing query...");
      connection.execute({
        sqlText: query,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error("Failed to execute query:", err.message);
            return reject(err);
          }
          console.log(`Query executed successfully. Retrieved ${rows.length} rows.`);
          resolve(rows);
        },
      });
    });
  });
}


/**
 * Format the data for OpenAI training.
 */
function formatDataForTraining(rows) {
  return rows.map((row) => ({
    prompt: `Input: ${JSON.stringify(row)}`,
    completion: "Output: ",
  }));
}

/**
 * Send the formatted data to OpenAI for training.
 */
async function trainOpenAIModel({ trainingData, openaiApiKey, modelEndpoint }) {
  try {
    console.log("Sending data to OpenAI for training...");
    const response = await axios.post(
      modelEndpoint,
      { training_data: trainingData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    console.log("OpenAI Training Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to send data to OpenAI:", error.message || error);
    throw error;
  }
}

/**
 * Main function to connect to Snowflake, query data, and train OpenAI model.
 */
async function connectAndTrain({
  account,
  username,
  password,
  warehouse,
  database,
  schema,
  table,
  openaiApiKey,
  modelEndpoint,
}) {
  if (!account || !username || !password || !warehouse || !database || !schema || !table || !openaiApiKey || !modelEndpoint) {
    throw new Error("Missing required credentials or parameters.");
  }

  const query = `SELECT * FROM ${schema}.${table}`;
  let connection;

  try {
    // Step 1: Connect to Snowflake
    connection = await connectToSnowflake({ account, username, password, warehouse, database, schema });

    // Step 2: Query data from Snowflake
    const rows = await querySnowflake(connection, query);

    // Step 3: Format data for training
    const trainingData = formatDataForTraining(rows);

    // Step 4: Send data to OpenAI for training
    const response = await trainOpenAIModel({ trainingData, openaiApiKey, modelEndpoint });

    return response;
  } catch (error) {
    console.error("An error occurred:", error.message || error);
    throw error;
  } finally {
    if (connection) {
      connection.destroy((err) => {
        if (err) {
          console.error("Failed to close Snowflake connection:", err.message);
        } else {
          console.log("Snowflake connection closed.");
        }
      });
    }
  }
}

module.exports = {
  connectToSnowflake,
  querySnowflake,
  formatDataForTraining,
  trainOpenAIModel,
  connectAndTrain,
};