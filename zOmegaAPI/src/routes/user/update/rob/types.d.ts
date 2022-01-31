import { Type , Static } from "@sinclair/typebox"

const robParamsRequest = Type.Object(
  {
    userId : Type.String(),
  }
)

export type RobParams = Static<typeof robParamsRequest>


const robBodyRequest = Type.Object(
  {
    userIdToSteal : Type.String(),
  }
)

export type RobBody = Static<typeof robBodyRequest>