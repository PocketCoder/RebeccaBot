const Suggestion = require('../models/suggestionSchema.js');
const History = require('../models/historySchema.js');
const Counter = require('../models/counterSchema.js');
const Deadline = require('../models/deadlineSchema.js');

module.exports = {
    name: 'deadline',
    description: '',
    async execute(message, args) {
        if (args.length === 0) {
            const deadline = await Deadline.find({});
            if (deadline[0] != null) {
                const dc = deadline[0].dateString.split('/');
                // TODO: Fix days until.
                const until = deadline[0].date.getTime() - new Date().getTime();
                const days = Math.floor(until / (1000 * 3600 * 24));
                message.reply(`The next meeting will be on **${dc[0]}/${dc[1]}**. That gives you **${days} days**.`);
            } else {
                message.reply("Hmmm, there doesn't seem to be a deadline yet. Listen out for further announcements from the moderator. In the meantime, keep reading!");
            }
        } else {
            if (message.member.roles.cache.some(r => r.name === "Mod" || "manager")) {
                const contents = await Deadline.find({});
                contents.forEach(async (o) => {
                    await Deadline.deleteOne({
                        _id: o._id
                    });
                });
                var dc = args[0].split('/');
                dc.map(x => {
                    x = x.valueOf();
                });
                dc[1] = dc[1] - 1; // Because January is 0!
                const deadline = new Date(dc[2], dc[1], dc[0]);
                message.reply(`Ok, listen up @everyone. You've got until **${dc[0]}/${dc[1]+1}** to read this month's book. Ready...Set...Go!`);
                await new Deadline({
                    date: deadline,
                    dateString: args[0]
                }).save();
            } else {
                message.reply('Sorry, you don\'t have permission to do that.');
            }
        }
    }
}