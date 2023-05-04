import { MockGuild, MockGuildMember, MockMessage, MockTextChannel, MockUser, MockClient } from './discordjsmocks';
import { Client, Collection, Intents, Message } from 'discord.js';
jest.mock('discord.js');

const { Permissions } = jest.requireActual('discord.js');
import mongoose, { Query } from 'mongoose';
jest.mock('mongoose'); 

function mockExpress() {
  return {
    get: jest.fn(),
    listen: jest.fn()
  }
}

jest.mock('express', () => {
  return mockExpress;
});

import { GuildConfigModel, IGuildConfig } from '../src/models/guildConfigSchema';
import { Bot } from '../src/models/bot';
import { Language } from '../src/models/language';

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

// const MutableMockMessage = MockMessage as Mutable<typeof MockMessage>;

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

    mongoose.connect = jest.fn().mockImplementation(() => Promise.resolve());

    this.guildConfig = {
      guildID: '',
      prefix: '!',
      language: 'en',
      roleChannel: '',
    } as IGuildConfig;

    let mockQuery = new Query();
    mockQuery.exec = jest.fn().mockResolvedValue(Promise.resolve(this.guildConfig))
    GuildConfigModel.findOne = jest.fn().mockReturnValue(mockQuery);

    this.bot = new Bot(client);
    this.bot.init();
    this.language = this.bot.languages.get('en');
  }

  mockMessage(content: string = '', perms = [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.MANAGE_ROLES]): Message {
    let discordClient = new MockClient();
    let guild = new MockGuild(discordClient, {
      id: '0',
    });
    let user = new MockUser(discordClient, {
      id: '0',
    });
    let member = new MockGuildMember(
      discordClient,
      { id: '0', user: { id: user.id } },
      guild
    );

    member.permissionsIn = jest.fn(_channel => {
      const permissions = new Permissions();
      perms.forEach(p => permissions.add(p))
      return permissions;
  });
    // let role = new MockRole(
    //   discordClient,
    //   { id: '0' },
    //   guild
    // );

    let textChannel = new MockTextChannel(new MockGuild(discordClient), {
      client: discordClient,
      guild: new MockGuild(discordClient),
      id: "channel-id",
    });

    textChannel.send = jest.fn((msg: string)=> Promise.resolve(this.mockMessage(msg)));
    textChannel.bulkDelete = jest.fn(_number => {
        return Promise.resolve(new Collection<string, Message<boolean>>());
    });

    let messageData = new RawMessageData()

    let message: Mutable<Message> = {
      client: discordClient
    };


    // let guild = new MockGuild();
    // guild.id = '0';

    //let message = new MockMessage();
    message.content = content;
    message.author = new MockUser();
    message.author.bot = false;
    // message.guildId = '0';
    
    // message.guild = guild;
    // message.guild.id = '0';
    // message.guild.channels = new MockGuildChannelManager();
    // message.guild.channels.cache = jest.fn(() => 'get-role');

    // message.member = new MockGuildMember();

    // message.member.permissionsIn = jest.fn(_channel => {
    //     const permissions = new Permissions();
    //     perms.forEach(p => permissions.add(p))
    //     return permissions;
    // });

    message.channel = textChannel;
    // message.channel.send = jest.fn((msg: string)=> Promise.resolve(this.mockMessage(msg)));
    // (message.channel as unknown as (typeof MockTextChannel)).bulkDelete = jest.fn(_number => {
    //     return Promise.resolve(new Collection<string, Message<boolean>>());
    // });

    return message;
  }
}