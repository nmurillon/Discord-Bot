jest.mock('discord.js');
const Discord = require('discord.js'); 
const { Collection, Permissions } = jest.requireActual('discord.js');
const client = new Discord.Client();
jest.mock('../src/models/guildConfigSchema')
const guildConfigModel = require('../src/models/guildConfigSchema');
client.commands = new Collection();
client.languages = new Collection();

/* Load all the commands */
['command_handler', 'event_handler', 'language_handler'].forEach(handler => require(`../src/handlers/${handler}.js`)(client, Discord));

/* Mock of a guild config */
let guildConfig = {
    guildID: '',
    prefix: '!',
    language: 'en',
    roleChannel: '' ,
    roleAssign: { 
        
    },
    save: () => { return }
}

guildConfigModel.findOne.mockImplementation(() => guildConfig);

/**
 * Mock of a discord Message
 * Jest mock functions only, not attributes
 */ 
const mockMessage = (content, perms = [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.MANAGE_ROLES]) => {
    const message = new Discord.Message();
    message.content = content;
    message.author = new Discord.User();
    message.member = new Discord.GuildMember();
    message.author.bot = false;
    message.guild = new Discord.Guild();
    message.guild.id = 0;
    message.member.permissionsIn = jest.fn(_channel => {
        const permissions = new Permissions();
        perms.forEach(p => permissions.add(p))
        return permissions;
    })
    message.channel = new Discord.TextChannel();

    return message;
}

const language = client.languages.get('en');

module.exports = {
    client,
    Discord,
    mockMessage,
    guildConfig,
    language
}