import { Message } from "discord.js";

export interface Command 
{
  [key : string] : any
}

interface RunCommands 
{
  commands : Command,
  commandPrefix : string,
  message : Message<boolean>,
  args :  string[]
}

interface TimeCommand 
{
  timeStamps : Map< any , any >,
  currentTime : number,
  cooldownAmount : number
}

export const runCommands = ({args , commandPrefix , message , commands} : RunCommands ) => 
{
  try 
  {
    commands[commandPrefix].callback(message , ...args)
  } 
  catch (err) 
  {
    console.error(err);
  }
}


export const runCommandsTimeout = ({
  args , commandPrefix , commands , message , cooldownAmount , currentTime , timeStamps
} : RunCommands & TimeCommand) => 
{
  try {
    commands[commandPrefix].callback(message , ...args)
    timeStamps.set(message.author.id , currentTime)
    setTimeout(() => timeStamps.delete(message.author.id) , cooldownAmount)
  } catch (err) {
    console.error(err); 
  }
}