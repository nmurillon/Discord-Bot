import { Message } from 'discord.js';

import { Bot } from '../models/bot';
import { Command } from '../models/command';
import { IGuildConfig } from '../models/guildConfigSchema';
import { Language } from '../models/language';

export default class PingCommand implements Command {
	name = 'ping';
	aliases: string[] = [];
	description = 'ping command, responds with pong';
	permissions: string[] = [];

	getHelp(_guildConfig: IGuildConfig, language: Language): string {
		return language.ping.help;
	}

	async execute(message: Message, _args: string[], _bot: Bot, _guildConfig: IGuildConfig, _language: Language): Promise<void|Message> {
		message.reply('pong!');
	}
}