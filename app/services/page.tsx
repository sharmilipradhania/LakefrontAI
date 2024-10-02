import React from 'react'
import Image from 'next/image'

const Services = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className=' ml-20 mr-20'>
        <a href="#" className="pb-4 text-3xl font-serif font-bold hover:text-gray-700 ">STRATEGY AND CONSULTING
        </a>

        <p className="pb-6 mt-5">At LakeFrontAI, we provide comprehensive Strategy and Consulting services that empower organizations to navigate the complexities of the digital age. Our mission is to align your business objectives with cutting-edge technological solutions, ensuring sustainable growth and a competitive edge in your industry.</p>
      </div>

      <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block l:inline">Why Choose LakeFrontAI </span>

                </h1>
                <ul className=' ml-4 text-xl font-medium'>
                  <li className="list-disc" >Expertise Across Industries: Our team brings diverse experience from various sectors, allowing us to provide insights that are both deep and broad.</li>
                  <li className="list-disc"> Customized Solutions: We recognize that every organization is unique. Our strategies are tailored to fit your specific needs and objectives.</li>
                  <li className="list-disc">Collaborative Partnership: We view our clients as partners. Your success is our success, and we work closely with you to achieve it.</li>
                  <li className="list-disc"> Results-Driven Approach: Our focus is on delivering tangible outcomes that have a measurable impact on your business performance.
                  </li>
                </ul><br></br>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <a href="#_" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                    Try It Free
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                  <a href="#_" className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className=" overflow-hidden rounded-md shadow-xl ">
                <Image
                  src="/Ai.png"
                  alt="Logo"
                  width={"1000"}
                  height={"1080"}
                  className="relative "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-64 ml-4 mr-4 mb-10">
        <div className="flex justify-center text-2xl font-m border-2 border-gray-300 rounded-xl p-6 text-center bg-green-100">Strategy and Consulting
        </div>
        <div className="flex justify-center text-2xl font-m border-2 border-gray-300 rounded-xl p-6 text-center bg-orange-100">Data Management and Engineering
        </div>
        <div className="flex justify-center text-2xl font-m border-2 border-gray-300 rounded-xl p-6  text-center bg-red-100">Drive Innovation with GenAI and ML
        </div>
        <div className="flex justify-center text-2xl font-m border-2 border-gray-300 rounded-xl p-6 text-center bg-yellow-100">Actionable Insights Deployment
        </div>
      </div>
      <div className=' mt-40 ml-20 mr-20 mb-10'>
        <a href="#" className="pb-4 text-3xl font-serif font-bold hover:text-gray-700 ">Strategic Planning and Roadmapping:
        </a>
        <p className="pb-6 mt-5 text-xl font-light">We collaborate closely with your leadership team to develop actionable strategies that address your unique challenges and goals. By conducting thorough market analyses and leveraging insights from data analytics, we help you identify opportunities for innovation and expansion. Our roadmaps are designed to be flexible yet focused, adapting to changing market conditions while keeping your objectives at the forefront.</p>
      </div>
      <div className=' mt-10 ml-20 mr-20 mb-10'>
        <a href="#" className="pb-4 text-3xl font-serif font-bold hover:text-gray-700 ">Digital Transformation Consulting:
        </a>
       
        <p className="pb-6 mt-5 text-xl font-light">Embracing digital transformation is crucial for staying relevant in today’s fast-paced environment. Our experts guide you through this journey by assessing your current technological landscape and recommending tailored solutions. Whether it’s integrating artificial intelligence, machine learning, or advanced data management systems, we ensure that technology becomes a catalyst for your business success</p>

      </div>



    </div>

  )
}

export default Services