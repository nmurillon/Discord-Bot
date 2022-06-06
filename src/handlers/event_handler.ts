import { readdirSync } from 'fs';

import { Bot } from '@models/bot';

export default (bot: Bot) => {
    const load_dir = (dir: string) => {
        const event_files = readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.ts'));

        for (const file of event_files) {
            const event = require(`../events/${dir}/${file}`).default;
            const event_name = file.split('.')[0]
            bot.client.on(event_name, event.bind(null, bot));
        }
    }

    /* Loading all the events */
    ['client', 'guild'].forEach(e => load_dir(e))
}