import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(json => setProduct(json))
      .catch(err => console.error(err));
  }, []);

  if (!product) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#000" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.price}>{product.price} €</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Acheter maintenant </Text>
      </Button>
      <Button style={styles.addButton}>
        <Text style={styles.addButtonText}>Ajouter au panier</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#212121',
    borderWidth: 1
  },
  image: {
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: '#212121',
  },
  category: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#212121',
  },
  price: {
    fontSize: 18,
    color: '#FFC107',
    marginBottom: 16,
    textAlign: 'center',
    color: '#212121',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#FAFAFA',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    borderColor: '#212121',
    borderWidth: 4
  },
  buyButton: {
    marginTop: 16,
    backgroundColor: '#212121',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButtonText: {
    color: '#212121',
    fontWeight: 'bold',
  },
});
