module.exports = {
    name: 'prefix',
    aliases: ['pref'],
    description: 'Command allowing to set the prefix for the commands',
    permissions: ['MANAGE_GUILD'],
    help : 'Prefix command usage : `<prefix>prefix <newPrefix>` where <prefix> is the current prefix (! by default) and <newPrefix> is the prefix you want',
    async execute(message, args, Discord, client, guildConfig) {
        /* TODO: display help for this command */
        if (!args.length) return message.reply(`You can't use the prefix command without arguments !\n${this.help}`);

        if (args.length === 1) {
            guildConfig.prefix = args[0]
            await guildConfig.save();
            message.reply(`The command prefix has changed : you can now call a command with \`${guildConfig.prefix}\``);
        } else {
            message.reply(`The prefix must be a one word string ! you tried to give the following one : '${args.join(' ')}'`);
        }
    }
}