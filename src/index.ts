import { Message, Client } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

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
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

client.once('ready', () => {
  console.log('ready!')
  console.log(client.user?.tag)
})

client.on('messageCreate', (message: Message) => {
  if (message.author.bot) return
  if (message.content.startsWith('!ping')) {
    message.channel.send('pong!')
  }
})

client.login(process.env.BOT_TOKEN)
