import { Client, Intents } from 'discord.js';

import { Bot } from './src/models/bot';

export default async function run() {
    const client = new Client({ 
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS
        ],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
    });
    
    const bot = new Bot(client);
    bot.init();
}

run();