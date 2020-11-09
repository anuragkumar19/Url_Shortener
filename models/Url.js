const mongoose = require('mongoose');
const shortid = require('shortid');

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },

    urlCode: {
        type: String,
        required: true,
        unique: [
            true,
            'Opps! Something went wrong on server side please try again.',
        ],
        default: shortid.generate,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Url', UrlSchema);
