const guildConfigModel = require('../../models/guildConfigSchema');

module.exports = async (client, Discord, message) => {
    let guildConfig;

    try {
        guildConfig = await guildConfigModel.findOne({ guildID: message.guild.id});
    } catch (err) {
        console.error(`Error while retrieving guild configuration : ${err}`)
    }

    if(message.author.bot || !message.content.startsWith(guildConfig.prefix)) return;

    const language = client.languages.get(guildConfig.language);
    const args = message.content.slice(guildConfig.prefix.length).split(/\s+/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (!command) return message.channel.send(language.commandNotFound);

    const memberPermissions = message.member.permissionsIn(message.channel);
    
    let permissionError = [];
    
    for (const perm of command.permissions) {
        if (!memberPermissions.has(perm)) {
            permissionError.push(perm);
        }
    }

    if (permissionError.length) {
        return message.reply(`${language.missingPermissions} \`${permissionError}\``)
    }

    console.log(`call to '${cmd}' with following args : '${args}'`)
    try {
        command.execute(message, args, Discord, client, guildConfig, language);
    } catch (err) {
        message.reply(language.commandExecutionError);
        console.error(err);
    }
}