const { Guild } = require('discord.js');
const guildProfileModel = require('../../models/guildConfigSchema')

module.exports = async (_client, _Discord, guild) => {
    let guildConfig;
    try {
        guildConfig = await guildProfileModel.findOne({ guildID: guild.id });
        if (!guildConfig) {
            guildConfig = new guildProfileModel({
                guildID: guild.id
            })

            await guildConfig.save();
        }
    } catch (err) {
        console.log(`An error occured while saving the guild profile : ${err}`);
    }

    console.log(`SaintMaclou joined a guild !`);
}