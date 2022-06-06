import { Message, TextChannel } from "discord.js";

import { Command } from "@models/command";
import { IGuildConfig } from "@models/guildConfigSchema";
import { Language } from "@models/language";
import { Bot } from "@models/bot";

export default class ClearCommand implements Command {
  name = 'clear';
  aliases = ['cl', 'delete'];
  description = 'clear an amount of messages from a channel';
  permissions = ['MANAGE_MESSAGES'];

  getHelp(guildConfig: IGuildConfig, language: Language) {
    return language.clear.help.replace('<prefix>', guildConfig.prefix);
  }
  
  async execute(message: Message, args: string[], _bot: Bot, _guildConfig: IGuildConfig, language: Language) {

    if (!args[0]) return message.reply(language.clear.noArg);
    if (isNaN(+args[0])) return message.reply(language.clear.nan);

    const toDelete = parseInt(args[0]) + 1;

    if (toDelete > 100) return message.reply(language.clear.atMostHundred);
    if (toDelete < 1) return message.reply(language.clear.atLeastOne);

    /* Bulk delete messages newer than 14 days */
    const deleted = await (message.channel as TextChannel).bulkDelete(toDelete, true).catch(console.error).then(del => del? del.size : 0);
    const remaining = toDelete - deleted;
    if (remaining) {
        message.channel.messages.fetch({ limit: remaining }).then(
          messages => {
              messages.forEach(msg => msg.delete());
          }
        )
    }
  }
}