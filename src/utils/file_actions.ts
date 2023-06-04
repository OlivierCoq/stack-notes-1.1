  ipcMain.handle("add-new-note", async (event, jsonData) => {
    const filePath = dialog.showSaveDialogSync(mainWindow, {
      defaultPath: "data.json",
      filters: [{ name: "JSON Files", extensions: ["json"] }],
    });

    if (filePath) {
      try {
        const jsonString = JSON.stringify(jsonData); // Convert object to JSON string
        fs.writeFileSync(filePath, jsonString);
        event.sender.send("add-new-note-reply", { success: true, filePath });
      } catch (error) {
        event.sender.send("add-new-note-reply", { success: false, error: (error as Error).message });
      }
    } else {
      event.sender.send("add-new-note-reply", { success: false, error: "No file path selected" });
    }
  });