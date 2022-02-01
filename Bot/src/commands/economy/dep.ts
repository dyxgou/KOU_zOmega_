import { Message, MessageEmbed } from 'discord.js'
import axios from '../../utils/axios'

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    if(args.length === 0) 
    {
      return message.reply({
        content : `\`z!dep (amount || all)\``,
      })
    }

    const amountToDep = args[0]

    if(+amountToDep <= 0)
    {
      return message.reply({
        content : `No creo que el banco te deje depositar $\`${amountToDep}\``,
      })
    }

    const { id : userId } = message.author

    const embed = new MessageEmbed({
      author : 
      {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : message.author.username
      },
      color: "RANDOM"
    }).setTimestamp()

    await axios({
      url : `/user/update/dep/${userId}`,
      method : "PUT",
      data : 
      {
        amount : amountToDep
      }
    }).then(res => {
      console.log(res)
      if(res.status === 200)
      {
        embed.setDescription(`¡Has depositado \`$${Math.floor(res.data.amountToDep)}\` :money_mouth:!`)
      }
      return
    }).catch(err => {
      const NO_MONEY = 488
      if(err.response.status === NO_MONEY)
      {
        embed.setDescription(`No puedes sacar cantidades iguales o menores a 0 del banco. o.O`) 
      }
      else
      {
        embed.setDescription(`Ha ocurrido un error al depositar.`)
      }
    })


    return message.reply({
      embeds : [ embed ]
    })
  }, 
  cooldown : 1
}