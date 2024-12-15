"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  }, []);
  return <p> Logging out...</p>
}