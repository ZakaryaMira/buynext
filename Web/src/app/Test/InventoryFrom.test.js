import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InventoryFrom from '../inventory/[id]/Components/InventoryFrom';

describe('InventoryFrom Component', () => {
  const mockFormData = {
    title: 'Test Product',
    price: '99.99',
    description: 'A product for testing',
    image: '',
    category: "electronics",
    images: []
  };

  const mockSetFormData = jest.fn();
  const mockOnSubmit = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    mockSetFormData.mockClear();
    mockOnSubmit.mockClear();
  });

  it('renders all form fields correctly', () => {
    render(
      <InventoryFrom
        formData={mockFormData}
        setFormData={mockSetFormData}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText(/Titre du produit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prix du produit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Catégorie de produit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description du produit/i)).toBeInTheDocument();
  });

  it('calls setFormData on input change', () => {
    render(
      <InventoryFrom
        formData={mockFormData}
        setFormData={mockSetFormData}
        onSubmit={mockOnSubmit}
      />
    );

    const titleInput = screen.getByLabelText(/Titre du produit/i);
    fireEvent.change(titleInput, { target: { name: 'title', value: 'New Title' } });

    expect(mockSetFormData).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Title' }));
  });

  it('calls onSubmit when form is submitted', async () => {
    render(
      <InventoryFrom
        formData={mockFormData}
        setFormData={mockSetFormData}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /enregistrer/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(mockFormData);
    });
  });

  it('shows success modal after submit', async () => {
    render(
      <InventoryFrom
        formData={mockFormData}
        setFormData={mockSetFormData}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /enregistrer/i });
    fireEvent.click(submitButton);

    const successMessage = await screen.findByText(/Le produit a été modifié avec succès!/i);
    expect(successMessage).toBeInTheDocument();
  });
});
