import { Type , Static } from '@sinclair/typebox'

const withBodyRequest = Type.Object(
  {
    amount : Type.String(),
  }
)

export type WithBody = Static<typeof withBodyRequest>


const withParamsRequest = Type.Object(
  {
    userId : Type.String(),
  }
)

export type WithParams = Static<typeof withParamsRequest>