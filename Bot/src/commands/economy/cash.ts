import { Message, MessageEmbed } from 'discord.js'
import axios from "../../utils/connection"

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const { id : userId } = message.author

    const embed = new MessageEmbed({
      author : 
      {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : `${message.author.username}'s Cash`
      },
      color: "RANDOM"
    }).setTimestamp()

    const userInfo = await axios({
      url : `/user/get/${userId}`,
      method : "GET"
    }).then(res => {
      if(res.status === 200)
      {
        return res.data
      }
    }).catch(err => {
      console.error(err);
      embed.setDescription(`Ha ocurrido un error, es probable que no estés iniciado en el sistema de Economía de KOU; por lo tanto te recomendamos que te inicies con el comando \`z!start\`. <:tabn:910548967291514920>`)
      return null
    })

    console.log(userInfo);
    

    if(userInfo)
    {
      embed
        .addField("> **COINS**" , `> :coin: \`$${userInfo?.coins}\`` , true)
        .addField("> **BANK**" , `> :bank: \`$${userInfo?.bank}\`` , true)
        .addField("> **TOTAL**" , `> :money_with_wings: \`$${userInfo?.total}\`` , true)
    }


    return message.reply({
      embeds : [ embed ]
    })    
  }
}