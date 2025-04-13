import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import MainScreen from './components/MainScreen';
import ProductDetailScreen from './screens/Product/ProductDetailScreen';
import LoginScreen from './screens/login/LoginScreen';
import SignupScreen from './screens/Signup/SignupScreen';
import ProductListScreen from './screens/Product/ProductListScreen'; // make sure path is correct
import EditProductScreen from './screens/Inventory/EditProductScreen';
import InventoryScreen from './screens/Inventory/InventoryScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ProductList" component={ProductListScreen} />
            <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventaire' }}/>
            <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Modifier le produit' }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}