import { screen, render } from "@testing-library/react";
import ProductionHeading from "../admin/ProductionHeading";
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />, 
}));

describe("ProductionHeading Component", () => {
  const mockProps = {
    title: 'Test Title',
    width: 50,
    height: 50,
    src: '/test-image.svg'
  };

  it("renders the heading with correct props", () => {
    render(<ProductionHeading {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    const image = screen.getByRole('img', { hidden: true }); 
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProps.src);
    expect(image).toHaveAttribute('width', mockProps.width.toString());
    expect(image).toHaveAttribute('height', mockProps.height.toString());
  });
});