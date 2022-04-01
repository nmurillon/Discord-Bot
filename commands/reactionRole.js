module.exports = {
    name: 'reactionrole',
    description: 'Add a role to a user after message reaction',
    permissions: ['MANAGE_ROLES', 'MANAGE_GUILD'],
    getHelp(guildConfig, language) {
        return language.reactionrole.help;
    },
    async execute(message, args, Discord, client, guildConfig, language) {
        /* Emojis associated to the roles */

        if (!args.length) {
            await message.channel.bulkDelete(1).catch(console.error);
            const carpetteEmoji = '👌🏻';
            const clAmieEmoji = '🤝';
    
            let embed = new Discord.MessageEmbed()
                .setColor('#e42642')
                .setTitle(language.reactionrole.embedTitle)
                .setDescription(language.reactionrole.embedDescription
                + `${carpetteEmoji} --> Carpette\n`
                + `${clAmieEmoji} --> CL Amie`);
            
    
            let embedMessage = await message.channel.send({embeds: [embed]});
            embedMessage.react(carpetteEmoji);
            embedMessage.react(clAmieEmoji);
        } else {
            const subcommand = args.shift().toLowerCase();

            if (subcommand === 'channel') {
                let channel;
                if (!args.length) {
                    if(guildConfig.roleChannel === '') return message.channel.send(language.reactionrole.noRoleChannel);
                    
                    channel = message.guild.channels.cache.find(c => c.id === guildConfig.roleChannel);
                    return message.channel.send(language.reactionrole.roleChannel.replace('<channel>', channel.toString()));
                    
                }

                channel = message.guild.channels.cache.find(c => c.name === args[0]);

                if (channel) {
                    guildConfig.roleChannel = channel.id;
                    await guildConfig.save();
                    message.channel.send(language.reactionrole.roleChannelUpdate.replace('<channel>', channel.toString()));
                } else {
                    message.reply(language.reactionrole.roleChannelError.replace('<channel>', `\`${args[0]}\``));
                } 
                
            }
        }
        
    }
}