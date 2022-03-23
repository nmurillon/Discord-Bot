module.exports = {
    name: 'clear',
    aliases: ['cl', 'delete'],
    description: 'clear an amount of messages from a channel',
    permissions: ['MANAGE_MESSAGES'],
    async execute(message, args, Discord, client, guildConfig) {
        if (!args[0]) return message.reply('Please enter the amount of messages you want to clear, eg : !clear 5 to clear 5 messages');
        if (isNaN(args[0])) return message.reply('Please enter a number as an argument !');

        if (args[0] > 100) return message.reply("Sorry but I can't clean more than 100 messages");
        if (args[0] < 1) return message.reply("Sorry but you must at least delete one message !");

        message.channel.bulkDelete(args[0]).catch(console.error);
    }
}