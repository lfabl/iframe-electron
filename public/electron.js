const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
// const isDev = require('electron-is-dev');
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        nodeIntegration: true,
        devTools: false,
        icon: path.join(__dirname, '/icon.png')
    });
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setOverlayIcon(`${path.join(__dirname, '/icon.png')}`, 'Tiko | E Arşiv Portal');
    mainWindow.loadURL(/*isDev ? "http://localhost:3000" : */`file://${path.join(__dirname, '../build/index.html')}`);
    //mainWindow.webContents.openDevTools();
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({ responseHeaders: Object.fromEntries(Object.entries(details.responseHeaders).filter(header => !/x-frame-options/i.test(header[0]))) });
    });
    mainWindow.on('closed', function () {
        mainWindow = null
    })
} 
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});