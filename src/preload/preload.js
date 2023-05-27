const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('api', {
//   sendToMain: (data) => {
//     ipcRenderer.send('message-from-renderer', data);
//   },
//   receiveFromMain: (callback) => {
//     ipcRenderer.on('message-from-main', (event, data) => {
//       callback(data);
//     });
//   },
// });

window.ipcRenderer = ipcRenderer;

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  },
});