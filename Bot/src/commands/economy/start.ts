import { Message, MessageEmbed } from 'discord.js'
import axios from '../../utils/connection'

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const { id : userId } = message.author
    const serverId = message.guildId

    const embed = new MessageEmbed({
      author : {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : message.author.username
      },
      color:  "RANDOM",
    }).setTimestamp()

    await axios({
      url : "/user/start",
      method : "POST",
      data : 
      {
        userId , 
        serverId
      }
    }).then(res => {
      if(res.status === 201)
      {
        embed.setDescription(`¡Bienvenido al sistema de economía de KOU!  <a:fiesta:852705590970417163>
        Por cortesía de la casa, has iniciado con $1000 pesitos. <:tabn:910548967291514920>

        Sí quieres ver tu Dinero, puedes usar z!cash, para trabajar, puedes usar z!work
        `)
        return res.data
      }
      return
    }).catch(err => {
      console.error(err);
      return embed.setDescription("Ha ocurrido un error al crear tu usuario. 😔")
    })
    

    return message.reply({
      embeds : [ embed ]
    })
  }
}