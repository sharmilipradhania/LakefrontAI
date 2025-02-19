'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiSend } from 'react-icons/fi';

const MainContent: React.FC = () => {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Predefined options inside chat box
  const predefinedOptions = [
    'List tables in the schema',
    'Display Catalog of table',
    'Show top 1000 rows',
    'Find any column or table',
    'Ask any other about the data',
  ];

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing effect for bot responses
  const typeText = (text: string, callback: (text: string) => void) => {
    let index = 0;
    let currentText = '';

    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        callback(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust speed here (lower for faster typing)
  };

  // Mock API Call - Replace with real API
  const fetchAnswerFromBackend = async (query: string) => {
    setLoading(true);

    try {
      const response = "Tell me how to do your do";

      const data =  response;
      
      // Add an empty message for typing simulation
      setMessages((prev) => [...prev, { type: 'bot', text: '' }]);

      typeText(data || 'No response received', (typedText) => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { type: 'bot', text: typedText };
          return newMessages;
        });
      });
      
    } catch (error) {
      setMessages((prev) => [...prev, { type: 'bot', text: 'Error fetching response' }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle option click
  const handleOptionClick = (query: string) => {
    setMessages((prev) => [...prev, { type: 'user', text: query }]);
    fetchAnswerFromBackend(query);
  };

  // Handle manual input submission
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [...prev, { type: 'user', text: inputMessage }]);
    fetchAnswerFromBackend(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 p-5 text-center text-2xl font-semibold shadow-lg">
        Analytics Assistant
      </div>

      {/* Chat Box */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">No messages yet. Select an option below to start.</p>
          )}

          {/* Chat Messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 text-black w-full rounded-lg shadow-md ${
                msg.type === 'user'
                  ? 'bg-gray-200 text-right self-end'
                  : 'bg-white text-left self-start border-l-4 border-blue-500'
              }`}
            >
              {msg.text || (msg.type === 'bot' && <span className="text-gray-400">Typing...</span>)}
            </div>
          ))}

          {/* Predefined Options (Now Look Like Chat Messages) */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {predefinedOptions.map((option, index) => (
                <button
                  key={index}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 shadow-md hover:bg-gray-100 transition-all duration-200 w-full"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Scroll Target */}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input Box (Floating Chat Bar) */}
        <div className="relative p-4 bg-white shadow-lg border-t border-gray-300">
          <div className="flex items-center space-x-2 bg-gray-200 rounded-full p-3">
            {/* Plus icon (attachment) */}
            <button
              className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center 
                     hover:bg-blue-600 transition-all duration-200 shadow-md"
              aria-label="Add attachment"
            >
              <FiPlus size={20} />
            </button>

            {/* Input Field */}
            <textarea
              className="flex-1 bg-transparent text-black border-none focus:outline-none resize-none h-12 p-2"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />

            {/* Send button */}
            <button
              className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center 
                     hover:bg-green-600 transition-all duration-200 shadow-md"
              onClick={handleSendMessage}
              aria-label="Send message"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;