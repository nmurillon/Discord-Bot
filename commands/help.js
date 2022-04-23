module.exports = {
    name: 'help',
    permissions: [],
    getHelp(guildConfig, language) {
        return language.help.help;
    },
    async execute(message, args, Discord, client, guildConfig, language) {
        
        const embed = new Discord.MessageEmbed();
        embed.setColor(process.env.COLOR_HELP);
        if (!args.length) {
            let description = language.help.embedDescription.replace('<prefix>', guildConfig.prefix);

            for (const command of client.commands.values() ) {
                description += `\`${command.name}\` : ` + language[command.name].description +'\n';
            }
    
            embed.setTitle(language.help.embedTitle)
                .setDescription(description);
        }
        else {
            const cmd = args.shift();
            const command = client.commands.get(cmd);

            if (!command) return message.reply(language.commandNotFound.replace('<command>', cmd));

            embed.setTitle(language.help.embedCommandTitle.replace('<command>', command.name))
                .setDescription(command.getHelp(guildConfig, language));
        }

        await message.channel.send({embeds: [embed]});
    }
}