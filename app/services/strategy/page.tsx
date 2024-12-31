import React from "react";
import Image from "next/image";
import Footer from "../../components/Footer";

const Services = () => {
  return (
    <>
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Main Container */}
      <div className="max-w-[75%] w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300 text-white p-10 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-extrabold mb-4">Strategy and Consulting</h1>
          <p className="text-lg font-medium">
            Empowering organizations to navigate the complexities of the digital age with innovative strategies and technological solutions.
          </p>
        </div>

        {/* Why Choose Section */}
        <section className="px-6 py-16 bg-white">
          <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose <span className="text-orange-500">LakeFrontAI</span>
              </h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-orange-500 rounded-full"></span>
                  <span>Expertise Across Industries: Diverse experience for deep insights.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-orange-500 rounded-full"></span>
                  <span>Customized Solutions: Tailored strategies to fit unique objectives.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-orange-500 rounded-full"></span>
                  <span>Collaborative Partnership: Your success is our success.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-4 h-4 mt-1 bg-orange-500 rounded-full"></span>
                  <span>Results-Driven Approach: Delivering measurable outcomes.</span>
                </li>
              </ul>
              <div className="flex space-x-4">
                <a
                  href="/login"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600"
                >
                  Try It Free
                </a>
                <a
                  href="/productDescription"
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow hover:bg-gray-300"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <Image
                src="/Ai.png"
                alt="AI Strategy"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Sections */}
        {[
          {
            title: "Strategic Planning and Roadmapping",
            description:
              "We collaborate closely with your leadership team to develop actionable strategies that address your unique challenges and goals. By conducting thorough market analyses and leveraging insights from data analytics, we help you identify opportunities for innovation and expansion.",
          },
          {
            title: "Digital Transformation Consulting",
            description:
              "Embracing digital transformation is crucial for staying relevant in today’s fast-paced environment. Our experts guide you through this journey by assessing your current technological landscape and recommending tailored solutions.",
          },
          {
            title: "Technology Assessment and Optimization",
            description:
              "We evaluate your existing IT infrastructure to identify areas for improvement and optimization. Our goal is to enhance efficiency, reduce costs, and improve performance.",
          },
          {
            title: "Organizational Change Management",
            description:
              "Implementing new strategies and technologies often requires cultural and operational shifts. We provide change management services that include training programs, stakeholder engagement, and communication plans.",
          },
          {
            title: "Risk Management and Compliance",
            description:
              "Navigating the regulatory landscape is essential for protecting your business. We offer risk assessment services to identify potential vulnerabilities in your operations.",
          },
          {
            title: "Innovation Workshops and Thought Leadership",
            description:
              "To foster a culture of continuous improvement, we conduct workshops and seminars that encourage innovative thinking. By staying abreast of the latest industry trends and technological advancements, we provide you with insights for strategic advantage.",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="px-6 py-10 bg-white rounded-lg shadow-md mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
            <p className="text-lg text-gray-700">{section.description}</p>
          </div>
        ))}

        {/* Closing Section */}
        <div className="mt-10 px-6 py-10 bg-orange-100 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-4">
            Partner with LakeFrontAI for Strategic Growth
          </h3>
          <p className="text-lg text-gray-700">
            By partnering with LakeFrontAI, you gain access to a wealth of
            knowledge and expertise dedicated to propelling your organization
            forward. Achieve your vision with effective strategies and informed
            decisions.
          </p>
        </div>
      </div>


    </div>
          {/* Footer */}
          <Footer />
    </>
  );
};

export default Services;