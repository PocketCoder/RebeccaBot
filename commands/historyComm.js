const Suggestion = require('../models/suggestionSchema.js');
const History = require('../models/historySchema.js');
const Counter = require('../models/counterSchema.js');
const Deadline = require('../models/deadlineSchema.js');

module.exports = {
    name: 'history',
    description: '',
    async execute(message, args) {
        const history = await History.find({}).exec();
        var reply = 'So far we\'ve read:\n'
        history.forEach((e, i) => {
            reply += `${e.book} by ${e.author} (${e.date} | ${e.username})\n`
        });
        message.reply(reply);
    }
}