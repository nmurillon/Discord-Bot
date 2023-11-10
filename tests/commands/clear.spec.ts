import { bot, mockMessage, language, guildConfig } from "../setup/mocks";
import ClearCommand from "@commands/clear";

describe("Clear Command", () => {
    const message = mockMessage('');
    const clearCommand = new ClearCommand();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return error no args", () => {
        clearCommand.execute(message, [], bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.noArg);
    })

    it ("should return error arg is NaN", async () => {
        clearCommand.execute(message, ['?'], bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.nan);
    })

    it ("should return error if arg < 1 or arg > 100", async () => {
        clearCommand.execute(message, ['-1'], bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.atLeastOne);
        clearCommand.execute(message, ['101'] ,bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.clear.atMostHundred);
    })
})