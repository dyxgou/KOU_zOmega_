import { Schema, Document } from "mongoose";

export interface IUser extends Document
{
  userId : string,
  coins : number,
  bank : number,
}


export const UserSchema = new Schema<IUser>(
  {
    userId : 
    {
      type : String,
      required : true,
      unique : true
    },
    bank : 
    {
      type : Number,
      default : 0
    },
    coins :
    {
      type : Number,
      default : 1000
    },
  }, 
  {
    timestamps : true
  }
)