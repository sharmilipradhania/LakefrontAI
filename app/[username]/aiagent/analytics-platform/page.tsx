'use client';
import React, { useState } from 'react';
import MainContent from './components/chat/MainContent';
import RightPanel from './components/chat/RightPanel';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chart from './components/chart/chart';
// import SQLComponent from './components/sql/SQLComponent'; // SQL UI component

export default function AnalyticsPlatform() {
  const [activeView, setActiveView] = useState<'chat' | 'chart' | 'sql'>('chat'); // Manage active view

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Header with View Toggle */}
      <Header onToggleView={setActiveView} activeView={activeView} />

      {/* Main container (Sidebar + Dynamic View + Right Panel) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center - Switch between Chat, Chart & SQL */}
        <div className="flex flex-1 overflow-hidden">
          {activeView === 'chat' && <MainContent />}
          {activeView === 'chart' && <Chart />}
          {/* activeView === 'sql' && <SQLComponent /> */}
          <RightPanel />
        </div>
      </div>
    </div>
  );
}