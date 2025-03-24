const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    Title: String,
    Artist: [String],
    ArtistBio: [String],
    Nationality: [String],
    BeginDate: [Number],
    EndDate: [Number],
    Gender: [String],
    Date: String,
    Medium: String,
    Dimensions: String,
    CreditLine: String,
    AccessionNumber: String,
    Classification: String,
    Department: String,
    DateAcquired: String,
    Cataloged: String,
    ObjectID: Number,
    URL: String,
    ImageURL: String,
    OnView: String,
    // Example numeric fields
    "Height (cm)": Number,
    "Width (cm)": Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Artwork', ArtworkSchema);