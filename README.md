# Customer Management Dashboard

A simple full-stack web application for managing customers with add, view, and delete functionality.

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express.js
- **Storage**: In-memory (array)

## Project Structure

```
customer-dashboard/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── components/
│           ├── CustomerForm.jsx
│           ├── CustomerForm.css
│           ├── CustomerTable.jsx
│           └── CustomerTable.css
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customers` | Get all customers |
| POST | `/customers` | Add a new customer |
| DELETE | `/customers/:id` | Delete a customer |

### Request/Response Examples

#### GET /customers
```json
{
  "customers": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    }
  ],
  "count": 1
}
```

#### POST /customers
Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

Response:
```json
{
  "message": "Customer added successfully",
  "customer": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

#### DELETE /customers/:id
```json
{
  "message": "Customer deleted successfully",
  "customer": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. **Clone the repository**

2. **Install backend dependencies**
   ```bash
   cd customer-dashboard/backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd customer-dashboard/frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (runs on port 5000)
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend** (runs on port 3000)
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Features

- **Add Customer**: Fill in the form with name, email, and phone number
- **View Customers**: See all customers in a responsive table
- **Delete Customer**: Remove customers with one click
- **Validation**: Form validation for all fields
- **Responsive Design**: Works on desktop and mobile devices

## Error Handling

- Input validation on both frontend and backend
- Email format validation
- Required field validation
- User-friendly error messages
