module.exports = {
    name: 'reactionrole',
    description: 'Add a role to a user after message reaction',
    permissions: ['MANAGE_ROLES', 'MANAGE_GUILD'],
    async execute(message, args, Discord, client, guildConfig) {
        /* Emojis associated to the roles */

        if (!args.length) {
            await message.channel.bulkDelete(1).catch(console.error);
            const carpetteEmoji = '👌🏻';
            const clAmieEmoji = '🤝';
    
            let embed = new Discord.MessageEmbed()
                .setColor('#e42642')
                .setTitle('Choose your role')
                .setDescription('Choosing a role allows you to get access to the right channels !\n\n'
                + `${carpetteEmoji} for Carpette\n`
                + `${clAmieEmoji} for CL Amie`);
            
    
            let embedMessage = await message.channel.send({embeds: [embed]});
            embedMessage.react(carpetteEmoji);
            embedMessage.react(clAmieEmoji);
        } else {
            const subcommand = args.shift().toLowerCase();

            if (subcommand === 'channel') {
                if (!args.length) {
                    if(guildConfig.roleChannel === '') {
                        message.channel.send('There are no channel configured at the moment');
                    } else {
                        message.channel.send(`The bot will assign roles on message reactions in ${message.guild.channels.cache.find(c => c.id === guildConfig.roleChannel).toString()}`);
                    }
                } else {
                    let channel = message.guild.channels.cache.find(c => c.name === args[0]);
    
                    if (channel) {
                        guildConfig.roleChannel = channel.id;
                        await guildConfig.save();
                        message.channel.send(`The bot will now listen to reactions on channel ${channel.toString()}`);
                    } else {
                        message.reply(`The channel \`${args[0]}\` does not exist on this server !`);
                    } 
                }
            }
        }
        
    }
}