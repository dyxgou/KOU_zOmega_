import { Type , Static } from '@sinclair/typebox'

const getUserParamsRequest = Type.Object(
  {
    userId : Type.String(),
  }
)

export type GetUserParams = Static<typeof getUserParamsRequest>

