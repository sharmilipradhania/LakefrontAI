import Image from 'next/image'
import React from 'react'

import { CSSProperties } from "react";
import Footer from './Footer';
import NewsLetterSection from './NewsLetterSection';
import Testimonial from './Testimonial';
import Services from './Services';
import FeatureSection from './FeatureSection';

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

      <FeatureSection />
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