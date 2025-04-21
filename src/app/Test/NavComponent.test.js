
import { render, screen, fireEvent } from '@testing-library/react';
import NavComponent from '@/app/NavComponent';


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('NavComponent', () => {
  it('renders logo and input', () => {
    render(<NavComponent />);

    expect(screen.getByPlaceholderText('Rechercher des produit')).toBeInTheDocument();
    expect(screen.getByAltText('BuyNext Logo')).toBeInTheDocument();
  });

  it('searches for products on submit', () => {
    render(<NavComponent />);
    const input = screen.getByPlaceholderText('Rechercher des produit');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'ordinateur' } });
    fireEvent.submit(form);

    expect(input.value).toBe(''); 
  });
});
