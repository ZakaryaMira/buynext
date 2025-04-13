import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth'; // adjust path if needed
import LoginScreen from '../login/LoginScreen';

const InventoryScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const isAuthenticated = useAuth();

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la récupération des produits');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchProducts);
    return unsubscribe;
  }, [navigation]);

  const deleteProduct = async (id) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      Alert.alert('Supprimé', 'Produit supprimé avec succès');
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la suppression');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>Prix: ${item.price}</Text>

      <View style={styles.buttons}>
        <Button
          title="Modifier" color={"#495057"} 
          onPress={() => navigation.navigate('EditProduct', { id: item.id })}
        />
        <Button
          title="Supprimer"
          color="#EF233C"
          onPress={() =>
            Alert.alert('Confirmer', 'Voulez-vous supprimer ce produit ?', [
              { text: 'Annuler' },
              { text: 'Supprimer', onPress: () => deleteProduct(item.id) },
            ])
          }
        />
      </View>
    </View>
  );

  if (isAuthenticated === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF233C' }}>⛔ Accèss refusé.</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF233C' }}>. Veuillez vous connecter pour Gerer linventaire..</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
