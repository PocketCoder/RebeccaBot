const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    count: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
});

module.exports = mongoose.model('Counter', counterSchema);