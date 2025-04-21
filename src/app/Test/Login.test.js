import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/app/login/page'; // adjust this if your path differs
import { useRouter } from 'next/navigation';

// Mock the router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Login Page', () => {
  it('renders login form inputs', () => {
    render(<Login />);

    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ce connecter/i })).toBeInTheDocument();
  });
  
  it('shows error on invalid credentials', async () => {
    useRouter.mockReturnValue({ push: jest.fn() });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}), 
      })
    );

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { value: 'not_mor_2314' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: '!83r5^_' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ce connecter/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/nom d'utilisateur ou mot de passe incorrect/i)
      ).toBeInTheDocument();
    });
  });

  
  it('submits form with username and password', async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'fake-token' }),
      })
    );

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { value: 'mor_2314' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: '83r5^_' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ce connecter/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/auth/login',
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(push).toHaveBeenCalledWith('/products');
    });
  });
});
