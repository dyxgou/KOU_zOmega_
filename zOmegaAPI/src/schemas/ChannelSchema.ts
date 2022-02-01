import { Schema , Document } from "mongoose"


export interface IChannel extends Document
{
  channelId : string,
  guildId : string,
  channelName :  string,
}


export const ChannelSchema = new Schema<IChannel>(
  {
    channelId :
    {
      type : String,
      required : true,
      unique : true
    },
    guildId:
    {
      type : String,
      required :  true,
      unique :  true
    },
    channelName :
    {
      type: String,
      required :  true,
    }
  }, 
  {
    timestamps : true
  }
)