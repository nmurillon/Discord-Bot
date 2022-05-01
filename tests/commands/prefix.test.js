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
        expect(message.reply).toHaveBeenCalledWith("You can't use the `prefix` command without arguments !\n`prefix` command usage : `<prefix>prefix <newPrefix>` where <newPrefix> is the prefix that will be used to call bot's commands");
    })

    it ("should return update success", async () => {
        await prefixCommand.execute(message, ['?'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith("The command prefix has changed : you can now call a command with `?`");
        guildConfig.prefix = '!';
    })

    it ("should return update error", async () => {
        await prefixCommand.execute(message, ['?', '$'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith("The prefix must be a one word string ! You tried to give the following one : `? $`");
    })
})