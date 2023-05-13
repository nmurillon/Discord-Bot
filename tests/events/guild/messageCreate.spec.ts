import messageCreateEvent from "../../../src/events/guild/messageCreate";
import { bot, mockMessage } from "../../setup/mocks";

describe("message create event", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should not execute any command", async () => {
        expect(await messageCreateEvent(bot, mockMessage('Hello World'))).toBeUndefined();
    })

    it ("should return command not found", async () => {
        const message = mockMessage('!Hello');
        await messageCreateEvent(bot, message)
        expect(message.channel.send).toHaveBeenCalledWith("The command `hello` does not exist");
    })

    it ("should return missing permissions", async () => {
        const message = mockMessage('!clear', []);
        await messageCreateEvent(bot, message)
        expect(message.reply).toHaveBeenCalledWith("Missing permissions: `MANAGE_MESSAGES`");
    })
})