# Inventory Management System

This is a React based application for managing personal inventory. It allows users to add items and categories, and view/delete inventory. Future development includes database integration, user authentication, and enhanced search/filtering.

This application was developed with a strong commitment to understanding each line of code. All code was hand-typed, and extensive research and questioning ensured complete comprehension.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Folder Structure](#folder-structure)
-   [Future Enhancements](#future-enhancements)
-   [Author](#author)

## Features <a name="features"></a>

-   Add and view inventory items.
-   Categorize items for better organization.
-   User-friendly interface with material-UI.
-   Form validation to ensure data integrity.
-   Local storage for data persistence.
-   Clear notifications for user feedback.

## Technologies Used <a name="technologies-used"></a>

-  React
-  React Router DOM
-  Material UI (@mui/material)
-  React Toastify (for notifications)
-  JavaScript (ES6+)
-  CSS

## Installation <a name="installation"></a>

1.  Clone the repository.

    ```bash
    git clone <your-repository-url>
    ```

2.  Navigate to the project directory.

    ```bash
    cd <your-project-directory>
    ```

3.  Install Dependencies.

    ```bash
    npm install
    ```

## Usage <a name="usage"></a>

1.  Start the development server.

    ```bash
    npm start
    ```

2.  Open your browser and navigate to `http://localhost:3000` (or the address shown in your terminal).

-   **Adding Items:** Go to the "Add Item" page to add new inventory items.
-   **Adding Categories:** Go to the "Add Category" page to create new categories.
-   **Viewing Inventory:** The main page ("/") displays the current inventory.
-   **Deleting Items:** Click the "Delete" button next to an item to remove it.

## Folder Structure <a name="folder-structure"></a>

src/
├── components/
│   ├── AddCategoryForm.js // Form for adding new categories.
│   ├── AddItemForm.js    // Form for adding new inventory items.
│   ├── InventoryView.js // Displays the list of inventory items.
│   ├── NavBar.js       // Navigation bar component.
│   └── styles/        // CSS styles for components.
│       ├── AddCategoryForm.css
│       ├── AddItemForm.css
│       ├── InventoryView.css
│       └── NavBar.css
├── App.js      // Main application component with routing.
├── index.js    // Entry point of the application.
└── ... (other files)

-   `components/`: Contains reusable React components.
-   `styles/`: Contains CSS files for component styling.
-   `App.js`: The main application component, sets up routing.
-   index.js: The entry point of the React application.

## Future Enhancements <a name="future-enhancements"></a>

-   Implement item editing functionality.
-   Add user authentication (e.g., Google Sign-In).
-   Implement filtering and searching of inventory.
-   Connect to a backend database (e.g., PostgreSQL).
-   Add more detailed item information (e.g., description, images).
-   Improve UI/UX with additional Material UI components.
-   Unit testing.

## Author <a name="author"></a>

Matthew Jenkins
[Contact me via email](mailto:mjenkins87@live.com)
[SemanticSalt-dev](https://github.com/SemanticSalt-dev)
