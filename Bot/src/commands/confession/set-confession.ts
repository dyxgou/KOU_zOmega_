import axios from '../../utils/axios'
import { Message, MessageEmbed } from 'discord.js'


export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const channelTargetId = message.mentions.channels?.first()?.id
    const channelId = args[0].trim()    
    const confessionChannel = message.guild?.channels.cache.get(channelTargetId || channelId)
    
    
    if(!confessionChannel)
    {
      return message.reply({
        content : `Tienes que mencionar el canal a registrar.`,
      })
    }

    const embed = new MessageEmbed({
      author : {
        iconURL : message.author.displayAvatarURL({ dynamic :  true }),
        name : `CONFESSION CHANNEL`
      },
      color: "RANDOM",
      timestamp : Date.now()
    })

    const { id , guildId , name } = confessionChannel

    await axios(
      {
        method : "POST",
        url : "/channels/set",
        data : 
        {
          channelId : id,
          guildId , 
          channelName : name
        }
      }
    ).then((res) => {

      const CHANNEL_CREATED = 201

      if(res.status === CHANNEL_CREATED)
      {
        console.log(res.data)
        const { channelName } = res.data
        embed.setDescription(`El canal ha sido creado en la base de datos como ${channelName}`)
      }
    }).catch(err => {
      console.error(err)
      embed.setDescription(`Ha ocurrido un erorr al establecer el canal de confeciones en la base de datos.`)
    })


    return message.reply({
      embeds : [ embed ]
    })
  }
}