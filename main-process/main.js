import {handleExists} from "./fs/existsHandler";

const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');
import started from 'electron-squirrel-startup';
import {handleDirectoryOpen} from "./dialog/openDirectoryHandler";
import {handleShowMessageBox} from "./dialog/showMessageBoxHandler";
import {handleWriteFile} from "./fs/writeFileHandler";
import {handeMkDir} from "./fs/mkDirHandler";
import {handleReadFile, handleReadDataFile} from "./fs/readFileHandler";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1200,
    height: 900,
    icon: path.join(__dirname, "assets/img/quizzy.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('dialog:openDirectory', (handleDirectoryOpen));
  ipcMain.handle('dialog:showMessageBox', async (event, message) => {
    await handleShowMessageBox(message)
  });
  ipcMain.handle("fs:exists", async (event, path) => {
    return handleExists(path)
  })
  ipcMain.handle("fs:writeFile", async (event, path2, file, data) => {
    await handleWriteFile(path2, file, data);
  })
  ipcMain.handle("fs:mkDir", async (event, path3, title) => {
    await handeMkDir(path3, title);
  })
  ipcMain.handle("fs:readFile", async (event, path4, file) => {
    return handleReadFile(path4, file);
  })
  ipcMain.handle("fs:readDataFile", async (event, path4) => {
    return handleReadDataFile(path4);
  })

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
