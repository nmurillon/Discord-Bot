import { Bot } from '../../models/bot';

export default (bot: Bot) => {
    console.log(`Logged as ${bot.client.user!.tag}`);
}