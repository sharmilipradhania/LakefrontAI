
import React from "react";

const lakefrontaiServices = [
  "Data",
  "Document Summarization",
  "Data Catelog",
  "Any any Question",
];

export default function Outline() {

  const handleClick = (service: string) => {
    console.log(`You clicked on ${service}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          AWS Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lakefrontaiServices.map((service, index) => (
            <button
              key={index}
              onClick={() => handleClick(service)}
              className="p-4 w-full border border-gray-200 rounded-lg shadow-md bg-purple-100 text-gray-800 font-medium text-center hover:bg-indigo-100 hover:text-black transition duration-300"
            >
              {service}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}