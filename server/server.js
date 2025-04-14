require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');
const fs = require('fs').promises;
const artworksRouter = require('./routes/artworks');
const usersRouter = require('./routes/users');
const Artwork = require('./models/Artwork');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes - must come before static file serving
app.use('/api/items', artworksRouter);
app.use('/api/users', usersRouter);

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

    // This must be last - catch all route for client-side routing
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
    });
}

// Start server & Connect to in-memory MongoDB
(async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        console.log('Connected to in-memory MongoDB');

        // Log after making MongoDB connection to verify JWT_SECRET is loaded
        console.log('JWT_SECRET is set:', !!process.env.JWT_SECRET);

        // Load artwork data from file or GitHub if local file doesn't exist
        const artworksPath = path.join(__dirname, '..', 'Artworks.json');
        let artworks;
        try {
            const rawData = await fs.readFile(artworksPath, 'utf8');
            artworks = JSON.parse(rawData);
            console.log('Loaded artworks from local file');
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('Artworks.json not found locally, fetching from GitHub...');
                const response = await fetch('https://media.githubusercontent.com/media/MuseumofModernArt/collection/main/Artworks.json');
                if (!response.ok) throw new Error('Failed to fetch from GitHub MoMA repository');
                artworks = await response.json();
                // Save the file locally for future use
                await fs.writeFile(artworksPath, JSON.stringify(artworks, null, 2));
                console.log('Downloaded and saved artworks from GitHub');
            } else {
                throw error;
            }
        }

        // Insert artworks if database is empty
        const existingArtworks = await Artwork.countDocuments();
        if (existingArtworks === 0) {
            await Artwork.insertMany(artworks);
            console.log(`Loaded ${artworks.length} artworks into database`);
        }

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Local URL: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();