import { FastifyPluginAsync } from "fastify"
import { DepBody, DepParams } from "./types"

const dep : FastifyPluginAsync = async(fastify , options) => 
{
  fastify.put<{
    Body : DepBody,
    Params : DepParams
  }>("/:userId" , async(request , reply) =>
  {
    const { amount } = request.body
    const { userId } = request.params
    if(!amount)
    {
      throw fastify.httpErrors.notAcceptable("You have to pass the amount to dep")
    }
    
    const user = await fastify.store.User.findOne({ userId : userId } , {
      coins : true, bank : true
    })
    
    if(!user)
    {
      throw fastify.httpErrors.notFound("User not found")
    }
    
    const ALL_MONEY = "all"
    let amountToDep = parseInt(amount)
    
    if(amount === ALL_MONEY)
    {
      amountToDep = user?.coins
    }

    if(amountToDep <= 0)
    {
      throw fastify.httpErrors.badRequest("You have to pass positives values")
    }

    return await user?.updateOne({
      $inc :
      {
        bank : amountToDep,
        coins : -amountToDep
      }
    }).then(() => {
      return reply.status(200).send({amountToDep})
    }).catch(err => {
      throw fastify.httpErrors.badRequest(err)
    })
  })
}

export default dep