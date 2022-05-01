module.exports = {
    name: 'clear',
    aliases: ['cl', 'delete'],
    description: 'clear an amount of messages from a channel',
    permissions: ['MANAGE_MESSAGES'],
    getHelp(guildConfig, language) {
        return language.clear.help.replace('<prefix>', guildConfig.prefix);
    },
    async execute(message, args, _Discord, _client, _guildConfig, language) {

        if (!args[0]) return message.reply(language.clear.noArg);
        if (isNaN(args[0])) return message.reply(language.clear.nan);

        const toDelete = parseInt(args[0]) + 1;

        if (toDelete > 100) return message.reply(language.clear.atMostHundred);
        if (toDelete < 1) return message.reply(language.clear.atLeastOne);

        const deleted = await message.channel.bulkDelete(toDelete, true).catch(console.error);
        const remaining = toDelete - deleted.size;
        if (remaining) {
            message.channel.messages.fetch({ limit: remaining }).then(
                messages => {
                    messages.forEach(msg => msg.delete());
                }
            )
        }
    }
}