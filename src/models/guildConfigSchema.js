const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema({
    guildID: { type: String, require: true, unique: true },
    prefix: { type: String, default: '!' },
    language: { type: String, default: 'en' },
    roleChannel: { type: String, default: '' },
    roleAssign: { type: Map, of: Object, default: {} }
})

const model = mongoose.model('guildConfigModels', guildConfigSchema);

module.exports = model;