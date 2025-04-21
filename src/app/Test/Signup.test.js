
import { render, screen, fireEvent , waitFor } from '@testing-library/react';
import Signup from '../signup/page';

describe('signup' , () => {
it('renders all form fields and the submit button', () => {
    render(<Signup />);
    expect(screen.getByLabelText(/nom d'utilisateur/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
});
it('fills and submits the form', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ id: 1, username: 'ahmed' , email: 'ahmed@gmail.com' }),
        })
    ),
    window.alert = jest.fn();
    render(<Signup />);

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/), {
      target: { value: 'ahmed' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'ahmed@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
    target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith('Compte créé avec succès !');
    })
});
});