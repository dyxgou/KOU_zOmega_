import { Message, MessageEmbed } from 'discord.js'
import * as math from "mathjs" 
import axios from '../../utils/axios'

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const randomAmount = Math.floor( math.random(1000 , 4000) )

    const { id : userId } = message.author

    const embed = new MessageEmbed(
      {
        author : 
        {
          iconURL : message.author.displayAvatarURL({ dynamic : true }),
          name : "WORK"
        },
        color: "RANDOM"
      }
    ).setTimestamp()

    await axios(
      {
        url : `/user/update/${userId}`,
        method : "PUT",
        data : 
        {
          coins : randomAmount,
          bank : 0
        }
      }
    ).then(res => {
      if(res.status === 200)
      {
        embed.setDescription(`¡Has ganado \`$${randomAmount}\` :money_mouth: !`)
      }
    }).catch(err => {
      embed.setDescription("Ha ocurrido un error")
      console.error(err);
    })

    return message.reply({
      embeds : [ embed ]
    })
  },
  cooldown : 3
}