# BUYNEXT Project
# 🛒 Weasydoo Store – Test Technique Frontend

Ce projet est une application e-commerce développée avec **Next.js** et l’API [FakeStoreAPI](https://fakestoreapi.com/), dans le cadre d’un test technique pour l’entreprise **Weasydoo**. L’objectif est de démontrer mes compétences en développement web moderne, incluant l’authentification, les opérations CRUD, et l’optimisation des performances.

## 📄 Pages implémentées

- `Page de destination` – Accueil général de l’application
- `Connexion` – Formulaire de connexion utilisateur
- `Créer un compte` – Formulaire d’inscription
- `Card page` – Affichage de tous les produits
- `Acheter un produit` – Détail d’un produit sélectionné
- `Ajouter un produit` – Formulaire pour publier un nouveau produit
- `Liste de mes produits` – Tous les produits ajoutés par l’utilisateur connecté
- `Modifier un produit` – Modification des produits existants

## 🏠 Page de destination (Landing Page)
La page de destination, première vue de l'application, met en avant les fonctionnalités principales du site e-commerce.

🔧 Composants inclus

✅ NavComponent

La barre de navigation située en haut de la page contient :

- **Logo de l'application** – _BuyNext_
- **Barre de recherche** – pour rechercher un produit
- **Lien "À propos"**
- **Icône utilisateur** – au survol, un menu déroulant s'affiche avec :
  - Connexion
  - Créer un compte
  - Ajouter un produit
  - Liste des produits
  - Déconnexion
- **Icône du panier** – représentant les achats

✅ HeroSection

Section principale de la landing page, composée de :

**Un titre accrocheur** : "BuyNext"

**Un slogan** : "Votre prochain achat, à portée de clic"

**Un bouton d’appel à l’action** : Découvrez les offres

**Icônes flottantes représentant les différentes catégories de produits** :

  -Jeux vidéo

  -Vêtements

  -Téléphones

  -Outils

Cette section est centrée et responsive, avec des animations douces pour capter l’attention de l’utilisateur.

🛒 Section : Nos Produits
La section Nos Produits met en avant les différentes catégories de produits disponibles sur le site. Elle vise à guider rapidement l’utilisateur vers ce qui l’intéresse.

```jsx
<ProductCategoryCard icon={<Image src={Gamepad} alt="Gamepad" />} title="Électronique" />
<ProductCategoryCard icon={<Image src={Gem} alt="Gem" />} title="Gemmes" />
<ProductCategoryCard icon={<Image src={Male} alt="Male" />} title="Mode Hommes" />
<ProductCategoryCard icon={<Image src={Female} alt="Female" />} title="Mode Femmes" />
```

Chaque carte affiche :

Une icône représentant la catégorie

**Un titre descriptif**

**Un style responsive avec une légère animation au survol**

📦 Réutilisabilité : ProductCategoryCard
Ce composant est une carte générique de catégorie de produit. Il prend deux props :

**icon** : une icône SVG ou une image

**title** : le nom de la catégorie

```jsx
const ProductCategoryCard = ({ icon, title }) => {
  return (
    <div className='bg-[F2F2F2] p-6 rounded-xl shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 w-[180px] h-[220px] gap-2'>
      <div className='text-4x mb-4'>{icon}</div>
      <p className='text-center heading-extra-bold'>{title}</p>
    </div>
  )
}
```

✨ Pied de page (Footer)
Le footer du site contient des informations importantes et des liens rapides pour améliorer l’expérience utilisateur. Il est visible sur toutes les pages.

📌 Sections incluses :

**Logo & slogan**

**Navigation** : Accueil, À propos, Contact

**Compte** : Connexion, Inscription, Panier

**Contact** : Email et téléphone

✅ Inclus dans le layout global via RootLayout

```jsx
<NavComponent />
{children}
<Footer />
```

📄 Formulaires d’authentification – BUYNEXT
Dans ce projet, les pages de connexion et création de compte partagent une structure commune basée sur un composant réutilisable appelé :

✅ FormComponentTemplate
Ce composant rend un formulaire stylisé configurable via props, ce qui évite la duplication de code et améliore la maintenabilité.

📦 FormComponentTemplate.jsx
🔧 Props attendues :
title: titre principal du formulaire

**description**: texte secondaire pour informer l'utilisateur

**fields**: tableau d’objets pour générer dynamiquement les champs (name, label, type, placeholder, required)

**onSubmit**: fonction asynchrone à exécuter à la soumission

**button**: texte du bouton de validation

💡 Exemple d’utilisation :

```jsx
<FormComponentTemplate
  title="Créez votre compte"
  description="Remplissez les informations ci-dessous pour vous inscrire."
  button="S'inscrire"
  onSubmit={handleSignup}
  fields={[
    { name: 'username', label: 'Nom d’utilisateur', type: 'text', placeholder: 'Entrez votre nom d’utilisateur', required: true },
    ...
  ]}
/>
```
💻 Code source :
```jsx
"use client";
import { useState } from "react";

export default function FormComponentTemplate({ title, description, fields, onSubmit, button }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      setError("Une erreur s'est produite lors de la soumission.");
      console.error("Form submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow mt-40 mb-40">
      <h2 className="text-4xl font-bold heading-black text-center text-[#212121] mb-8">{title}</h2>
      <p className="text-base text-center heading-extra-bold text-[#212121] mb-6">{description}</p>

      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block mb-1 text-sm font-semibold text-[#212121]">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full border border-gray-300 p-2 rounded font-semibold"
            onChange={handleChange}
          />
        </div>
      ))}

      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

      <button type="submit" className="w-full bg-[#FFC107] hover:bg-yellow-500 text-[#212121] py-2 rounded font-bold transition duration-300">
        {button}
      </button>
    </form>
  );
}
```

🔐 Page : Connexion (/login)
Utilise le FormComponentTemplate pour permettre à l’utilisateur de se connecter via l’API 
```jsx
const handleLogin = async (formData) => {
  const credentials = {
    username: formData.username,
    password: formData.password,
  };

  const response = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    alert("Connexion réussie !");
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect.");
  }
};

🧪 Champs :
Nom d'utilisateur
Mot de passe


🆕 Page : Inscription (/signup)
Soumet les données utilisateur à l’API FakeStore :

const handleSignup = async (formData) => {
  const user = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };

  const response = await fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  alert("Compte créé avec succès !");
};
```jsx
🧾 Champs :
Nom d'utilisateur
Email
Mot de passe

- `products page` – Affichage de tous les produits
