import { FastifyPluginAsync } from "fastify"
import { UpdateBody, UpdateParams } from "./types"

const update : FastifyPluginAsync = async(fastify , options) => 
{
  // Update the currency of an user
  fastify.put<{
    Body : UpdateBody ,
    Params : UpdateParams
  }>("/:userId" , async(request , reply)=>
  {
    const { userId } = request.params
    const { coins , bank } = request.body

    const user = await fastify.store.User.findOne({ userId : userId } , {
      coins : true ,  bank : true
    })    

    if(!user)
    {
      throw fastify.httpErrors.unauthorized("This user haven't started at the system")
    }
    
    return await user?.updateOne({
      $inc : 
      {
        coins : coins,
        bank : bank
      }
    }).then(() => {
      return reply.status(200).send("The amount has been deposited")
    }).catch(err => {
      throw fastify.httpErrors.badRequest(err)
    })
  }) 
  
}

export default update