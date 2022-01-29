import { Message } from "discord.js";


export default {
  callback : (message : Message , ...args : string[]) =>
  {
    message.channel.send({
      content: args.join(" ") 
    }).then(() => {
      message.delete()
    })
  }
}