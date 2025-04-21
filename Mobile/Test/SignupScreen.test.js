import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupScreen from '../screens/Signup/SignupScreen';
import { Alert } from 'react-native';


jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

global.fetch = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('SignupScreen', () => {
  it('renders all fields and the button', () => {
    const { getByPlaceholderText, getByTestId } = render(<SignupScreen />);
    
    expect(getByPlaceholderText("Entrez votre nom d'utilisateur")).toBeTruthy();
    expect(getByPlaceholderText("Entrez votre email")).toBeTruthy();
    expect(getByPlaceholderText("Entrez votre mot de passe")).toBeTruthy();
    expect(getByTestId('form-submit-button')).toBeTruthy();
  });

  it('successfully creates a user', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, username: 'ahmed', email: 'ahmed@gmail.com' }),
    });

    const alertMock = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByTestId } = render(<SignupScreen />);

    fireEvent.changeText(getByPlaceholderText("Entrez votre nom d'utilisateur"), 'testuser');
    fireEvent.changeText(getByPlaceholderText("Entrez votre email"), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText("Entrez votre mot de passe"), 'password123');

    fireEvent.press(getByTestId('form-submit-button'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith('Succès', 'Compte créé avec succès !');
    });
  });

  it('shows error on fetch failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const alertMock = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByTestId } = render(<SignupScreen />);

    fireEvent.changeText(getByPlaceholderText("Entrez votre nom d'utilisateur"), 'testuser');
    fireEvent.changeText(getByPlaceholderText("Entrez votre email"), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText("Entrez votre mot de passe"), 'password123');

    fireEvent.press(getByTestId('form-submit-button'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith('Erreur', "Une erreur s'est produite lors de la création du compte.");
    });
  });
});
