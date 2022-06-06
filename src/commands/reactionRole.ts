import { ColorResolvable, GuildBasedChannel, Message, MessageEmbed, TextChannel } from 'discord.js';

import { Bot } from '../models/bot';
import { Command } from '../models/command';
import { IGuildConfig } from '../models/guildConfigSchema';
import { Language } from '../models/language';

export default class ReactionRoleCommand implements Command {
	name = 'reactionrole';
	aliases: string[] = [];
	description = 'Add a role to a user after message reaction';
	permissions = ['MANAGE_ROLES', 'MANAGE_GUILD'];
	subcommands: Map<string, Function> = new Map([['--channel', this.channelSubCommand], ['--role', this.roleSubCommand]]);

	getHelp(_guildConfig: IGuildConfig, language: Language): string {
		return language.reactionrole.help;
	}

	async execute(message: Message, args: string[], bot: Bot, guildConfig: IGuildConfig, language: Language): Promise<void|Message> {
		/* Emojis associated to the roles */

		if (!args.length) {
			await (message.channel as TextChannel).bulkDelete(1).catch(console.error);
			let description = language.reactionrole.embedDescription;
	
			let embed = new MessageEmbed()
				.setColor(process.env.COLOR_SUCCESS as ColorResolvable)
				.setTitle(language.reactionrole.embedTitle);

			guildConfig.roleAssign.forEach(
				(roleId, emoji) => { 
						const role = message.guild?.roles.cache.find(r => r.id === roleId);
						description += `${emoji} --> ${role}\n`; 
				}
			);

			embed.setDescription(description);

			let embedMessage = await message.channel.send({embeds: [embed]});

			for (const emoji of guildConfig.roleAssign.keys()) {
				embedMessage.react(emoji);
			}
		} else {
			const subcommand = this.subcommands.get(args.shift()!.toLowerCase());
			if (subcommand) subcommand.bind(this)(message, args, bot, guildConfig, language);
		}
		
	}

	async channelSubCommand(message: Message, args: string[], _bot: Bot, guildConfig: IGuildConfig, language: Language) {
		let channel: GuildBasedChannel|undefined;
		if (!args.length) {
			if(guildConfig.roleChannel === '') return message.channel.send(language.reactionrole.noRoleChannel);
			
			channel = message.guild!.channels.cache.find(c => c.id === guildConfig.roleChannel);
			if (!channel) return message.channel.send(language.reactionrole.noRoleChannel);
			return message.channel.send(language.reactionrole.roleChannel.replace('<channel>', channel.toString()));
		}

		channel = message.guild?.channels.cache.find(c => c.name === args[0]);

		if (channel) {
			guildConfig.roleChannel = channel.id;
			await guildConfig.save();
			return message.channel.send(language.reactionrole.roleChannelUpdate.replace('<channel>', channel.toString()));
		} 
		
		message.reply(language.reactionrole.roleChannelError.replace('<channel>', args[0]));
	}

	async roleSubCommand(message: Message, args: string[], _bot: Bot, guildConfig: IGuildConfig, language: Language): Promise<Message> {
		if (!args.length) return this._displayAssignableRoles(message, guildConfig, language);
	
		/* Set emoji and role for each params, expect to give role name first and emoji in second  */
		let unusableEmojis: string[] = [];
		while (args.length) {
			try {
				/* If we have a role with multiple words, we separate each word with a _        */
				/* For example, if we have "Test Role", we expect it to be given as "Test_Role" */
				const roleName = args.shift()!.replace('_', ' ').toLowerCase();
				const emoji = args.shift()?? '';

				await message.react(emoji).catch(_err => {
					unusableEmojis.push(emoji);
				});

				const role = message.guild!.roles.cache.find(r => r.name.toLowerCase() === roleName);
				if (!role) {
					return message.reply(language.reactionrole.roleAssignArgError);
				}
				const existKey = this._isRoleAssignable(guildConfig.roleAssign, role.id);

				if (existKey) {
					guildConfig.roleAssign.delete(existKey);
				}
				guildConfig.roleAssign.set(emoji,role.id);
			} catch (e) {
				console.log('error thrown', e);
				return message.reply(language.reactionrole.roleAssignArgError);
			}
		}
		
		if (unusableEmojis.length) return message.reply(language.reactionrole.emojiError.replace('<emoji>', unusableEmojis.join(',')));

		await guildConfig.save();
		/* Subject To Change */
		return this._displayAssignableRoles(message, guildConfig, language);
	}

	private async _displayAssignableRoles(message: Message, guildConfig: IGuildConfig, language: Language): Promise<Message> {
		if (!guildConfig.roleAssign.size) return message.reply(language.reactionrole.noAssignableRole); 
								
		let description = language.reactionrole.embedDescriptionAssignableRole;
		let embed = new MessageEmbed()
		.setColor(process.env.COLOR_SUCCESS as ColorResolvable)
		.setTitle(language.reactionrole.embedTitleAssignableRole);

		guildConfig.roleAssign.forEach( (roleId, _emoji) => {
			/* TODO : error message when role does not exist anymore */
			const role = message.guild?.roles.cache.find(r => r.id === roleId)?? 'undefined role';
			description += `- ${role}\n`;
		})

		embed.setDescription(description);

		return message.channel.send({embeds: [embed]});
	}

	private _isRoleAssignable(collection: Map<string,string>, role: string): string | undefined {
		for (let [key, value] of collection.entries()) {
			if (value === role) return key;
		}
	}
}