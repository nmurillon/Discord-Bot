import mongoose from 'mongoose';
import  { GuildConfigModel, IGuildConfig } from '@models/guildConfigSchema';
jest.mock('@models/guildConfigSchema')


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
const guildConfig =  {
    guildID: '',
    prefix: '!',
    language: 'en',
    roleChannel: '',
} as IGuildConfig;

mongoose.connect = jest.fn().mockImplementation(() => Promise.resolve());
jest.spyOn(GuildConfigModel, 'findOne').mockResolvedValue(Promise.resolve(guildConfig));