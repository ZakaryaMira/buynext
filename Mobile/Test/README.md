# 🧪 Documentation des Tests – Application Mobile (React Native)
Cette documentation a pour but de présenter simplement la manière dont les tests ont été mis en place dans la version mobile de l’application.
Le projet a été réalisé dans le cadre d’un test technique, et cette partie vise à expliquer comment j’ai assuré un minimum de fiabilité et de cohérence dans le fonctionnement des principales fonctionnalités de l’application mobile React Native.

## 🧰 Outils utilisés
- Jest – Pour lancer les tests unitaires et simuler le comportement des fonctions.
- React Native Testing Library – Pour tester les composants de manière plus proche de l'expérience réelle de l'utilisateur.

Mon objectif ici était de garantir que certaines pages importantes (comme la connexion, l’ajout de produit, etc.) fonctionnent correctement, même après des modifications dans le code.

## ⚙️ Configuration de Jest
Pour pouvoir écrire et exécuter des tests unitaires dans mon application React Native, j’ai commencé par installer les dépendances nécessaires.

### 📦 Dépendances installées

```bash
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```
Ces bibliothèques permettent de :

- Utiliser Jest comme framework de test principal.

- Simuler l’interaction utilisateur avec React Native Testing Library.

- Étendre les assertions avec jest-native pour des tests plus précis.

### 🛠️ Configuration dans package.json
Ensuite, j’ai ajouté (ou vérifié) la configuration suivante dans le fichier package.json :

```json
"jest": {
  "preset": "react-native",
  "setupFilesAfterEnv": [
    "@testing-library/jest-native/extend-expect"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)"
  ]
}
```
### 🔧 3. Configuration de Babel pour Jest
Un problème courant concerne les erreurs liées à la compilation du code pendant les tests. Pour le résoudre, j’ai ajouté un fichier babel.config.js avec le contenu suivant :

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```
Cela permet à Jest de comprendre le code JSX et les spécificités de l’environnement Expo.

# 📝 Documentation des Tests de la page de Connexion (Login) et Création de Compte (Sign Up)

## 🐞 Test de la page de connexion (login):
### 📌 Objectif:
S’assurer que l’utilisateur peut voir le formulaire de connexion, entrer ses identifiants, et être redirigé vers la page `/Main` après une connexion réussie, 

### 🧪 Fichier testé : LoginScreen.test.js.
#### 🔧 Mocks et configuration initiale

```js
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
}));
```
- On simule SecureStore pour éviter de vraiment stocker des données pendant les tests.

```js
const mockReset = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    reset: mockReset,
    navigate: jest.fn(),
  }),
}));
```
- On mocke useNavigation afin de capturer les redirections sans naviguer réellement.

```js
global.fetch = jest.fn();
```
- On remplace fetch par une version contrôlable pour simuler les réponses du serveur.

#### 🔄 Nettoyage entre chaque test

```js
afterEach(() => {
    jest.clearAllMocks();
});
```
- Assure que chaque test est isolé (les appels mockés ne se mélangent pas).

### 🔍 Résumé des tests:

### ✅ Test 1 : Affichage du formulaire de connexion
```js
it('renders login form fields', () => {
  const { getByPlaceholderText, getByText } = render(<LoginScreen />);
  expect(getByPlaceholderText("Entrez votre nom d'utilisateur")).toBeTruthy();
  expect(getByPlaceholderText('Entrez votre mot de passe')).toBeTruthy();
  expect(getByText('Se connecter')).toBeTruthy();
});
```

### ✅ Test 2 :Connexion réussie

```js
fetch.mockResolvedValueOnce({
  json: async () => ({ token: 'fake-token' }),
});
```
- On simule une réponse API qui retourne un token valide.

```js
expect(SecureStore.setItemAsync).toHaveBeenCalledWith('userToken', 'fake-token');
expect(mockReset).toHaveBeenCalledWith({
  index: 0,
  routes: [{ name: 'Main' }],
});
```
Le test vérifie que :

- Le token est bien enregistré.

- L’utilisateur est redirigé vers la page principale (Main).

### ✅ Test 3 : Erreur d’identifiants

```js
fetch.mockResolvedValueOnce({
  json: async () => ({}),
});
```
- Cette fois, aucun token n’est retourné.

```js
expect(await findByText("Nom d'utilisateur ou mot de passe incorrect.")).toBeTruthy();
```

- On teste l’affichage d’un message d’erreur si l’identification échoue.

### ✅ Test 4 : Erreur réseau

```js
fetch.mockRejectedValueOnce(new Error('Network error'));
```
- On simule une erreur réseau (ex. : pas de connexion internet).

```js
expect(await findByText("Nom d'utilisateur ou mot de passe incorrect.")).toBeTruthy();
```
- Même dans ce cas, le message d’erreur est correctement affiché à l’utilisateur.

## 🐞 Test de la page d'inscription (signup) :

### 📌 Objectif
Le composant SignupScreen permet à un nouvel utilisateur de créer un compte en saisissant son nom d'utilisateur, son email et son mot de passe. Il envoie une requête à l’API FakeStoreAPI et affiche un message de succès ou d’erreur selon la réponse.

### 🔍 Résumé des tests: 

### ✅ Test 1 : Affichage du formulaire de connexion

```js
    expect(getByPlaceholderText("Entrez votre nom d'utilisateur")).toBeTruthy();
    expect(getByPlaceholderText("Entrez votre email")).toBeTruthy();
    expect(getByPlaceholderText("Entrez votre mot de passe")).toBeTruthy();
    expect(getByTestId('form-submit-button')).toBeTruthy();
```
- Vérifie que tous les champs du formulaire et le bouton de soumission sont bien affichés.

### ✅ Test 2 : create un utilisateur

```js
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, username: 'ahmed', email: 'ahmed@gmail.com' }),
    });
```
- On simule une réponse réussie de l’API (fetch) comme si un utilisateur avait été créé avec succès. 

```js
const alertMock = jest.spyOn(Alert, 'alert');
```
- On espionne la fonction Alert.alert pour vérifier qu'une alerte est bien affichée après la création réussie du compte.

```js
const { getByPlaceholderText, getByTestId } = render(<SignupScreen />);
```
- On rend (render) le composant SignupScreen pour interagir avec ses éléments dans le test.
  
  ```js
  fireEvent.changeText(getByPlaceholderText("Entrez votre nom d'utilisateur"), 'testuser');
  fireEvent.changeText(getByPlaceholderText("Entrez votre email"), 'test@example.com');
  fireEvent.changeText(getByPlaceholderText("Entrez votre mot de passe"), 'password123');
  ```

  - On simule l’entrée de texte dans les champs du formulaire : nom d’utilisateur, email, mot de passe.
  
  ```js
  fireEvent.press(getByTestId('form-submit-button'));
  ```
  - On simule l’appui sur le bouton de soumission du formulaire.

  ```js
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('Succès', 'Compte créé avec succès !');
  });
  ```
- On attend que fetch ait bien été appelé une fois.
- On vérifie que l’alerte de succès a bien été affichée avec le message attendu.

# 📝 Page Produit (Page de tous les produits)

## 🐞 01 Test du composant OurCategories:
S'assurer que le composant CategoryFilter :

- Affiche correctement toutes les options de catégories à l'utilisateur.
- Gère précisément l'interaction de l'utilisateur en appelant une fonction de rappel avec la catégorie correcte lorsqu'un utilisateur sélectionne une "chip" de catégorie

### 🔍 Résumé des tests

### ✅ Test 1 : Affichage toutes les options de catégories à l'utilisateur

```js
 it('renders all categories', () => {
        const { getByText } = 
        render(<CategoryFilter 
        selectedCategory="tous les produits" onSelectCategory={mockOnSelectCategory} />);

        categorie.forEach(category => {
            expect(getByText(category)).toBeTruthy();
        });
    });
```
- Il rend le composant avec une catégorie sélectionnée par défaut ("tous les produits").

- Il utilise getByText pour vérifier que chaque catégorie du tableau categorie est bien affichée à l'écran.

### ✅ Test 2 : Vérification du comportement lors de la sélection d'une catégorie

```js
it('calls onSelectCategory when a chip is pressed', () => {
  const { getByText } = render(
    <CategoryFilter
      selectedCategory="tous les produits"
      onSelectCategory={mockOnSelectCategory}
    />
  );

  // Sélectionne la catégorie à tester
  const categoryToSelect = getByText("men's clothing");

  // Simule le clic sur la catégorie
  fireEvent.press(categoryToSelect);

  // Vérifie que la fonction mock a bien été appelée avec la catégorie sélectionnée
  expect(mockOnSelectCategory).toHaveBeenCalledWith("men's clothing");
});
```
- Il rend le composant avec la catégorie "tous les produits" sélectionnée par défaut.

- Il simule un clic utilisateur sur le chip de la catégorie "men's clothing".

- Il vérifie que la fonction de rappel onSelectCategory a été appelée avec "men's clothing" comme argument.

## 🐞 02 