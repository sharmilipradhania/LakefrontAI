const snowflake = require("snowflake-sdk");
const axios = require("axios");
const { OpenAI } = require("openai");
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
  return `Create a data catalog entry for the following table:\n\n${JSON.stringify(rows, null, 2)}\n\nInclude details such as:
          - Table name
          - Owner
          - Column names, data types, and whether nullable
          - Primary keys (if any)
          - Any additional metadata or constraints`;
}

/**
 * Send the formatted data to OpenAI for training.
 */
async function trainOpenAIModel({ trainingData, openaiApiKey }) {
  try {
    console.log("Sending data to OpenAI for processing...");

    // Configure OpenAI API
    const openai = new OpenAI({ apiKey: openaiApiKey });

    // Prepare messages for the chat completion
    const messages = [
      { role: "system", content: "You are an AI model trainer. Help process the training data." },
      { role: "user", content: `Here is the training data: ${JSON.stringify(trainingData)}` },
    ];

    // Call OpenAI API for chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      max_tokens: 300,
    });

    console.log("OpenAI Training Response:", response);

    return response.choices[0].message;
  } catch (error) {
    console.error("Failed to send data to OpenAI:", error.message || error);
    throw error;
  }
}

/**
 * Main function to connect to Snowflake, query data, and train OpenAI model.
 */
async function connectAndTrain({ account, username, password, warehouse, database, schema }, tableName, openaiApiKey) {
  if (!account || !username || !password || !warehouse || !database || !schema || !tableName || !openaiApiKey) {
    throw new Error("Missing required credentials or parameters.");
  }

  const query = `DESCRIBE TABLE ${database}.${schema}.${tableName}`;
  let connection;

  try {
    console.log("Connecting to Snowflake...");

    // Step 1: Connect to Snowflake
    connection = await connectToSnowflake({ account, username, password, warehouse, database, schema });
    console.log("Connected to Snowflake.");

    // Step 2: Query data from Snowflake
    console.log(`Running query: ${query}`);
    const rows = await querySnowflake({ account, username, password, warehouse, database, schema }, query);

    if (!Array.isArray(rows)) {
      throw new Error("Snowflake query did not return an array of rows.");
    }
    console.log(`Retrieved ${rows.length} rows from Snowflake.`);

    // Step 3: Format data for training
    const trainingData = formatDataForTraining(rows);
    console.log("Formatted data for training.");

    // Step 4: Send data to OpenAI for training
    const data = await trainOpenAIModel({ trainingData, openaiApiKey });
    console.log("Training data sent to OpenAI.");
    console.log(data);
    return data;
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