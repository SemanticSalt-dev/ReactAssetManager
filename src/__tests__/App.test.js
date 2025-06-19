import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithTheme } from '../testUtils';
import App from '../App';
import { apiService } from '../services/api';

// Mock the API service
jest.mock('../services/api');

// Mock window.confirm
window.confirm = jest.fn();

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm.mockClear();
    
    // Default mock responses
    apiService.getCategories.mockResolvedValue([
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Furniture' }
    ]);
    
    apiService.getInventory.mockResolvedValue([
      { id: 1, name: 'Laptop', categoryId: 1, quantity: 1, category_name: 'Electronics' },
      { id: 2, name: 'Secretlab Titan Chair', categoryId: 2, quantity: 1, category_name: 'Furniture' },
      { id: 3, name: 'Adjustable Height Desk', categoryId: 2, quantity: 1, category_name: 'Furniture' }
    ]);
  });

  test('renders with data from API', async () => {
    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('Secretlab Titan Chair')).toBeInTheDocument();
      expect(screen.getByText('Adjustable Height Desk')).toBeInTheDocument();
    });
  });

  test('loads data from API when available', async () => {
    const mockInventory = [
      { id: 1, name: 'Test Item', categoryId: 1, quantity: 1, category_name: 'Test Category' }
    ];
    const mockCategories = [
      { id: 1, name: 'Test Category' }
    ];

    apiService.getInventory.mockResolvedValue(mockInventory);
    apiService.getCategories.mockResolvedValue(mockCategories);

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByText(/Category: Test Category, Quantity: \d+/)).toBeInTheDocument();
    });
  });

  test('adds item via API', async () => {
    const newItem = { id: 4, name: 'New Item', categoryId: 1, quantity: 5, category_name: 'Electronics' };
    apiService.createItem.mockResolvedValue(newItem);

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: 'Add Item' }));

    const nameInput = screen.getByLabelText('Item Name');
    const categorySelect = screen.getByLabelText('Category');
    const quantityInput = screen.getByLabelText('Quantity');

    fireEvent.change(nameInput, { target: { value: 'New Item' } });
    fireEvent.mouseDown(categorySelect);
    
    const options = screen.getAllByRole('option');
    fireEvent.click(options[0]);

    fireEvent.change(quantityInput, { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));

    await waitFor(() => {
      expect(apiService.createItem).toHaveBeenCalledWith({
        name: 'New Item',
        categoryId: 1,
        quantity: 5
      });
    });
  });

  test('adds category via API', async () => {
    const newCategory = { id: 3, name: 'New Category' };
    apiService.createCategory.mockResolvedValue(newCategory);

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: 'Add Category' }));

    const categoryInput = screen.getByLabelText('Category Name');
    fireEvent.change(categoryInput, { target: { value: 'New Category' } });
    fireEvent.click(screen.getByRole('button', { name: /add category/i }));

    await waitFor(() => {
      expect(apiService.createCategory).toHaveBeenCalledWith({
        name: 'New Category'
      });
    });
  });

  test('prevents deletion of category in use', async () => {
    apiService.deleteCategory.mockRejectedValue(new Error('Cannot delete category. It is currently in use by one or more items.'));

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: 'Manage Categories' }));

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
    });
  });

  test('allows deletion of unused category', async () => {
    apiService.deleteCategory.mockResolvedValue({ message: 'Category deleted successfully' });

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    // First add a new category
    fireEvent.click(screen.getByRole('link', { name: 'Add Category' }));
    const categoryInput = screen.getByLabelText('Category Name');
    fireEvent.change(categoryInput, { target: { value: 'Unused Category' } });
    fireEvent.click(screen.getByRole('button', { name: /add category/i }));

    // Then navigate to manage categories and delete it
    fireEvent.click(screen.getByRole('link', { name: 'Manage Categories' }));

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    window.confirm.mockReturnValueOnce(true);
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);

    await waitFor(() => {
      expect(apiService.deleteCategory).toHaveBeenCalled();
    });
  });

  test('updates item successfully', async () => {
    const updatedItem = { id: 1, name: 'Updated Item', categoryId: 1, quantity: 10, category_name: 'Electronics' };
    apiService.updateItem.mockResolvedValue(updatedItem);

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: 'Inventory' }));

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    const nameInput = screen.getByLabelText('Item Name');
    const quantityInput = screen.getByLabelText('Quantity');

    fireEvent.change(nameInput, { target: { value: 'Updated Item' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(apiService.updateItem).toHaveBeenCalledWith(1, {
        id: 1,
        name: 'Updated Item',
        categoryId: 1,
        quantity: 10
      });
    });
  });

  test('updates category successfully', async () => {
    const updatedCategory = { id: 1, name: 'Updated Category' };
    apiService.updateCategory.mockResolvedValue(updatedCategory);

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: 'Manage Categories' }));

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    const input = screen.getByDisplayValue('Electronics');
    fireEvent.change(input, { target: { value: 'Updated Category' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(apiService.updateCategory).toHaveBeenCalledWith(1, {
        id: 1,
        name: 'Updated Category'
      });
    });
  });

  test('handles API errors gracefully', async () => {
    apiService.getCategories.mockRejectedValue(new Error('API error'));
    apiService.getInventory.mockRejectedValue(new Error('API error'));

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.getByText('Error: API error')).toBeInTheDocument();
    });
  });

  test('shows loading state', () => {
    // Don't resolve the promises immediately to test loading state
    apiService.getCategories.mockImplementation(() => new Promise(() => {}));
    apiService.getInventory.mockImplementation(() => new Promise(() => {}));

    renderWithTheme(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('has proper ARIA labels and roles', async () => {
    renderWithTheme(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });
    
    // Check for proper navigation elements
    expect(screen.getByRole('banner')).toBeInTheDocument(); // AppBar has banner role
    
    // Check form accessibility
    fireEvent.click(screen.getByRole('link', { name: 'Add Item' }));
    expect(screen.getByLabelText('Item Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  });
}); 