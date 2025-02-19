'use client';
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const ChartPlot: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    };
    
    fetchData();
  }, []);

  return (
    <div className="w-full h-96 bg-white shadow-md rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="high" fill="green" />
          <Bar dataKey="low" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPlot;