"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  KeyIcon,
  Cog6ToothIcon,
  ChevronDoubleRightIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  DocumentArrowUpIcon, // Upload icon
  XMarkIcon, // Close icon for the pop-up
  ArrowLeftIcon, // Back icon
} from "@heroicons/react/24/outline";

interface Secret {
  keyType: string;
  keyName: string;
  keyValue: string;
  isVisible: boolean; // For toggling secret visibility
}

const ChatWindow: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [keyName, setKeyName] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [username,setusername] = useState(""); // Replace with dynamic username
  const [token,settoken] = useState(""); // token 
  const [keyType, setKeyType] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedtoken = localStorage.getItem('token');
    if (storedUsername) {
      setusername(storedUsername);
    } else {
      // Redirect to login if no username is found in localStorage
      router.push('/login');
    }
    if (storedtoken) {
      settoken(storedtoken);
    } else {
      // Redirect to login if no token is found in localStorage
      router.push('/login');
    }
  }, [router]);

  // Load secrets and selected models from localStorage when the component mounts
  useEffect(() => {
    const storedSecrets = localStorage.getItem("secrets");
    if (storedSecrets) {
      setSecrets(JSON.parse(storedSecrets));
    }

    const storedModels = localStorage.getItem("selectedModels");
    if (storedModels) {
      setSelectedModels(JSON.parse(storedModels));
    }
  }, []);

  // Load  username from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setusername(storedUsername);
    }
  }, [username]);


  // Load token from localStorage when the component mounts
  useEffect(() => {
    const storedtoken = localStorage.getItem("token");
    if (storedtoken) {
      settoken(storedtoken);
    }
  }, [token]);
  // Save secrets and selected models to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("secrets", JSON.stringify(secrets));
  }, [secrets]);

  useEffect(() => {
    localStorage.setItem("selectedModels", JSON.stringify(selectedModels));
  }, [selectedModels]);

  const handleCheckboxChange = (model: string) => {
    const updatedModels = selectedModels.includes(model)
      ? selectedModels.filter((item) => item !== model)
      : [...selectedModels, model];
    setSelectedModels(updatedModels);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
      setFileNames(Array.from(e.target.files).map((file) => file.name));
    }
  };

  const handleFileUpload = async () => {
    if (!files || files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

  
    // Check file sizes
    const MAX_FILE_SIZE_MB = 2; // Maximum file size in MB
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024
    );
  
    if (oversizedFiles.length > 0) {
      alert(`One or more files exceed the size limit of ${MAX_FILE_SIZE_MB} MB. Please select smaller files.`);
      return;
    }
    
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    setIsUploading(true);

    try {
      const response = await axios.post(
        `https://lakefrontai.com:4000/${username}/upload-documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Replace with actual JWT token
          },
        }
      );

      alert(response.data.message || "Documents uploaded successfully.");
      setShowUploadPopup(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://lakefrontai.com:4000/${username}/ask-question`,
        { question, selectedModels },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with actual JWT token
          },
        }
      );

      const answer = response.data.answer || "No answer available.";
      setMessages((prevMessages) => [...prevMessages, `You: ${question}`, `Bot: ${answer}`]);
      setQuestion("");
    } catch (error) {
      console.error("Error asking question:", error);
      alert("Failed to get an answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSecret = () => {
    if (keyType && keyName.trim() && keyValue.trim()) {
      const newSecret = {
        keyType: keyType, // Save key type
        keyName: keyName.trim(),
        keyValue: keyValue.trim(),
        isVisible: false, // Default to hidden
      };
      const localStorageKey = `secret_${keyType}`;
      setSecrets((prevSecrets) => {
        const updatedSecrets = [...prevSecrets, newSecret];
        localStorage.setItem(localStorageKey, JSON.stringify(updatedSecrets));
        return updatedSecrets;
      });
      setKeyType(""); // Reset the key type
      setKeyName("");
      setKeyValue("");
      setShowSecretInput(false); // Close the popup

    } else {
      alert("Please select a key type and enter both key name and value.");
    }
  };

  const toggleSecretVisibility = (index: number) => {
    setSecrets((prevSecrets) =>
      prevSecrets.map((secret, i) =>
        i === index ? { ...secret, isVisible: !secret.isVisible } : secret
      )
    );
  };

  const removeSecret = (index: number) => {
    const updatedSecrets = secrets.filter((_, i) => i !== index);
    setSecrets(updatedSecrets);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    window.location.href = "/login"; // Redirect to login page
  };

  const handleBack = () => {
    window.history.back(); // Navigate to the previous page
  };
  const handleHome = () => {
    router.push(`/${username}/dashboard`); // Navigate to dashboard
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white h-full transition-all duration-300 flex flex-col`}
      >
        {/* Toggle Sidebar */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 text-center hover:bg-gray-700"
        >
          <ChevronDoubleRightIcon
            className={`h-6 w-6 mx-auto transform ${
              isSidebarOpen ? "" : "rotate-180"
            } transition-transform`}
          />
        </button>

        {/* Sidebar Links */}
        <ul className="mt-4 space-y-4 px-2">
          <li className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
            <div
                onClick={handleHome}
                className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded"
              >
              <HomeIcon className="h-5 w-5" />
              {isSidebarOpen && <span>Home</span>}
            </div>
          </li>

          {/* Add Secret */}
          <li>
            <div
              onClick={() => setShowSecretInput(true)}
              className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded"
            >
              <KeyIcon className="h-5 w-5" />
              {isSidebarOpen && <span>Add Secret</span>}
            </div>

            {/* Display Secrets */}
            {isSidebarOpen && secrets.length > 0 && (
              <ul className="mt-2 ml-6 space-y-2">
                {secrets.map((secret, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 p-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold">{secret.keyName}:</span>{" "}
                      {secret.isVisible ? secret.keyValue : "*****"}
                    </div>
                    <div className="flex space-x-2">
                      {/* Toggle Visibility */}
                      <button
                        onClick={() => toggleSecretVisibility(index)}
                        className="text-gray-300 hover:text-white"
                      >
                        {secret.isVisible ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>

                      {/* Remove Secret */}
                      <button
                        onClick={() => removeSecret(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Model Selection */}
          <li className="p-2">
            <h3 className={`text-sm font-bold ${isSidebarOpen ? "" : "hidden"}`}>
              Model Selection
            </h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedModels.includes("OpenAI")}
                  onChange={() => handleCheckboxChange("OpenAI")}
                  className="mr-2"
                />
                {isSidebarOpen && <span>OpenAI</span>}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedModels.includes("Gemini")}
                  onChange={() => handleCheckboxChange("Gemini")}
                  className="mr-2"
                />
                {isSidebarOpen && <span>Gemini</span>}
              </label>
            </div>
          </li>
        </ul>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4 border-t border-gray-700 space-y-3">
          <div className="text-center">
            <p className="text-sm font-semibold">{username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={handleBack}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5 inline mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-white shadow-inner">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.startsWith("You:")
                    ? "text-right"
                    : "text-left text-blue-600"
                }`}
              >
                <p
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.startsWith("You:")
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-100"
                  }`}
                >
                  {message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center p-4 bg-gray-200 border-t space-x-4">
          {/* Upload Icon */}
          <button
            onClick={() => setShowUploadPopup(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            <DocumentArrowUpIcon className="h-6 w-6" />
          </button>

          {/* Input Box */}
          <div className="flex flex-1 items-center">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 border border-gray-300 rounded p-2"
            />
            <button
              onClick={handleAskQuestion}
              disabled={isLoading}
              className={`ml-3 px-4 py-2 rounded ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isLoading ? "Processing..." : "Ask"}
            </button>
          </div>
        </div>
      </div>

      {/* Upload Popup */}
      {showUploadPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Upload Documents</h2>
              <button
                onClick={() => setShowUploadPopup(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            {fileNames.length > 0 && (
              <ul className="mb-4">
                {fileNames.map((name, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {name}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleFileUpload}
                disabled={isUploading}
                className={`px-4 py-2 rounded ${
                  isUploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => setShowUploadPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Secret Popup */}
      {showSecretInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Add Secret</h2>
            <input
              type="text"
              placeholder="Key Name"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Key Value"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <button
              onClick={handleAddSecret}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Secret
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;