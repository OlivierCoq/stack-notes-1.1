import {
    ipcRenderer,
    contextBridge
} from 'electron'

// contextBridge.exposeInMainWorld("api", {
//     // startNmapScan: function (args) {
//     //     ipcRenderer.send("start-nmap-scan", args);
//     // },
//     // onNmapScanFinish: function (func) {
//     //     ipcRenderer.on("finish-nmap-scan", (event, ...args) => func(event, ...args));
//     // },
//     // onNmapScanError: function(func) {
//     //     ipcRenderer.on('error-nmap-scan', (event) => func(event))
//     // }
//     startTestContextBridge: function(args: string) {
//         ipcRenderer.send('test-context-bridge', args);
//     },
//     onTestContextBridge: function(func : Function){
//         ipcRenderer.on('reply-context-bridge', (event :any, ...args) => func(event, ...args))
//     }

// });

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