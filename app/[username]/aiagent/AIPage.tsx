"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const agents = [

  {
    name: "DevOps",
    description:
      "Streamlines DevOps workflows by optimizing CI/CD pipelines, monitoring infrastructure, and enhancing collaboration.",
    image: "/images/aiagent/devops.png",
    route: "aiagent/devops",
  },
  {
    name: "Data Catalog",
    description:
      "Create, manage, and search data catalogs",
    image: "/images/aiagent/data-catalog1.png",
    route: "aiagent/datacatalog",
  },

];

export default function AIPage() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Redirect to login if no username is found
      router.push("/login");
    }
  }, [router]);

  if (!username) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white-100 py-10">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          AI Agents
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <Link
              key={index}
              href={`/${username}/${agent.route}`}
              className="group block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600">
                  {agent.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {agent.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}