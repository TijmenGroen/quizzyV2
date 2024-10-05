const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openDirectory'),
    showMessageBox: (message) => ipcRenderer.invoke('dialog:showMessageBox', message),
    exists: (path) => ipcRenderer.invoke('fs:exists', path),
    writeFile: (path, file, data) => ipcRenderer.invoke('fs:writeFile', path, file, data),
})