import { Schema, model, Document } from "mongoose";

export interface IGuildConfig extends Document {
  guildID: string,
  prefix: string,
  language: string,
  roleChannel: string,
  roleAssign: Map<string,string>
}

const guildConfigSchema = new Schema({
    guildID: { type: String, require: true, unique: true },
    prefix: { type: String, default: '!' },
    language: { type: String, default: 'en' },
    roleChannel: { type: String, default: '' },
    roleAssign: { type: Map, of: String, default: new Map<string, string>() }
})

const GuildConfig = model<IGuildConfig>('guildConfigModels', guildConfigSchema);

export default GuildConfig;