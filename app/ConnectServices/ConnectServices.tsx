"use client";

import React, { useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { CloudIcon, CubeIcon } from "@heroicons/react/24/outline";
import { FaDatabase } from "react-icons/fa";
interface ConnectServicesProps {
  isSidebarOpen: boolean;
}
export default function ConnectServices({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeService, setActiveService] = useState<"Looker" | "Snowflake" | "MySQL" | "PostgreSQL" | null>(null);

  const [credentials, setCredentials] = useState({
    clientId: "",
    clientSecret: "",
    baseUrl: "",
    account: "",
    username: "",
    password: "",
    warehouse: "",
    database: "",
    schema: "",
    host: "",
    port: "",
  });

  const [connectionStatus, setConnectionStatus] = useState("");

  const handleOpenPopup = (service: "Looker" | "Snowflake" | "MySQL" | "PostgreSQL") => {
    setActiveService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setActiveService(null);
    setCredentials({
      clientId: "",
      clientSecret: "",
      baseUrl: "",
      account: "",
      username: "",
      password: "",
      warehouse: "",
      database: "",
      schema: "",
      host: "",
      port: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleConnect = async () => {
    const storedUsername = localStorage.getItem("username");
    try {
      console.log(`Using ${storedUsername} to connect to ${activeService} with credentials:`, credentials);

      const data = {
        service: activeService,
        credentials,
      };

      const response = await axios.post(
        `https://lakefrontai.com:4000/${storedUsername}/aiagent/datacatalog`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setConnectionStatus(`Connected successfully to ${activeService}!`);
        localStorage.setItem("serviceActive", JSON.stringify(data));
      } else {
        setConnectionStatus(`Failed to connect to ${activeService}: ${response.data?.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("Error while connecting:", error);
      setConnectionStatus(`Failed to connect: ${error.response?.data?.message || error.message}`);
    } finally {
      setTimeout(() => setConnectionStatus(""), 5000);
    }
  };

  return (


    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "ml-10" : "ml-0"
      } flex-1 bg-gray-50 min-h-screen p-8`}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-left">Connect to Database</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Looker Icon */}
        <div
          onClick={() => handleOpenPopup("Looker")}
          className="cursor-pointer bg-indigo-100 p-6 rounded-lg shadow hover:bg-indigo-200 transition transform hover:scale-105"
        >
          <CloudIcon className="h-12 w-12 mx-auto text-indigo-600" />
          <p className="text-center font-medium text-indigo-800 mt-4">Looker</p>
        </div>

        {/* Snowflake Icon */}
        <div
          onClick={() => handleOpenPopup("Snowflake")}
          className="cursor-pointer bg-blue-100 p-6 rounded-lg shadow hover:bg-blue-200 transition transform hover:scale-105"
        >
          <CubeIcon className="h-12 w-12 mx-auto text-blue-600" />
          <p className="text-center font-medium text-blue-800 mt-4">Snowflake</p>
        </div>

        {/* MySQL Icon */}
        <div
          onClick={() => handleOpenPopup("MySQL")}
          className="cursor-pointer bg-green-100 p-6 rounded-lg shadow hover:bg-green-200 transition transform hover:scale-105"
        >
          <FaDatabase className="h-12 w-12 mx-auto text-green-600" />
          <p className="text-center font-medium text-green-800 mt-4">MySQL</p>
        </div>

        {/* PostgreSQL Icon */}
        <div
          onClick={() => handleOpenPopup("PostgreSQL")}
          className="cursor-pointer bg-purple-100 p-6 rounded-lg shadow hover:bg-purple-200 transition transform hover:scale-105"
        >
          <FaDatabase className="h-12 w-12 mx-auto text-purple-600" />
          <p className="text-center font-medium text-purple-800 mt-4">PostgreSQL</p>
        </div>
      </div>

      {/* Dynamic Popup */}
      <Dialog open={isPopupOpen} onClose={handleClosePopup} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{activeService} Connection</h2>

          <div className="space-y-4">
            {activeService === "Looker" && (
              <>
                <input
                  type="text"
                  name="clientId"
                  placeholder="Client ID"
                  value={credentials.clientId}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  name="clientSecret"
                  placeholder="Client Secret"
                  value={credentials.clientSecret}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="baseUrl"
                  placeholder="Base URL (e.g., https://your-looker-instance.com)"
                  value={credentials.baseUrl}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-indigo-500"
                />
              </>
            )}

            {activeService === "Snowflake" && (
              <>
                <input
                  type="text"
                  name="account"
                  placeholder="Account (e.g., account.region.cloud.snowflakecomputing.com)"
                  value={credentials.account}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="warehouse"
                  placeholder="Warehouse"
                  value={credentials.warehouse}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="database"
                  placeholder="Database"
                  value={credentials.database}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="schema"
                  placeholder="Schema"
                  value={credentials.schema}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-blue-500"
                />
              </>
            )}

            {(activeService === "MySQL" || activeService === "PostgreSQL") && (
              <>
                <input
                  type="text"
                  name="host"
                  placeholder="Host"
                  value={credentials.host}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="port"
                  placeholder="Port"
                  value={credentials.port}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-green-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="database"
                  placeholder="Database"
                  value={credentials.database}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 p-3 focus:ring-green-500"
                />
              </>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleClosePopup}
              className="bg-gray-300 px-6 py-2 rounded text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              className="bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-700"
            >
              Connect
            </button>
          </div>

          {connectionStatus && <p className="mt-4 text-center text-gray-600">{connectionStatus}</p>}
        </div>
      </Dialog>
    </div>
  );
}