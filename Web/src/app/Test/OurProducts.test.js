import { fireEvent, screen, render } from "@testing-library/react";
import OurProducts from "../OurProducts";


describe("OURPRODUCTS", () => {
    it("render all products headings", () => {
        render(<OurProducts/>)
        expect(screen.getByText(/Nos Produits/i)).toBeInTheDocument();
        expect(screen.getByText(/Découvrez notre sélection de produits de qualité/i)).toBeInTheDocument();
    });
    it("render all products categories", () => {
        render(<OurProducts/>)
        expect(screen.getByText(/Électronique/i)).toBeInTheDocument();
        expect(screen.getByText(/Gemmes/i)).toBeInTheDocument();
        expect(screen.getByText(/Mode Hommes/i)).toBeInTheDocument();
        expect(screen.getByText(/Mode Femmes/i)).toBeInTheDocument();
    });
});