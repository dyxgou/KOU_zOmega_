import { FastifyPluginAsync } from "fastify"
import { RobBody, RobParams } from "./types"

const rob : FastifyPluginAsync = async(fastify  ) => 
{
  fastify.put<{
    Params : RobParams,
    Body : RobBody
  }>("/:userId" , async(request , reply) =>
  { 
    const { userIdToSteal } = request.body

    if(!userIdToSteal)
    {
      throw fastify.httpErrors.badRequest("You have to pass the userIdToSteal")
    }

    

  }) 
}

export default rob