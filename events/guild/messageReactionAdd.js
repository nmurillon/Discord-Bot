module.exports = async (client, Discord, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    /* First, we define the channel we need to look for */
    const channel = '954780304369913916'; // put channel Id here
    if (reaction.message.channel.id !== channel) return;

    /* Get the roles from the discord server */
    const carpette = reaction.message.guild.roles.cache.find(role => role.name === 'Carpette');
    const clAmie = reaction.message.guild.roles.cache.find(role => role.name === 'CL Amie');

    /* Emojis associated to the roles */
    const carpetteEmoji = '👌🏻';
    const clAmieEmoji = '🤝';

    if (reaction.emoji.name === carpetteEmoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.add(carpette);
    }
    if (reaction.emoji.name === clAmieEmoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.add(clAmie);
    }   
}