# BUYNEXT Project
# 🛒 Weasydoo Store – Test Technique Frontend

Ce projet est une application e-commerce développée avec **Next.js** et l’API [FakeStoreAPI](https://fakestoreapi.com/), dans le cadre d’un test technique pour l’entreprise **Weasydoo**. L’objectif est de démontrer mes compétences en développement web moderne, incluant l’authentification, les opérations CRUD, et l’optimisation des performances.

## 📄 Pages implémentées

- `Page de destination` – Accueil général de l’application
- `Connexion` – Formulaire de connexion utilisateur
- `Créer un compte` – Formulaire d’inscription
- `page produit` – Affichage de tous les produits
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

```js
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

```js
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
## 🔐 Page de Connexion (Login) & 🔑 Création de Compte (Sign Up)

📄 Formulaires d’authentification – BUYNEXT
Dans ce projet, les pages de connexion et création de compte partagent une structure commune basée sur un composant réutilisable appelé :

✅ FormComponentTemplate
Ce composant rend un formulaire stylisé configurable via props, ce qui évite la duplication de code et améliore la maintenabilité.

📦 FormComponentTemplate.jsx
🔧 Props attendues :
**title**: titre principal du formulaire

**description**: texte secondaire pour informer l'utilisateur

**fields**: tableau d’objets pour générer dynamiquement les champs (name, label, type placeholder, required)

**onSubmit**: fonction asynchrone à exécuter à la soumission

**button**: texte du bouton de validation

💡 Exemple d’utilisation :

```js
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
```js
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
```js
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
```
🧪 Champs :
Nom d'utilisateur
Mot de passe

🆕 Page : Inscription (/signup)
Soumet les données utilisateur à l’API FakeStore :

```js
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
```
🧾 Champs :
Nom d'utilisateur
Email
Mot de passe

##  🛍️ Page Produit

Il s'agit de la page principale de la liste des produits, où les utilisateurs peuvent explorer tous les produits disponibles.

### Structure :
- **Barre latérale (Catégories)** : Affichée à gauche grâce au composant « OurCategories ». Permet le filtrage par catégorie.
- **Grille de produits** : Extraite de « https://fakestoreapi.com/products » et affichée via le composant « AllProducts » dans une grille à 3 colonnes.

### Composants :
- « AllProducts.js » — Affichage des fiches produits individuelles
- « OurCategories.js » — Barre latérale pour les filtres de catégories
- « Categories.js »  — Définit la liste des catégories disponibles pour le filtrage des produits.


La page des produits (ProductsPage) récupère les données depuis une fausse API et contient deux composants : OurCategories et AllProducts.
```js
export default async function ProductsPage() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  return (
    ...
    <OurCategories />
    <AllProducts product={product} />
    ...
  );
}

```
**OurCategories**
Fichier : OurCategories.js
But : Affiche une liste de catégories statiques dans une barre latérale.
``` js
const OurCategories = () => {
  return (
    <aside>
      <h2>Nos Catégories</h2>
      <div>
        {categories.map((category, index) => (
          <button key={index}>{category}</button>
        ))}
      </div>
    </aside>
  );
};

```
**Fonctionnalités :**

Utilise un tableau de catégories prédéfini depuis categories.js.

Affiche chaque catégorie sous forme de bouton cliquable (fonctionnalité de filtrage à ajouter plus tard).

Source des données :

```js
const categories = [
  "tous les produits",
  "Électronique",
  "Bijoux",
  "Mode Homme",
  ...
];
```
**AllProducts**
Fichier : AllProducts.jsx
But : Affiche une carte individuelle pour chaque produit.

```js
const AllProducts = ({ product }) => {
  return (
    <div>
      <Image src={product.image} alt={product.title} />
      <p>{product.title}</p>
      <p>{product.price} da</p>
    </div>
  );
};
```
**Fonctionnalités :**

Affiche l’image, le titre et le prix du produit.

Utilise le composant Image de Next.js pour une gestion optimisée des images.

Interface élégante avec effet au survol.

📥 Transmission des données via les props:

Le composant parent ProductsPage récupère les données depuis l’API FakeStore 
(https://fakestoreapi.com/products) à l’aide d’un fetch. Une fois les données chargées, il les transmet au composant enfant AllProducts sous forme de props.

Ensuite, dans AllProducts, ces données sont utilisées pour afficher l’image, le titre et le prix du produit selon la maquette définie.

⚙️ Configuration de Next.js pour autoriser les images externes

Par défaut, Next.js bloque les images provenant de domaines externes non autorisés pour des raisons de sécurité. Comme les images des produits de l'API FakeStore proviennent du domaine fakestoreapi.com, il est nécessaire d’ajouter ce domaine explicitement dans la configuration du projet.

✅ Étapes à suivre :
Ouvre le fichier next.config.js à la racine du projet.

Ajoute ou modifie la configuration comme suit :

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com'], // Autorise les images provenant de ce domaine
  },
};

export default nextConfig;

```
🔐 Cette configuration permet à Next.js de charger et d’optimiser les images hébergées sur https://fakestoreapi.com.

## 🔍 voir la page de détails du produit ()
Détail du produit est une page dynamique qui permet à l’utilisateur de consulter les détails d’un produit à partir de la page des produits.

📁 Créer un fichier de route dynamique.
Dans src/app/products/,  j'ai créé un dossier de route dynamique en utilisant des crochets :
Le [id] est un segment dynamique. Quand tu accèdes à /products/1, Next.js comprend qu’il faut charger ce fichier et traite 1 comme l’identifiant du produit.

📄 Construire la page dynamique `page.js`

Ce fichier :

- Récupère les paramètres (`params`) depuis l’URL
- Fait une requête vers l’API externe pour obtenir les données du produit
- Transmet ces données au composant `ProductDetails`

```js
import React from 'react'
import ProductDetails from './ProductDetails'

const page = async ({ params }) => {
  const { id } = await params; 
  const result = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await result.json();

  return (
    <section className='flex flex-col justify-center items-center bg-[#FAFAFA]'>
      <ProductDetails product={product} />
    </section>
  );
};

export default page;

```
Cette page utilise le rendu côté serveur (Server-Side Rendering) en déclarant la fonction page comme étant async. Cela permet de récupérer les données du produit à partir de l’API externe FakeStoreAPI avant que la page ne soit rendue côté client.

Le fichier est nommé [id]/page.js dans le dossier app/products, ce qui indique à Next.js qu’il s’agit d’une route dynamique. Le paramètre id est automatiquement extrait de l’URL et passé au composant via l'objet params.

📦 Données passées au composant
Les données du produit sont ensuite passées au composant ProductDetails via la prop product. Ce composant est responsable de l'affichage des détails visuels du produit (image, titre, description, prix, etc.).

```js
import React from 'react'
import Image from 'next/image'
const ProductDetails = ({product}) => {
  return (
        <section className='grid grid-cols-2 bg-[#FFFFFF] w-250 h-230 rounded-2xl shadow mt-40 mb-40 p-5'>
            <div className='border-1 border-black flex justify-center items-center h-200 w-100 rounded-xl'>
                <Image src={product.image} alt={product.title} width={300} height={300} />
            </div>
            <div>
                <h1 className='text-3xl text-[#212121] heading-black mb-8 mt-5'>{product.title}</h1>
                <h2 className='text-2xl text-[#212121] heading-extra-bold mb-16'>{product.price} $</h2>
                <p className='text-sm text-[#212121] heading-extra-bold mb-24'>{product.description}</p>
                <div className='flex flex-col gap-4'>
                    <button className='text-base heading-black bg-[#212121] text-[#FAFAFA] py-5 rounded'>Acheter maintenant</button>
                    <button className='text-base heading-black bg-[#FAFAFA] text-[#212121] py-5 rounded border-4 border-black'>Ajouter au panier</button>
                </div>
            </div>
        </section>
  )
}

export default ProductDetails
```

## 🧾 page admin 

🧠 Objectif:
Elle permet aux administrateurs d’ajouter de nouveaux produits au site via l’API Fake Store. Elle dispose d’une interface conviviale avec un système de téléchargement d’image par glisser-déposer et des composants réutilisables pour une architecture de code propre.

📄 AddProductPage (Page principale)

```js
"use client";
import FormProducts from "./FormProducts";
import Image from "next/image";
import Add from '../SVG/Add.svg'
import ProductionHeading from "./ProductionHeading";

// Page d’ajout de produit pour l’administrateur
export default function AddProductPage() {

  // Gère la soumission du formulaire vers l’API Fake Store
  const handleSubmit = async (formData) => {
    try {
      const product = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        category: formData.category,
      };

      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      console.log("Produit ajouté:", data);
      alert("Produit ajouté avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'ajout du produit:", err);
      alert("Erreur lors de l'ajout !");
    }
  };

  // Affiche l'en-tête et le formulaire
  return (
    <section className="min-h-screen bg-[#FAFAFA] p-6">
        <ProductionHeading src={Add} width={50} height={50} title={"Ajouter un produit"}/>
        <FormProducts onSubmit={handleSubmit} />
    </section>
  );
}


```
🧩 ProductionHeading
Composant réutilisable pour afficher un en-tête de page avec une icône.

```js
const ProductionHeading = ({src, width , height, title}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-16 ">
        <Image src={src} width={width} height={height} />
        <h1 className="text-5xl text-[#212121] heading-black font-extrabold ">{title}</h1>
    </div>
  );
};
```
📦 FormProducts (Composant de formulaire)
Gère tous les champs nécessaires pour créer un produit. Les données sont soumises au composant parent via la prop onSubmit.

```js
export default function ProductForm({onSubmit}) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    images: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Envoie les données au parent
  };

  // Options de catégorie pour le menu déroulant
  const categoryOptions = [
    { value: 'electronics', label: 'Électronique' },
    { value: 'fashion', label: 'Mode' },
    { value: 'books', label: 'Livres' },
    { value: 'sports', label: 'Sport' },
  ];

  return (
    <form onSubmit={handleSubmit} className="...">
      {/* Partie gauche : informations de base */}
      <ProductInpiutFiled ... />
      <ProductSelectInput ... />
      <ProductTextArea ... />

      {/* Partie droite : téléversement d’image */}
      <ProductImageUploader ... />

      {/* Bouton de soumission */}
    </form>
  );
}
```
🖼 ProductImageUploader
Entrée d’image par glisser-déposer avec une option de sélection classique.

```js
const ProductImageUploader = ({ images, onUpload }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onUpload(files);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="space-y-4">
      <div onDrop={handleDrop} onDragOver={handleDragOver} className="...">
        {/* Éléments d’interface */}
      </div>

      {/* Affichage des fichiers uploadés */}
      {images.length > 0 && (
        <ul>
          {images.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```
🧾 ProductSelectInput
Composant réutilisable pour sélectionner une catégorie.

```jsx
const ProductSelectInput = ({ label, name, value, onChange, options = [], required = false }) => (
  <div>
    <label className="...">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select ...>
      <option value="">-- Sélectionnez une option --</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
```
📝 ProductTextArea
Composant réutilisable pour les textes longs.

```js
const ProductTextArea = ({ label, rows, name, value, onChange, required = false }) => (
  <div>
    <label className="...">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea ... />
  </div>
);

```

## 📦 la Page d'Inventaire (Inventory)

La page d'inventaire permet aux utilisateurs de voir, rechercher, modifier et supprimer des produits. Les données sont récupérées depuis l'API Fake Store et affichées dans une grille responsive.

🧠 Objectif:
La page d'inventaire permet aux utilisateurs de voir, rechercher, modifier et supprimer des produits. Les données sont récupérées depuis l'API Fake Store et affichées dans une grille responsive.

📄 InventoryPage (Page principale):

Dans la page principale InventoryPage (page.jsx), on utilise useEffect pour récupérer les produits :

```js
useEffect(() => {
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => setProducts(data));
}, []);

```
Les produits récupérés sont ensuite transmis au composant enfant InventoryProduct.

🧹 2. Supprimer un Produit

Un bouton de suppression dans le composant InventoryProduct appelle cette fonction :

```js
const handleDelete = async (productId) => {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: 'DELETE',
  });
  const deletedProduct = await res.json();
  setProducts(prev => prev.filter(product => product.id !== productId));
};

```
🔁 Cela supprime le produit à la fois du serveur et de l’interface.

Il supprime un produit de la liste des produits de l'état, en particulier le produit avec le productId donné.

```js
setProducts(prev => prev.filter(product => product.id !== productId));
```
✏️ 3. Modifier un Produit

Lors d’un clic sur le bouton "Modifier" :

```js
const handleEditClick = () => {
  router.push(`/inventory/${product.id}`);
};
```
Cela redirige vers une route dynamique /inventory/[id] qui charge le produit par son ID pour le modifier.

🧩 Détail des Composants

🖼️ InventoryHeading
Affiche le titre et le sous-titre de la page avec une icône SVG

🔍 InventorySearch
Contient :

Un champ de recherche

Un menu déroulant de catégorie

Un bouton Ajouter un produit (à implémenter)

📦 InventoryProduct

Affiche un produit avec :

Image, titre, catégorie et prix

Bouton Modifier → redirige vers la page de modification

Bouton Supprimer → supprime le produit

```js
```
✏️ Page de Modification de Produit

Située dans /inventory/[id]/page.jsx

🚚 Récupérer un Produit Spécifique

```js
useEffect(() => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => {
      setProduct(data);
      setFormData({
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        images: data.images || [],
      });
    });
}, [id]);
```
🧾 Composant InventoryForm
Formulaire réutilisable composé de :

ProductInputField

ProductTextArea

ProductSelectInput

ProductImageUploader

```js
const handleSubmit = async (formData) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updatedProduct = await res.json();
  router.push('/inventory');
};

```