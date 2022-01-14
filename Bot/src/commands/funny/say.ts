import { Message } from "discord.js";


export default {
  callback : (message : Message , ...args : string[]) =>
  {
    console.log(args);
    
    message.channel.send({
      content: args.join(" ") 
    }).then(() => {
      message.delete()
    })
  }
}