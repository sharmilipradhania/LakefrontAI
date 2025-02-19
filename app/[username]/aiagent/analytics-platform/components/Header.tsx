'use client';
import React from 'react';

interface HeaderProps {
  onToggleView: (view: 'chat' | 'chart' | 'sql') => void;
  activeView: 'chat' | 'chart' | 'sql';
}

const Header: React.FC<HeaderProps> = ({ onToggleView, activeView }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Toggle Chat / Chart / SQL */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeView === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => onToggleView('chat')}
        >
          Chat
        </button>

        <button
          className={`px-4 py-2 rounded-md ${
            activeView === 'chart' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => onToggleView('chart')}
        >
          Chart
        </button>

        <button
          className={`px-4 py-2 rounded-md ${
            activeView === 'sql' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => onToggleView('sql')}
        >
          SQL
        </button>
      </div>
    </div>
  );
};

export default Header;