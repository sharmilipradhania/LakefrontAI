import Image from 'next/image'
import React from 'react'
import Imageslider from "./Imageslider"
import { CSSProperties } from "react";
import Footer from './Footer';
const Midsection = () => {
  return (
    // animation section
    <div className='area'>
      <ul className="circles">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      {/* ,,,,,, */}
      <div className="flex bg-gray-700 ">

        <div className='flex-1 mt-10 ml-10'>

          <h1 className='text-orange-600'>WHAT WE DO</h1>
          <h2 className='text-4xl font-bold text-white mr-5 mt-5'>We deliver confidence by</h2>
          <h2 className='text-4xl font-bold text-white mr-5 mt-2'> resolving your most </h2>
          <h2 className='text-4xl font-bold text-white mr-5 mt-2'> challenging problems</h2>

          <p className="mt-2 text-white mt-5 text-base">Effective problem-solving isn’t solely about arriving at answers; it’s about persistently inquiring until we understand what defines success and how to attain it. Our mission is to assist you in steering the optimal course of action, eliminating uncertainty, and advancing with confidence by uniting the strengths of Data Engineering, Business Intellingence and Gen AI .
          </p>
          <div>

            <h1 className='text-3xl mt-40 text-orange-600'>What powers us?</h1>

            <h2 className='text-white mt-5 text-base mb-10'>An attribute intrinsic to the exceptional teams at LakefrontAI, this helps us unravel complexity and solve some of the toughest problems out there. An ownership mindset in all we do, a future-focused approach to solving problems, bringing the breadth and depth of expertise, and daring to experiment with unconventional methods to ultimately deliver value.</h2>
          </div>
          <div>
            <button className="bg-white hover:bg-gray-700 border border-white-700 text-black py-3 px-10 rounded mb-5 ml-2">
              See how we work
            </button>
            <button className="bg-white hover:bg-gray-700 border border-white-700 text-black py-3 px-10 rounded mb-5 ml-2">
              See how we work
            </button>
          </div>
        </div>
        <div className='mr-1 mt-20 ml-1'>
          <Image
            src="/tg.jpg"
            alt="Logo"
            width={"600"}
            height={"300"}
            className="relative "
          />
        </div>
      </div>
      {/* tiger gensection */}

      <section className="container mx-auto p-10 md:py-0 px-0 md:p-0 md:px-0">
        <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
          <Image className=" h-screen w-full object-cover rounded-md" src="/homeimg.jpeg" alt="Random image"
            width={"600"}
            height={"300"}
          />
          <div className="content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 left-5 rounded-md">
            <div className="flex justify-between font-bold text-sm">
              <p>Product Review</p>
              <p className="text-gray-100">17th March, 2021</p>
            </div>
            <h2 className="text-3xl font-semibold mt-4 md:mt-10">For the products</h2>
            <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">Welcome to the future of innovation with our cutting-edge AI products! Designed to enhance efficiency, drive insights, and elevate user experiences, our AI solutions leverage advanced algorithms and machine learning to solve real-world challenges. Whether you're looking to automate processes, gain deeper analytics, or personalize interactions, our products are tailored to meet your needs. Discover how our AI technology can transform your business and empower you to achieve more.</p>
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-purple-800">Read
              More</button>
          </div>
        </section>
      </section>

      <div className="container mx-auto mt-20 mb-40">
        <h1 className=" mb-10 ml-5 text-2xl font-bold">Transform your enterprise data into Actionable Insights
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-64 ml-4 mr-4">
          <div className="flex justify-center text-xl border-2 border-gray-300 rounded-xl p-6 text-center bg-gray-100">Strategy and Consulting
          </div>
          <div className="flex justify-center text-xl border-2 border-gray-300 rounded-xl p-6 text-center bg-gray-100">Data Management and Engineering
          </div>
          <div className="flex justify-center text-xl border-2 border-gray-300 rounded-xl p-6  text-center bg-gray-100">Drive Innovation with GenAI and ML
          </div>
          <div className="flex justify-center text-xl border-2 border-gray-300 rounded-xl p-6 text-center bg-gray-100">Actionable Insights Deployment
          </div>
        </div>
      </div>
      <section className="container mx-auto p-10 md:py-0 px-0 md:p-0 md:px-0">
        <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
          <Image className=" h-screen w-full object-cover rounded-md" src="/boston.jpg" alt="Random image"
            width={"600"}
            height={"300"}
          />
          <div className="content bg-transparent p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 left-5">
            <div className="flex justify-between font-bold text-sm">
            </div>
            <h2 className="text-4xl font-bold mt-1 md:mt-1">Augmenting industry best practices with AI and analytics</h2>
            <p className="my-3 text-justify text-xl font-base text-gray-700 leading-relaxed">Every industry has its specific challenges, and there are no playbooks for many pressing ones. Balancing best practices and fundamental grounds-up thinking is needed to solve these.</p>
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-purple-800">Read
              More</button>
          </div>
        </section>
      </section>
      {/* new */}
      <div className="flex bg-gray-700 mb-20">

        <div className='flex-1 mt-10 ml-10 mb-40'>


          <h2 className='text-4xl font-bold text-white mr-5 mt-5'>Through resolving your most </h2>
          <h2 className='text-4xl font-bold text-white mr-5 mt-2'>  formidable challenges </h2>
          <h2 className='text-4xl font-bold text-white mr-5 mt-2'>we brings you cofidence</h2>

          <p className="mt-2 text-white mt-5 text-base">Effective problem-solving extends beyond simply finding answers; it requires the persistent pursuit of insightful questions to fully comprehend what defines success and how to attain it. Our commitment is to guide you in navigating the optimal course of action, dispelling ambiguity, and progressing with assurance. By seamlessly integrating the cutting-edge capabilities of artificial intelligence and advanced analytics, we empower you to make informed decisions with confidence. Our holistic approach ensures that you not only overcome immediate challenges but also build a solid foundation for sustained success in the future.
            .
            .</p>
          <button className="mt-2 md:mt-5 p-3 px-5 bg-white text-black font-bold text-sm hover:bg-purple-800 rounded-lg">Read
            More</button>
        </div>
        <div className='mr-1 mt-20 ml-1 '>
          <Image
            src="/tiger-stack.jpg"
            alt="Logo"
            width={"600"}
            height={"300"}
            className="relative "
          />
        </div>
      </div>

      <div className="flex bg-white mt-1">
        <div className='flex-1 mt-10 ml-10'>

          <p className="text-black mt-1 text-3xl mr-40">We’ve partnered with the best to bring you the latest</p>

          <div>
            <button className="bg-white hover:bg-gray-700 border border-white-700 text-black py-3 px-10 rounded mb-5 mt-6">
              Read about our partners
            </button>
          </div>
        </div>
        <div className='mr-1 mt-20 ml-1'>
          <Image
            src="/icn_home_aws.webp"
            alt="Logo"
            width={"60"}
            height={"30"}
            className="relative "
          />
          <Image
            src="/icn_home_databricks.webp"
            alt="Logo"
            width={"100"}
            height={"50"}
            className="relative "
          />
        </div>
        <div className='mr-20 mt-20 ml-1'>
          <Image
            src="/icn_home_microsoft.webp"
            alt="Logo"
            width={"100"}
            height={"90"}
            className="relative "
          />
        </div>
      </div>

      <Imageslider />
      <div className="flex bg-gray-100 mb-20">

        <div className='flex-1 mt-10 ml-10 mb-40'>


          <h2 className='text-4xl font-bold text-black mr-20 mt-20'>Harness your complete potential for a future filled with infinite opportunities.
          </h2>

          <p className="mt-2 text-black mt-5 text-base mb-5">Experience a gratifying career in an environment that values teamwork and collaboration.
          </p>
          <a href="#" className="text-black bold border-b-2 border-black hover:text-teal-900 mt-10">Know more...</a>
        </div>
        <div className='mr-1 mt-20 ml-1 '>
          <Image
            src="/why_joinus.webp"
            alt="Logo"
            width={"400"}
            height={"200"}
            className="relative "
          />
        </div>
      </div>
      <Footer />
    </div>


  )
}

export default Midsection