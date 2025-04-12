import React from 'react';
import FormComponentTemplate from '../../components/FormComponentTemplate';
import { Alert, TouchableOpacity, View , Text , StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function SignupScreen() {
  const navigation = useNavigation();
  const handleSignup = async (formData) => {
    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User created:", data);
      Alert.alert("Succès", "Compte créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la création du compte.");
    }
  };

  return (
      <View style={styles.center}>
      <FormComponentTemplate
      title="Créer un compte"
      description="Remplissez les champs pour vous inscrire"
      button="S'inscrire"
      onSubmit={handleSignup}
      fields={[
        { name: 'username', label: "Nom d'utilisateur", type: 'text', placeholder: "Entrez votre nom d'utilisateur", required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Entrez votre email', required: true },
        { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Entrez votre mot de passe', required: true },
      ]}
    />
        <View>
          <TouchableOpacity>
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}  >Déjà inscrit ? Connectez-vous</Text>
          </TouchableOpacity>
        </View>
      <></>
      </View>
  );
}
const styles = StyleSheet.create({
  link: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 10, 
    fontWeight: 'bold',
    color: '#007AFF', 
    textDecorationLine: 'underline', 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});