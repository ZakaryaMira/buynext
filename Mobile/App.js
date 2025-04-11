import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeroScreen from './screens/Hero/Hero';

export default function App() {
  return (
    <View style={styles.container}>
      <HeroScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
