const { client,
Discord,
mockMessage,
guildConfig,
language } = require('../configTest');
const clearCommand = require("../../src/commands/clear");

describe("Clear Command", () => {
    const message = mockMessage('');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return error no args", () => {
        clearCommand.execute(message, [], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.noArg);
    })

    it ("should return error arg is NaN", async () => {
        clearCommand.execute(message, ['?'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.nan);
    })

    it ("should return error if arg < 1 or arg > 100", async () => {
        clearCommand.execute(message, ['-1'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.atLeastOne);
        clearCommand.execute(message, ['101'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.atMostHundred);
    })
})