"use client"; 
import React from "react";
import { useRouter } from "next/navigation";
const lakefrontaiServices = [
    "Document Summarization",
    "Data",
    "Data Catelog",
    "Have a Question?",

  ];

const Outline = () => {
    const router = useRouter();
    const handleClick = (service: string) => {
        console.log(`You clicked on ${service}`);
        // You can perform actions like navigation or API calls here
        const formattedService = service.replace(/\s+/g, "-").toLowerCase();
        // Navigate to the dynamic route
//        router.push(`/dashboard/services/${formattedService}`);

        };
  return (
    <main className="py-10">
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen bg-gray-50 py-10">
        {/* Container */}
        <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl sm:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow-lg mb-10">
                Lake Front AI
            </h1>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lakefrontaiServices.map((service, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(service)}
                    className="p-4 w-full border border-gray-200 rounded-lg shadow-md bg-purple-100 text-gray-800 font-medium text-center hover:bg-blue-50 hover:text-grey transition duration-300"
                >
                    {service}
                </button>
            ))}
            </div>
        </div>
        </div>
    </div>
  </main>        
  );
};

export default Outline;