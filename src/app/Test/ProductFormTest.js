import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../ProductForm';

describe("ProductForm", () => {
  it("submits the form with correct data", () => {
    const handleSubmit = jest.fn();
    render(<ProductForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/titre du produit/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/prix du produit/i), {
      target: { value: "99.99" },
    });
    fireEvent.change(screen.getByLabelText(/catégorie de produit/i), {
      target: { value: "books" },
    });
    fireEvent.change(screen.getByLabelText(/description du produit/i), {
      target: { value: "Ceci est une description de test." },
    });

    fireEvent.click(screen.getByRole("button", { name: /ajouter le produit/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: "Test Product",
      price: "100", 
      category: "books",
      description: "Ceci est une description de test.",
      images: [],
    });
  });
});
