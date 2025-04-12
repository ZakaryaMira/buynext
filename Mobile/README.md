# 📱 BUYNEXT Mobile – Application React Native (Expo)

Ceci est la **version mobile** de l’application e-commerce BUYNEXT, développée avec **React Native** et **Expo**. Elle reproduit toutes les fonctionnalités principales de la [version web Next.js](`src/app/README.md`), tout en adaptant l’interface et l’expérience utilisateur aux appareils mobiles.

## 📱 Fonctionnalités Clés

- 🔐 Authentification utilisateur (connexion / inscription)
- 🛍️ Liste de produits avec filtrage par catégorie et recherche
- 📄 Vue détaillée d’un produit
- ➕ Ajout de produit (admin)
- 🧾 Liste et édition des produits ajoutés (CRUD)
- 🧭 Navigation fluide et expérience utilisateur mobile optimisée
  
## 🔌 Intégration API
- Tous les appels sont faits via fetch vers https://fakestoreapi.com
- Authentification simulée avec /auth/login
- Données mockées pour les produits, utilisateurs, catégories
- 
## 🛠️ Démarrage du Projet

```bash
cd Mobile
npx expo start
```

## 🛠️ Initialisation du Projet

Nous avons démarré avec le template blank (JavaScript) d’Expo, puis installé les dépendances nécessaires à la navigation :

```bash
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated
npx expo install @react-navigation/native-stack
```

# 📝 Page de destination (Page d'accueil mobile de l'application)

## 🧠 Objectif
La page d'accueil, première vue de l'application mobile, met en avant les fonctionnalités principales de la plateforme e-cقommerce

## 🔍 Description :

Cette écran représente la section d'accueil de l'application mobile BuyNext, contenant :

- Un titre et un sous-titre 

- Des icônes flottantes illustrant différentes catégories

- Deux boutons principaux : "Découvrez les offres" et "Se connecter"

Il s'agit d'une écran complète et non d'un composant réutilisable isolé.

#### 🧩 Composants inclus :

- Text (titre, sous-titre)
- TouchableOpacity (boutons d'action)
- Image (icônes décoratives)

```jsx
<View style={styles.container}>
  <Image style={styles.iconTopLeft} />
  <Image style={styles.iconTopRight} />
  <Image style={styles.iconBottomLeft} />
  <Image style={styles.iconBottomRight} />
  
  <Text>BuyNext</Text>
  <Text>Votre prochain achat...</Text>
  
  <TouchableOpacity>
    <Text>Découvrez les offres</Text>
  </TouchableOpacity>

  <TouchableOpacity>
    <Text>Se connecter</Text>
  </TouchableOpacity>
</View>
```
# 📝 Page de Connexion (Login) & Création de Compte (Sign Up)

## 🧠 Objectif
Système d'Authentification — Connexion & Création de Compte : Permettre aux utilisateurs de se connecter et de s'inscrire sur BUYNEXT via l’application mobile, afin d’accéder aux fonctionnalités personnalisées et sécurisées de la plateforme.

## 🔗 Communication avec l’API (Fetching)
Les pages de connexion et d’inscription de l’application mobile communiquent toutes les deux avec l’API FakeStoreAPI en utilisant la méthode fetch.

### Connexion : POST /auth/login

```js
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login success, token:", data.token);
      await SecureStore.setItemAsync('userToken', data.token);
      Alert.alert("Bienvenue !", "Connexion réussie ✅");

    } catch (error) {
      console.error("Erreur de connexion:", error);
      Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

```
- Endpoint : /auth/login
- But : Authentifier un utilisateur et obtenir un token
- Succès : Enregistre le token dans Expo SecureStore
- Échec : Affiche une message d’échec

```js
    {error && (
    <Text style={styles.errorText}>{error}</Text>
    )}
```
### Inscription : POST /users

```js
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
```
- Endpoint : /users
- But : Créer un nouvel utilisateur
- Succès : Affiche une confirmation

## 💾 Stockage du Token: 

Après une connexion réussie :

```js
await SecureStore.setItemAsync('userToken', data.token);
```
- Permet de conserver la session utilisateur
- Peut être utilisé pour sécuriser les pages privées
- Peut être lu plus tard dans des requêtes sécurisées
- 
## ♻️ Composant réutilisable : `FormComponentTemplate`
Ce composant rend un formulaire stylisé configurable via props, ce qui évite la duplication de code et améliore la maintenabilité.

### Props:

**`title`**: titre principal du formulaire

**`description`**: texte secondaire pour informer l'utilisateur

**`fields`**: tableau d’objets pour générer dynamiquement les champs (name, label, type placeholder, required)

**`onSubmit`**: fonction asynchrone à exécuter à la soumission

**`button`**: texte du bouton de validation

### Code source :

```js
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
    marginTop: 220,
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


```

### 💡 Intégration dans Connexion (/login)

Utilise le FormComponentTemplate pour permettre à l’utilisateur de se connecter via l’API 

```js
return (
    <>
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
```
## Champs :
- Nom d'utilisateur
- Mot de passe

### 💡 Intégration dans Inscription (/signup)
Soumet les données utilisateur à l’API FakeStore :

```js
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
```
## Champs :
- Nom d'utilisateur
- Email
- Mot de passe

# 📝 Page Produit (React Native - Écran de tous les produits)
## 🧠 Objectif
Il s'agit de l'écran principal de l'application mobile où l'on affiche tous les produits disponibles. L'utilisateur peut y explorer tous les articles, filtrer par catégorie ou effectuer une recherche par mot-clé.

L'écran `ProductListScreen` intègre deux composants essentiels : SearchNavBar et CategoryList.
## 🧱 Composants inclus

### 🧩 Barre latérale (SearchNavBar)

#### 🔍 Description
Le composant SearchNavBar permet à l'utilisateur de saisir un mot-clé. Lors de la soumission, on redirige l'utilisateur vers ProductListScreen avec le terme de recherche en paramètre 

#### 🔧 Comportement technique :

- Le champ de texte est lié à un state.
  
```js
  const [searchQuery, setSearchQuery] = useState('');
```

- Lors de l'appui sur "Rechercher", la navigation se fait avec :

```js
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigation.navigate('Product', { query: searchQuery });
    }
  };
```
Ce mécanisme permet de filtrer les produits selon le titre saisi par l’utilisateur.

### 🧩 Filtres par catégorie

#### 🔍 Description
Le composant CategoryList affiche une liste horizontale de boutons représentant chaque catégorie.
-  Catégories définies dans categories.js :
  
```js
const categories = [
  "tous les produits",
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
];
```
- Lorsqu'un bouton est cliqué, on met à jour l'état selected Category, ce qui permet de filtrer les produits localement sans appel API.

## ⚙️ Logique de filtrage combinée

L’écran ProductListScreen utilise deux états pour le filtrage :

- searchTerm (transmis via route.params.searchTerm)

- selectedCategory (choisi localement dans CategoryList)

Filtrage effectué via :

```js
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

```
```js
  let result = allProducts;
```
- Commencez avec (allProducts) (le résultat contient désormais la liste complète).
```js
  if (selectedCategory !== 'tous les produits') {
    result = result.filter(item => item.category === selectedCategory);
  }
```
- Si la catégorie sélectionnée n'est PAS « tous les produits » :
  - Filtrer la liste pour ne conserver que les produits correspondant à la catégorie sélectionnée.
  - Si selectedCategory = « électronique », seuls les produits électroniques seront conservés.
  
  ```js
  if (query) {
  result = result.filter(item =>
    item.title.toLowerCase().includes(query)
  );
  }
  ```
  - Si l'utilisateur a saisi quelque chose dans la barre de recherche (requête non vide) :
    - It filters the list again to keep products whose title includes the search term (case-insensitive).
    -Exemple : Si le titre est « Cool Shirt » et que la requête est « shirt », la correspondance sera établie.
  
  ```js
  setFiltered(result);
  ```
  - Enregistrez le résultat filtré dans l'état filtré.

# 📝 Product Detail Page (React Native - `ProductDetailScreen`)

## 🧠 Purpose

Display the complete details of a selected product.
This page provides an individual view of an item, with its image, title, category, description, price, and two action buttons: **Buy Now** or **Add to Cart**.

---

## 🔗 Page Access

This page is accessible from the **product list**. When a user selects a product, its `id` is passed via the navigation:

```js
navigation.navigate('ProductDetail', { productId: item.id });
```

---

## 🧱 Key Behaviors

### 🆔 Retrieving the product ID via navigation

The `productId` is passed via `route.params`:

```js
const { productId } = route.params;
```

### 🌐 API call to retrieve product details

The ID is used to make an HTTP request to `https://fakestoreapi.com/products/{productId}` when mounting the component:

```js
useEffect(() => {
fetch(`https://fakestoreapi.com/products/${productId}`)
.then(res => res.json())
.then(json => setProduct(json))
.catch(err => console.error(err));
}, []);
```

### 💾 Managing local product state

The product is stored locally using `useState`:

```js
const [product, setProduct] = useState(null);
```

### ⏳ Loading Management

As long as the data isn't loaded, an `ActivityIndicator` is displayed:

```js
if (!product) {
return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#000" />;
}
```

