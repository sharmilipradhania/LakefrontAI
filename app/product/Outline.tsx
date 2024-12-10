"use client"
import React from "react";
import { useRouter } from "next/navigation";


const lakefrontaiServices = [
  "Data",
  "Document Summarization",
  "Data Catelog",
  "Any any Question",
];

export default function Outline() {
  const router = useRouter();
  const handleClick = (service: string) => {
    console.log(`You clicked on ${service}`);

    const formattedService = service.replace(/\s+/g, "-").toLowerCase();
    router.push(`/datacatalog`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1
                className="text-4xl sm:text-5xl font-extrabold text-center text-transparent 
                            bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
                            drop-shadow-md tracking-wide mb-8"
                >
                Lake Front <span className="text-purple-500">AI</span>
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