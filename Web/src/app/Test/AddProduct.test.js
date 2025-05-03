import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddProductPage from "../products/addProduct/page";

beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
});

test("renders access denied if not logged in", async() => {
Storage.prototype.getItem.mockReturnValueOnce(null);
render(<AddProductPage />);
await waitFor(() => {
expect(screen.getByText(/⛔ Accès refusé/i)).toBeInTheDocument();
expect(screen.getByText(/Vous devez être connecté pour ajouter un produit./i)).toBeInTheDocument();
})
});

test("render the form", async() => {
    Storage.prototype.getItem.mockReturnValueOnce("token");
    render(<AddProductPage />);
    await waitFor(() => {
        expect(screen.getByText(/ajouter un produit/i)).toBeInTheDocument()
    }) 
})