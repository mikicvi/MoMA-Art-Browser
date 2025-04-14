# MoMA Art Browser Client

This is the front-end React application for the MoMA Art Browser, a modern web application that allows users to browse, search, and manage artworks from the Museum of Modern Art collection.

## Features

-   Browse and search through MoMA artwork collection
-   Advanced search capabilities (by title, artist, year)
-   User authentication (login/register)
-   User profiles with purchased artworks
-   Image lightbox for artwork previews
-   Responsive design using Bootstrap
-   CRUD operations for artworks
-   Pagination for large datasets

## Technology Stack

-   React 19
-   Vite
-   React Router for navigation
-   Axios for API requests
-   Bootstrap 5 + Bootswatch Flatly theme
-   Bootstrap Icons

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Environment Setup

Make sure the corresponding backend server is running on port 3001 (or update the proxy settings in `vite.config.js` accordingly).

## Project Structure

-   `/src/components` - React components
-   `/src/contexts` - Context providers (Auth)
-   `/src/assets` - Static assets
-   `/src/styles` - CSS stylesheets

## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run lint` - Run ESLint
-   `npm run preview` - Preview production build locally
