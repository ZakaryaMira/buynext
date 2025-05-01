import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllProducts from '../products/components/AllProducts';

// Improved Next.js Image mock that simulates the actual behavior
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }) => (
    <img 
      src={`/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`} 
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  ),
}));

describe('AllProducts Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 19.99,
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  };

  it('renders product information correctly', () => {
    render(<AllProducts product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} $`)).toBeInTheDocument();
  });

  it('renders product image with correct transformed URL', () => {
    render(<AllProducts product={mockProduct} />);
    
    const image = screen.getByAltText(mockProduct.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent(mockProduct.image))
    );
    expect(image).toHaveAttribute('width', '200');
    expect(image).toHaveAttribute('height', '200');
  });

  it('links to the correct product page', () => {
    render(<AllProducts product={mockProduct} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  it('applies correct CSS classes', () => {
    render(<AllProducts product={mockProduct} />);
    
    const card = screen.getByRole('link').firstChild;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('p-4');
    expect(card).toHaveClass('rounded');
    expect(card).toHaveClass('shadow');
  });
});