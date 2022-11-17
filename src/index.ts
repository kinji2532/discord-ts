/* eslint-disable arrow-spacing *//* eslint-disable space-before-blocks *//* eslint-disable keyword-spacing *//* eslint-disable array-bracket-spacing *//* eslint-disable brace-style *//* eslint-disable semi */
import {
  Client, Message, AnyChannel,
  TextChannel, MessageReaction,
  PartialMessageReaction,
  PartialUser, User
} from 'discord.js';
import { inspect } from 'util';
import dotenv from 'dotenv';
import fs from 'fs';

const operator = [
  '395010195090178058',
  '440093776573235200',
  '397345363415007253'
];

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
  if (channel instanceof TextChannel){
    channel.bulkDelete(100);
    channel.send('起動');
  }
});

client.on('messageCreate', (message: Message) => {
  if(message.author.bot) return;
  if(message.content.startsWith('/')){
    const [ cmds, ...args ] = message.content.slice(1).split(/ |\n/g);
    const list: string[] = fs.readdirSync('/app/build/cmds');
    if (list.includes(cmds + '.js')){
      try{
        require('./cmds/' + cmds)
          .func(client, message, operator, ...args);
      }catch(e){
        message.channel.send(inspect(e))
          .then((msg: { react: (arg0: string) => Message; })=>msg.react('721260517875777546'));
      }
    }else{
      message.channel.send('そのようなコマンドはありません')
        .then((msg: { react: (arg0: string) => Message; })=>msg.react('721260517875777546'));
    }
  }
});

client.on('messageReactionAdd',( reaction: MessageReaction | PartialMessageReaction, user: PartialUser | User )=>{
  if(!user.bot) {
    if(reaction.emoji.id === '721258817546878976') {
      if(reaction.message instanceof Message && user instanceof User) {
        const message: Message = reaction.message;
        client.emit('messageCreate', message);
        reaction.users.remove(user);
      }
    }
    else if(reaction.emoji.id === '721260517875777546') {
      reaction.message.delete();
    }
  }
});

process.on('uncaughtException', async (reason: any, p: any) => {
  const channel: AnyChannel | null = await client.channels.fetch('599272915153715201');
  if (channel instanceof TextChannel){
    channel.send('uncaught:\n'+inspect(reason).slice(0,1900));
  }
});
process.on('unhandledRejection', async (error: any) => {
  const channel: AnyChannel | null = await client.channels.fetch('599272915153715201');
  if (channel instanceof TextChannel){
    channel.send('unhandled:\n'+inspect(error).slice(0,1900));
  }
});

client.login(process.env.BOT_TOKEN);
