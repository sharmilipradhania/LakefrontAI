'use client';
import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaDatabase,
  FaBlog,
  FaLink,
  FaBell,
  FaUser,
  FaShieldAlt,
  FaChartPie,
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [active, setActive] = useState('Dashboard');

  const handleNavClick = (navItem: string) => {
    setActive(navItem);
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
      {/* Logo / Title */}
      <div className="text-xl font-bold mb-6">LakefrontAI</div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-4">
        <button
          className={`flex items-center gap-2 ${
            active === 'Dashboard' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('Dashboard')}
        >
          <FaTachometerAlt />
          Dashboard
        </button>

        <button
          className={`flex items-center gap-2 ${
            active === 'Blog Posts' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('Blog Posts')}
        >
          <FaBlog />
          Blog Posts
        </button>

        <button
          className={`flex items-center gap-2 ${
            active === 'Database' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('Database')}
        >
          <FaDatabase />
          Database
        </button>

        <button
          className={`flex items-center gap-2 ${
            active === 'Connections' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('Connections')}
        >
          <FaLink />
          Connections
        </button>

        <button
          className={`flex items-center gap-2 ${
            active === 'Notifications' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('Notifications')}
        >
          <FaBell />
          Notifications
        </button>

        <button
          className={`flex items-center gap-2 ${
            active === 'User Management' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('User Management')}
        >
          <FaUser />
          User Management
        </button>

        <button
          className={`flex items-center gap-2 ${
            active === 'Security & Access' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('Security & Access')}
        >
          <FaShieldAlt />
          Security & Access
        </button>

        <button
          className={`flex items-center gap-2 ${
            active === 'Reports' ? 'font-bold' : ''
          }`}
          onClick={() => handleNavClick('Reports')}
        >
          <FaChartPie />
          Reports
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;