"use client";

import React, { useState } from "react";
import axios from "axios";

const AskSnowflake: React.FC = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!userQuestion.trim()) {
      alert("Please enter a valid question.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      // Replace this with your backend endpoint for handling user queries.
      const res = await axios.post("https://your-backend-url.com/ask-snowflake", {
        question: userQuestion,
      });

      if (res.status === 200 && res.data?.answer) {
        setResponse(res.data.answer);
      } else {
        setResponse("Sorry, I couldn't fetch the answer. Please try again.");
      }
    } catch (error: any) {
      console.error("Error fetching response:", error);
      setResponse("An error occurred while fetching the answer. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ask Snowflake</h1>
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <textarea
          rows={4}
          placeholder="Ask a question about your data..."
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          onClick={handleAskQuestion}
          disabled={isLoading}
          className={`w-full mt-4 py-2 rounded-md text-white font-semibold ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {isLoading ? "Fetching Answer..." : "Ask Question"}
        </button>
      </div>
      {response && (
        <div className="w-full max-w-xl mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Response</h2>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskSnowflake;