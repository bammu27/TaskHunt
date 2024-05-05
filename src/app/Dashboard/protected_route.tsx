// components/ProtectedRoute.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Check for token on mount
    if (!token) {
      // Redirect to login page if token is missing
      router.push('/login');
    }
  }, []); // Empty dependency array to run effect only once on component mount

  // Render children if authorized
  return <>{token ? children : null}</>;
};

export default ProtectedRoute;
