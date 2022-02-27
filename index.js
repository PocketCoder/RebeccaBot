const Discord = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');

const Suggestion = require('./models/suggestion.js');

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

    if (command === "suggestion") {
        const title = args.slice(0, args.indexOf('by')).join(" ");
        const author = args.slice(args.indexOf('by') + 1, args.length).join(" ");
        Suggestion.findOneAndUpdate({userId: message.author.id}, {book: title, author: author}, {upsert: true}, (e) => {
            if (e === null) {
                message.reply('Got it, saved it.');
            } else {
                message.reply(e);
            }
        });
        // const newSuggest = await Suggestion.create({userId: message.author.id, book: title, author: author});
        // const saveSuggest = await newSuggest.save();
    }
});

client.login(config.token || process.env.token);