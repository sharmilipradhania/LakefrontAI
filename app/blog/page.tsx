import React from 'react'
import Image from 'next/image'
function page() {
    return (
        <div className='container mx-auto w-full h-screen bg-oragne-300'>


            <a href="#" className="inline-block text-xl font-bold px-1 py-2 leading-none border rounded text-black border-gray-100 hover:border-transparent hover:text-red-900 hover:bg-white  mt-8 ml-20 mb-[-4]">Strategy and Consulting
            </a>
            <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ml-20 mr-20">

                <div className="content bg-orange-100 p-2 pt-10 md:p-12 pb-12  w-full lg:absolute top-10 rounded-2xl">
                    <div className="flex justify-between font-bold text-sm">
                    </div>

                    <h2 className="text-m text-black">At LakeFrontAI, we provide comprehensive Strategy and Consulting services that empower organizations to navigate the complexities of the digital age. Our mission is to align your business objectives with cutting-edge technological solutions, ensuring sustainable growth and a competitive edge in your industry.
                    </h2>
                </div>
            </section>
            <section className="mt-60 ml-20 mr-20 ">
                <div className='flex space-x-5 mt-8 '>
                    <button className="bg-yellow-100 hover:bg-orange-100 border border-white-700 text-black py-3 px-10 rounded-2xl ">
                        Strategy and Consulting

                    </button>
                    <button className="bg-green-100 hover:bg-orange-100 border border-white-700 text-black py-3 px-10 rounded-2xl  ">
                        Data Management and Engineering

                    </button>
                    <button className="bg-blue-100 hover:bg-orange-100 border border-white-700 text-black py-3 px-10 rounded-2xl">
                        Drive Innovation with GenAI and ML
                    </button>
                    <button className="bg-pink-100 hover:bg-oragbr-100 border border-white-700 text-black py-3 px-10 rounded-2xl">
                        Actionable Insights Deployment
                    </button>
                </div>
            </section>
            <section className="mt-9 ml-20 mr-20 bg-green-100 rounded-xl">
                <div >
                    <h1 className="text-3xl py-3 px-6 font-bold">Strategic Planning and Roadmapping :</h1>
                    <h2 className=' text-base py-3 px-6'>We collaborate closely with your leadership team to develop actionable strategies that address your unique challenges and goals. By conducting thorough market analyses and leveraging insights from data analytics, we help you identify opportunities for innovation and expansion. Our roadmaps are designed to be flexible yet focused, adapting to changing market conditions while keeping your objectives at the forefront.</h2>
                </div>
            </section>




        </div>
    )
}

export default page