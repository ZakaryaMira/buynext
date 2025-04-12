// components/CategoryFilter.js
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import categories from '../Components/categories'; // Adjust the path as needed

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.chip,
              selectedCategory === category && styles.chipSelected
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === category && styles.chipTextSelected
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingLeft: 16,
  },
  chip: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  chipSelected: {
    backgroundColor: '#212121',
  },
  chipText: {
    color: '#212121',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
