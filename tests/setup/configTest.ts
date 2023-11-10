const mockingoose = require('mockingoose');
import { GuildConfigModel } from '@models/guildConfigSchema';
import { guildConfig } from './mocks';

/// Mock for express
function mockExpress() {
    return {
        get: jest.fn(),
        listen: jest.fn()
    }
}

jest.mock('express', () => {
    return mockExpress;
});

/// Mocking Mongoose
mockingoose(GuildConfigModel).toReturn(guildConfig, 'findOne');
mockingoose(GuildConfigModel).toReturn(guildConfig, 'save');