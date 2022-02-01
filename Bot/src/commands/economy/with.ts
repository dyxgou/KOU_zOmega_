import { Message, MessageEmbed } from 'discord.js'
import axios from '../../utils/axios'

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

    if(+amountToWith <= 0)
    {
      return message.reply({
        content : `No creo que el banco te deje depositar \`$${amountToWith}\``,
      })
    }
    
    const embed = new MessageEmbed({
      author : 
      {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : "WITHDRAW"
      },
      color: "RANDOM"
    }).setTimestamp()

    await axios({
      method : "PUT",
      url : `/user/update/with/${userId}`,
      data : 
      {
        amount : amountToWith
      }
    }).then(res => {
      if(res.status === 200)
      {        
        embed.setDescription(`¡Has sacado del banco una cantidad de \`$${Math.floor(res.data.amountToWith)}\` :money_mouth:!`)
      }
    }).catch(err => {
      console.error(err.response.status);
      if(err.response.status === 304)
      {
        embed.setDescription(`No tienes dinero en el banco, que puedas sacar. o.O`)
      }
      else
      {

        embed.setDescription(`Ha ocurrido un error al sacar tu dinero.`)
      }
    })

    return message.reply({
      embeds : [ embed ] 
    })
  }
}