const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    username: mongoose.SchemaTypes.String,
    counter: mongoose.SchemaTypes.Number
});

module.exports = mongoose.model('Counter', counterSchema);