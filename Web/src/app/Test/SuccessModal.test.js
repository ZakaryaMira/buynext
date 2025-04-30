import { fireEvent, screen, render } from "@testing-library/react";
import SuccessModal from "../SuccessModal";

describe("success modal", () => {
    it("displays the success message" , () => {
        const mockOnClose = jest.fn(); 
        const testMessage = "Product has been added!";
        render(<SuccessModal onClose={mockOnClose} message={testMessage} />);
        expect(screen.getByText(/Succès/i)).toBeInTheDocument();
        expect(screen.getByText(testMessage)).toBeInTheDocument(); 
    });
    it("calls onClose after 3 seconds", () => {
        jest.useFakeTimers(); // Control timers
        const mockOnClose = jest.fn();
        const testMessage = "Action completed!";
    
        render(<SuccessModal onClose={mockOnClose} message={testMessage} />);
    
        jest.advanceTimersByTime(3000); // Fast-forward 3 seconds
    
        expect(mockOnClose).toHaveBeenCalled(); // onClose should be triggered
    
        jest.useRealTimers(); // Restore real timers
      });
    });

