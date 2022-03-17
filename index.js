const Discord = require('discord.js');
require('dotenv').config();

/* A bot is a client */
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log("I'm a teapot is ready to run !");
});

client.login(process.env.TOKEN);