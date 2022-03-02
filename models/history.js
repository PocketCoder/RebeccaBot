const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    book: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    date: {
        type: mongoose.SchemaTypes.Date,
        required: true
    }
});

module.exports = mongoose.model('History', historySchema);