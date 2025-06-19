# Inventory Management System

A full-stack React application with PostgreSQL backend for managing inventory items and categories.

## Features

- ✅ Add, edit, and delete inventory items
- ✅ Manage categories with validation
- ✅ Search and filter functionality
- ✅ Responsive Material-UI design
- ✅ Comprehensive test coverage
- ✅ PostgreSQL database backend
- ✅ RESTful API
- ✅ Error handling and validation

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- React Toastify
- Jest & Testing Library

### Backend
- Node.js & Express
- PostgreSQL
- CORS & Helmet for security
- Rate limiting

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE inventory_db;
```

2. Run the schema setup:
```bash
psql -d inventory_db -f server/database/schema.sql
```

### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Update `.env` with your database credentials:
```env
DB_USER=your_username
DB_HOST=localhost
DB_NAME=inventory_db
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001/api`

### 3. Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp env.example .env
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Inventory
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Create a new inventory item
- `PUT /api/inventory/:id` - Update an inventory item
- `DELETE /api/inventory/:id` - Delete an inventory item

## Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
cd server
npm test
```

### Coverage Report
```bash
npm run test:coverage
```

## Database Schema

### Categories Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(50) UNIQUE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Inventory Items Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(100))
- `category_id` (INTEGER REFERENCES categories(id))
- `quantity` (INTEGER CHECK > 0)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Migration from localStorage

This application has been migrated from localStorage to PostgreSQL:

### Benefits
- **Data Persistence**: Data survives browser restarts
- **Multi-user Support**: Multiple users can access the same data
- **Data Integrity**: Foreign key constraints prevent orphaned records
- **Scalability**: Can handle much larger datasets
- **Backup & Recovery**: Database backups and point-in-time recovery
- **Advanced Queries**: Complex reporting and analytics capabilities

### Changes Made
1. **API Service Layer**: Created `src/services/api.js` for API communication
2. **Async State Management**: Updated App component to handle async operations
3. **Error Handling**: Added comprehensive error handling for API calls
4. **Loading States**: Added loading indicators for better UX
5. **Backend API**: Full RESTful API with PostgreSQL integration
6. **Security**: Added CORS, rate limiting, and input validation

## Deployment

### Backend Deployment
1. Set up a PostgreSQL database (e.g., AWS RDS, Heroku Postgres)
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, AWS, DigitalOcean)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Configure the API URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License
