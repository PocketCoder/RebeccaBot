require('dotenv').config();

const Discord = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');

const Suggestion = require('./models/suggestionSchema.js');
const History = require('./models/historySchema.js');
const Counter = require('./models/counterSchema.js');
const Deadline = require('./models/deadlineSchema.js');

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});
const prefix = "!";

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", (e) => {
    console.log("She is awake.");

    mongoose.connect(process.env.MDBsrv, {
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
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'suggestion') {
        client.commands.get('suggestion').execute(message, args);
    } else if (command === 'list') {
        client.commands.get('list').execute(message, args);
    } else if (command === 'shuffle') {
        client.commands.get('shuffle').execute(message, args);
    } else if (command === 'history') {
        client.commands.get('history').execute(message, args);
    } else if (command === 'deadline') {
        client.commands.get('deadline').execute(message, args);
    } else if (command === 'synopsis') {
        client.commands.get('synopsis').execute(message, args);
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args);
    } else if (command === 'say') {
        message.reply(`I love you, too, ${message.author.username}`);
    }
});

client.login(process.env.token);

const https = require("http");
setInterval(() => {
    const options = {
        hostname: 'https://rebecca-discord-bot.herokuapp.com/',
        port: process.env.PORT || 5000,
        path: '/',
        method: 'GET'
    };
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', d => {
            process.stdout.write(d);
        });
    });
    req.on('error', error => {
        console.error(error)
    });
    req.end();
}, 25 * 60000); // Ping every 25 minutes