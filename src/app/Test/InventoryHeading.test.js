import { render, screen } from "@testing-library/react";
import InventoryHeading from "../inventory/Components/InventoryHeading";

describe("InventoryHeading Component", () => {
  it("renders list icon and title", () => {
    render(<InventoryHeading />);

    expect(screen.getByAltText("Liste")).toBeInTheDocument();

    expect(screen.getByText("Liste des produits")).toBeInTheDocument();
  });

  it("renders descriptive paragraph", () => {
    render(<InventoryHeading />);
    expect(screen.getByText(/Découvrez tous vos produits ajoutés/i)).toBeInTheDocument();
    expect(screen.getByText(/de nouveaux articles en un clic/i)).toBeInTheDocument();
  });
});
