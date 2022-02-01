import { Message, MessageEmbed } from 'discord.js'
import axios from "../../utils/axios"

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const userMention = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

    let userId : string

    if(!userMention)
    {
      userId = message.author.id
    }
    else
    {
      userId = userMention.id
    }

    const embed = new MessageEmbed({
      author : 
      {
        iconURL : userMention ? (
          userMention.displayAvatarURL({ dynamic : true })
        ) : (
          message.author.displayAvatarURL({ dynamic : true })
        ),
        name : `CASH`
      },
      color:  "RANDOM",
    }).setTimestamp()
    

    await axios({
      method : "GET",
      url : `/user/get/${userId}`
    }).then(res => {
      if(res.status === 200 )
      {
        const { data : userInfo } = res

        embed
          .addField("> **COINS**" , `> :coin: \`$${userInfo?.coins}\`` , true)
          .addField("> **BANK**" , `> :bank: \`$${userInfo?.bank}\`` , true)
          .addField("> **TOTAL**" , `> :money_with_wings: \`$${userInfo?.total}\`` , true)
      }
    }).catch(err => {
      if(err.response.status === 404)
      {
        return embed.setDescription(`No te has iniciado en el sistema de Economía de KOU; para iniciarte, escribe el comando \`z!start\`. <:tabn:910548967291514920>`)
      }
      
      return embed.setDescription(`Ha ocurrido un error al ver el Cash. Es probable que no estés iniciado `)
    })

    return message.reply({
      embeds : [ embed ]
    })
  }
}