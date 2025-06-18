import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditItemForm from '../../components/EditItemForm';

const theme = createTheme();

const renderWithTheme = (component) => {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

describe('EditItemForm', () => {
    const mockItem = {
        id: 1,
        name: 'Test Item',
        categoryId: 1,
        quantity: 5
    };

    const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' }
    ];

    const mockUpdateItem = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form with initial values', () => {
        renderWithTheme(
            <EditItemForm
                item={mockItem}
                categories={mockCategories}
                updateItem={mockUpdateItem}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByLabelText('Item Name')).toHaveValue('Test Item');
        expect(screen.getByRole('combobox', { name: 'Category' })).toHaveTextContent('Category 1');
        expect(screen.getByLabelText('Quantity')).toHaveValue(5);
    });

    it('updates an item with valid data', () => {
        renderWithTheme(
            <EditItemForm
                item={mockItem}
                categories={mockCategories}
                updateItem={mockUpdateItem}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.change(screen.getByLabelText('Item Name'), { target: { value: 'Updated Item' } });
        fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Category' }));
        fireEvent.click(screen.getByText('Category 2'));
        fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '10' } });

        fireEvent.click(screen.getByText('Update Item'));

        expect(mockUpdateItem).toHaveBeenCalledWith({
            id: 1,
            name: 'Updated Item',
            categoryId: 2,
            quantity: 10
        });
        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('handles empty submission', () => {
        renderWithTheme(
            <EditItemForm
                item={mockItem}
                categories={mockCategories}
                updateItem={mockUpdateItem}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.change(screen.getByLabelText('Item Name'), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '0' } });

        fireEvent.click(screen.getByText('Update Item'));

        expect(mockUpdateItem).not.toHaveBeenCalled();
        expect(screen.getByText('Item name is required')).toBeInTheDocument();
        expect(screen.getByText('Quantity must be a valid number at least 1')).toBeInTheDocument();
    });

    it('calls onCancel when cancel button is clicked', () => {
        renderWithTheme(
            <EditItemForm
                item={mockItem}
                categories={mockCategories}
                updateItem={mockUpdateItem}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockOnCancel).toHaveBeenCalled();
        expect(mockUpdateItem).not.toHaveBeenCalled();
    });

    it('does not allow whitespace-only name', () => {
        renderWithTheme(
            <EditItemForm
                item={mockItem}
                categories={mockCategories}
                updateItem={mockUpdateItem}
                onCancel={mockOnCancel}
            />
        );
        fireEvent.change(screen.getByLabelText('Item Name'), { target: { value: '   ' } });
        fireEvent.click(screen.getByText('Update Item'));
        expect(mockUpdateItem).not.toHaveBeenCalled();
        expect(screen.getByText('Item name is required')).toBeInTheDocument();
    });

    it('does not allow negative or zero quantity', () => {
        renderWithTheme(
            <EditItemForm
                item={mockItem}
                categories={mockCategories}
                updateItem={mockUpdateItem}
                onCancel={mockOnCancel}
            />
        );
        fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '0' } });
        fireEvent.click(screen.getByText('Update Item'));
        expect(mockUpdateItem).not.toHaveBeenCalled();
        expect(screen.getByText('Quantity must be a valid number at least 1')).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '-3' } });
        fireEvent.click(screen.getByText('Update Item'));
        expect(mockUpdateItem).not.toHaveBeenCalled();
        expect(screen.getByText('Quantity must be a valid number at least 1')).toBeInTheDocument();
    });
}); 