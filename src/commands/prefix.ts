import { Message } from 'discord.js';

import { Bot } from '@models/bot';
import { Command } from '@models/command';
import { IGuildConfig } from '@models/guildConfigSchema';
import { Language } from '@models/language';

export default class PrefixCommand implements Command {
  name = 'prefix';
  aliases = ['pref'];
  description = 'Command allowing to set the prefix for the commands';
  permissions = ['MANAGE_GUILD'];

  getHelp(guildConfig: IGuildConfig, language: Language): string {
    return language.prefix.help.replace('<prefix>', guildConfig.prefix);
  }

  async execute(message: Message, args: string[], _bot: Bot, guildConfig: IGuildConfig, language: Language): Promise<void|Message> {
    if (!args.length) return message.reply(`${language.prefix.noArg}\n${language.prefix.help}`);

    if (args.length === 1) {
      guildConfig.prefix = args[0]
      await guildConfig.save();
      message.reply(language.prefix.update.replace('<prefix>', guildConfig.prefix));
    } else {
      message.reply(language.prefix.updateError.replace('<prefix>', args.join(' ')));
    }
  }
}