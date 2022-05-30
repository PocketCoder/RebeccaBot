const Suggestion = require('../models/suggestionSchema.js');
const History = require('../models/historySchema.js');
const {listenerCoun} = require('../models/suggestionSchema.js');

module.exports = {
    name: 'shuffle',
    description: '',
    async execute(message, args, client) {
        if (message.member.roles.cache.has('948945232316227654') || message.member.roles.cache.has('948951761744437288')) {
            const list = await Suggestion.find({}).exec();
            const choice = Math.floor(Math.random() * list.length);
            // choice = list[choice]
            const obj = list[choice];
            const msg = await message.reply(`Hmmm...I think we should read _${obj.book} by ${obj.author}_, what do you think?`);
            const filter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.member.id;
            };
            const collector = msg.createReactionCollector({ filter, max: 1 });
            collector.on('collect', (reaction, user) => {
                console.log('Collected');
            });
            collector.on('end', async collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '👍') {
                    message.reply(`@everyone: This month's book is _${obj.book} by ${obj.author}_! As suggested by @${obj.username}.`);
                    const date = `${new Date().getMonth().toString()}/${new Date().getFullYear().toString()}`;
                    const bom = new History({
                        userId: obj.userId,
                        username: obj.username,
                        book: obj.book,
                        author: obj.author,
                        date: date
                    });
                    await bom.save();
                    await Suggestion.deleteOne({
                        userId: obj.userId
                    });
                }
                else {
                    message.reply('Oh, ok :( Run the command again for a different result!');
                }
            });
        } else {
            message.reply('Sorry, you don\'t have permission to do that.');
        }
    }
}