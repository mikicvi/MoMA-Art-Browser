const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Artist: [{
        type: String
    }],
    Date: {
        type: String
    },
    ImageURL: {
        type: String
    },
    purchased: {
        type: Boolean,
        default: false
    },
    purchasedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

module.exports = mongoose.model('Item', itemSchema);