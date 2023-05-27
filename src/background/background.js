const { app, BrowserWindow, ipcMain, dialog, contextBridge} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs') 

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '..', 'src', 'preload', 'preload.js'),
    },
  });

  // Load the appropriate URL based on development or production mode
  const url = isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, '../dist_electron/index.html')}`;
  win.loadURL(url);

  // IPC Methods
  ipcMain.on("add-new-note", async (event, jsonData) => {
    const filePath = dialog.showSaveDialogSync(mainWindow, {
      defaultPath: "data.json",
      filters: [{ name: "JSON Files", extensions: ["json"] }],
    });

    if (filePath) {
      try {
        fs.writeFileSync(filePath, jsonData);
        event.reply("add-new-note-reply", { success: true, filePath });
      } catch (error) {
        event.reply("add-new-note-reply", { success: false, error: error.message });
      }
    } else {
      event.reply("add-new-note-reply", { success: false, error: "No file path selected" });
    }
  });
  // END IPC Methods



  // Open the DevTools when in development mode
  if (isDev) {
    win.webContents.on('did-frame-finish-load', () => {
      win.webContents.openDevTools();
    });
  }

  

}

app.whenReady().then(() => {

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// require('./utils/file_functions');

// Allow DevTools in production mode
app.on('web-contents-created', (e, webContents) => {
  if (isDev) {
    webContents.on('context-menu', (e, params) => {
      const { x, y } = params;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            webContents.inspectElement(x, y);
          },
        },
      ]).popup();
    });
  }
});

// Install Vue Devtools when in development mode
if (isDev) {
  app.whenReady().then(() => {
    const {
      default: installExtension,
      VUEJS_DEVTOOLS,
    } = require('electron-devtools-installer');

    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`Added Extension: ${name}`))
      .catch((err) => console.log('An error occurred while installing Vue Devtools:', err));
  });
}
