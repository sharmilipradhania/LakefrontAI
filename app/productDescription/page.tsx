import React from "react";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "LLM Model Training Using Your Own Data",
    description:
      "Leverage your proprietary data to fine-tune large language models (LLMs). Achieve unmatched accuracy and relevance in AI-driven solutions tailored to your unique needs.",
    imageUrl: "/images/llm-training.png",
    href: "#",
    actionText: "Learn More",
  },
  {
    id: 2,
    title: "Data Catalog",
    description:
      "Organize, manage, and discover your data assets effortlessly. Our intuitive data catalog empowers you with deep insights and simplifies data governance.",
    imageUrl: "/images/data-catalog.png",
    href: "#",
    actionText: "Explore Now",
  },
  {
    id: 3,
    title: "Document Summarization",
    description:
      "Summarize lengthy documents into concise, actionable insights. Save time and make informed decisions with AI-powered document summarization.",
    imageUrl: "/images/document-summarization.png",
    href: "#",
    actionText: "Try It Out",
  },
  {
    id: 4,
    title: "Ask Any Question",
    description:
      "Interact with your data like never before. Ask questions in plain language and get accurate, real-time answers with our advanced AI solutions.",
    imageUrl: "/images/ask-question.png",
    href: "#",
    actionText: "Start Asking",
  },
];

export default function ProductPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Drive Innovation with LakeFrontAI
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore cutting-edge AI solutions tailored to elevate your business. From training LLMs with your data to real-time answers for any question, LakeFrontAI empowers you every step of the way.
          </p>
        </header>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col bg-white rounded-lg shadow-lg">
              {/* Image */}
              <div className="relative h-56 w-full rounded-t-lg overflow-hidden">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{feature.title}</h2>
                <p className="mt-4 text-gray-600">{feature.description}</p>
                <a
                  href={feature.href}
                  className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  {feature.actionText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}