import React, { useState } from 'react';
import { Alert, TouchableOpacity, View , Text , StyleSheet } from 'react-native';
import FormComponentTemplate from '../../components/FormComponentTemplate';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
export default function LoginScreen() {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const handleLogin = async (formData) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if(data.token) {
        await SecureStore.setItemAsync('userToken', data.token);
        Alert.alert("Bienvenue !", "Connexion réussie ");
        /* navigation.navigate('Products'); */
      }else {
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
      
    } catch (error) {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <View style={styles.center}>
    <FormComponentTemplate
      title="Connexion"
      description="Connectez-vous pour accéder à votre compte"
      button="Se connecter"
      onSubmit={handleLogin}
      fields={[
        { name: 'username', label: "Nom d'utilisateur", type: 'text', placeholder: "Entrez votre nom d'utilisateur", required: true },
        { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Entrez votre mot de passe', required: true },
      ]}
    />
    {error && (
    <Text style={styles.errorText}>{error}</Text>
    )}

    <View>
      <TouchableOpacity>
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Vous n’avez pas de compte ? Créez-en un ici</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  link: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 10, // 28 is very large for a link (adjust as needed)
    fontWeight: 'bold',
    color: '#007AFF', // Standard link color (blue), change as needed
    textDecorationLine: 'underline', // Optional: makes it look more like a link
  },
  errorText: {
    color: '#EF233C',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});