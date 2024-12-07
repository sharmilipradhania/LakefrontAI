import React from 'react'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'


const FeatureSection = () => {
  const features = [
    {
      name: 'Innovative AI Solutions',
      description:
        'Solving complex challenges with Data Engineering, Business Intelligence, and GenAI',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Confidence and Clarity',
      description: 'Defining success, eliminating uncertainty, and delivering impactful outcomes',
      icon: LockClosedIcon,
    },
    {
      name: 'Future-Focused Excellence',
      description: 'Driven by ownership, expertise, and bold, innovative approaches to create value',
      icon: ServerIcon,
    },
  ]

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
          <h2 className="text-4xl  font-semibold text-indigo-600">Next-Gen Intelligent Solutions</h2>
              <p className="mt-2 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Solve Complex Challenges with Confidence
              </p>
              <p className="mt-2 text-lg/8 text-gray-600">
                Drive business growth by leveraging Data Engineering, Business Intelligence, and GenAI to eliminate uncertainty and deliver impactful results.
              </p>
            <dl className="mt-4 max-w-xl space-y-4 text-base/7 text-gray-600 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-indigo-600" />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <img
          alt="Product screenshot"
          src="/aiblock.jpeg"
          width={720}
          height={720}
          className="w-[48rem] max-w-720 rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        />
      </div>
    </div>
  </div>
  )
}

export default FeatureSection