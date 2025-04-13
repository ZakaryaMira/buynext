import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';

import LoginScreen from '../screens/login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import ProductListScreen from '../screens/Product/ProductListScreen';
import AddProductScreen from '../screens/Product/AddProductScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      setIsAuthenticated(!!token);
    };
    
    checkToken();
  }, []);

  const handleLogout = async () => {
    // Remove the token from SecureStore to log out
    await SecureStore.deleteItemAsync('userToken');
    setIsAuthenticated(false);  // Update the authentication state
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Connexion':
              iconName = 'log-in-outline';
              break;
            case 'Ajouter un produit':
              iconName = 'add-circle-outline';
              break;
            case 'Liste des produits':
              iconName = 'list-outline';
              break;
            case 'Déconnexion':
              iconName = 'log-out-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Liste des produits" component={ProductListScreen} />
      <Tab.Screen name="Ajouter un produit" component={AddProductScreen} />
      
      {/* Conditionally render Connexion or Déconnexion based on authentication */}
      {!isAuthenticated ? (
        <Tab.Screen name="Connexion" component={LoginScreen} />
      ) : (
        <Tab.Screen name="Déconnexion" component={() => (
          <LoginScreen />
        )}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout(); // Log out on tab press
          },
        }}
      />
      )}
    </Tab.Navigator>
  );
}
