module.exports = {
    name: 'clear',
    aliases: ['cl', 'delete'],
    description: 'clear an amount of messages from a channel',
    permissions: ['MANAGE_MESSAGES'],
    async execute(message, args, Discord, client, guildConfig, language) {

        if (!args[0]) return message.reply(language.clear.noArg);
        if (isNaN(args[0])) return message.reply(language.clear.nan);

        if (args[0] > 100) return message.reply(language.clear.atMostHundred);
        if (args[0] < 1) return message.reply(language.clear.atLeastOne);

        message.channel.bulkDelete(args[0]).catch(console.error);
    }
}