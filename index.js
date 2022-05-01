const Discord = require('discord.js');
const mongoose = require('mongoose');
const express = require('express')
const app = express()

/* A bot is a client */
const client = new Discord.Client({ 
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
});

client.commands = new Discord.Collection();
client.languages = new Discord.Collection();

['command_handler', 'event_handler', 'language_handler'].forEach(handler => require(`./src/handlers/${handler}.js`)(client, Discord));

mongoose.connect(process.env.MONGO_SRV).then(() => {
    console.log('Succesfully connected to the database');
}).catch((err) => {
    console.error(err);
});

client.login(process.env.TOKEN);

/* Usefull for Azure App servcices, it needs something listening on port 8080*/
app.get('/', function (req, res) {
    res.send('hello world')
  })
  
  app.listen(8080)