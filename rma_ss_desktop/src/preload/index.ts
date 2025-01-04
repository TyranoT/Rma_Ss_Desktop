import { contextBridge } from "electron"

if(!process.contextIsolated){
  throw new Error('O script de preload não está isolado por contexto')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //TODO
  })
} catch (error) {
  console.error(error)
}
