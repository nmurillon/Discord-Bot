import { Language } from '@models/language';
import { Bot } from '@models/bot';

jest.mock('discord.js');
const Discord = require('discord.js'); 
const { Permissions, Intents } = jest.requireActual('discord.js');

/// Mocks of Discord 

const client = new Discord.Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
          
const bot = new Bot(client);
bot.init();
const language: undefined | Language = bot.languages.get('en');

function mockMessage(content = '', perms = [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.MANAGE_ROLES]): any {
    const message = new Discord.Message();
    message.content = content;
    message.author = new Discord.User();
    message.member = new Discord.GuildMember();
    message.author.bot = false;
    message.guild = new Discord.Guild();
    message.guild.id = 0;
    message.guild.channels = {
        cache: {
            find: jest.fn(_id => 'get-role')
        }
    }
    message.member.permissionsIn = jest.fn(_channel => {
        const permissions = new Permissions();
        perms.forEach(p => permissions.add(p))
        return permissions;
    })
    message.channel = new Discord.TextChannel();
    message.channel.send = jest.fn(msg => mockMessage(msg));
    message.channel.bulkDelete = jest.fn(_number => {
        return {catch: jest.fn(_err => {return})}
    });

    return message;
};

export {
    bot,
    language,
    mockMessage
};