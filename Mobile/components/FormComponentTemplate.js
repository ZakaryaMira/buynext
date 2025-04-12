import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

export default function FormComponentTemplate({ title, description, fields, onSubmit, button }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
    } catch (err) {
      setError("Une erreur s'est produite lors de la soumission.");
      console.error("Form submission error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {fields.map(field => (
        <View key={field.name} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            secureTextEntry={field.type === 'password'}
            onChangeText={(value) => handleChange(field.name, value)}
          />
        </View>
      ))}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title={button} onPress={handleSubmit} color="#FFC107" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 10,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#212121',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#212121',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  error: {
    color: '#EF233C',
    textAlign: 'center',
    marginBottom: 12,
  },
});
