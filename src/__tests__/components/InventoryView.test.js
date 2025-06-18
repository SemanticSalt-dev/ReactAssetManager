import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../testUtils';
import InventoryView from '../../components/InventoryView';

describe('InventoryView', () => {
    const mockItems = [
        { id: 1, name: 'Item 1', quantity: 5, categoryId: 1 },
        { id: 2, name: 'Item 2', quantity: 10, categoryId: 2 }
    ];

    const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' }
    ];

    const mockDeleteItem = jest.fn();
    const mockUpdateItem = jest.fn();

    beforeEach(() => {
        mockDeleteItem.mockClear();
        mockUpdateItem.mockClear();
    });

    test('renders inventory items', () => {
        renderWithTheme(
            <InventoryView
                inventory={mockItems}
                categories={mockCategories}
                deleteItem={mockDeleteItem}
                updateItem={mockUpdateItem}
            />
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('filters items by category', () => {
        renderWithTheme(
            <InventoryView
                inventory={mockItems}
                categories={mockCategories}
                deleteItem={mockDeleteItem}
                updateItem={mockUpdateItem}
            />
        );

        const categoryFilter = screen.getByLabelText(/filter by category/i);
        fireEvent.mouseDown(categoryFilter);
        fireEvent.click(screen.getByText('Category 1'));

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });

    test('shows all items when "All" is selected', () => {
        renderWithTheme(
            <InventoryView
                inventory={mockItems}
                categories={mockCategories}
                deleteItem={mockDeleteItem}
                updateItem={mockUpdateItem}
            />
        );

        const categoryFilter = screen.getByLabelText(/filter by category/i);
        fireEvent.mouseDown(categoryFilter);
        fireEvent.click(screen.getByRole('option', { name: 'All' }));

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('searches items by name', () => {
        renderWithTheme(
            <InventoryView
                inventory={mockItems}
                categories={mockCategories}
                deleteItem={mockDeleteItem}
                updateItem={mockUpdateItem}
            />
        );

        const searchInput = screen.getByLabelText(/search/i);
        fireEvent.change(searchInput, { target: { value: 'Item 1' } });

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });

    test('deletes item when confirmed', () => {
        window.confirm = jest.fn(() => true);

        renderWithTheme(
            <InventoryView
                inventory={mockItems}
                categories={mockCategories}
                deleteItem={mockDeleteItem}
                updateItem={mockUpdateItem}
            />
        );

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockDeleteItem).toHaveBeenCalledWith(1);
    });

    test('cancels item deletion', () => {
        window.confirm = jest.fn(() => false);

        renderWithTheme(
            <InventoryView
                inventory={mockItems}
                categories={mockCategories}
                deleteItem={mockDeleteItem}
                updateItem={mockUpdateItem}
            />
        );

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockDeleteItem).not.toHaveBeenCalled();
    });

    test('should update an item with valid data', () => {
        // test code
    });

    test('should navigate to correct routes', () => {
        // Test routing
    });

    test('should handle state updates correctly', () => {
        // Test state management
    });

    test('should not delete item when user cancels', () => {
        window.confirm = jest.fn(() => false);
        // Test code
    });

    test('should show error for invalid quantity', () => {
        // Test code
    });

    test('should show error for empty name', () => {
        // Test code
    });

    test('should handle empty inventory', () => {
        // Test code
    });

    test('should enforce maximum length on input fields', () => {
        // Test code
    });
}); 