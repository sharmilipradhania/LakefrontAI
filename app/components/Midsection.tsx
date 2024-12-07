import Image from 'next/image'
import React from 'react'

import { CSSProperties } from "react";
import Footer from './Footer';
import NewsLetterSection from './NewsLetterSection';
import Testimonial from './Testimonial';
import Services from './Services';

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
            src="/aiblock.jpeg"
            alt="Logo"
            width={"600"}
            height={"300"}
            className="relative "
          />
        </div>
      </div>
      {/* tiger gensection */}

      <Services />

      <section className="container mx-auto p-10 md:py-0 px-0 md:p-0 md:px-0">
        <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
          <Image className=" h-screen w-full object-cover rounded-md" src="/building.jpeg" alt="Random image"
            width={"600"}
            height={"300"}
          />
          <div className="content bg-transparent p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 left-5">
            <div className="flex justify-between font-bold text-sm">
            </div>
            <h2 className="text-4xl font-bold text-orange-300 mt-1 md:mt-1">Augmenting industry best practices with AI and analytics</h2>
            <p className="my-3 text-justify text-xl font-base text-orange-300 leading-relaxed">Every industry has its specific challenges, and there are no playbooks for many pressing ones. Balancing best practices and fundamental grounds-up thinking is needed to solve these.</p>
            <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-orange-300 font-bold text-sm hover:bg-purple-800">
              Read More
            </button>
          </div>
        </section>
      </section>
      {/* new */}
      
      <Testimonial />
      <NewsLetterSection />
      <Footer />
    </div>


  )
}

export default Midsection