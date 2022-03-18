module.exports = {
    name: 'ping',
    description: 'ping command, responds with pong',
    execute(message, args) {
        message.reply('pong!');
    }
}