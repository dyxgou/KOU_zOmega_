import { Client, Collection } from "discord.js"
import getFiles from "./getFiles"
import { ICommand } from "./utils/Command"
import { runCommands, runCommandsTimeout } from "./utils/runCommands"


const prefix = "z!"

const suffix = __filename.slice(__filename.length - 3)

const commandHandler = (bot : Client) => 
{
  
  const commands : Map< string , ICommand > = new Map()

  const commandsFiles = getFiles(`${__dirname}\\commands` , suffix)

  const cooldowns = new Map()

  for (const commandRoute of commandsFiles) 
  {
    const commandFile = require(commandRoute)

    const split = commandRoute.replace(/\\/g , "/").split("/")

    const commandName = split.at(-1)?.replace(suffix , "") || ""

    try {
      commands.set(commandName , commandFile.default)
      console.log(`| ✔ | ${commandName}`)

      if(commands.get(commandName)?.cooldown)
      {
        if(!cooldowns.has(commandName))
        {
          cooldowns.set(commandName , new Collection())
        }
      }

    } catch (err) {
      console.error(err)
    }
  }

  bot.on("messageCreate" , async(message) => 
  {
    const args = message.content.slice(prefix.length).split(" ")
    const commandPrefix = args.shift()!.toLowerCase()
    if(message.author.bot)
    {
      return
    }

    if(!message.guild)
    {
      return 
    }

    if(!message.content.startsWith(prefix))
    {
      return
    }
    
    if(!commands.has(commandPrefix))
    {
      return
    }

    const timestamps : Map< any , any > = cooldowns.get(commandPrefix)
    const currentTime = Date.now()
    
    if(commands.get(commandPrefix)?.cooldown)
    {
      const currentCommand = commands.get(commandPrefix)

      const cooldownAmount = (currentCommand?.cooldown ?? 0) * 1000
      
      if(timestamps.has(message.author.id))
      {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if(currentTime < expirationTime)
        {
          const timeLeft = (expirationTime - currentTime) / 1000

          message.reply(`Por favor espera ${timeLeft.toFixed(0)} segundos para volver a ejecutar \`z!${commandPrefix}\` otra vez.`)
        }
        else
        {
          runCommands({ args , commandPrefix , commands ,  message })
        }
      }
      else
      {
        runCommandsTimeout({
          args , commandPrefix , commands , message , cooldownAmount , currentTime , timestamps
        })
      }
    }
    else
    {
      runCommands({ args , commandPrefix ,commands , message })
    }
  })
}


export default commandHandler