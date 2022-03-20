"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    restTimeOffset: 1,
    intents: [
        'GUILDS', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES',
        'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_BANS',
        'GUILD_MESSAGE_TYPING', 'GUILD_MESSAGE_REACTIONS',
        'GUILD_PRESENCES', 'GUILD_MESSAGES', 'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
client.once('ready', () => {
    var _a;
    console.log('ready!');
    console.log((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag);
});
client.on('messageCreate', (message) => {
    if (message.author.bot)
        return;
    if (message.content.startsWith('!ping')) {
        message.channel.send('pong!');
    }
});
client.login(process.env.TOKEN);
