const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');
const fs = require('fs').promises;
const artworksRouter = require('./routes/artworks');
const Artwork = require('./models/Artwork');

const app = express();
app.use(cors());
app.use(express.json());

// RESTful routes for artworks
app.use('/api/items', artworksRouter);

// Serve static assets if in production
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Start server & Connect to in-memory MongoDB
(async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        console.log('Connected to in-memory MongoDB');

        // Load artwork data from file
        const artworksPath = path.join(__dirname, '..', 'Artworks.json');
        const rawData = await fs.readFile(artworksPath, 'utf8');
        const artworks = JSON.parse(rawData);

        // Insert artworks if database is empty
        const existingArtworks = await Artwork.countDocuments();
        if (existingArtworks === 0) {
            await Artwork.insertMany(artworks);
            console.log(`Loaded ${artworks.length} artworks from Artworks.json`);
        }

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        if (err.code === 'ENOENT') {
            console.error('Artworks.json file not found in project root');
        }
        process.exit(1);
    }
})();