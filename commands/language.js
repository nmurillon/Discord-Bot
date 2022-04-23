const { execute } = require("./prefix");

module.exports = {
    name: 'language',
    aliases: [],
    description: 'Command allowing to set the prefered language',
    permissions: ['MANAGE_GUILD'],
    getHelp(guildConfig, language) {
        return language.language.help;
    },
    async execute(message, args, Discord, client, guildConfig, language) {

        if (!args.length) return message.reply(language.language.current);
            
        const new_language = args[0].toLowerCase();
        if (!client.languages.get(new_language)) {
            let existing = '';
            const embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR_SUCCESS);
            for (const lang of client.languages.keys()) {
                existing += `- **${lang}**\n`;
            }
            embed.setDescription(language.language.notSupported.replace('<language>', new_language).replace('<list>', existing));
            await message.channel.send({embeds: [embed]});
        } else {
            guildConfig.language = new_language;
            await guildConfig.save();
            message.reply(client.languages.get(new_language).language.updated);
        }
    }
}