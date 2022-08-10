import { GuildChannelManager, Message, TextChannel, Client, Intents, User, Guild, GuildMember, Collection } from 'discord.js';
jest.mock('discord.js');

const { Permissions } = jest.requireActual('discord.js');
jest.mock('mongoose'); 
import mongoose from 'mongoose';

function mockExpress() {
  return {
    get: jest.fn(),
    listen: jest.fn()
  }
}

jest.mock('express', () => {
  return mockExpress;
});

import guildConfigModel, { IGuildConfig } from '../src/models/guildConfigSchema';
import { Bot } from '../src/models/bot';
import { Language } from '../src/models/language';

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export default class ConfigTest {
  bot: Bot;
  guildConfig =  {
    guildID: '',
    prefix: '!',
    language: 'en',
    roleChannel: '',
  } as IGuildConfig;
  language: undefined | Language;

  constructor() {
    const client = new Client({ 
      intents: [
          Intents.FLAGS.GUILDS,
          Intents.FLAGS.GUILD_MESSAGES,
          Intents.FLAGS.GUILD_MESSAGE_REACTIONS
      ],
      partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    });

    mongoose.connect = jest.fn().mockImplementation((_srv: string) => Promise.resolve());
    this.guildConfig = {
      guildID: '',
      prefix: '!',
      language: 'en',
      roleChannel: '',
    } as IGuildConfig;
    
    jest.spyOn(guildConfigModel, 'findOne').mockResolvedValue(Promise.resolve(this.guildConfig));

    this.bot = new Bot(client);
    this.bot.init();
    this.language = this.bot.languages.get('en');
  }

  mockMessage(content: string = '', perms = [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.MANAGE_ROLES]): Message {
    const guild = new (Guild as jest.Mock<Guild>)();
    guild.id = '0';

    const message = new (Message as unknown as jest.Mock<Mutable<Message>>)();
    message.content = content;
    message.author = new (User as jest.Mock<User>)();
    message.author.bot = false;
    message.guildId = '0';
    
    message.guild = guild;
    message.guild.id = '0';
    (message.guild.channels as any) = new (GuildChannelManager as unknown as jest.Mock<Mutable<GuildChannelManager>>)();
    (message.guild.channels.cache as any) = jest.fn(() => 'get-role');

    message.member = new (GuildMember as unknown as jest.Mock<Mutable<GuildMember>>)();

    message.member.permissionsIn = jest.fn(_channel => {
        const permissions = new Permissions();
        perms.forEach(p => permissions.add(p))
        return permissions;
    });

    (message.channel as any) = new (TextChannel as unknown as jest.Mock<Mutable<TextChannel>>)();
    message.channel.send = jest.fn((msg: string)=> Promise.resolve(this.mockMessage(msg)));
    (message.channel as TextChannel).bulkDelete = jest.fn(_number => {
        return Promise.resolve(new Collection<string, Message<boolean>>());
    });

    return message as Message;
  }
}