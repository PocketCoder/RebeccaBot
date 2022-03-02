const Discord = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');

const Suggestion = require('./models/suggestion.js');
const History = require('./models/history.js');
const Counter = require('./models/counter.js');

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
        Suggestion.findOneAndUpdate({userId: message.author.id}, {userId: message.author.id, username: message.author.username, book: title, author: author}, {upsert: true}, (e) => {
            if (e === null) {
                message.reply('What a wonderful choice! Let me just make a note of that.');
            } else {
                message.reply(e);
            }
        });
    } else if (command === 'list') {
        const list = await Suggestion.find({}).exec();
        var reply = 'Well, from what I can see we have these wonderful choices:\n';
        list.forEach((e, i) => {
            i += 1;
            reply += `${i}) ${e.book} by ${e.author}, suggested by ${e.username}\n`;
        });
        message.reply(reply);
    } else if (command === 'shuffle') {
        // TODO: Make a Mod only command
        const list = await Suggestion.find({}).exec();
        // Find user counters.
        // Compare user counters, lowest to highest.
        // Choice is out of the lowest.
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
        await Counter.findOneAndUpdate({userId: list[choice].userId}, {count: newCounter}, {upsert: true});
        message.reply(`This month's book is ${list[choice].username}'s choice: ${list[choice].book} by ${list[choice].author}!`);
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