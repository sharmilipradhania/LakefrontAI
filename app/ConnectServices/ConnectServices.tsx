"use client";

import React, { useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { CloudIcon, CubeIcon } from "@heroicons/react/24/outline";
import { FaDatabase } from "react-icons/fa"; // Add FontAwesome for MySQL/PostgreSQL icons

export default function ConnectServices() {
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
    schema:"",
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
    const storedUsername = localStorage.getItem('username');
    try {
      console.log(`using ${storedUsername} Connecting to ${activeService} with credentials:`, credentials);
  
      // Making an Axios POST request
      const data = {
        service: activeService,
        credentials,
      };
  
      const response = await axios.post(`https://lakefrontai.com:4000/${storedUsername}/aiagent/datacatalog`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Assuming the API response contains a message
      if (response.status === 200) {
        setConnectionStatus(`Connected successfully to ${activeService}!`);
        console.log("Response from server:", response.data);
        localStorage.setItem("serviceActive", JSON.stringify(data));
        const storedData = localStorage.getItem("serviceActive");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log(parsedData); // Access the parsed object
        }
      } else {
        setConnectionStatus(`Failed to connect to ${activeService}: ${response.data?.message || "Unknown error"}`);
      }
    } catch (error:any) {
      // Handling errors
      console.error("Error while connecting:", error);
      setConnectionStatus(`Failed to connect to ${activeService}: ${error.response?.data?.message || error.message}`);
    } finally {
      // Reset the status after 5 seconds
      setTimeout(() => setConnectionStatus(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-20">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Connect with Looker, Snowflake, MySQL, & PostgreSQL
      </h1>
      <div className="flex justify-center gap-12">
        {/* Looker Icon */}
        <div
          onClick={() => handleOpenPopup("Looker")}
          className="cursor-pointer bg-indigo-100 p-6 rounded-full shadow-md hover:bg-indigo-200 transition"
        >
          <CloudIcon className="h-16 w-16 text-indigo-600" />
          <p className="text-center font-medium text-indigo-800 mt-2">Looker</p>
        </div>

        {/* Snowflake Icon */}
        <div
          onClick={() => handleOpenPopup("Snowflake")}
          className="cursor-pointer bg-blue-100 p-6 rounded-full shadow-md hover:bg-blue-200 transition"
        >
          <CubeIcon className="h-16 w-16 text-blue-600" />
          <p className="text-center font-medium text-blue-800 mt-2">Snowflake</p>
        </div>

        {/* MySQL Icon */}
        <div
          onClick={() => handleOpenPopup("MySQL")}
          className="cursor-pointer bg-green-100 p-6 rounded-full shadow-md hover:bg-green-200 transition"
        >
          <FaDatabase className="h-16 w-16 text-green-600" />
          <p className="text-center font-medium text-green-800 mt-2">MySQL</p>
        </div>

        {/* PostgreSQL Icon */}
        <div
          onClick={() => handleOpenPopup("PostgreSQL")}
          className="cursor-pointer bg-purple-100 p-6 rounded-full shadow-md hover:bg-purple-200 transition"
        >
          <FaDatabase className="h-16 w-16 text-purple-600" />
          <p className="text-center font-medium text-purple-800 mt-2">PostgreSQL</p>
        </div>
      </div>

      {/* Dynamic Popup */}
      <Dialog open={isPopupOpen} onClose={handleClosePopup} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {activeService} Connection
          </h2>

          <div className="space-y-4">
            {activeService === "Looker" && (
              <>
                <input
                  type="text"
                  name="clientId"
                  placeholder="Client ID"
                  value={credentials.clientId}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  name="clientSecret"
                  placeholder="Client Secret"
                  value={credentials.clientSecret}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="baseUrl"
                  placeholder="Base URL (e.g., https://your-looker-instance.com)"
                  value={credentials.baseUrl}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
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
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="warehouse"
                  placeholder="Warehouse"
                  value={credentials.warehouse}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="database"
                  placeholder="Database"
                  value={credentials.database}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="schema"
                  placeholder="Schema"
                  value={credentials.schema}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
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
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="port"
                  placeholder="Port"
                  value={credentials.port}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="database"
                  placeholder="Database"
                  value={credentials.database}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
                />
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleClosePopup}
              className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              className="bg-indigo-600 px-4 py-2 rounded-md text-white hover:bg-indigo-700"
            >
              Connect
            </button>
          </div>

          {connectionStatus && <p className="mt-4 text-sm text-center">{connectionStatus}</p>}
        </div>
      </Dialog>
    </div>
  );
}