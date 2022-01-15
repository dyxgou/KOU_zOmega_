import { FastifyPluginAsync } from "fastify"
import { WithBody, WithParams } from "./types"

const withdraw : FastifyPluginAsync = async(fastify , options) => 
{
  fastify.put<{
    Body : WithBody,
    Params : WithParams
  }>("/:userId" , async(request , reply) =>
  {
    const { userId } = request.params
    const { amount } = request.body

    if(!amount)
    {
      throw fastify.httpErrors.badRequest("You have to pass the amount")
    }

    const user = await fastify.store.User.findOne({ userId : userId } , {
      coins : true , bank : true
    })   

    if(!user)
    {
      throw fastify.httpErrors.notFound("User not found")
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
    }).then(() =>  {
      return reply.status(200).send(`The amount (${amountToWith}) has been withdrawn`)
    }).catch(err => {
      throw fastify.httpErrors.badRequest(err)
    })
  }) 
}

export default withdraw
