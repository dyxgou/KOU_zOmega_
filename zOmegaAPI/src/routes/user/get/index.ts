import { FastifyPluginAsync } from "fastify"
import { GetUserParams } from "./types"

const getUser : FastifyPluginAsync = async(fastify , options) => 
{
  fastify.get<{ Params : GetUserParams }>("/:userId" , async(request ,  reply) =>
  {
    const { userId } = request.params

    const user = await fastify.store.User.findOne({ userId : userId } , {
      coins : true , bank : true , _id : false
    })

    if(!user)
    {
      throw fastify.httpErrors.notFound("user not found")
    }

    const userPayload = 
    {
      coins : Math.floor( user?.coins ),
      bank : Math.floor(user?.bank),
      total : Math.floor(user?.bank + user?.coins)
    }

    return reply.status(200).send(userPayload)
  }) 
}

export default getUser