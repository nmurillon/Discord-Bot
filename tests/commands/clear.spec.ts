import ConfigTest from '../configTest';
import ClearCommand from '../../src/commands/clear';

describe("Clear Command", () => {
    const config = new ConfigTest();
    const command = new ClearCommand();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return error no args", async () => {
        const message = config.mockMessage();
        await command.execute(message, [], config.bot, config.guildConfig, config.language!);

        expect(message.reply).toHaveBeenCalledWith(config.language!.clear.noArg);
    })

    it ("should return error arg is NaN", async () => {
        const message = config.mockMessage();
        await command.execute(message, ['?'], config.bot, config.guildConfig, config.language!);
        expect(message.reply).toHaveBeenCalledWith(config.language!.clear.nan);
    })

    it ("should return error if arg < 1 or arg > 100", async () => {
        const message = config.mockMessage();
        await command.execute(message, ['-1'], config.bot, config.guildConfig, config.language!);
        expect(message.reply).toHaveBeenCalledWith(config.language!.clear.atLeastOne);

        await command.execute(message, ['101'], config.bot, config.guildConfig, config.language!);
        expect(message.reply).toHaveBeenCalledWith(config.language!.clear.atMostHundred);
    })
})