const Books = require('../booksAPI.js');
const Discord = require('discord.js');

module.exports = {
    name: 'also',
    description: '',
    async execute(message, args) {
        if (args.length === 0) {
            message.reply('Please add some information! \`!author <author name>\`');
        } else {
            const author = args.join(" ");
            const data = await Books.Author(author);
            if (data === []) {
                message.reply('Sorry, I couldn\'t find any entries by that author.');
            } else {
                const alsoEmbed = new Discord.MessageEmbed()
                    .setTitle(`Books written by ${author}`)
                    .setTimestamp()
                    .setFooter({
                        text: 'Is this wrong? Message @lactaselacking'
                    });
                for (i in data) {
                    alsoEmbed.addFields({name: data[i].title, value: data[i].published});
                }
                message.channel.send({
                    embeds: [alsoEmbed]
                });
            }
        }
    }
}