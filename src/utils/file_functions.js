const { ipcMain, dialog } = require("electron");
const fs = require("fs");

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