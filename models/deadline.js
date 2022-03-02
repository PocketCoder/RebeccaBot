const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
    date: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    dateString: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

module.exports = mongoose.model('Deadline', deadlineSchema);