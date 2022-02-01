import { Type , Static } from '@sinclair/typebox'

const getChannelQuery = Type.Object(
  {
    channelId : Type.String(),
    guildId : Type.String(),
  }
)

export type GetChannelParams = Static<typeof getChannelQuery>