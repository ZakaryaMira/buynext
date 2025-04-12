import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import ProductListScreen from '../screens/Product/ProductListScreen';
import AddProductScreen from '../screens/Product/AddProductScreen'; // Create this screen

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
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
      <Tab.Screen name="Connexion" component={LoginScreen} />
    </Tab.Navigator>
  );
}
