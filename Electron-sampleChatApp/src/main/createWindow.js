import { BrowserWindow } from "electron";

let win;
function createWindow() {
    win = new BrowserWindow({width:1200, height:600});
    win.loadURL(`file://${__dirname}/../../index.html`);
    win.webContents.openDevTools();
    win.on("close", () => {
        win = null;
    });
}
export default createWindow;