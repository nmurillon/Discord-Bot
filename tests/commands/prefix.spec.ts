import { bot, mockMessage, guildConfig, language } from '../setup/mocks';
import PrefixCommand from "@commands/prefix";

describe("Prefix Command", () => {
    const message = mockMessage('');
    const prefixCommand = new PrefixCommand();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return help", () => {
        prefixCommand.execute(message, [], bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(`${language.prefix.noArg}\n${language.prefix.help}`);
    })

    it ("should return update success", async () => {
        await prefixCommand.execute(message, ['?'], bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.prefix.update.replace('<prefix>', '?'));
        guildConfig.prefix = '!';
    })

    it ("should return update error", async () => {
        const args = ['?', '$'];
        await prefixCommand.execute(message, args, bot , guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.prefix.updateError.replace('<prefix>', args.join(' ')));
    })
})