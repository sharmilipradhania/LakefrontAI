'use client';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Dropdown from './Dropdown';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Search Box */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search Symbol"
          className="ml-2 outline-none"
        />
      </div>

      {/* Chart Types Dropdown */}
      <Dropdown />

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="text-gray-600 hover:text-black">Draw</button>
        <button className="text-gray-600 hover:text-black">Info</button>
        <button className="text-gray-600 hover:text-black">Table View</button>
      </div>
    </div>
  );
};

export default Header;