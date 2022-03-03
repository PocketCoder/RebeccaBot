const Suggestion = require('../models/suggestionSchema.js');
const History = require('../models/historySchema.js');
const Counter = require('../models/counterSchema.js');
const Deadline = require('../models/deadlineSchema.js');

module.exports = {
    name: 'shuffle',
    description: '',
    async execute(message, args) {
                // TODO: Make a Mod only command
        // TODO: Cycle through suggestions:
            // TODO: If user has no counter, make one and make zero.
            // TODO: Else, get counter
            // TODO: ARRAY: Get lowest counter number and get others with that number
            // TODO: Random from that array
            const list = await Suggestion.find({}).exec();
            const counts = await Counter.find({}).exec();
            /*
                Returns:
                [
                    {
                        _id: new ObjectId("621ff25129cb70d41e02d2b5"),
                        userId: '940629674831253534',
                        __v: 0,
                        count: 2
                    },
                    {
                        _id: new ObjectId("621ff40e29cb70d41e088684"),
                        userId: '2',
                        __v: 0,
                        count: 1
                    }
                ]
            */
           var lowestCountUsers = [];
           counts.forEach(e => {
               // e: element
           });
            const choice = Math.floor(Math.random() * list.length);
            const date = `${new Date().getMonth().toString()}/${new Date().getFullYear().toString()}`;
            const bom = new History({
                userId: list[choice].userId,
                username: list[choice].username,
                book: list[choice].book,
                author: list[choice].author,
                date: date
            });
            await bom.save();
            var newCounter;
            const currCounter = await Counter.findOne({userId: list[choice].userId}).exec();
            if (currCounter != null) {
                newCounter = currCounter.count + 1;
            } else {
                newCounter = 1;
            }
            await Counter.findOneAndUpdate({userId: list[choice].userId}, {username: list[choice].username, count: newCounter}, {upsert: true});
            message.reply(`This month's book is ${list[choice].username}'s choice: ${list[choice].book} by ${list[choice].author}!`);
    }
}