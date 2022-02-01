import { FastifyPluginAsync } from "fastify"
import { SetChannelBody } from "./types"

const setChannel : FastifyPluginAsync = async(fastify) => 
{
  fastify.post<{
    Body : SetChannelBody
  }>("/" , async(request , reply) =>
  {
    const { body : channelInfo } = request
    const { channelId , guildId , channelName } = channelInfo

    if(!(channelId || guildId || channelName))
    {
      throw fastify.httpErrors.badRequest(`You have to pass the ChannelId, GuildId and the channelName`)
    }

    try 
    {
      const newChannel = await fastify.store.Channels.create(channelInfo)
      return reply.status(201).send(newChannel)
    } 
    catch (error) 
    {
      fastify.log.error(error)
      throw fastify.httpErrors.createError(`Error to create the new secrets channel`)
    }

  })
}

export default setChannel