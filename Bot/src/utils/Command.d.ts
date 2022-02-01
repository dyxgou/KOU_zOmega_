import { Message } from "discord.js"

export interface ICommand 
{
  callback : (message : Message , ...args  : string[]) => any,
  cooldown ?: number
}

export interface RunCommands 
{
  commands : Map< string ,ICommand >,
  commandPrefix : string,
  message : Message<boolean>,
  args :  string[]
}
