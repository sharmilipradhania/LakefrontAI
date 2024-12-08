"use client";
import React, { useState } from "react";
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

  const [keyName, setKeyName] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [secrets, setSecrets] = useState<Secret[]>([]);

  // Add Secret Key-Value Pair
  const handleAddSecret = () => {
    if (keyName.trim() && keyValue.trim()) {
      setSecrets((prevSecrets) => [
        ...prevSecrets,
        { keyName: keyName.trim(), keyValue: keyValue.trim() },
      ]);
      setKeyName("");
      setKeyValue("");
      setShowSecretInput(false); // Close the input popup
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "I'm a bot, and I'll respond soon!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-50 border-r border-gray-300 h-full transition-all duration-300 flex flex-col shadow`}
      >
        {/* Toggle Button */}
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
          <li className="flex items-center p-3 hover:bg-gray-200 cursor-pointer">
            <Cog6ToothIcon className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Settings</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md px-6 py-4 border-b-2 border-indigo-700 flex items-center justify-between rounded-b-lg">
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            Gen AI - Ask me anything you need
          </h1>
          <span className="text-sm text-indigo-200 italic">Empowering Conversations</span>
        </div>

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
        <div className="absolute bottom-10 left-10 bg-white border p-4 rounded-lg shadow-lg w-64">
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
  );
}