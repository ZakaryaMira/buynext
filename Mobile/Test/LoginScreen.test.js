import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from '../screens/login/LoginScreen';

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
}));

const mockReset = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    reset: mockReset,
    navigate: jest.fn(),
  }),
}));

global.fetch = jest.fn();

describe('LoginScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form fields', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    expect(getByPlaceholderText("Entrez votre nom d'utilisateur")).toBeTruthy();
    expect(getByPlaceholderText('Entrez votre mot de passe')).toBeTruthy();
    expect(getByText('Se connecter')).toBeTruthy();
  });

  it('successful login stores token and navigates', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ token: 'fake-token' }),
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText("Entrez votre nom d'utilisateur"), 'mor_2314');
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), '83r5^_');
    fireEvent.press(getByText('Se connecter'));

    await waitFor(() => {
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('userToken', 'fake-token');
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    });
  });

  it('shows error on login failure', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({}), 
    });

    const { getByPlaceholderText, getByText, findByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText("Entrez votre nom d'utilisateur"), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'wrongpass');
    fireEvent.press(getByText('Se connecter'));

    expect(await findByText("Nom d'utilisateur ou mot de passe incorrect.")).toBeTruthy();
  });

  it('handles network errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { getByPlaceholderText, getByText, findByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText("Entrez votre nom d'utilisateur"), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'password123');
    fireEvent.press(getByText('Se connecter'));

    expect(await findByText("Nom d'utilisateur ou mot de passe incorrect.")).toBeTruthy();
  });
});
