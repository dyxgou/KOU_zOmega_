import { Message, MessageEmbed } from 'discord.js'

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const user = message.mentions.members?.first()
    
    const embed = new MessageEmbed({
      author : {
        iconURL : user?.displayAvatarURL({ dynamic : true , size : 1024 }) || message.author?.displayAvatarURL({ dynamic : true , size : 1024 }),
        name : `${user?.nickname || message.author.username}'s avatar`
      }, 
      color: "RANDOM",
    })
    if(!user)
    {
      embed.setImage(message.author.displayAvatarURL({ dynamic : true , size : 1024 }))
    }
    else
    {
      embed.setImage(user.displayAvatarURL({ dynamic : true , size : 1024 }))
    }

    return message.reply({
      embeds : [ embed ] 
    })
  }
}