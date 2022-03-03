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
            if (message.member.roles.cache.has('948945232316227654') || message.member.roles.cache.has('948951761744437288')) {
                const contents = await Deadline.find({});
                contents.forEach(async (o) => {
                    await Deadline.deleteOne({
                        _id: o._id
                    });
                });
                const dateReg = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g);
                if (dateReg.test(args[0])) {
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
                    message.reply('Sorry, that date is invalid. Please try again with the format DD/MM/(YY)YY');
                }
            } else {
                message.reply('Sorry, you don\'t have permission to do that.');
            }
        }
    }
}