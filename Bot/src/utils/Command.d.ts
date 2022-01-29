import { Message } from "discord.js";

export interface ICommand 
{
  [key : string] : {
    callback : (message : Message , ...args  : string[]) => any,
    cooldown ?: number
  }
}

export interface RunCommands 
{
  commands : ICommand,
  commandPrefix : string,
  message : Message<boolean>,
  args :  string[]
}
