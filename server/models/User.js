const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    purchasedArtworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastUser = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastUser ? lastUser.id + 1 : 1;
    }
    next();
});


module.exports = mongoose.model('User', UserSchema);