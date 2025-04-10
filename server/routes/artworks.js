const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');

// GET all artworks
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 21;
        const skip = (page - 1) * limit;

        const items = await Artwork.find({})
            .skip(skip)
            .limit(limit);
        const total = await Artwork.countDocuments();

        res.json({
            items,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single artwork by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Artwork.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Artwork not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create new artwork
router.post('/', async (req, res) => {
    try {
        const newArtwork = new Artwork(req.body);
        const savedArtwork = await newArtwork.save();
        res.status(201).json(savedArtwork);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update existing artwork
router.put('/:id', async (req, res) => {
    try {
        const updatedArtwork = await Artwork.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedArtwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.json(updatedArtwork);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE remove artwork
router.delete('/:id', async (req, res) => {
    try {
        const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
        if (!deletedArtwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.json({ message: 'Artwork deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/items/search?title=...
router.get('/search/title', async (req, res) => {
    try {
        const titleQuery = req.query.q || '';
        // Simple partial match search
        const results = await Artwork.find({ Title: new RegExp(titleQuery, 'i') });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/search/advanced', async (req, res) => {
    try {
        const query = {};

        if (req.query.title) {
            query.Title = new RegExp(req.query.title, 'i');
        }

        if (req.query.artist) {
            // Search for artist in the array
            query.Artist = {
                $elemMatch: {
                    $regex: new RegExp(req.query.artist, 'i')
                }
            };
        }

        if (req.query.year) {
            // Search for year in the Date field
            query.Date = new RegExp(req.query.year, 'i');
        }

        const results = await Artwork.find(query);
        res.json(results);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;