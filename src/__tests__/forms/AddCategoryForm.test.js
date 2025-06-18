import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { renderWithTheme } from '../../testUtils';
import AddCategoryForm from '../../components/AddCategoryForm';

describe('AddCategoryForm', () => {
  const mockAddCategory = jest.fn();

  beforeEach(() => {
    mockAddCategory.mockClear();
  });

  test('renders form fields', () => {
    renderWithTheme(<AddCategoryForm addCategory={mockAddCategory} />);
    
    expect(screen.getByLabelText(/category name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add category/i })).toBeInTheDocument();
  });

  test('submits form with valid data', () => {
    renderWithTheme(<AddCategoryForm addCategory={mockAddCategory} />);
    
    fireEvent.change(screen.getByLabelText(/category name/i), { target: { value: 'New Category' } });
    fireEvent.click(screen.getByRole('button', { name: /add category/i }));
    
    expect(mockAddCategory).toHaveBeenCalledWith({ name: 'New Category' });
  });

  test('shows error for empty form submission', () => {
    renderWithTheme(<AddCategoryForm addCategory={mockAddCategory} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add category/i }));
    
    expect(screen.getByText('Category name is required')).toBeInTheDocument();
    expect(mockAddCategory).not.toHaveBeenCalled();
  });

  test('shows error for whitespace-only name', () => {
    renderWithTheme(<AddCategoryForm addCategory={mockAddCategory} />);
    
    fireEvent.change(screen.getByLabelText(/category name/i), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /add category/i }));
    
    expect(screen.getByText('Category name is required')).toBeInTheDocument();
    expect(mockAddCategory).not.toHaveBeenCalled();
  });

  test('shows error for duplicate category', async () => {
    mockAddCategory.mockImplementation(() => {
      throw new Error('Category already exists');
    });

    renderWithTheme(<AddCategoryForm addCategory={mockAddCategory} />);
    
    fireEvent.change(screen.getByLabelText(/category name/i), { target: { value: 'Existing Category' } });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add category/i }));
    });
    
    expect(screen.getByText('Category already exists')).toBeInTheDocument();
  });
}); 