import { Type , Static } from '@sinclair/typebox'

const updateParamsRequest = Type.Object(
  {
    userId : Type.String(),    
  }
)

export type UpdateParams = Static<typeof updateParamsRequest>

const updateBodyRequest = Type.Object(
  {
    coins : Type.Number(),
    bank : Type.Number()
  }
)

export type UpdateBody = Static<typeof updateBodyRequest>


