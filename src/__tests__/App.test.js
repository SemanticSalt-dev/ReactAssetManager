import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithTheme } from '../testUtils';
import App from '../App';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock window.confirm
window.confirm = jest.fn();

describe('App', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.clear();
    window.confirm.mockClear();
    
    // Reset to default behavior
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  test('renders with default data when no localStorage data exists', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderWithTheme(<App />);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Secretlab Titan Chair')).toBeInTheDocument();
    expect(screen.getByText('Adjustable Height Desk')).toBeInTheDocument();
    expect(screen.getAllByText(/Category: Electronics, Quantity: \d+/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Category: Furniture, Quantity: \d+/)[0]).toBeInTheDocument();
  });

  test('loads data from localStorage when available', async () => {
    const mockInventory = [
      { id: 1, name: 'Test Item', categoryId: 1, quantity: 1 }
    ];
    const mockCategories = [
      { id: 1, name: 'Test Category' }
    ];

    // Clear any previous mock setup
    mockLocalStorage.getItem.mockClear();
    
    // Set up the mock to return our test data for specific keys
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'inventory') {
        return JSON.stringify(mockInventory);
      }
      if (key === 'categories') {
        return JSON.stringify(mockCategories);
      }
      return null;
    });

    renderWithTheme(<App />);

    // The component should immediately show the data from localStorage
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText(/Category: Test Category, Quantity: \d+/)).toBeInTheDocument();
  });

  test('saves data to localStorage when inventory changes', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderWithTheme(<App />);

    // Navigate to add item page
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
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'inventory',
        expect.stringContaining('New Item')
      );
    });
  });

  test('saves data to localStorage when categories change', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderWithTheme(<App />);

    // Navigate to add category page
    fireEvent.click(screen.getByRole('link', { name: 'Add Category' }));

    const categoryInput = screen.getByLabelText('Category Name');
    fireEvent.change(categoryInput, { target: { value: 'New Category' } });
    fireEvent.click(screen.getByRole('button', { name: /add category/i }));

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'categories',
        expect.stringContaining('New Category')
      );
    });
  });

  test('prevents deletion of category in use', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderWithTheme(<App />);

    // Navigate to manage categories page by clicking the navigation link
    fireEvent.click(screen.getByRole('link', { name: 'Manage Categories' }));

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // The toast message should appear, but since we're not testing toast functionality directly,
    // we'll just verify the category is still there (not deleted)
    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
    });
  });

  test('allows deletion of unused category', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderWithTheme(<App />);

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
      expect(screen.queryByText('Unused Category')).not.toBeInTheDocument();
    });
  });

  test('updates item successfully', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderWithTheme(<App />);

    // Make sure we're on the inventory page
    fireEvent.click(screen.getByRole('link', { name: 'Inventory' }));

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    const nameInput = screen.getByLabelText('Item Name');
    const quantityInput = screen.getByLabelText('Quantity');

    fireEvent.change(nameInput, { target: { value: 'Updated Item' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(screen.getByText('Updated Item')).toBeInTheDocument();
    });
  });

  test('updates category successfully', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderWithTheme(<App />);

    // Navigate to manage categories page by clicking the navigation link
    fireEvent.click(screen.getByRole('link', { name: 'Manage Categories' }));

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    const input = screen.getByDisplayValue('Electronics');
    fireEvent.change(input, { target: { value: 'Updated Category' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(screen.getByText('Updated Category')).toBeInTheDocument();
    });
  });

  // Test localStorage errors
  test('handles localStorage errors gracefully', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    renderWithTheme(<App />);
    
    // Navigate to inventory page to see the fallback data
    fireEvent.click(screen.getByRole('link', { name: 'Inventory' }));
    
    // Should fall back to default data - check for default inventory items
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Secretlab Titan Chair')).toBeInTheDocument();
    expect(screen.getByText('Adjustable Height Desk')).toBeInTheDocument();
  });

  test('handles localStorage setItem errors', async () => {
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('localStorage write error');
    });
    
    renderWithTheme(<App />);
    // Should show toast error - check for the error message in the toast
    await waitFor(() => {
      expect(screen.getByText('Failed to save data. Please check your browser settings.')).toBeInTheDocument();
    });
  });

  test('has proper ARIA labels and roles', () => {
    renderWithTheme(<App />);
    
    // Check for proper navigation elements
    expect(screen.getByRole('banner')).toBeInTheDocument(); // AppBar has banner role
    
    // Check form accessibility
    fireEvent.click(screen.getByRole('link', { name: 'Add Item' }));
    expect(screen.getByLabelText('Item Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  });
}); 