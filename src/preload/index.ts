import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('O script de preload não está isolado por contexto')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //TODO
  })
  contextBridge.exposeInMainWorld('electron', {
    login: (email, password) => ipcRenderer.invoke('login', { email, password }),
    verificacao_token: (token) => ipcRenderer.invoke('verificacao_token', token) 
  });

} catch (error) {
  console.error(error)
}
