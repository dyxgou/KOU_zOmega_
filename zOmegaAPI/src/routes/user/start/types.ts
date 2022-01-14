import { Type , Static } from '@sinclair/typebox'

const startBodyRequest  = Type.Object(
  {
    userId : Type.String(),   
  }
)

export type StartBody = Static<typeof startBodyRequest>