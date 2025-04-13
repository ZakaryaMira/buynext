import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, ScrollView, Alert
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditProductScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { id } = params;

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          title: data.title,
          price: data.price.toString(),
          description: data.description,
          category: data.category,
          image: data.image,
        })
      );
  }, [id]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: form.title,
          price: parseFloat(form.price),
          description: form.description,
          image: form.image,
          category: form.category,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      Alert.alert('Succès', 'Produit mis à jour avec succès');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', "La mise à jour a échoué");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        value={form.title}
        onChangeText={(text) => handleChange('title', text)}
      />

      <Text style={styles.label}>Prix</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={form.price}
        onChangeText={(text) => handleChange('price', text)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={form.description}
        onChangeText={(text) => handleChange('description', text)}
      />

      <Text style={styles.label}>Catégorie</Text>
      <TextInput
        style={styles.input}
        value={form.category}
        onChangeText={(text) => handleChange('category', text)}
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        value={form.image}
        onChangeText={(text) => handleChange('image', text)}
      />

      <View style={styles.button}>
        <Button title="Enregistrer" onPress={handleSave} color="#0A84FF" />
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 6,
  },
  button: {
    marginTop: 24,
  },
});
