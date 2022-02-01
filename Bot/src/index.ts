// Importing the modules 

import * as DiscordJS from "discord.js"
import { config } from "dotenv"
import commandHandler from "./commandHandler"

// Config the App


config()
const bot = new DiscordJS.Client(
  {
    intents : 
    [
      DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
      DiscordJS.Intents.FLAGS.GUILDS,
      DiscordJS.Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials :
    [
      "MESSAGE" , "CHANNEL" , "REACTION"
    ]
  }
)

// Events

bot.on("ready" , async() => 
{
  console.log(`Bot is ready as ${bot.user?.tag}`)
  
  commandHandler(bot)
})



// Listener

bot.login(process.env.TOKEN)
