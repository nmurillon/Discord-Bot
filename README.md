# Discord-Bot
Personal project to learn more about js 

If you want to invite the bot :

`https://discord.com/oauth2/authorize?client_id=954119938350669886&permissions=1237222681713&scope=bot`

for dev : https://discord.com/oauth2/authorize?client_id=970388327461183558&permissions=1237222681713&scope=bot

## TODO LIST

Create all interfaces

TODO: trim strings to remove trailing spaces in args
TODO: rework error message when emoji can not be asigned to role reaction command

Rework error handling --> see Error like DiscordAPIError for example

/home/site/wwwroot/node_modules/discord.js/src/rest/RequestHandler.js:350
2022-05-31T21:31:57.911793392Z       throw new DiscordAPIError(data, res.status, request);
2022-05-31T21:31:57.911810992Z             ^
2022-05-31T21:31:57.911855293Z
2022-05-31T21:31:57.911864193Z DiscordAPIError: Missing Permissions
2022-05-31T21:31:57.911870493Z     at RequestHandler.execute (/home/site/wwwroot/node_modules/discord.js/src/rest/RequestHandler.js:350:13)
2022-05-31T21:31:57.911877293Z     at runMicrotasks (<anonymous>)
2022-05-31T21:31:57.911884293Z     at processTicksAndRejections (node:internal/process/task_queues:96:5)
2022-05-31T21:31:57.911891293Z     at async RequestHandler.push (/home/site/wwwroot/node_modules/discord.js/src/rest/RequestHandler.js:51:14)
2022-05-31T21:31:57.911898093Z     at async GuildMemberRoleManager.add (/home/site/wwwroot/node_modules/discord.js/src/managers/GuildMemberRoleManager.js:124:7)
2022-05-31T21:31:57.911904193Z     at async module.exports (/home/site/wwwroot/src/events/guild/messageReactionAdd.js:13:19) {
2022-05-31T21:31:57.911910694Z   method: 'put',
2022-05-31T21:31:57.911916594Z   path: '/guilds/828383790833467422/members/456197893397807125/roles/830554056803876894',
2022-05-31T21:31:57.911923194Z   code: 50013,
2022-05-31T21:31:57.911928994Z   httpStatus: 403,
2022-05-31T21:31:57.911934594Z   requestData: { json: undefined, files: [] }
2022-05-31T21:31:57.911955894Z }
2022-05-31T21:31:58.018523528Z npm info lifecycle discord-bot@0.0.1~start: Failed to exec start script
2022-05-31T21:31:58.027555050Z npm ERR! code ELIFECYCLE
2022-05-31T21:31:58.027596750Z npm ERR! errno 1
2022-05-31T21:31:58.029086771Z npm ERR! discord-bot@0.0.1 start: `node --trace-deprecation -r dotenv/config index.js dotenv_config_path=.env.prod`
2022-05-31T21:31:58.029718779Z npm ERR! Exit status 1
2022-05-31T21:31:58.038818102Z npm ERR!
2022-05-31T21:31:58.038845102Z npm ERR! Failed at the discord-bot@0.0.1 start script.
2022-05-31T21:31:58.038853402Z npm ERR! This is probably not a problem with npm. There is likely additional logging output above.