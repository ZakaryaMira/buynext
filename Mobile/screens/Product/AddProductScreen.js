import React, { useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import useAuth from '../../hooks/useAuth'; 
export default function AddProductScreen() {
  const isAuthenticated = useAuth(); 


  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    if (!title || !price || !category || !description || !image) {
      Alert.alert('Tous les champs sont requis');
      return;
    }

    const productData = {
      title,
      price: parseFloat(price),
      description,
      image,
      category
    };

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const result = await response.json();
      console.log(result);
      Alert.alert('Produit ajouté avec succès!');
    } catch (error) {
      Alert.alert("Erreur lors de l'ajout du produit");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission refusée pour accéder à la galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (isAuthenticated === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF233C' }}>
          ⛔ Accèss refusé. Veuillez vous connecter pour ajouter un produit.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Ajouter un produit</Text>

      <Text style={styles.label}>Titre du produit *</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Prix du produit *</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Catégorie de produit *</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          <Picker.Item label="-- Sélectionnez une option --" value="" />
          <Picker.Item label="Vêtements homme" value="men's clothing" />
          <Picker.Item label="Bijoux" value="jewelery" />
          <Picker.Item label="Électronique" value="electronics" />
          <Picker.Item label="Vêtements femme" value="women's clothing" />
        </Picker>
      </View>

      <Text style={styles.label}>Description du produit *</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Image du produit</Text>
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>📷 Choisir une image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Ajouter au produit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: '#212121',
    padding: 12,
    borderRadius: 2,
    borderColor: '#FAFAFA',
    borderWidth: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
