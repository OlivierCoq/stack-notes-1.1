const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendToMain: (data) => {
    ipcRenderer.send('message-from-renderer', data);
  },
  receiveFromMain: (callback) => {
    ipcRenderer.on('message-from-main', (event, data) => {
      callback(data);
    });
  },
});
