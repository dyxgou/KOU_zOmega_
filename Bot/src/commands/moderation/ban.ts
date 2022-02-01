import { Message, MessageEmbed } from "discord.js"

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const USER_TOBAN_ID = args[0]
    const userToBan = message.mentions.members?.first() || message.guild?.members.cache.get(USER_TOBAN_ID)

    const banReason = args.slice(1 , args.length).join(" ") || `Lo siento, pero has incumplido las reglas.`

    const embed = new MessageEmbed({
      author : {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : `${message.author.username} BAN COMMAND`
      },
      color: "RANDOM",
      timestamp : Date.now(),
    })


    if(!message.member?.permissions.has("BAN_MEMBERS"))
    {
      return message.reply({
        content : `No tienes permisos para banear a este usuario.`,
      })
    }

    if(!userToBan)
    {
      return message.reply({
        content : `Tienes que mencionar a alguien para poder banearlo, ya sea con su ID, o mención directa.
      
      \`z!ban (user) (reason)\``,
      })
    }

    if(!userToBan?.bannable)
    {
      return message.reply({
        content : `Es posible que ${userToBan?.displayName} tenga más permisos que yo.`,
      })
    }

    try 
    {
      await userToBan?.ban({
        reason : banReason,
      })
      
      embed.setDescription(`El usuario ${userToBan}, ha sido baneado correctamente.`)

      return message.reply({
        embeds : [ embed ]
      })  
    } 
    catch (error) 
    {
      embed.setDescription(`Ha ocurrido un error al banear este usuario.`)
    }
    
  },

  cooldown : 30
}