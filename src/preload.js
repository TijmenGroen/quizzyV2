const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
    showMessageBox: (message) => ipcRenderer.invoke('dialog:showMessageBox', message),
    exists: (path) => ipcRenderer.invoke('fs:exists', path),
    writeFile: (path, file, data) => ipcRenderer.invoke('fs:writeFile', path, file, data),
    mkDir: (path, title) => ipcRenderer.invoke('fs:mkDir', path, title),
})