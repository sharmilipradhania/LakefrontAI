"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface SearchResult {
    columnTableName: string;
    columnName: string;
  }

const AskSnowflake: React.FC = () => {
  const [username, setUserName] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<{ question: string; answer: string | React.ReactNode }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  // Dropdown States
  const [databases, setDatabases] = useState<string[]>([]);
  const [schemas, setSchemas] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<any>({});
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
 
    // Retrieve credentials from localStorage
    useEffect(() => {
        const storedCredentials = localStorage.getItem("serviceActive");
        if (storedCredentials) {
        const parsedCredentials = JSON.parse(storedCredentials);
        setCredentials(parsedCredentials);
        console.log("Retrieved credentials:", parsedCredentials);
        } else {
        console.warn("No credentials found in localStorage.");
        }
    }, []);

    // Retrieve username from localStorage
    useEffect(() => {
        const storedusername = localStorage.getItem("username");
        if (storedusername) {
            setUserName(storedusername);
            console.log("Retrieved username:", storedusername);
        } else {
            console.warn("No username found in localStorage.");
        }
    }, []);

    // Fetch Databases
    useEffect(() => {
        if (Object.keys(credentials).length > 0) {
        const fetchDatabases = async () => {
            try {
            const response = await axios.post(
                `https://lakefrontai.com:4000/${username}/aiagent/datacatalog/query`,
                {
                    ...credentials,
                    task: "catalog",
                },
                {
                headers: {
                    "Content-Type": "application/json",
                },
                }
            );
            // Extract 'data' key from the response and validate it's an array
            if (response.status === 200 && Array.isArray(response.data.data)) {
                setDatabases(response.data.data); // Update with the correct array
            } else {
                console.error("Unexpected response format:", response.data);
                setDatabases([]); // Ensure it's reset to an empty array
            }
            } catch (error) {
            console.error("Error fetching databases:", error);
            setDatabases([]); // Reset to an empty array on error
            }
        };

        fetchDatabases();
        }
    }, [credentials]);

    // Fetch Schemas whenever a database is selected
    useEffect(() => {
        if (selectedDatabase && Object.keys(credentials).length > 0) {
        const fetchSchemas = async () => {
            try {
            const response = await axios.post(
                `https://lakefrontai.com:4000/${username}/aiagent/datacatalog/query`,
                {
                ...credentials, // Spread credentials into the request body
                database: selectedDatabase, // Pass the selected database
                task: "catalog",
                },
                {
                headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 200 && Array.isArray(response.data.data)) {
                setSchemas(response.data.data); // Populate schema dropdown
            } else {
                console.error("Unexpected response format:", response.data);
                setSchemas([]);
            }
            } catch (error) {
            console.error("Error fetching schemas:", error);
            setSchemas([]);
            }
        };

        fetchSchemas();
        }
    }, [selectedDatabase, credentials]);

    // Fetch Tables when a schema is selected
    useEffect(() => {
        if (selectedSchema && selectedDatabase && Object.keys(credentials).length > 0) {
        const fetchTables = async () => {
            try {
            const response = await axios.post(
                `https://lakefrontai.com:4000/${username}/aiagent/datacatalog/query`,
                {
                ...credentials,
                database: selectedDatabase, // Pass the selected database
                schema: selectedSchema, // Pass the selected schema
                task: "catalog",
                },
                {
                headers: { "Content-Type": "application/json" },
                }
            );
            if (response.status === 200 && Array.isArray(response.data.data)) {
                setTables(response.data.data); // Populate table dropdown
            } else {
                console.error("Unexpected response format:", response.data);
                setTables([]);
            }
            } catch (error) {
            console.error("Error fetching tables:", error);
            setTables([]);
            }
        };

        fetchTables();
        }
    }, [selectedSchema, selectedDatabase, credentials]);

  const handleAskQuestion = async () => {
    if (!userQuestion.trim()) {
      alert("Please enter a valid question.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const res = await axios.post("https://your-backend-url.com/ask-snowflake", {
        question: userQuestion,
      });
  
      const answer =
        res.status === 200 && res.data?.answer
          ? res.data.answer
          : "Sorry, I couldn't fetch the answer. Please try again.";
  
      setChatHistory((prev) => [...prev, { question: userQuestion, answer }]);
    } catch (error: any) {
      console.error("Error fetching response:", error);
      setChatHistory((prev) => [
        ...prev,
        { question: userQuestion, answer: "An error occurred while fetching the answer. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
  
      // Clear the text box after submission
      setUserQuestion("");
  
      // Smooth scroll to the bottom of the chat
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

    const formatResponseData = (answer: string) => {
        return (
            <div
            style={{
            padding: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            fontFamily: "monospace",
            color: "#333",
            lineHeight: "1.6",
            }}
        >
            <h3 style={{ marginBottom: "16px" }}>Data Catalog</h3>
            <table
            style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "auto",
            }}
            >
            <thead>
                {answer
                .split("\n") // Split by lines
                .filter((line: string) => line.startsWith("|")) // Filter rows starting with '|'
                .slice(0, 1) // Take the first row (header)
                .map((line: string, index: number) => {
                    const headers: string[] = line
                    .split("|")
                    .filter((col: string) => col.trim() !== "") // Remove empty columns
                    .map((col: string) => col.trim()); // Trim each header
                    return (
                    <tr key={index}>
                        {headers.map((header: string, headerIndex: number) => (
                        <th
                            key={headerIndex}
                            style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "left",
                            backgroundColor: "#f1f1f1",
                            }}
                        >
                            {header}
                        </th>
                        ))}
                    </tr>
                    );
                })}
            </thead>
            <tbody>
                {answer
                .split("\n") // Split by lines
                .filter((line: string) => line.startsWith("|")) // Filter rows starting with '|'
                .slice(1) // Skip the first row (header)
                .map((dataRow: string, rowIndex: number) => {
                    const columns: string[] = dataRow
                    .split("|")
                    .filter((col: string) => col.trim() !== "") // Remove empty columns
                    .map((col: string) => col.trim()); // Trim each column
                    return (
                    <tr key={rowIndex}>
                        {columns.map((col: string, colIndex: number) => (
                        <td
                            key={colIndex}
                            style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            wordWrap: "break-word",
                            textAlign: colIndex === 0 ? "left" : "center",
                            }}
                        >
                            {col}
                        </td>
                        ))}
                    </tr>
                    );
                })}
            </tbody>
            </table>
            <div style={{ marginTop: "16px" }}>
            <h4 style={{ marginBottom: "8px" }}>Notes:</h4>
            <ul style={{ paddingLeft: "20px" }}>
                <li>
                <strong>Constraints:</strong> The constraint column is  as
                it was  provided in the schema.
                </li>
                <li>
                <strong>Description:</strong> The description is inferred based on
                the column name and data type.
                </li>
                <li>
                <strong>Data Distributions:</strong> The data distributions are based
                on the provided data rows.
                </li>
            </ul>
            </div>
        </div>
        );
    };
  const [isCataloging, setIsCataloging] = useState(false);

  const handleTrainModel = async () => {
    if (!selectedDatabase || !selectedSchema || !selectedTable ||  !credentials) {
      alert("Please select a service, database, schema, table, and provide credentials.");
      return;
    }
    console.log("credentials", credentials);
    console.log("credentials.service", credentials.service);
    console.log("credentials.account", credentials.credentials.account);
    setIsCataloging(true);
    try {
      const response = await axios.post(`https://lakefrontai.com:4000/${username}/aiagent/datacatalog/cataloging`, 
            {
                service: credentials.service,
                credentials: {
                account: credentials.credentials.account,
                username: credentials.credentials.username,
                password: credentials.credentials.password,
                warehouse: credentials.credentials.warehouse,
                database: selectedDatabase,
                schema: selectedSchema
                },
                tableName: selectedTable,
            },
            {
            headers: { "Content-Type": "application/json" },
            }
        );
  
      if (response.status === 200) {
            const answer =
              response.data?.data?.content ??
              "Sorry, I couldn't fetch the answer. Please try again.";
      
            // Format the answer content for structured display
            const formattedAnswer = formatResponseData(answer);
      
            // Update chat history
            setChatHistory((prevChatHistory) => [
              ...prevChatHistory,
              { question: "Data Catalog", answer: formattedAnswer },
            ]);
        alert("Data cataloged successfully!");

        console.log("Response Data:", response.data.data.content);
      } else {
        alert("Failed to catalog the data. Please try again.");
        console.error("Response Status:", response.status);
      }
    } catch (error) {
      console.error("Error cataloging:", error);
      alert("An error occurred while cataloging the data. Please try again.");
    }
    setIsCataloging(false); 
  };

        const [columnName, setColumnName] = useState("");
        const [isSearching, setIsSearching] = useState(false);
        const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

        const handleSearch = async () => {
        if (!columnName.trim()) {
            alert("Please enter a column name to search.");
            return;
        }

        setIsSearching(true); // Set button to "Searching..."

        try {
            const response = await axios.post(
            `https://lakefrontai.com:4000/${username}/aiagent/datacatalog/query`,
            {
                ...credentials,
                database: selectedDatabase, // Pass the selected database
                schema: selectedSchema, // Pass the selected schema
                columnName: columnName.trim(), // Include the column name
                task: "search", // Backend task to execute when doing the column search
            },
            {
                headers: { "Content-Type": "application/json" },
            }
            );

            if (response.status === 200) {
            console.log("Search Response:", response.data);
            // Parse and store search results
            setSearchResults(response.data.data || []);
            } else {
            console.error("Error: Unexpected response status", response.status);
            alert("Failed to fetch data. Please try again.");
            }
        } catch (error) {
            console.error("Error during search:", error);
            alert("An error occurred while searching. Please try again.");
        } finally {
            setIsSearching(false); // Reset button to "Search"
        }
        };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Dropdown Section */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex space-x-4">
          <select
            value={selectedDatabase || ""}
            onChange={(e) => setSelectedDatabase(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>
              Select Database
            </option>
            {databases.map((db) => (
              <option key={db} value={db}>
                {db}
              </option>
            ))}
          </select>
          <select
            value={selectedSchema || ""}
            onChange={(e) => setSelectedSchema(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>
              Select Schema
            </option>
            {schemas.map((schema) => (
              <option key={schema} value={schema}>
                {schema}
              </option>
            ))}
          </select>
          <select
            value={selectedTable || ""}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>
              Select Table
            </option>
            {tables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleTrainModel}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          {isCataloging ? "Generating..." : "Generate Catalog"} 
        </button>
      </div>
        {/* New Section: Search Column */}
        <div style={{ marginTop: "24px", display: "flex", alignItems: "center" }}>
                <label
                htmlFor="columnNameInput"
                style={{ marginRight: "8px", fontWeight: "bold" }}
                >
                Enter Column Name:
                </label>
                <input
                id="columnNameInput"
                type="text"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                placeholder="Column name"
                style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    flex: 1,
                    marginRight: "8px",
                }}
                />
                <button
                onClick={handleSearch}
                style={{
                    padding: "8px 16px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                >
                {isSearching ? "Searching..." : "Search"}
                </button>
        </div>
        {/* Dropdown Menu */}
        {searchResults.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                <label
                    htmlFor="resultsDropdown"
                    style={{ marginRight: "8px", fontWeight: "bold" }}
                >
                    Search Results:
                </label>
                <select
                    id="resultsDropdown"
                    style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100%",
                    }}
                >
                    <option value="">Select a result</option>
                    {searchResults.map((result, index) => (
                    <option
                        key={index}
                        value={result.columnTableName}
                    >{`TableName: ${result.columnTableName} - ColumnName: ${result.columnName}`}</option>
                    ))}
                </select>
                </div>
            )}
      {/* Chat History */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
      >
        {chatHistory.map((chat, index) => (
          <div key={index} className="space-y-2">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-md shadow-md">
              <p className="font-medium">You:</p>
              <p>{chat.question}</p>
            </div>
            <div className="bg-gray-200 text-gray-800 p-3 rounded-md shadow-md">
              <p className="font-medium">Snowflake:</p>
              <div>{chat.answer}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-600">
            <p>Fetching answer...</p>
          </div>
        )}
      </div>


        {/* Fixed Input Box */}
        <div className="bg-white p-4 border-t flex items-center space-x-4">
            <textarea
                rows={2}
                placeholder="Ask a question about your data..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevents adding a new line
                    handleAskQuestion();
                }
                }}
                className="flex-grow border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <button
                onClick={handleAskQuestion}
                disabled={isLoading}
                className={`px-6 py-2 rounded-md text-white font-semibold ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } transition`}
            >
                {isLoading ? "Fetching..." : "Ask"}
            </button>
        </div>
    </div>
  );
};

export default AskSnowflake;