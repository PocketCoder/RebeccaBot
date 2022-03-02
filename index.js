const Discord = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');

const Suggestion = require('./models/suggestion.js');
const History = require('./models/history.js');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix = "!";

client.once("ready", (e) => {
    console.log("She is awake.");

    mongoose.connect(config.MDBsrv || process.env.MDBsrv, {
        //useNewUrlParser = true,
        //useUnifiedTopology = true,
        //useFindAndModify = false
    }).then(() => {
        console.log("I can see it all.");
    }).catch((err) => {
        console.log(err);
    });
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'suggestion') {
        const title = args.slice(0, args.indexOf('by')).join(" ");
        const author = args.slice(args.indexOf('by') + 1, args.length).join(" ");
        Suggestion.findOneAndUpdate({userId: message.author.id}, {username: message.author.username, book: title, author: author}, {upsert: true}, (e) => {
            if (e === null) {
                message.reply('Got it, saved it.');
            } else {
                message.reply(e);
            }
        });
    } else if (command === 'list') {
        const list = await Suggestion.find({}).exec();
        var reply = 'Well, from what I can see we have:\n';
        list.forEach((e, i) => {
            i += 1;
            reply += `[${i}] ${e.book} by ${e.author}, suggested by ${e.username}\n`;
        });
        message.reply(reply);
    } else if (command === 'shuffle') {
        // TODO: Make a Mod only command
        const list = await Suggestion.find({}).exec();
        const choice = Math.floor(Math.random() * list.length);
        message.reply(`This month's choice is ${list[choice].username}'s choice: ${list[choice].book} by ${list[choice].author}!`);
        const date = `${new Date().getMonth().toString()}/${new Date().getFullYear().toString()}`;
        const bom = new History({
            username: list[choice].username,
            book: list[choice].book,
            author: list[choice].author,
            date: date
        });
        await bom.save();
        // TODO: Increase user counter.
    } else if (command === 'history') {
        const history = await History.find({}).exec();
        var reply = 'So far we\'ve read:\n'
        history.forEach((e, i) => {
            reply += `${e.book} by ${e.author} (${e.date} | ${e.username})\n`
        });
        message.reply(reply);
    }
});

client.login(config.token || process.env.token);