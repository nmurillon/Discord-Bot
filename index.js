const Discord = require('discord.js');
const fs = require('fs');

/* A bot is a client */
const client = new Discord.Client({ 
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ] 
});

client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => require(`./handlers/${handler}.js`)(client, Discord));

client.login(process.env.TOKEN);