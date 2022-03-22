const guildConfigModel = require('../../models/guildConfigSchema');

module.exports = async (client, Discord, message) => {
    let guildConfig;

    try {
        guildConfig = await guildConfigModel.findOne({ guildID: message.guild.id});
    } catch (err) {
        console.error(`Error while retrieving guild configuration : ${err}`)
    }

    if(message.author.bot || !message.content.startsWith(guildConfig.prefix)) return;

    const args = message.content.slice(guildConfig.prefix.length).split(/\s+/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (!command) return message.channel.send('This command does not exist');

    console.log(`call to '${cmd}' with following args : '${args}'`)
    try {
        command.execute(message, args, Discord, client, guildConfig);
    } catch (err) {
        message.reply(`There was an error executing this command`);
        console.error(err);
    }
}