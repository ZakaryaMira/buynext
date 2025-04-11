import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const HeroScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Floating Icons */}
      <Image source={require('../../assets/clothing.png')} style={[styles.icon, styles.iconTopLeft]} />
      <Image source={require('../../assets/driller.png')} style={[styles.icon, styles.iconTopRight]} />
      <Image source={require('../../assets/game.png')} style={[styles.icon, styles.iconBottomLeft]} />
      <Image source={require('../../assets/telephone.png')} style={[styles.icon, styles.iconBottomRight]} />

      {/* Title */}
      <Text style={styles.title}>BuyNext</Text>
      <Text style={styles.subtitle}>Votre prochain achat, à portée de clic</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Découvrez les offres</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    width: 80,
    height: 80,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  iconTopLeft: {
    top: 100,
    left: 30,
  },
  iconTopRight: {
    top: 100,
    right: 30,
  },
  iconBottomLeft: {
    bottom: 100,
    left: 30,
  },
  iconBottomRight: {
    bottom: 100,
    right: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#212121',
    transform: [{ rotate: '-5deg' }],
    textShadowColor: '#aaa',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFC107',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#e2ac00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});
