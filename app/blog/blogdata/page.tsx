import React from 'react'

function page() {
    return (

        <div className='text-gray-700 bg-white Pro serif' >
            <div className="py-20 background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-2 text-black text-center">
                        Data Migration
                    </h2>
                    <h3 className="text-2xl mb-8 mt-4 font-base text-black text-center">
                        Streamlining Data Migration Using Airflow, dbt, AWS, and Snowflake

                    </h3>

                    <div className="flex flex-col sm:flex-row
        				justify-center items-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full sm:w-auto p-3 border
                       border-gray-300 rounded-md
                       focus:outline-none focus:ring-2
                       focus:ring-blue-400"
                        />
                        <button className="w-full sm:w-auto px-6 py-3
                             bg-blue-600 text-white rounded-md
                             hover:bg-blue-700">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <section className="flex flex-col justify-center max-w-6xl min-h-screen px-4 py-10 mx-auto sm:px-6">
    <div className="flex flex-wrap items-center justify-between mb-8">
      <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
        Continually Scale Results
      </h2>
      <a href="#" className="block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">
          Go to insights
        </a>
    </div>

    <div className="flex flex-wrap -mx-4">
      <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
        <img src="/bulb.png" alt="Card img" className="object-cover object-center w-full h-48" />
        <div className="flex flex-grow">
          <div className="triangle"></div>
          <div className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400 text">
            <div>
              <a href="#" className="inline-block mb-4 mt-5 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600">Reliable Schemas</a>
                
                <a
                  href="#"
                  className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                >
                 The Art and Science of Data Migration: Navigating Complexity in the Digital Age
                </a>
              <p className="mb-4 text-black">
              The Philosophical Underpinnings of Data Migration:
              At its core, data migration raises essential questions about the nature of data itself. What does it mean for data to be "migrated"? Is data a mere collection of facts, or does it carry deeper meanings shaped by context and usage? As we navigate the complexities of moving data, we must recognize that data is not just static information; it is dynamic and contextual, influenced by the systems it inhabits and the people who utilize it.
              </p>
            </div>
            <div>
              <a href="/blog/data1" className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">Read More </a>
                
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col"
        >
          <img
            src="/bulb1.jpeg"
            alt="Card img"
            className="object-cover object-center w-full h-48"
          />
          <div className="flex flex-grow">
            <div className="triangle"></div>
            <div
              className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400"
            >
              <div>
                <a
                  href="#"
                  className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >Client-based Adoption</a>
                
                <a
                  href="#"
                  className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                >
                 The Intellectual Landscape of Data Migration: Navigating Complexity and Ethics
                </a>
              <p className="mb-4">
              In today’s data-driven world, the migration of data has become a cornerstone of organizational evolution. As businesses increasingly rely on complex data ecosystems, the process of transferring data from one system to another transcends mere technical execution; it embodies strategic, philosophical, and ethical dimensions that warrant deep exploration. This blog seeks to unpack the intricacies of data migration, emphasizing its multifaceted nature and the intellectual considerations that accompany it.
              </p>
            </div>
            <div>
              <a href="#" className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">Read More</a>
                
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col"
        >
          <img
            src="/bulb3.jpeg"
            alt="Card img"
            className="object-cover object-center w-full h-48"
          />
          <div className="flex flex-grow">
            <div className="triangle"></div>
            <div
              className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400"
            >
              <div>
                <a
                  href="#"
                  className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >Intellectual Capital</a>
                <a
                  href="#"
                  className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                >
                 The Intellectual Dimensions of Data Migration: Understanding Complexity and Implications
                </a>
              <p className="mb-4">
              Data migration is often perceived as a technical necessity—an operational task to facilitate the transfer of information from one system to another. However, as organizations increasingly depend on data-driven strategies, the process of data migration assumes greater significance, emerging as a complex interplay of technological, strategic, and ethical considerations. This blog delves into the intellectual landscape of data migration, examining its nuances and the broader implications for organizations in the digital age.


              </p>
            </div>
            <div>
              <a href="#" className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">Read More</a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        </div>
    )
}

export default page