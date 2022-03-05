const Synopsis = require('../booksAPI.js');
const Discord = require('discord.js');

module.exports = {
    name: 'synopsis',
    description: 'Replies with an embed with a description of the book and the cover.',
    async execute(message, args) {
        if (args.length === 0) {
            message.reply(`Error.`);
        } else {
            const sugReg = new RegExp(/((\w\s)?(\w)+)+(\s\w[by]\s)((\w)+(\s\w)?)+/g);
            if (sugReg.test(args.join(" "))) {
                const title = args.slice(0, args.indexOf('by')).join(" ");
                const author = args.slice(args.indexOf('by') + 1, args.length).join(" ");
                const data = await Synopsis(title, author);
                const synopsisEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`A synopsis for ${title} by ${author}`)
                    //.setURL(data.url)
                    /*.setAuthor({
                        name: 'Rebecca',
                        iconURL: 'https://i.imgur.com/DClYnjk.jpg',
                        url: 'https://110399.xyz'
                    })*/
                    .setDescription(data.desc)
                    //.setThumbnail(data.cover)
                    .setImage(data.cover)
                    .addFields(
                        {
                            name: 'Published',
                            value: data.pubDate,
                            inline: true
                        }, {
                            name: 'No. Pages',
                            value: data.pages,
                            inline: true
                        }, {
                            name: 'ISBN',
                            value: data.isbn,
                            inline: true
                        })
                    .setTimestamp()
                    .setFooter({
                        text: 'Is this wrong? Message @lactaselacking'
                    });

                message.channel.send({
                    embeds: [synopsisEmbed]
                });
            } else {
                message.reply('Sorry, that doesn\'t seem to be a complete request. Make sure you pass your suggestion as <book title> by <book author>');
            }
        }
    }
}