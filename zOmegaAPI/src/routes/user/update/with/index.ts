import { FastifyPluginAsync } from "fastify"
import { WithBody, WithParams } from "./types"

const withdraw : FastifyPluginAsync = async(fastify , options) => 
{
  fastify.put<{
    Body : WithBody,
    Params : WithParams
  }>("/:userId" , async(request , reply) =>
  {
    const { amount } = request.body
    const { userId } = request.params

    if(!amount)
    {
      throw fastify.httpErrors.notAcceptable("You have to give us the amount to withdraw")
    }

    const user = await fastify.store.User.findOne({ userId : userId } , {
      coins : true , bank : true
    })

    if(!user)
    {
      throw fastify.httpErrors.notFound("user not found")
    }

    const ALL_MONEY = "all"
    let amountToWith = parseInt(amount)

    if(amount === ALL_MONEY)
    {
      amountToWith = user?.bank
    }

    return await user?.updateOne({
      $inc : 
      {
        coins : amountToWith, 
        bank : -amountToWith
      }
    }).then(() => {
      return reply.status(200).send({ amountToWith })
    }).catch(err => {
      throw fastify.httpErrors.badRequest(err)
    })
  })
}

export default withdraw