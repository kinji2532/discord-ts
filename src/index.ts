import { Client, Message, AnyChannel, TextChannel, messageReaction, User } from 'discord.js';
import { inspect } from 'util';
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
    const [ cmds, type, ...args ] = message.content.slice(1).split(/ |\n/g);
    const list: string[] = fs.readdirSync('/app/build/cmds');
    if (list.includes(cmds+'.js')) {
      try {
        require('./cmds/'+cmds).func(message.channel,type,args.join(' '));
      } catch(e) {
        message.channel.send(inspect(e));
      }
    } else {
      message.channel.send('そのようなコマンドはありません');
    }
  }
});

client.on('messageReactionAdd', (reaction: messageReaction, user: User)=>{
  if(!user.bot){
    if(reaction.emoji.id == '721258817546878976'){
      let message: Message = reaction.message;
      client.emit('messageCreate', message);
      reaction.users.remove(user);
    }
    else if(reaction.emoji.id == '721260517875777546'){
      reaction.message.delete();
    }
  }
});

client.login(process.env.BOT_TOKEN);
