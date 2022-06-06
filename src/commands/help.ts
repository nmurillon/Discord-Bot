import { ColorResolvable, Message, MessageEmbed } from 'discord.js';

import { Command } from '@models/command';
import { IGuildConfig } from '@models/guildConfigSchema';
import { Language } from '@models/language';
import { Bot } from '@models/bot';

export default class HelpCommand implements Command {
  name = 'help';
  aliases = [];
  description = 'Display help';
  permissions = [];

  getHelp(_guildConfig: IGuildConfig, language: Language) {
      return language.help.help;
  }

  async execute(message: Message, args: string[], bot: Bot, guildConfig: IGuildConfig, language: Language) {
    
    const embed = new MessageEmbed();
    embed.setColor(process.env.COLOR_HELP as ColorResolvable);
    if (!args.length) {
      let description = language.help.embedDescription.replace('<prefix>', guildConfig.prefix);

      for (const command of bot.commands.values() ) {
        description += `\`${command.name}\` : ` + language[command.name].description +'\n';
      }

      embed.setTitle(language.help.embedTitle)
        .setDescription(description);
    } else {
      const cmd = args.shift() || '';
      const command = bot.commands.get(cmd);

      if (!command) return message.reply(language.baseErrors.commandNotFound.replace('<command>', cmd));

      embed.setTitle(language.help.embedCommandTitle.replace('<command>', command.name))
        .setDescription(command.getHelp(guildConfig, language));
    }

    await message.channel.send({embeds: [embed]});
  }
}