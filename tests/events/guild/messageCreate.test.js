const { client, Discord, mockMessage } = require('../../configTest');
const messageCreateEvent = require("../../../src/events/guild/messageCreate");

describe("message create event", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should not execute any command", async () => {
        expect(await messageCreateEvent(client, Discord, mockMessage('Hello World'))).toBeUndefined();
    })

    it ("should return command not found", async () => {
        const message = mockMessage('!Hello');
        await messageCreateEvent(client, Discord, message)
        expect(message.channel.send).toHaveBeenCalledWith("The command `hello` does not exist");
    })

    it ("should return missing permissions", async () => {
        const message = mockMessage('!clear', []);
        await messageCreateEvent(client, Discord, message)
        expect(message.reply).toHaveBeenCalledWith("Missing permissions: `MANAGE_MESSAGES`");
    })
})