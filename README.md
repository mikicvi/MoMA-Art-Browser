# MoMA Art Browser

A modern art catalogue application built with Node.js, Express, MongoDB, and React.

## Setup & Installation

Clone the repository and ensure you have Node.js installed on your system. The development was done using the latest LTS Node.js as the time - v22.14.0. However, it should work with any version of Node.js >= 16.

## Running the Application

There are two ways to run the application:

### Method 1: Production Mode (Backend Serving Frontend)

1. Build the client first:

```bash
cd client
npm install
npm run build
```

2. Start the server:

```bash
cd ../server
npm install
npm run start
```

The application will be available at http://localhost:3001

### Method 2: Development Mode (Separate Frontend & Backend) with Hot Reloading

1. Start the frontend development server:

```bash
cd client
npm install
npm run dev
```

2. In a new terminal, start the backend server:

```bash
cd server
npm install
npm run dev
```

Frontend will be available at http://localhost:5173
Backend API will be available at http://localhost:3001

## Notes

-   The application uses an in-memory MongoDB instance, so no external database setup is required, but the data will be lost when the server restarts
-   The first startup might take longer as it downloads the MoMA artwork dataset
-   For development mode, the frontend will proxy API requests to the backend automatically
