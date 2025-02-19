'use client';
import React, { useState } from 'react';

const RightPanel: React.FC = () => {
  const [database, setDatabase] = useState('Canada');
  const [schema, setSchema] = useState('Canada');
  const [tableName, setTableName] = useState('');
  const [customSql, setCustomSql] = useState('');
  const [recentChats, setRecentChats] = useState<string[]>([]);

  const handleExecute = () => {
    // Example: push the entered SQL into recent chats
    if (customSql.trim()) {
      setRecentChats((prev) => [...prev, `Executed SQL: ${customSql}`]);
      setCustomSql('');
    }
  };

  return (
    <div className="w-80 bg-gray-50 p-4 border-l border-gray-200">
      <h2 className="text-lg font-bold mb-4">Select a Table</h2>

      {/* Database */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Database:</label>
        <input
          type="text"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      {/* Schema */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Schema:</label>
        <input
          type="text"
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      {/* Table Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">TableName:</label>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      {/* Custom SQL */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Custom SQL:</label>
        <textarea
          value={customSql}
          onChange={(e) => setCustomSql(e.target.value)}
          className="border rounded w-full p-2"
          rows={4}
        />
      </div>

      {/* Execute Button */}
      <button
        onClick={handleExecute}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Execute
      </button>

      {/* Recent Chats */}
      <div className="mt-4">
        <h3 className="font-medium mb-2">Recent Chats</h3>
        <ul className="list-disc pl-6 space-y-1">
          {recentChats.map((chat, index) => (
            <li key={index}>{chat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightPanel;