import { RunCommands } from "./Command"

interface TimeCommand 
{
  timestamps : Map< any , any >,
  currentTime : number,
  cooldownAmount : number
}

export const runCommands = ({args , commandPrefix , message , commands} : RunCommands ) => 
{
  try 
  {
    commands.get(commandPrefix)?.callback(message , ...args)
  } 
  catch (err) 
  {
    console.error(err)
  }
}


export const runCommandsTimeout = ({
  args , commandPrefix , commands , message , cooldownAmount , currentTime , timestamps 
} : RunCommands & TimeCommand) => 
{
  try {
    commands.get(commandPrefix)?.callback(message , ...args)
    timestamps.set(message.author.id , currentTime)
    setTimeout(() => timestamps.delete(message.author.id) , cooldownAmount)
  } catch (err) {
    console.error(err)
  }
}