import { bot, mockMessage, guildConfig, language } from '../setup/mocks';
import ReactionroleCommand from "@commands/reactionRole";

describe("Reaction Role Command", () => {
    const message = mockMessage('');
    const reactionroleCommand = new ReactionroleCommand();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return reaction message", async () => {
        await reactionroleCommand.execute(message, [], bot, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalled();
    })

    it ("channel subcommand", async () => {
        /* No channel configured */
        await reactionroleCommand.execute(message, ['--channel'], bot, guildConfig, language);
        expect(message.channel.send).toBeCalledTimes(1);
        expect(message.channel.send).toHaveBeenCalledWith(language.reactionrole.noRoleChannel);
        guildConfig.roleChannel = 'get-role';

        /* Channel is configured */
        await reactionroleCommand.execute(message, ['--channel'], bot, guildConfig, language);
        expect(message.channel.send).toBeCalledTimes(2);
        expect(message.channel.send).toHaveBeenCalledWith(language.reactionrole.roleChannel.replace('<channel>', 'get-role'));
        guildConfig.roleChannel = '';

        /* Configure a channel */
        await reactionroleCommand.execute(message, ['--channel', 'get-role'], bot, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalledWith(language.reactionrole.roleChannelUpdate.replace('<channel>', 'get-role'));
        guildConfig.roleChannel = '';
    })

    it ("role subcommand", async () => {
        let testGuildConfig = guildConfig;
        testGuildConfig.roleAssign = new Map<string, string>;
        await reactionroleCommand.execute(message, ['--role'], bot, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.reactionrole.noAssignableRole);

        testGuildConfig.roleAssign.set('', '');
        await reactionroleCommand.execute(message, ['--role'], bot, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalled();
    })
})