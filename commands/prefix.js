module.exports = {
    name: 'prefix',
    aliases: ['pref'],
    description: 'Command allowing to set the prefix for the commands',
    permissions: ['MANAGE_GUILD'],
    getHelp(guildConfig, language) {
        return language.prefix.help.replace('<prefix>', guildConfig.prefix);
    },
    async execute(message, args, Discord, client, guildConfig, language) {
        if (!args.length) return message.reply(`${language.prefix.noArg}\n${language.prefix.help}`);

        if (args.length === 1) {
            guildConfig.prefix = args[0]
            await guildConfig.save();
            message.reply(language.prefix.update.replace('<prefix>', `\`${guildConfig.prefix}\``));
        } else {
            message.reply(language.prefix.updateError.replace('<prefix>', `\`${args.join(' ')}\``));
        }
    }
}