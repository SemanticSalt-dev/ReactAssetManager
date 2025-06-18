import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../../testUtils.js';
import NavBar from '../../components/NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  test('renders navigation links', () => {
    renderWithRouter(<NavBar />);
    
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    expect(screen.getByText('Add Category')).toBeInTheDocument();
    expect(screen.getByText('Manage Categories')).toBeInTheDocument();
  });

  test('navigates to inventory page', () => {
    const { container } = renderWithRouter(<NavBar />);
    const inventoryLink = screen.getByText('Inventory');
    expect(inventoryLink).toHaveAttribute('href', '/');
  });

  test('navigates to add item page', () => {
    const { container } = renderWithRouter(<NavBar />);
    const addItemLink = screen.getByText('Add Item');
    expect(addItemLink).toHaveAttribute('href', '/add-item');
  });

  test('navigates to add category page', () => {
    const { container } = renderWithRouter(<NavBar />);
    const addCategoryLink = screen.getByText('Add Category');
    expect(addCategoryLink).toHaveAttribute('href', '/add-category');
  });

  test('navigates to manage categories page', () => {
    const { container } = renderWithRouter(<NavBar />);
    const manageCategoriesLink = screen.getByText('Manage Categories');
    expect(manageCategoriesLink).toHaveAttribute('href', '/manage-categories');
  });
}); 