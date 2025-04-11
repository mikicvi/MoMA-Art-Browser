const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Artwork = require('../models/Artwork');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Use environment variable or fallback for testing
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

//Registers a new user, hashes the password, and saves the user to the database.
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//Logs in a user by verifying the email and password, and returns a JWT token if valid.
router.post('/login', async (req, res) => {
    // Check user, verify password, and return JWT token
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// Purchase artwork
router.post('/:userId/purchase/:artworkId', authenticateToken, async (req, res) => {
    try {
        const { userId, artworkId } = req.params;

        // Verify user owns the request
        if (req.user.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const artwork = await Artwork.findById(artworkId);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }

        if (artwork.purchased) {
            return res.status(400).json({ message: 'Artwork already purchased' });
        }

        // Update artwork purchase status
        artwork.purchased = true;
        artwork.purchasedBy = userId;
        await artwork.save();

        // Add to user's purchases
        const user = await User.findById(userId);
        if (!user.purchasedArtworks) {
            user.purchasedArtworks = [];
        }
        user.purchasedArtworks.push(artworkId);
        await user.save();

        res.json({ message: 'Artwork purchased successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing artwork' });
    }
});

// Get purchased artworks
router.get('/:userId/purchased', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('purchasedArtworks');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.purchasedArtworks || []);
    } catch (error) {
        console.error('Error fetching purchased artworks:', error);
        res.status(500).json({ message: 'Error fetching purchased artworks' });
    }
});

// Cancel purchase
router.post('/:userId/purchases/:artworkId/cancel', authenticateToken, async (req, res) => {
    try {
        const { userId, artworkId } = req.params;

        // Verify user owns the request
        if (req.user.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const artwork = await Artwork.findById(artworkId);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }

        if (!artwork.purchased || artwork.purchasedBy.toString() !== userId) {
            return res.status(400).json({ message: 'You do not own this artwork' });
        }

        // Reset artwork purchase status
        artwork.purchased = false;
        artwork.purchasedBy = null;
        await artwork.save();

        // Remove from user's purchases
        const user = await User.findById(userId);
        user.purchasedArtworks = user.purchasedArtworks.filter(id => id.toString() !== artworkId);
        await user.save();

        res.json({ message: 'Purchase cancelled successfully' });
    } catch (error) {
        console.error('Cancel purchase error:', error);
        res.status(500).json({ message: 'Error cancelling purchase' });
    }
});

module.exports = router;
