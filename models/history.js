const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
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
    },
    date: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

module.exports = mongoose.model('History', historySchema);