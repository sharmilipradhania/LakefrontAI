import React from "react";
import Image from "next/image";
import Footer from "../../components/Footer";

const DataEngineering = () => {
  return (
  <>
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Main Container */}
      <div className="max-w-[75%] w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 text-white p-10 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-extrabold mb-4">Data Engineering and Business Intelligence</h1>
          <p className="text-lg font-medium">
            Unlock the power of your data with cutting-edge engineering and actionable insights.
          </p>
        </div>

        {/* Capabilities Section */}
        <section className="px-6 py-16 bg-white">
          <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Empower Your Business with{" "}
                <span className="text-blue-500">LakeFrontAI</span>
              </h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                  <span>Data Pipeline Development: Build scalable and reliable data pipelines.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                  <span>Cloud Integration: Seamlessly connect your data to cloud ecosystems.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                  <span>Business Intelligence Dashboards: Interactive dashboards for real-time analytics.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                  <span>Data Warehousing: Centralized, efficient, and secure data storage.</span>
                </li>
              </ul>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow hover:bg-gray-300"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <Image
                src="/data_engineering.png"
                alt="Data Engineering"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Solutions Sections */}
        {[
          {
            title: "Data Engineering Services",
            description:
              "From data ingestion to processing, we ensure your data pipelines are optimized for performance and scalability. Our engineers specialize in handling structured, semi-structured, and unstructured data.",
            image: "/data_pipelines.png",
          },
          {
            title: "Cloud Data Solutions",
            description:
              "Leverage the cloud to modernize your data infrastructure. We offer cloud migration, integration, and management services tailored to your business needs.",
            image: "/cloud_data.png",
          },
          {
            title: "Business Intelligence Insights",
            description:
              "Transform your raw data into actionable insights with custom dashboards and reports. Make informed decisions with real-time analytics.",
            image: "/bi_dashboard.png",
          },
          {
            title: "Data Warehousing",
            description:
              "Centralize your data in robust warehouses that are secure, scalable, and easy to manage. Our solutions are designed to handle growing volumes of data efficiently.",
            image: "/data_warehousing.png",
          },
        ].map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center mt-10 bg-white rounded-lg shadow-md ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <Image
                src={section.image}
                alt={section.title}
                width={600}
                height={400}
                className="rounded-l-lg"
              />
            </div>
            {/* Text Section */}
            <div className="w-full md:w-1/2 p-6 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
              <p className="text-lg text-gray-700">{section.description}</p>
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="mt-10 px-6 py-10 bg-blue-100 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-4">
            Start Your Data Journey with LakeFrontAI
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Empower your business with data-driven strategies and actionable
            insights. Take the first step towards a smarter future.
          </p>
          <a
            href="#"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
          >
            Contact Us
          </a>
        </div>
      </div>


    </div>
      {/* Footer */}
      <Footer />
  </>  
  );
};

export default DataEngineering;