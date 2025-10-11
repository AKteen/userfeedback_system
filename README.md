# User Feedback Management System

A full-stack web application for managing user feedback through dynamic form templates with role-based access control.

## Features

- **Dynamic Form Builder**: Create custom feedback forms with various field types
- **Role-Based Access**: Different interfaces for SuperAdmin, Admin, and User roles
- **Real-time Form Management**: Create, view, and delete form templates
- **Response Collection**: Store and manage form responses
- **Modern UI**: React-based frontend with responsive design

## Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Security & Authentication
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-async-handler** - Async error handling

## Project Structure

```
newUserfeed/
├── src/
│   ├── components/
│   │   ├── Admin/          # Admin dashboard
│   │   ├── Login/          # Authentication
│   │   ├── Sidebar/        # Navigation
│   │   ├── SuperAdmin/     # SuperAdmin interface
│   │   └── User/           # User interface
│   ├── server/
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Custom middleware
│   │   ├── db.js          # Database connection
│   │   └── server.js      # Express server
│   ├── App.jsx            # Main React component
│   └── main.jsx           # React entry point
├── public/                # Static assets
└── package.json          # Dependencies
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newUserfeed
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Default connection: `mongodb://localhost:27017/testing`

4. **Environment Setup**
   - Create `.env` file for environment variables
   - Configure database URL and JWT secrets

## Usage

### Development

1. **Start the backend server**
   ```bash
   node src/server/server.js
   ```
   Server runs on port 5000

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   Frontend runs on Vite's default port

### Production

```bash
npm run build
npm run preview
```

## API Endpoints

### Templates
- `POST /template` - Create new form template
- `GET /template` - Fetch all templates
- `DELETE /template` - Delete all templates

### Responses
- Form response endpoints (configured in responseRoutes.js)

## Form Field Types

- Text
- Textarea
- Options (dropdown)
- Radio buttons
- Number
- Email

## User Roles

- **SuperAdmin**: Full system access
- **Admin**: Template and response management
- **User**: Form submission and viewing

## Dependencies

### Production
- axios, bcrypt, cors, dotenv, express, express-async-handler
- helmet, jsonwebtoken, mongodb, mongoose
- react, react-dom, react-router-dom

### Development
- @vitejs/plugin-react, eslint, vite (rolldown-vite)
- TypeScript definitions for React

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

Private project