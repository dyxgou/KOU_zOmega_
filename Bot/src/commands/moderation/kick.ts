import { Message, MessageEmbed } from "discord.js"

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const USER_TOKICK_ID = args[0]
    const userToKick = message.mentions.members?.first() || message.guild?.members.cache.get(USER_TOKICK_ID)

    const kickReason = args.slice(1 , args.length).join(" ") || `Lo siento, pero has incumplido las reglas.`

    const embed = new MessageEmbed({
      author : {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : `${message.author.username} KICK COMMAND`
      },
      color: "RANDOM",
      timestamp : Date.now(),
    })


    if(!message.member?.permissions.has("KICK_MEMBERS"))
    {
      return message.reply({
        content : `No tienes permisos para kickear a este usuario.`,
      })
    }

    if(!userToKick)
    {
      return message.reply({
        content : `Tienes que mencionar a alguien para poder kickearlo, ya sea con su ID, o mención directa.
      
      \`z!kick (user) (reason)\``,
      })
    }

    if(!userToKick?.kickable)
    {
      return message.reply({
        content : `Es posible que ${userToKick?.displayName} tenga más permisos que yo.`,
      })
    }

    try 
    {
      await userToKick?.kick(kickReason)
      
      embed.setDescription(`El usuario ${userToKick}, ha sido kick correctamente.
      
      Razón : \`${kickReason}\``)
    } 
    catch (error) 
    {
      embed.setDescription(`Ha ocurrido un error al kikear este usuario.`)
    }

    return message.reply({
      embeds : [ embed ]
    })  
    
  },

  cooldown : 30
}