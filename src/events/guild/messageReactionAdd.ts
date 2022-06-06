import { MessageReaction, Role, User } from 'discord.js';

import { Bot } from '../../models/bot';
import guildConfigModel from '../../models/guildConfigSchema';

export default async (_bot: Bot, reaction: MessageReaction, user: User) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;

  const guildConfig = await guildConfigModel.findOne({guildID: reaction.message.guild!.id});
  if (reaction.message.channel.id !== guildConfig!.roleChannel) return;

  if (guildConfig!.roleAssign.has(reaction.emoji.name!)) {
    const role = reaction.message.guild!.roles.cache.find((r: Role) => r.id === guildConfig!.roleAssign.get(reaction.emoji.name!));
    if (role) await reaction.message.guild!.members.cache.get(user.id)!.roles.add(role);
  }
}