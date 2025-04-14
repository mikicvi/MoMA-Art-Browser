# Art Gallery Server

A Node.js/Express server application that manages artwork data and user interactions using MongoDB in-memory storage.

## Features

- In-memory MongoDB database using mongodb-memory-server
- RESTful API endpoints for artworks and users
- JWT-based authentication
- Automatic artwork data loading from MoMA collection
- Rate limiting for user registration
- CORS support
- Production-ready static file serving

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables in .env:
```
JWT_SECRET=your-super-secret-jwt-key-2024
PORT=3001 # optional, defaults to 3001
NODE_ENV=development # or production
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Artworks
- `GET /api/items` - Get paginated artworks
- `GET /api/items/:id` - Get single artwork
- `GET /api/items/search/title` - Search artworks by title
- `GET /api/items/search/advanced` - Advanced search with filters
- `POST /api/items` - Create new artwork
- `PUT /api/items/:id` - Update artwork
- `DELETE /api/items/:id` - Delete artwork

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/:userId/purchase/:artworkId` - Purchase artwork
- `GET /api/users/:userId/purchased` - Get user's purchased artworks
- `POST /api/users/:userId/purchases/:artworkId/cancel` - Cancel purchase

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Data Loading

The server automatically loads artwork data from:
1. Local Artworks.json file if available
2. MoMA GitHub repository if local file doesn't exist