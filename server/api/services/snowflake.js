const snowflake = require("snowflake-sdk");
const axios = require("axios");
const { OpenAI } = require("openai");
// snowflake.configure({ logLevel: "DEBUG" });

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

function transformSchemaToTargetFormat(schemaArray, tableName) {
  const transformedSchema = {
    tableName: tableName,
    columns: schemaArray.map(column => ({
      name: column.name.toLowerCase(), // Convert name to lowercase if needed
      type: column.type.toLowerCase(), // Adjust data type if necessary
      constraint: [
        column['primary key'] === 'Y' ? 'Primary key' : '',
        column['null?'] === 'N' ? 'Not null' : '',
        column['unique key'] === 'Y' ? 'Unique key' : '',
      ]
        .filter(Boolean) // Remove empty constraints
        .join(', '),
      default: column.default || null, // Include default value if present
      comment: column.comment || null, // Include comment if present
      uniqueKey: column['unique key'] === 'Y', // Include unique key flag
    })),
  };

  return JSON.stringify(transformedSchema, null, 2); // Format as JSON with indentation
}

function formatDataForTraining(tableName, data_schema, data_rows) {
  const transformedSchema = transformSchemaToTargetFormat(data_schema, tableName);

  const hasDataRows = Array.isArray(data_rows) && data_rows.length > 0;
  console.log("hasdata",hasDataRows);
  const messages = [
    {
      role: "system",
      content:
        "You are a data analyst assistant. Your job is to create a data catalog that describes columns, data types, constraints, descriptions, and potential data distributions based on the provided Snowflake table schema.",
    },
    {
      role: "user",
      content: `Here is the Snowflake table schema:
        {
          "tableName": "${tableName}",
          "Schema": ${transformedSchema},
          "Data": ${hasDataRows ? JSON.stringify(data_rows) : "No data rows provided"}
        }
  
        Generate a data catalog with the following details in the format of a table:
        - Column Name
        - Data Type
        - Constraints
        - Description (inferred based on the column name and data type)
        - Data distributions ${
          hasDataRows
            ? "(based on the provided data rows)"
            : "(unable to determine due to absence of data)"
        }
      `,
    },
  ];
  return messages;
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
    const messages = trainingData; 

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

  const query_schema = `DESCRIBE TABLE ${database}.${schema}.${tableName}`;
  const query_data = `SELECT * FROM ${database}.${schema}.${tableName}`;
  let connection;

  try {
    console.log("Connecting to Snowflake...");

    // Step 1: Connect to Snowflake
    connection = await connectToSnowflake({ account, username, password, warehouse, database, schema });
    console.log("Connected to Snowflake.");

    // Step 2.a: Query schema from Snowflake
    console.log(`Running query to fetch schema: ${query_schema}`);
    const data_schema = await querySnowflake(
      { account, username, password, warehouse, database, schema },
      query_schema
    );
    console.log("data schema", data_schema);
    // Check if the query result is valid
    if (!data_schema || !Array.isArray(data_schema)) {
      throw new Error("Snowflake query did not return a valid array for data_schema.");
    }
    console.log(`Retrieved ${data_schema.length} rows from Snowflake for schema.`);

    // Step 2.b: Query data from Snowflake
    console.log(`Running query to fetch data: ${query_data}`);
    const data_rows = await querySnowflake(
      { account, username, password, warehouse, database, schema },
      query_data
    );
    console.log("query data", data_rows)
    // Check if the query result is valid
    if (!data_rows || !Array.isArray(data_rows)) {
      throw new Error("Snowflake query did not return a valid array for data_rows.");
    }
    console.log(`Retrieved ${data_rows.length} rows from Snowflake for data.`);

    // Step 3: Format data for training
    const trainingData = formatDataForTraining(`${database}.${schema}.${tableName}`, data_schema, data_rows);
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