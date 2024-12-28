import React from "react";
import Image from "next/image";
import Footer from "../../components/Footer";

const DataAnalyticsBI = () => {
  return (
        <>
            <div className="bg-gray-50 min-h-screen flex flex-col items-center">
            {/* Main Container */}
            <div className="max-w-[75%] w-full">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white p-10 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-extrabold mb-4">
                    Transform Decisions with Data Analytics and Business Intelligence
                </h1>
                <p className="text-lg font-medium">
                    Unlock the power of your data with advanced analytics and business intelligence solutions tailored to your needs.
                </p>
                </div>

                {/* Capabilities Section */}
                <section className="px-6 py-16 bg-white">
                <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Why Choose <span className="text-blue-500">LakeFrontAI</span>?
                    </h2>
                    <ul className="space-y-4 text-gray-700 text-lg">
                        <li className="flex items-start space-x-3">
                        <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                        <span>
                            Advanced analytics to uncover insights and trends.
                        </span>
                        </li>
                        <li className="flex items-start space-x-3">
                        <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                        <span>
                            Custom business intelligence dashboards for real-time reporting.
                        </span>
                        </li>
                        <li className="flex items-start space-x-3">
                        <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                        <span>
                            Data integration services for seamless and accurate decision-making.
                        </span>
                        </li>
                        <li className="flex items-start space-x-3">
                        <span className="w-4 h-4 mt-1 bg-blue-500 rounded-full"></span>
                        <span>
                            AI-driven predictions for smarter business strategies.
                        </span>
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
                        src="/data_analytics_dashboard.png"
                        alt="Data Analytics and BI"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                    </div>
                </div>
                </section>

                {/* Services Section */}
                {[
                {
                    title: "Business Intelligence Dashboards",
                    description:
                    "Interactive dashboards designed to provide real-time insights. Monitor KPIs, track performance, and make informed decisions with ease.",
                    image: "/bi_dashboard.png",
                },
                {
                    title: "Data Integration and Warehousing",
                    description:
                    "Connect disparate data sources into a unified platform. Enable accurate analytics and reporting by leveraging robust data pipelines and warehousing solutions.",
                    image: "/data_integration.png",
                },
                {
                    title: "Predictive Analytics and Insights",
                    description:
                    "Anticipate future trends with machine learning-driven predictive models. Plan proactively and stay ahead of the competition.",
                    image: "/predictive_analytics.png",
                },
                {
                    title: "Custom Reporting Solutions",
                    description:
                    "Get tailored reports that align with your business objectives. Our solutions simplify complex data to deliver actionable insights.",
                    image: "/custom_reporting.png",
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
                    Let LakeFrontAI Revolutionize Your Data Strategy
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                    Partner with us to transform your data into actionable insights. Contact us today to explore our data analytics and BI solutions.
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

export default DataAnalyticsBI;