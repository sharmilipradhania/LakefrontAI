"use client";
import React, { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate a bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "I'm a bot, and I'll respond soon!",
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-[calc(200vh-2rem)] bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <div className="bg-indigo-600 text-white text-center py-4 shadow-lg rounded-b-2xl">
        <h1 className="text-2xl font-bold tracking-wider">AI Chat Assistant</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white shadow-inner rounded-lg mx-4 my-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-sm rounded-2xl shadow-lg ${
                msg.sender === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t border-gray-300 shadow-md rounded-t-2xl">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 text-white px-6 py-3 rounded-r-full hover:bg-indigo-500 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}