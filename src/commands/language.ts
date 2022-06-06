import { ColorResolvable, Message, MessageEmbed } from 'discord.js';

import { Bot } from '@models/bot';
import { Command } from '@models/command';
import { IGuildConfig } from '@models/guildConfigSchema';
import { Language } from '@models/language';

export default class LanguageCommand implements Command {
	name=  'language';
	aliases=  [];
	description = 'Command allowing to set the prefered language';
	permissions = ['MANAGE_GUILD'];

	getHelp(_guildConfig: IGuildConfig, language: Language) {
		return language.language.help;
	}

	async execute(message: Message, args: string[], bot: Bot, guildConfig: IGuildConfig, language: Language) {

		if (!args.length) return message.reply(language.language.current);
				
		const arg = args[0].toLowerCase() || '';
		const existingLanguage = bot.languages.get(arg);
		if (!existingLanguage) {
			let existing = '';
			const embed = new MessageEmbed()
				.setColor(process.env.COLOR_SUCCESS as ColorResolvable);
			for (const lang of bot.languages.keys()) {
				existing += `- **${lang}**\n`;
			}
			embed.setDescription(language.language.notSupported.replace('<language>', arg).replace('<list>', existing));
			await message.channel.send({embeds: [embed]});
		} else {
				guildConfig.language = arg;
				await guildConfig.save();
				message.reply(existingLanguage.language.updated);
		}
	}
}