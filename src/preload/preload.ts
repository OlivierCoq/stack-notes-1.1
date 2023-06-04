import { ipcRenderer, contextBridge } from 'electron'


contextBridge.exposeInMainWorld("api", {
  send: (channel :any, data :any) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel :any, callback :Function) => {
    ipcRenderer.on(channel, (event :any, ...args) => callback(...args));
  },
  invoke: (channel :any, data :any) => {
    return ipcRenderer.invoke(channel, data);
  },
});