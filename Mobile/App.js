import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper'; // ✅ Add this

import HeroScreen from './screens/Hero/Hero';
import LoginScreen from './screens/login/LoginScreen';
import SignupScreen from './screens/Signup/SignupScreen';
import ProductListScreen from './screens/Product/ProductListScreen';
import ProductDetailScreen from './screens/Product/ProductDetailScreen';
import NavigationBar from './components/NavigationBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider> 
      <SafeAreaProvider>
        <NavigationContainer>
          <NavigationBar />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HeroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Product" component={ProductListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
