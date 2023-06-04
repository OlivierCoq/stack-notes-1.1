const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs') 

let mainWindow: any

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // preload: path.join(__dirname, '..', 'src', 'preload', 'preload.ts'),
      preload: path.join(__dirname, "preload.js") // use a preload script
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

  // IPC Methods

  // require('./utils/file_actions')

    // Adding new note
  ipcMain.handle('add-new-note', async (event, jsonData) => {

    console.log('adding new note', jsonData)
    const folderPath = './local_files'; // switched to local_files from dist_electron because I kept overwritting it
    const fileName = `${jsonData.name}.json`;
    const filePath = path.join(folderPath, fileName);
  
    try {
      const jsonString = JSON.stringify(jsonData); // Convert object to JSON string
      fs.writeFileSync(filePath, jsonString);
      event.sender.send('add-new-note-reply', { success: true, filePath });
    } catch (error) {
      event.sender.send('add-new-note-reply', { success: false, error: (error as Error).message });
    }
  });

  // Editing existing note
  ipcMain.handle("edit-note", async (event, jsonData) => {
    const filePath = dialog.showSaveDialogSync(mainWindow, {
      defaultPath: `${jsonData.name}.json`,
      filters: [{ name: "JSON Files", extensions: ["json"] }],
    });

    if (filePath) {
      try {
        const jsonString = JSON.stringify(jsonData); // Convert object to JSON string
        fs.writeFileSync(filePath, jsonString);
        event.sender.send("edit-note-reply", { success: true, filePath });
      } catch (error) {
        event.sender.send("edit-note-reply", { success: false, error: (error as Error).message });
      }
    } else {
      event.sender.send("edit-note-reply", { success: false, error: "No file path selected" });
    }
  });

  // Deleting existing note
  ipcMain.handle("delete-note", async (event, filePath) => {
    try {
      fs.unlinkSync(filePath);
      event.sender.send("delete-note-reply", { success: true });
    } catch (error) {
      event.sender.send("delete-note-reply", { success: false, error: (error as Error).message });
    }
  });

  // Get all notes
  ipcMain.handle("get-notes", async (event) => {
    try {
      const files = await fs.readdirSync('./local_files')
      console.log('files', files)
      // read all files at once and return an array of promises
      const notes = files.map(async (file: JSON) => {

        const contents = await fs.readFileSync(`./local_files/${file}`, 'utf-8')
        const note = JSON.parse(contents)
        return note
      })
      // wait until all promises resolve
      const resolvedNotes = await Promise.all(notes)
      event.sender.send("get-notes-reply", { success: true, notes: resolvedNotes });
    } catch (error) {
      event.sender.send("get-notes-reply", { success: false, error: (error as Error).message });
    }
  });

  // END IPC Methods

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
// app.on('web-contents-created', (e, webContents) => {
//   if (isDev) {
//     webContents.on('context-menu', (e, params) => {
//       const { x, y } = params;

//       Menu.buildFromTemplate([
//         {
//           label: 'Inspect element',
//           click: () => {
//             webContents.inspectElement(x, y);
//           },
//         },
//       ]).popup();
//     });
//   }
// });

// Install Vue Devtools when in development mode
if (isDev) {
  app.whenReady().then(() => {
    const {
      default: installExtension,
      VUEJS_DEVTOOLS,
    } = require('electron-devtools-installer');

    installExtension(VUEJS_DEVTOOLS)
      .then((name :String) => console.log(`Added Extension: ${name}`))
      .catch((err :Object) => console.log('An error occurred while installing Vue Devtools:', err));
  });
}
