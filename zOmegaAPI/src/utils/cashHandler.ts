import { randomInt } from "mathjs"


export const cashPayload = ({ coins = 0 } : { coins ?: number }) =>
{
  const cashPercent = randomInt(25 , 75) / 100

  const cashToRob = Math.floor(coins * cashPercent)

  return cashToRob
}


