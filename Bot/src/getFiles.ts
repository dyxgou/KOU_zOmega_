import * as fs from "fs"


const getFiles = (dir : string , suffix : string) : string[] =>
{

  
  const files : fs.Dirent[] = fs.readdirSync(`${dir}` , {
    withFileTypes : true
  })

  let commandFiles : string[] = []

  for (const file of files) 
  {
    if(file.isDirectory())  
    {
      commandFiles = [
        ...commandFiles , 
        ...getFiles(`${dir}\\${file.name}` , suffix)
      ]
    }
    else if(file.isFile())
    {
      if(file.name.endsWith(".d.ts"))
      {
        continue
      }
      else
      {
        commandFiles.push(`${dir}\\${file.name}`) 
      }
    }
  }

  return commandFiles
}

export default getFiles