import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../testUtils';
import AddItemForm from '../../components/AddItemForm';

describe('AddItemForm', () => {
  const mockCategories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' }
  ];
  const mockAddItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields', () => {
    renderWithTheme(<AddItemForm categories={mockCategories} addItem={mockAddItem} />);
    
    expect(screen.getByLabelText(/item name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
  });

  test('submits form with valid data', () => {
    renderWithTheme(<AddItemForm categories={mockCategories} addItem={mockAddItem} />);
    
    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '5' } });
    
    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.mouseDown(categorySelect);
    fireEvent.click(screen.getByRole('option', { name: 'Category 1' }));
    
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));
    
    expect(mockAddItem).toHaveBeenCalledWith({
      name: 'Test Item',
      quantity: 5,
      categoryId: 1
    });
  });

  test('shows error for empty form submission', () => {
    renderWithTheme(<AddItemForm categories={mockCategories} addItem={mockAddItem} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));
    
    expect(screen.getByText('Item name is required')).toBeInTheDocument();
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('shows error for whitespace-only name', () => {
    renderWithTheme(<AddItemForm categories={mockCategories} addItem={mockAddItem} />);
    
    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));
    
    expect(screen.getByText('Item name is required')).toBeInTheDocument();
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('shows error for negative or zero quantity', () => {
    renderWithTheme(<AddItemForm categories={mockCategories} addItem={mockAddItem} />);
    
    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));
    
    expect(screen.getByText('Quantity must be at least 1')).toBeInTheDocument();
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('shows error for non-integer quantity', () => {
    renderWithTheme(<AddItemForm categories={mockCategories} addItem={mockAddItem} />);
    
    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '2.5' } });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));
    
    expect(screen.getByText('Quantity must be an integer')).toBeInTheDocument();
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('should update inventory when new item is added', () => {
    // Test code
  });
}); 