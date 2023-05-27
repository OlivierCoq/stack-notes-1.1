import {
    ipcRenderer,
    contextBridge
} from 'electron'

contextBridge.exposeInMainWorld("api", {
    // startNmapScan: function (args) {
    //     ipcRenderer.send("start-nmap-scan", args);
    // },
    // onNmapScanFinish: function (func) {
    //     ipcRenderer.on("finish-nmap-scan", (event, ...args) => func(event, ...args));
    // },
    // onNmapScanError: function(func) {
    //     ipcRenderer.on('error-nmap-scan', (event) => func(event))
    // }
    startTestContextBridge: function(args: string) {
        ipcRenderer.send('test-context-bridge', args);
    },
    onTestContextBridge: function(func : Function){
        ipcRenderer.on('reply-context-bridge', (event :any, ...args) => func(event, ...args))
    }

});