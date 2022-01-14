import { Message, MessageEmbed } from 'discord.js'
import axios from '../../utils/connection'

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    if(args.length === 0)
    {
      return message.reply({
        content : `\`z!with (amount || all)\``,
      })
    }

    const { id : userId } = message.author
    const amountToWith = args[0]
    
    const embed = new MessageEmbed({
      author : 
      {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : message.author.username
      },
      color: "RANDOM"
    }).setTimestamp()

    await axios({
      method : "PUT",
      url : `/update/with/${userId}`,
      data : 
      {
        amount : amountToWith
      }
    }).then(res => {
      if(res.status === 200)
      {
        
      }
    })
  }
}