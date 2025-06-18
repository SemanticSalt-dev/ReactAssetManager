import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../testUtils';
import ManageCategories from '../../components/ManageCategories';

describe('ManageCategories', () => {
    const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' }
    ];

    const mockDeleteCategory = jest.fn();
    const mockUpdateCategory = jest.fn();

    beforeEach(() => {
        mockDeleteCategory.mockClear();
        mockUpdateCategory.mockClear();
    });

    test('renders category list', () => {
        renderWithTheme(
            <ManageCategories
                categories={mockCategories}
                deleteCategory={mockDeleteCategory}
                updateCategory={mockUpdateCategory}
            />
        );

        expect(screen.getByText('Manage Categories')).toBeInTheDocument();
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
    });

    test('enters edit mode when edit button is clicked', () => {
        renderWithTheme(
            <ManageCategories
                categories={mockCategories}
                deleteCategory={mockDeleteCategory}
                updateCategory={mockUpdateCategory}
            />
        );

        const editButtons = screen.getAllByLabelText('editCategory');
        fireEvent.click(editButtons[0]);

        expect(screen.getByDisplayValue('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Update')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('updates category when update button is clicked', () => {
        renderWithTheme(
            <ManageCategories
                categories={mockCategories}
                deleteCategory={mockDeleteCategory}
                updateCategory={mockUpdateCategory}
            />
        );

        // Enter edit mode
        const editButtons = screen.getAllByLabelText('editCategory');
        fireEvent.click(editButtons[0]);

        // Change category name
        const input = screen.getByDisplayValue('Category 1');
        fireEvent.change(input, { target: { value: 'Updated Category' } });

        // Click update
        fireEvent.click(screen.getByText('Update'));

        expect(mockUpdateCategory).toHaveBeenCalledWith({
            id: 1,
            name: 'Updated Category'
        });
    });

    test('cancels edit mode when cancel button is clicked', () => {
        renderWithTheme(
            <ManageCategories
                categories={mockCategories}
                deleteCategory={mockDeleteCategory}
                updateCategory={mockUpdateCategory}
            />
        );

        // Enter edit mode
        const editButtons = screen.getAllByLabelText('editCategory');
        fireEvent.click(editButtons[0]);

        // Click cancel
        fireEvent.click(screen.getByText('Cancel'));

        expect(screen.queryByDisplayValue('Category 1')).not.toBeInTheDocument();
        expect(screen.getByText('Category 1')).toBeInTheDocument();
    });

    test('deletes category when confirmed', () => {
        window.confirm = jest.fn(() => true);

        renderWithTheme(
            <ManageCategories
                categories={mockCategories}
                deleteCategory={mockDeleteCategory}
                updateCategory={mockUpdateCategory}
            />
        );

        const deleteButtons = screen.getAllByLabelText('deleteCategory');
        fireEvent.click(deleteButtons[0]);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockDeleteCategory).toHaveBeenCalledWith(1);
    });

    test('does not delete category when not confirmed', () => {
        window.confirm = jest.fn(() => false);

        renderWithTheme(
            <ManageCategories
                categories={mockCategories}
                deleteCategory={mockDeleteCategory}
                updateCategory={mockUpdateCategory}
            />
        );

        const deleteButtons = screen.getAllByLabelText('deleteCategory');
        fireEvent.click(deleteButtons[0]);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockDeleteCategory).not.toHaveBeenCalled();
    });

    test('does not update category with empty name', () => {
        renderWithTheme(
            <ManageCategories
                categories={mockCategories}
                deleteCategory={mockDeleteCategory}
                updateCategory={mockUpdateCategory}
            />
        );

        // Enter edit mode
        const editButtons = screen.getAllByLabelText('editCategory');
        fireEvent.click(editButtons[0]);

        // Clear category name
        const input = screen.getByDisplayValue('Category 1');
        fireEvent.change(input, { target: { value: '   ' } });

        // Click update
        fireEvent.click(screen.getByText('Update'));

        expect(mockUpdateCategory).not.toHaveBeenCalled();
        expect(input.value).toBe('   ');
    });
}); 