import { fireEvent, screen, render} from "@testing-library/react";
import AllProducts from "../products/components/AllProducts";

const mockProduct = {
    id: 1,
    title: "Test Product",
    category: "electronics",
    price: 99.99,
    image: "https://fakestoreapi.com/img/test.jpg"
  };

describe("fetching products" , () => {
    it("fetches and displays products", () => {
        render(<AllProducts product={mockProduct}/>)
        expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
        expect(screen.getByText(`${mockProduct.price} $`)).toBeInTheDocument();
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", expect.stringContaining("test.jpg"));
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/products/${mockProduct.id}`);
    })
})