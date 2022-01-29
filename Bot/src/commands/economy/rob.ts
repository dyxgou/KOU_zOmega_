import { Message, MessageEmbed } from 'discord.js'
import math = require('mathjs')
import axios from '../../utils/connection'


export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const USER_ID = args[0]
    const userToRob = message.mentions.members?.first() || message.guild?.members.cache.get(USER_ID)

    if(!userToRob)    
    {
      return message.reply({
        content : `Tienes que mencionar a alguien para poder robarle. o.O`,
      })
    }
    
    if(userToRob.id === message.author.id)
    {
      return message.reply({
        content : `No te puedes robar a ti mismo. -.-`,
      })
    }

    const embed = new MessageEmbed({
      author : {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : `STEALING`
      },
      color: "RANDOM",
      timestamp : Date.now()
    })
    
    const isStealed = math.randomInt(1 , 3) === 1 ? false : true

    const stealedAmount = await axios(
      {
        method : "PUT",
        url : `/user/update/rob/${message.author.id}`,
        data : 
        {
          userIdToSteal : userToRob.id,
          isStealed
        }
      }
    ).then(res => {
      if(res.status === 200)
      {
        console.log(res.data);
        return res.data.amountToSteal
      }
    }).catch(err => {
      console.error(err);
      return 0
    })

    if(stealedAmount > 0)
    {
      embed.setDescription(`Le has robado a <@!${userToRob.id}> \`$${stealedAmount}\` . `)
    }
    else
    {
      embed.setDescription(`Por tu falta de corazón, la policía que ha quitado \`$${stealedAmount}\` .`)
    }


    return message.reply({
      embeds : [ embed ]
    })
  }
}