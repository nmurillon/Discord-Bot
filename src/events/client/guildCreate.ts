import { Guild } from "discord.js";

import { Bot } from "../../models/bot";

import { GuildConfigModel, IGuildConfig } from '../../models/guildConfigSchema';

export default async (_bot: Bot, guild: Guild) => {
  let guildConfig: null|IGuildConfig;
  try {
    guildConfig = await GuildConfigModel.findOne({ guildID: guild.id }).exec();
    if (!guildConfig) {
      guildConfig = new GuildConfigModel({
        guildID: guild.id
      })

      await guildConfig.save().catch(console.error);
    }
  } catch (err) {
    console.log(`An error occured while saving the guild profile : ${err}`);
  }

  console.log(`SaintMaclou joined a guild !`);
}