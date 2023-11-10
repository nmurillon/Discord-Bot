import { Language } from '@models/language';
import { Bot } from '@models/bot';
import { IGuildConfig } from '@models/guildConfigSchema';

jest.mock('discord.js');
const Discord = require('discord.js'); 
const { Permissions, Intents, MessageEmbed } = jest.requireActual('discord.js');

/// Mocks for mongoose

const guildConfig = {
    guildID: '',
    prefix: '!',
    language: 'en',
    roleChannel: '',
    roleAssign: new Map<string, string>(),
    save: () => {}
} as IGuildConfig;

/// Mocks of Discord 

Discord.MessageEmbed = MessageEmbed;

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
const language: Language = bot.languages.get('en') ?? {};

function mockMessage(content = '', perms = [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.MANAGE_ROLES]): any {
    const message = new Discord.Message();
    message.content = content;
    message.author = new Discord.User();
    message.member = new Discord.GuildMember();
    message.author.bot = false;
    message.guild = new Discord.Guild();
    message.guild.id = 0;
    message.guild.roles = {
        cache: {
            find: jest.fn(_name => 'role')
        }
    }
    const channels = [
        {
            id:'get-role',
            name:'get-role',
            toString: () => 'get-role'
        },
        {
            id:'home',
            name: 'home',
            toString: () => 'home'
        }
    ]
    message.guild.channels = {    
        cache: {
            find: jest.fn((f: any) => channels.find(f))
        }
    }
    message.member.permissionsIn = jest.fn(_channel => {
        const permissions = new Permissions();
        perms.forEach(p => permissions.add(p))
        return permissions;
    })
    message.channel = new Discord.TextChannel();
    message.channel.send = jest.fn(msg => msg);
    message.channel.bulkDelete = jest.fn(_number => {
        return {catch: jest.fn(_err => {return})}
    });

    return message;
};

export {
    bot,
    language,
    mockMessage,
    guildConfig
};