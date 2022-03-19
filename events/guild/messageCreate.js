module.exports = (client, Discord, message) => {
    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/\s+/);
    const command = args.shift().toLowerCase();
    console.log(`call to '${command}' with following args : '${args}'`)
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    if (command === 'clear') {
        client.commands.get('clear').execute(message, args)
    }
    if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    }
}