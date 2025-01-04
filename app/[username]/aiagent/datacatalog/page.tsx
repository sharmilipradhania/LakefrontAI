"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaEye, FaEyeSlash, FaTrash, FaEdit, FaKey } from "react-icons/fa";
import { LockClosedIcon, HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import ConnectServices from "@/app/ConnectServices/ConnectServices";
import { useRouter } from "next/navigation";

export default function ConnectServicesWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState("");
  const [secrets, setSecrets] = useState<{ model: string; secret: string; isVisible: boolean }[]>([]);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push("/login");
    }
  }, [username]);

  const isModelChecked = (model: string) =>
    secrets.some((secret) => secret.model === model);

  const handleModelChange = (model: string) => {
    if (isModelChecked(model)) {
      handleDeleteSecret(model);
    } else {
      setSelectedModel(model);
      setShowSecretPopup(true);
    }
  };

  const handleSaveSecret = () => {
    if (!secretKey.trim()) {
      alert("Please enter a valid secret key.");
      return;
    }

    const updatedSecrets = secrets.filter((s) => s.model !== selectedModel);
    updatedSecrets.push({ model: selectedModel!, secret: secretKey, isVisible: false });
    setSecrets(updatedSecrets);
    localStorage.setItem(`secret_${selectedModel}`, secretKey);
    setSecretKey("");
    setShowSecretPopup(false);
    alert(`Secret for ${selectedModel} saved successfully!`);
  };

  const handleToggleSecretVisibility = (model: string) => {
    setSecrets((prev) =>
      prev.map((secret) =>
        secret.model === model ? { ...secret, isVisible: !secret.isVisible } : secret
      )
    );
  };

  const handleDeleteSecret = (model: string) => {
    const updatedSecrets = secrets.filter((s) => s.model !== model);
    setSecrets(updatedSecrets);
    localStorage.removeItem(`secret_${model}`);
    alert(`Secret for ${model} deleted.`);
  };

  const handleEditSecret = (model: string) => {
    const existingSecret = secrets.find((s) => s.model === model);
    if (existingSecret) {
      setSelectedModel(model);
      setSecretKey(existingSecret.secret);
      setShowSecretPopup(true);
    }
  };

  useEffect(() => {
    const savedSecrets = ["OpenAI", "Gemini"].map((model) => {
      const secret = localStorage.getItem(`secret_${model}`);
      return secret ? { model, secret, isVisible: false } : null;
    });
    setSecrets(savedSecrets.filter(Boolean) as { model: string; secret: string; isVisible: boolean }[]);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
          className={`fixed top-0 left-0 h-full ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white shadow-lg transition-all duration-300 flex flex-col`}
        >
            <div className="p-4 flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <FaBars className="text-2xl" />
              </button>
              {isSidebarOpen && (
                <h2 className="ml-4 text-lg font-semibold tracking-wide text-left">Menu</h2>
              )}
            </div>
          <ul className="mt-6 space-y-4 flex-1 px-4">
            <li
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition ${
                isSidebarOpen && "pl-4"
              }`}
            >
              <HomeIcon className="h-6 w-6" />
              {isSidebarOpen && (
                <span className="text-sm font-medium tracking-wide">Dashboard</span>
              )}
            </li>
            <li>
              <div
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition ${
                  isSidebarOpen && "pl-4"
                }`}
              >
                <FaKey />
                {isSidebarOpen && (
                  <span className="text-sm font-medium tracking-wide">Select Model</span>
                )}
              </div>
              {isSidebarOpen && (
                <div className="pl-6 mt-2 space-y-2">
                  {["OpenAI", "Gemini"].map((model) => (
                    <div
                      key={model}
                      className="flex items-center gap-3 hover:bg-gray-600 p-1 rounded-md cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={model.toLowerCase()}
                        name="model"
                        checked={isModelChecked(model)}
                        onChange={() => handleModelChange(model)}
                      />
                      <label
                        htmlFor={model.toLowerCase()}
                        className="text-sm tracking-wide"
                      >
                        {model}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </li>
            <li>
              <div
                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition ${
                  isSidebarOpen && "pl-4"
                }`}
              >
                <LockClosedIcon className="h-6 w-6" />
                {isSidebarOpen && (
                  <span className="text-sm font-medium tracking-wide">
                    Saved Secrets
                  </span>
                )}
              </div>
              {isSidebarOpen && (
                <ul className="pl-6 mt-2 space-y-2">
                  {secrets.map((secret) => (
                    <li
                      key={secret.model}
                      className="flex justify-between items-center bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition"
                    >
                      <span className="font-medium text-sm">{secret.model}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleSecretVisibility(secret.model)}
                          className="text-gray-400 hover:text-gray-200 focus:outline-none"
                        >
                          {secret.isVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          onClick={() => handleEditSecret(secret.model)}
                          className="text-yellow-400 hover:text-yellow-200 focus:outline-none"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteSecret(secret.model)}
                          className="text-red-400 hover:text-red-200 focus:outline-none"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
          {/* Sidebar Footer */}
          <div className="mt-auto p-4 border-t border-gray-700 space-y-3">
            {isSidebarOpen && username && (
              <div className="text-center">
                <p className="text-sm font-semibold tracking-wide">{username}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`w-full py-2 rounded-md text-white text-sm transition ${
                isSidebarOpen ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-800"
              } flex items-center justify-center`}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              {isSidebarOpen && "Logout"}
            </button>
            <button
              onClick={handleBack}
              className={`w-full py-2 rounded-md text-white text-sm transition ${
                isSidebarOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-700 hover:bg-gray-800"
              } flex items-center justify-center`}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              {isSidebarOpen && "Back"}
            </button>
          </div>
        </div>

      {/* Main Content */}
      <div className="flex-1 ml-20 lg:ml-64 p-6 bg-gray-50">
        <ConnectServices />
      </div>

      {/* Secret Input Popup */}
      {showSecretPopup && (
        <Dialog
          open={showSecretPopup}
          onClose={() => setShowSecretPopup(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Enter Secret Key for {selectedModel}</h2>
            <input
              type="text"
              placeholder="Enter Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4 focus:ring focus:ring-blue-200"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowSecretPopup(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSecret}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}