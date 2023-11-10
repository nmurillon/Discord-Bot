import { bot, mockMessage, guildConfig, language } from '../setup/mocks';
import PingCommand from "@commands/ping";

describe("Ping Command", () => {
    const message = mockMessage('');
    const pingCommand = new PingCommand();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return pong!", async () => {
        pingCommand.execute(message, [], bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith('pong!');
    })
})