# 🧪 Documentation des Tests – Application Web (Next.js)
Cette documentation a pour but de présenter simplement la manière dont les tests ont été mis en place dans la version Next.js de l’application BUYNEXT.
Ce projet a été réalisé dans le cadre d’un test technique pour Weasydoo, et cette partie vise à montrer comment j’ai essayé de garantir un minimum de fiabilité et de cohérence dans le fonctionnement des principales fonctionnalités.
 
## 🧰 Outils utilisés
- Jest – Pour lancer les tests unitaires et simuler le comportement des fonctions.
-React Testing Library – Pour tester les composants de manière plus proche de l'expérience réelle de l'utilisateur.

Mon but ici était de vérifier que certaines pages importantes (comme la connexion, l’ajout de produit, etc.) fonctionnent correctement, même après modifications.

## ⚙️ Configuration de Jest
Pour pouvoir écrire et exécuter des tests dans un projet Next.js, j’ai commencé par installer les dépendances nécessaires, puis j’ai configuré Jest avec les outils adaptés à l’environnement Next.js.

### 📦 Dépendances installées

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest jest-environment-jsdom
```
J’ai aussi utilisé next/jest, qui fournit une configuration optimisée pour Jest dans un projet Next.js :

```bash
npm install --save-dev jest next/jest
```

## 🛠️ Fichier de configuration : jest.config.js

```js 
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './', // Indique le répertoire racine du projet Next.js
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Fichier pour configurer l’environnement avant les tests
  testEnvironment: 'jsdom', // Simule un environnement navigateur (DOM) pour tester les composants React
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Permet d’utiliser les alias de chemin comme @/components
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }], // Utilise Babel pour compiler les fichiers avant les tests
  },
}

module.exports = createJestConfig(customJestConfig)

```

## 📝 En résumé:

- J’utilise next/jest pour générer une configuration adaptée à Next.js.

- Le test se fait dans un environnement jsdom, qui simule le navigateur.

- J’ai configuré un alias @/ pour rendre le code plus lisible dans les imports.

- jest.setup.js sert à préparer l’environnement de test, par exemple pour ajouter des extensions comme @testing-library/jest-dom.
  

# 📝 Documentation des Tests de la Page de destination

## 🐞 Test de HeroSection.test.js:

### 📌 Objectif:
S'assurer que :
- Le titre principal "BuyNext" est bien affiché.
- Le slogan est présent.
- Le bouton "Découvrez les offres" est visible et contient le bon lien (`/products`).
- Les icônes flottantes sont bien rendues avec les bons attributs alt.

```js
expect(screen.getByText(/BuyNext/i)).toBeInTheDocument();
expect(screen.getByText(/votre prochain achat/i)).toBeInTheDocument();
expect(screen.getByRole('link', { name: /découvrez les offres/i })).toHaveAttribute('href', '/products');
```

## 🐞 Test de OurProducts.test.js:

### 📌 Objectif:
S'assurer que :
- Le titre "Nos Produits" s'affiche correctement.
- Les descriptions et les cartes de catégories sont bien présentes.
- Chaque carte possède une icône et un titre approprié : Électronique, Gemmes, Mode Hommes, Mode Femmes.
  
```js
expect(screen.getByText(/nos produits/i)).toBeInTheDocument();
expect(screen.getByText(/Électronique/i)).toBeInTheDocument();
expect(screen.getByText(/Gemmes/i)).toBeInTheDocument();
expect(screen.getByText(/Mode Hommes/i)).toBeInTheDocument();
expect(screen.getByText(/Mode Femmes/i)).toBeInTheDocument();
```

# 📝 Documentation des Tests de la page de Connexion (Login) et Création de Compte (Sign Up)

## 🐞 Test de la page de connexion (login):

### 📌 Objectif:
S’assurer que l’utilisateur peut voir le formulaire de connexion, entrer ses identifiants, et être redirigé vers la page `/products` après une connexion réussie, 

#### 🔧 Mocks et configuration initiale

```js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
```
- On mocke `useRouter` de Next.js pour simuler les redirections sans effectuer de navigation réelle.

### 🔍 Résumé des tests:

### ✅ Test 1 : Affichage du formulaire de connexion
```js
  it('renders login form inputs', () => {
    render(<Login />);

    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ce connecter/i })).toBeInTheDocument();
  });
```
- Ce test s’assure que les champs nom d'utilisateur, mot de passe, et le bouton de connexion sont présents.
  
### ✅ Test 2 : Connexion avec identifiants invalides

```js
fetch.mockResolvedValueOnce({
  json: () => Promise.resolve({}),
});
```

- Simule une réponse API sans token (identifiants incorrects).

```js
expect(
  screen.getByText(/nom d'utilisateur ou mot de passe incorrect/i)
).toBeInTheDocument();
```

- Vérifie que le message d’erreur est bien affiché à l’utilisateur.

---

### ✅ Test 3 : Connexion avec identifiants valides

```js
fetch.mockResolvedValueOnce({
  json: () => Promise.resolve({ token: 'fake-token' }),
});
```

- Simule une réponse API réussie avec un token.

```js
expect(push).toHaveBeenCalledWith('/products');
```

- Vérifie que l’utilisateur est redirigé vers la page `/products` après une authentification réussie.


### 🛠️ Changements Clés Après les Tests:
- Ajout de htmlFor={field.name} dans FormComponentTemplate
Avant les tests, nos balises <label> dans FormComponentTemplate n'étaient pas liées directement aux champs de saisie (<input>), ce qui causait un problème avec la fonction getByLabelText() de Testing Library.

#### 🔧 Changement effectué :
```js
<label htmlFor={field.name} className="block mb-1 text-sm font-semibold text-[#212121]">
  {field.label}
</label>
```
Ce changement permet à Testing Library (et aux lecteurs d’écran/accessibilité) de faire le lien entre l’étiquette (label) et le champ correspondant (input), car maintenant l’attribut htmlFor correspond à name, qui est aussi utilisé dans l’input.

#### ✅ Avantage :

- Améliore l’accessibilité (liaison explicite label ↔ input)

- Permet d’utiliser getByLabelText() dans les tests pour retrouver les champs à partir de leur nom


## 🐞 Test de la page d'inscription (signup) :

### 📌 Objectif
S’assurer que l’utilisateur peut voir le formulaire d’inscription, remplir les champs requis, et recevoir une alerte de succès après une inscription réussie via l’API.

### 🔍 Résumé des tests: 

### ✅ Test 1 : Affichage du formulaire de connexion
```js
it('renders all form fields and the submit button', () => {
  render(<Signup />);

  expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
});
```
- Vérifie la présence des champs "nom d'utilisateur", "email", "mot de passe", et du bouton "S'inscrire".

### ✅ Test 2 :Simule la saisie des champs par un utilisateur

```js
it('fills and submits the form', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, username: 'ahmed' , email: 'ahmed@gmail.com' }),
    })
  );

  window.alert = jest.fn();

  render(<Signup />);

  fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
    target: { value: 'ahmed' },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'ahmed@gmail.com' },
  });
  fireEvent.change(screen.getByLabelText(/mot de passe/i), {
    target: { value: '123456' },
  });

  fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/users',
      expect.objectContaining({
        method: 'POST',
      })
    );
    expect(window.alert).toHaveBeenCalledWith('Compte créé avec succès !');
  });
});
```
vérifie que :
  - La méthode fetch() est bien appelée avec les bonnes données et la méthode POST
  - Une alerte Compte créé avec succès ! est affichée

# 📝 Page Produit (Page de tous les produits)

## 🐞 01 Test du composant OurCategories:

### 📌 Objectif
Vérifier que le composant OurCategories :
- Affiche correctement le titre et toutes les catégories
- Permet de cliquer sur une catégorie pour effectuer une redirection vers `/products?category=...`

### 🔍 Résumé des tests

### ✅ Test 1 : Vérifie que le titre "Nos Catégories" et les 5 catégories sont bien affichées.

```js
it('affiche toutes les catégories', () => {
  render(<OurCategories />);

  expect(screen.getByText(/Nos Catégories/i)).toBeInTheDocument();

  const expectedCategories = [
    "tous les produits",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  expectedCategories.forEach(cat => {
    expect(screen.getByRole('button', { name: cat })).toBeInTheDocument();
  });
});
```
### ✅ Test 2 : Simule un clic sur la catégorie "electronics" et vérifie que `router.push()` est appelé avec l'URL attendue.

```js
it('redirige vers la bonne URL au clic', () => {
  const push = jest.fn();
  useRouter.mockReturnValue({ push });

  render(<OurCategories />);

  const button = screen.getByRole('button', { name: /electronics/i });
  fireEvent.click(button);

  expect(push).toHaveBeenCalledWith('/products?category=electronics');
});
```

## 🐞 02 Test du composant NavComponent:

### 📌 Objectif
Vérifier que le composant `NavComponent` :
- Affiche correctement le logo et le champ de recherche
- Déclenche la redirection correcte lors de la soumission du formulaire de recherche


### 🔍 Résumé des tests

### ✅ Test 1 : Vérifie que le champ de recherche et le logo sont bien affichés.

```js
it('renders logo and input', () => {
  render(<NavComponent />);

  expect(screen.getByPlaceholderText('Rechercher des produit')).toBeInTheDocument();
  expect(screen.getByAltText('BuyNext Logo')).toBeInTheDocument();
});
```
### ✅ Test 2 : Simule la recherche d’un produit et vérifie que le champ est vidé après la soumission.

```js
it('searches for products on submit', () => {
  render(<NavComponent />);
  const input = screen.getByPlaceholderText('Rechercher des produit');
  const form = input.closest('form');

  fireEvent.change(input, { target: { value: 'ordinateur' } });
  fireEvent.submit(form);

  expect(input.value).toBe('');
});
```
## 🐞 03 Test du composant AllProducts:

### 📌 Objectif
Vérifier que le composant AllProducts :
 - Affiche correctement les informations du produit (titre, catégorie, prix, image)
 - Contient un lien vers la page de détails du produit
  
### 🔍 Résumé des tests

Test 1 : Vérifie l'affichage des informations du produit et la structure du composant.

```js
import { fireEvent, screen, render } from "@testing-library/react";
import AllProducts from "../products/AllProducts";

const mockProduct = {
  id: 1,
  title: "Test Product",
  category: "electronics",
  price: 99.99,
  image: "https://fakestoreapi.com/img/test.jpg"
};

describe("fetching products", () => {
  it("fetches and displays products", () => {
    render(<AllProducts product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} $`)).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", expect.stringContaining("test.jpg"));

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/products/${mockProduct.id}`);
  });
});
```
# 📝 Documentation des Tests de la Page de détails du produit (`/products/[id]`)

## 🐞 01: Test du composant ProductDetails:

### 📌 Objectif:
Vérifier que le composant ProductDetails :

- Affiche correctement tous les détails d’un produit (image, titre, prix, description)

- Affiche les deux boutons : Acheter maintenant et Ajouter au panier

### 🔍 Résumé des tests:
- Vérifie que tous les éléments du produit sont bien rendus.
```js
import { render, screen } from '@testing-library/react';
import ProductDetails from '../products/ProductDetails';

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 89.99,
  description: "Ceci est un produit de test",
  image: "https://fakestoreapi.com/img/test.jpg"
};

describe("ProductDetails Component", () => {
  it("renders product details correctly", () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} $`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", expect.stringContaining("test.jpg"));

    expect(screen.getByText("Acheter maintenant")).toBeInTheDocument();
    expect(screen.getByText("Ajouter au panier")).toBeInTheDocument();
  });
});
```
# 📝 Documentation des Tests de la Page Admin:

## 🐞 1. Affichage Conditionnel de la Page Admin (`AddProductPage`)

### 📌 Objectif :

Vérifier que la page admin :
- Refuse l'accès si l'utilisateur **n'est pas connecté**
- Affiche le **formulaire** quand un token valide est présent

### 🧪 Tests :

```js
test("affiche 'accès refusé' quand non connecté", async () => {
  Storage.prototype.getItem.mockReturnValueOnce(null);
  render(<AddProductPage />);
  await waitFor(() => {
    expect(screen.getByText(/⛔ Accès refusé/i)).toBeInTheDocument();
    expect(screen.getByText(/Vous devez être connecté/i)).toBeInTheDocument();
  });
});

test("affiche le formulaire quand connecté", async () => {
  Storage.prototype.getItem.mockReturnValueOnce("token");
  render(<AddProductPage />);
  await waitFor(() => {
    expect(screen.getByText(/ajouter un produit/i)).toBeInTheDocument();
  });
});

```
- Simulation d'état d'authentification avec Storage.prototype.getItem

- waitFor nécessaire à cause de l'utilisation de useEffect

## 🐞 2. Tests du Formulaire Produit (ProductForm)

### 📌 Objectif :

Tester la capacité du formulaire à :
 - Capturer les saisies utilisateur
 - Appeler onSubmit avec les bonnes données

```js
it("soumet le formulaire avec les bonnes données", () => {
  const handleSubmit = jest.fn();
  render(<ProductForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/titre/i), {
    target: { value: "Produit Test" },
  });
  fireEvent.change(screen.getByLabelText(/prix/i), {
    target: { value: "99.99" },
  });
  // ... simulations des autres champs

  fireEvent.click(screen.getByRole("button", { name: /ajouter/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    title: "Produit Test",
    price: "100", // Note: Ajuster si conversion en float
    // ... autres valeurs attendues
  });
});
```
## 🐞 3. Composant de Titre (ProductionHeading)

### 📌 Objectif :
Vérifier que le composant :
 - Affiche correctement le texte du titre
 - Affiche l'image avec les bons attributs src, width, height

```js
it("affiche le titre avec les bonnes propriétés", () => {
  const mockProps = {
    title: 'Titre Test',
    width: 50,
    height: 50,
    src: '/test-image.svg'
  };

  render(<ProductionHeading {...mockProps} />);
  expect(screen.getByText(mockProps.title)).toBeInTheDocument();

  const image = screen.getByRole('img', { hidden: true });
  expect(image).toHaveAttribute('src', mockProps.src);
  // ... autres vérifications d'attributs
});
```
## 🐞 4. Composant de Success Modal (SuccessModal)

### 📌 Objectif :
Vérifier que :

- Le message de succès s'affiche correctement

- La fermeture automatique appelle bien onClose après 3 secondes

```js
import { fireEvent, screen, render } from "@testing-library/react";
import SuccessModal from "../SuccessModal";

describe("SuccessModal", () => {
  it("affiche le message de succès", () => {
    const mockOnClose = jest.fn(); 
    const testMessage = "Product has been added!";
    
    render(<SuccessModal onClose={mockOnClose} message={testMessage} />);
    
    expect(screen.getByText(/Succès/i)).toBeInTheDocument();
    expect(screen.getByText(testMessage)).toBeInTheDocument(); 
  });

  it("appelle onClose après 3 secondes", () => {
    jest.useFakeTimers(); // Contrôle des timers
    const mockOnClose = jest.fn();
    const testMessage = "Action completed!";
    
    render(<SuccessModal onClose={mockOnClose} message={testMessage} />);
    
    jest.advanceTimersByTime(3000); // Avance dans le temps
    
    expect(mockOnClose).toHaveBeenCalled(); // Vérifie le déclenchement
    
    jest.useRealTimers(); // Restaure les timers normaux
  });
});
```

# 📝 Documentation des Tests de la Page d'Inventaire (Inventory):

## 🐞 01 Test du composant InventoryHeading

### 📌 Objectif
Vérifier que le composant InventoryHeading :
  - Affiche correctement l’icône (SVG) de liste
  - Affiche les bons titres et descriptions pour la section d’inventaire

### 🔍 Résumé des tests

```js
import { render, screen } from "@testing-library/react";
import InventoryHeading from "../inventory/Components/InventoryHeading";

describe("InventoryHeading Component", () => {
  it("renders list icon and title", () => {
    render(<InventoryHeading />);

    expect(screen.getByAltText("Liste")).toBeInTheDocument();

    expect(screen.getByText("Liste des produits")).toBeInTheDocument();
  });

  it("renders descriptive paragraph", () => {
    render(<InventoryHeading />);
    expect(screen.getByText(/Découvrez tous vos produits ajoutés/i)).toBeInTheDocument();
    expect(screen.getByText(/de nouveaux articles en un clic/i)).toBeInTheDocument();
  });
});
```
## 🐞 02 Test du composant InventoryProduct

### 📌 Objectif
Vérifier que le composant InventoryProduct fonctionne comme attendu, à savoir :
  - Affiche correctement les informations d’un produit
  - Appelle la fonction onDelete avec le bon identifiant (id) lorsqu’on clique sur le bouton Supprimer

### 🔍 Résumé des tests
```js
import { render, screen, fireEvent } from '@testing-library/react';
import InventoryProduct from '../inventory/Components/InventoryProduct';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 49.99,
  image: 'https://fakestoreapi.com/img/test.jpg',
};

describe('InventoryProduct Component', () => {
  it('renders product image, title and price', () => {
    render(<InventoryProduct product={mockProduct} onDelete={jest.fn()} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} $`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockDelete = jest.fn();
    render(<InventoryProduct product={mockProduct} onDelete={mockDelete} />);

    const deleteButton = screen.getByText(/Supprimer/i);
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(mockProduct.id);
  });
});
```
# 📝 Documentation des Tests de la Page de Modification de Produit
