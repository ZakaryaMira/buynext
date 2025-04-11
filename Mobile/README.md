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

#### 🔍 Description :

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