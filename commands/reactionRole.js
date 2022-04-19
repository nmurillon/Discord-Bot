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
            let description = language.reactionrole.embedDescription;
    
            let embed = new Discord.MessageEmbed()
                .setColor('#e42642')
                .setTitle(language.reactionrole.embedTitle);

            guildConfig.roleAssign.forEach(
                (roleId, emoji) => { 
                    const role = message.guild.roles.cache.find(r => r.id === roleId);
                    description += `${emoji} --> ${role}\n`; 
                }
            );

            embed.setDescription(description);
    
            let embedMessage = await message.channel.send({embeds: [embed]});

            for (const emoji of guildConfig.roleAssign.keys()) {
                embedMessage.react(emoji);
            }
        } else {
            
            const subcommand = args.shift().toLowerCase();
            if (subcommand === '--channel') {
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
                    return message.channel.send(language.reactionrole.roleChannelUpdate.replace('<channel>', channel.toString()));
                } 
                
                message.reply(language.reactionrole.roleChannelError.replace('<channel>', `\`${args[0]}\``));
            } else if (subcommand === '--role') {
                if (!args.length) {
                    if (!guildConfig.roleAssign.size) return message.reply(language.reactionrole.noAssignableRole); 
                    
                    let description = language.reactionrole.embedDescriptionAssignableRole;
                    let embed = new Discord.MessageEmbed()
                    .setColor('#e42642')
                    .setTitle(language.reactionrole.embedTitleAssignableRole);
                    console.log(guildConfig)

                    guildConfig.roleAssign.forEach( (roleId, emoji) => {
                        const role = message.guild.roles.cache.find(r => r.id === roleId);
                        description += `- ${role}\n`;
                    })

                    embed.setDescription(description);

                    await message.channel.send({embeds: [embed]});
                } else {
                    /* Set emoji and role for each params, expect to give role name first and emoji in second  */
                    while (args.length) {
                        try {
                            /* If we have a role with multiple words, we separate each word with a _        */
                            /* For example, if we have "Test Role", we expect it to be given as "Test_Role" */
                            const roleName = args.shift().replace('_', ' ').toLowerCase();
                            const emoji = args.shift();

                            const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName);
                            if (!role) {
                                return message.reply(language.reactionrole.roleAssignArgError);
                            }

                            guildConfig.roleAssign.set(emoji,role.id);
                        } catch (e) {
                            return message.reply(language.reactionrole.roleAssignArgError);
                        }
                    }

                    await guildConfig.save();
                    /* ToChange */
                    await this.execute(message, ['--role'], Discord, client, guildConfig, language);
                }
            }
        }
        
    }
}