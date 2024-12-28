'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Resources', href: '#' },
  { name: 'Company', href: '#' },
];

const stats = [
  { label: 'Clients Served', value: '2+' },
  { label: 'Projects Delivered', value: '10+' },
  { label: 'Satisfied Customers', value: '99.9%' },
];

const services = [
  {
    title: 'GenAI',
    description:
      'Leverage advanced LLM models to provide advanceed GenAi solutions',
    imageUrl: '/ai-ml.jpg',
  },
  {
    title: 'AI & Machine Learning',
    description:
      'Leverage advanced AI models to automate processes, predict outcomes, and drive business growth.',
    imageUrl: '/ai-ml.jpg',
  },
  {
    title: 'Data Analytics',
    description:
      'Transform raw data into actionable insights. Leverage our expertise in statistical modeling, visualization, and predictive analytics.',
    imageUrl: '/data-analytics.jpg',
  },
  {
    title: 'Business Intelligence',
    description:
      'Empower decision-makers with real-time dashboards and reporting tools tailored to your business needs.',
    imageUrl: '/business-intelligence.jpg',
  },


];


export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 text-white">
        <div className="max-w-7xl mx-auto py-16 px-6 text-center">
          <h1 className="text-5xl font-extrabold">Empowering Decisions with Data</h1>
          <p className="mt-4 text-lg font-medium">
            At LakeFrontAI, we provide GenAI, Data Engineering, data analytics and business intelligence solutions to
            help you stay ahead of the curve.
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={service.imageUrl} alt={service.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl font-bold">{stat.value}</p>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 LakeFrontAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}