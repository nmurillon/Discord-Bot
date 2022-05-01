module.exports = {
    name: 'ping',
    description: 'ping command, responds with pong',
    permissions: [],
    getHelp(_guildConfig, language) {
        return language.ping.help;
    },
    execute(message, _args, _Discord, _client, _guildConfig, _language) {
        message.reply('pong!');
    }
}