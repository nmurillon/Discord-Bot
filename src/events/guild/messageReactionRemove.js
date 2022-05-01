const guildConfigModel = require('../../models/guildConfigSchema');

module.exports = async (_client, _Discord, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;

    const guildConfig = await guildConfigModel.findOne({guildID: reaction.message.guild.id});
    if (reaction.message.channel.id !== guildConfig.roleChannel) return;

    if (guildConfig.roleAssign.has(reaction.emoji.name)) {
        const role = await reaction.message.guild.roles.cache.find(r => r.id === guildConfig.roleAssign.get(reaction.emoji.name));
        if (role) await reaction.message.guild.members.cache.get(user.id).roles.remove(role);
    }
}