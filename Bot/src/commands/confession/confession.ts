import axios from '../../utils/axios'
import { Message, MessageEmbed } from 'discord.js'

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    if(args.length === 0)
    {
      return 
    }


    const { guildId , channelId } = message

    const confession = args.join(" ")

    const channelData = await axios(
      {
        url : "/channels/get",
        method : "GET",
        params : 
        {
          channelId , guildId
        }
      }
    ).then(res => {
      const CHANNEL_EXISTS = 200
      if(res.status === CHANNEL_EXISTS)
      {
        return res.data?.channelId
      }
      
      return null
    }).catch(err => {
      console.error(err.response.statusText)
      return null
    })

    if(!channelData)
    {
      return
    }

    const embed =  new MessageEmbed({
      author : {
        iconURL : "https://www.dictionary.com/e/wp-content/uploads/2018/10/shushing-face-emoji-300x300.png",
        name : `CONFESSION`
      },
      color: "RANDOM",
      description : `${confession}`,
      timestamp : Date.now(),
      footer : {
        iconURL : "https://cdn.discordapp.com/emojis/896202672439439380.webp?size=96&quality=lossless",
        text : "KOU Secret"
      }
    })

    return message.channel.send({
      embeds : [ embed ],
    }).then(() => {
      message.delete()
    })
  }
}