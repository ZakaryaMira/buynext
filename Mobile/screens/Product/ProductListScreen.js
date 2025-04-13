import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator,} from 'react-native';


import CategoryFilter from '../../screens/Product/Components/CategoryFilter'; // Adjust the path
import SearchNavBar from '../../components/NavigationBar';

export default function ProductListScreen({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('tous les produits');

  const query = route?.params?.query?.toLowerCase() || '';

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setLoading(false);
        applyFilters(json);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [query, selectedCategory]);

  const applyFilters = (allProducts) => {
    let result = allProducts;

    if (selectedCategory !== 'tous les produits') {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (query) {
      result = result.filter(item =>
        item.title.toLowerCase().includes(query)
      );
    }

    setFiltered(result);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#000" />
      ) : (
        <>
        
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
          <FlatList
            data={filtered}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.price}>{item.price} €</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}

  

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 6,
  },
  image: {
    height: 150,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#212121',
  },
  category: {
    color: '#212121',
    marginTop: 8,
    textAlign: 'center',
  },
  price: {
    color: '#212121',
    marginTop: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
