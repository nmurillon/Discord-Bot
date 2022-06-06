import { readdirSync } from 'fs';

import { Bot } from '@models/bot';

export default (bot: Bot) => {
  const commandFiles = readdirSync('./src/commands/').filter(file => file.endsWith('ts'));

  for (const file of commandFiles) {
    const commandType = require(`../commands/${file}`).default;

    const command = new commandType();
    if (command.name) {
      bot.commands.set(command.name, command);
      console.log(`Registering command ${command.name}`);
    } else {
      continue;
    }
  }
}