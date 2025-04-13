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
La page d'accueil, première vue de l'application mobile, met en avant les fonctionnalités principales de la plateforme e-commerce

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

# 📝 Documentation de la Page Admin – (AddProductScreen)

## 🧠 Objectif:
Elle permet aux administrateurs d’ajouter de nouveaux produits au site. Elle dispose d’une interface conviviale avec un système de téléchargement d’image par glisser-déposer et des composants réutilisables.

Pour permettre une navigation fluide entre la liste des produits, les détails, l'ajout de produit et les écrans d'authentification, nous avons mis en place une navigation par onglets (Bottom Tab Navigator) pour les pages principales, ainsi qu’un Stack Navigator pour la navigation globale (comme les détails produit ou les pages de connexion/inscription).

### Étapes Suivies :
#### 1. Mise en place d’un Bottom Tab Navigator
Ce composant permet d’accéder facilement aux principales sections de l’application :
- Liste des produits
- Ajouter un produit
- Connexion
  
```js
<Tab.Screen name="Liste des produits" component={ProductListScreen} />
<Tab.Screen name="Ajouter un produit" component={AddProductScreen} />
<Tab.Screen name="Connexion" component={LoginScreen} />
```
#### 2. Création du composant MainScreen
Ce composant est l’interface principale qui combine :
- Une barre de recherche (SearchNavBar) en haut
- Le BottomTabNavigator en dessous

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchNavBar from './NavigationBar';
import BottomTabNavigator from '../components/BottomTabNavigator';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <SearchNavBar />
      <View style={styles.tabsContainer}>
        <BottomTabNavigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30, // Espace pour le SafeArea
  },
  tabsContainer: {
    flex: 1,
  },
});

 ```
#### 3. Configuration de la Navigation

##### Mise en place du Stack Navigator dans App.js

L'application est encapsulée avec :
- `PaperProvider` - Pour le thème d'interface
- `SafeAreaProvider` - Pour un affichage adapté à tous les appareils
- `NavigationContainer` - Conteneur principal pour React Navigation

##### Fonctionnalités du Stack Navigator
- Gère l'interface principale (incluant les vues à onglets)
- Prend en charge la navigation vers les écrans de Détail du Produit
- Gère la navigation vers les écrans de Connexion/Inscription lorsque nécessaire

```js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import MainScreen from './components/MainScreen';
import ProductDetailScreen from './screens/Product/ProductDetailScreen';
import LoginScreen from './screens/login/LoginScreen';
import SignupScreen from './screens/Signup/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
```
## 🧠 Fonctionnalités

- 📋 Formulaire avec champs :
  - Titre du produit
  - Prix (numérique)
  - Catégorie (via un menu déroulant)
  - Description (multiligne)
  - Image (depuis la galerie)
-  Sélection d’image via Expo Image Picker
-  Validation de base des champs
-  Envoi d’une requête `POST` vers FakeStore API
-  Alertes de succès ou d’échec
-  
---

## 📦 Dépendances

- **Composants React Native de base**
- [`expo-image-picker`](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [`@react-native-picker/picker`](https://github.com/react-native-picker/picker)

---

## 🔐 Sécurité et Accès Restreint à la Page d’Ajout de Produit:

### 🧠 Pourquoi ?
Tous les utilisateurs ne doivent pas avoir la possibilité d’ajouter des produits au site. Seuls les utilisateurs authentifiés (idéalement les administrateurs) peuvent accéder à l'écran "Ajouter un produit". L'accès est contrôlé à l'aide d'un système d'authentification basé sur un token sécurisé

### 🔍 Vérification d'authentification avec SecureStore
Nous avons créé un hook personnalisé useAuth qui vérifie la présence d’un token d’utilisateur stocké dans SecureStore. Ce token est enregistré lors de la connexion et supprimé à la déconnexion. S’il n’existe pas, cela signifie que l’utilisateur n’est pas connecté

```js
// hooks/useAuth.js
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  return isAuthenticated;
}
```
### 🧭 Intégration dans la Navigation (BottomTabNavigator):
Dans le BottomTabNavigator, on vérifie également l'état d'authentification.
Cela nous permet d’afficher dynamiquement :
- Le bouton "Connexion" pour les utilisateurs non connectés
- Le bouton "Déconnexion" pour les utilisateurs authentifiés (qui supprime le token)

```js
{!isAuthenticated ? (
  <Tab.Screen name="Connexion" component={LoginScreen} />
) : (
  <Tab.Screen
    name="Déconnexion"
    component={() => <LoginScreen />}
    listeners={{
      tabPress: (e) => {
        e.preventDefault();
        handleLogout(); // Suppression du token
      },
    }}
  />
)}
```
### Protection de la Page AddProductScreen:
Le composant AddProductScreen utilise le hook useAuth pour vérifier si l'utilisateur est authentifié avant d’afficher le formulaire.
S’il n’est pas connecté, un message d’erreur personnalisé s’affiche :

```js
if (!isAuthenticated) {
  return (
    <View style={styles.centered}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF233C' }}>
        ⛔ Accèss refusé. Veuillez vous connecter pour ajouter un produit.
      </Text>
    </View>
  );
}
```
### 💡 UX Améliorée
Le système est pensé pour offrir une expérience fluide :

- Les utilisateurs voient clairement s’ils sont connectés ou non
- La navigation change dynamiquement
- Les droits sont respectés sans forcer une redirection

# 📦 Gérer l’Inventaire – Documentation

## 🧭 Vue d’ensemble

La **page d’inventaire** est un écran React Native permettant à l’utilisateur authentifié de :

- 📥 Récupérer la liste de tous les produits depuis l’API [Fake Store](https://fakestoreapi.com/)
- 🗑️ Supprimer un produit
- ✏️ Modifier un produit (via une redirection vers `EditProductScreen`)

> ✅ L’accès à cet écran est **protégé** grâce au hook `useAuth` qui vérifie la présence du token dans `SecureStore`.

---

## 🔐 Authentification

L’accès à la page est restreint à l’aide d’un hook personnalisé `useAuth`.

```js
// hooks/useAuth.js
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  return isAuthenticated;
}
```

Dans `InventoryScreen`, ce hook est utilisé pour afficher un écran de chargement ou interdire l’accès si l’utilisateur n’est pas authentifié :

```js
const isAuthenticated = useAuth();

if (isAuthenticated === null) return <Text>Chargement...</Text>;
if (!isAuthenticated) return <Text>Non autorisé</Text>;
```

---

## 📥 Récupération des produits

Les produits sont récupérés à chaque fois que l’écran devient actif (grâce à `navigation.addListener('focus', ...)`) :

```js
const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  setProducts(data);
};

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', fetchProducts);
  return unsubscribe;
}, [navigation]);
```

---

## 🗑️ Suppression d’un produit

Chaque carte produit contient un bouton **"Supprimer"**. Lorsqu’il est cliqué :

1. Une boîte de confirmation s’affiche.
2. Si l’utilisateur confirme, une requête `DELETE` est envoyée.

```js
const deleteProduct = async (id) => {
  await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
  setProducts((prev) => prev.filter((p) => p.id !== id));
  Alert.alert('Supprimé', 'Produit supprimé avec succès');
};
```

---

## ✏️ Modification d’un produit

Le bouton **"Modifier"** redirige vers l’écran `EditProductScreen` en passant l’ID du produit :

```js
onPress={() => navigation.navigate('EditProduct', { id: item.id })}
```

L’écran d’édition se charge de :
- récupérer les détails du produit
- préremplir le formulaire
- envoyer la requête `PUT` pour mettre à jour le produit

---

## 🧱 Composants UI

Chaque produit est affiché dans une carte :

```js
<View style={styles.card}>
  <Text style={styles.title}>{item.title}</Text>
  <Text>Prix: ${item.price}</Text>
  ...
</View>
```

Avec deux boutons : **Modifier** et **Supprimer**, disposés côte à côte via `flexDirection: 'row'`.

---

## ✅ Fonctionnalités couvertes

- ✅ Authentification via SecureStore
- ✅ Affichage des produits en liste
- ✅ Suppression avec confirmation
- ✅ Redirection vers formulaire de modification
- ✅ Rafraîchissement automatique à l’ouverture de la page

---