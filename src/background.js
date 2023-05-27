const { app, BrowserWindow, icpMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the appropriate URL based on development or production mode
  const url = isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, '../dist_electron/index.html')}`;
  win.loadURL(url);

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
