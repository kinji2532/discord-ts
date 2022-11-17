"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable arrow-spacing */ /* eslint-disable space-before-blocks */ /* eslint-disable keyword-spacing */ /* eslint-disable array-bracket-spacing */ /* eslint-disable brace-style */ /* eslint-disable semi */
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const operator = [
    '395010195090178058',
    '440093776573235200',
    '397345363415007253'
];
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
client.once('ready', async () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
    const channel = await client.channels.fetch('599272915153715201');
    if (channel instanceof discord_js_1.TextChannel) {
        channel.bulkDelete(100);
        channel.send('起動');
    }
});
client.on('messageCreate', (message) => {
    if (message.author.bot)
        return;
    if (message.content.startsWith('/')) {
        const [cmds, ...args] = message.content.slice(1).split(/ |\n/g);
        const list = fs_1.default.readdirSync('/app/build/cmds');
        if (list.includes(cmds + '.js')) {
            try {
                require('./cmds/' + cmds)
                    .func(client, message, operator, ...args);
            }
            catch (e) {
                message.channel.send((0, util_1.inspect)(e))
                    .then(msg => msg.react('721260517875777546'));
            }
        }
        else {
            message.channel.send('そのようなコマンドはありません')
                .then(msg => msg.react('721260517875777546'));
        }
    }
});
client.on('messageReactionAdd', (reaction, user) => {
    if (!user.bot) {
        if (reaction.emoji.id === '721258817546878976') {
            if (reaction.message instanceof discord_js_1.Message && user instanceof discord_js_1.User) {
                const message = reaction.message;
                client.emit('messageCreate', message);
                reaction.users.remove(user);
            }
        }
        else if (reaction.emoji.id === '721260517875777546') {
            reaction.message.delete();
        }
    }
});
process.on('uncaughtException', async (reason, p) => {
    const channel = await client.channels.fetch('599272915153715201');
    if (channel instanceof discord_js_1.TextChannel) {
        channel.send('uncaught:\n' + (0, util_1.inspect)(reason).slice(0, 1900));
    }
});
process.on('unhandledRejection', async (error) => {
    const channel = await client.channels.fetch('599272915153715201');
    if (channel instanceof discord_js_1.TextChannel) {
        channel.send('unhandled:\n' + (0, util_1.inspect)(error).slice(0, 1900));
    }
});
client.login(process.env.BOT_TOKEN);
