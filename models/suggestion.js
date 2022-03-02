const mongoose = require('mongoose');

const suggestSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    book: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

module.exports = mongoose.model('Suggestion', suggestSchema);