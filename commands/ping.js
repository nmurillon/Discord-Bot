module.exports = {
    name: 'ping',
    description: 'ping command, responds with pong',
    permissions: [],
    execute(message, args, Discord, client, guildConfig, language) {
        message.reply('pong!');
    }
}