module.exports = {
    name: 'ping',
    description: 'ping command, responds with pong',
    permissions: [],
    getHelp(guildConfig, language) {
        return language.ping.help;
    },
    execute(message, args, Discord, client, guildConfig, language) {
        message.reply('pong!');
    }
}