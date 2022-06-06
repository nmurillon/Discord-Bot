import { Message } from 'discord.js';

import { Bot } from './bot';
import { IGuildConfig } from './guildConfigSchema';
import { Language } from './language';

export interface Command {
  name: string;
  aliases: string[];
  description: string;
  permissions: string[];
  getHelp(guildConfig: IGuildConfig, language: Language): string;
  execute(message: Message, args: string[], bot: Bot, guildConfig: IGuildConfig, language: Object): Promise<void|Message>;
}