const fs = require('fs');

module.exports = (client, _Discord) => {
    const languageFiles = fs.readdirSync('./src/languages/').filter(file => file.endsWith('json'));

    for (const file of languageFiles) {
        const language = require(`../languages/${file}`);
        const language_name = file.split('.')[0];

        client.languages.set(language_name, language);
    }
}