// hooks/useAuth.js
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  return isAuthenticated;
}
