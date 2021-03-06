const fs = require('fs');

module.exports = (client, _Discord) => {
    const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
            console.log(`Registering command ${command.name}`);
        } else {
            continue;
        }
    }
}