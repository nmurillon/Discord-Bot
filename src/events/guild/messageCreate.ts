import { ColorResolvable, Message, MessageEmbed, PermissionString, TextChannel } from 'discord.js';

import { Bot } from '../../models/bot';
import guildConfigModel, { IGuildConfig } from '../../models/guildConfigSchema';

export default async (bot: Bot, message: Message) => {
    let guildConfig: null|IGuildConfig = new guildConfigModel();

    try {
        guildConfig = await guildConfigModel.findOne({ guildID: message.guild!.id});
    } catch (err) {
        console.error(`Error while retrieving guild configuration : ${err}`);
    }

    /* TODO: rework log message */
    if (!guildConfig) {
        console.error(`Error while retrieving guild configuration`);
        return;
    }

    if(message.author.bot || !message.content.startsWith(guildConfig.prefix)) return;

    const language = bot.languages.get(guildConfig.language);
    const args = message.content.slice(guildConfig.prefix.length).split(/\s+/);
    const cmd = args.shift()?.toLowerCase();

    const command = bot.commands.get(cmd ?? '');
    if (!command) return message.channel.send(language!.baseErrors.commandNotFound.replace('<command>', cmd ?? ''));

    const memberPermissions = message.member!.permissionsIn(message.channel as TextChannel).toArray();
    
    let permissionError: string[] = [];
    
    for (const perm of command.permissions) {
        if (!memberPermissions.includes(perm as PermissionString)) {
            permissionError.push(perm);
        }
    }

    if (permissionError.length) {
        return message.reply(language!.baseErrors.missingPermissions.replace('<permissions>', permissionError.join(", ")));
    }

    console.log(`call to '${cmd}' with following args : '${args}'`)
    try {
        await command.execute(message, args, bot, guildConfig, language!);
    } catch (err) {
        console.error(err);
        const embed = new MessageEmbed();
        embed.setColor(process.env.COLOR_ERROR as ColorResolvable)
            .setDescription(language!.baseErrors.commandExecutionError);
        await message.channel.send({embeds: [embed]});
    }
}