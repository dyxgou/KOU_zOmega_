import { FastifyPluginAsync } from "fastify"
import { GetChannelParams } from "./types"

const getChannel : FastifyPluginAsync = async(fastify) => 
{
  fastify.get<{
    Querystring : GetChannelParams
  }>("/" , async(request , reply) => 
  {
    const { channelId , guildId } = request.query

    if(!(channelId || guildId))
    {
      throw fastify.httpErrors.notAcceptable("You have to pass the channelId")
    }

    const channel = await fastify.store.Channels.findOne({ channelId , guildId } ,  {
      channelId : true,  _id : false
    }) 

    if(!channel)
    {
      throw fastify.httpErrors.notFound("Channel not found")
    }

    return reply.status(200).send(channel)

  })
}

export default getChannel