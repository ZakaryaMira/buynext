// screens/MainScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchNavBar from './NavigationBar';
import BottomTabNavigator from '../components/BottomTabNavigator';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <SearchNavBar />
      <View style={styles.tabsContainer}>
        <BottomTabNavigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30, // if you need spacing from top (SafeArea)
  },
  tabsContainer: {
    flex: 1,
  },
});
