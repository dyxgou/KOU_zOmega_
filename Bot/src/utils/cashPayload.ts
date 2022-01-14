import { randomInt } from "mathjs"

const cashPayload = (coins: number) => 
{
  const cashPercent = randomInt(1, 75) / 100
  let cashToRob = Math.floor(coins * cashPercent)

  return cashToRob
}


export default cashPayload