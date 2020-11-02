const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected

// To start the application, run > npm start command on the console.

let win
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1080,
    height: 560,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  }) 
  win.setResizable(false);
  win.loadFile('index.html')
  // and load the index.html of the app.
  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  Menu.setApplicationMenu(null)
  // globalShortcut.register('f5', function() {
  //   win.reload()
  // })
}
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
