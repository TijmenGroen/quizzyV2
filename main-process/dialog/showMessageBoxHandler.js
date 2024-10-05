import { dialog } from "electron"

export async function handleShowMessageBox(message) {
    await dialog.showMessageBox({
        title: "Quizzy",
        message: message,
        type: "info",
    })
}