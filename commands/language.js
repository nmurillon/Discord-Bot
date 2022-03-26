const { execute } = require("./prefix");

module.exports = {
    name: 'language',
    aliases: [],
    description: 'Command allowing to set the prefered language',
    permissions: ['MANAGE_GUILD'],
    async execute(message, args, Discord, client, guildConfig, language) {

        if (!args.length) return message.reply(language.language.current);
            
        const new_language = args[0].toLowerCase();
        if (!client.languages.get(new_language)) {
            let existing = '';

            for (const lang of client.languages.keys()) {
                existing += ` ${lang}`;
            }
            message.reply(`${new_language} ${language.language.notSupported}${existing}`);
        } else {
            guildConfig.language = new_language;
            await guildConfig.save();
            message.reply(client.languages.get(new_language).language.updated);
        }
    }
}