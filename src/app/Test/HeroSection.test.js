import { render, screen } from "@testing-library/react";
import HeroSection from "../HeroComponent";

describe("HeroSection", () => {
  it("renders the main title", () => {
    render(<HeroSection />);
    expect(screen.getByText(/BuyNext/i)).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Votre prochain achat/i)).toBeInTheDocument();
  });

  it("has a link to the products page", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /découvrez les offres/i });
    expect(link).toHaveAttribute("href", "/products");
  });
});
