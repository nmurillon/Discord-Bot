import { Guild } from "discord.js";

import { Bot } from "../../models/bot";

import guildProfileModel, { IGuildConfig } from '../../models/guildConfigSchema';

export default async (_bot: Bot, guild: Guild) => {
    let guildConfig: null|IGuildConfig;
    try {
        guildConfig = await guildProfileModel.findOne({ guildID: guild.id });
        if (!guildConfig) {
            guildConfig = new guildProfileModel({
                guildID: guild.id
            })

            await guildConfig.save().catch(console.error);
        }
    } catch (err) {
        console.log(`An error occured while saving the guild profile : ${err}`);
    }

    console.log(`SaintMaclou joined a guild !`);
}