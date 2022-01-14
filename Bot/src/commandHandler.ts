import { Client , Collection } from "discord.js"
import getFiles from "./getFiles"
import { Command , runCommands , runCommandsTimeout } from "../src/utils/runCommands"



const prefix = "z!"
const commandHandler = (client : Client) => 
{
  
  let commands : Command = {}

  const suffix = ".ts"
  const commandsFiles = getFiles("./src/commands" , suffix)

  const cooldowns = new Map()
  
  for (const command of commandsFiles) 
  {
    const commandFile = require(command)
    
    const split = command.replace(/\\/g , "/").split("/")
    
    const commandName = split.at(-1)?.replace(suffix , "")
    
    commands[commandName?.toLowerCase() || "" ] = commandFile.default
    
    if(commands[commandName?.toLowerCase() || ""].cooldown)
    {
      if(!cooldowns.has(commandName))
      {
        cooldowns.set(commandName , new Collection())
      }   
    }
  }
  console.log(commands);
   
  
  client.on("messageCreate" , (message) => 
  {
    if(message.author.bot || !message.content.startsWith(prefix))
    {
      return
    }

    const args = message.content.slice(prefix.length).split(" ")
    const commandPrefix = args.shift()!.toLowerCase()
    const currentTime = Date.now()    
    const timeStamps : Map< any , any > = cooldowns.get(commandPrefix)

    if(!commands[commandPrefix])
    {
      return
    }

    const cooldownAmount = (commands[commandPrefix].cooldown) * 1000 || 0
    
    if(commands[commandPrefix].cooldown)
    {
      if(timeStamps.has(message.author.id))
      {
        const expirationTime = timeStamps.get(message.author.id)  + cooldownAmount
        
        if(currentTime < expirationTime)
        {
          const timeLeft = (expirationTime - currentTime) / 1000

          message.reply({
            content: `Por favor espera ${timeLeft.toFixed(1)} segundos para ejecutar \`z!${commandPrefix}\` otra vez.`
          })
        }
        else
        {
          // Run commands without Time out
          runCommands({ args , commandPrefix , commands , message })
        }
      }
      else
      {
        // Run Command with Timeout
        runCommandsTimeout({
          args , commandPrefix , commands , message , cooldownAmount , currentTime , timeStamps 
        })
      }
    }
    else
    {
      //  If the command doesn't have cooldown
      runCommands({ args , commandPrefix , commands , message })
    }
    
    
    console.log(timeStamps);
    
  })



}

export default commandHandler