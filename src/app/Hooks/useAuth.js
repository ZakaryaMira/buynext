// hooks/useAuth.js
'use client';

import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.clear(); ;
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
}
