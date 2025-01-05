"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AskSnowflake: React.FC = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<{ question: string; answer: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  // Dropdown States
  const [databases, setDatabases] = useState<string[]>([]);
  const [schemas, setSchemas] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch Dropdown Data from API
  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await axios.get("https://your-backend-url.com/databases");
        setDatabases(response.data.databases || []);
      } catch (error) {
        console.error("Error fetching databases:", error);
      }
    };

    fetchDatabases();
  }, []);

  useEffect(() => {
    if (selectedDatabase) {
      const fetchSchemas = async () => {
        try {
          const response = await axios.get(`https://your-backend-url.com/schemas?database=${selectedDatabase}`);
          setSchemas(response.data.schemas || []);
        } catch (error) {
          console.error("Error fetching schemas:", error);
        }
      };

      fetchSchemas();
    }
  }, [selectedDatabase]);

  useEffect(() => {
    if (selectedSchema) {
      const fetchTables = async () => {
        try {
          const response = await axios.get(
            `https://your-backend-url.com/tables?database=${selectedDatabase}&schema=${selectedSchema}`
          );
          setTables(response.data.tables || []);
        } catch (error) {
          console.error("Error fetching tables:", error);
        }
      };

      fetchTables();
    }
  }, [selectedSchema]);

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

  const handleTrainModel = async () => {
    if (!selectedDatabase || !selectedSchema || !selectedTable) {
      alert("Please select a database, schema, and table.");
      return;
    }

    try {
      const response = await axios.post("https://your-backend-url.com/train-llm", {
        database: selectedDatabase,
        schema: selectedSchema,
        table: selectedTable,
      });

      if (response.status === 200) {
        alert("LLM model trained successfully!");
      } else {
        alert("Failed to train the model. Please try again.");
      }
    } catch (error) {
      console.error("Error training model:", error);
      alert("An error occurred while training the model. Please try again.");
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
          Train LLM Model
        </button>
      </div>

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
              <p>{chat.answer}</p>
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