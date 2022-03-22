module.exports = {
    name: 'ping',
    description: 'ping command, responds with pong',
    execute(message, args, Discord, client, guildConfig) {
        message.reply('pong!');
    }
}