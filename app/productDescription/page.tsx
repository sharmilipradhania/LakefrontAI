import Image from "next/image";
import React from "react";
interface Feature {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  actionText: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "AI Underwriter",
    description:
      "Leverage your proprietary data to fine-tune large language models (LLMs). Achieve unmatched accuracy and relevance in AI-driven solutions tailored to your unique needs.",
    imageUrl: "/images/aiagent/devops.png",
    href: "/login",
    actionText: "Login to explore now",
  },
  {
    id: 2,
    title: "Data Catalog",
    description:
      "Organize, manage, and discover your data assets effortlessly. Our intuitive data catalog empowers you with deep insights and simplifies data governance.",
    imageUrl: "/images/aiagent/data-catalog1.png",
    href: "/login",
    actionText: "Login to explore now",
  },
  {
    id: 3,
    title: "AI Analytics Platform",
    description:
      "Unified platform to collect, organize, transform, generate insights and dashboard using LLMs.",
    imageUrl: "/dbmgr.png",
    href: "/login",
    actionText: "Login to explore now",
  },
];

const ProductPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Drive Innovation with LakeFrontAI
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore cutting-edge AI solutions tailored to elevate your business.
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
};

export default ProductPage;