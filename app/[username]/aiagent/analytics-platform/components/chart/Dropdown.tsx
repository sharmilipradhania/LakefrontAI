'use client';
import React, { useState } from 'react';
import { FaChartLine } from 'react-icons/fa';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-green-600 font-semibold"
      >
        <FaChartLine className="mr-2" /> Chart Types ▾
      </button>

      {isOpen && (
        <div className="absolute bg-white shadow-md rounded-md p-2 mt-2">
          <button className="block px-4 py-2 text-gray-600 hover:text-black">Candlestick</button>
          <button className="block px-4 py-2 text-gray-600 hover:text-black">Line Chart</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;