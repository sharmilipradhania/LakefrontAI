function buildQuery(task, { database, schema, tableName, columnName }) {
    if (task === "catalog") {
      if (!database) {
        return `SHOW DATABASES`; // List all databases
      } else if (!schema) {
        return `SHOW SCHEMAS IN DATABASE ${database}`; // Schemas in the database
      } else if (!tableName) {
        return `SHOW TABLES IN SCHEMA ${database}.${schema}`; // Tables in the schema
      } else {
        return `SELECT * FROM ${database}.${schema}.${tableName} LIMIT 10`; // Sample rows
      }
    } else if (task === "search") {
      return `SELECT TABLE_CATALOG AS DATABASE_NAME,
                      TABLE_SCHEMA,
                      TABLE_NAME,
                      COLUMN_NAME
              FROM 
                SNOWFLAKE.ACCOUNT_USAGE.COLUMNS
              WHERE LOWER(COLUMN_NAME) LIKE LOWER('%${columnName}%')
                    AND TABLE_SCHEMA NOT IN ('INFORMATION_SCHEMA')
                    AND DELETED IS NULL`;
    }
    throw new Error("Invalid task specified.");
  }
  
  module.exports = { buildQuery };