import { Client, Message, AnyChannel, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

import './cmds/eval.js';

dotenv.config();

const client = new Client({
  restTimeOffset: 1,
  intents: [
    'GUILDS', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES',
    'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_BANS',
    'GUILD_MESSAGE_TYPING', 'GUILD_MESSAGE_REACTIONS',
    'GUILD_PRESENCES', 'GUILD_MESSAGES', 'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'
  ],
  partials: [ 'MESSAGE', 'CHANNEL', 'REACTION' ]
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  const channel: AnyChannel | null = await client.channels.fetch('599272915153715201');
  if(channel instanceof TextChannel){
    channel.bulkDelete(100);
    channel.send("起動");
  }
});

client.on('messageCreate', (message: Message) => {
  if (message.author.bot) return
  if (message.content.startsWith('/')) {
    type list = [ string, ...string[] ];
    const [ cmds, ...args ] = message.content.split(' ');
    const list: Array = fs.readdirSync('/app/build/cmds');
    if (list.includes(cmds)) {
      try {
        import * as func from `./cmds/${cmds}`;
        func(message.channel,args.join(' '));
      } catch(e) {
        console.log(e);
      }
    } else {
      message.channel.send('そのようなコマンドはありません');
    }
  }
});

client.login(process.env.BOT_TOKEN);
