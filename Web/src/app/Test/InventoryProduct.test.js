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
