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
        expect(message.reply).toHaveBeenCalledWith("Please enter the amount of messages you want to clear, eg : !clear 5");
    })

    it ("should return error arg is NaN", async () => {
        clearCommand.execute(message, ['?'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith("Please enter a number as an argument !");
    })

    it ("should return error if arg < 1 or arg > 100", async () => {
        clearCommand.execute(message, ['-1'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith("Sorry but you must at least delete one message !");
        clearCommand.execute(message, ['101'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith("Sorry but I can't clean more than 100 messages");
    })
})