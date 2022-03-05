const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Replies with a list of commands',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('What can I do?')
            .setColor('#B83D43')
            .addFields({
                name: '\`!suggestion\ (<book title> by <author> || <empty>)`',
                value: 'Accepts suggestions for the next book of the month.\n1 per user. New suggestions overwrite old ones. If empty, returns your current suggestion.'
            }, {
                name: '\`!list\`',
                value: 'Replies with a list of all the current suggestions.'
            }, {
                name: '\`!history\`',
                value: 'Replies with a list of the books chosen in the past, on what date, and by whom.'
            }, {
                name: '\`!synopsis <book title> by <author>\`',
                value: 'Replies with a synopsis of the passed book, pulled from Google Books.'
            }, {
                name: '\`!deadline (<empty> || <date>\)`',
                value: 'If empty, it replies with the deadline to read this month\'s book.\nMod only: Sets the new deadline.'
            }, {
                name: '\`!shuffle\`',
                value: 'Mod only: Selects the new book of the month.'
            }, {
                name: '\`!help\`',
                value: 'Replies with this message.'
            })
            .setTimestamp();

        message.channel.send({embeds: [embed]});
    }
}