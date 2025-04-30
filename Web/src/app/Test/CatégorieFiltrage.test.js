import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OurCategories from '../products/OurCategories';
import { useRouter } from 'next/navigation';

// Mock du router Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('OurCategories', () => {
  it('affiche toutes les catégories', () => {
    render(<OurCategories />);
    expect(screen.getByText(/Nos Catégories/i)).toBeInTheDocument();

    // Vérifie que chaque catégorie est bien rendue
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

  it('redirige vers la bonne URL au clic', () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    render(<OurCategories />);

    const button = screen.getByRole('button', { name: /electronics/i });
    fireEvent.click(button);

    expect(push).toHaveBeenCalledWith('/products?category=electronics');
  });
});
