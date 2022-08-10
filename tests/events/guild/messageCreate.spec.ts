import messageCreateEvent from "../../../src/events/guild/messageCreate";
import ConfigTest from '../../configTest';

describe("message create event", () => {
    const config = new ConfigTest();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should not execute any command", async () => {
        expect(await messageCreateEvent(config.bot, config.mockMessage('Hello world'))).toBeUndefined();
    })

    it ("should return command not found", async () => {
        const message = config.mockMessage('!Hello');
        await messageCreateEvent(config.bot, message)
        expect(message.channel.send).toHaveBeenCalledWith("The command `hello` does not exist");
    })

    it ("should return missing permissions", async () => {
        const message = config.mockMessage('!clear', []);
        await messageCreateEvent(config.bot, message)
        expect(message.reply).toHaveBeenCalledWith("Missing permissions: `MANAGE_MESSAGES`");
    })
})