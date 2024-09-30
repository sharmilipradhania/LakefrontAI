import React from 'react'

const Services = () => {
  return (
    <div className="container mx-auto mt-20 mb-40">
        <h1 className=" mb-10 ml-5 text-2xl font-bold">At LakeFrontAI, we provide comprehensive Strategy and Consulting services that empower organizations to navigate the complexities of the digital age. Our mission is to align your business objectives with cutting-edge technological solutions, ensuring sustainable growth and a competitive edge in your industry.

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
  )
}

export default Services