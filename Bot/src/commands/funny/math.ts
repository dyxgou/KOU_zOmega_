import { Message, MessageEmbed } from "discord.js";
import * as mathJS from "mathjs"


export default {
  callback : (message : Message , ...args : string[]) =>
  {
    
    if(args.length === 0)
    { 
      const embed = new MessageEmbed({
        color: "RANDOM",
        author : {
          iconURL : message.author.displayAvatarURL({ dynamic : true }),
          name : "MATH SYSTEM"
        },
        description : `Para poder usar el comando Math de KOU, puedes hacer lo siguiente:
      
        \` bt!maht (Operación Matemática) \` 
        
        > También admite razones Trigomometricas, entre otras cosas más.
        
        > **Ejemplo:**
        > \` bt!math (9 * 7 * 8) + 6 / 3 \` 
        > **Resultado:**
        > \` 506 \` `,
        footer : {
          text : "POWER BY MATHJS" , iconURL : "https://cdn.discordapp.com/emojis/852708604816916481.gif?v=1"
        }
      })  

      return message.reply({
        embeds : [ embed ]
      })      
    }

    const embed = new MessageEmbed({
      author : {
        name : "MATH",
        iconURL : message.author.displayAvatarURL()
      },
      footer : {
        text : "POWER BY MATH JS",
        iconURL : "https://cdn.discordapp.com/emojis/808019860541538365.gif?size=128&quality=lossless"
      }, 
      color: "RANDOM"
    })

    try
    {
      const result = mathJS.evaluate(args.join(" "))
      embed
        .addField("**> Operación Matemática**" , `> \`${args.join(" ")}\`` , true)
        .addField("**> Resultado **" , `> \`${result}\` `)
    }
    catch(err)
    {
      try {
        const result = mathJS.simplify(args.join(" "))
        embed
          .addField("**> Operación Algebraica**" , `> \` ${args.join(" ")} \`` , true)
          .addField("**> Resultado**" , `> \` ${result} \``)  
      } catch (error) {
        embed.setDescription(`Ha ocurrido un error`)
      }
    }
    
    return message.reply({
      embeds : [ embed ]
    })
  }
}
