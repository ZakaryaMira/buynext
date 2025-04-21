# 🛒 BUYNEXT Project, Weasydoo Store – Test Technique Frontend

Ce projet est une application e-commerce développée avec **Next.js** et **React Native**, utilisant l’API [FakeStoreAPI](https://fakestoreapi.com/).  
Il a été réalisé dans le cadre d’un **test technique pour l’entreprise Weasydoo**, visant à démontrer mes compétences en développement frontend moderne, notamment :

- L’authentification utilisateur
- Les opérations CRUD
- La recherche et le filtrage
- L’optimisation des performances web & mobile
  

## 🧰 Pile Technologique

🌐 Application Web (Next.js)
- Framework : Next.js
- Bibliothèque : React
- Style : Tailwind CSS
- Tests : Jest, React Testing Library

📱 Application Mobile (React Native)
- Framework : React Native
- Style : Tailwind CSS (via NativeWind)
- Tests : Jest
  
  ## 📄 Pages implémentées

- `Page de destination` – Accueil général de l’application
- `Connexion (login)` – Formulaire de connexion utilisateur
- `Créer un compte (signup)` – Formulaire d’inscription
- `page produit (products)` – Affichage de tous les produits
- `Acheter un produit ()` – Détail d’un produit sélectionné
- `Ajouter un produit (admin)` – Formulaire pour publier un nouveau produit
- `Liste de mes produits (inventory)` – Tous les produits ajoutés par l’utilisateur connecté
- `Modifier un produit ` – Modification des produits existants
  
## 🔐 Processus de Connexion

Les pages (dans **Next.js**) ou les écrans (dans **React Native**) comme :

- **Ajouter un produit** 
- **Liste de mes produits (inventory)** 
- **Modifier un produit** 

sont des **routes protégées** — elles **ne peuvent pas être accessibles sans connexion**.

### ✅ Identifiants de Connexion

Pour se connecter, utilisez les identifiants de test suivants :

```json
{
  "username": "mor_2314",
  "password": "83r5^_"
}
```

## 📝 Documentation
- [`src/app/README.md`](./src/app/README.md) : Documentation détaillée de l'application Next.js
- [`/Mobile/README.md`](./Mobile/README.md) : Documentation détaillée de l'application React Native 

## 🧪 test Documentation
- [`src/app/Test/README.md`](./src/app/Test/README.md) : Documentation détaillée des tests de l'application Next.js *(non terminée)*
- [`/Mobile/Test/README.md`](./Mobile/Test/README.md) : Documentation détaillée des tests de l'application React Native *(non terminée)*

## ⚙️ Setup Instructions
Chaque dossier (`/web` et `/mobile`) contient un guide pour lancer et configurer l'application localement.

