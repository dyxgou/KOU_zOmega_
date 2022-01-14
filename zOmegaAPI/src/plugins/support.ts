import fp from 'fastify-plugin'
import *  as mongoose from "mongoose"
import { IUser , UserSchema } from "../schemas/UserSchema"

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })


  const URI = process.env.MONGO_URL || ""

  await mongoose.connect(URI).then(conn => {
    fastify.decorate("store" , {
      User : conn.model("users" , UserSchema),
      db : conn
    })

    fastify.log.info("Mongo has been connected to the Database")
  }).catch(err => {
    fastify.log.error(err)
  })
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;

    store :
    {
      User : mongoose.Model<IUser>,
      db : typeof mongoose
    }
  }
}