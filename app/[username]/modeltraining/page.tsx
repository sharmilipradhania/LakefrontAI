"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import {
  ArrowUpTrayIcon,
  ServerStackIcon,
  XMarkIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  ArrowLeftIcon,
  EyeSlashIcon,
  EyeIcon,
  KeyIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface Secret {
  keyType: string;
  keyName: string;
  keyValue: string;
  isVisible: boolean; // For toggling secret visibility
}

const DataUploader: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);
  const [isDbConfigModalOpen, setIsDbConfigModalOpen] = useState(false);

  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [trainSuccess, setTrainSuccess] = useState(false);

  const [dbType, setDbType] = useState("");
  const [dbConfig, setDbConfig] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
  });
  const [tableName, setTableName] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  const [question, setQuestion] = useState<string>("");
  const [isAsking, setIsAsking] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; message: string }[]>([]);
  const [username,setusername] = useState(""); // Replace with dynamic username
  const [token,settoken] = useState(""); // token 
  const router = useRouter();

  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [keyName, setKeyName] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [keyType, setKeyType] = useState("");

  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  // Load  username from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setusername(storedUsername);
    } else {
      router.push('/login');
    }
  }, [username]);


  // Load token from localStorage when the component mounts
  useEffect(() => {
    const storedtoken = localStorage.getItem("token");
    if (storedtoken) {
      settoken(storedtoken);
    } else {
      router.push('/login');
    }
  }, [token]);


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
    setUploadSuccess(false);
  
    try {
      const response = await axios.post(
        `https://lakefrontai.com:4000/${username}/train-upload-documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Replace with actual JWT token
          },
        }
      );
  
      setUploadSuccess(true);
      alert(response.data.message || "File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleTrainModel = async () => {
    setTrainSuccess(false);
    try {
      const response = await axios.post(
        `https://lakefrontai.com:4000/${username}/train-model`,
        {
          modelName: "gpt-4", // Payload
          trainingParams: {
            n_epochs: 4,
            batch_size: 8,
            learning_rate_multiplier: 0.1,
          },
        },
        {
          headers: {

            Authorization: `Bearer ${token}`, // Replace with actual JWT token
          },
        }
      );

      setTrainSuccess(true);
      alert(response.data.message || "Model trained successfully!");
    } catch (error) {
      console.error("Error training model:", error);
      alert(" Please try again.");
    } finally {
      setTrainSuccess(false);
    }
  };

  const handleDbFetch = async () => {
    if (!dbType || !dbConfig.host || !dbConfig.username || !dbConfig.password || !tableName) {
      alert("Please fill out all required fields for the selected database.");
      return;
    }

    setIsFetching(true);

    try {
      const response = await axios.post("http://localhost:4000/fetch-data", {
        dbType,
        dbConfig,
        tableName,
      });

      setFetchedData(response.data);
      alert("Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please check your configuration.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }
  
    setIsAsking(true);
    console.log(`Question: ${question}`);
    
    try {
      const response = await axios.post(
        `https://lakefrontai.com:4000/${username}/query`,
        { question },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token for authentication
            "Content-Type": "application/json", // Indicate JSON payload
          },
        }
      );
  
      // Update chat messages
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", message: question },
        { role: "bot", message: response.data.answer || "No answer available." },
      ]);
  
      // Clear input box after submission
      setQuestion("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        console.error("Axios error response:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Failed to get an answer. Please try again.");
      } else if (error instanceof Error) {
        // Generic error handling
        console.error("Error message:", error.message);
        alert("An unknown error occurred. Please try again.");
      } else {
        // Unknown error type
        console.error("Unknown error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsAsking(false);
    }
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

  const handleCheckboxChange = (model: string) => {
    const updatedModels = selectedModels.includes(model)
      ? selectedModels.filter((item) => item !== model)
      : [...selectedModels, model];
    setSelectedModels(updatedModels);
  };



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white h-full transition-all duration-300 flex flex-col`}
      >
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

        <ul className="mt-4 space-y-4 px-2 flex-grow">
          <li className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
            <div
                onClick={handleHome}
                className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded"
              >
              <HomeIcon className="h-5 w-5" />
              {isSidebarOpen && <span>Home</span>}
            </div>
          </li>
          <li
            onClick={() => setIsFileModalOpen(true)}
            className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            {isSidebarOpen && <span>Upload Files</span>}
          </li>
          <li
            onClick={() => setIsDatabaseModalOpen(true)}
            className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded"
          >
            <ServerStackIcon className="h-5 w-5" />
            {isSidebarOpen && <span>Database</span>}
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
                      <span className="font-bold">{secret.keyType}:</span>{" "}
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

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="mb-4">
            {isSidebarOpen && <p className="text-sm text-gray-400">Logged in as:</p>}
            <p className="font-bold">{isSidebarOpen && username}</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              {isSidebarOpen && "Logout"}
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 flex items-center justify-center"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              {isSidebarOpen && "Back"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-100">
        {/* File Upload Modal */}
          {isFileModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsFileModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                {/* Modal Header */}
                <h2 className="text-lg font-bold mb-4 text-center">Upload Files</h2>
                {/* File Input */}
                <div className="mb-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  {/* Display Selected Files */}
                  {files && (
                    <ul className="mt-4 space-y-2">
                      {Array.from(files).map((file, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                        >
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Upload Button */}
                <button
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className={`w-full py-2 rounded ${
                    isUploading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
                {/* Success Message */}
                {uploadSuccess && (
                  <p className="mt-2 text-sm text-green-500 text-center">
                    Upload successful!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Database Selection Modal */}
          {isDatabaseModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsDatabaseModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                {/* Modal Header */}
                <h2 className="text-lg font-bold mb-4 text-center">Select Database</h2>
                {/* Database Options */}
                <div className="space-y-4">
                  {["MySQL", "PostgreSQL", "Snowflake"].map((db) => (
                    <button
                      key={db}
                      onClick={() => {
                        setDbType(db);
                        setIsDatabaseModalOpen(false);
                        setIsDbConfigModalOpen(true);
                      }}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                      {db}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Database Configuration Modal */}
          {isDbConfigModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsDbConfigModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                {/* Modal Header */}
                <h2 className="text-lg font-bold mb-4 text-center">{dbType} Configuration</h2>
                {/* Database Configuration Fields */}
                <input
                  type="text"
                  placeholder="Host"
                  value={dbConfig.host}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, host: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <input
                  type="text"
                  placeholder="Port"
                  value={dbConfig.port}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, port: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={dbConfig.username}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, username: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={dbConfig.password}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <input
                  type="text"
                  placeholder="Database Name"
                  value={dbConfig.database}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, database: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <input
                  type="text"
                  placeholder="Table Name"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                <button
                  onClick={handleDbFetch}
                  disabled={isFetching}
                  className={`w-full py-2 rounded ${
                    isFetching
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {isFetching ? "Fetching..." : "Fetch Data"}
                </button>
              </div>
            </div>
          )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-white shadow-inner">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`${
                        msg.role === "user" ? "text-right" : "text-left text-blue-600"
                      }`}
                    >
                      <p
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.role === "user"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-blue-100"
                        }`}
                      >
                        {msg.role === "user" ? "You: " : "Bot: "} {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center p-4 bg-gray-200 border-t space-x-4">
                {/* Upload Icon */}
                <button
                  onClick={handleTrainModel}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Train
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
                    disabled={isAsking}
                    className={`ml-3 px-4 py-2 rounded ${
                      isAsking
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {isAsking ? "Processing..." : "Ask"}
                  </button>
                </div>
              </div>
            </div>
      </div>
      {/* Add Secret Popup */}
      {showSecretInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Add Secret</h2>

                {/* Key Type Selection */}
                <select
                  value={keyType}
                  onChange={(e) => setKeyType(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 mb-2"
                >
                  <option value="" disabled>Select Key Type</option>
                  <option value="openai">OpenAI</option>
                  <option value="gemini">Gemini</option>
                </select>

                {/* Key Name Input */}
                <input
                  type="text"
                  placeholder="Key Name"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 mb-2"
                />

                {/* Key Value Input */}
                <input
                  type="text"
                  placeholder="Key Value"
                  value={keyValue}
                  onChange={(e) => setKeyValue(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />

                {/* Save Button */}
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

export default DataUploader;