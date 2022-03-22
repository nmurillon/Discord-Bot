const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema({
    guildID: { type: String, require: true, unique: true },
    prefix: { type: String, default: '!' },
    roleChannel: { type: String, default: '' },
})

const model = mongoose.model('guildConfigModels', guildConfigSchema);

module.exports = model;