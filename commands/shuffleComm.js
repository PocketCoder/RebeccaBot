const Suggestion = require('../models/suggestionSchema.js');
const History = require('../models/historySchema.js');
const Counter = require('../models/counterSchema.js');
const Deadline = require('../models/deadlineSchema.js');
const { listenerCount } = require('../models/suggestionSchema.js');

module.exports = {
    name: 'shuffle',
    description: '',
    async execute(message, args) {
        // TODO: Make a Mod only command
        // TODO: Make it cleaner. There has to be a better way.
        const list = await Suggestion.find({}).exec();
        const counters = await Counter.find({}).exec();
        var lowest = counters[0].count;
        await counters.forEach(e => {
            var curr = e.count;
            if (curr < lowest) {
                lowest = curr;
            }
        });
        var lowArray = [];
        await counters.forEach(e => {
            if (e.count === lowest) {
                lowArray.push(e);
            }
        });
        var choices = [];
        await list.forEach((e, i) => {
            lowArray.forEach(l => {
                if (e.userId === l.userId) {
                    choices.push(e);
                }
            })
        });
        const choice = Math.floor(Math.random() * choices.length);
        const date = `${new Date().getMonth().toString()}/${new Date().getFullYear().toString()}`;
        const bom = new History({
            userId: choices[choice].userId,
            username: choices[choice].username,
            book: choices[choice].book,
            author: choices[choice].author,
            date: date
        });
        await bom.save();
        var newCounter;
        const currCounter = await Counter.findOne({
            userId: choices[choice].userId
        }).exec();
        if (currCounter != null) {
            newCounter = currCounter.count + 1;
        } else {
            newCounter = 1;
        }
        await Counter.findOneAndUpdate({
            userId: choices[choice].userId
        }, {
            username: choices[choice].username,
            count: newCounter
        }, {
            upsert: true
        });
        message.reply(`This month's book is ${choices[choice].username}'s choice: ${choices[choice].book} by ${choices[choice].author}!`);
        await Suggestion.deleteOne({userId: choices[choice].userId});
    }
}