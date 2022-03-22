module.exports = {
    name: 'reactionrole',
    description: 'Add a role to a user after message reaction',
    async execute(message, args, Discord, client, guildConfig) {
        /* Emojis associated to the roles */
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
    }
}