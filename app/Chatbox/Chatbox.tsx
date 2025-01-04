"use client";

import React, { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Chatbox() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    simulateBotResponse();
  };

  const simulateBotResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "This is a response from the bot!" }]);
      setIsTyping(false);
    }, 1500); // Simulate bot response delay
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-bold">Chat with AI</h2>
          <button className="text-white hover:text-gray-200">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } p-3 rounded-lg max-w-xs`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                Bot is typing...
              </div>
            </div>
          )}

          {/* Scroll to bottom */}
          <div ref={chatEndRef}></div>
        </div>

        {/* Chat Input */}
        <div className="flex items-center border-t border-gray-200 p-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          {input && (
            <button
              onClick={() => setInput("")}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={handleSend}
            className="ml-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <PaperAirplaneIcon className="h-6 w-6 rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
}