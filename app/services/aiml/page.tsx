import React from "react";
import Image from "next/image";
import Footer from "../../components/Footer";

const InnovationWithAI = () => {
  return (
  <>
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Main Container */}
      <div className="max-w-[75%] w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white p-10 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Drive Innovation with GenAI and Machine Learning
          </h1>
          <p className="text-lg font-medium">
            Harness the power of generative AI and machine learning to redefine your business capabilities and stay ahead in the digital age.
          </p>
        </div>

        {/* Capabilities Section */}
        <section className="px-6 py-16 bg-white">
          <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Unlock the Future with{" "}
                <span className="text-indigo-500">LakeFrontAI</span>
              </h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-indigo-500 rounded-full"></span>
                  <span>
                    Build intelligent applications with GenAI to automate and enhance workflows.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-indigo-500 rounded-full"></span>
                  <span>
                    Develop predictive models using advanced machine learning techniques.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-indigo-500 rounded-full"></span>
                  <span>
                    Empower decision-making with custom AI solutions tailored to your business needs.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-indigo-500 rounded-full"></span>
                  <span>
                    Seamlessly integrate AI and ML models into your existing infrastructure.
                  </span>
                </li>
              </ul>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-600"
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
                src="/genai_innovation.png"
                alt="GenAI and Machine Learning"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        {[
          {
            title: "Generative AI Solutions",
            description:
              "Design AI-driven content creation, personalized recommendations, and customer support systems powered by GenAI. Boost efficiency and creativity in your workflows.",
            image: "/genai_solutions.png",
          },
          {
            title: "Predictive Analytics and Insights",
            description:
              "Leverage machine learning to predict trends, customer behavior, and operational performance. Make proactive decisions backed by data-driven insights.",
            image: "/predictive_analytics.png",
          },
          {
            title: "AI-Powered Automation",
            description:
              "Transform repetitive tasks with intelligent automation. Implement AI models that streamline processes, improve accuracy, and reduce manual effort.",
            image: "/ai_automation.png",
          },
          {
            title: "Custom Machine Learning Models",
            description:
              "Build and deploy machine learning models tailored to your unique business challenges. We deliver end-to-end solutions from data preparation to model deployment.",
            image: "/custom_ml_models.png",
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
        <div className="mt-10 px-6 py-10 bg-indigo-100 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-4">
            Transform Your Business with LakeFrontAI
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Partner with us to leverage the power of GenAI and machine learning. Let’s innovate together and achieve extraordinary results.
          </p>
          <a
            href="#"
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-600"
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

export default InnovationWithAI;