const Suggestion = require('../models/suggestionSchema.js');
const History = require('../models/historySchema.js');
const Counter = require('../models/counterSchema.js');
const Deadline = require('../models/deadlineSchema.js');

module.exports = {
    name: 'list',
    description: '',
    async execute(message, args) {
        const list = await Suggestion.find({}).exec();
        var reply = 'Well, from what I can see we have these wonderful choices:\n';
        list.forEach((e, i) => {
            i += 1;
            reply += `${i}) ${e.book} by ${e.author}, suggested by ${e.username}\n`;
        });
        message.reply(reply);
    }
}