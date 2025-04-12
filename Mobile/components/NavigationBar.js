import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 

export default function SearchNavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); 

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigation.navigate('Product', { query: searchQuery });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <IconButton
          icon="magnify"
          size={24}
          color="#555"
          onPress={handleSearch}
        />
        <TextInput
          style={styles.input}
          placeholder="Rechercher un produit..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {  
    backgroundColor: '#FAFAFA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderColor: '#212121',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 4,
    color: '#212121',
  },
});
