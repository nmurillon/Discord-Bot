const { client,
    Discord,
    mockMessage,
    guildConfig,
    language } = require('../configTest');
const prefixCommand = require("../../src/commands/prefix");

describe("Prefix Command", () => {
    const message = mockMessage('');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return help", () => {
        prefixCommand.execute(message, [], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(`${language.prefix.noArg}\n${language.prefix.help}`);
    })

    it ("should return update success", async () => {
        await prefixCommand.execute(message, ['?'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.prefix.update.replace('<prefix>', '?'));
        guildConfig.prefix = '!';
    })

    it ("should return update error", async () => {
        const args = ['?', '$'];
        await prefixCommand.execute(message, args, Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.prefix.updateError.replace('<prefix>', args.join(' ')));
    })
})