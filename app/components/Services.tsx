import React from 'react'



const Services = () => {
  const cards: { id: number; title: string; bgColor: string; href: string }[] = [
    {
      id: 1,
      title: "Strategic Advisory and Data Solutions",
      bgColor: "bg-purple-50",
      href: "/strategic-advisory",
    },
    {
      id: 2,
      title: "Data Engineering and Business Intelligence",
      bgColor: "bg-purple-100",
      href: "/data-engineering", 
    },
    {
      id: 3,
      title:
        "Fuel the Future: Transform Ideas into Reality with GenAI and Machine Learning",
      bgColor: "bg-purple-200",
      href: "/genai-ml", 
    },
    {
      id: 4,
      title: "Actionable Intelligence to Drive Business Growth",
      bgColor: "bg-purple-300",
      href: "/actionable-intelligence", 
    },
  ];

  return (
    <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-indigo-600">Our Offerings</h2>
          <p className="mt-2 text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            Driving growth and efficiency by leveraging resources, data, and innovation.
          </p>
        </div>
        <div className="container mx-auto mt-16 mb-40 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex items-center justify-center text-xl font-semibold border border-gray-200 rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300 ${card.bgColor}`}
          >
            {card.title}
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}

export default Services