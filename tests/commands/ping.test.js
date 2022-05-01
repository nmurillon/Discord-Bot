const { client,
    Discord,
    mockMessage,
    guildConfig,
    language } = require('../configTest');
const pingCommand = require("../../src/commands/ping");

describe("Ping Command", () => {
    const message = mockMessage('');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return pong!", async () => {
        pingCommand.execute(message, [], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith('pong!');
    })
})