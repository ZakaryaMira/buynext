import { render, screen } from '@testing-library/react';
import ProductDetails from '../products/[id]/ProductDetails';

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 89.99,
  description: "Ceci est un produit de test",
  image: "https://fakestoreapi.com/img/test.jpg"
};

describe("ProductDetails Component", () => {
  it("renders product details correctly", () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} $`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", expect.stringContaining("test.jpg"));

    expect(screen.getByText("Acheter maintenant")).toBeInTheDocument();
    expect(screen.getByText("Ajouter au panier")).toBeInTheDocument();
  });
});
