import { Type, Static } from "@sinclair/typebox"

const depBodyRequest = Type.Object(
  {
    amount : Type.String()    
  }
)

export type DepBody = Static<typeof depBodyRequest>


const depParamsRequest = Type.Object(
  {
    userId : Type.String(),
  }
)

export type DepParams = Static<typeof depParamsRequest>


