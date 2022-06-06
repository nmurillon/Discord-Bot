import { readdirSync } from 'fs';

import { Bot } from '../models/bot';

export default (bot: Bot) => {
  const languageFiles = readdirSync('./src/languages/').filter(file => file.endsWith('json'));

  for (const file of languageFiles) {
    const language = require(`../languages/${file}`);
    const language_name = file.split('.')[0];

    bot.languages.set(language_name, language);
  }
}