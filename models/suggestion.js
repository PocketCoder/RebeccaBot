const mongoose = require('mongoose');

const suggestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    username: mongoose.SchemaTypes.String,
    book: mongoose.SchemaTypes.String,
    author: mongoose.SchemaTypes.String
});

module.exports = mongoose.model('Suggestion', suggestSchema);