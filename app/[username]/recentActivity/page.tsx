'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the type for recent activity items
interface RecentActivityItem {
  id: number;
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

function classNames(...classes: (string | boolean | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
const RecentActivity: React.FC = () => {
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const username = localStorage.getItem('username');
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        // Replace with your API endpoint
        const token = localStorage.getItem('token');
        const response = await axios.get<RecentActivityItem[]>(`https://lakefrontai.com:4000/${username}/recent-activity`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentActivity(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recent activity:", err);
        setError("Failed to load recent activity.");
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
      {recentActivity.map((item) => (
  <li key={item.id}>
    <a
      href={item.href}
              className={classNames(
                item.current
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                {item.initial}
              </span>
              <span className="truncate">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;