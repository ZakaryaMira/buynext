import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryFilter from '../screens/Product/Components/CategoryFilter';

describe('categorie component', () => {
    const mockOnSelectCategory = jest.fn();
    const categorie = [
        'tous les produits',
        "men's clothing",
        'jewelery',
        'electronics',
        "women's clothing",
    ];
    it('renders all categories', () => {
        const { getByText } = 
        render(<CategoryFilter 
        selectedCategory="tous les produits" onSelectCategory={mockOnSelectCategory} />);

        categorie.forEach(category => {
            expect(getByText(category)).toBeTruthy();
        });
    });
    it('calls onSelectCategory when a chip is pressed', () => {
        const { getByText } = render(
          <CategoryFilter
            selectedCategory="tous les produits"
            onSelectCategory={mockOnSelectCategory}
          />
        );
    
        const categoryToSelect = getByText("men's clothing");
        fireEvent.press(categoryToSelect);
    
        expect(mockOnSelectCategory).toHaveBeenCalledWith("men's clothing");
      });


});