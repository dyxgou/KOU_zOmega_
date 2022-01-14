import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

export default {
  callback : (message : Message , ...args : string[]) =>
  {
    const embed = new MessageEmbed()
      .setDescription(`${args.join(" ")}`)
      .setColor("RANDOM")

    return message.channel.send({
      embeds : [ embed ]
    }).then(() => {
      message.delete()
    })
  }
}