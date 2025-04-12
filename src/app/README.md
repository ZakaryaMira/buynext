# 🌐 BUYNEXT Web – Next.js App

Cette application web a été développée avec **Next.js** dans le cadre du test technique pour Weasydoo.  
Elle consomme les données de [FakeStoreAPI](https://fakestoreapi.com) et propose une interface responsive, moderne et performante.

## 🌐 Fonctionnalités Clés

-  Authentification (login/signup) avec validation de formulaire
-  Liste des produits avec recherche et filtrage par catégorie
-  Détails d’un produit
-  Création de produits (CRUD)
-  Édition et suppression de produits
-  Routes protégées selon le statut de l'utilisateur (admin/user)

## 🔌 Intégration API
- Tous les appels sont faits via fetch vers https://fakestoreapi.com
- Authentification simulée avec /auth/login
- Données mockées pour les produits, utilisateurs, catégories

## 🛠️ Démarrage du Projet

```bash
npm install
npm run dev
```

# 📝 Page de destination (Page d'accueil web de l'application)

## 🧠 Objectif
La page de destination, première vue de l'application, met en avant les fonctionnalités principales du site e-commerce.

## 🧱 Composants inclus

# 🧩 HeroSection

#### 🔍 Description

Section principale de la landing page, composée de :

- **Un titre accrocheur** : `BuyNext`
- **Un slogan** : `Votre prochain achat, à portée de clic`
- **Un bouton d’appel à l’action** : *Découvrez les offres*
- **Des icônes flottantes** représentant les différentes catégories de produits :

  - Jeux vidéo  
  - Vêtements  
  - Téléphones  
  - Outils  

#### ♻️ Composant réutilisable : `FloatingIcon`

Comme les icônes flottantes ont toutes le même design, il est judicieux de créer un composant réutilisable :

```js
import React from 'react'
import Image from 'next/image'

const FloatingIcon = ({ src, alt, positionClasses }) => {
  return (
    <div className={`absolute ${positionClasses}`}>
      <div className="bg-white p-4 rounded-full shadow-xl">
        <Image src={src} alt={alt} width={60} height={60} />
      </div>
    </div>
  )
}

export default FloatingIcon

```
Cette section est centrée et responsive, avec des animations douces pour capter l’attention de l’utilisateur.

#### Intégration dans HeroSection

```js
import React from 'react'
import FloatingIcon from './FloatingIcon'

// SVG imports
import GameIcon from '@/app/SVG/GameIcon.svg'
import PhoneIcon from '@/app/SVG/PhoneIcon.svg'
import ShirtIcon from '@/app/SVG/ShirtIcon.svg'
import ToolIcon from '@/app/SVG/ToolIcon.svg'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
      <FloatingIcon src={GameIcon} alt="Game Icon" positionClasses="top-24 left-6 sm:top-32 sm:left-16 md:top-40 md:left-32 lg:top-48 lg:left-40"/>
      <FloatingIcon src={ShirtIcon} alt="Shirt Icon" positionClasses="top-20 right-6 sm:top-28 sm:right-16 md:top-36 md:right-32 lg:top-44 lg:right-40"/>
      <FloatingIcon src={PhoneIcon} alt="Phone Icon" positionClasses="bottom-20 left-6 sm:bottom-28 sm:left-16 md:bottom-36 md:left-32 lg:bottom-44 lg:left-40"/>
      <FloatingIcon src={ToolIcon} alt="Tool Icon" positionClasses="bottom-20 right-6 sm:bottom-28 sm:right-16 md:bottom-36 md:right-32 lg:bottom-44 lg:right-40"/>
      <h1 className="text-5xl sm:text-6xl md:text-7xl heading-black text-[#212121] drop-shadow-md -rotate-3">BuyNext</h1>
      <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-md sm:max-w-xl heading-extra-bold">Votre prochain achat, à portée de clic</p>
      <Link href="/products" className="mt-10 bg-[#FFC107] hover:bg-[#e2ac00] text-[#212121] heading-extra-bold px-15 py-4 rounded-lg shadow-lg transition duration-300">Découvrez les offres</Link>
    </section>
  )
}
export default HeroSection
```
#### 🧩 Nos Produits (OurProducts)
####  Description

La section Nos Produits met en avant les différentes catégories de produits disponibles sur le site. Elle permet à l’utilisateur de s’orienter rapidement vers les produits de son choix.

### ♻️ Composant réutilisable : `ProductCategoryCard`

Ce composant représente une **carte de catégorie générique**.

#### Props

- **`icon`** : une icône ou image représentant la catégorie  
- **`title`** : le nom de la catégorie
- 

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
 #### 💡 Intégration dans OurProducts

```js
import ProductCategoryCard from "./ProductCategoryCard";
import Gem from "../app/SVG/Gem.svg";
import Male from "../app/SVG/Male.svg";
import Female from "../app/SVG/Female.svg";
import Gamepad from "../app/SVG/Gamepad.svg";
import Image from "next/image";

const OurProducts = () => {
  return (
    <section className="w-full bg-white py-12 flex flex-col items-center gap-2">
      <h2 className="text-4xl font-bold text-[#212121] mb-4 text-5xl">Nos Produits</h2>
      <p className="text-2xl text-gray-600 mb-10">
        Découvrez notre sélection de produits de qualité
      </p>

      <div className="flex items-center justify-center gap-6 flex-wrap mb-30">
        <ProductCategoryCard icon={<Image src={Gamepad} alt="Gamepad" />} title="Électronique" />
        <ProductCategoryCard icon={<Image src={Gem} alt="Gem" />} title="Gemmes" />
        <ProductCategoryCard icon={<Image src={Male} alt="Male" />} title="Mode Hommes" />
        <ProductCategoryCard icon={<Image src={Female} alt="Female" />} title="Mode Femmes" />
      </div>
    </section>
  );
};

export default OurProducts;

```

# 📝 Page de Connexion (Login) & Création de Compte (Sign Up)

## 🧠 Objectif
Système d'Authentification — Connexion & Création de Compte : Permettre aux utilisateurs de se connecter et de s'inscrire sur BUYNEXT pour accéder aux fonctionnalités personnalisées et sécurisées du site.

## 🔗 Communication avec l’API (Fetching)
Les pages de connexion et d'inscription communiquent toutes les deux avec l’API FakeStoreAPI via la méthode fetch.

### Connexion : POST /auth/login

```js
 const handleLogin = async (formData) => {
    const credentials = {
      username: formData.username,
      password: formData.password,
    };
  
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/products');
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };
```
- Endpoint : /auth/login
- But : Authentifier un utilisateur et obtenir un token
- Succès : Enregistre le token dans localStorage
- Échec : Affiche une message d’échec
  
```js
  {error && <p className="text-[#EF233C] heading-black text-base text-center mb-4">{error}</p>}
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
      alert("Compte créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Une erreur s'est produite lors de la création du compte.");
    }
  };

```
- Endpoint : /users
- But : Créer un nouvel utilisateur
- Succès : Affiche une confirmation
  
## 💾 Stockage du Token: 

Après une connexion réussie :

```js
localStorage.setItem('token', data.token);
```
- Permet de conserver la session utilisateur
- Peut être utilisé pour sécuriser les pages privées
- Peut être lu plus tard dans des requêtes sécurisées

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
### 💡 Intégration dans Connexion (/login)

Utilise le FormComponentTemplate pour permettre à l’utilisateur de se connecter via l’API 

```js
return (
    <>
    <FormComponentTemplate title="Connectez-vous à votre compte" description="Entrez vos informations pour accéder à votre compte" button="Ce connecter" onSubmit={handleLogin} 
    fields={[
      {name: "username", label: "nom d'utilisateur",  type: "text", placeholder: "Entrez votre nom d'utilisateur", required: true,},
      {name: "password", label: "Mot de passe" , type: "password", placeholder: "Entrez votre password", required: true,}
    ]}
    />
    {error && <p className="text-[#EF233C] heading-black text-base text-center mb-4">{error}</p>}
    </>
  )
```
## Champs :
- Nom d'utilisateur
- Mot de passe

### 💡 Intégration dans Inscription (/signup)
Soumet les données utilisateur à l’API FakeStore :

```js
return (
    <FormComponentTemplate
      title="Créez votre compte" description="Remplissez les informations ci-dessous pour vous inscrire."button="S'inscrire"onSubmit={handleSignup}
      fields={[
        { name: 'username', label: "Nom d'utilisateur", type: 'text', placeholder: "Entrez votre nom d'utilisateur", required: true,},
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Entrez votre email', required: true,},
        { name: 'password',  label: 'Mot de passe',  type: 'password',  placeholder: 'Entrez votre mot de passe',  required: true,},
      ]}
    />
  );
};
```
## Champs :
- Nom d'utilisateur
- Email
- Mot de passe





# 📝 Page Produit (Page de tous les produits)

## 🧠 Objectif
Il s’agit de la page principale présentant l’ensemble des produits disponibles. Les utilisateurs peuvent y explorer tous les articles proposés. La page "ProductsPage" récupère les données depuis une fausse API et intègre deux composants : OurCategories et AllProducts.

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

## 🧱 Composants inclus

### 🧩 Barre latérale (Catégories)

#### 🔍 Description
Affichée sur la gauche via le composant OurCategories, cette barre permet de filtrer les produits par catégorie.

- « OurCategories.js » — Composant de la barre latérale dédié au filtrage par catégories.
- « Categories.js »  — Contient la liste des catégories disponibles pour filtrer les produits.
  
##### **OurCategories**

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
- Utilise un tableau de catégories prédéfini depuis categories.js.

- Affiche chaque catégorie sous forme de bouton cliquable (fonctionnalité de filtrage à ajouter plus tard).

#### Source des données :

```js
const categories = [
    "tous les produits",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];
  export default categories;
```
### 🧩 Grille de produits :

#### 🔍 Description
Il s’agit de la section principale où tous les produits sont récupérés à partir de l’API et affichés à l’aide du composant :
- « AllProducts.js » — Affichage des fiches produits individuelles

#### **AllProducts**

```js
const AllProducts = ({product}) => {
  return (
    <div className='bg-white p-4 rounded shadow text-center hover:shadow-lg transition-shadow duration-200'>
        <Image src={product.image} alt={product.title} width={200} height={200} className="mx-auto object-contain h-48"/>
        <div>
          <p className="mt-2 font-medium text-[#212121] heading-black mb-10">{product.title}</p>
          <p className="mt-2 font-medium text-[#212121] heading-black mb-10">{product.category}</p>
          <p className="text-sm text-[#212121] heading-extra-bold">{product.price} $</p>
        </div>
    </div>
  )
}
```
- Affiche l’image, le titre et le prix du produit.

- Utilise le composant Image de Next.js pour une gestion optimisée des images.

- Interface élégante avec effet au survol.
  

### 📥 Transmission des données via les props:

Le composant parent ProductsPage récupère les données depuis l’API FakeStore 
(https://fakestoreapi.com/products) à l’aide d’un fetch. Une fois les données chargées, il les transmet au composant enfant AllProducts sous forme de props.

Ensuite, dans AllProducts, ces données sont utilisées pour afficher l’image, le titre et le prix du produit selon la maquette définie.

### ⚙️ Configuration de Next.js pour autoriser les images externes

Par défaut, Next.js bloque les images provenant de domaines externes non autorisés pour des raisons de sécurité. Comme les images des produits de l'API FakeStore proviennent du domaine fakestoreapi.com, il est nécessaire d’ajouter ce domaine explicitement dans la configuration du projet.

#### Étapes à suivre :

- Ouvre le fichier next.config.js à la racine du projet.

- Ajoute ou modifie la configuration comme suit :

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            pathname: '/**',
          },
        ],
      },
      
};
export default nextConfig;
```
🔐 Cette configuration permet à Next.js de charger et d’optimiser les images hébergées sur https://fakestoreapi.com.

- Avant de détailler le filtrage côté page produit, il est important de comprendre comment le composant de navigation (NavComponent) intervient dans ce mécanisme.

### 🧩 NavComponent – Navigation Globale avec Barre de Recherche

#### 🔍 Description

Le NavComponent, visible sur toutes les pages de l'application, inclut les éléments suivants :

- **Logo de l'application**– affiche le nom de l'application :  _BuyNext_
- **Barre de recherche** – rermet aux utilisateurs de rechercher des produits. Elle envoie le terme de recherche comme paramètre ?search=... dans l’URL.
- **Lien "À propos"**- redirige vers la page de présentation
- **Icône utilisateur** – un menu déroulant apparaît au survol, avec les options suivantes :
  - Connexion
  - Créer un compte
  - Ajouter un produit
  - Liste des produits
  - Déconnexion
- **Icône du panier** – redirige vers la page panier, affichant les achats de l'utilisateur.
  
🧠 Remarque : Ce composant fait partie du layout global et est affiché sur toutes les pages.

### 🧩 Pied de page (Footer) – Navigation Globale avec Barre de Recherche
Le Footer, également présent sur toutes les pages, fournit des liens rapides et des informations de contact.

- **Logo & slogan**

- **Navigation** : Accueil, À propos, Contact

- **Compte** : Connexion, Inscription, Panier

- **Contact** : Email et téléphone

Comme le NavComponent, il est intégré dans le layout global via RootLayout.

```jsx
<NavComponent />
{children}
<Footer />
```
Cette structure garantit que la barre de navigation et le pied de page sont présents sur toutes les pages, assurant ainsi une expérience utilisateur cohérente.

## 🧹Mécanisme de Recherche et de Filtrage

### ⌨️ Filtrage via la barre de navigation:

#### 🔍 description:
Dans le composant NavComponent, l'utilisateur peut effectuer une recherche à l’aide de la barre de recherche située en haut de la page. Lorsqu’un terme est saisi puis validé, la page des produits s’ouvre avec une URL contenant le mot-clé de recherche.

#### ⚙️ Fonctionnement technique.

- Voici la fonction qui gère cette recherche :

```js
const handleSearch = (e) => {
  e.preventDefault(); // prevents page reload

  if (searchTerm.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm('');
  }
};
```
- Empêche le formulaire de recharger la page (comportement par défaut des formulaires).
- Vérifie si l'utilisateur a tapé quelque chose.
- Si oui, il redirige l'utilisateur vers une nouvelle URL :
  
Exemple :

```bash
/products?search=chaussures
```
- Le terme de recherche est ajouté à l'URL sous forme de chaîne de requête.
- Ensuite, il efface le champ de saisie.
- Le champ de recherche est lié à un state searchTerm.
- Lors de la soumission du formulaire (fonction handleSearch), on redirige l’utilisateur vers la page /products, en incluant la valeur du champ dans les paramètres de l’URL (search).
- Dans la page ProductsPage, ce paramètre est récupéré via searchParams.search.

```js
const search = searchParams?.search?.toLowerCase() || '';
```

### 🗃️ Filtrage par catégorie:

#### 🔍 description:
Le composant OurCategories affiche une liste de catégories. Lorsqu’un utilisateur clique sur l’un des boutons de catégorie, la page /products est rechargée avec un paramètre category dans l’URL.

```js
/products?category=jewelery
```

#### ⚙️ Fonctionnement technique.
La fonction handleCategoryClick utilise route.push() pour rediriger vers la même page avec le paramètre category.

```js
const handleCategoryClick = (category) => {
  route.push(`/products?category=${category}`);
};
```
- Dans la page ProductsPage, on récupère ce paramètre :

```js
const category = searchParams?.category;
```
Puis, dans la logique de filtrage :

```js
const isCategoryMatch = category
  ? product.category.toLowerCase().includes(category.toLowerCase())
  : true;
```
Ainsi, seuls les produits appartenant à cette catégorie sont conservés pour l’affichage.

### Rendu conditionnel

Si des produits correspondent aux filtres (recherche et/ou catégorie), ils sont affichés via le composant AllProducts.

```js
  const response = await fetch('https://fakestoreapi.com/products');
  let data = await response.json();

  const search = searchParams?.search?.toLowerCase() || '';
  const category = searchParams?.category;

  const filterData = data.filter((product) => {
    const isCategoryMatch = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;
    const isSearchMatch = product.title.toLowerCase().includes(search);
    return isCategoryMatch && isSearchMatch;
  });
```
La logique de filtrage combine à la fois la recherche par mot-clé et le filtre de catégorie. Si des produits correspondent aux deux critères (ou à l’un des deux s’ils sont utilisés seuls), ils sont conservés dans filterData.

Sinon, la liste reste vide. Le tableau data est mis à jour uniquement s’il y a des correspondances :

```js
  if (filterData.length > 0) {
    data = filterData;
  }
```
### Exemple d'utilisation :

- /products → affiche tous les produits.
- products?category=electronics → affiche seulement les produits électroniques.
- /products?search=casque → affiche les produits dont le titre contient "casque".
- /products?search=montre&category=jewelery → filtre combiné : affiche uniquement les montres dans  la catégorie bijouterie.



# 📝 # 📝 Page de détails du produit (`/products/[id]`)

## 🧠 Objectif
Display detailed information for a selected product from the product list.

## 🔍 Description :
Cette page dynamique permet à l’utilisateur de consulter les détails d’un produit en cliquant sur celui-ci depuis la page de la liste des produits.

## 📁 Créer un fichier de route dynamique.
Dans src/app/products/,  j'ai créé un dossier de route dynamique en utilisant des crochets :
Le [id] est un segment dynamique. Lorsqu’on accède à /products/1, Next.js comprend qu’il doit charger ce fichier et traite 1 comme l’identifiant dynamique du produit.

Ce fichier :
- Récupère les paramètres (`params`) depuis l’URL
- Fait une requête vers l’API externe pour obtenir les données du produit
- Transmet ces données au composant `ProductDetails`

## 📥 Récupération des données produit
Le fichier `[id]/page.js` utilise Server-Side Rendering (SSR) pour récupérer les données depuis l’API externe avant de rendre la page.

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

## 📦 Données passées au composant
Ce composant reçoit les données du produit via la prop product et affiche tous les éléments visuels nécessaires : image, titre, prix, description et boutons d’action.

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
## 🧲 Interaction : Composant AllProducts
Avant d’arriver sur la page de détails, l’utilisateur consulte la liste de produits. Chaque carte produit est cliquable et redirige vers la page dynamique grâce au composant AllProducts.

```js
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const AllProducts = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className='bg-white p-4 rounded shadow text-center hover:shadow-lg transition-shadow duration-200'>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="mx-auto object-contain h-48"
        />
        <div>
          <p className="mt-2 font-medium text-[#212121] heading-black mb-10">{product.title}</p>
          <p className="mt-2 font-medium text-[#212121] heading-black mb-10">{product.category}</p>
          <p className="text-sm text-[#212121] heading-extra-bold">{product.price} $</p>
        </div>
      </div>
    </Link>
  )
}

export default AllProducts
```

## 🔄 Flux global

```bash
AllProducts (liste des produits)
    ⬇️ click (Link vers /products/[id])
Dossier [id] → page.js
    ⬇️ récupération des données via fetch
Transmission à ProductDetails
    ⬇️ affichage des détails produit
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

    ```    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updatedProduct = await res.json();
  router.push('/inventory');
};

```
🔍 Mécanisme de recherche des produits
Nous avons mis en place une fonctionnalité de recherche dynamique accessible depuis la barre de navigation présente sur toutes les pages.

⚙️ Fonctionnement :
Saisie de la recherche :
L'utilisateur entre un mot-clé dans la barre de recherche située dans le composant NavComponent.

Soumission :
Lorsqu’il soumet le formulaire (avec "Entrée" ou clic sur l’icône de recherche), l’utilisateur est redirigé vers /products avec le mot-clé passé en tant que paramètre de recherche dans l'URL :

```js
/products?search=mot-clé
```
Filtrage des données :
Sur la page ProductsPage, les produits sont récupérés depuis l’API.
Si un paramètre de recherche est présent :

les produits sont filtrés en local (côté serveur)

le filtrage est insensible à la casse (toLowerCase())

Affichage :
Seuls les produits correspondant au mot-clé sont affichés à l'utilisateur.

🧪 Exemple d'utilisation :
Si l’utilisateur recherche sac, il sera redirigé vers :

```js
/products?search=sac
```
La page affichera alors uniquement les produits dont le titre contient le mot "sac".

🔗 Imports

```js
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import Logo from '../app/SVG/Logo.svg'
import SearchSvg from '../app/SVG/SearchSvg.svg'
import BuySvg from '../app/SVG/BuySvg.svg'
import UserSvg from '../app/SVG/UserSvg.svg'

```
useState, useEffect : Hooks React pour gérer l’état et les effets secondaires.

useRouter : Hook fourni par Next.js pour naviguer entre les pages par code.

Image : Composant Next.js optimisé pour les images.

Link : Composant pour naviguer entre les pages sans recharger la page.

Les SVGs sont utilisés comme icônes (logo, utilisateur, panier, recherche).

🔍 États internes du composant:

```js
const [isDropDown, setIsDropDown] = useState(false); // Affichage du menu utilisateur
const [isClient, setIsClient] = useState(false);     // Pour vérifier si on est bien côté client
const [searchTerm, setSearchTerm] = useState('');    // Texte saisi dans la barre de recherche
```
🎯 useEffect – Exécuté après le premier rendu:
```js
useEffect(() => {
  setIsClient(true);
}, []);

```
Ce useEffect s’exécute une seule fois, au montage du composant, et sert à activer certains éléments uniquement côté client, comme le menu déroulant.

🔎 Fonction de recherche

```jsx
const handleSearch = (e) => {
  e.preventDefault(); // Empêche le rechargement du formulaire
  if (searchTerm.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm('');
  }
};
```
Lors de la soumission du formulaire :

Vérifie que le champ n’est pas vide.

Encode le texte saisi dans l’URL.

Redirige vers /products?search=motcle.

Réinitialise le champ de recherche après soumission.

```js
<form onSubmit={handleSearch}>
  <input type="text" value={searchTerm} onChange={...} />
  <button type="submit"><Image src={SearchSvg} /></button>
</form>

```
Le champ est lié à searchTerm pour suivre la saisie de l’utilisateur.

Le bouton de soumission contient une icône de recherche

🛍️ ProductsPage.jsx – Affichage des Produits avec Filtrage

🔄 Récupération des données + filtrage

```js
const response = await fetch('https://fakestoreapi.com/products');
let data = await response.json();
```
Cette partie récupère tous les produits depuis l’API externe.

```js
const search = searchParams?.search?.toLowerCase() || '';
const filterData = data.filter((product) =>
  product.title.toLowerCase().includes(search)
);
```
On récupère le mot-clé dans les paramètres de l’URL (searchParams).

On filtre les produits dont le titre contient ce mot-clé (sans tenir compte des majuscules/minuscules).

```js
if (filterData.length > 0) {
  data = filterData;
}
```
Si des produits correspondent au filtre, on remplace data par les résultats filtrés.

🎨 Affichage des produits
```jsx
<h1>Nos Produits</h1>
<p>Découvrez notre sélection...</p>

<div className="flex">
  <div><OurCategories /></div>  // Catégories à gauche
  <main>
    {data.map(product => (
      <AllProducts key={product.id} product={product} />
    ))}
  </main>
</div>

```
Affiche les produits filtrés sous forme de grille.

AllProducts est un composant qui affiche un produit.

OurCategories permet probablement de filtrer par catégorie (non encore lié à la recherche).

🔎 Mettre en œuvre le filtrage par catégories
Mettez à jour le composant « NosCatégories » afin que, lorsqu'un utilisateur clique sur une catégorie, le paramètre de requête dans l'URL soit mis à jour. Cela permettra à la page Produits de recevoir la catégorie sélectionnée et de filtrer les produits en conséquence.

```js
  const router = useRouter(); // Permettez au routeur de naviguer par programmation.
  
  const handleCategoryClick = (category) => {
    router.push(`/products?category=${category}`); // Rediriger vers la page des produits contenant la catégorie sélectionnée
  };

```
Changements clés pour le filtrage par catégorie et recherche
Ajout du filtrage par catégorie :

Nous avons ajouté la possibilité de filtrer par catégorie en plus de la recherche par titre.

La catégorie est récupérée via searchParams?.category.
```js
  // Get category and search query from the searchParams
  const category = searchParams?.category;
```
Modification de la logique de filtrage :

Nous avons combiné deux conditions de filtrage : par titre et par catégorie.

Si une catégorie est sélectionnée, nous filtrons les produits en fonction de cette catégorie et de leur titre. Si aucune catégorie n'est sélectionnée, tous les produits sont inclus.
```js
  // Filter products based on category and search query
  const filterData = data.filter((product) => {
    const isCategoryMatch = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;
    const isSearchMatch = product.title.toLowerCase().includes(search);
    return isCategoryMatch && isSearchMatch;
  });
```
Filtrage combiné :
```js
return isCategoryMatch && isSearchMatch;
```

 Les utilisateurs peuvent maintenant affiner leur recherche en fonction de la catégorie et du titre.