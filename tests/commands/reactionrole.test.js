const { client,
    Discord,
    mockMessage,
    guildConfig,
    language } = require('../configTest');
const reactionroleCommand = require("../../src/commands/reactionRole");

describe("Reaction Role Command", () => {
    const message = mockMessage('');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return reaction message", async () => {
        await reactionroleCommand.execute(message, [], Discord, client, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalled();
    })

    it ("channel subcommand", async () => {
        /* No channel configured */
        await reactionroleCommand.execute(message, ['--channel'], Discord, client, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalledWith(language.reactionrole.noRoleChannel);
        guildConfig.roleChannel = 'get-role';

        /* Channel is configured */
        await reactionroleCommand.execute(message, ['--channel'], Discord, client, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalledWith(language.reactionrole.roleChannel.replace('<channel>', 'get-role'));
        guildConfig.roleChannel = '';

        /* Configure a channel */
        await reactionroleCommand.execute(message, ['--channel', 'get-role'], Discord, client, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalledWith(language.reactionrole.roleChannelUpdate.replace('<channel>', 'get-role'));
        guildConfig.roleChannel = '';
    })

    it ("role subcommand", async () => {
        guildConfig.roleAssign.size = 0;
        await reactionroleCommand.execute(message, ['--role'], Discord, client, guildConfig, language);
        expect(message.reply).toHaveBeenCalledWith(language.reactionrole.noAssignableRole);

        guildConfig.roleAssign.size = 1;
        await reactionroleCommand.execute(message, ['--role'], Discord, client, guildConfig, language);
        expect(message.channel.send).toHaveBeenCalled();
    })
})