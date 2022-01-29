import { FastifyPluginAsync } from "fastify"
import { RobBody, RobParams } from "./types"
import { cashPayload } from "../../../../utils/cashHandler"

const rob : FastifyPluginAsync = async(fastify  ) => 
{
  fastify.put<{
    Params : RobParams,
    Body : RobBody
  }>("/:userId" , async(request , reply) =>
  {
    const { userIdToSteal , isStealed } = request.body
    const { userId } = request.params

    if(!(userIdToSteal || isStealed))
    {
      throw fastify.httpErrors.unauthorized("You have to pass the user Id to Steal")
    }

    const [ userStealing , userToSteal ] = await Promise.all([
      fastify.store.User.findOne({ userId } , {
        coins : true
      }),
      fastify.store.User.findOne({ userId : userIdToSteal } , {
        coins : true
      })
    ])


    if(!(userStealing || userToSteal))
    {
      throw fastify.httpErrors.notFound("Some of the two users doesn't exist into the Economy system")
    }

    let amountToSteal = cashPayload({ coins :  userToSteal!.coins})

    if(userStealing!.coins > userToSteal!.coins)
    {
      amountToSteal = -amountToSteal
    }

    try 
    {
      const stealedSuccefully = amountToSteal <= 0 

      await userStealing?.updateOne({
        $inc : 
        {
          coins : amountToSteal 
        }
      })

      await userToSteal?.updateOne({
        $inc : 
        {
          coins : stealedSuccefully ? 0 : -amountToSteal
        }
      })

      return reply.status(200).send({ amountToSteal })
    } 
    catch (err) 
    {
      throw fastify.httpErrors.badRequest(`${err}`)  
    }
  }) 
}

export default rob