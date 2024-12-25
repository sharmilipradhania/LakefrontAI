"use client";
import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface Secret {
  keyName: string;
  keyValue: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [keyName, setKeyName] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [secrets, setSecrets] = useState<Secret[]>([]);

  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [data, setData] = useState(null);
  const router = useRouter();
  // Handle checkbox toggle
  // Handle model selection and secret input prompt
  const handleCheckboxChange = (model: string) => {
    const updatedModels = selectedModels.includes(model)
      ? selectedModels.filter((item) => item !== model)
      : [...selectedModels, model];

    setSelectedModels(updatedModels);
    console.log(updatedModels);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("https://lakefrontai.com:4000/datacatalog", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      }catch (error) {
        console.log(error);
        router.push('/login');
    } 
    };
    fetchData();
  }, []);
    
  // Add Secret Key-Value Pair
  const handleAddSecret = () => {
    if (keyName.trim() && keyValue.trim()) {
      setSecrets((prevSecrets) => [
        ...prevSecrets,
        { keyName: keyName.trim(), keyValue: keyValue.trim() },
      ]);
      setKeyName("");
      setKeyValue("");
      localStorage.setItem("secrets", keyValue);
      setShowSecretInput(false); // Close the input popup
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    // Add the user's message to the chat
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    // Reset the input field
    setInput("");
  
    // Show a loading indicator
    setIsLoading(true);
// Testing begins here
//    const secrets = JSON.parse(localStorage.getItem("secrets") || "{}"); // Assuming secrets are stored as an object
    const selectedModelsToSend = selectedModels; // All selected models
    console.log("selectedModelsToSend",selectedModelsToSend);
    console.log("secrets",secrets);
    let allSecretsPresent = true;
// Tesing ends here
    const promptData = { prompt: input, selectedModels: selectedModels};
    console.log("promptData", promptData);
    try {
      // Send the message to the backend server
      const response = await axios.post("https://lakefrontai.com:4000/processChat", promptData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Full Response:", response.data);
      console.log("Full Response data:", response.data.data);
      // Ensure response is JSON and extract the reply
      const botResponseJ = JSON.stringify(response.data);
      const parsedResponse = JSON.parse(botResponseJ);
      console.log("Parsed Response - OpenAI:", parsedResponse.data.OpenAI);
      console.log("Parsed Response - Gemini:", parsedResponse.data.Gemini);
      
      // Populate the response dynamically
      let reply = "No response received."; // Default fallback
      
      if (parsedResponse.data.OpenAI && parsedResponse.data.Gemini) {
        reply = `OpenAI: ${parsedResponse.data.OpenAI}\nGemini: ${parsedResponse.data.Gemini}`;
      } else if (parsedResponse.data.OpenAI) {
        reply = `OpenAI: ${parsedResponse.data.OpenAI}`;
      } else if (parsedResponse.data.Gemini) {
        reply = `Gemini: ${parsedResponse.data.Gemini}`;
      }
      
      console.log("Final Reply:", reply);
  
      // Add the bot's response to the chat
      const botMessage: Message = {
        id: messages.length + 2,
        text: reply,
        sender: "bot",
      };
  
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, botMessage];
        console.log("Updated Messages State:", updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error:", error);
  
      // Fallback error message
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, something went wrong. Please try again later.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    { data ? 
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-50 border-r border-gray-300 h-full transition-all duration-300 flex flex-col shadow`}
      >
        {/* Toggle Button */}

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-3 hover:bg-gray-200 transition text-center"
      >
        <ChevronDoubleRightIcon
          className={`h-5 w-5 mx-auto transform ${
            isSidebarOpen ? "" : "rotate-180"
          } transition-transform`}
        />
      </button>

      {/* Navigation Links */}
      <ul className="mt-4 space-y-1">
        <li className="flex items-center p-3 hover:bg-gray-200 cursor-pointer">
          <HomeIcon className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Home</span>}
        </li>

        <li
          onClick={() => setShowSecretInput(!showSecretInput)}
          className="flex items-center p-3 hover:bg-gray-200 cursor-pointer"
        >
          <KeyIcon className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Secrets</span>}
        </li>

        <li className="flex items-center p-3 hover:bg-gray-200 cursor-pointer">
          <ChatBubbleLeftIcon className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Chat History</span>}
        </li>

        <li className="p-3 hover:bg-gray-200">
          {/* Top Section: Icon and Title on One Line */}
          <div className="flex items-center justify-start space-x-2">
            <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
            {isSidebarOpen && (
              <h3 className="text-sm font-semibold text-gray-700">Select LLM Models</h3>
            )}
          </div>

          {/* Bottom Section: Checkboxes */}
          {isSidebarOpen && (
            <div className="mt-2 space-y-1 ml-7">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedModels.includes("OpenAI")}
                  onChange={() => handleCheckboxChange("OpenAI")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">OpenAI</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedModels.includes("Gemini")}
                  onChange={() => handleCheckboxChange("Gemini")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Gemini</span>
              </label>
            </div>
          )}
        </li>
      </ul>

        {/* Display Selected Models */}
        <div className="p-4 mt-auto border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Selected Models:
          </h3>
          {selectedModels.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {selectedModels.map((model, index) => (
                <li key={index}>{model}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic">No models selected</p>
          )}
        </div>
      </div>
      {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md px-6 py-4 border-b-2 border-indigo-700 flex items-center justify-between rounded-b-lg">
              <h1 className="text-2xl font-extrabold text-white tracking-wide">
                Gen AI - Document Processing
              </h1>
              <span className="text-sm text-indigo-200 italic"></span>
            </div>
          <div className="flex-1 overflow-y-auto p-6 bg-white flex flex-col-reverse">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-md border ${
                      msg.sender === "user"
                        ? "bg-blue-100 text-blue-900 border-blue-300"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    } shadow-sm`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="text-gray-500 text-sm text-center">Processing...</div>
              )}
            </div>
      {/* Scroll to Bottom Ref */}
      <div ref={messagesEndRef} />
    </div>
            {/* Input Box */}
            <div className="p-4 border-t bg-gray-50 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-l-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </div>

      {/* Secrets Popup */}
      {showSecretInput && (
        <div className="absolute top-20 right-10 bg-white border shadow-lg p-4 rounded-lg w-80">
          <h2 className="text-lg font-semibold mb-2">Add Secret</h2>
          <input
            type="text"
            placeholder="Key Name"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="w-full mb-2 p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Secret Value"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
            className="w-full mb-2 p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddSecret}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Save Secret
          </button>
        </div>
      )}

      {/* Display Saved Secrets */}
      {isSidebarOpen && secrets.length > 0 && (
        <div className="absolute bottom-36 left-0 bg-white border p-4 rounded-lg shadow-lg w-64">
          <h3 className="text-sm font-semibold mb-2">Saved Secrets</h3>
          <ul className="space-y-2">
            {secrets.map((secret, index) => (
              <li
                key={index}
                className="bg-gray-100 px-2 py-1 rounded text-gray-800 text-sm truncate"
              >
                <strong>{secret.keyName}:</strong>{" "}
                {showSecrets ? secret.keyValue : "*****"}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className="text-blue-500 mt-2 hover:underline"
          >
            {showSecrets ? "Hide Secrets" : "Show Secrets"}
          </button>
        </div>
      )}
    </div>
      : <p> loading.. </p>
    }
  </>
  );
}