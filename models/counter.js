const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    count: mongoose.SchemaTypes.Number
});

module.exports = mongoose.model('Counter', counterSchema);