const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    purchasedArtworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork'
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastUser = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastUser ? lastUser.id + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);