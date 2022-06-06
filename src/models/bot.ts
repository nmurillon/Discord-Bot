import { Client } from "discord.js";
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

import { Command } from "./command";
import { Language } from "./language";

export class Bot {
  client: Client;
  app: Express;
  commands: Map<string, Command>;
  languages: Map<string, Language>;

  constructor(client: Client) {
    this.client = client;
    this.app = express();
    this.commands = new Map<string, Command>();
    this.languages = new Map<string, Language>();
  }

  public init(): void {
    ['command_handler', 'event_handler', 'language_handler'].forEach(handler => {
      const h = require(`@handlers/${handler}.ts`).default;
      h(this);
    });
    this.client.login(process.env.TOKEN);

    /* Usefull for Azure App servcices, it needs something listening on port 8080 */
    this.app.get('/', function (_req: Request, res: Response) {
      res.send('hello world');
    });

    this.app.listen(8080);

    mongoose.connect(process.env.MONGO_SRV as string).then(() => {
      console.log('Succesfully connected to the database');
    }).catch((err: any) => {
      console.error(err);
    });
  }
}