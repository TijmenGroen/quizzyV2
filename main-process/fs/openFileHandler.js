import { dialog } from "electron"

export async function handleFileOpen () {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    })
    if (!canceled) {
        return filePaths[0]
    }
}