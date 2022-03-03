const Suggestion = require('../models/suggestionSchema.js');
const History = require('../models/historySchema.js');
const Counter = require('../models/counterSchema.js');
const Deadline = require('../models/deadlineSchema.js');

module.exports = {
    name: 'suggestion',
    description: 'Accepts users\' suggestions for the next book of the month. 1 per user; new suggestions overwrite old ones.',
    async execute(message, args) {
        const title = args.slice(0, args.indexOf('by')).join(" ");
        const author = args.slice(args.indexOf('by') + 1, args.length).join(" ");
        const hist = await History.findOne({book: title});
        if (hist === null) {
            Suggestion.findOneAndUpdate({userId: message.author.id}, {userId: message.author.id, username: message.author.username, book: title, author: author}, {upsert: true}, (e) => {
                if (e === null) {
                    message.reply('What a wonderful choice! Let me just make a note of that.');
                } else {
                    message.reply(e);
                }
            });
        } else {
            message.reply("Oops! Looks like we've already read that one. Use *!history* to see all the books we've read in the past.");
        }
    }
}