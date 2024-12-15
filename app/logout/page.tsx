"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() { // Changed 'logout' to 'Logout'
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  }, [router]); // Added 'router' to dependency array

  return <p>Logging out...</p>;
}