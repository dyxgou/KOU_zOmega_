import { Type , Static } from '@sinclair/typebox'

const setChannelBody = Type.Object(
  {
    channelId : Type.String(),
    guildId : Type.String(),
    channelName : Type.String(),
  }
)

export type SetChannelBody = Static<typeof setChannelBody>